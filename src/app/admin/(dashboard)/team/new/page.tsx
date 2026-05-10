import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";

async function create(fd: FormData) {
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

  const slug = `${slugify(nameEn)}-${Math.random().toString(36).slice(2, 6)}`;

  const member = await prisma.teamMember.create({
    data: {
      slug,
      email,
      order,
      active,
      imageId,
      translations: {
        create: [
          { locale: "en", name: nameEn, role: roleEn, bio: bioEn },
          { locale: "ar", name: nameAr || nameEn, role: roleAr || roleEn, bio: bioAr || bioEn },
        ],
      },
    },
  });

  revalidatePath("/admin/team");
  revalidatePath("/en/about");
  revalidatePath("/ar/about");
  redirect(`/admin/team/${member.id}`);
}

export default function NewTeamMemberPage() {
  return (
    <>
      <AdminPageHeader title="New team member" />
      <TeamForm action={create} />
    </>
  );
}
