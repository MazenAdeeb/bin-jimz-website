import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";

async function loadSessions() {
  try {
    return await prisma.chatSession.findMany({
      include: {
        messages: { take: 1, orderBy: { createdAt: "asc" } },
        _count: { select: { messages: true } },
      },
      orderBy: { startedAt: "desc" },
      take: 50,
    });
  } catch {
    return [] as Array<
      Awaited<ReturnType<typeof prisma.chatSession.findMany>>[number] & {
        messages: { content: string }[];
        _count: { messages: number };
      }
    >;
  }
}

export default async function ChatLogsPage() {
  const sessions = await loadSessions();

  return (
    <>
      <AdminPageHeader title="Chat logs" subtitle={`${sessions.length} recent sessions`} />
      <div className="mt-8 space-y-3">
        {sessions.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-text-mute)" }}>
            No chat sessions yet. They will appear here as visitors interact with Jimz.
          </p>
        ) : (
          sessions.map((s) => (
            <div
              key={s.id}
              className="rounded-md border p-5"
              style={{ borderColor: "rgba(200,169,106,0.18)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs"
                   style={{ color: "var(--color-text-dim)" }}>
                <span>Session {s.id.slice(0, 8)} · {s.locale.toUpperCase()}</span>
                <span>{s._count.messages} messages · {s.startedAt.toLocaleString()}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm" style={{ color: "var(--color-text)" }}>
                {s.messages[0]?.content ?? "—"}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
