import type { Metadata } from "next";
import { seo } from "@content/seo";
import { site } from "@content/company";
import { getOg, ogFallbackFromSlot } from "./images";

export const absolute = (path: string) => new URL(path, site.url).toString();

type Override = { title?: string; description?: string; image?: { url: string; width: number; height: number; alt: string }; type?: "website" | "article"; publishedTime?: string; modifiedTime?: string };

/** Build Next metadata for a route path from content/seo.ts (+ optional overrides for dynamic routes). */
export function pageMetadata(path: string, override: Override = {}): Metadata {
  const entry = seo[path];
  const title = override.title ?? entry?.title ?? site.name;
  const description = override.description ?? entry?.description ?? "";

  let image = override.image;
  if (!image && entry?.og) {
    const o = getOg(entry.og);
    image = { url: `/images/${o.file}`, width: o.w, height: o.h, alt: o.alt };
  }
  if (!image && entry?.ogSlot) image = ogFallbackFromSlot(entry.ogSlot);
  if (!image) {
    const o = getOg("home");
    image = { url: `/images/${o.file}`, width: o.w, height: o.h, alt: o.alt };
  }

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: entry?.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          // Large image previews in Google Images / Discover matter for a photo-led industrial site.
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
    openGraph: {
      type: override.type ?? "website",
      url: path,
      siteName: site.name,
      title,
      description,
      locale: "en_US",
      images: [image],
      ...(override.publishedTime ? { publishedTime: override.publishedTime, modifiedTime: override.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
