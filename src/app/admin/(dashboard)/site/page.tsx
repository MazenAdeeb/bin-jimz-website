import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { getSiteContent, setSiteContent, type SiteContent } from "@/lib/site-content";

async function update(fd: FormData) {
  "use server";
  const get = (k: string) => String(fd.get(k) ?? "");
  const num = (k: string) => Number(fd.get(k) ?? 0);

  const content: SiteContent = {
    brand: {
      name: get("brand.name"),
      tagline: get("brand.tagline"),
    },
    hero: {
      eyebrow: { en: get("hero.eyebrow.en"), ar: get("hero.eyebrow.ar") },
      title1: { en: get("hero.title1.en"), ar: get("hero.title1.ar") },
      title2: { en: get("hero.title2.en"), ar: get("hero.title2.ar") },
      intro: { en: get("hero.intro.en"), ar: get("hero.intro.ar") },
      cta: { en: get("hero.cta.en"), ar: get("hero.cta.ar") },
      secondaryCta: {
        en: get("hero.secondaryCta.en"),
        ar: get("hero.secondaryCta.ar"),
      },
    },
    stats: [0, 1, 2, 3].map((i) => ({
      value: num(`stats.${i}.value`),
      suffix: get(`stats.${i}.suffix`),
      title: { en: get(`stats.${i}.title.en`), ar: get(`stats.${i}.title.ar`) },
      desc: { en: get(`stats.${i}.desc.en`), ar: get(`stats.${i}.desc.ar`) },
    })),
    services: {
      eyebrow: { en: get("services.eyebrow.en"), ar: get("services.eyebrow.ar") },
      title: { en: get("services.title.en"), ar: get("services.title.ar") },
      intro: { en: get("services.intro.en"), ar: get("services.intro.ar") },
    },
    projects: {
      eyebrow: { en: get("projects.eyebrow.en"), ar: get("projects.eyebrow.ar") },
      title: { en: get("projects.title.en"), ar: get("projects.title.ar") },
    },
    process: {
      eyebrow: { en: get("process.eyebrow.en"), ar: get("process.eyebrow.ar") },
      title: { en: get("process.title.en"), ar: get("process.title.ar") },
      intro: { en: get("process.intro.en"), ar: get("process.intro.ar") },
      ctaLabel: {
        en: get("process.ctaLabel.en"),
        ar: get("process.ctaLabel.ar"),
      },
      steps: [0, 1, 2, 3].map((i) => ({
        title: {
          en: get(`process.steps.${i}.title.en`),
          ar: get(`process.steps.${i}.title.ar`),
        },
        desc: {
          en: get(`process.steps.${i}.desc.en`),
          ar: get(`process.steps.${i}.desc.ar`),
        },
      })),
    },
    essence: {
      eyebrow: { en: get("essence.eyebrow.en"), ar: get("essence.eyebrow.ar") },
      title: { en: get("essence.title.en"), ar: get("essence.title.ar") },
    },
    cta: {
      title: { en: get("cta.title.en"), ar: get("cta.title.ar") },
      copy: { en: get("cta.copy.en"), ar: get("cta.copy.ar") },
      button: { en: get("cta.button.en"), ar: get("cta.button.ar") },
    },
    contact: {
      email: get("contact.email"),
      phone: get("contact.phone"),
      whatsapp: get("contact.whatsapp"),
      address: { en: get("contact.address.en"), ar: get("contact.address.ar") },
    },
  };

  await setSiteContent(content);
  revalidatePath("/en");
  revalidatePath("/ar");
  redirect("/admin/site?ok=1");
}

