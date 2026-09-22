/** Insights articles. Structured content (no MDX dependency). Author = team until a named reviewer is confirmed (VERIFY E3). */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "figure"; slot: string; variant?: string }
  | { type: "callout"; text: string; href?: string; label?: string };

export type Section = { heading: string; blocks: Block[] };

export type Article = {
  slug: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  heroSlot: string;
  heroVariant?: string;
  author: string;
  answer: string; // answer-first summary shown at the top
  sections: Section[];
  related: { label: string; href: string }[];
};

const TEAM = "PakTalc Technical Team";

export const articles: Article[] = [
  {
    slug: "talc-lumps-vs-talc-powder",
    category: "Buyer's guide",
    title: "Talc lumps vs talc powder: which should you buy?",
    description:
      "How talc lumps and talc powder differ, who buys each, and what to put in your specification for either form.",
    excerpt: "Lumps suit buyers who grind in-house; powder suits buyers who need a ready mesh grade. Here's how to choose.",
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    heroSlot: "talc-lumps-alt-4",
    author: TEAM,
    answer:
      "Talc lumps are hand-sorted raw talc supplied un-ground, for buyers who run their own mills. Talc powder is those lumps crushed, ground and classified to a mesh size, ready to use. Buy lumps if you control grinding and want to choose the ore. Buy powder if you need a consistent particle size delivered.",
    sections: [
      {
        heading: "What you actually receive",
        blocks: [
          { type: "p", text: "Talc lumps are pieces of talc broken at the mine and sorted by hand into colour grades — white, grey, green and coffee — and size classes. They arrive in jumbo bags and look like the material at the mine yard: flaky, soft plates you can scratch with a fingernail." },
          { type: "p", text: "Talc powder starts as the same lumps. In the Peshawar meshing plants they are crushed and screened, then ground in hammer or Raymond mills and classified by air. The result is a fine powder with a stated fineness, such as \"above 325 mesh\" or \"above 400 mesh\", packed in 25 kg bags or jumbo bags." },
          { type: "figure", slot: "talc-powder-bags-stacked" },
        ],
      },
      {
        heading: "Who buys lumps",
        blocks: [
          { type: "list", items: [
            "Grinders and micronizers who sell their own powder grades",
            "Manufacturers with in-house milling who want to control particle size themselves",
            "Buyers who want to choose the ore — for example a specific colour grade or source",
            "Buyers for whom freight cost per tonne matters: lumps are denser in bulk than fine powder",
          ] },
          { type: "p", text: "Lump yield depends on the deposit. Company records give Parachinar talc about 95 % lumps and Haripur talc about 50 % lumps. Afghan talc comes out at roughly 50 % big lumps (over 20 mm), 20 % small lumps (over 5 mm) and 30 % fines. Your supplier's source therefore affects how much lump material is available." },
        ],
      },
      {
        heading: "Who buys powder",
        blocks: [
          { type: "list", items: [
            "Plastics compounders, paint and coatings makers, paper mills, ceramics and rubber manufacturers without their own grinding",
            "Buyers who need a documented particle size and whiteness on each lot",
            "Buyers who want smaller, easier-to-handle 25 kg bags",
          ] },
        ],
      },
      {
        heading: "Side-by-side",
        blocks: [
          { type: "table", head: ["", "Talc lumps", "Talc powder"], rows: [
            ["Form", "Hand-sorted pieces, graded by colour and size", "Ground and classified to a mesh / micron target"],
            ["Typical packing", "Jumbo (ton) bags", "25 kg bags or jumbo bags"],
            ["Specify by", "Colour grade, lump size, source", "Mesh or D50, whiteness, sieve residue, chemistry"],
            ["Quality evidence", "Visual grading, sample lumps", "Lab analysis of powder samples"],
            ["Best for", "In-house grinders, resellers", "Direct use in production"],
          ] },
        ],
      },
      {
        heading: "What to put in your enquiry",
        blocks: [
          { type: "list", ordered: true, items: [
            "Form (lumps or powder) and the end use",
            "For lumps: colour grade and size range. For powder: mesh or D50 target, and any whiteness, LOI or SiO₂/MgO limits",
            "Quantity per shipment and how often",
            "Packing (25 kg or jumbo bags) and destination port",
            "Whether you need a pre-shipment sample or lot analysis",
          ] },
          { type: "callout", text: "Send your specification and we will propose a grade and packing.", href: "/contacts/#rfq", label: "Request a quote" },
        ],
      },
    ],
    related: [
      { label: "Talc lumps", href: "/talc/lumps/" },
      { label: "Talc powder", href: "/talc/powder/" },
      { label: "Quality control", href: "/quality-control/" },
    ],
  },
  {
    slug: "talc-mesh-and-particle-size",
    category: "Technical",
    title: "Talc mesh sizes and particle size, explained",
    description:
      "What \"325 mesh\" and \"400 mesh\" mean for talc powder, how mesh relates to microns and D50, and how to specify fineness.",
    excerpt: "Mesh, microns, D50 and sieve residue — the numbers on a talc spec sheet and what they tell you.",
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    heroSlot: "micronizing-1",
    author: TEAM,
    answer:
      "Mesh is the number of sieve openings per inch, so a higher mesh means a finer powder: 325 mesh passes particles below about 45 µm and 400 mesh below about 38 µm. Laser analysers report particle size as D50 (the median) and D97 (the top cut) in microns. For precise work, specify microns. Sieve residue tells you how much coarse grit remains.",
    sections: [
      {
        heading: "Mesh in one paragraph",
        blocks: [
          { type: "p", text: "A mesh number counts the openings per linear inch of a test sieve. A 325-mesh sieve has openings of about 45 µm, so \"325 mesh talc\" means most of the powder passes that sieve. Each step up in mesh is a smaller opening and a finer powder." },
          { type: "table", caption: "Approximate sieve openings (ASTM E11 series)", head: ["Mesh", "Opening (µm)"], rows: [
            ["200", "75"], ["230", "63"], ["270", "53"], ["325", "45"], ["400", "38"], ["500", "25"], ["635", "20"],
          ] },
          { type: "p", text: "Sieves stop being practical at around 500–635 mesh. Finer talc grades are described by laser particle-size results instead. Plant capacities quoted in mesh beyond that — company records give 250 to 2,500 mesh for SKZ's Peshawar plants — should be read as equivalent fineness, and confirmed with a D50/D97 figure on the order." },
        ],
      },
      {
        heading: "D50, D97 and why the median is not enough",
        blocks: [
          { type: "p", text: "Laser diffraction analysers such as the Bettersizer ST used by SKZ Laboratory Peshawar measure the whole particle-size distribution. D50 is the size at which half the particles, by volume, are smaller. D97 (or D98) is the size below which nearly all particles fall. It is the \"top cut\", and it matters for grit in films and coatings." },
          { type: "p", text: "Two powders can share a D50 and still behave differently if one has a long coarse tail. Ask for both numbers when fineness is critical." },
        ],
      },
      {
        heading: "Sieve residue",
        blocks: [
          { type: "p", text: "Sieve residue is the small share of material retained on the test sieve. The two SKZ lab reports on this site both show 0.03 for above-325 and above-400 mesh samples. For coatings, films and thin-walled plastics, low residue means fewer visible specks." },
        ],
      },
      {
        heading: "Choosing a fineness",
        blocks: [
          { type: "list", items: [
            "Ceramics and rubber: often coarser grades, around 200–325 mesh",
            "Paints and paper: commonly 325 mesh and finer",
            "Plastics reinforcement: fine to micronized grades, specified by D50",
            "Cosmetic and pharmaceutical users: micronized grades, qualified by the buyer's own testing",
          ] },
          { type: "p", text: "These are common starting points, not rules. Your formulation and process decide. Send your current specification or a sample of the talc you use today, and it can be matched against what the plants produce." },
          { type: "callout", text: "See the lab reports and test methods on our quality page.", href: "/quality-control/", label: "Quality control" },
        ],
      },
    ],
    related: [
      { label: "Talc powder", href: "/talc/powder/" },
      { label: "Processing", href: "/processing/" },
      { label: "Quality control", href: "/quality-control/" },
    ],
  },
  {
    slug: "how-talc-is-processed",
    category: "Process",
    title: "How talc is processed, from the mine to the bag",
    description:
      "A photo walk-through of talc processing at SKZ: sorting, crushing, Raymond and hammer mill grinding, classification, testing and packing.",
    excerpt: "A step-by-step look at how a talc lump becomes a bag of mesh powder, with photos from the plants.",
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    heroSlot: "grinding-1",
    author: TEAM,
    answer:
      "Talc is hand-sorted at the mine, stocked by grade in Peshawar, crushed and screened, then ground in hammer or Raymond mills. Air classifiers cut the powder to the target fineness, a laboratory tests it, and it is packed in 25 kg bags or jumbo bags for storage and export.",
    sections: [
      {
        heading: "1. Sorting before processing",
        blocks: [
          { type: "p", text: "Processing quality starts before the mill. At the mine yard, workers pick through broken talc by hand. They remove foreign rock and separate lumps by colour, so the plant receives material that is already graded." },
          { type: "figure", slot: "sorting-1" },
        ],
      },
      {
        heading: "2. Crushing and screening",
        blocks: [
          { type: "p", text: "At the plant, crushers reduce the lumps and conveyor stackers build stockpiles of crushed talc at an even feed size. An even feed keeps the mills running steadily." },
          { type: "figure", slot: "crushing-1" },
        ],
      },
      {
        heading: "3. Grinding",
        blocks: [
          { type: "p", text: "SKZ's two meshing plants in Hayatabad Industrial Zone, Peshawar, run hammer mill and Raymond mill lines. In a Raymond mill, rollers grind the talc against a ring. An air stream carries the fines up to a classifier, and the oversize falls back for regrinding." },
          { type: "figure", slot: "grinding-3" },
        ],
      },
      {
        heading: "4. Classification and dust collection",
        blocks: [
          { type: "p", text: "Classifiers cut the powder to the order's fineness. For finer grades, a separate micronizing classifier is used. Cyclones and dust collectors recover the product from the air stream and limit airborne dust in the shed." },
          { type: "figure", slot: "grinding-4" },
        ],
      },
      {
        heading: "5. Testing",
        blocks: [
          { type: "p", text: "Samples go to SKZ Laboratory Peshawar. There, particle size, whiteness, sieve residue, bulk density, loss on ignition, silica and magnesia are measured." },
          { type: "figure", slot: "lab-3" },
        ],
      },
      {
        heading: "6. Packing and dispatch",
        blocks: [
          { type: "p", text: "Powder is filled into printed 25 kg bags or jumbo bags under dust collection, then stacked and stored. Export orders move to the Karachi warehouse for packing and container loading." },
          { type: "figure", slot: "packaging-1" },
          { type: "callout", text: "The full processing chain, step by step.", href: "/processing/", label: "Processing" },
        ],
      },
    ],
    related: [
      { label: "Processing", href: "/processing/" },
      { label: "Mining operations", href: "/mining-operations/" },
      { label: "Facilities", href: "/facilities/" },
    ],
  },
  {
    slug: "talc-in-industry",
    category: "Applications",
    title: "Why talc matters in industry",
    description:
      "The properties that make talc useful in plastics, paint, paper, ceramics, rubber, cosmetics and pharmaceuticals, and what each industry checks.",
    excerpt: "Softness, platy structure and chemical inertness: why so many industries specify talc.",
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    heroSlot: "talc-lumps-main",
    author: TEAM,
    answer:
      "Industry uses talc because it is very soft, splits into thin plates, repels water and is chemically inert. Those plates stiffen plastics, give paint a tight film and good matting, collect pitch in paper making and help ceramics fire evenly. Different industries check different numbers: particle size, whiteness, chemistry or regulatory purity.",
    sections: [
      {
        heading: "Four properties do most of the work",
        blocks: [
          { type: "list", items: [
            "Softness (Mohs 1): easy to grind and gentle on process equipment",
            "Platy (lamellar) particles: reinforce polymers, form barrier films and give slip",
            "Hydrophobic, organophilic surface: disperses well in oils, resins and polymers, and attracts pitch in paper making",
            "Chemical inertness: stable in most formulations",
          ] },
        ],
      },
      {
        heading: "Industry by industry",
        blocks: [
          { type: "table", head: ["Industry", "What talc does", "What buyers check"], rows: [
            ["Plastics", "Stiffness, heat resistance, lower shrinkage, nucleation in PP", "D50 / top cut, whiteness"],
            ["Paints & coatings", "Extender, matting, sag resistance, barrier", "Whiteness, oil absorption, grit"],
            ["Paper", "Pitch control, filler, coating pigment", "Whiteness, particle size"],
            ["Ceramics", "Flux, thermal-shock resistance", "MgO/SiO₂, iron, LOI"],
            ["Rubber", "Processing aid, anti-tack dusting", "Particle size, grit"],
            ["Cosmetics", "Slip, oil absorption", "Regulatory purity testing (buyer)"],
            ["Pharmaceuticals", "Glidant, lubricant", "Pharmacopoeia conformity (buyer)"],
          ] },
        ],
      },
      {
        heading: "A note on regulated uses",
        blocks: [
          { type: "p", text: "Cosmetic and pharmaceutical talc must meet the rules of the market where it is sold, including mineralogical purity testing. PakTalc does not claim that compliance on this website. Buyers in these sectors qualify material through their own accredited laboratories, using samples and the lot documentation we provide." },
          { type: "callout", text: "Read more about each application.", href: "/applications/", label: "Applications" },
        ],
      },
    ],
    related: [
      { label: "Applications", href: "/applications/" },
      { label: "Talc overview", href: "/talc/" },
      { label: "Talc powder", href: "/talc/powder/" },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
