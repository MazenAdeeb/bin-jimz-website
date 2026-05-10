import { NextRequest, NextResponse } from "next/server";
import { openai, MODELS, isOpenAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() ?? "anon";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit({ key: `stt:${ip}`, limit: 20, windowMs: 60_000 });
  if (!rl.success)
    return NextResponse.json({ error: "rate-limited" }, { status: 429 });

  if (!isOpenAiConfigured()) {
    return NextResponse.json({
      text: "",
      note: "OPENAI_API_KEY not configured",
    });
  }

  try {
    const form = await req.formData();
    const audio = form.get("audio");
    const locale = (form.get("locale") as string | null) ?? "en";
    if (!(audio instanceof Blob)) {
      return NextResponse.json({ error: "no-audio" }, { status: 400 });
    }
    const file = new File([audio], "speech.webm", { type: audio.type || "audio/webm" });

    const result = await openai.audio.transcriptions.create({
      file,
      model: MODELS.stt,
      language: locale === "ar" ? "ar" : "en",
    });

    return NextResponse.json({ text: result.text });
  } catch (e) {
    console.error("[transcribe] error", e);
    return NextResponse.json({ error: "transcribe-failed" }, { status: 500 });
  }
}
