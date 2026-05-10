import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatDock } from "@/components/chat/chat-dock";
import { PageTransition } from "@/components/motion/page-transition";
import { HtmlAttrs } from "@/components/providers/html-attrs";
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/structured-data";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.binjimz.com";

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlAttrs locale={locale} />
      <OrganizationJsonLd url={siteUrl} />
      <WebsiteJsonLd url={siteUrl} />
      <SmoothScroll>
        <PageTransition>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
          <ChatDock />
        </PageTransition>
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
