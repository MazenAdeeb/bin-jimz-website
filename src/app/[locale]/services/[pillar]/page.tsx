import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section, Eyebrow, H1, H2, H3, Lead } from "@/components/ui/section";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { Building2, Package, HardHat, Shield, Check } from "lucide-react";
import type { ComponentType } from "react";
import { getSiteContent } from "@/lib/site-content";

type Pillar = "engineering" | "supplies" | "contracting" | "cybersecurity";

type Bilingual = { en: string; ar: string };

const meta: Record<
  Pillar,
  { icon: ComponentType<{ size?: number }>; capabilities: Bilingual[]; process: Bilingual[] }
> = {
  engineering: {
    icon: Building2,
    capabilities: [
      { en: "Architectural concept & schematic design", ar: "التصميم المعماري المبدئي والتخطيطي" },
      { en: "Interior & exterior design", ar: "التصميم الداخلي والخارجي" },
      { en: "Spatial planning and feasibility", ar: "التخطيط المكاني ودراسات الجدوى" },
      { en: "MEP coordination", ar: "تنسيق الأعمال الكهروميكانيكية" },
      { en: "Permitting & regulatory liaison", ar: "التصاريح والتنسيق التنظيمي" },
      { en: "BIM modeling & documentation", ar: "نمذجة معلومات البناء والتوثيق" },
    ],
    process: [
      { en: "Discover", ar: "الاستكشاف" },
      { en: "Define", ar: "التحديد" },
      { en: "Design", ar: "التصميم" },
      { en: "Document", ar: "التوثيق" },
      { en: "Deliver", ar: "التسليم" },
    ],
  },
  supplies: {
    icon: Package,
    capabilities: [
      { en: "Premium construction materials", ar: "مواد بناء متميزة" },
      { en: "Architectural finishes & cladding", ar: "التشطيبات المعمارية والكسوات" },
      { en: "Specialized equipment sourcing", ar: "توريد المعدات المتخصصة" },
      { en: "Logistics & customs handling", ar: "الخدمات اللوجستية والتخليص الجمركي" },
      { en: "Vendor qualification", ar: "تأهيل الموردين" },
      { en: "Just-in-time delivery", ar: "التسليم في الوقت المحدد" },
    ],
    process: [
      { en: "Specify", ar: "التحديد" },
      { en: "Source", ar: "التوريد" },
      { en: "Qualify", ar: "التأهيل" },
      { en: "Ship", ar: "الشحن" },
      { en: "Track", ar: "التتبع" },
    ],
  },
  contracting: {
    icon: HardHat,
    capabilities: [
      { en: "General contracting", ar: "المقاولات العامة" },
      { en: "Turnkey fit-outs", ar: "التشطيبات المتكاملة تسليم مفتاح" },
      { en: "Mega-event pavilions", ar: "أجنحة الفعاليات الكبرى" },
      { en: "Project management", ar: "إدارة المشاريع" },
      { en: "QA/QC and HSE compliance", ar: "ضمان الجودة والامتثال للصحة والسلامة والبيئة" },
      { en: "Accelerated delivery programs", ar: "برامج التسليم المعجّل" },
    ],
    process: [
      { en: "Plan", ar: "التخطيط" },
      { en: "Mobilize", ar: "التعبئة" },
      { en: "Build", ar: "التنفيذ" },
      { en: "Commission", ar: "التشغيل التجريبي" },
      { en: "Handover", ar: "التسليم" },
    ],
  },
  cybersecurity: {
    icon: Shield,
    capabilities: [
      { en: "Security assessments & pen-testing", ar: "تقييمات الأمن واختبار الاختراق" },
      { en: "SOC & 24/7 monitoring", ar: "مركز العمليات الأمنية والمراقبة على مدار الساعة" },
      { en: "Identity & access management", ar: "إدارة الهوية والوصول" },
      { en: "Cloud security architecture", ar: "هندسة أمن السحابة" },
      { en: "Incident response & forensics", ar: "الاستجابة للحوادث والأدلة الجنائية الرقمية" },
      { en: "Compliance (ISO 27001, NIST)", ar: "الامتثال (ISO 27001، NIST)" },
    ],
    process: [
      { en: "Assess", ar: "التقييم" },
      { en: "Design", ar: "التصميم" },
      { en: "Deploy", ar: "النشر" },
      { en: "Monitor", ar: "المراقبة" },
      { en: "Improve", ar: "التحسين" },
    ],
  },
};

const pillarLabelAr: Record<Pillar, string> = {
  engineering: "الهندسة",
  supplies: "التوريدات",
  contracting: "المقاولات",
  cybersecurity: "الأمن السيبراني",
};

const ui = {
  capabilities: { en: "Capabilities", ar: "الإمكانات" },
  whatWeDeliver: { en: "What we deliver", ar: "ما نقدّمه" },
  ourProcess: { en: "Our process", ar: "منهجيتنا" },
  processTitle: {
    en: "A disciplined path from idea to outcome",
    ar: "مسار منضبط من الفكرة إلى النتيجة",
  },
  step: { en: "Step", ar: "خطوة" },
} as const;

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
  const lang = locale === "ar" ? "ar" : "en";
  const content = await getSiteContent();

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
              <Eyebrow>{lang === "ar" ? pillarLabelAr[key] : key.toUpperCase()}</Eyebrow>
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
            <Eyebrow>{ui.capabilities[lang]}</Eyebrow>
            <H2 className="mt-4">{ui.whatWeDeliver[lang]}</H2>
          </Reveal>
          <StaggerChildren className="md:col-span-8 grid gap-3 sm:grid-cols-2">
            {meta[key].capabilities.map((c) => (
              <StaggerItem key={c.en}>
                <div className="flex items-start gap-3 rounded-md border p-4"
                     style={{ borderColor: "rgba(200,169,106,0.18)" }}>
                  <Check size={16} style={{ color: "var(--color-gold)" }} />
                  <span className="text-sm" style={{ color: "var(--color-text-dim)" }}>{c[lang]}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <Reveal>
          <Eyebrow>{ui.ourProcess[lang]}</Eyebrow>
          <H2 className="mt-4">{ui.processTitle[lang]}</H2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
          {meta[key].process.map((step, i) => (
            <Reveal key={step.en} delay={i * 0.08}>
              <div className="border-t pt-5"
                   style={{ borderColor: "rgba(200,169,106,0.4)" }}>
                <span className="font-display text-xs tracking-[0.32em] uppercase"
                      style={{ color: "var(--color-gold)" }}>
                  {ui.step[lang]} {String(i + 1).padStart(2, "0")}
                </span>
                <H3 className="mt-3">{step[lang]}</H3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta
        title={content.cta.title[lang]}
        copy={content.cta.copy[lang]}
        button={content.cta.button[lang]}
        secondaryButton={content.hero.secondaryCta[lang]}
      />
    </>
  );
}
