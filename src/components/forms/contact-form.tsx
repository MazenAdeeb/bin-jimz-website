"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "contact_form", locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-md border p-6 md:p-8"
      style={{
        borderColor: "rgba(200,169,106,0.18)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="name" label={t("name")} required />
        <Field name="email" label={t("email")} type="email" required />
        <Field name="phone" label={t("phone")} />
        <Field name="company" label={t("company")} />
      </div>
      <Select
        name="service"
        label={t("service")}
        options={[
          { value: "engineering", label: tServices("engineering.title") },
          { value: "supplies", label: tServices("supplies.title") },
          { value: "contracting", label: tServices("contracting.title") },
          { value: "cybersecurity", label: tServices("cybersecurity.title") },
        ]}
      />
      <Textarea name="message" label={t("message")} required rows={5} />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs" style={{ color: "var(--color-text-mute)" }}>
          {status === "success" && (
            <span style={{ color: "var(--color-gold)" }}>{t("success")}</span>
          )}
          {status === "error" && (
            <span style={{ color: "#ff8888" }}>{t("error")}</span>
          )}
        </p>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}

function FieldShell({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span
        className="font-display block text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <FieldShell label={label}>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </FieldShell>
  );
}

function Textarea({
  name,
  label,
  rows = 4,
  required,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <FieldShell label={label}>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="w-full resize-y border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </FieldShell>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldShell label={label}>
      <select
        name={name}
        defaultValue=""
        className="w-full border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      >
        <option value="" disabled>
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[var(--color-base)]">
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
