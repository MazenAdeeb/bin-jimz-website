"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { serviceLabel, sectorLabel, type Lang } from "@/lib/labels";
import {
  allProjects,
  type EngineeringCategory,
  type DesignType,
} from "@/data/projects";

const ENGINEERING = "Engineering";

const CATEGORIES: EngineeringCategory[] = [
  "residential",
  "commercial",
  "hospitality",
  "healthcare",
  "education",
  "industrial",
];

const DESIGNS: DesignType[] = ["interior", "exterior"];

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const lang = (useLocale() === "ar" ? "ar" : "en") as Lang;
  const [service, setService] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [design, setDesign] = useState<string>("all");

  const services = useMemo(
    () => Array.from(new Set(allProjects.map((p) => p.service))).sort(),
    [],
  );

  const filtered = useMemo(
    () =>
      allProjects.filter((p) => {
        if (service !== "all" && p.service !== service) return false;
        if (service === ENGINEERING) {
          if (category !== "all" && p.category !== category) return false;
          if (design !== "all" && p.design !== design) return false;
        }
        return true;
      }),
    [service, category, design],
  );

  const selectService = (s: string) => {
    setService(s);
    if (s !== ENGINEERING) {
      setCategory("all");
      setDesign("all");
    }
  };

  const engineeringActive = service === ENGINEERING;

  return (
    <Section className="!pt-0">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <FilterPill
          label={t("filterAll")}
          active={service === "all"}
          onClick={() => selectService("all")}
        />
        {services.map((s) => (
          <FilterPill
            key={s}
            label={serviceLabel(s, lang)}
            active={service === s}
            onClick={() => selectService(s)}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {engineeringActive && (
          <motion.div
            key="eng-subfilters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mb-10 space-y-4 rounded-md border-s-2 py-4 ps-5"
              style={{
                borderColor: "var(--color-gold)",
                background: "rgba(200,169,106,0.03)",
              }}
            >
              <div>
                <SubLabel>{t("typeLabel")}</SubLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  <SubPill
                    label={t("filterAll")}
                    active={category === "all"}
                    onClick={() => setCategory("all")}
                  />
                  {CATEGORIES.map((c) => (
                    <SubPill
                      key={c}
                      label={t(`categories.${c}`)}
                      active={category === c}
                      onClick={() => setCategory(c)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>{t("designLabel")}</SubLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  <SubPill
                    label={t("filterAll")}
                    active={design === "all"}
                    onClick={() => setDesign("all")}
                  />
                  {DESIGNS.map((d) => (
                    <SubPill
                      key={d}
                      label={t(`design.${d}`)}
                      active={design === d}
                      onClick={() => setDesign(d)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm"
            style={{ color: "var(--color-text-mute)" }}
          >
            {t("empty")}
          </motion.p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/projects/${p.slug}`}>
                  <article
                    className="group relative overflow-hidden rounded-md border"
                    style={{ borderColor: "rgba(200,169,106,0.18)" }}
                  >
                    <div
                      className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${p.cover})` }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(11,11,12,0.85) 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                      <div>
                        <p
                          className="font-display text-[10px] tracking-[0.32em] uppercase"
                          style={{ color: "var(--color-gold)" }}
                        >
                          {sectorLabel(p.sector, lang)} · {serviceLabel(p.service, lang)}
                        </p>
                        <h3 className="font-display mt-2 text-lg md:text-xl">
                          {p.title[lang]}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        style={{ color: "var(--color-gold)" }}
                      />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-display text-[10px] tracking-[0.28em] uppercase"
      style={{ color: "var(--color-gold-soft)" }}
    >
      {children}
    </span>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-display rounded-full border px-4 py-2 text-[10px] tracking-[0.22em] uppercase transition-all",
        active
          ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-base)]"
          : "border-white/10 text-[var(--color-text-dim)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-text)]",
      )}
    >
      {label}
    </button>
  );
}

function SubPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[10px] tracking-[0.14em] transition-all",
        active
          ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
          : "border-white/10 text-[var(--color-text-dim)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-text)]",
      )}
    >
      {label}
    </button>
  );
}
