"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/industries", key: "industries" as const },
  { href: "/insights", key: "insights" as const },
  { href: "/contact", key: "contact" as const },
];

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md border-b border-white/5 bg-[var(--color-base)]/75"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 md:px-10">
        <Link href="/" aria-label="Bin Jimz home">
          <BrandMark size={36} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "font-display relative px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors",
                    isActive
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]",
                  )}
                >
                  {t(l.key)}
                  {isActive && (
                    <motion.span
                      layoutId="navline"
                      className="absolute -bottom-0.5 left-1/2 h-px w-6 -translate-x-1/2"
                      style={{ background: "var(--color-gold)" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="hidden items-center gap-2 px-3 py-2 text-[10px] tracking-[0.18em] uppercase text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-gold)] md:inline-flex"
            aria-label="Switch language"
          >
            <Globe size={14} />
            {locale === "en" ? "العربية" : "English"}
          </button>

          <Link href="/contact" className="hidden lg:inline-flex">
            <Button variant="gold" size="sm">
              {t("cta")}
            </Button>
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 text-[var(--color-text)]"
            aria-label="Open menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-white/5 bg-[var(--color-base)]/95 backdrop-blur-md"
          >
            <ul className="px-6 py-6 space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-sm tracking-[0.18em] uppercase text-[var(--color-text-dim)] hover:text-[var(--color-gold)]"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    switchLocale();
                    setOpen(false);
                  }}
                  className="font-display flex items-center gap-2 py-3 text-sm tracking-[0.18em] uppercase text-[var(--color-text-dim)]"
                >
                  <Globe size={14} />
                  {locale === "en" ? "العربية" : "English"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
