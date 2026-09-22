/** Per-page metadata. Keys are route paths (trailing slash). OG keys refer to images.json → og. */

export type PageSeo = {
  title: string;
  description: string;
  og?: "home" | "talc" | "mining-operations" | "about" | "quality" | "affiliation" | "gallery";
  /** Fallback when no OG asset exists: an images.json slot rendered at its largest webp. */
  ogSlot?: string;
  noindex?: boolean;
};

export const seo: Record<string, PageSeo> = {
  "/": {
    title: "PakTalc — Talc Lumps & Talc Powder Supplier from Pakistan",
    description:
      "PakTalc, a division of SKZ Mining Company Pvt. Ltd., supplies hand-sorted talc lumps and ground talc powder, processed in Peshawar and packed for export in Karachi.",
    og: "home",
  },
  "/talc/": {
    title: "Talc (Soapstone): Properties, Colour Grades & Origins",
    description:
      "What talc is, how it is graded and where PakTalc's talc comes from: colour grades, Afghan and Pakistani sources, product forms and laboratory testing.",
    og: "talc",
  },
  "/talc/lumps/": {
    title: "Talc Lumps Supplier & Exporter — Hand-Sorted Raw Talc",
    description:
      "Talc lumps (soapstone) hand-sorted by colour and size, with typical lump yields by source, jumbo-bag packing and container loading. Request a quote from PakTalc.",
    og: "talc",
  },
  "/talc/powder/": {
    title: "Talc Powder — Ground & Micronized Talc from Peshawar",
    description:
      "Talc mesh powder ground in hammer and Raymond mills in Peshawar, classified to your fineness, lab-tested and packed in 25 kg or jumbo bags.",
    ogSlot: "talc-powder-bags-stacked",
  },
  "/mining-operations/": {
    title: "Talc Mining: Exploration, Extraction & Sorting",
    description:
      "How PakTalc talc is mined: geological survey, adits and underground chambers, selective extraction, hand sorting and transport to Peshawar.",
    og: "mining-operations",
  },
  "/processing/": {
    title: "Talc Processing: Crushing, Grinding & Micronizing",
    description:
      "The talc processing chain at SKZ's Peshawar meshing plants, from intake and crushing through hammer and Raymond mill grinding, classification, testing and packing.",
    ogSlot: "grinding-1",
  },
  "/quality-control/": {
    title: "Talc Quality Control & Laboratory Analysis",
    description:
      "How PakTalc checks talc: hand sorting, grade segregation and laboratory analysis of particle size, whiteness, LOI, SiO₂ and MgO, with published sample reports.",
    og: "quality",
  },
  "/applications/": {
    title: "Talc Applications: Plastics, Paint, Paper & Ceramics",
    description:
      "Why talc is used in plastics, paints and coatings, paper, ceramics, rubber, cosmetics and pharmaceuticals, and what buyers in each industry evaluate.",
    og: "talc",
  },
  "/facilities/": {
    title: "Talc Processing Facilities in Peshawar & Karachi",
    description:
      "SKZ's two talc meshing plants and the processing and storage yard in Peshawar, and the sorting and packing warehouse in Karachi, Pakistan.",
    og: "affiliation",
  },
  "/sustainability/": {
    title: "Sustainability & Responsible Talc Mining",
    description:
      "Site practice, dust control, fruit-tree plantation, Japanese farming techniques, geology training and local employment at SKZ Mining's talc operations.",
    ogSlot: "sustainability-hero",
  },
  "/about/": {
    title: "About PakTalc — Talc Division of SKZ Mining Company",
    description:
      "PakTalc is the talc division of SKZ Mining Company Pvt. Ltd., covering talc from mine selection to export shipment with teams in Peshawar and Karachi.",
    og: "about",
  },
  "/affiliation/": {
    title: "PakTalc and SKZ Mining: Structure & Supply Chain",
    description:
      "How PakTalc relates to SKZ Mining Company Pvt. Ltd., the company structure described in SKZ records, and the talc supply chain from mine to Karachi.",
    og: "affiliation",
  },
  "/gallery/": {
    title: "Photo Gallery — Talc Mines, Plants & Logistics",
    description:
      "Original photographs of PakTalc and SKZ talc operations: stockpiles, hand sorting, underground workings, grinding plants and container loading.",
    og: "gallery",
  },
  "/insights/": {
    title: "Talc Insights — Practical Guides for Industrial Buyers",
    description:
      "Guides on talc lumps vs powder, mesh and particle size, talc processing and industrial uses, written from PakTalc's own operations.",
    og: "talc",
  },
  "/contacts/": {
    title: "Request a Talc Quote — Contact PakTalc",
    description:
      "Send your talc specification (lumps or powder, mesh, quantity, destination) and PakTalc will reply with a proposal. Email info@paktalc.com.",
    og: "home",
  },
  "/contacts/thank-you/": {
    title: "Thank you — enquiry received",
    description: "Your enquiry has been sent to PakTalc.",
    noindex: true,
  },
  "/privacy/": {
    title: "Privacy Policy",
    description: "How PakTalc collects, uses and protects the information you send through the enquiry form or by email.",
    og: "home",
  },
};

/**
 * Crawler policy. OAI-SearchBot, PerplexityBot, Googlebot, Bingbot are always allowed (search/answer engines).
 * Training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot…) are a business decision — flip this flag to block them.
 */
export const allowAITraining = true;
