import type { MetadataRoute } from "next";
import { seo } from "@content/seo";
import { articles } from "@content/insights";
import { site } from "@content/company";

export const dynamic = "force-static";

/** Build date for static pages; articles use their own dateModified. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const priority: Record<string, number> = {
  "/": 1,
  "/talc/": 0.9,
  "/talc/lumps/": 0.9,
  "/talc/powder/": 0.9,
  "/contacts/": 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.entries(seo)
    .filter(([, v]) => !v.noindex)
    .map(([path]) => ({
      url: `${site.url}${path}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: priority[path] ?? 0.7,
    }));
  const posts = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}/`,
    lastModified: a.dateModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
