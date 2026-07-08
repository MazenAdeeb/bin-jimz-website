import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import Link from "next/link";

async function loadProjects() {
  try {
    return await prisma.project.findMany({
      include: { translations: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    return [] as Array<
      Awaited<ReturnType<typeof prisma.project.findMany>>[number] & {
        translations: { locale: "en" | "ar"; title: string }[];
      }
    >;
  }
}

export default async function ProjectsAdminPage() {
  const rows = await loadProjects();

  return (
    <>
      <AdminPageHeader
        title="Projects"
        subtitle={`${rows.length} entries`}
        actions={
          <Link
            href="/admin/projects/new"
            className="font-display rounded px-5 py-3 text-[10px] tracking-[0.22em] uppercase text-[var(--color-base)]"
            style={{ background: "var(--color-gold)" }}
          >
            New project
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
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: "var(--color-text-mute)" }}
                >
                  No projects yet. Click <strong>New project</strong> to add the first one.
                </td>
              </tr>
            ) : (
              rows.map((p) => {
                const en = p.translations.find((t) => t.locale === "en");
                return (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="hover:text-[var(--color-gold)]"
                      >
                        {en?.title ?? p.slug}
                      </Link>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                      {p.sector ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase"
                        style={{
                          background: "rgba(200,169,106,0.1)",
                          color: "var(--color-gold)",
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                      {p.featured ? "Yes" : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
