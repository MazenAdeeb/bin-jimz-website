import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openai, MODELS, isOpenAiConfigured } from "@/lib/openai";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  text: z.string().min(1).max(2400),
  voice: z.string().optional(),
});

function getClientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() ?? "anon";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit({ key: `tts:${ip}`, limit: 30, windowMs: 60_000 });
  if (!rl.success)
    return NextResponse.json({ error: "rate-limited" }, { status: 429 });

  if (!isOpenAiConfigured()) {
    return new Response(new Uint8Array(), {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  }

  let body;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const speech = await openai.audio.speech.create({
      model: MODELS.tts,
      voice: body.voice ?? "alloy",
      input: body.text,
    });
    const ab = await speech.arrayBuffer();
    return new Response(ab, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[tts] error", e);
    return NextResponse.json({ error: "tts-failed" }, { status: 500 });
  }
}
