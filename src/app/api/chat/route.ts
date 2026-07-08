import { NextRequest } from "next/server";
import { z } from "zod";
import { openai, MODELS, isOpenAiConfigured } from "@/lib/openai";
import { buildSystemPrompt, BIN_JIMZ_KNOWLEDGE } from "@/lib/chat/system-prompt";
import { rateLimit } from "@/lib/rate-limit";
import { allProjects } from "@/data/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  sessionId: z.string().nullable().optional(),
  locale: z.enum(["en", "ar"]).default("en"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      }),
    )
    .min(1)
    .max(40),
});

function getClientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() ?? "anon";
}

function fallbackReply(locale: "en" | "ar", question: string) {
  const lower = question.toLowerCase();
  const isArabic = locale === "ar" || /[\u0600-\u06FF]/.test(question);
  const useAr = locale === "ar" || isArabic;

  if (lower.includes("service") || lower.includes("خدمات")) {
    return useAr
      ? "نقدّم أربع ركائز: الاستشارات الهندسية والمعمارية، التوريدات العامة، المقاولات والتنفيذ المتميّز، وحلول الأمن السيبراني المتقدمة."
      : "We deliver four pillars: Engineering & Architectural Consulting, General Supplies & Sourcing, Premium Contracting & Execution, and Advanced Cybersecurity Solutions.";
  }
  if (
    lower.includes("project") ||
    lower.includes("portfolio") ||
    lower.includes("أعمال") ||
    lower.includes("مشاريع")
  ) {
    const sample = allProjects.slice(0, 3).map((p) => `• ${p.title} (${p.service})`).join("\n");
    return useAr
      ? `لدينا أكثر من 300 مشروع منجز. أمثلة:\n${sample}`
      : `We've delivered 300+ projects. A few examples:\n${sample}`;
  }
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("phone") ||
    lower.includes("تواصل")
  ) {
    return useAr
      ? "للتواصل: m.mostafa@binjimz.com · +20 10 10429021 · القاهرة، شارع مدينة نصر."
      : "Contact us: m.mostafa@binjimz.com · +20 10 10429021 · Nasr City, Cairo.";
  }
  return useAr
    ? "أنا جيمز، المساعد الذكي لشركة بن جيمز. تفضّل بسؤالك حول الهندسة أو المقاولات أو التوريدات أو الأمن السيبراني."
    : "I'm Jimz, the AI assistant for Bin Jimz. Ask me about our engineering, contracting, supplies or cybersecurity capabilities.";
}

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch (e) {
    return new Response("Invalid body", { status: 400 });
  }

  const ip = getClientIp(req);
  const rl = rateLimit({ key: `chat:${ip}`, limit: 30, windowMs: 60_000 });
  if (!rl.success) {
    return new Response("Too many requests. Please slow down.", { status: 429 });
  }

  const { messages, locale } = parsed;
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  if (!isOpenAiConfigured()) {
    const reply = fallbackReply(locale, lastUser);
    const stream = new ReadableStream({
      start(ctrl) {
        const encoder = new TextEncoder();
        let i = 0;
        const tick = () => {
          if (i >= reply.length) {
            ctrl.close();
            return;
          }
          ctrl.enqueue(encoder.encode(reply.slice(i, i + 4)));
          i += 4;
          setTimeout(tick, 18);
        };
        tick();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-session-id": "anon",
        "Cache-Control": "no-store",
      },
    });
  }

  const system = buildSystemPrompt(locale);
  const fullMessages = [
    { role: "system" as const, content: system },
    {
      role: "system" as const,
      content: `Reference knowledge:\n${BIN_JIMZ_KNOWLEDGE}\n\nProject samples (titles only):\n${allProjects
        .map((p) => `- ${p.title} (${p.sector}/${p.service})`)
        .join("\n")}`,
    },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: MODELS.chat,
          stream: true,
          temperature: 0.4,
          messages: fullMessages,
        });

        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (err) {
        console.error("[chat] streaming error", err);
        const reply = fallbackReply(locale, lastUser);
        controller.enqueue(encoder.encode(reply));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "x-session-id": parsed.sessionId ?? "session",
      "Cache-Control": "no-store",
    },
  });
}
