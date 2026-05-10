"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const ShieldHero = dynamic(
  () => import("@/components/three/shield-hero").then((m) => m.ShieldHero),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

type Props = {
  eyebrow: string;
  title1: string;
  title2: string;
  intro: string;
  cta: string;
  secondaryCta: string;
};

export function Hero({ eyebrow, title1, title2, intro, cta, secondaryCta }: Props) {
  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-[var(--color-base)]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, var(--color-base) 100%)",
        }}
      />
      <div className="absolute right-[-8%] top-1/2 hidden h-[80%] w-[60%] -translate-y-1/2 lg:block">
        <ShieldHero className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1480px] items-center px-6 md:px-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--color-gold)" }}
          >
            <span className="block h-px w-12" style={{ background: "var(--color-gold)" }} />
            {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-6 text-balance text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]"
          >
            {title1}
            <br />
            <span className="gold-text">{title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-text-dim)" }}
          >
            {intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="/projects">
              <Button variant="gold">
                {cta}
                <ArrowDown size={14} className="-rotate-45" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline">
                <Sparkles size={14} />
                {secondaryCta}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center gap-3 text-[10px] tracking-[0.32em] uppercase"
          style={{ color: "var(--color-text-mute)" }}
        >
          <ArrowDown size={14} />
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
