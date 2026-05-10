"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save, Trash2 } from "lucide-react";
import { MediaPicker } from "./media-picker";
import { GalleryPicker } from "./gallery-picker";

type ProjectFormValues = {
  id?: string;
  slug?: string;
  titleEn?: string;
  titleAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  scopeEn?: string;
  scopeAr?: string;
  outcomesEn?: string;
  outcomesAr?: string;
  sector?: string;
  client?: string;
  location?: string;
  year?: number;
  status?: "draft" | "published" | "archived";
  featured?: boolean;
  coverImageId?: string | null;
  galleryIds?: string[];
};

export function ProjectForm({
  defaults,
  action,
  deleteAction,
}: {
  defaults?: ProjectFormValues;
  action: (fd: FormData) => void | Promise<void>;
  deleteAction?: () => void | Promise<void>;
}) {
  return (
    <form action={action} className="mt-8 max-w-3xl space-y-7">
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="titleEn" label="Title (EN)" required defaultValue={defaults?.titleEn} />
        <Field name="titleAr" label="Title (AR)" defaultValue={defaults?.titleAr} dir="rtl" />
        <Field name="sector" label="Sector" defaultValue={defaults?.sector} />
        <Field name="client" label="Client (optional)" defaultValue={defaults?.client} />
        <Field name="location" label="Location" defaultValue={defaults?.location} />
        <Field
          name="year"
          label="Year"
          type="number"
          defaultValue={String(defaults?.year ?? new Date().getFullYear())}
        />
      </div>

      <Textarea
        name="summaryEn"
        label="Summary (EN)"
        rows={3}
        required
        defaultValue={defaults?.summaryEn}
      />
      <Textarea
        name="summaryAr"
        label="Summary (AR)"
        rows={3}
        dir="rtl"
        defaultValue={defaults?.summaryAr}
      />

      <Textarea
        name="scopeEn"
        label="Scope of work (EN)"
        rows={3}
        defaultValue={defaults?.scopeEn}
      />
      <Textarea
        name="scopeAr"
        label="Scope of work (AR)"
        rows={3}
        dir="rtl"
        defaultValue={defaults?.scopeAr}
      />

      <Textarea
        name="outcomesEn"
        label="Outcomes (EN)"
        rows={3}
        defaultValue={defaults?.outcomesEn}
      />
      <Textarea
        name="outcomesAr"
        label="Outcomes (AR)"
        rows={3}
        dir="rtl"
        defaultValue={defaults?.outcomesAr}
      />

      <MediaPicker
        name="coverImageId"
        label="Cover image"
        defaultValue={defaults?.coverImageId ?? undefined}
        scope="projects"
      />

      <GalleryPicker
        name="galleryIds"
        label="Gallery (multiple)"
        defaultValue={defaults?.galleryIds ?? []}
        scope="projects"
      />

      <div className="flex flex-wrap items-center gap-6">
        <label
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "var(--color-text-dim)" }}
        >
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaults?.featured ?? false}
          />
          Feature on home page
        </label>

        <label className="block">
          <span
            className="font-display block text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--color-gold)" }}
          >
            Status
          </span>
          <select
            name="status"
            defaultValue={defaults?.status ?? "draft"}
            className="mt-2 rounded border bg-transparent px-2 py-1.5 text-sm"
            style={{
              borderColor: "rgba(200,169,106,0.3)",
              color: "var(--color-text)",
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      </div>

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
        if (!confirm("Delete this project? This cannot be undone.")) e.preventDefault();
      }}
      className="font-display inline-flex items-center gap-2 rounded border px-5 py-3 text-[11px] tracking-[0.22em] uppercase disabled:opacity-50"
      style={{
        borderColor: "rgba(255,80,80,0.4)",
        color: "#ff8888",
      }}
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
        className="mt-2 w-full resize-y border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}
