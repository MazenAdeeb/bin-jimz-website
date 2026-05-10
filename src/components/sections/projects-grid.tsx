"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { allProjects } from "@/data/projects";

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const [service, setService] = useState<string>("all");
  const [year, setYear] = useState<string>("all");

  const services = useMemo(
    () => Array.from(new Set(allProjects.map((p) => p.service))),
    [],
  );
  const years = useMemo(
    () =>
      Array.from(new Set(allProjects.map((p) => p.year))).sort((a, b) => b - a),
    [],
  );

  const filtered = useMemo(
    () =>
      allProjects.filter(
        (p) =>
          (service === "all" || p.service === service) &&
          (year === "all" || String(p.year) === year),
      ),
    [service, year],
  );

  return (
    <Section className="!pt-0">
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <FilterPill label={t("filterAll")} active={service === "all"} onClick={() => setService("all")} />
        {services.map((s) => (
          <FilterPill key={s} label={s} active={service === s} onClick={() => setService(s)} />
        ))}
        <span className="mx-2 hidden h-4 w-px bg-white/10 md:block" />
        <FilterPill label="Any year" active={year === "all"} onClick={() => setYear("all")} />
        {years.map((y) => (
          <FilterPill key={y} label={String(y)} active={year === String(y)} onClick={() => setYear(String(y))} />
        ))}
      </div>

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
                          {p.sector} · {p.service} · {p.year}
                        </p>
                        <h3 className="font-display mt-2 text-lg md:text-xl">
                          {p.title}
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