export default async function SiteContentPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const c = await getSiteContent();
  const { ok } = await searchParams;

  return (
    <>
      <AdminPageHeader
        title="Site content"
        subtitle="All text shown on the public homepage. Editable in English and Arabic."
      />

      {ok && (
        <div
          className="mt-6 rounded-md border px-4 py-3 text-sm"
          style={{
            borderColor: "rgba(120,200,140,0.4)",
            background: "rgba(120,200,140,0.07)",
            color: "#aaeebb",
          }}
        >
          Saved. The home page will reflect changes within seconds.
        </div>
      )}

      <form action={update} className="mt-8 space-y-12">
        <SectionGroup title="Brand">
          <Bilingual single>
            <Field name="brand.name" label="Brand name" defaultValue={c.brand.name} />
            <Field name="brand.tagline" label="Brand tagline" defaultValue={c.brand.tagline} />
          </Bilingual>
        </SectionGroup>

        <SectionGroup title="Hero section (homepage banner)">
          <Pair label="Eyebrow / overline" en={c.hero.eyebrow.en} ar={c.hero.eyebrow.ar} prefix="hero.eyebrow" />
          <Pair label="Big title — line 1" en={c.hero.title1.en} ar={c.hero.title1.ar} prefix="hero.title1" />
          <Pair label="Big title — line 2 (gold)" en={c.hero.title2.en} ar={c.hero.title2.ar} prefix="hero.title2" />
          <Pair
            label="Intro paragraph"
            en={c.hero.intro.en}
            ar={c.hero.intro.ar}
            prefix="hero.intro"
            textarea
          />
          <Pair label="Primary button" en={c.hero.cta.en} ar={c.hero.cta.ar} prefix="hero.cta" />
          <Pair
            label="Secondary button"
            en={c.hero.secondaryCta.en}
            ar={c.hero.secondaryCta.ar}
            prefix="hero.secondaryCta"
          />
        </SectionGroup>

        <SectionGroup title="Stats (4 numbers below the hero)">
          {c.stats.map((s, i) => (
            <div
              key={i}
              className="rounded-md border p-5"
              style={{ borderColor: "rgba(200,169,106,0.18)" }}
            >
              <p
                className="font-display text-[10px] tracking-[0.22em] uppercase"
                style={{ color: "var(--color-gold)" }}
              >
                Stat #{i + 1}
              </p>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <Field
                  name={`stats.${i}.value`}
                  label="Number value"
                  type="number"
                  step="0.1"
                  defaultValue={String(s.value)}
                />
                <Field
                  name={`stats.${i}.suffix`}
                  label="Suffix (e.g. + or %)"
                  defaultValue={s.suffix}
                />
              </div>
              <Pair label="Title" en={s.title.en} ar={s.title.ar} prefix={`stats.${i}.title`} />
              <Pair
                label="Description"
                en={s.desc.en}
                ar={s.desc.ar}
                prefix={`stats.${i}.desc`}
                textarea
              />
            </div>
          ))}
        </SectionGroup>

        <SectionGroup title="Services section">
          <Pair label="Eyebrow" en={c.services.eyebrow.en} ar={c.services.eyebrow.ar} prefix="services.eyebrow" />
          <Pair label="Title" en={c.services.title.en} ar={c.services.title.ar} prefix="services.title" />
          <Pair
            label="Intro"
            en={c.services.intro.en}
            ar={c.services.intro.ar}
            prefix="services.intro"
            textarea
          />
        </SectionGroup>

        <SectionGroup title="Projects section">
          <Pair label="Eyebrow" en={c.projects.eyebrow.en} ar={c.projects.eyebrow.ar} prefix="projects.eyebrow" />
          <Pair label="Title" en={c.projects.title.en} ar={c.projects.title.ar} prefix="projects.title" />
        </SectionGroup>

        <SectionGroup title="Process section (homepage + project pages)">
          <Pair label="Eyebrow" en={c.process.eyebrow.en} ar={c.process.eyebrow.ar} prefix="process.eyebrow" />
          <Pair label="Title" en={c.process.title.en} ar={c.process.title.ar} prefix="process.title" />
          <Pair
            label="Intro"
            en={c.process.intro.en}
            ar={c.process.intro.ar}
            prefix="process.intro"
            textarea
          />
          <Pair
            label="Landing-page button label (scrolls to this section)"
            en={c.process.ctaLabel.en}
            ar={c.process.ctaLabel.ar}
            prefix="process.ctaLabel"
          />
          {c.process.steps.map((s, i) => (
            <div
              key={i}
              className="rounded-md border p-5"
              style={{ borderColor: "rgba(200,169,106,0.18)" }}
            >
              <p
                className="font-display text-[10px] tracking-[0.22em] uppercase"
                style={{ color: "var(--color-gold)" }}
              >
                Step #{i + 1}
              </p>
              <Pair label="Title" en={s.title.en} ar={s.title.ar} prefix={`process.steps.${i}.title`} />
              <Pair
                label="Description"
                en={s.desc.en}
                ar={s.desc.ar}
                prefix={`process.steps.${i}.desc`}
                textarea
              />
            </div>
          ))}
        </SectionGroup>

        <SectionGroup title="Essence section">
          <Pair label="Eyebrow" en={c.essence.eyebrow.en} ar={c.essence.eyebrow.ar} prefix="essence.eyebrow" />
          <Pair label="Title" en={c.essence.title.en} ar={c.essence.title.ar} prefix="essence.title" />
        </SectionGroup>

        <SectionGroup title="Bottom CTA section">
          <Pair label="Title" en={c.cta.title.en} ar={c.cta.title.ar} prefix="cta.title" />
          <Pair
            label="Copy"
            en={c.cta.copy.en}
            ar={c.cta.copy.ar}
            prefix="cta.copy"
            textarea
          />
          <Pair label="Button label" en={c.cta.button.en} ar={c.cta.button.ar} prefix="cta.button" />
        </SectionGroup>

        <SectionGroup title="Contact info (footer & contact page)">
          <Bilingual single>
            <Field name="contact.email" label="Email" defaultValue={c.contact.email} />
            <Field name="contact.phone" label="Phone" defaultValue={c.contact.phone} />
            <Field
              name="contact.whatsapp"
              label="WhatsApp number (local format, e.g. 01113660749)"
              defaultValue={c.contact.whatsapp}
            />
          </Bilingual>
          <Pair
            label="Address"
            en={c.contact.address.en}
            ar={c.contact.address.ar}
            prefix="contact.address"
          />
        </SectionGroup>

        <div className="sticky bottom-0 -mx-2 flex justify-end border-t bg-[var(--color-base)] px-2 py-4"
             style={{ borderColor: "rgba(200,169,106,0.2)" }}>
          <button
            type="submit"
            className="font-display rounded px-7 py-3 text-[11px] tracking-[0.22em] uppercase text-[var(--color-base)]"
            style={{ background: "var(--color-gold)" }}
          >
            Save site content
          </button>
        </div>
      </form>
    </>
  );
}

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-md border p-6"
      style={{ borderColor: "rgba(200,169,106,0.18)" }}
    >
      <h2
        className="font-display text-[12px] tracking-[0.32em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function Bilingual({
  single,
  children,
}: {
  single?: boolean;
  children: React.ReactNode;
}) {
  return <div className={single ? "grid gap-4 md:grid-cols-2" : ""}>{children}</div>;
}

