import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProjectStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

async function createProject(fd: FormData) {
  "use server";
  const titleEn = String(fd.get("titleEn") ?? "").trim();
  const titleAr = String(fd.get("titleAr") ?? "").trim();
  const summaryEn = String(fd.get("summaryEn") ?? "").trim();
  const summaryAr = String(fd.get("summaryAr") ?? "").trim();
  const scopeEn = String(fd.get("scopeEn") ?? "").trim();
  const scopeAr = String(fd.get("scopeAr") ?? "").trim();
  const outcomesEn = String(fd.get("outcomesEn") ?? "").trim();
  const outcomesAr = String(fd.get("outcomesAr") ?? "").trim();
  const sector = String(fd.get("sector") ?? "").trim();
  const client = String(fd.get("client") ?? "").trim();
  const location = String(fd.get("location") ?? "").trim();
  const year = parseInt(String(fd.get("year") ?? new Date().getFullYear()), 10);
  const featured = fd.get("featured") === "on";
  const status = (String(fd.get("status") ?? "draft") as ProjectStatus) || "draft";
  const coverImageId = (fd.get("coverImageId") as string) || null;
  const galleryIds = fd.getAll("galleryIds").map(String).filter(Boolean);

  const baseSlug = slugify(titleEn);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;

  const project = await prisma.project.create({
    data: {
      slug,
      year,
      sector: sector || null,
      client: client || null,
      location: location || null,
      featured,
      status,
      coverImageId,
      galleryIds,
      translations: {
        create: [
          {
            locale: "en",
            title: titleEn,
            summary: summaryEn,
            scope: scopeEn,
            outcomes: outcomesEn,
            tags: [],
          },
          {
            locale: "ar",
            title: titleAr || titleEn,
            summary: summaryAr || summaryEn,
            scope: scopeAr || scopeEn,
            outcomes: outcomesAr || outcomesEn,
            tags: [],
          },
        ],
      },
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/en/projects");
  revalidatePath("/ar/projects");
  redirect(`/admin/projects/${project.id}`);
}

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader title="New project" subtitle="Add a case study to the portfolio." />
      <ProjectForm action={createProject} />
    </>
  );
}
