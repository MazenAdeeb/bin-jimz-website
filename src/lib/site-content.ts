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
  ecommerce: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
    desc: { en: string; ar: string };
    cta: { en: string; ar: string };
  };
  services: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
    intro: { en: string; ar: string };
  };
  projects: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
  };
  process: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
    intro: { en: string; ar: string };
    ctaLabel: { en: string; ar: string };
    steps: Array<{
      title: { en: string; ar: string };
      desc: { en: string; ar: string };
    }>;
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
    phones: string[];
    whatsapp: string;
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
  ecommerce: {
    eyebrow: { en: "NEW · E-COMMERCE", ar: "جديد · التجارة الإلكترونية" },
    title: {
      en: "E-commerce solutions that sell.",
      ar: "حلول تجارة إلكترونية تبيع فعلاً.",
    },
    desc: {
      en: "We design, build and secure high-converting online stores — storefront, payments, and logistics engineered end-to-end.",
      ar: "نصمّم ونبني ونؤمّن متاجر إلكترونية عالية التحويل — الواجهة والمدفوعات والخدمات اللوجستية بتنفيذٍ متكامل.",
    },
    cta: { en: "Start selling online", ar: "ابدأ البيع أونلاين" },
  },
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
  process: {
    eyebrow: { en: "HOW WE WORK", ar: "كيف نعمل" },
    title: { en: "Our process", ar: "آلية عملنا" },
    intro: {
      en: "A disciplined, four-stage methodology that keeps every project — and every client — on schedule.",
      ar: "منهجية منضبطة من أربع مراحل تحافظ على التزام كل مشروع وكل عميل بالجدول الزمني.",
    },
    ctaLabel: { en: "See our process", ar: "شاهد خطوات العمل" },
    steps: [
      {
        title: { en: "Discovery & Planning", ar: "اكتشاف وتخطيط" },
        desc: {
          en: "We study your goals, site and constraints to shape a clear, actionable roadmap.",
          ar: "ندرس أهدافكم والموقع والمتطلبات لنضع خارطة طريق واضحة وقابلة للتنفيذ.",
        },
      },
      {
        title: { en: "Design & Engineering", ar: "تصميم وهندسة" },
        desc: {
          en: "Architectural and technical drawings, material specs and compliance sign-off.",
          ar: "مخططات معمارية وهندسية، مواصفات المواد، واعتمادات الالتزام.",
        },
      },
      {
        title: { en: "Execution & Contracting", ar: "تنفيذ ومقاولات" },
        desc: {
          en: "On-site delivery with rigorous quality control and transparent progress tracking.",
          ar: "تنفيذ ميداني مع ضبط جودة صارم ومتابعة شفافة لسير العمل.",
        },
      },
      {
        title: { en: "Handover & Support", ar: "تسليم ودعم" },
        desc: {
          en: "Final inspection, documentation and ongoing support after go-live.",
          ar: "معاينة نهائية وتوثيق ودعم مستمر بعد التشغيل.",
        },
      },
    ],
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
    email: "Info@binjimz.com",
    phones: ["+20 10 0021 5557", "+971 54 200 0526"],
    whatsapp: "+201000215557",
    address: {
      en: "Sheikh Zayed, Riviera St., Bldg 49, 1st Floor, Apt 5, Egypt",
      ar: "الشيخ زايد، شارع ريڤيرا، عمارة ٤٩، الدور الأول، شقة ٥",
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
    ecommerce: { ...a.ecommerce, ...(b.ecommerce ?? {}) },
    services: { ...a.services, ...(b.services ?? {}) },
    projects: { ...a.projects, ...(b.projects ?? {}) },
    process: {
      ...a.process,
      ...(b.process ?? {}),
      steps: b.process?.steps ?? a.process.steps,
    },
    essence: { ...a.essence, ...(b.essence ?? {}) },
    cta: { ...a.cta, ...(b.cta ?? {}) },
    contact: { ...a.contact, ...(b.contact ?? {}) },
  };
}
