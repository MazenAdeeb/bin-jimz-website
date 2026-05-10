import { setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";

const articles = [
  {
    slug: "physical-meets-digital",
    title: "When physical meets digital — the new operating model",
    excerpt:
      "Why 71% of modern enterprises now favor a single partner for buildings and security.",
    date: "May 2026",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "speed-without-compromise",
    title: "Speed without compromise: lessons from 300+ projects",
    excerpt:
      "Operational habits that let our teams deliver early without bending safety or quality.",
    date: "Apr 2026",
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "zero-trust-for-mid-market",
    title: "Zero-trust for the mid-market: a 90-day plan",
    excerpt:
      "A pragmatic blueprint to roll out modern identity-centric security in three months.",
    date: "Mar 2026",
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

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>INSIGHTS</Eyebrow>
          <H1 className="mt-6 max-w-3xl">Field notes from our engineers and analysts</H1>
          <Lead className="mt-6">
            Practical perspectives on engineering, contracting and cybersecurity.
          </Lead>
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
                      {a.date}
                    </p>
                    <h3 className="font-display mt-3 text-xl">{a.title}</h3>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "var(--color-text-dim)" }}
                    >
                      {a.excerpt}
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
