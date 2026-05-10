import { setRequestLocale } from "next-intl/server";
import { Section, Eyebrow, H1 } from "@/components/ui/section";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section className="!pt-32 prose prose-invert max-w-3xl">
      <Eyebrow>LEGAL</Eyebrow>
      <H1 className="mt-6">Privacy Policy</H1>
      <p className="mt-6" style={{ color: "var(--color-text-dim)" }}>
        Bin Jimz Company respects your privacy. This page outlines how we collect,
        store and use information you share with us through our website, contact
        forms and AI assistant. Replace this template with your final privacy text.
      </p>
    </Section>
  );
}
