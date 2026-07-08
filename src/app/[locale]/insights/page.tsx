import { setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";

const articles = [
  {
    slug: "physical-meets-digital",
    title: {
      en: "When physical meets digital — the new operating model",
      ar: "عندما يلتقي العالم المادي بالرقمي — نموذج التشغيل الجديد",
    },
    excerpt: {
      en: "Why 71% of modern enterprises now favor a single partner for buildings and security.",
      ar: "لماذا تفضّل 71% من المؤسسات الحديثة اليوم شريكاً واحداً للمباني والأمن.",
    },
    date: { en: "May 2026", ar: "مايو 2026" },
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "speed-without-compromise",
    title: {
      en: "Speed without compromise: lessons from 300+ projects",
      ar: "السرعة دون تنازل: دروس من أكثر من 300 مشروع",
    },
    excerpt: {
      en: "Operational habits that let our teams deliver early without bending safety or quality.",
      ar: "عادات تشغيلية تتيح لفِرقنا التسليم مبكراً دون المساس بالسلامة أو الجودة.",
    },
    date: { en: "Apr 2026", ar: "أبريل 2026" },
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "zero-trust-for-mid-market",
    title: {
      en: "Zero-trust for the mid-market: a 90-day plan",
      ar: "الثقة الصفرية للشركات المتوسطة: خطة من 90 يوماً",
    },
    excerpt: {
      en: "A pragmatic blueprint to roll out modern identity-centric security in three months.",
      ar: "مخطط عملي لتطبيق أمن حديث يرتكز على الهوية خلال ثلاثة أشهر.",
    },
    date: { en: "Mar 2026", ar: "مارس 2026" },
    cover:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=80",
  },
];

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === "ar" ? "ar" : "en";

  const t = {
    eyebrow: { en: "INSIGHTS", ar: "المدوّنة" },
    h1: {
      en: "Field notes from our engineers and analysts",
      ar: "ملاحظات ميدانية من مهندسينا ومحلّلينا",
    },
    lead: {
      en: "Practical perspectives on engineering, contracting and cybersecurity.",
      ar: "رؤى عملية في الهندسة والمقاولات والأمن السيبراني.",
    },
  };

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>{t.eyebrow[lang]}</Eyebrow>
          <H1 className="mt-6 max-w-3xl">{t.h1[lang]}</H1>
          <Lead className="mt-6">{t.lead[lang]}</Lead>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Reveal key={a.slug}>
              <Link href={`/insights/${a.slug}`}>
                <article
                  className="group overflow-hidden rounded-md border"
                  style={{ borderColor: "rgba(200,169,106,0.18)" }}
                >
                  <div
                    className="aspect-[16/10] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${a.cover})` }}
                  />
                  <div className="p-6">
                    <p
                      className="font-display text-[10px] tracking-[0.32em] uppercase"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {a.date[lang]}
                    </p>
                    <h3 className="font-display mt-3 text-xl">{a.title[lang]}</h3>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "var(--color-text-dim)" }}
                    >
                      {a.excerpt[lang]}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
