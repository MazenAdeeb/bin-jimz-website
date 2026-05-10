import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>CONTACT</Eyebrow>
          <H1 className="mt-6 max-w-3xl">{t("title")}</H1>
          <Lead className="mt-6">{t("intro")}</Lead>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 space-y-6">
            <ContactDetail icon={Mail} label={t("emailLabel")} value="m.mostafa@binjimz.com" href="mailto:m.mostafa@binjimz.com" />
            <ContactDetail icon={Phone} label={t("phoneLabel")} value="+20 10 10429021" href="tel:+201010429021" />
            <ContactDetail icon={MapPin} label={t("addressLabel")} value={t("address")} />

            <div
              className="mt-8 aspect-[4/3] overflow-hidden rounded-md border"
              style={{ borderColor: "rgba(200,169,106,0.18)" }}
            >
              <iframe
                title="Bin Jimz office"
                src="https://www.openstreetmap.org/export/embed.html?bbox=31.2%2C30.04%2C31.4%2C30.13&layer=mapnik"
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
