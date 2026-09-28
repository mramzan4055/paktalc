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
    title: "PakTalc | Talc Supplier and Exporter in Pakistan",
    description: "PakTalc, the talc division of SKZ Mining Company, supplies hand-sorted talc lumps and ground talc powder. Processing is in Peshawar and export packing is in Karachi. Request a quote.",
    og: "home",
  },
  "/talc/": {
    title: "Talc Grades, Properties and Origins | PakTalc",
    description: "Read what talc is, where PakTalc sources it in Pakistan and Afghanistan, and how the four colour grades differ from lumps to powder.",
    og: "talc",
  },
  "/talc/lumps/": {
    title: "Talc Lumps Supplier in Pakistan | PakTalc",
    description: "Explore hand-sorted talc lumps by colour and size. See sourcing, packing and quality information for industrial buyers who grind talc in-house.",
    og: "talc",
  },
  "/talc/powder/": {
    title: "Talc Powder Supplier in Pakistan | PakTalc",
    description: "Order ground talc powder milled in Peshawar to an agreed mesh, checked for particle size and whiteness, and packed in 25 kg or jumbo bags.",
    ogSlot: "talc-powder-bags-stacked",
  },
  "/mining-operations/": {
    title: "Talc Mining Operations | PakTalc",
    description: "See how talc is surveyed, extracted and sorted at the mine. Explore our photo-backed overview of operations and selected sources in Pakistan and Afghanistan.",
    og: "mining-operations",
  },
  "/processing/": {
    title: "Talc Processing & Grinding in Peshawar | PakTalc",
    description: "Follow talc from sorting and crushing to grinding, classification, laboratory checks and packing at our Peshawar facilities.",
    ogSlot: "grinding-1",
  },
  "/quality-control/": {
    title: "Talc Quality Control & Lab Testing | PakTalc",
    description: "Learn how PakTalc checks talc lots and read two published sample reports for particle size, whiteness and chemistry. Ask for an analysis with your quote.",
    og: "quality",
  },
  "/applications/": {
    title: "Talc Uses in Industry | PakTalc",
    description: "Explore how talc is used in plastics, paint, paper, ceramics, rubber, cosmetics and pharmaceuticals, and which grade details buyers should check.",
    og: "talc",
  },
  "/facilities/": {
    title: "Talc Processing Facilities | PakTalc",
    description: "Explore the Peshawar meshing plants, processing yard and Karachi packing warehouse used in PakTalc’s talc supply chain.",
    og: "affiliation",
  },
  "/sustainability/": {
    title: "Responsible Talc Operations | PakTalc",
    description: "See PakTalc’s documented site practices, including selective extraction, mill dust collection, tree planting and technical training.",
    ogSlot: "sustainability-hero",
  },
  "/about/": {
    title: "About PakTalc & SKZ Mining Company",
    description: "Meet PakTalc, the talc division of SKZ Mining Company. Learn about its team, mine selection, processing, laboratory work and export preparation.",
    og: "about",
  },
  "/affiliation/": {
    title: "PakTalc & SKZ Mining Company | Supply Chain",
    description: "Learn how PakTalc relates to SKZ Mining Company and follow its talc supply chain from selected deposits to Peshawar processing and Karachi packing.",
    og: "affiliation",
  },
  "/gallery/": {
    title: "Talc Mines & Processing Photo Gallery | PakTalc",
    description: "Browse photographs of talc sources, mine yards, processing equipment, laboratory work and export packing across PakTalc’s operations.",
    og: "gallery",
  },
  "/insights/": {
    title: "Talc Guides for Industrial Buyers | PakTalc",
    description: "Read practical guides to talc lumps, powder, mesh size, processing and industrial applications, with links to product and quality information.",
    og: "talc",
  },
  "/contacts/": {
    title: "Request a Talc Quote or Sample | PakTalc",
    description: "Tell PakTalc which talc form, colour, mesh, quantity and destination you need. Send an enquiry for a quote or sample and include your specification.",
    og: "home",
  },
  "/contacts/thank-you/": {
    title: "Thank you — enquiry received",
    description: "Your enquiry has been sent to PakTalc.",
    noindex: true,
  },
  "/privacy/": {
    title: "Privacy Policy | PakTalc",
    description: "Read how PakTalc handles contact details and enquiry information sent through this site or by email.",
    og: "home",
  },
  "/insights/talc-lumps-vs-talc-powder/": {
    title: "Talc Lumps vs Powder: Buyer Guide | PakTalc",
    description: "Compare talc lumps and powder by processing needs, specifications, packing and quality evidence, then prepare a useful enquiry for your order.",
    ogSlot: "talc-lumps-alt-4",
  },
  "/insights/talc-mesh-and-particle-size/": {
    title: "Talc Mesh Sizes & Particle Size | PakTalc",
    description: "Understand talc mesh, sieve residue, D50 and D97, and learn how to describe your particle-size requirements to a supplier.",
    ogSlot: "micronizing-1",
  },
  "/insights/how-talc-is-processed/": {
    title: "How Talc Is Processed: Mine to Bag | PakTalc",
    description: "Follow the main talc processing stages: hand sorting, crushing, grinding, classification, testing and packing, with photos from our operations.",
    ogSlot: "grinding-1",
  },
  "/insights/talc-in-industry/": {
    title: "Talc in Plastics, Paint & Paper | PakTalc",
    description: "Learn why industrial buyers use talc in plastics, paint, paper, ceramics and other products, and what grade properties to check.",
    ogSlot: "talc-lumps-main",
  },
  "/contact/": {
    title: "Contact PakTalc | General Enquiries",
    description: "Ask PakTalc about talc grades, samples, processing or an existing order. Contact our team by message, email or phone. For pricing, request a quote.",
    og: "home",
  },
  "/contact/thank-you/": {
    title: "Message received — PakTalc",
    description: "Your message has been received. Our team will reply to the email address you provided.",
    og: "home",
    noindex: true,
  },
};

/**
 * Crawler policy. OAI-SearchBot, PerplexityBot, Googlebot, Bingbot are always allowed (search/answer engines).
 * Training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot…) are a business decision — flip this flag to block them.
 */
export const allowAITraining = true;
