import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Newspaper,
  Inbox,
  MessagesSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
} from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/chat-logs", label: "Chat Logs", icon: MessagesSquare },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside
        className="flex flex-col border-r"
        style={{
          borderColor: "rgba(200,169,106,0.15)",
          background: "var(--color-surface-2)",
        }}
      >
        <div className="px-6 py-7">
          <BrandMark size={32} />
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((it) => {
              const Icon = it.icon;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[12px] tracking-[0.08em] uppercase text-[var(--color-text-dim)] transition-colors hover:bg-white/5 hover:text-[var(--color-gold)]"
                  >
                    <Icon size={15} />
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
          className="border-t p-4"
          style={{ borderColor: "rgba(200,169,106,0.15)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-dim)" }}>
            {session.user.email ?? ""}
          </p>
          <button
            type="submit"
            className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text-mute)] hover:text-[var(--color-gold)]"
          >
            <LogOut size={12} /> Sign out
          </button>
        </form>
      </aside>

      <main className="overflow-x-hidden">
        <div className="mx-auto max-w-[1240px] px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
