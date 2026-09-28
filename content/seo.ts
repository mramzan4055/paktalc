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
    title: "PakTalc — Talc Manufacturer, Supplier & Exporter from Pakistan",
    description:
      "PakTalc (SKZ Mining Company Pvt. Ltd.) supplies hand-sorted talc lumps and custom-ground talc powder from Pakistan. Mining, processing, lab testing and export packing handled in-house. Request a quote.",
    og: "home",
  },
  "/talc/": {
    title: "Talc Supplier Pakistan: Properties, Grades & Product Forms | PakTalc",
    description:
      "PakTalc supplies Pakistani and Afghan talc in four colour grades (white, grey, green, coffee) as hand-sorted lumps or custom-ground powder. Learn about talc properties, origins and how to specify your grade.",
    og: "talc",
  },
  "/talc/lumps/": {
    title: "Talc Lumps Supplier & Exporter from Pakistan | PakTalc",
    description:
      "Raw talc lumps (soapstone) hand-sorted by colour grade and size from Pakistani and Afghan deposits. Jumbo-bag packing, container export. For in-house grinders and mineral resellers. Request a quote.",
    og: "talc",
  },
  "/talc/powder/": {
    title: "Talc Powder Manufacturer & Exporter from Pakistan | PakTalc",
    description:
      "Custom-ground talc powder (250–2,500 mesh) produced on hammer and Raymond mills at SKZ's Peshawar plants. Lab-tested for particle size, whiteness, LOI, SiO₂ and MgO. Packed in 25 kg or jumbo bags for export.",
    ogSlot: "talc-powder-bags-stacked",
  },
  "/mining-operations/": {
    title: "Talc Mining Operations in Pakistan & Afghanistan | PakTalc",
    description:
      "PakTalc's talc mining spans surface and underground workings in Pakistan (Haripur, Parachinar, Chitral) and Afghanistan (Khogyani, Agam, Shinwari). Geological survey, selective extraction and hand sorting at the mine.",
    og: "mining-operations",
  },
  "/processing/": {
    title: "Talc Processing: Crushing, Grinding & Micronizing in Peshawar | PakTalc",
    description:
      "SKZ's two Peshawar meshing plants crush, grind (hammer and Raymond mills) and classify talc to 250–2,500 mesh. Dust-collected, lab-tested and packed for export. Custom particle size to your specification.",
    ogSlot: "grinding-1",
  },
  "/quality-control/": {
    title: "Talc Quality Control & Lab Testing | SKZ Laboratory Peshawar | PakTalc",
    description:
      "PakTalc's five-stage QC process covers mine-face selection, hand sorting, grade segregation, and SKZ Laboratory Peshawar analysis (particle size, whiteness, LOI, SiO₂, MgO). Two published sample reports.",
    og: "quality",
  },
  "/applications/": {
    title: "Talc Applications: Plastics, Paints, Paper, Ceramics, Rubber & More | PakTalc",
    description:
      "Technical guide to talc in seven industries: plastics (stiffness, nucleation), paints (matting, barrier), paper (pitch control, filler), ceramics (flux, thermal shock), rubber, cosmetics and pharmaceuticals. Grade and fineness by application.",
    og: "talc",
  },
  "/facilities/": {
    title: "Talc Processing Facilities: Peshawar Plants & Karachi Warehouse | PakTalc",
    description:
      "SKZ operates two meshing plants (Hayatabad Industrial Zone, Peshawar), a processing and storage yard (Ring Road, Peshawar) and a packing and export warehouse (Moach Goth, Karachi) for talc production and export.",
    og: "affiliation",
  },
  "/sustainability/": {
    title: "Responsible Talc Mining & Sustainability | SKZ Mining | PakTalc",
    description:
      "SKZ Mining's sustainability initiatives: selective extraction, dust collection on mill lines, fruit-tree plantation, Japanese farming techniques, geology training for Pakistani geologists and local employment near mine sites.",
    ogSlot: "sustainability-hero",
  },
  "/about/": {
    title: "About PakTalc — Talc Division of SKZ Mining Company Pvt. Ltd.",
    description:
      "PakTalc is SKZ Mining Company Pvt. Ltd.'s talc division. One company covers mine selection, hand sorting, grinding at two Peshawar plants, SKZ Laboratory testing and container packing in Karachi for global export.",
    og: "about",
  },
  "/affiliation/": {
    title: "PakTalc & SKZ Mining Company: Company Structure & Talc Supply Chain",
    description:
      "PakTalc is the talc brand of SKZ Mining Company Pvt. Ltd. Learn how the company structure, Japanese technical partnership and mine-to-container supply chain work, from Afghan and Pakistani deposits to Karachi export.",
    og: "affiliation",
  },
  "/gallery/": {
    title: "Photo Gallery: Talc Mines, Processing Plants & Export Logistics | PakTalc",
    description:
      "Authentic photographs of PakTalc and SKZ operations: talc stockpiles, hand sorting at mine yards, underground workings, hammer and Raymond mill plants in Peshawar, SKZ Laboratory and container loading in Karachi.",
    og: "gallery",
  },
  "/insights/": {
    title: "Talc Guides & Technical Resources for Industrial Buyers | PakTalc",
    description:
      "Practical guides from PakTalc's own operations: how to choose between talc lumps and powder, understanding mesh and particle size, step-by-step processing and why talc is used in seven industries.",
    og: "talc",
  },
  "/contacts/": {
    title: "Request a Talc Quote or Sample — Contact PakTalc",
    description:
      "Send your talc specification: product form (lumps or powder), mesh or colour grade, quantity and destination port. PakTalc will reply with a proposal. Email info@paktalc.com or call +92 312 5112324.",
    og: "home",
  },
  "/contacts/thank-you/": {
    title: "Thank you — enquiry received",
    description: "Your enquiry has been sent to PakTalc.",
    noindex: true,
  },
  "/privacy/": {
    title: "Privacy Policy | PakTalc",
    description: "How PakTalc collects, uses and protects the information you send through the enquiry form or by email.",
    og: "home",
  },
  "/insights/talc-lumps-vs-talc-powder/": {
    title: "Talc Lumps vs Talc Powder: Which Should You Buy? | PakTalc",
    description:
      "Practical comparison of talc lumps and talc powder: who buys each, how they differ in specification, packing and quality evidence, and how to write your enquiry. Based on PakTalc's own operations.",
    ogSlot: "talc-lumps-alt-4",
  },
  "/insights/talc-mesh-and-particle-size/": {
    title: "Talc Mesh Sizes & Particle Size Explained (325, 400 Mesh, D50) | PakTalc",
    description:
      "What talc mesh numbers mean, how they relate to D50 and D97 in microns, how to read sieve residue and how to specify fineness for your application. Includes ASTM E11 mesh-to-micron table.",
    ogSlot: "micronizing-1",
  },
  "/insights/how-talc-is-processed/": {
    title: "How Talc Is Processed: From Mine to Bag | PakTalc",
    description:
      "Step-by-step guide to talc processing at SKZ: hand sorting, crushing, hammer and Raymond mill grinding, air classification, SKZ Laboratory testing and packing. With photos from the plants.",
    ogSlot: "grinding-1",
  },
  "/insights/talc-in-industry/": {
    title: "Why Talc Matters in Industry: Plastics, Paint, Paper & More | PakTalc",
    description:
      "How talc's softness, platy structure and chemical inertness make it useful in seven industries. Includes an industry-by-industry table of what talc does and what buyers check.",
    ogSlot: "talc-lumps-main",
  },
  "/contact/": {
    title: "Contact PakTalc — Get in Touch",
    description:
      "Have a question about a specific mineral or specimen? Send a message to PakTalc and our team will respond.",
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
