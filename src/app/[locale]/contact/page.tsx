import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { getSiteContent } from "@/lib/site-content";

const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const content = await getSiteContent();
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <H1 className="mt-6 max-w-3xl">{t("title")}</H1>
          <Lead className="mt-6">{t("intro")}</Lead>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 space-y-6">
            <ContactDetail icon={Mail} label={t("emailLabel")} value={content.contact.email} href={`mailto:${content.contact.email}`} />

            <div className="flex items-start gap-4 border-t pt-5"
                 style={{ borderColor: "rgba(200,169,106,0.2)" }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md border shrink-0"
                   style={{ borderColor: "rgba(200,169,106,0.3)", color: "var(--color-gold)" }}>
                <Phone size={16} />
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.32em] uppercase"
                   style={{ color: "var(--color-gold)" }}>
                  {t("phoneLabel")}
                </p>
                <div className="mt-2 space-y-1">
                  {content.contact.phones.map((p) => (
                    <a key={p} href={telHref(p)} dir="ltr" className="block text-base rtl:text-right">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactDetail icon={MapPin} label={t("addressLabel")} value={content.contact.address[lang]} />

            <div
              className="mt-8 aspect-[4/3] overflow-hidden rounded-md border"
              style={{ borderColor: "rgba(200,169,106,0.18)" }}
            >
              <iframe
                title="Bin Jimz office"
                src="https://www.openstreetmap.org/export/embed.html?bbox=30.93%2C30.02%2C31.02%2C30.08&layer=mapnik"
                className="h-full w-full opacity-80"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 border-t pt-5"
         style={{ borderColor: "rgba(200,169,106,0.2)" }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-md border shrink-0"
           style={{
             borderColor: "rgba(200,169,106,0.3)",
             color: "var(--color-gold)",
           }}>
        <Icon size={16} />
      </div>
      <div>
        <p className="font-display text-[10px] tracking-[0.32em] uppercase"
           style={{ color: "var(--color-gold)" }}>
          {label}
        </p>
        <p className="mt-2 text-base">{value}</p>
      </div>
    </div>
  );
  if (href) return <a href={href} className="block">{content}</a>;
  return content;
}
