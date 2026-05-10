import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, Eyebrow, H1, Lead } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ChatPanel } from "@/components/chat/chat-panel";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("chat");

  return (
    <Section className="!pt-32">
      <Reveal>
        <Eyebrow>JIMZ · AI ASSISTANT</Eyebrow>
        <H1 className="mt-6 max-w-3xl">{t("title")}</H1>
        <Lead className="mt-6">{t("subtitle")}</Lead>
      </Reveal>

      <Reveal className="mt-12">
        <div className="mx-auto h-[70vh] max-w-3xl">
          <ChatPanel fullScreen />
        </div>
      </Reveal>
    </Section>
  );
}
