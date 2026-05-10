import { setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, H1 } from "@/components/ui/section";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section className="!pt-32 prose prose-invert max-w-3xl">
      <Eyebrow>LEGAL</Eyebrow>
      <H1 className="mt-6">Terms of Use</H1>
      <p className="mt-6" style={{ color: "var(--color-text-dim)" }}>
        These are placeholder terms — replace with your final legal copy.
      </p>
    </Section>
  );
}
