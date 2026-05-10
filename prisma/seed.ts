import { PrismaClient, ServicePillar, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@binjimz.com";
  const adminPass = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe!2026";
  const passwordHash = await bcrypt.hash(adminPass, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "superadmin" },
    create: {
      email: adminEmail,
      name: "Bin Jimz Admin",
      role: "superadmin",
      passwordHash,
    },
  });
  console.log(`✓ admin user: ${admin.email}`);

  const services = [
    {
      pillar: ServicePillar.engineering,
      slug: "engineering",
      iconKey: "Building2",
      en: { title: "Engineering & Architectural Consulting", tagline: "Concepts into actionable blueprints.", description: "Architectural engineering and interior/exterior design with comprehensive planning and spatial solutions." },
      ar: { title: "الاستشارات الهندسية والمعمارية", tagline: "نحوّل الرؤى إلى مخططات قابلة للتنفيذ.", description: "هندسة معمارية وتصميم داخلي وخارجي مع تخطيط شامل وحلول مكانية." },
    },
    {
      pillar: ServicePillar.supplies,
      slug: "supplies",
      iconKey: "Package",
      en: { title: "General Supplies & Sourcing", tagline: "The right materials. On time. Every time.", description: "Procurement of premium construction materials, architectural finishes and specialized equipment." },
      ar: { title: "التوريدات العامة والمصادر", tagline: "المواد الصحيحة في وقتها.", description: "توريد مواد إنشائية متميّزة وتشطيبات ومعدّات." },
    },
    {
      pillar: ServicePillar.contracting,
      slug: "contracting",
      iconKey: "HardHat",
      en: { title: "Premium Contracting & Execution", tagline: "Vision into physical reality.", description: "Construction management and execution with focus on speed and structural integrity." },
      ar: { title: "المقاولات والتنفيذ المتميّز", tagline: "نحوّل الرؤية إلى واقع.", description: "إدارة وتنفيذ مشاريع البناء بتركيز على السرعة والسلامة." },
    },
    {
      pillar: ServicePillar.cybersecurity,
      slug: "cybersecurity",
      iconKey: "Shield",
      en: { title: "Advanced Cybersecurity Solutions", tagline: "Protecting your digital infrastructure.", description: "Securing your digital assets with the same precision as our engineering projects." },
      ar: { title: "حلول الأمن السيبراني المتقدمة", tagline: "نحمي بنيتك الرقمية.", description: "نُؤمّن أصولك الرقمية بنفس الدقة." },
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { pillar: s.pillar },
      update: {},
      create: {
        pillar: s.pillar,
        slug: s.slug,
        iconKey: s.iconKey,
        translations: {
          create: [
            { locale: "en", title: s.en.title, tagline: s.en.tagline, description: s.en.description, capabilities: [], process: [] },
            { locale: "ar", title: s.ar.title, tagline: s.ar.tagline, description: s.ar.description, capabilities: [], process: [] },
          ],
        },
      },
    });
  }
  console.log("✓ services seeded");

  const projects = [
    { slug: "national-pavilion-cairo", year: 2025, sector: "Government", featured: true,
      en: { title: "National Pavilion · Mega Event", summary: "Turnkey delivery of a national pavilion in 90 days.", scope: "Architectural execution, fit-out and AV.", outcomes: "Delivered 12 days ahead of schedule. 100% safety." },
      ar: { title: "الجناح الوطني · فعالية كبرى", summary: "تسليم جاهز لجناح وطني في 90 يومًا.", scope: "تنفيذ معماري وتشطيبات ووسائط.", outcomes: "تسليم قبل الموعد بـ 12 يومًا." } },
    { slug: "secure-banking-network", year: 2025, sector: "Banking & Finance", featured: true,
      en: { title: "Secure Banking Network", summary: "End-to-end SOC build-out and zero-trust architecture.", scope: "SOC, IAM, monitoring.", outcomes: "MTTR down 68%. ISO 27001." },
      ar: { title: "شبكة بنكية آمنة", summary: "بناء مركز عمليات أمنية وزيرو-تراست.", scope: "SOC, IAM, مراقبة.", outcomes: "تقليص زمن الاستجابة 68٪." } },
    { slug: "luxury-retail-fitout", year: 2024, sector: "Retail", featured: true,
      en: { title: "Luxury Retail Fit-Out", summary: "Flagship luxury retail concept across 1,200 m².", scope: "Architecture and interiors.", outcomes: "Same-store sales up 38%." },
      ar: { title: "تشطيب متجر فاخر", summary: "متجر فاخر بمساحة 1200 م².", scope: "هندسة معمارية وتصميم داخلي.", outcomes: "ارتفاع المبيعات 38٪." } },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        year: p.year,
        sector: p.sector,
        featured: p.featured,
        status: ProjectStatus.published,
        translations: {
          create: [
            { locale: "en", title: p.en.title, summary: p.en.summary, scope: p.en.scope, outcomes: p.en.outcomes, tags: [] },
            { locale: "ar", title: p.ar.title, summary: p.ar.summary, scope: p.ar.scope, outcomes: p.ar.outcomes, tags: [] },
          ],
        },
      },
    });
  }
  console.log("✓ projects seeded");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
