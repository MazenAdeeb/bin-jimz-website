import { prisma } from "@/lib/db";
import { Inbox, MessagesSquare, FolderKanban, Users } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";

async function safeCount<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function AdminDashboardPage() {
  const [leads, sessions, projects, members] = await Promise.all([
    safeCount(() => prisma.lead.count(), 0),
    safeCount(() => prisma.chatSession.count(), 0),
    safeCount(() => prisma.project.count(), 0),
    safeCount(() => prisma.teamMember.count(), 0),
  ]);

  const recentLeads = await safeCount(
    () =>
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    [] as Awaited<ReturnType<typeof prisma.lead.findMany>>,
  );

  const cards = [
    { label: "Leads", value: leads, icon: Inbox },
    { label: "Chat sessions", value: sessions, icon: MessagesSquare },
    { label: "Projects", value: projects, icon: FolderKanban },
    { label: "Team members", value: members, icon: Users },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" subtitle="Overview of your operation." />

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-md border p-5"
              style={{
                borderColor: "rgba(200,169,106,0.18)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-display text-[10px] tracking-[0.32em] uppercase"
                  style={{ color: "var(--color-gold)" }}
                >
                  {c.label}
                </span>
                <Icon size={16} style={{ color: "var(--color-gold)" }} />
              </div>
              <p className="font-display mt-4 text-4xl">{c.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl">Recent leads</h2>
        <div
          className="mt-5 overflow-hidden rounded-md border"
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
                <th className="px-4 py-3">When</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center"
                    style={{ color: "var(--color-text-mute)" }}
                  >
                    No leads yet. They will appear here as they come in.
                  </td>
                </tr>
              ) : (
                recentLeads.map((l) => (
                  <tr key={l.id} className="border-t border-white/5">
                    <td className="px-4 py-3">{l.name}</td>
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
                    <td className="px-4 py-3" style={{ color: "var(--color-text-mute)" }}>
                      {l.createdAt.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
