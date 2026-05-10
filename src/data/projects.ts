export type SeedProject = {
  slug: string;
  title: string;
  sector: string;
  year: number;
  service: string;
  cover: string;
  client?: string;
  location?: string;
  scope?: string;
  outcomes?: string;
  gallery?: string[];
};

export const allProjects: SeedProject[] = [
  {
    slug: "national-pavilion-cairo",
    title: "National Pavilion · Mega Event",
    sector: "Government",
    year: 2025,
    service: "Contracting",
    location: "New Capital, Egypt",
    cover:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Full architectural execution and turnkey delivery of a national pavilion for a flagship government exhibition. Design, fabrication, fit-out, AV integration and commissioning in 90 days.",
    outcomes:
      "Delivered 12 days ahead of schedule. 100% safety record. Praised by visiting heads of state for material quality and lighting design.",
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
    year: 2025,
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
    slug: "luxury-retail-fitout",
    title: "Luxury Retail Fit-Out",
    sector: "Retail",
    year: 2024,
    service: "Engineering",
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
    title: "Smart Corporate Headquarters",
    sector: "Commercial",
    year: 2024,
    service: "Engineering",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Architectural engineering, MEP coordination and smart-building integration for a 14-floor enterprise HQ.",
    outcomes:
      "30% energy reduction vs benchmark. Received regional sustainability award.",
  },
  {
    slug: "industrial-supply-chain",
    title: "Industrial Supply Chain Program",
    sector: "Industrial",
    year: 2024,
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
    year: 2023,
    service: "Cybersecurity",
    location: "Cairo, Egypt",
    cover:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=80",
    scope:
      "Greenfield SOC for a federal entity. SIEM, SOAR, DLP, perimeter hardening and analyst training program.",
    outcomes:
      "98 mean alerts/day handled. 24/7 coverage. Operational in 5 months.",
  },
];
