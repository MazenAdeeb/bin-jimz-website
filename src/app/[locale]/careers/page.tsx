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
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <Section className="!pt-32">
      <Reveal>
        <Eyebrow>{lang === "ar" ? "الوظائف" : "CAREERS"}</Eyebrow>
        <H1 className="mt-6 max-w-3xl">
          {lang === "ar"
            ? "اِبنِ أشياء استثنائية — واحمِها."
            : "Build remarkable things — and protect them."}
        </H1>
        <Lead className="mt-6">
          {lang === "ar"
            ? "توظّف بن جيمز مهندسين ومديري مشاريع وأخصائيي إمداد ومحللي أمن يطمحون إلى العمل وفق أعلى المعايير."
            : "Bin Jimz is hiring engineers, project managers, supply specialists and security analysts who want to operate at the highest standard."}
        </Lead>
        <div className="mt-10">
          <Link href="/contact">
            <Button>{lang === "ar" ? "أرسل سيرتك الذاتية" : "Send us your CV"}</Button>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
