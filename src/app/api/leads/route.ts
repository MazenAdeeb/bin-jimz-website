import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, leadEmailHtml } from "@/lib/ses";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const leadSchema = z.object({
  source: z.enum([
    "contact_form",
    "chatbot",
    "consultation",
    "cybersecurity_assessment",
  ]),
  name: z.string().min(2).max(120),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(4).max(40).optional().nullable(),
  company: z.string().max(120).optional().nullable(),
  service: z.string().max(60).optional().nullable(),
  message: z.string().max(4000).optional().nullable(),
  locale: z.enum(["en", "ar"]).optional(),
});

function getClientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() ?? "anon";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit({ key: `leads:${ip}`, limit: 8, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json({ error: "rate-limited" }, { status: 429 });
  }

  let body;
  try {
    body = leadSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Persist to DB if available, otherwise log.
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.lead.create({
      data: {
        source: body.source,
        name: body.name,
        email: body.email ?? null,
        phone: body.phone ?? null,
        company: body.company ?? null,
        service: body.service ?? null,
        message: body.message ?? null,
      },
    });
  } catch (e) {
    console.warn("[leads] db unavailable, skipping persist", e);
  }

  try {
    const sales = process.env.SES_SALES_EMAIL ?? "m.mostafa@binjimz.com";
    await sendEmail({
      to: sales,
      subject: `New ${body.source} lead — ${body.name}`,
      html: leadEmailHtml(body),
      replyTo: body.email ?? undefined,
    });
  } catch (e) {
    console.warn("[leads] email failed", e);
  }

  return NextResponse.json({ ok: true });
}
