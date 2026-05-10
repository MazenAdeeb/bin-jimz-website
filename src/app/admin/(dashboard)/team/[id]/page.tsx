import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const member = await prisma.teamMember.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!member) notFound();

  const en = member.translations.find((t) => t.locale === "en");
  const ar = member.translations.find((t) => t.locale === "ar");

  async function update(fd: FormData) {
    "use server";
    const nameEn = String(fd.get("nameEn") ?? "").trim();
    const nameAr = String(fd.get("nameAr") ?? "").trim();
    const roleEn = String(fd.get("roleEn") ?? "").trim();
    const roleAr = String(fd.get("roleAr") ?? "").trim();
    const bioEn = String(fd.get("bioEn") ?? "").trim();
    const bioAr = String(fd.get("bioAr") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim() || null;
    const order = parseInt(String(fd.get("order") ?? 0), 10) || 0;
    const active = fd.get("active") === "on";
    const imageId = (fd.get("imageId") as string) || null;

    await prisma.teamMember.update({
      where: { id },
      data: {
        email,
        order,
        active,
        imageId,
        translations: {
          update: [
            {
              where: { teamMemberId_locale: { teamMemberId: id, locale: "en" } },
              data: { name: nameEn, role: roleEn, bio: bioEn },
            },
            {
              where: { teamMemberId_locale: { teamMemberId: id, locale: "ar" } },
              data: {
                name: nameAr || nameEn,
                role: roleAr || roleEn,
                bio: bioAr || bioEn,
              },
            },
          ],
        },
      },
    });

    revalidatePath("/admin/team");
    revalidatePath("/en/about");
    revalidatePath("/ar/about");
    redirect("/admin/team");
  }

  async function remove() {
    "use server";
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/admin/team");
    redirect("/admin/team");
  }

  return (
    <>
      <AdminPageHeader title={en?.name ?? member.slug} subtitle="Edit team member" />
      <TeamForm
        defaults={{
          slug: member.slug,
          email: member.email ?? "",
          order: member.order,
          active: member.active,
          imageId: member.imageId,
          nameEn: en?.name ?? "",
          nameAr: ar?.name ?? "",
          roleEn: en?.role ?? "",
          roleAr: ar?.role ?? "",
          bioEn: en?.bio ?? "",
          bioAr: ar?.bio ?? "",
        }}
        action={update}
        deleteAction={remove}
      />
    </>
  );
}
