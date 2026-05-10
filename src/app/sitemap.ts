import { MetadataRoute } from "next";
import { allProjects } from "@/data/projects";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.binjimz.com";
const locales = ["en", "ar"] as const;
const paths = [
  "",
  "/about",
  "/services",
  "/services/engineering",
  "/services/supplies",
  "/services/contracting",
  "/services/cybersecurity",
  "/projects",
  "/industries",
  "/insights",
  "/careers",
  "/contact",
  "/chat",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.7,
      });
    }
    for (const proj of allProjects) {
      entries.push({
        url: `${base}/${locale}/projects/${proj.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
