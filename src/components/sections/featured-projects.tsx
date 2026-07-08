"use client";

import { Section, Eyebrow, H2 } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FeaturedProject = {
  slug: string;
  title: string;
  sector: string;
  service: string;
  cover: string;
};

type Props = {
  eyebrow: string;
  title: string;
  viewAllLabel: string;
  projects: FeaturedProject[];
};

export function FeaturedProjects({ eyebrow, title, viewAllLabel, projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <Section>
      <div className="mb-12 flex items-end justify-between gap-6">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <H2 className="mt-5">{title}</H2>
        </Reveal>
        <Reveal>
          <Link href="/projects">
            <Button variant="link">
              {viewAllLabel}{" "}
              <span className="inline-block rtl:-scale-x-100">→</span>
            </Button>
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link href={`/projects/${p.slug}`}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-md border"
                style={{ borderColor: "rgba(200, 169, 106, 0.18)" }}
              >
                <div
                  className="aspect-[16/10] w-full overflow-hidden bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.cover})` }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 35%, rgba(11,11,12,0.85) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p
                      className="font-display text-[10px] tracking-[0.32em] uppercase"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {p.sector} · {p.service}
                    </p>
                    <h3 className="font-display mt-2 text-xl md:text-2xl">{p.title}</h3>
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-all group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-base)]"
                    style={{ borderColor: "var(--color-gold)" }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.article>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
