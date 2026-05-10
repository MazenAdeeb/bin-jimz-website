import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function NewsAdminPage() {
  let articles: Awaited<ReturnType<typeof prisma.newsArticle.findMany>> = [];
  let titles: Record<string, string> = {};
  try {
    const rows = await prisma.newsArticle.findMany({
      include: { translations: true },
      orderBy: { createdAt: "desc" },
    });
    articles = rows;
    rows.forEach((r) => {
      const en = r.translations.find((t) => t.locale === "en");
      if (en) titles[r.id] = en.title;
    });
  } catch {}

  return (
    <>
      <AdminPageHeader
        title="News & Insights"
        subtitle={`${articles.length} articles`}
        actions={
          <Link
            href="/admin/news/new"
            className="font-display rounded px-5 py-3 text-[10px] tracking-[0.22em] uppercase text-[var(--color-base)]"
            style={{ background: "var(--color-gold)" }}
          >
            New article
          </Link>
        }
      />

      <div
        className="mt-8 overflow-hidden rounded-md border"
        style={{ borderColor: "rgba(200,169,106,0.18)" }}
      >
        <table className="w-full text-sm">
          <thead
            className="bg-white/5 text-left text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "var(--color-text-dim)" }}
          >
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: "var(--color-text-mute)" }}
                >
                  No articles yet.
                </td>
              </tr>
            ) : (
              articles.map((a) => (
                <tr key={a.id} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/news/${a.id}`}
                      className="hover:text-[var(--color-gold)]"
                    >
                      {titles[a.id] ?? a.slug}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                    {a.slug}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                    {a.publishedAt
                      ? new Date(a.publishedAt).toLocaleDateString()
                      : "Draft"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-mute)" }}>
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
