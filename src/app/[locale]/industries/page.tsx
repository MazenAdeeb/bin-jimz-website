import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, H3, Lead } from "@/components/ui/section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/motion/reveal";
import { Landmark, ShoppingBag, Sparkles, Building2, Zap, Banknote } from "lucide-react";

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("industries");

  const items = [
    { icon: Landmark, key: "government" as const },
    { icon: ShoppingBag, key: "retail" as const },
    { icon: Sparkles, key: "events" as const },
    { icon: Building2, key: "commercial" as const },
    { icon: Zap, key: "energy" as const },
    { icon: Banknote, key: "finance" as const },
  ];

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <H1 className="mt-6 max-w-4xl">{t("title")}</H1>
          <Lead className="mt-6">{t("intro")}</Lead>
        </Reveal>
      </Section>

      <Section>
        <StaggerChildren className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <StaggerItem key={it.key}>
                <div
                  className="h-full rounded-md border p-8 transition-colors hover:border-[var(--color-gold)]/60"
                  style={{
                    borderColor: "rgba(200,169,106,0.18)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border"
                       style={{
                         borderColor: "rgba(200,169,106,0.3)",
                         color: "var(--color-gold)",
                       }}>
                    <Icon size={18} />
                  </div>
                  <H3 className="mt-6">{t(it.key)}</H3>
                  <p className="mt-3 text-sm leading-relaxed"
                     style={{ color: "var(--color-text-dim)" }}>
                    {t(`${it.key}Desc`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Section>
    </>
  );
}
