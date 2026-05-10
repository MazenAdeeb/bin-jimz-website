"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save, Trash2 } from "lucide-react";
import { MediaPicker } from "./media-picker";

type Values = {
  slug?: string;
  email?: string;
  order?: number;
  active?: boolean;
  imageId?: string | null;
  nameEn?: string;
  nameAr?: string;
  roleEn?: string;
  roleAr?: string;
  bioEn?: string;
  bioAr?: string;
};

export function TeamForm({
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
        name="imageId"
        label="Photo"
        defaultValue={defaults?.imageId ?? undefined}
        scope="team"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field name="nameEn" label="Name (EN)" required defaultValue={defaults?.nameEn} />
        <Field name="nameAr" label="Name (AR)" defaultValue={defaults?.nameAr} dir="rtl" />
        <Field name="roleEn" label="Role (EN)" defaultValue={defaults?.roleEn} />
        <Field name="roleAr" label="Role (AR)" defaultValue={defaults?.roleAr} dir="rtl" />
      </div>

      <Textarea name="bioEn" label="Bio (EN)" defaultValue={defaults?.bioEn} rows={4} />
      <Textarea name="bioAr" label="Bio (AR)" defaultValue={defaults?.bioAr} rows={4} dir="rtl" />

      <div className="grid gap-5 md:grid-cols-3">
        <Field name="email" label="Email (optional)" defaultValue={defaults?.email} />
        <Field
          name="order"
          label="Display order"
          type="number"
          defaultValue={String(defaults?.order ?? 0)}
        />
        <label
          className="inline-flex items-center gap-2 self-end pb-3 text-sm"
          style={{ color: "var(--color-text-dim)" }}
        >
          <input type="checkbox" name="active" defaultChecked={defaults?.active ?? true} /> Active
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
        if (!confirm("Delete this team member?")) e.preventDefault();
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
  defaultValue,
  dir,
}: {
  name: string;
  label: string;
  rows?: number;
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
        defaultValue={defaultValue}
        dir={dir}
        className="mt-2 w-full resize-y border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}
