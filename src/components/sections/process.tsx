"use client";

import { Section, Eyebrow, H2, Lead } from "@/components/ui/section";
import { StaggerChildren, StaggerItem, Reveal } from "@/components/motion/reveal";

type Step = { title: string; desc: string };

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  steps: Step[];
};

export function Process({ eyebrow, title, intro, steps }: Props) {
  return (
    <Section id="process" className="border-t border-white/5">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <H2 className="mt-5 max-w-3xl">{title}</H2>
        <Lead className="mt-5">{intro}</Lead>
      </Reveal>

      <StaggerChildren className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <StaggerItem key={i}>
            <div
              className="relative h-full rounded-md border p-8"
              style={{
                borderColor: "rgba(200, 169, 106, 0.15)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <span className="font-display text-4xl" style={{ color: "var(--color-gold)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-6 text-xl md:text-2xl">{s.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed"
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
