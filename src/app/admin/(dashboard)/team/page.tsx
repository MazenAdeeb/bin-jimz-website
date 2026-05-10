import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";

export default async function TeamAdminPage() {
  let members: Awaited<
    ReturnType<typeof prisma.teamMember.findMany>
  > = [];
  let translations: Record<string, { name: string; role: string }> = {};
  let imageUrls: Record<string, string> = {};
  try {
    const rows = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
      include: { translations: true, image: true },
    });
    members = rows;
    rows.forEach((r) => {
      const en = r.translations.find((t) => t.locale === "en");
      if (en) translations[r.id] = { name: en.name, role: en.role };
      if (r.image) imageUrls[r.id] = r.image.url;
    });
  } catch {}

  return (
    <>
      <AdminPageHeader
        title="Team members"
        subtitle={`${members.length} entries`}
        actions={
          <Link
            href="/admin/team/new"
            className="font-display rounded px-5 py-3 text-[10px] tracking-[0.22em] uppercase text-[var(--color-base)]"
            style={{ background: "var(--color-gold)" }}
          >
            New member
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
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: "var(--color-text-mute)" }}
                >
                  No team members yet. Click <strong>New member</strong>.
                </td>
              </tr>
            ) : (
              members.map((m) => {
                const t = translations[m.id];
                const url = imageUrls[m.id];
                return (
                  <tr key={m.id} className="border-t border-white/5">
                    <td className="px-4 py-3">
                      <div
                        className="relative h-10 w-10 overflow-hidden rounded-full border"
                        style={{ borderColor: "rgba(200,169,106,0.18)" }}
                      >
                        {url && (
                          <Image src={url} alt="" fill className="object-cover" sizes="40px" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/team/${m.id}`}
                        className="hover:text-[var(--color-gold)]"
                      >
                        {t?.name ?? m.slug}
                      </Link>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                      {t?.role ?? "—"}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                      {m.order}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--color-text-dim)" }}>
                      {m.active ? "Yes" : "No"}
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
