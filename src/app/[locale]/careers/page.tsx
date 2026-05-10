import { setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section className="!pt-32">
      <Reveal>
        <Eyebrow>CAREERS</Eyebrow>
        <H1 className="mt-6 max-w-3xl">Build remarkable things — and protect them.</H1>
        <Lead className="mt-6">
          Bin Jimz is hiring engineers, project managers, supply specialists and
          security analysts who want to operate at the highest standard.
        </Lead>
        <div className="mt-10">
          <Link href="/contact">
            <Button>Send us your CV</Button>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
