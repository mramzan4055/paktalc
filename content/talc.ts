/**
 * Talc product + mineral data.
 * General mineral science is textbook-level and uncontroversial.
 * Company-specific values come only from the SKZ lab report scans and the Affiliation page (see CONTENT-VERIFICATION.md).
 */

export const talcDefinition =
  "Talc is a hydrated magnesium silicate mineral, Mg₃Si₄O₁₀(OH)₂. It is the softest mineral on the Mohs scale, splits into thin plates, feels smooth or soapy to the touch and is chemically inert. Massive, talc-rich rock is known as soapstone or talc stone.";

export const talcProperties: { term: string; value: string; note: string }[] = [
  { term: "Chemical formula", value: "Mg₃Si₄O₁₀(OH)₂", note: "Hydrated magnesium silicate" },
  { term: "Hardness", value: "1 on the Mohs scale", note: "The reference softest mineral; easy to grind" },
  { term: "Structure", value: "Lamellar (platy)", note: "Stacked sheets that slide apart — the source of talc's slip and its reinforcing effect in polymers" },
  { term: "Surface", value: "Hydrophobic / organophilic", note: "Repels water, wets well with oils and resins" },
  { term: "Chemistry", value: "Chemically inert", note: "Stable in most formulations; does not react with common binders or polymers" },
  { term: "Theoretical composition", value: "SiO₂ ≈ 63.5 % · MgO ≈ 31.7 % · H₂O ≈ 4.8 %", note: "Pure mineral. Natural talc ores contain associated minerals, so real products are measured by lab analysis" },
];

export const talcTerms: { term: string; definition: string }[] = [
  { term: "Talc", definition: "The mineral itself, Mg₃Si₄O₁₀(OH)₂." },
  { term: "Soapstone / talc stone", definition: "Rock made up largely of talc. In trade, “soap stone” is often used for talc lumps and powder — SKZ's own bags are labelled “Soap Stone / Talc Powder”." },
  { term: "Talc lumps", definition: "Run-of-mine talc broken and hand-sorted into pieces, supplied un-ground." },
  { term: "Talc powder / mesh powder", definition: "Talc lumps ground in mills and classified to a particle-size (mesh) target." },
  { term: "Mesh", definition: "A sieve size: the number of openings per linear inch. Higher mesh = finer powder (325 mesh ≈ 45 µm, 400 mesh ≈ 38 µm)." },
  { term: "Micronized talc", definition: "Talc ground and air-classified to very fine particle sizes, typically reported by D50/D97 in microns rather than mesh." },
];

/** Colour grades as shown on the company's colour-grade image and Affiliation page. VERIFY D5 */
export const colourGrades: { name: string; description: string }[] = [
  { name: "White", description: "Bright white, flaky lumps — relevant where final whiteness of the powder matters." },
  { name: "Grey", description: "Grey to bluish-grey fragments with white streaks." },
  { name: "Green", description: "Pale green, slightly translucent lumps." },
  { name: "Coffee", description: "Pinkish-beige to light brown lumps." },
];

/** Origins as shown in the company's "Types of talc" diagram. VERIFY B1 */
export const origins = {
  afghan: { label: "Afghan talc", sources: ["Khogyani", "Agam", "Shinwari"] },
  pakistani: { label: "Pakistani talc", sources: ["Haripur", "Parachinar", "Chitral"] },
};

/** Typical lump/powder yield per source, from the Affiliation page. VERIFY B12 */
export const yieldRatios: { source: string; split: { label: string; pct: number }[]; note?: string }[] = [
  {
    source: "Afghan talc",
    split: [
      { label: "Big lumps (> 20 mm)", pct: 50 },
      { label: "Small lumps (> 5 mm)", pct: 20 },
      { label: "Powder / fines", pct: 30 },
    ],
  },
  {
    source: "Pakistani talc — Haripur",
    split: [
      { label: "Lumps", pct: 50 },
      { label: "Powder / fines", pct: 50 },
    ],
    note: "Lumps-only supply is possible from specific mines.",
  },
  {
    source: "Pakistani talc — Parachinar",
    split: [
      { label: "Lumps", pct: 95 },
      { label: "Powder / fines", pct: 5 },
    ],
  },
];