function Pair({
  label,
  en,
  ar,
  prefix,
  textarea,
}: {
  label: string;
  en: string;
  ar: string;
  prefix: string;
  textarea?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {textarea ? (
        <Textarea name={`${prefix}.en`} label={`${label} (EN)`} defaultValue={en} />
      ) : (
        <Field name={`${prefix}.en`} label={`${label} (EN)`} defaultValue={en} />
      )}
      {textarea ? (
        <Textarea
          name={`${prefix}.ar`}
          label={`${label} (AR)`}
          defaultValue={ar}
          dir="rtl"
        />
      ) : (
        <Field name={`${prefix}.ar`} label={`${label} (AR)`} defaultValue={ar} dir="rtl" />
      )}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  dir,
  step,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  dir?: "ltr" | "rtl";
  step?: string;
}) {
  return (
    <label className="block">
      <span
        className="font-display text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        step={step}
        defaultValue={defaultValue}
        dir={dir}
        className="mt-2 w-full border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  defaultValue,
  dir,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span
        className="font-display text-[10px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <textarea
        name={name}
        rows={3}
        defaultValue={defaultValue}
        dir={dir}
        className="mt-2 w-full resize-y border-b bg-transparent px-0 py-2 text-sm outline-none transition-colors focus:border-[var(--color-gold)]"
        style={{ borderColor: "rgba(200,169,106,0.3)" }}
      />
    </label>
  );
}
