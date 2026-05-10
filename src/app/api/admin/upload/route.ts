import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToBlob, blobConfigured } from "@/lib/blob";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "application/pdf",
];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!blobConfigured) {
    return NextResponse.json(
      {
        error:
          "Blob storage not configured. In Vercel: Storage → Create Blob, then redeploy.",
      },
      { status: 500 },
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  const scope =
    (form.get("scope") as "projects" | "news" | "team" | "site" | "misc") ?? "misc";
  const alt = (form.get("alt") as string | null) ?? null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no-file" }, { status: 400 });
  }

  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large (max 25 MB)" },
      { status: 413 },
    );
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type}` },
      { status: 415 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const uploaded = await uploadToBlob({
    filename: file.name,
    contentType: file.type,
    data: Buffer.from(arrayBuffer),
    scope,
  });

  const userId = (session.user as { id?: string }).id;

  const asset = await prisma.mediaAsset.create({
    data: {
      url: uploaded.url,
      s3Key: uploaded.pathname,
      mime: file.type,
      bytes: file.size,
      alt,
      uploadedById: userId || null,
    },
  });

  return NextResponse.json({ asset });
}