export type LabResult = { parameter: string; method: string; unit: string; result: string };
export type LabReport = {
  id: string;
  imageSlot: string;
  title: string;
  commodity: string;
  sampledAt: string;
  material: string;
  packing?: string;
  mesh: string;
  chemical: LabResult[];
  physical: LabResult[];
};

/** Transcribed from the SKZ Laboratory Peshawar analysis report scans. Both reports are undated — VERIFY C1/C2. */
export const labReports: LabReport[] = [
  {
    id: "agam-02",
    imageSlot: "lab-report-agam-02",
    title: "Talc mesh powder — sample “Agam 02”",
    commodity: "Talc mesh powder",
    sampledAt: "SKZ Yard, Peshawar",
    material: "Agam 02",
    packing: "25 kg bag / ton bag",
    mesh: "Above 325 mesh (Bettersizer ST particle analysis)",
    chemical: [
      { parameter: "Loss on ignition (LOI)", method: "In-house gravimetric, 1000 °C", unit: "%", result: "Under 8" },
      { parameter: "Silica as SiO₂", method: "Based on Scott (gravimetric)", unit: "%", result: "60 – 64" },
      { parameter: "Magnesium as MgO", method: "Based on Scott (titrimetric)", unit: "%", result: "30 – 33" },
    ],
    physical: [
      { parameter: "Whiteness", method: "Konica colour reader", unit: "—", result: "Above 93" },
      { parameter: "Sieve residue", method: "As per ASTM E", unit: "—", result: "0.03" },
      { parameter: "Bulk density", method: "—", unit: "g/cm³", result: "0.31" },
    ],
  },
  {
    id: "dd",
    imageSlot: "lab-report-dd",
    title: "Talc mesh powder — sample “DD”",
    commodity: "Talc mesh powder",
    sampledAt: "SKZ Yard, Peshawar",
    material: "DD",
    mesh: "Above 400 mesh (Bettersizer ST particle analysis)",
    chemical: [
      { parameter: "Loss on ignition (LOI)", method: "In-house gravimetric, 1000 °C", unit: "%", result: "Under 6" },
      { parameter: "Silica as SiO₂", method: "Based on Scott (gravimetric)", unit: "%", result: "Above 60" },
      { parameter: "Magnesium as MgO", method: "Based on Scott (titrimetric)", unit: "%", result: "Above 30" },
    ],
    physical: [
      { parameter: "Whiteness", method: "Konica colour reader", unit: "—", result: "Above 94" },
      { parameter: "Sieve residue", method: "As per ASTM E", unit: "—", result: "0.03" },
      { parameter: "Bulk density", method: "—", unit: "g/cm³", result: "0.40" },
    ],
  },
];

export const labDisclaimer =
  "These are results for individual samples tested by SKZ Laboratory Peshawar. They show the kind of analysis carried out; they are not a guaranteed specification for every lot. Each order is agreed against the buyer's own specification, and a lot-specific analysis can be requested with a quotation.";

export const packing = {
  formats: [
    { name: "25 kg bags", detail: "Printed SKZ “Soap Stone / Talc Powder” bags, stacked and wrapped; palletised on request." },
    { name: "Jumbo (ton) bags", detail: "White FIBC bulk bags for lumps and powder, filled under a hopper with dust collection." },
    { name: "Containers", detail: "Bags loaded into shipping containers at the warehouse for export." },
  ],
  note: "Bag type, labelling and container loading plan are confirmed per order.",
};

/** Mesh capability wording. VERIFY B3 */
export const meshCapability = {
  plantRange: "250 to 2,500 mesh",
  sourceNote: "Range stated for the two Peshawar meshing plants in company records.",
  reportedSamples: ["above 325 mesh", "above 400 mesh"],
};
