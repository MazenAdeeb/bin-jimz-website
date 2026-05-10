import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { getSiteContent } from "@/lib/site-content";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "ar" ? "ar" : "en";
  const content = await getSiteContent();
  const tCommon = await getTranslations("common");

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Eyebrow>{content.services.eyebrow[lang]}</Eyebrow>
        <H1 className="mt-6 max-w-3xl">{content.services.title[lang]}</H1>
        <Lead className="mt-6">{content.services.intro[lang]}</Lead>
      </Section>
      <ServicesGrid
        eyebrow={content.services.eyebrow[lang]}
        title={content.services.title[lang]}
        intro={content.services.intro[lang]}
        learnMore={tCommon("learnMore")}
      />
    </>
  );
}
