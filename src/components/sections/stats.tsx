"use client";

import { useTranslations, useLocale } from "next-intl";
import { Counter } from "@/components/motion/counter";
import { Section } from "@/components/ui/section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/motion/reveal";

const stats = [
  { value: 50, suffix: "+", titleKey: "collaborations", descKey: "collaborationsDesc" },
  { value: 300, suffix: "+", titleKey: "projects", descKey: "projectsDesc" },
  { value: 35, suffix: "%", titleKey: "speed", descKey: "speedDesc" },
  { value: 99.9, suffix: "%", titleKey: "uptime", descKey: "uptimeDesc" },
] as const;

export function Stats() {
  const t = useTranslations("home.stats");
  const locale = useLocale();

  return (
    <Section className="border-y border-white/5 !py-20">
      <StaggerChildren className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.titleKey}>
            <div>
              <div className="font-display flex items-baseline gap-1 text-5xl md:text-6xl">
                <span className="gold-text">
                  <Counter value={s.value} suffix={s.suffix} locale={locale} />
                </span>
              </div>
              <p
                className="font-display mt-3 text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "var(--color-gold)" }}
              >
                {t(s.titleKey)}
              </p>
              <p
                className="mt-2 max-w-[220px] text-xs leading-relaxed"
                style={{ color: "var(--color-text-dim)" }}
              >
                {t(s.descKey)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </Section>
  );
}
