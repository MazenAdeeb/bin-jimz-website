"use client";

import { useTranslations } from "next-intl";
import { Section, Eyebrow, H2 } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { HoverArea } from "@/components/cursor/hover-area";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  slug: string;
  title: string;
  sector: string;
  year: number;
  service: string;
  cover: string;
};

const seedProjects: Project[] = [
  {
    slug: "national-pavilion-cairo",
    title: "National Pavilion · Mega Event",
    sector: "Government",
    year: 2025,
    service: "Contracting",
    cover:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "secure-banking-network",
    title: "Secure Banking Network",
    sector: "Banking & Finance",
    year: 2025,
    service: "Cybersecurity",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "luxury-retail-fitout",
    title: "Luxury Retail Fit-Out",
    sector: "Retail",
    year: 2024,
    service: "Engineering",
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "smart-headquarters",
    title: "Smart Corporate Headquarters",
    sector: "Commercial",
    year: 2024,
    service: "Engineering",
    cover:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
  },
];

export function FeaturedProjects() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <Section>
      <div className="mb-12 flex items-end justify-between gap-6">
        <Reveal>
          <Eyebrow>{t("projectsEyebrow")}</Eyebrow>
          <H2 className="mt-5">{t("projectsTitle")}</H2>
        </Reveal>
        <Reveal>
          <Link href="/projects">
            <Button variant="link">{tCommon("viewAll")}  →</Button>
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {seedProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link href={`/projects/${p.slug}`}>
              <HoverArea variant="view">
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
                        {p.sector} · {p.service} · {p.year}
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
              </HoverArea>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
