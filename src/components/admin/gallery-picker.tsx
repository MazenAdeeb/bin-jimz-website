"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, X, Loader2 } from "lucide-react";

type Asset = {
  id: string;
  url: string;
  mime: string;
  alt: string | null;
};

type Props = {
  name: string;
  label?: string;
  defaultValue?: string[];
  scope?: "projects" | "news" | "team" | "site" | "misc";
};

export function GalleryPicker({
  name,
  label = "Gallery",
  defaultValue = [],
  scope = "projects",
}: Props) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selected, setSelected] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);

  useEffect(() => {
    if (defaultValue.length > 0) {
      Promise.all(
        defaultValue.map((id) =>
          fetch(`/api/admin/media/${id}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((j: { asset?: Asset } | null) => j?.asset ?? null)
            .catch(() => null),
        ),
      ).then((items) => {
        setSelected(items.filter((x): x is Asset => Boolean(x)));
      });
    }
     
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open]);

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
    try {
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        fd.append("scope", scope);
        await fetch("/api/admin/upload", { method: "POST", body: fd });
      }
      await load();
    } finally {
      setUploadBusy(false);
    }
  }

  function toggle(asset: Asset) {
    setSelected((prev) =>
      prev.some((x) => x.id === asset.id)
        ? prev.filter((x) => x.id !== asset.id)
        : [...prev, asset],
    );
  }

  function removeOne(id: string) {
    setSelected((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div>
      {selected.map((s) => (
        <input key={s.id} type="hidden" name={name} value={s.id} />
      ))}

      <span
        className="font-display block text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>

      <div className="mt-3 flex flex-wrap gap-3">
        {selected.map((s) => (
          <div
            key={s.id}
            className="relative h-20 w-20 overflow-hidden rounded-md border"
            style={{ borderColor: "rgba(200,169,106,0.3)" }}
          >
            <Image src={s.url} alt="" fill className="object-cover" sizes="80px" />
            <button
              type="button"
              onClick={() => removeOne(s.id)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 hover:bg-red-600/70"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed transition-colors hover:bg-white/5"
          style={{ borderColor: "rgba(200,169,106,0.3)", color: "var(--color-gold)" }}
        >
          <Plus size={18} />
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
              <h3 className="font-display text-lg">
                Pick gallery images ({selected.length} selected)
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase"
                style={{ borderColor: "rgba(200,169,106,0.3)", color: "var(--color-gold)" }}
              >
                Done
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
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
              {loading ? (
                <p className="py-12 text-center text-sm" style={{ color: "var(--color-text-mute)" }}>
                  Loading…
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                  {assets
                    .filter((a) => a.mime.startsWith("image/"))
                    .map((a) => {
                      const isSelected = selected.some((x) => x.id === a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => toggle(a)}
                          className="group relative aspect-square overflow-hidden rounded-md border-2 transition-all"
                          style={{
                            borderColor: isSelected
                              ? "var(--color-gold)"
                              : "rgba(200,169,106,0.18)",
                          }}
                        >
                          <Image
                            src={a.url}
                            alt={a.alt ?? ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 33vw, 20vw"
                          />
                          {isSelected && (
                            <div
                              className="absolute right-1 top-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                              style={{
                                background: "var(--color-gold)",
                                color: "var(--color-base)",
                              }}
                            >
                              ✓
                            </div>
                          )}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
