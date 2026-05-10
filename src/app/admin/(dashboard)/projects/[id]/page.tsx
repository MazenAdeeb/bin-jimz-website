import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProjectStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { translations: true },
  });

  if (!project) notFound();

  const en = project.translations.find((t) => t.locale === "en");
  const ar = project.translations.find((t) => t.locale === "ar");

  async function update(fd: FormData) {
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

    await prisma.project.update({
      where: { id },
      data: {
        year,
        sector: sector || null,
        client: client || null,
        location: location || null,
        featured,
        status,
        coverImageId,
        galleryIds,
        translations: {
          update: [
            {
              where: {
                projectId_locale: { projectId: id, locale: "en" },
              },
              data: {
                title: titleEn,
                summary: summaryEn,
                scope: scopeEn,
                outcomes: outcomesEn,
              },
            },
            {
              where: {
                projectId_locale: { projectId: id, locale: "ar" },
              },
              data: {
                title: titleAr || titleEn,
                summary: summaryAr || summaryEn,
                scope: scopeAr || scopeEn,
                outcomes: outcomesAr || outcomesEn,
              },
            },
          ],
        },
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath("/en");
    revalidatePath("/ar");
    revalidatePath("/en/projects");
    revalidatePath("/ar/projects");
    redirect("/admin/projects");
  }

  async function remove() {
    "use server";
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/en/projects");
    revalidatePath("/ar/projects");
    redirect("/admin/projects");
  }

  return (
    <>
      <AdminPageHeader
        title={en?.title ?? project.slug}
        subtitle={`Edit project · ${project.status}`}
      />
      <ProjectForm
        defaults={{
          id: project.id,
          slug: project.slug,
          titleEn: en?.title ?? "",
          titleAr: ar?.title ?? "",
          summaryEn: en?.summary ?? "",
          summaryAr: ar?.summary ?? "",
          scopeEn: en?.scope ?? "",
          scopeAr: ar?.scope ?? "",
          outcomesEn: en?.outcomes ?? "",
          outcomesAr: ar?.outcomes ?? "",
          sector: project.sector ?? "",
          client: project.client ?? "",
          location: project.location ?? "",
          year: project.year,
          status: project.status,
          featured: project.featured,
          coverImageId: project.coverImageId,
          galleryIds: project.galleryIds,
        }}
        action={update}
        deleteAction={remove}
      />
    </>
  );
}
