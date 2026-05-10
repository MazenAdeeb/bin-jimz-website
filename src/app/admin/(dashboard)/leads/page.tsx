import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function LeadsPage() {
  const leads = await safe(
    () => prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    [] as Awaited<ReturnType<typeof prisma.lead.findMany>>,
  );

  return (
    <>
      <AdminPageHeader title="Leads" subtitle={`${leads.length} captured`} />
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
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: "var(--color-text-mute)" }}
                >
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <div>{l.name}</div>
                    {l.message && (
                      <div
                        className="mt-1 line-clamp-2 max-w-xs text-xs"
                        style={{ color: "var(--color-text-mute)" }}
                      >
                        {l.message}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                    {l.source}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                    {l.service ?? "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                    {l.email ?? "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                    {l.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        background: "rgba(200,169,106,0.1)",
                        color: "var(--color-gold)",
                      }}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--color-text-mute)" }}>
                    {l.createdAt.toLocaleString()}
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
