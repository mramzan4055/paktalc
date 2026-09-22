/**
 * Mining + processing narrative. Each step only describes what the company's own photos and
 * diagrams evidence (see IMAGE-USAGE.md). Unverified technology claims from the old site are excluded.
 */

export type Step = {
  id: string;
  title: string;
  summary: string;
  body: string[];
  images: string[]; // images.json slot ids
};

export const miningIntro =
  "PakTalc talc comes from surface and underground (tunnel) workings. Geologists first map the talc bodies. Miners then open adits and chambers and break the talc out selectively. At the mine, the material is hand-picked so that only talc goes on to the stock areas.";

export const miningSteps: Step[] = [
  {
    id: "exploration",
    title: "Exploration & geological survey",
    summary: "Mapping talc-bearing rock before any extraction starts.",
    body: [
      "Field teams walk the mountain slopes and rock faces to trace talc-bearing zones. Geologists record structure and rock orientation with compass-clinometers, sample the white and pale zones, and log where the talc body runs.",
      "This survey work decides where adits are driven. It also decides which faces are worked, so the mine takes the purest material and leaves waste rock in place.",
    ],
    images: ["exploration-1", "exploration-2", "exploration-3", "exploration-4"],
  },
  {
    id: "development",
    title: "Mine development",
    summary: "Opening access to the talc body through adits and surface benches.",
    body: [
      "Where the talc outcrops, it is worked from the surface. Where it runs into the hillside, adits are cut into the rock face and supported with timber, with rail track and mine carts to bring material out.",
      "The company's supply-chain records describe both open and tunnel mining for Pakistani talc, and open mining for Afghan talc.",
    ],
    images: ["extraction-1", "extraction-7"],
  },
  {
    id: "extraction",
    title: "Extraction",
    summary: "Selective breaking of talc inside chambers and at the face.",
    body: [
      "Inside the workings, crews break the white talc from the face and gather it on the chamber floor. Grey or stained rock is kept separate from white talc at the face, so less sorting is needed later.",
      "Survey teams measure the adits as they advance and inspect the walls. This keeps the working on the talc body and checks ground conditions.",
    ],
    images: ["extraction-2", "extraction-3", "extraction-4", "extraction-5", "extraction-6"],
  },
  {
    id: "sorting",
    title: "Hand sorting & selection",
    summary: "Talc lumps graded by eye and by hand before they leave the yard.",
    body: [
      "Broken talc is spread out in walled yards. Workers in hard hats and safety vests pick through it by hand, taking out foreign rock and separating the lumps by colour and size.",
      "Inspectors check the sorted piles before the lumps are filled into bulk bags. Hand sorting is still the most reliable way to separate the colour grades — white, grey, green and coffee — that buyers specify.",
    ],
    images: ["sorting-banner", "sorting-1", "sorting-2", "sorting-3", "sorting-4"],
  },
  {
    id: "transport",
    title: "Transport to processing",
    summary: "From mine stock areas to the Peshawar warehouse.",
    body: [
      "Sorted lumps are loaded onto trucks at the mine stock areas. Afghan talc moves through the company's stock area and processing plant in Jalalabad and crosses at Torkham. Pakistani talc goes from its mine stock areas direct to Peshawar.",
      "In Peshawar the talc is stocked and segregated by grade. From there it is either ground into powder or sent on as lumps to the Karachi warehouse for packing and export.",
    ],
    images: ["export-3", "export-4"],
  },
];

export const processingIntro =
  "Processing turns sorted talc lumps into mesh powder of a consistent particle size. The lumps are crushed and screened, ground in hammer and Raymond mills, and classified to the target fineness. The powder is then tested and packed in 25 kg bags or jumbo bags. Grinding happens at two meshing plants in Hayatabad Industrial Zone, Peshawar.";

export const processingSteps: Step[] = [
  {
    id: "intake",
    title: "Intake & segregation",
    summary: "Lumps are received, stockpiled and kept separate by grade.",
    body: [
      "Truckloads of sorted lumps arrive at the Peshawar yard and are stockpiled by source and colour grade. Keeping grades apart at this stage is what allows a buyer's specification to be met later.",
    ],
    images: ["export-4"],
  },
  {
    id: "crushing",
    title: "Crushing & screening",
    summary: "Lumps are reduced to a uniform feed size.",
    body: [
      "Crushers break the lumps down, and screens with conveyor stackers build stockpiles of crushed talc. The result is an even feed size for the mills.",
    ],
    images: ["crushing-1"],
  },
  {
    id: "grinding",
    title: "Grinding",
    summary: "Hammer mill and Raymond mill lines produce mesh powder.",
    body: [
      "The meshing plants run hammer mill and Raymond-type roller mill lines. Crushed talc is ground and swept by air into a cyclone, where powder of the right size is collected. Oversize material goes back to the mill.",
      "Talc is soft (Mohs 1), so the grinding task is mainly about controlling particle size and keeping the product clean.",
    ],
    images: ["grinding-1", "grinding-2", "grinding-3"],
  },
  {
    id: "micronizing",
    title: "Classification & micronizing",
    summary: "Air classifiers cut the powder to finer particle sizes.",
    body: [
      "For finer grades, a micronizing classifier separates particles by size in an air stream. It is set to the mesh or micron target in the order.",
    ],
    images: ["micronizing-1"],
  },
  {
    id: "dust",
    title: "Dust collection",
    summary: "Cyclones and collectors keep powder in the process and out of the air.",
    body: [
      "Each mill line has cyclones and a dust-collection hopper. They recover fine product and limit airborne dust in the shed. Mills are serviced regularly to keep output consistent.",
    ],
    images: ["grinding-4", "maintenance-1"],
  },
  {
    id: "testing",
    title: "Testing",
    summary: "Samples go to SKZ Laboratory Peshawar.",
    body: [
      "Powder samples are checked for particle size, whiteness, sieve residue, bulk density, loss on ignition, silica and magnesia. The quality control page shows the full method.",
    ],
    images: ["lab-2"],
  },
  {
    id: "packing",
    title: "Packing",
    summary: "25 kg bags and jumbo bags, filled under dust collection.",
    body: [
      "Powder is filled into printed 25 kg SKZ Soap Stone / Talc Powder bags or into jumbo bags under a hopper with dust collection. Bags are stacked, wrapped and palletised as the order requires.",
    ],
    images: ["packaging-1", "packaging-2", "packaging-3"],
  },
  {
    id: "storage-dispatch",
    title: "Storage & dispatch",
    summary: "Covered storage, then container loading for export.",
    body: [
      "Filled bags are stored in rows in the warehouse and yard until dispatch. Export orders go by truck to the Karachi warehouse for final packing and container loading.",
    ],
    images: ["export-5", "export-6", "export-2"],
  },
];
