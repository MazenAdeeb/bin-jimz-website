"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, X } from "lucide-react";

type UploadedAsset = {
  id: string;
  url: string;
  mime: string;
  alt: string | null;
};

type Props = {
  scope?: "projects" | "news" | "team" | "site" | "misc";
  multiple?: boolean;
  onUploaded?: (asset: UploadedAsset) => void;
  label?: string;
};

export function MediaUploader({
  scope = "misc",
  multiple = true,
  onUploaded,
  label = "Upload images / videos",
}: Props) {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    setProgress({ current: 0, total: files.length });

    try {
      for (let i = 0; i < files.length; i++) {
        setProgress({ current: i + 1, total: files.length });
        const fd = new FormData();
        fd.append("file", files[i]);
        fd.append("scope", scope);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error ?? `Upload failed (${res.status})`);
        }
        const j = (await res.json()) as { asset: UploadedAsset };
        onUploaded?.(j.asset);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      setProgress(null);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <div>
      <label
        className="flex cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed px-6 py-8 text-sm transition-colors hover:bg-white/5"
        style={{
          borderColor: "rgba(200,169,106,0.3)",
          color: "var(--color-text-dim)",
        }}
      >
        <input
          ref={ref}
          type="file"
          multiple={multiple}
          accept="image/*,video/*,application/pdf"
          className="hidden"
          disabled={busy}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {busy ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>
              Uploading {progress?.current}/{progress?.total}…
            </span>
          </>
        ) : (
          <>
            <Upload size={16} style={{ color: "var(--color-gold)" }} />
            <span>{label}</span>
            <span className="text-[10px] tracking-[0.18em] uppercase opacity-70">
              · max 25 MB
            </span>
          </>
        )}
      </label>

      {error && (
        <p className="mt-2 flex items-center gap-2 text-xs" style={{ color: "#ff8888" }}>
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}
