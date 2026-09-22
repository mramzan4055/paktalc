/** Quality-control process. Describes checks evidenced by photos + lab reports only. No certification claims. */

export const qualityIntro =
  "PakTalc talc is checked at three points: by eye during hand sorting at the mine, by grade segregation in the Peshawar yard, and by laboratory analysis of powder samples at SKZ Laboratory Peshawar. Buyers can ask for a lot-specific analysis with their quotation.";

export const qualityStages: { title: string; where: string; checks: string[]; image: string }[] = [
  {
    title: "Selection at the face",
    where: "Mine",
    checks: ["White talc kept apart from waste rock during extraction", "Field samples taken during survey work"],
    image: "sorting-4",
  },
  {
    title: "Hand sorting & inspection",
    where: "Mine yard",
    checks: ["Foreign rock removed by hand", "Lumps separated by colour grade and size", "Sorted piles checked by inspectors before bagging"],
    image: "sorting-2",
  },
  {
    title: "Grade segregation",
    where: "Peshawar yard",
    checks: ["Stockpiles kept separate by source and colour", "Material allocated to orders by grade"],
    image: "gallery-01",
  },
  {
    title: "Laboratory analysis",
    where: "SKZ Laboratory Peshawar",
    checks: [
      "Particle size by laser analysis (Bettersizer ST)",
      "Whiteness by colour reader (Konica)",
      "Sieve residue, bulk density",
      "Loss on ignition at 1000 °C, SiO₂ and MgO",
    ],
    image: "lab-1",
  },
  {
    title: "Packing checks",
    where: "Plant & warehouse",
    checks: ["Bag type and labelling per order", "Filling under dust collection", "Stacking, wrapping and container loading"],
    image: "packaging-2",
  },
];

export const testParameters: { name: string; why: string }[] = [
  { name: "Particle size / mesh", why: "Decides how the powder behaves in the buyer's process — reinforcement, gloss, flow. Reported as mesh, or as D50 in microns." },
  { name: "Whiteness", why: "Important where the final product is white or light-coloured, as in paint, paper and light plastics." },
  { name: "Sieve residue", why: "The share of coarse particles left on the test sieve. Low residue means fewer grit specks in coatings and films." },
  { name: "Bulk density", why: "Affects bag weight per volume, silo design and dosing." },
  { name: "Loss on ignition (LOI)", why: "Weight lost at 1000 °C. It indicates carbonate and other associated minerals — lower is closer to pure talc." },
  { name: "SiO₂ and MgO", why: "Talc's main oxides. Their levels relative to the theoretical 63.5 % / 31.7 % show how talc-rich the material is." },
];
