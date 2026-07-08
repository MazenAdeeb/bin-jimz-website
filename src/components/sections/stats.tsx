"use client";

import { Counter } from "@/components/motion/counter";
import { Section } from "@/components/ui/section";
import { StaggerChildren, StaggerItem } from "@/components/motion/reveal";

type Stat = {
  value: number;
  suffix: string;
  title: string;
  desc: string;
};

export function Stats({ items, locale }: { items: Stat[]; locale: string }) {
  return (
    <Section className="border-y border-white/5 !py-20">
      <StaggerChildren className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {items.map((s, i) => (
          <StaggerItem key={i}>
            <div>
              <div className="font-display flex items-baseline gap-1 text-5xl leading-[1.35] md:text-6xl">
                <span className="gold-text inline-block py-[0.08em]">
                  <Counter value={s.value} suffix={s.suffix} locale={locale} />
                </span>
              </div>
              <p
                className="font-display mt-3 text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "var(--color-gold)" }}
              >
                {s.title}
              </p>
              <p
                className="mt-2 max-w-[220px] text-xs leading-relaxed"
                style={{ color: "var(--color-text-dim)" }}
              >
                {s.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </Section>
  );
}
