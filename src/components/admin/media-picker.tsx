"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";

type Asset = {
  id: string;
  url: string;
  mime: string;
  alt: string | null;
};

type Props = {
  name: string;
  label?: string;
  defaultValue?: string;
  scope?: "projects" | "news" | "team" | "site" | "misc";
};

export function MediaPicker({ name, label = "Cover image", defaultValue, scope = "projects" }: Props) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(defaultValue ?? null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      load();
    }
     
  }, [open]);

  useEffect(() => {
    if (selectedId && !selectedUrl) {
      fetch(`/api/admin/media/${selectedId}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j: { asset?: Asset } | null) => {
          if (j?.asset) setSelectedUrl(j.asset.url);
        })
        .catch(() => {});
    }
  }, [selectedId, selectedUrl]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const j = (await res.json()) as { assets: Asset[] };
      setAssets(j.assets ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadBusy(true);
    setError(null);
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        fd.append("scope", scope);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error ?? "Upload failed");
        }
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadBusy(false);
    }
  }

  function pick(asset: Asset) {
    setSelectedId(asset.id);
    setSelectedUrl(asset.url);
    setOpen(false);
  }

  function clear() {
    setSelectedId(null);
    setSelectedUrl(null);
  }

  return (
    <div>
      <input type="hidden" name={name} value={selectedId ?? ""} />
      <span
        className="font-display block text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>

      <div className="mt-2 flex items-center gap-3">
        {selectedUrl ? (
          <div
            className="relative h-24 w-24 overflow-hidden rounded-md border"
            style={{ borderColor: "rgba(200,169,106,0.3)" }}
          >
            <Image src={selectedUrl} alt="" fill className="object-cover" sizes="96px" />
            <button
              type="button"
              onClick={clear}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 hover:bg-red-600/70"
              aria-label="Clear"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div
            className="flex h-24 w-24 items-center justify-center rounded-md border"
            style={{ borderColor: "rgba(200,169,106,0.18)", color: "var(--color-text-mute)" }}
          >
            <ImagePlus size={20} />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border px-4 py-2 text-[10px] tracking-[0.22em] uppercase transition-colors hover:bg-white/5"
          style={{ borderColor: "rgba(200,169,106,0.3)", color: "var(--color-gold)" }}
        >
          {selectedId ? "Change" : "Pick image"}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-md border"
            style={{
              borderColor: "rgba(200,169,106,0.3)",
              background: "var(--color-base)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: "rgba(200,169,106,0.18)" }}
            >
              <h3 className="font-display text-lg">Choose an image</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-4">
              <label
                className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed py-3 text-xs hover:bg-white/5"
                style={{ borderColor: "rgba(200,169,106,0.3)", color: "var(--color-text-dim)" }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={uploadBusy}
                  onChange={(e) => handleUpload(e.target.files)}
                />
                {uploadBusy ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Uploading…
                  </>
                ) : (
                  <>+ Upload new image(s)</>
                )}
              </label>
              {error && (
                <p className="mt-2 text-xs" style={{ color: "#ff8888" }}>
                  {error}
                </p>
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
              {loading ? (
                <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-mute)" }}>
                  Loading…
                </p>
              ) : assets.length === 0 ? (
                <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-mute)" }}>
                  No media yet. Upload above.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                  {assets
                    .filter((a) => a.mime.startsWith("image/"))
                    .map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => pick(a)}
                        className="group relative aspect-square overflow-hidden rounded-md border transition-all hover:border-[var(--color-gold)]"
                        style={{ borderColor: "rgba(200,169,106,0.18)" }}
                      >
                        <Image
                          src={a.url}
                          alt={a.alt ?? ""}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 33vw, 20vw"
                        />
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
