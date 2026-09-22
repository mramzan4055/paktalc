/**
 * Homepage hero slides — ONE object per slide (image + text + CTAs), so image and copy can never drift apart.
 * Images are prepared slots from images.json (desktop + art-directed mobile crop).
 *
 * Order matters for Core Web Vitals: slide 1 must have the LARGEST effective image area, otherwise a later slide
 * becomes the page's LCP when it fades in. Slides 1–2 are 16:9 (1920×1080); the 21:9 open-pit crop is last.
 */
export type HeroSlide = {
  id: string;
  label: string; // short name for dots / screen readers
  image: { slot: string; variant: string; mobileVariant: string };
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "supply",
    label: "Talc supply",
    image: { slot: "talc-hero", variant: "banner-16x9", mobileVariant: "mobile-4x5" },
    eyebrow: "PakTalc · a division of SKZ Mining Company Pvt. Ltd.",
    title: "Talc, sorted at the mine and milled to your specification.",
    description:
      "Hand-sorted talc lumps and ground talc powder for industrial buyers. Grinding is done in Peshawar, and export orders are packed in Karachi, Pakistan.",
    primary: { label: "Request a quote", href: "/contacts/#rfq" },
    secondary: { label: "Explore talc", href: "/talc/" },
  },
  {
    id: "operations",
    label: "Mining & processing",
    image: { slot: "hero-alt-slide", variant: "banner-16x9", mobileVariant: "mobile-4x5" },
    eyebrow: "Mining & processing",
    title: "From the adit to the meshing plant, handled by one company.",
    description:
      "Talc is broken out selectively in underground workings, ground on hammer and Raymond mills in Peshawar and tested at SKZ Laboratory Peshawar.",
    primary: { label: "View process", href: "/mining-operations/" },
    secondary: { label: "Ask about talc powder", href: "/contacts/?form=powder#rfq" },
  },
  {
    id: "sources",
    label: "Talc sources",
    image: { slot: "hero-main", variant: "desktop-21x9", mobileVariant: "mobile-4x5" },
    eyebrow: "Sources",
    title: "Talc from selected deposits, graded by colour and lump size.",
    description:
      "Talc is sourced from deposits in Pakistan and Afghanistan, then hand-sorted into white, grey, green and coffee grades and supplied as lumps or powder.",
    primary: { label: "Ask about talc lumps", href: "/contacts/?form=lumps#rfq" },
    secondary: { label: "Talc origins", href: "/talc/#origins" },
  },
];
