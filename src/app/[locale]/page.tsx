import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedProjects, type FeaturedProject } from "@/components/sections/featured-projects";
import { Essence } from "@/components/sections/essence";
import { Cta } from "@/components/sections/cta";
import { getSiteContent } from "@/lib/site-content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getSiteContent();
  const lang = locale === "ar" ? "ar" : "en";
  return {
    title: content.brand.name,
    description: content.hero.intro[lang],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: `${content.brand.name} · ${content.brand.tagline}`,
      description: content.hero.intro[lang],
      locale,
    },
  };
}

async function loadFeatured(locale: "en" | "ar"): Promise<FeaturedProject[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { status: "published", featured: true },
      include: { translations: true, coverImage: true, services: true },
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
      take: 4,
    });
    return rows.map((r) => {
      const t = r.translations.find((x) => x.locale === locale) ??
        r.translations.find((x) => x.locale === "en");
      const service = r.services[0]?.pillar ?? "";
      return {
        slug: r.slug,
        title: t?.title ?? r.slug,
        sector: r.sector ?? "",
        year: r.year,
        service:
          service.charAt(0).toUpperCase() + service.slice(1),
        cover: r.coverImage?.url ?? FALLBACK_COVER,
      };
    });
  } catch {
    return [];
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === "ar" ? "ar" : "en";
  const content = await getSiteContent();
  const t = await getTranslations({ locale, namespace: "common" });
  const projects = await loadFeatured(lang);

  return (
    <>
      <Hero
        eyebrow={content.hero.eyebrow[lang]}
        title1={content.hero.title1[lang]}
        title2={content.hero.title2[lang]}
        intro={content.hero.intro[lang]}
        cta={content.hero.cta[lang]}
        secondaryCta={content.hero.secondaryCta[lang]}
      />
      <Stats
        items={content.stats.map((s) => ({
          value: s.value,
          suffix: s.suffix,
          title: s.title[lang],
          desc: s.desc[lang],
        }))}
        locale={locale}
      />
      <ServicesGrid
        eyebrow={content.services.eyebrow[lang]}
        title={content.services.title[lang]}
        intro={content.services.intro[lang]}
        learnMore={t("learnMore")}
      />
      <FeaturedProjects
        eyebrow={content.projects.eyebrow[lang]}
        title={content.projects.title[lang]}
        viewAllLabel={t("viewAll")}
        projects={projects}
      />
      <Essence
        eyebrow={content.essence.eyebrow[lang]}
        title={content.essence.title[lang]}
      />
      <Cta
        title={content.cta.title[lang]}
        copy={content.cta.copy[lang]}
        button={content.cta.button[lang]}
        secondaryButton={content.hero.secondaryCta[lang]}
      />
    </>
  );
}
