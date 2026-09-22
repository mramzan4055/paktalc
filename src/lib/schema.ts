/** JSON-LD builders. Only verified facts; see SCHEMA-PLAN.md. */
import { company, site } from "@content/company";
import { absolute } from "./seo";
import { getSlot, getVariant, largest } from "./images";

export const ORG_ID = `${site.url}/#organization`;
export const SKZ_ID = "https://skzminingcompany.com/#organization";
export const WEBSITE_ID = `${site.url}/#website`;

type Json = Record<string, unknown>;

export function organization(): Json {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.alternateName,
    url: `${site.url}/`,
    description: company.shortDescription,
    slogan: site.tagline,
    logo: {
      "@type": "ImageObject",
      url: absolute("/images/brand/paktalc-logo-horizontal-01.png"),
      width: 4213,
      height: 905,
    },
    email: company.email,
    telephone: company.phone.display.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: company.headOffice.locality,
      addressCountry: company.headOffice.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: company.email,
      telephone: company.phone.display.replace(/\s/g, ""),
      availableLanguage: ["en", "ur"],
      url: absolute("/contacts/"),
    },
    parentOrganization: { "@id": SKZ_ID },
    knowsAbout: ["Talc", "Soapstone", "Talc lumps", "Talc powder", "Talc mining", "Talc processing"],
  };
}

export function skzOrganization(): Json {
  return { "@type": "Organization", "@id": SKZ_ID, name: company.parent.name, url: company.parent.url };
}

export function website(): Json {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: `${site.url}/`, name: site.name, publisher: { "@id": ORG_ID }, inLanguage: "en" };
}

export type Crumb = { name: string; path: string };

export function breadcrumb(path: string, crumbs: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absolute(c.path) })),
  };
}

export function slotImageUrl(slotId: string) {
  const slot = getSlot(slotId);
  return absolute(largest(getVariant(slot).v.webp));
}

export function webPage(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  imageSlot?: string;
  hasBreadcrumb?: boolean;
}): Json {
  const url = absolute(opts.path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
    ...(opts.imageSlot ? { primaryImageOfPage: { "@type": "ImageObject", url: slotImageUrl(opts.imageSlot) } } : {}),
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function product(opts: { path: string; name: string; description: string; imageSlots: string[]; category: string; properties: { name: string; value: string }[] }): Json {
  return {
    "@type": "Product",
    "@id": `${absolute(opts.path)}#product`,
    name: opts.name,
    description: opts.description,
    image: opts.imageSlots.map(slotImageUrl),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": SKZ_ID },
    category: opts.category,
    material: "Talc (hydrated magnesium silicate)",
    additionalProperty: opts.properties.map((p) => ({ "@type": "PropertyValue", name: p.name, value: p.value })),
  };
}

export function article(opts: { path: string; headline: string; description: string; imageSlot: string; datePublished: string; dateModified: string; author: string }): Json {
  const url = absolute(opts.path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    image: [slotImageUrl(opts.imageSlot)],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Organization", name: opts.author, url: absolute("/about/"), parentOrganization: { "@id": ORG_ID } },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    inLanguage: "en",
  };
}

/** Wraps nodes with the site-wide Organization/WebSite graph. */
export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": [organization(), skzOrganization(), website(), ...nodes] };
}
