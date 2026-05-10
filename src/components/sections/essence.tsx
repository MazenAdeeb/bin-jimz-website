"use client";

import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Diamond,
  Building,
  Zap,
  Lock,
  Lightbulb,
} from "lucide-react";
import { Section, Eyebrow, H2 } from "@/components/ui/section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/motion/reveal";

const items = [
  { key: "trust" as const, icon: ShieldCheck },
  { key: "quality" as const, icon: Diamond },
  { key: "excellence" as const, icon: Building },
  { key: "speed" as const, icon: Zap },
  { key: "security" as const, icon: Lock },
  { key: "innovation" as const, icon: Lightbulb },
];

export function Essence({ eyebrow, title }: { eyebrow: string; title: string }) {
  const te = useTranslations("essence");

  return (
    <Section className="border-y border-white/5">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <H2 className="mt-5">{title}</H2>
      </Reveal>

      <StaggerChildren className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.key}>
              <div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-md border"
                  style={{
                    borderColor: "rgba(200, 169, 106, 0.3)",
                    color: "var(--color-gold)",
                  }}
                >
                  <Icon size={18} />
                </div>
                <p
                  className="font-display mt-5 text-[12px] tracking-[0.22em] uppercase"
                  style={{ color: "var(--color-gold)" }}
                >
                  {te(`${item.key}.title`)}
                </p>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-dim)" }}
                >
                  {te(`${item.key}.desc`)}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </Section>
  );
}
