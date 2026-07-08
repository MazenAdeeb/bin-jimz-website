export type EngineeringCategory =
  | "residential"
  | "commercial"
  | "hospitality"
  | "healthcare"
  | "education"
  | "industrial";

export type DesignType = "interior" | "exterior";

export type SeedProject = {
  slug: string;
  title: string;
  sector: string;
  service: string;
  // Engineering-only taxonomy: building type + interior/exterior discipline.
  category?: EngineeringCategory;
  design?: DesignType;
  cover: string;
  client?: string;
  location?: string;
  scope?: string;
  outcomes?: string;
  gallery?: string[];
};

export const allProjects: SeedProject[] = [
  // ── Contracting / Supplies / Cybersecurity ──────────────────────────────
  {
    slug: "national-pavilion-cairo",
    title: "National Pavilion · Mega Event",
    sector: "Government",
    service: "Contracting",
    location: "New Capital, Egypt",
    cover:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Full architectural execution and turnkey delivery of a national pavilion for a flagship government exhibition. Design, fabrication, fit-out, AV integration and commissioning.",
    outcomes:
      "Delivered ahead of schedule with a 100% safety record. Praised by visiting heads of state for material quality and lighting design.",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "secure-banking-network",
    title: "Secure Banking Network",
    sector: "Banking & Finance",
    service: "Cybersecurity",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    scope:
      "End-to-end SOC build-out, zero-trust network architecture, identity hardening and 24/7 monitoring for a regional banking group with 60+ branches.",
    outcomes:
      "MTTR cut by 68%. Achieved ISO 27001. Zero successful intrusions in first year of operation.",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "industrial-supply-chain",
    title: "Industrial Supply Chain Program",
    sector: "Industrial",
    service: "Supplies",
    location: "Sokhna, Egypt",
    cover:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Premium material sourcing and just-in-time delivery for a multi-site industrial expansion. Architectural finishes, cladding and specialized equipment.",
    outcomes:
      "Lead-time reduced 42%. Zero stockouts. Vendor base qualified to ISO 9001.",
  },
  {
    slug: "government-soc",
    title: "Government Security Operations Center",
    sector: "Government",
    service: "Cybersecurity",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Greenfield SOC for a federal entity. SIEM, SOAR, DLP, perimeter hardening and analyst training program.",
    outcomes:
      "98 mean alerts/day handled. 24/7 coverage. Operational in five months.",
  },

  // ── Engineering · Residential ───────────────────────────────────────────
  {
    slug: "private-villa-interior",
    title: "Private Villa — Interior Design",
    sector: "Residential",
    service: "Engineering",
    category: "residential",
    design: "interior",
    location: "New Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Full interior design and fit-out for a private villa — space planning, bespoke joinery, lighting design and premium material selection across living, dining and private suites.",
    outcomes:
      "Delivered a warm, contemporary living environment with tailored storage and layered lighting throughout.",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "hillside-villa-exterior",
    title: "Hillside Villa — Exterior & Facade",
    sector: "Residential",
    service: "Engineering",
    category: "residential",
    design: "exterior",
    location: "Ain Sokhna, Egypt",
    cover:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Architectural design and exterior engineering for a modern hillside villa — massing, facade detailing, cladding systems and landscape integration.",
    outcomes:
      "A clean, sculptural facade that frames the sea view while managing solar exposure and privacy.",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    ],
  },

  // ── Engineering · Commercial ────────────────────────────────────────────
  {
    slug: "luxury-retail-fitout",
    title: "Luxury Retail Fit-Out — Interior",
    sector: "Retail",
    service: "Engineering",
    category: "commercial",
    design: "interior",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Full architectural and interior design package for a flagship luxury retail concept across 1,200 m². Brushed metals, stone, premium lighting.",
    outcomes:
      "Same-store sales up 38% in first quarter. Featured in regional design press.",
    gallery: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "smart-headquarters",
    title: "Smart Corporate Headquarters — Exterior",
    sector: "Commercial",
    service: "Engineering",
    category: "commercial",
    design: "exterior",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Architectural engineering, curtain-wall facade and smart-building integration for a 14-floor enterprise HQ.",
    outcomes:
      "30% energy reduction vs benchmark. Received regional sustainability award.",
  },

  // ── Engineering · Hospitality ───────────────────────────────────────────
  {
    slug: "boutique-hotel-interior",
    title: "Boutique Hotel — Interior",
    sector: "Hospitality",
    service: "Engineering",
    category: "hospitality",
    design: "interior",
    location: "El Gouna, Egypt",
    cover:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Interior design for a 48-key boutique hotel — lobby, guest rooms, spa and dining. Material palette, custom furniture and mood lighting.",
    outcomes:
      "A distinctive, photogenic guest experience that lifted average daily rate and direct bookings.",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "seaside-resort-exterior",
    title: "Seaside Resort — Exterior",
    sector: "Hospitality",
    service: "Engineering",
    category: "hospitality",
    design: "exterior",
    location: "North Coast, Egypt",
    cover:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Master architectural concept and exterior engineering for a seaside resort — building forms, facades, terraces and landscape connectivity.",
    outcomes:
      "A cohesive resort language that maximizes sea frontage and shaded outdoor living.",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    ],
  },

  // ── Engineering · Healthcare ────────────────────────────────────────────
  {
    slug: "medical-clinic-interior",
    title: "Medical Clinic — Interior",
    sector: "Healthcare",
    service: "Engineering",
    category: "healthcare",
    design: "interior",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Interior design and medical fit-out for a multi-specialty clinic — reception, consultation rooms and treatment areas engineered for hygiene and patient flow.",
    outcomes:
      "A calm, efficient clinical environment compliant with healthcare fit-out standards.",
    gallery: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "regional-hospital-exterior",
    title: "Regional Hospital — Exterior",
    sector: "Healthcare",
    service: "Engineering",
    category: "healthcare",
    design: "exterior",
    location: "Giza, Egypt",
    cover:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Architectural and exterior engineering for a regional hospital — facade systems, wayfinding, ambulance access and service circulation.",
    outcomes:
      "A clear, welcoming arrival experience with efficient emergency and logistics routing.",
  },

  // ── Engineering · Education ─────────────────────────────────────────────
  {
    slug: "university-library-interior",
    title: "University Library — Interior",
    sector: "Education",
    service: "Engineering",
    category: "education",
    design: "interior",
    location: "New Capital, Egypt",
    cover:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Interior design for a university library — reading halls, quiet study, group rooms and stacks with acoustic and lighting engineering.",
    outcomes:
      "A flexible learning environment balancing focus, collaboration and natural light.",
    gallery: [
      "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    slug: "campus-building-exterior",
    title: "Campus Building — Exterior",
    sector: "Education",
    service: "Engineering",
    category: "education",
    design: "exterior",
    location: "6th of October, Egypt",
    cover:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Architectural design and exterior engineering for a campus academic building — facade, shading, entrances and courtyard integration.",
    outcomes:
      "A durable, contemporary campus identity with shaded gathering spaces.",
  },

  // ── Engineering · Industrial ────────────────────────────────────────────
  {
    slug: "production-plant-interior",
    title: "Production Plant — Interior",
    sector: "Industrial",
    service: "Engineering",
    category: "industrial",
    design: "interior",
    location: "10th of Ramadan, Egypt",
    cover:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Interior layout and industrial engineering for a production plant — process flow, utility routing, safety zoning and operator facilities.",
    outcomes:
      "An optimized production floor with clear material flow and improved throughput.",
  },
  {
    slug: "logistics-facility-exterior",
    title: "Logistics Facility — Exterior",
    sector: "Industrial",
    service: "Engineering",
    category: "industrial",
    design: "exterior",
    location: "Sokhna, Egypt",
    cover:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Architectural and exterior engineering for a logistics facility — envelope, loading docks, circulation yards and site services.",
    outcomes:
      "A robust, efficient envelope engineered for heavy logistics and future expansion.",
  },
];
