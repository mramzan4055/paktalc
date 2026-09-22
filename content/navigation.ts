export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[]; /** Extra paths that should mark this item active. */ match?: string[] };

/** Primary navigation. Home, Gallery and Contact are always top-level (discoverability). */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Talc",
    href: "/talc/",
    children: [
      { label: "Talc overview", href: "/talc/", description: "Properties, colour grades and origins" },
      { label: "Talc lumps", href: "/talc/lumps/", description: "Hand-sorted raw talc, graded by colour and size" },
      { label: "Talc powder", href: "/talc/powder/", description: "Ground and micronized mesh powder" },
    ],
  },
  {
    label: "Mining & Processing",
    href: "/mining-operations/",
    match: ["/processing/", "/facilities/"],
    children: [
      { label: "Mining operations", href: "/mining-operations/", description: "Exploration, extraction and sorting" },
      { label: "Processing", href: "/processing/", description: "Crushing, grinding, micronizing, packing" },
      { label: "Facilities", href: "/facilities/", description: "Peshawar plants and Karachi warehouse" },
    ],
  },
  { label: "Applications", href: "/applications/" },
  { label: "Quality", href: "/quality-control/" },
  {
    label: "About",
    href: "/about/",
    match: ["/affiliation/", "/sustainability/"],
    children: [
      { label: "About PakTalc", href: "/about/", description: "Who we are and how we work" },
      { label: "SKZ Mining affiliation", href: "/affiliation/", description: "Company structure and supply chain" },
      { label: "Sustainability", href: "/sustainability/", description: "Site practice, plantation and training" },
    ],
  },
  { label: "Gallery", href: "/gallery/" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact", href: "/contacts/" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Talc",
    links: [
      { label: "Talc overview", href: "/talc/" },
      { label: "Talc lumps", href: "/talc/lumps/" },
      { label: "Talc powder", href: "/talc/powder/" },
      { label: "Applications", href: "/applications/" },
      { label: "Quality control", href: "/quality-control/" },
    ],
  },
  {
    title: "Mining & Processing",
    links: [
      { label: "Mining operations", href: "/mining-operations/" },
      { label: "Processing", href: "/processing/" },
      { label: "Facilities", href: "/facilities/" },
      { label: "Sustainability", href: "/sustainability/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About PakTalc", href: "/about/" },
      { label: "SKZ Mining affiliation", href: "/affiliation/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "Insights", href: "/insights/" },
      { label: "Contact", href: "/contacts/" },
    ],
  },
];

export const rfqHref = "/contacts/#rfq";

/** Is a nav item (or one of its children / match paths) the current page? */
export function isNavActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  const paths = [item.href, ...(item.match ?? []), ...(item.children?.map((c) => c.href) ?? [])];
  return paths.some((p) => pathname === p || pathname.startsWith(p));
}
