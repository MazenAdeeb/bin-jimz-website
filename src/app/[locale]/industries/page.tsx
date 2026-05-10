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
    { icon: Landmark, key: "government" as const,
      desc: "Pavilions, public infrastructure and secure operations centers." },
    { icon: ShoppingBag, key: "retail" as const,
      desc: "Flagship stores, premium fit-outs and unified payments security." },
    { icon: Sparkles, key: "events" as const,
      desc: "Mega-event architecture, AV integration and rapid mobilization." },
    { icon: Building2, key: "commercial" as const,
      desc: "Corporate HQs, smart-building integration and workplace design." },
    { icon: Zap, key: "energy" as const,
      desc: "OT/IT convergence and critical infrastructure protection." },
    { icon: Banknote, key: "finance" as const,
      desc: "SOC build-outs, zero-trust networks and regulatory compliance." },
  ];

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>SECTORS</Eyebrow>
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
                    {it.desc}
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
