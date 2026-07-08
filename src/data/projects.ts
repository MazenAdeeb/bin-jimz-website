export type EngineeringCategory =
  | "residential"
  | "commercial"
  | "hospitality"
  | "healthcare"
  | "education"
  | "industrial";

export type DesignType = "interior" | "exterior";

type Bilingual = { en: string; ar: string };

export type SeedProject = {
  slug: string;
  title: Bilingual;
  // sector + service stay canonical English keys (used for filtering / label maps).
  sector: string;
  service: string;
  // Engineering-only taxonomy: building type + interior/exterior discipline.
  category?: EngineeringCategory;
  design?: DesignType;
  cover: string;
  client?: string;
  location?: Bilingual;
  scope?: Bilingual;
  outcomes?: Bilingual;
  gallery?: string[];
};

export const allProjects: SeedProject[] = [
  // ── Contracting / Supplies / Cybersecurity ──────────────────────────────
  {
    slug: "national-pavilion-cairo",
    title: {
      en: "National Pavilion · Mega Event",
      ar: "الجناح الوطني · فعالية كبرى",
    },
    sector: "Government",
    service: "Contracting",
    location: { en: "New Capital, Egypt", ar: "العاصمة الإدارية، مصر" },
    cover:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Full architectural execution and turnkey delivery of a national pavilion for a flagship government exhibition. Design, fabrication, fit-out, AV integration and commissioning.",
      ar: "تنفيذ معماري متكامل وتسليم مفتاحي لجناح وطني ضمن معرض حكومي رئيسي. تصميم وتصنيع وتشطيب ودمج أنظمة الصوت والصورة والتشغيل.",
    },
    outcomes: {
      en: "Delivered ahead of schedule with a 100% safety record. Praised by visiting heads of state for material quality and lighting design.",
      ar: "تسليم قبل الموعد بسجل سلامة 100٪. وإشادة من كبار الزوّار بجودة الخامات وتصميم الإضاءة.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "secure-banking-network",
    title: { en: "Secure Banking Network", ar: "شبكة مصرفية آمنة" },
    sector: "Banking & Finance",
    service: "Cybersecurity",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "End-to-end SOC build-out, zero-trust network architecture, identity hardening and 24/7 monitoring for a regional banking group with 60+ branches.",
      ar: "إنشاء مركز عمليات أمنية متكامل، وبنية شبكة عديمة الثقة، وتحصين الهويّات، ومراقبة على مدار الساعة لمجموعة مصرفية إقليمية بأكثر من 60 فرعًا.",
    },
    outcomes: {
      en: "MTTR cut by 68%. Achieved ISO 27001. Zero successful intrusions in first year of operation.",
      ar: "خفض زمن الاستجابة 68٪. والحصول على شهادة ISO 27001. وصفر اختراقات ناجحة في العام الأول من التشغيل.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "industrial-supply-chain",
    title: {
      en: "Industrial Supply Chain Program",
      ar: "برنامج سلسلة التوريد الصناعية",
    },
    sector: "Industrial",
    service: "Supplies",
    location: { en: "Sokhna, Egypt", ar: "السخنة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Premium material sourcing and just-in-time delivery for a multi-site industrial expansion. Architectural finishes, cladding and specialized equipment.",
      ar: "توريد خامات متميّزة وتسليم في الوقت المناسب لتوسّع صناعي متعدد المواقع. تشطيبات معمارية وكسوات ومعدّات متخصصة.",
    },
    outcomes: {
      en: "Lead-time reduced 42%. Zero stockouts. Vendor base qualified to ISO 9001.",
      ar: "خفض زمن التوريد 42٪. وصفر نفاد للمخزون. وتأهيل قاعدة الموردين وفق ISO 9001.",
    },
  },
  {
    slug: "government-soc",
    title: {
      en: "Government Security Operations Center",
      ar: "مركز العمليات الأمنية الحكومي",
    },
    sector: "Government",
    service: "Cybersecurity",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Greenfield SOC for a federal entity. SIEM, SOAR, DLP, perimeter hardening and analyst training program.",
      ar: "مركز عمليات أمنية جديد لجهة اتحادية. أنظمة SIEM وSOAR وDLP، وتحصين المحيط، وبرنامج تدريب المحلّلين.",
    },
    outcomes: {
      en: "98 mean alerts/day handled. 24/7 coverage. Operational in five months.",
      ar: "معالجة 98 تنبيهًا يوميًا في المتوسط. وتغطية على مدار الساعة. والتشغيل خلال خمسة أشهر.",
    },
  },

  // ── Engineering · Residential ───────────────────────────────────────────
  {
    slug: "private-villa-interior",
    title: {
      en: "Private Villa — Interior Design",
      ar: "فيلا خاصة — تصميم داخلي",
    },
    sector: "Residential",
    service: "Engineering",
    category: "residential",
    design: "interior",
    location: { en: "New Cairo, Egypt", ar: "القاهرة الجديدة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Full interior design and fit-out for a private villa — space planning, bespoke joinery, lighting design and premium material selection across living, dining and private suites.",
      ar: "تصميم داخلي وتشطيب متكامل لفيلا خاصة — تخطيط المساحات، ونجارة مُفصّلة، وتصميم إضاءة، واختيار خامات فاخرة عبر مناطق المعيشة والطعام والأجنحة الخاصة.",
    },
    outcomes: {
      en: "Delivered a warm, contemporary living environment with tailored storage and layered lighting throughout.",
      ar: "بيئة معيشة عصرية دافئة بحلول تخزين مخصّصة وإضاءة متدرّجة في كل الأرجاء.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "hillside-villa-exterior",
    title: {
      en: "Hillside Villa — Exterior & Facade",
      ar: "فيلا على منحدر — الواجهات والتصميم الخارجي",
    },
    sector: "Residential",
    service: "Engineering",
    category: "residential",
    design: "exterior",
    location: { en: "Ain Sokhna, Egypt", ar: "العين السخنة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Architectural design and exterior engineering for a modern hillside villa — massing, facade detailing, cladding systems and landscape integration.",
      ar: "تصميم معماري وهندسة خارجية لفيلا عصرية على منحدر — الكتل، وتفاصيل الواجهات، وأنظمة الكسوة، ودمج المناظر الطبيعية.",
    },
    outcomes: {
      en: "A clean, sculptural facade that frames the sea view while managing solar exposure and privacy.",
      ar: "واجهة نحتية نظيفة تؤطّر إطلالة البحر مع التحكّم في التعرّض للشمس والخصوصية.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    ],
  },

  // ── Engineering · Commercial ────────────────────────────────────────────
  {
    slug: "luxury-retail-fitout",
    title: {
      en: "Luxury Retail Fit-Out — Interior",
      ar: "تشطيب تجزئة فاخر — تصميم داخلي",
    },
    sector: "Retail",
    service: "Engineering",
    category: "commercial",
    design: "interior",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Full architectural and interior design package for a flagship luxury retail concept across 1,200 m². Brushed metals, stone, premium lighting.",
      ar: "حزمة تصميم معماري وداخلي متكاملة لمفهوم تجزئة فاخر على مساحة 1,200 م². معادن مصقولة وأحجار وإضاءة فاخرة.",
    },
    outcomes: {
      en: "Same-store sales up 38% in first quarter. Featured in regional design press.",
      ar: "ارتفاع مبيعات المتجر 38٪ في الربع الأول. وتغطية في الصحافة التصميمية الإقليمية.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "smart-headquarters",
    title: {
      en: "Smart Corporate Headquarters — Exterior",
      ar: "مقر شركة ذكي — تصميم خارجي",
    },
    sector: "Commercial",
    service: "Engineering",
    category: "commercial",
    design: "exterior",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Architectural engineering, curtain-wall facade and smart-building integration for a 14-floor enterprise HQ.",
      ar: "هندسة معمارية وواجهة زجاجية (كيرتن وول) ودمج مبنى ذكي لمقرّ مؤسسي من 14 طابقًا.",
    },
    outcomes: {
      en: "30% energy reduction vs benchmark. Received regional sustainability award.",
      ar: "خفض استهلاك الطاقة 30٪ مقارنة بالمعيار. وحصل على جائزة الاستدامة الإقليمية.",
    },
  },

  // ── Engineering · Hospitality ───────────────────────────────────────────
  {
    slug: "boutique-hotel-interior",
    title: { en: "Boutique Hotel — Interior", ar: "فندق بوتيك — تصميم داخلي" },
    sector: "Hospitality",
    service: "Engineering",
    category: "hospitality",
    design: "interior",
    location: { en: "El Gouna, Egypt", ar: "الجونة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Interior design for a 48-key boutique hotel — lobby, guest rooms, spa and dining. Material palette, custom furniture and mood lighting.",
      ar: "تصميم داخلي لفندق بوتيك من 48 غرفة — البهو والغرف والسبا والمطاعم. لوحة خامات وأثاث مخصّص وإضاءة أجواء.",
    },
    outcomes: {
      en: "A distinctive, photogenic guest experience that lifted average daily rate and direct bookings.",
      ar: "تجربة ضيافة مميّزة وجذّابة رفعت متوسط سعر الغرفة والحجوزات المباشرة.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "seaside-resort-exterior",
    title: { en: "Seaside Resort — Exterior", ar: "منتجع على البحر — تصميم خارجي" },
    sector: "Hospitality",
    service: "Engineering",
    category: "hospitality",
    design: "exterior",
    location: { en: "North Coast, Egypt", ar: "الساحل الشمالي، مصر" },
    cover:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Master architectural concept and exterior engineering for a seaside resort — building forms, facades, terraces and landscape connectivity.",
      ar: "مفهوم معماري رئيسي وهندسة خارجية لمنتجع ساحلي — كتل المباني والواجهات والتراسات وتواصل المناظر الطبيعية.",
    },
    outcomes: {
      en: "A cohesive resort language that maximizes sea frontage and shaded outdoor living.",
      ar: "لغة تصميم متناغمة للمنتجع تعظّم الواجهة البحرية والمعيشة الخارجية المظلّلة.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    ],
  },

  // ── Engineering · Healthcare ────────────────────────────────────────────
  {
    slug: "medical-clinic-interior",
    title: { en: "Medical Clinic — Interior", ar: "عيادة طبية — تصميم داخلي" },
    sector: "Healthcare",
    service: "Engineering",
    category: "healthcare",
    design: "interior",
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Interior design and medical fit-out for a multi-specialty clinic — reception, consultation rooms and treatment areas engineered for hygiene and patient flow.",
      ar: "تصميم داخلي وتجهيز طبي لعيادة متعددة التخصصات — الاستقبال وغرف الكشف ومناطق العلاج، مُهندسة للنظافة وانسياب المرضى.",
    },
    outcomes: {
      en: "A calm, efficient clinical environment compliant with healthcare fit-out standards.",
      ar: "بيئة إكلينيكية هادئة وفعّالة مطابقة لمعايير التجهيز الصحي.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "regional-hospital-exterior",
    title: { en: "Regional Hospital — Exterior", ar: "مستشفى إقليمي — تصميم خارجي" },
    sector: "Healthcare",
    service: "Engineering",
    category: "healthcare",
    design: "exterior",
    location: { en: "Giza, Egypt", ar: "الجيزة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Architectural and exterior engineering for a regional hospital — facade systems, wayfinding, ambulance access and service circulation.",
      ar: "تصميم معماري وهندسة خارجية لمستشفى إقليمي — أنظمة الواجهات والإرشاد ومداخل الإسعاف ودوران الخدمات.",
    },
    outcomes: {
      en: "A clear, welcoming arrival experience with efficient emergency and logistics routing.",
      ar: "تجربة وصول واضحة ومرحّبة مع توجيه فعّال للطوارئ والخدمات اللوجستية.",
    },
  },

  // ── Engineering · Education ─────────────────────────────────────────────
  {
    slug: "university-library-interior",
    title: { en: "University Library — Interior", ar: "مكتبة جامعية — تصميم داخلي" },
    sector: "Education",
    service: "Engineering",
    category: "education",
    design: "interior",
    location: { en: "New Capital, Egypt", ar: "العاصمة الإدارية، مصر" },
    cover:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Interior design for a university library — reading halls, quiet study, group rooms and stacks with acoustic and lighting engineering.",
      ar: "تصميم داخلي لمكتبة جامعية — قاعات المطالعة والدراسة الهادئة وغرف المجموعات والأرفف، مع هندسة صوتية وإضاءة.",
    },
    outcomes: {
      en: "A flexible learning environment balancing focus, collaboration and natural light.",
      ar: "بيئة تعلّم مرنة توازن بين التركيز والتعاون والإضاءة الطبيعية.",
    },
    gallery: [
      "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "campus-building-exterior",
    title: { en: "Campus Building — Exterior", ar: "مبنى جامعي — تصميم خارجي" },
    sector: "Education",
    service: "Engineering",
    category: "education",
    design: "exterior",
    location: { en: "6th of October, Egypt", ar: "السادس من أكتوبر، مصر" },
    cover:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Architectural design and exterior engineering for a campus academic building — facade, shading, entrances and courtyard integration.",
      ar: "تصميم معماري وهندسة خارجية لمبنى أكاديمي بالحرم الجامعي — الواجهات والتظليل والمداخل ودمج الأفنية.",
    },
    outcomes: {
      en: "A durable, contemporary campus identity with shaded gathering spaces.",
      ar: "هوية جامعية عصرية ومتينة مع مساحات تجمّع مظلّلة.",
    },
  },

  // ── Engineering · Industrial ────────────────────────────────────────────
  {
    slug: "production-plant-interior",
    title: { en: "Production Plant — Interior", ar: "مصنع إنتاج — تصميم داخلي" },
    sector: "Industrial",
    service: "Engineering",
    category: "industrial",
    design: "interior",
    location: { en: "10th of Ramadan, Egypt", ar: "العاشر من رمضان، مصر" },
    cover:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Interior layout and industrial engineering for a production plant — process flow, utility routing, safety zoning and operator facilities.",
      ar: "تخطيط داخلي وهندسة صناعية لمصنع إنتاج — انسياب العمليات وتمديد المرافق وتقسيم مناطق السلامة ومرافق المشغّلين.",
    },
    outcomes: {
      en: "An optimized production floor with clear material flow and improved throughput.",
      ar: "أرضية إنتاج مُحسّنة بانسياب واضح للمواد وإنتاجية أعلى.",
    },
  },
  {
    slug: "logistics-facility-exterior",
    title: { en: "Logistics Facility — Exterior", ar: "منشأة لوجستية — تصميم خارجي" },
    sector: "Industrial",
    service: "Engineering",
    category: "industrial",
    design: "exterior",
    location: { en: "Sokhna, Egypt", ar: "السخنة، مصر" },
    cover:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80",
    scope: {
      en: "Architectural and exterior engineering for a logistics facility — envelope, loading docks, circulation yards and site services.",
      ar: "تصميم معماري وهندسة خارجية لمنشأة لوجستية — الغلاف الخارجي وأرصفة التحميل وساحات الحركة وخدمات الموقع.",
    },
    outcomes: {
      en: "A robust, efficient envelope engineered for heavy logistics and future expansion.",
      ar: "غلاف خارجي متين وفعّال مُهندَس للخدمات اللوجستية الثقيلة والتوسّع المستقبلي.",
    },
  },
];
