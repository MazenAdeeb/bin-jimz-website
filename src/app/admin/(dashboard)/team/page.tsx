import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function TeamAdminPage() {
  let members: Awaited<ReturnType<typeof prisma.teamMember.findMany>> = [];
  try {
    members = await prisma.teamMember.findMany({
      include: { translations: true },
      orderBy: { order: "asc" },
    });
  } catch {}

  return (
    <>
      <AdminPageHeader title="Team" subtitle={`${members.length} members`} />
      <p className="mt-6 text-sm" style={{ color: "var(--color-text-dim)" }}>
        Add members of the leadership team here. They render on the About page.
      </p>
    </>
  );
}
