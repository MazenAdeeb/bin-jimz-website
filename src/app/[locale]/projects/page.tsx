import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { ProjectsGrid } from "@/components/sections/projects-grid";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <H1 className="mt-6 max-w-3xl">{t("title")}</H1>
        <Lead className="mt-6">{t("intro")}</Lead>
      </Section>
      <ProjectsGrid />
    </>
  );
}
