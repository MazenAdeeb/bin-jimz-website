import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { ServicesGrid } from "@/components/sections/services-grid";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Eyebrow>{t("servicesEyebrow")}</Eyebrow>
        <H1 className="mt-6 max-w-3xl">{t("servicesTitle")}</H1>
        <Lead className="mt-6">{t("servicesIntro")}</Lead>
      </Section>
      <ServicesGrid />
    </>
  );
}
