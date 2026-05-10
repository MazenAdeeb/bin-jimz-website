import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { NewsForm } from "@/components/admin/news-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.newsArticle.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!article) notFound();

  const en = article.translations.find((t) => t.locale === "en");
  const ar = article.translations.find((t) => t.locale === "ar");

  async function update(fd: FormData) {
    "use server";
    const titleEn = String(fd.get("titleEn") ?? "").trim();
    const titleAr = String(fd.get("titleAr") ?? "").trim();
    const excerptEn = String(fd.get("excerptEn") ?? "").trim();
    const excerptAr = String(fd.get("excerptAr") ?? "").trim();
    const bodyEn = String(fd.get("bodyEn") ?? "").trim();
    const bodyAr = String(fd.get("bodyAr") ?? "").trim();
    const coverId = (fd.get("coverId") as string) || null;
    const publishedAtStr = String(fd.get("publishedAt") ?? "");
    const publishedAt = publishedAtStr ? new Date(publishedAtStr) : null;

    await prisma.newsArticle.update({
      where: { id },
      data: {
        coverId,
        publishedAt,
        translations: {
          update: [
            {
              where: { articleId_locale: { articleId: id, locale: "en" } },
              data: { title: titleEn, excerpt: excerptEn, body: bodyEn },
            },
            {
              where: { articleId_locale: { articleId: id, locale: "ar" } },
              data: {
                title: titleAr || titleEn,
                excerpt: excerptAr || excerptEn,
                body: bodyAr || bodyEn,
              },
            },
          ],
        },
      },
    });

    revalidatePath("/admin/news");
    revalidatePath("/en/insights");
    revalidatePath("/ar/insights");
    redirect("/admin/news");
  }

  async function remove() {
    "use server";
    await prisma.newsArticle.delete({ where: { id } });
    revalidatePath("/admin/news");
    redirect("/admin/news");
  }

  return (
    <>
      <AdminPageHeader title={en?.title ?? article.slug} subtitle="Edit article" />
      <NewsForm
        defaults={{
          slug: article.slug,
          publishedAt: article.publishedAt
            ? new Date(article.publishedAt).toISOString().slice(0, 10)
            : "",
          coverId: article.coverId,
          titleEn: en?.title ?? "",
          titleAr: ar?.title ?? "",
          excerptEn: en?.excerpt ?? "",
          excerptAr: ar?.excerpt ?? "",
          bodyEn: en?.body ?? "",
          bodyAr: ar?.body ?? "",
        }}
        action={update}
        deleteAction={remove}
      />
    </>
  );
}
