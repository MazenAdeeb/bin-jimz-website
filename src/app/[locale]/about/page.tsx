import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, H2, H3, Lead } from "@/components/ui/section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/motion/reveal";
import { Target, Compass, Users } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const goals = [
    { icon: Target, t: t("goal1Title"), d: t("goal1Desc") },
    { icon: Compass, t: t("goal2Title"), d: t("goal2Desc") },
    { icon: Users, t: t("goal3Title"), d: t("goal3Desc") },
  ];

  const advantages = [
    { n: "01", t: t("advEfficiencyTitle"), d: t("advEfficiency") },
    { n: "02", t: t("advQualityTitle"), d: t("advQuality") },
    { n: "03", t: t("advCustomerTitle"), d: t("advCustomer") },
    { n: "04", t: t("advInnovationTitle"), d: t("advInnovation") },
  ];

  return (
    <>
      <Section className="!pt-32">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <H1 className="mt-6 max-w-4xl">{t("title")}</H1>
          <Lead className="mt-7">{t("intro")}</Lead>
        </Reveal>
      </Section>

      <Section className="border-t border-white/5">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <Eyebrow>{t("visionTitle")}</Eyebrow>
            <H2 className="mt-5">{t("visionTitle")}</H2>
            <p className="mt-6 text-base leading-relaxed md:text-lg"
               style={{ color: "var(--color-text-dim)" }}>
              {t("vision")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Eyebrow>{t("missionTitle")}</Eyebrow>
            <H2 className="mt-5">{t("missionTitle")}</H2>
            <p className="mt-6 text-base leading-relaxed md:text-lg"
               style={{ color: "var(--color-text-dim)" }}>
              {t("mission")}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <Reveal>
          <Eyebrow>{t("goalsTitle")}</Eyebrow>
          <H2 className="mt-5">{t("goalsIntro")}</H2>
        </Reveal>

        <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-3">
          {goals.map((g) => {
            const Icon = g.icon;
            return (
              <StaggerItem key={g.t}>
                <div
                  className="h-full rounded-md border p-8 transition-colors hover:border-[var(--color-gold)]/60"
                  style={{
                    borderColor: "rgba(200,169,106,0.18)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border"
                       style={{
                         borderColor: "rgba(200,169,106,0.3)",
                         color: "var(--color-gold)",
                       }}>
                    <Icon size={20} />
                  </div>
                  <H3 className="mt-6">{g.t}</H3>
                  <p className="mt-3 text-sm leading-relaxed"
                     style={{ color: "var(--color-text-dim)" }}>
                    {g.d}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Section>

      <Section className="border-t border-white/5">
        <Reveal>
          <Eyebrow>{t("advantageTitle")}</Eyebrow>
          <H2 className="mt-5">{t("whyTitle")}</H2>
        </Reveal>

        <StaggerChildren className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {advantages.map((a) => (
            <StaggerItem key={a.n}>
              <div className="flex gap-6 border-t pt-6"
                   style={{ borderColor: "rgba(200,169,106,0.2)" }}>
                <span className="font-display text-3xl gold-text">{a.n}</span>
                <div>
                  <H3>{a.t}</H3>
                  <p className="mt-3 text-sm leading-relaxed"
                     style={{ color: "var(--color-text-dim)" }}>
                    {a.d}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
    </>
  );
}
