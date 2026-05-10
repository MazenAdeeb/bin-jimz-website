"use client";

import dynamic from "next/dynamic";
import { Section, H2 } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const CyberGrid = dynamic(
  () => import("@/components/three/cyber-grid").then((m) => m.CyberGrid),
  { ssr: false },
);

type Props = {
  title: string;
  copy: string;
  button: string;
  secondaryButton: string;
};

export function Cta({ title, copy, button, secondaryButton }: Props) {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <CyberGrid className="h-full w-full" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(27,156,252,0.18), transparent 60%)",
        }}
      />
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <H2 className="text-balance">{title}</H2>
          <p
            className="mx-auto mt-6 max-w-xl text-base md:text-lg"
            style={{ color: "var(--color-text-dim)" }}
          >
            {copy}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button variant="gold">
                {button}
                <ArrowUpRight size={14} />
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="cyber">{secondaryButton}</Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
