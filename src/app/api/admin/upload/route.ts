import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { presignUpload } from "@/lib/s3";

export const runtime = "nodejs";

const schema = z.object({
  filename: z.string().min(1).max(160),
  contentType: z.string().min(1).max(120),
  scope: z.enum(["projects", "news", "team", "misc"]).default("misc"),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const bucket = process.env.S3_BUCKET_MEDIA;
  if (!bucket) return NextResponse.json({ error: "bucket-not-configured" }, { status: 500 });

  const stamp = Date.now();
  const safeName = body.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${body.scope}/${stamp}-${safeName}`;

  const presigned = await presignUpload({
    bucket,
    key,
    contentType: body.contentType,
  });

  return NextResponse.json({ key, ...presigned });
}
