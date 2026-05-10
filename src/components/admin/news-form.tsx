"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save, Trash2 } from "lucide-react";
import { MediaPicker } from "./media-picker";

type Values = {
  slug?: string;
  publishedAt?: string;
  coverId?: string | null;
  titleEn?: string;
  titleAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  bodyEn?: string;
  bodyAr?: string;
};

export function NewsForm({
  defaults,
  action,
  deleteAction,
}: {
  defaults?: Values;
  action: (fd: FormData) => void | Promise<void>;
  deleteAction?: () => void | Promise<void>;
}) {
  return (
    <form action={action} className="mt-8 max-w-3xl space-y-7">
      <MediaPicker
        name="coverId"
        label="Cover image"
        defaultValue={defaults?.coverId ?? undefined}
        scope="news"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field name="titleEn" label="Title (EN)" required defaultValue={defaults?.titleEn} />
        <Field name="titleAr" label="Title (AR)" defaultValue={defaults?.titleAr} dir="rtl" />
      </div>

      <Textarea
        name="excerptEn"
        label="Excerpt (EN)"
        rows={2}
        defaultValue={defaults?.excerptEn}
      />
      <Textarea
        name="excerptAr"
        label="Excerpt (AR)"
        rows={2}
        defaultValue={defaults?.excerptAr}
        dir="rtl"
      />

      <Textarea
        name="bodyEn"
        label="Body (EN) — Markdown supported"
        rows={10}
        required
        defaultValue={defaults?.bodyEn}
      />
      <Textarea
        name="bodyAr"
        label="Body (AR) — Markdown supported"
        rows={10}
        defaultValue={defaults?.bodyAr}
        dir="rtl"
      />

      <Field
        name="publishedAt"
        label="Publish date (leave empty to keep as draft)"
        type="date"
        defaultValue={defaults?.publishedAt}
      />

      <div className="flex justify-between gap-3 pt-4">
        {deleteAction ? (
          <form action={deleteAction}>
            <DeleteButton />
          </form>
        ) : (
          <span />
        )}
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-display inline-flex items-center gap-2 rounded px-7 py-3 text-[11px] tracking-[0.22em] uppercase text-[var(--color-base)] disabled:opacity-50"
      style={{ background: "var(--color-gold)" }}
    >
      {pending ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
      Save
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("Delete this article?")) e.preventDefault();
      }}
      className="font-display inline-flex items-center gap-2 rounded border px-5 py-3 text-[11px] tracking-[0.22em] uppercase disabled:opacity-50"
      style={{ borderColor: "rgba(255,80,80,0.4)", color: "#ff8888" }}
    >
      {pending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
      Delete
    </button>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  dir,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span
        className="font-display text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        dir={dir}
        className="mt-2 w-full border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  rows = 3,
  required,
  defaultValue,
  dir,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span
        className="font-display text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        dir={dir}
        className="mt-2 w-full resize-y border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)] font-mono"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}
