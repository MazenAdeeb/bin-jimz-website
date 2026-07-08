import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Section, Eyebrow, H1, H3 } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { allProjects } from "@/data/projects";
import { getSiteContent } from "@/lib/site-content";

export function generateStaticParams() {
  return allProjects.flatMap((p) =>
    ["en", "ar"].map((locale) => ({ locale, slug: p.slug })),
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const lang = locale === "ar" ? "ar" : "en";
  const content = await getSiteContent();

  return (
    <>
      <Section className="!pt-32 !pb-12">
        <Reveal>
          <Eyebrow>
            {project.sector} · {project.service}
          </Eyebrow>
          <H1 className="mt-6 max-w-4xl">{project.title}</H1>
          {project.location && (
            <p
              className="mt-4 text-sm tracking-[0.04em]"
              style={{ color: "var(--color-text-dim)" }}
            >
              {project.location}
            </p>
          )}
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-white/5">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Scope</Eyebrow>
            <H3 className="mt-3">What we did</H3>
          </div>
          <div className="md:col-span-8">
            <p className="text-base leading-relaxed md:text-lg"
               style={{ color: "var(--color-text-dim)" }}>
              {project.scope}
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Phases</Eyebrow>
            <H3 className="mt-3">How we delivered it</H3>
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {content.process.steps.map((s, i) => (
                <div
                  key={i}
                  className="rounded-md border p-6"
                  style={{
                    borderColor: "rgba(200, 169, 106, 0.15)",
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <span
                    className="font-display text-2xl"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display mt-3 text-base">{s.title[lang]}</h4>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--color-text-dim)" }}
                  >
                    {s.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Outcomes</Eyebrow>
            <H3 className="mt-3">The impact</H3>
          </div>
          <div className="md:col-span-8">
            <p className="text-base leading-relaxed md:text-lg"
               style={{ color: "var(--color-text-dim)" }}>
              {project.outcomes}
            </p>
          </div>
        </div>
      </Section>

      {project.gallery && project.gallery.length > 0 && (
        <Section className="border-t border-white/5">
          <Eyebrow>Gallery</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Cta
        title={content.cta.title[lang]}
        copy={content.cta.copy[lang]}
        button={content.cta.button[lang]}
        secondaryButton={content.hero.secondaryCta[lang]}
      />
    </>
  );
}
