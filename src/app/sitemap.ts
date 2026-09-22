import type { MetadataRoute } from "next";
import { seo } from "@content/seo";
import { articles } from "@content/insights";
import { site } from "@content/company";
import { getSlot, getVariant, largest, slotsForPage } from "@/lib/images";

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

/** images.json page key for each route, so the sitemap can carry image entries (image SEO). */
const imagePage: Record<string, string> = {
  "/": "home",
  "/talc/": "talc",
  "/talc/lumps/": "talc",
  "/talc/powder/": "talc",
  "/mining-operations/": "mining-operations",
  "/processing/": "mining-operations",
  "/quality-control/": "quality",
  "/about/": "about",
  "/affiliation/": "affiliation",
  "/gallery/": "gallery",
};

function imagesFor(path: string): string[] {
  const page = imagePage[path];
  if (!page) return [];
  return slotsForPage(page)
    .map((id) => {
      const slot = getSlot(id);
      const url = largest(getVariant(slot).v.webp);
      return url ? `${site.url}${url}` : "";
    })
    .filter(Boolean)
    .slice(0, 40); // Google allows up to 1,000 images per URL; keep the file lean
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.entries(seo)
    .filter(([, v]) => !v.noindex)
    .map(([path]) => ({
      url: `${site.url}${path}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: priority[path] ?? 0.7,
      images: imagesFor(path),
    }));
  const posts = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}/`,
    lastModified: a.dateModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: [`${site.url}${largest(getVariant(getSlot(a.heroSlot)).v.webp)}`],
  }));
  return [...pages, ...posts];
}
