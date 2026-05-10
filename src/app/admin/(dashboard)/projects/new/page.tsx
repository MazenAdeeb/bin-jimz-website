import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { slugify } from "@/lib/utils";
import { ProjectStatus, type ServicePillar } from "@prisma/client";

async function createProject(fd: FormData) {
  "use server";
  const titleEn = String(fd.get("titleEn") ?? "");
  const titleAr = String(fd.get("titleAr") ?? "");
  const summaryEn = String(fd.get("summaryEn") ?? "");
  const summaryAr = String(fd.get("summaryAr") ?? "");
  const sector = String(fd.get("sector") ?? "");
  const year = parseInt(String(fd.get("year") ?? "2025"), 10);
  const slug = slugify(titleEn);
  const featured = fd.get("featured") === "on";

  await prisma.project.create({
    data: {
      slug,
      year,
      sector,
      featured,
      status: ProjectStatus.draft,
      translations: {
        create: [
          {
            locale: "en",
            title: titleEn,
            summary: summaryEn,
            scope: "",
            outcomes: "",
            tags: [],
          },
          {
            locale: "ar",
            title: titleAr || titleEn,
            summary: summaryAr || summaryEn,
            scope: "",
            outcomes: "",
            tags: [],
          },
        ],
      },
    },
  });

  redirect("/admin/projects");
}

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader title="New project" subtitle="Add a case study to the portfolio." />

      <form action={createProject} className="mt-8 max-w-3xl space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field name="titleEn" label="Title (EN)" required />
          <Field name="titleAr" label="Title (AR)" />
          <Field name="sector" label="Sector" />
          <Field name="year" label="Year" type="number" defaultValue="2025" />
        </div>
        <Textarea name="summaryEn" label="Summary (EN)" rows={4} required />
        <Textarea name="summaryAr" label="Summary (AR)" rows={4} />

        <label className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-text-dim)" }}>
          <input type="checkbox" name="featured" /> Feature on home page
        </label>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="font-display rounded px-7 py-3 text-[11px] tracking-[0.22em] uppercase text-[var(--color-base)]"
            style={{ background: "var(--color-gold)" }}
          >
            Save draft
          </button>
        </div>
      </form>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="font-display text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--color-gold)" }}>
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
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
    <label className="block">
      <span className="font-display text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--color-gold)" }}>
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="mt-2 w-full resize-y border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}
