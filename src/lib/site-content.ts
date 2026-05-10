import { prisma } from "./db";

export type SiteContent = {
  brand: { name: string; tagline: string };
  hero: {
    eyebrow: { en: string; ar: string };
    title1: { en: string; ar: string };
    title2: { en: string; ar: string };
    intro: { en: string; ar: string };
    cta: { en: string; ar: string };
    secondaryCta: { en: string; ar: string };
  };
  stats: Array<{
    value: number;
    suffix: string;
    title: { en: string; ar: string };
    desc: { en: string; ar: string };
  }>;
  services: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
    intro: { en: string; ar: string };
  };
  projects: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
  };
  essence: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
  };
  cta: {
    title: { en: string; ar: string };
    copy: { en: string; ar: string };
    button: { en: string; ar: string };
  };
  contact: {
    email: string;
    phone: string;
    address: { en: string; ar: string };
  };
};

export const defaultContent: SiteContent = {
  brand: { name: "Bin Jimz", tagline: "Building the future. Securing what matters." },
  hero: {
    eyebrow: { en: "BIN JIMZ COMPANY", ar: "شركة بن جيمز" },
    title1: { en: "Building the future.", ar: "نبني المستقبل." },
    title2: { en: "Securing what matters.", ar: "ونحمي ما يهم." },
    intro: {
      en: "We bridge robust physical development with advanced digital protection — engineering, contracting and cybersecurity under one trusted roof.",
      ar: "نجمع بين التطوير العمراني الموثوق والحماية الرقمية المتقدمة — هندسة ومقاولات وأمن سيبراني تحت سقف واحد.",
    },
    cta: { en: "Explore our work", ar: "اكتشف أعمالنا" },
    secondaryCta: { en: "Talk to our AI assistant", ar: "تحدث مع المساعد الذكي" },
  },
  stats: [
    {
      value: 50,
      suffix: "+",
      title: { en: "Collaborations", ar: "تعاونات" },
      desc: {
        en: "Trusted by leading governments, retail brands, and supply partners.",
        ar: "موثوق به من قبل الحكومات والعلامات التجارية الرائدة.",
      },
    },
    {
      value: 300,
      suffix: "+",
      title: { en: "Projects delivered", ar: "مشروع منجز" },
      desc: {
        en: "From mega-event pavilions to high-tech commercial fit-outs.",
        ar: "من أجنحة الفعاليات الكبرى إلى التشطيبات التجارية المتطورة.",
      },
    },
    {
      value: 35,
      suffix: "%",
      title: { en: "Faster delivery", ar: "تسليم أسرع" },
      desc: {
        en: "Average lead-time reduction across our contracting portfolio.",
        ar: "متوسط تقليص زمن التسليم في محفظة المقاولات.",
      },
    },
    {
      value: 99.9,
      suffix: "%",
      title: { en: "Cybersecurity uptime", ar: "زمن تشغيل الأمن" },
      desc: {
        en: "On managed digital defense engagements.",
        ar: "في مهمات الدفاع الرقمي المُدارة.",
      },
    },
  ],
  services: {
    eyebrow: { en: "WHAT WE DO", ar: "ما نقوم به" },
    title: { en: "Four pillars. One partner.", ar: "أربع ركائز. شريك واحد." },
    intro: {
      en: "End-to-end execution that simplifies complex physical and digital challenges.",
      ar: "تنفيذ شامل يبسّط أعقد التحديات المادية والرقمية.",
    },
  },
  projects: {
    eyebrow: { en: "OUR WORK", ar: "أعمالنا" },
    title: { en: "Selected projects", ar: "مشاريع مختارة" },
  },
  essence: {
    eyebrow: { en: "BRAND ESSENCE", ar: "جوهر العلامة" },
    title: { en: "What we stand for", ar: "ما نمثله" },
  },
  cta: {
    title: {
      en: "Have a vision? Let's build and secure it.",
      ar: "هل لديك رؤية؟ لنبنها ونحميها.",
    },
    copy: {
      en: "Tell us about your project — our team will respond within one business day.",
      ar: "أخبرنا عن مشروعك — سيرد فريقنا خلال يوم عمل واحد.",
    },
    button: { en: "Start a conversation", ar: "ابدأ محادثة" },
  },
  contact: {
    email: "m.mostafa@binjimz.com",
    phone: "+20 10 10429021",
    address: {
      en: "Nasr City St., Cairo, Egypt",
      ar: "مدينة نصر، القاهرة، مصر",
    },
  },
};

const KEY = "site-content";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: KEY } });
    if (!row) return defaultContent;
    return mergeContent(defaultContent, row.value as Partial<SiteContent>);
  } catch {
    return defaultContent;
  }
}

export async function setSiteContent(content: SiteContent) {
  await prisma.siteSetting.upsert({
    where: { key: KEY },
    create: { key: KEY, value: content as unknown as object },
    update: { value: content as unknown as object },
  });
}

function mergeContent(a: SiteContent, b: Partial<SiteContent>): SiteContent {
  return {
    ...a,
    ...b,
    brand: { ...a.brand, ...(b.brand ?? {}) },
    hero: { ...a.hero, ...(b.hero ?? {}) },
    stats: b.stats ?? a.stats,
    services: { ...a.services, ...(b.services ?? {}) },
    projects: { ...a.projects, ...(b.projects ?? {}) },
    essence: { ...a.essence, ...(b.essence ?? {}) },
    cta: { ...a.cta, ...(b.cta ?? {}) },
    contact: { ...a.contact, ...(b.contact ?? {}) },
  };
}
