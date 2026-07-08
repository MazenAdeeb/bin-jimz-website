"use client";

import { useTranslations } from "next-intl";
import { Building2, Package, HardHat, Shield, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow, H2, Lead } from "@/components/ui/section";
import { StaggerChildren, StaggerItem, Reveal } from "@/components/motion/reveal";

const pillars = [
  { href: "/services/engineering", icon: Building2, key: "engineering" as const, accent: "gold" },
  { href: "/services/supplies", icon: Package, key: "supplies" as const, accent: "gold" },
  { href: "/services/contracting", icon: HardHat, key: "contracting" as const, accent: "gold" },
  { href: "/services/cybersecurity", icon: Shield, key: "cybersecurity" as const, accent: "cyber" },
];

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  learnMore: string;
};

export function ServicesGrid({ eyebrow, title, intro, learnMore }: Props) {
  const tServices = useTranslations("services");

  return (
    <Section>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <H2 className="mt-5 max-w-3xl">{title}</H2>
        <Lead className="mt-5">{intro}</Lead>
      </Reveal>

      <StaggerChildren className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        {pillars.map((p) => {
          const Icon = p.icon;
          const isCyber = p.accent === "cyber";
          return (
            <StaggerItem key={p.key}>
              <Link href={p.href}>
                <div
                  className="group relative overflow-hidden rounded-md border p-8 transition-all duration-500 hover:border-[var(--color-gold)] md:p-10"
                  style={{
                    borderColor: "rgba(200, 169, 106, 0.15)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isCyber
                          ? "radial-gradient(ellipse at top right, rgba(27,156,252,0.12), transparent 60%)"
                          : "radial-gradient(ellipse at top right, rgba(200,169,106,0.12), transparent 60%)",
                      }}
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-md border transition-transform duration-500 group-hover:-translate-y-1"
                      style={{
                        borderColor: isCyber
                          ? "rgba(27,156,252,0.4)"
                          : "rgba(200,169,106,0.3)",
                        color: isCyber ? "var(--color-cyber)" : "var(--color-gold)",
                        background: "rgba(0,0,0,0.4)",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      style={{ color: isCyber ? "var(--color-cyber)" : "var(--color-gold)" }}
                    />
                  </div>

                  <h3 className="font-display mt-8 text-2xl md:text-3xl md:min-h-[4.5rem]">
                    {tServices(`${p.key}.title`)}
                  </h3>
                  <p
                    className="mt-2 text-sm tracking-[0.04em]"
                    style={{ color: "var(--color-gold-soft)" }}
                  >
                    {tServices(`${p.key}.tagline`)}
                  </p>
                  <p
                    className="mt-4 max-w-md text-sm leading-relaxed"
                    style={{ color: "var(--color-text-dim)" }}
                  >
                    {tServices(`${p.key}.desc`)}
                  </p>
                  <p
                    className="font-display mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase opacity-70 transition-opacity group-hover:opacity-100"
                    style={{ color: isCyber ? "var(--color-cyber)" : "var(--color-gold)" }}
                  >
                    {learnMore}{" "}
                    <span className="inline-block rtl:-scale-x-100">→</span>
                  </p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </Section>
  );
}
