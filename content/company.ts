/**
 * Company facts. Single source for header/footer, contact page, JSON-LD and llms.txt.
 * Anything marked VERIFY is listed in CONTENT-VERIFICATION.md.
 */

export const site = {
  url: "https://paktalc.com",
  name: "PakTalc",
  alternateName: "Pak Talc",
  locale: "en",
  tagline: "Talc Extraction, Processing, Export & Import", // wording from the official logo
} as const;

export const company = {
  brand: "PakTalc",
  legalParent: "SKZ Mining Company Pvt. Ltd.",
  /** Exact relationship wording used on the existing site. */
  relationship: "a division of SKZ Mining Company Pvt. Ltd.",
  shortDescription:
    "PakTalc is the talc division of SKZ Mining Company Pvt. Ltd. It supplies sorted talc lumps and ground talc powder, processed at SKZ facilities in Peshawar and packed for export in Karachi, Pakistan.",
  email: "info@paktalc.com",
  /** VERIFY A2 — only the number shown on both websites is published. */
  phone: { display: "+92 312 5112324", href: "tel:+923125112324" },
  /** VERIFY A1 — Islamabad per SKZ site + affiliation page; no street address published. */
  headOffice: { locality: "Islamabad", country: "Pakistan", countryCode: "PK" },
  /** VERIFY A5 — no verified social profiles yet. */
  social: [] as { label: string; href: string }[],
  parent: {
    name: "SKZ Mining Company Pvt. Ltd.",
    url: "https://skzminingcompany.com/",
    logo: "skz-logo",
  },
  /** VERIFY A10 — names as published on the current Affiliation page. */
  directors: ["Amin Ullah Baig", "Shujiro Yano"],
} as const;

/** Operational sites as described on the company's Affiliation page and diagrams. VERIFY B3–B6. */
export const sites = [
  {
    id: "peshawar-mesh",
    name: "Meshing plants",
    place: "Hayatabad Industrial Zone, Peshawar",
    region: "Khyber Pakhtunkhwa",
    role: "Two meshing (grinding) plants with hammer mill and Raymond mill lines, where talc lumps are ground into mesh powder.",
  },
  {
    id: "peshawar-store",
    name: "Processing & storage yard",
    place: "Ring Road, Peshawar",
    region: "Khyber Pakhtunkhwa",
    role: "Receiving, stockpiling and segregation of talc lumps before grinding or onward dispatch to Karachi.",
  },
  {
    id: "karachi",
    name: "Sorting & packing warehouse",
    place: "Moach Goth, Karachi",
    region: "Sindh",
    role: "Final sorting, packing and container loading for export shipments.",
  },
] as const;
