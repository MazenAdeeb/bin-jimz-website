import { put, del } from "@vercel/blob";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export const blobConfigured = Boolean(TOKEN);

export async function uploadToBlob(opts: {
  filename: string;
  contentType: string;
  data: ArrayBuffer | Uint8Array | Blob | Buffer;
  scope?: "projects" | "news" | "team" | "site" | "misc";
}) {
  if (!TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN missing");

  const stamp = Date.now();
  const safeName = opts.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${opts.scope ?? "misc"}/${stamp}-${safeName}`;

  const result = await put(key, opts.data as Buffer | Blob, {
    access: "public",
    contentType: opts.contentType,
    token: TOKEN,
    addRandomSuffix: false,
  });

  return {
    url: result.url,
    pathname: result.pathname,
  };
}

export async function deleteFromBlob(url: string) {
  if (!TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN missing");
  await del(url, { token: TOKEN });
}
