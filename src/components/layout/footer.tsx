import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/ui/brand-mark";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { getSiteContent } from "@/lib/site-content";

function toWaNumber(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (!digits.startsWith("20")) digits = `20${digits}`;
  return digits;
}

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  const content = await getSiteContent();
  const waHref = `https://wa.me/${toWaNumber(content.contact.whatsapp)}`;

  return (
    <footer className="relative border-t border-white/5 bg-[var(--color-surface-2)]">
      <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandMark size={44} />
            <p
              className="mt-6 max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--color-text-dim)" }}
            >
              {t("brand.tagline")}
            </p>
            <p
              className="font-display mt-3 text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--color-gold)" }}
            >
              {t("brand.pillars")}
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-[11px] tracking-[0.32em] uppercase mb-5"
                style={{ color: "var(--color-gold)" }}>
              {t("nav.services")}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "var(--color-text-dim)" }}>
              <li><Link href="/services/engineering">{t("services.engineering.title")}</Link></li>
              <li><Link href="/services/supplies">{t("services.supplies.title")}</Link></li>
              <li><Link href="/services/contracting">{t("services.contracting.title")}</Link></li>
              <li><Link href="/services/cybersecurity">{t("services.cybersecurity.title")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-[11px] tracking-[0.32em] uppercase mb-5"
                style={{ color: "var(--color-gold)" }}>
              {t("nav.about")}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "var(--color-text-dim)" }}>
              <li><Link href="/about">{t("nav.about")}</Link></li>
              <li><Link href="/projects">{t("nav.projects")}</Link></li>
              <li><Link href="/insights">{t("nav.insights")}</Link></li>
              <li><Link href="/careers">{t("nav.careers")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-[11px] tracking-[0.32em] uppercase mb-5"
                style={{ color: "var(--color-gold)" }}>
              {t("nav.contact")}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "var(--color-text-dim)" }}>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 shrink-0" />
                <a href="mailto:m.mostafa@binjimz.com">m.mostafa@binjimz.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-1 shrink-0" />
                <a href="tel:+201010429021">+20 10 10429021</a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={14} className="mt-1 shrink-0" />
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0" />
                {t("contact.address")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs md:flex-row md:items-center"
             style={{ color: "var(--color-text-mute)" }}>
          <span>© {year} {t("brand.name")}. {t("footer.rights")}</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--color-gold)]">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-[var(--color-gold)]">{t("footer.terms")}</Link>
            <span className="font-display tracking-[0.2em] uppercase" style={{ color: "var(--color-gold-deep)" }}>
              www.binjimz.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
