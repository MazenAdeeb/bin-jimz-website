import type { Metadata } from "next";
import { Cinzel, Montserrat, Cairo, Reem_Kufi } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Bin Jimz · Engineering · Contracting · Cybersecurity",
    template: "%s · Bin Jimz",
  },
  description:
    "Bin Jimz bridges robust physical development with advanced digital protection — engineering, contracting and cybersecurity solutions delivered with speed, quality and precision.",
  applicationName: "Bin Jimz",
  openGraph: {
    type: "website",
    siteName: "Bin Jimz",
    title: "Bin Jimz · Building the future. Securing what matters.",
    description: "Engineering, contracting and cybersecurity under one trusted partner.",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${montserrat.variable} ${cairo.variable} ${reemKufi.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
