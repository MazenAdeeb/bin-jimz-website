import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section, Eyebrow, H1, H2, H3, Lead } from "@/components/ui/section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { Building2, Package, HardHat, Shield, Check } from "lucide-react";
import type { ComponentType } from "react";

type Pillar = "engineering" | "supplies" | "contracting" | "cybersecurity";

const meta: Record<
  Pillar,
  { icon: ComponentType<{ size?: number }>; capabilities: string[]; process: string[] }
> = {
  engineering: {
    icon: Building2,
    capabilities: [
      "Architectural concept & schematic design",
      "Interior & exterior design",
      "Spatial planning and feasibility",
      "MEP coordination",
      "Permitting & regulatory liaison",
      "BIM modeling & documentation",
    ],
    process: ["Discover", "Define", "Design", "Document", "Deliver"],
  },
  supplies: {
    icon: Package,
    capabilities: [
      "Premium construction materials",
      "Architectural finishes & cladding",
      "Specialized equipment sourcing",
      "Logistics & customs handling",
      "Vendor qualification",
      "Just-in-time delivery",
    ],
    process: ["Specify", "Source", "Qualify", "Ship", "Track"],
  },
  contracting: {
    icon: HardHat,
    capabilities: [
      "General contracting",
      "Turnkey fit-outs",
      "Mega-event pavilions",
      "Project management",
      "QA/QC and HSE compliance",
      "Accelerated delivery programs",
    ],
    process: ["Plan", "Mobilize", "Build", "Commission", "Handover"],
  },
  cybersecurity: {
    icon: Shield,
    capabilities: [
      "Security assessments & pen-testing",
      "SOC & 24/7 monitoring",
      "Identity & access management",
      "Cloud security architecture",
      "Incident response & forensics",
      "Compliance (ISO 27001, NIST)",
    ],
    process: ["Assess", "Design", "Deploy", "Monitor", "Improve"],
  },
};

export function generateStaticParams() {
  return (Object.keys(meta) as Pillar[]).flatMap((pillar) =>
    ["en", "ar"].map((locale) => ({ locale, pillar })),
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; pillar: string }>;
}) {
  const { locale, pillar } = await params;
  setRequestLocale(locale);
  if (!(pillar in meta)) notFound();
  const key = pillar as Pillar;
  const Icon = meta[key].icon;
  const t = await getTranslations(`services.${key}`);

  const isCyber = key === "cybersecurity";

  return (
    <>
      <Section className="relative !pt-32">
        <div className={isCyber ? "cyber-grid-bg" : "grid-bg"}
             style={{
               position: "absolute",
               inset: 0,
               opacity: 0.4,
               maskImage: "linear-gradient(180deg, black, transparent)",
             }} />
        <div className="relative">
          <Reveal>
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-md border"
                style={{
                  borderColor: isCyber
                    ? "rgba(27,156,252,0.4)"
                    : "rgba(200,169,106,0.3)",
                  color: isCyber ? "var(--color-cyber)" : "var(--color-gold)",
                }}
              >
                <Icon size={22} />
              </div>
              <Eyebrow>{key.toUpperCase()}</Eyebrow>
            </div>
            <H1 className="mt-8 max-w-4xl">{t("title")}</H1>
            <p
              className="font-display mt-5 text-lg tracking-[0.06em]"
              style={{ color: "var(--color-gold-soft)" }}
            >
              {t("tagline")}
            </p>
            <Lead className="mt-6">{t("desc")}</Lead>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>Capabilities</Eyebrow>
            <H2 className="mt-4">What we deliver</H2>
          </Reveal>
          <StaggerChildren className="md:col-span-8 grid gap-3 sm:grid-cols-2">
            {meta[key].capabilities.map((c) => (
              <StaggerItem key={c}>
                <div className="flex items-start gap-3 rounded-md border p-4"
                     style={{ borderColor: "rgba(200,169,106,0.18)" }}>
                  <Check size={16} style={{ color: "var(--color-gold)" }} />
                  <span className="text-sm" style={{ color: "var(--color-text-dim)" }}>{c}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
          <H2 className="mt-4">A disciplined path from idea to outcome</H2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
          {meta[key].process.map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <div className="border-t pt-5"
                   style={{ borderColor: "rgba(200,169,106,0.4)" }}>
                <span className="font-display text-xs tracking-[0.32em] uppercase"
                      style={{ color: "var(--color-gold)" }}>
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <H3 className="mt-3">{step}</H3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta />
    </>
  );
}
