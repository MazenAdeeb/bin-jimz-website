import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/page-header";
import { NewsForm } from "@/components/admin/news-form";

async function create(fd: FormData) {
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

  const slug = `${slugify(titleEn)}-${Math.random().toString(36).slice(2, 6)}`;

  const article = await prisma.newsArticle.create({
    data: {
      slug,
      coverId,
      publishedAt,
      translations: {
        create: [
          { locale: "en", title: titleEn, excerpt: excerptEn, body: bodyEn },
          {
            locale: "ar",
            title: titleAr || titleEn,
            excerpt: excerptAr || excerptEn,
            body: bodyAr || bodyEn,
          },
        ],
      },
    },
  });

  revalidatePath("/admin/news");
  revalidatePath("/en/insights");
  revalidatePath("/ar/insights");
  redirect(`/admin/news/${article.id}`);
}

export default function NewArticlePage() {
  return (
    <>
      <AdminPageHeader title="New article" />
      <NewsForm action={create} />
    </>
  );
}
