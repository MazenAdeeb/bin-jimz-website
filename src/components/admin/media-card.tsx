"use client";

import { useState, useTransition } from "react";
import { Copy, Trash2, Check, Loader2 } from "lucide-react";

type Asset = {
  id: string;
  url: string;
  mime: string;
  alt: string | null;
  bytes: number | null;
  createdAt: Date | string;
};

export function MediaCard({
  asset,
  onDelete,
}: {
  asset: Asset;
  onDelete: (id: string) => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const isVideo = asset.mime.startsWith("video/");
  const isImage = asset.mime.startsWith("image/");
  const isPdf = asset.mime === "application/pdf";

  async function copyUrl() {
    await navigator.clipboard.writeText(asset.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDelete() {
    if (!confirm("Delete this asset? It will be removed from storage.")) return;
    startTransition(async () => {
      await onDelete(asset.id);
    });
  }

  return (
    <div
      className="group relative overflow-hidden rounded-md border"
      style={{ borderColor: "rgba(200,169,106,0.18)" }}
    >
      <div
        className="aspect-square w-full bg-black/30"
        style={{ backgroundImage: isImage ? `url(${asset.url})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {isVideo && (
          <video src={asset.url} className="h-full w-full object-cover" muted />
        )}
        {isPdf && (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.22em]"
               style={{ color: "var(--color-gold)" }}>
            PDF
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={copyUrl}
          className="flex items-center gap-1.5 rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur hover:bg-white/20"
          style={{ color: "var(--color-text)" }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy URL"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="flex items-center gap-1.5 rounded bg-red-600/30 px-2 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur hover:bg-red-600/60 disabled:opacity-50"
          style={{ color: "#ffcccc" }}
        >
          {pending ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
          Delete
        </button>
      </div>
    </div>
  );
}
