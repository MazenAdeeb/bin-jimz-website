// Bilingual display labels for the fixed data enums (service pillar + sector).
// The raw English value stays the canonical key used for filtering/logic; these
// maps only translate it for display.

export type Lang = "en" | "ar";

const serviceLabels: Record<string, { en: string; ar: string }> = {
  Engineering: { en: "Engineering", ar: "الهندسة" },
  Contracting: { en: "Contracting", ar: "المقاولات" },
  Supplies: { en: "Supplies", ar: "التوريدات" },
  Cybersecurity: { en: "Cybersecurity", ar: "الأمن السيبراني" },
};

const sectorLabels: Record<string, { en: string; ar: string }> = {
  Government: { en: "Government", ar: "حكومي" },
  "Banking & Finance": { en: "Banking & Finance", ar: "البنوك والتمويل" },
  Industrial: { en: "Industrial", ar: "صناعي" },
  Residential: { en: "Residential", ar: "سكني" },
  Retail: { en: "Retail", ar: "التجزئة" },
  Commercial: { en: "Commercial", ar: "تجاري" },
  Hospitality: { en: "Hospitality", ar: "ضيافة" },
  Healthcare: { en: "Healthcare", ar: "رعاية صحية" },
  Education: { en: "Education", ar: "تعليمي" },
};

export function serviceLabel(service: string, lang: Lang): string {
  return serviceLabels[service]?.[lang] ?? service;
}

export function sectorLabel(sector: string, lang: Lang): string {
  return sectorLabels[sector]?.[lang] ?? sector;
}
