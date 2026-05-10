import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function NewsAdminPage() {
  let articles: Awaited<ReturnType<typeof prisma.newsArticle.findMany>> = [];
  try {
    articles = await prisma.newsArticle.findMany({
      include: { translations: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  return (
    <>
      <AdminPageHeader title="News & Insights" subtitle={`${articles.length} articles`} />
      <p className="mt-6 text-sm" style={{ color: "var(--color-text-dim)" }}>
        News management UI coming online with the full CMS rollout. Articles render to /insights.
      </p>
    </>
  );
}
