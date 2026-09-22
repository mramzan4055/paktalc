/**
 * Applications. General industrial knowledge of how talc functions, plus what buyers usually evaluate.
 * No suitability/regulatory promises: regulated uses need the buyer's own qualification (see note).
 */

export type Application = {
  id: string;
  name: string;
  why: string;
  properties: string[];
  buyersEvaluate: string[];
  form: string;
  regulated?: boolean;
};

export const applicationsIntro =
  "Talc is used as a functional mineral, not just a cheap filler. Its platy particles stiffen plastics, give paint a smooth, even film, control pitch in paper making and help ceramic bodies fire evenly. The right grade depends on particle size, whiteness and chemistry. That is why PakTalc supplies against the buyer's specification.";

export const applications: Application[] = [
  {
    id: "plastics",
    name: "Plastics & polymers",
    why: "Talc stiffens plastics and keeps parts dimensionally stable. It is widely used in polypropylene compounds for automotive, appliance and packaging parts.",
    properties: [
      "Platy particles increase flexural modulus (stiffness) and heat-deflection temperature",
      "Reduces shrinkage and warpage in moulded parts",
      "Acts as a nucleating agent in polypropylene, shortening cycle times",
    ],
    buyersEvaluate: ["Particle size (D50 / top cut)", "Whiteness for light-coloured compounds", "Moisture and bulk density for dosing"],
    form: "Fine mesh or micronized talc powder",
  },
  {
    id: "paints-coatings",
    name: "Paints & coatings",
    why: "In paint, talc is an extender that improves film build, sanding, matting and resistance to sagging and settling.",
    properties: [
      "Lamellar particles overlap to form a barrier, improving water and weather resistance",
      "Controls gloss for matt and eggshell finishes",
      "Improves suspension and brushability; eases sanding of primers",
    ],
    buyersEvaluate: ["Whiteness / brightness", "Oil absorption", "Sieve residue (grit) and top cut"],
    form: "Talc powder, typically 325 mesh and finer",
  },
  {
    id: "paper",
    name: "Paper & pulp",
    why: "Paper mills use talc to control pitch (sticky wood resins) and as a filler or coating pigment that improves the printing surface.",
    properties: [
      "Organophilic surface adsorbs pitch and stickies before they deposit on the machine",
      "Improves opacity, smoothness and printability as a filler",
      "Soft particles are gentle on wires and machine components",
    ],
    buyersEvaluate: ["Whiteness", "Particle size", "Consistency between lots"],
    form: "Fine talc powder",
  },
  {
    id: "ceramics",
    name: "Ceramics",
    why: "Talc is a magnesium source and flux in ceramic bodies and glazes. It is used in wall tiles, sanitaryware and cordierite ceramics.",
    properties: [
      "Improves thermal-shock resistance and controls thermal expansion",
      "Acts as a flux, lowering firing temperature",
      "Improves plasticity and dry strength of bodies",
    ],
    buyersEvaluate: ["MgO / SiO₂ content", "Iron and calcium content (fired colour)", "Loss on ignition"],
    form: "Talc powder; lumps for buyers who grind in-house",
  },
  {
    id: "rubber",
    name: "Rubber",
    why: "In rubber compounding, talc is a processing aid and semi-reinforcing filler, and a dusting agent that stops uncured sheets sticking together.",
    properties: [
      "Improves extrusion and mould release",
      "Anti-tack dusting of uncured rubber",
      "Barrier effect in some compounds",
    ],
    buyersEvaluate: ["Particle size", "Grit (sieve residue)", "Moisture"],
    form: "Talc powder",
  },
  {
    id: "cosmetics",
    name: "Cosmetics & personal care",
    why: "Cosmetic formulators use talc for its soft, silky feel and its ability to absorb oil and moisture. It appears in pressed and loose powders.",
    properties: ["Slip and softness from the platy structure", "Oil and moisture absorption", "Good adhesion to skin in pressed powders"],
    buyersEvaluate: [
      "Compliance with the cosmetic regulations of the destination market",
      "Mineralogical purity testing by the buyer's accredited laboratory",
      "Microbiology and heavy metals",
    ],
    form: "Micronized talc powder",
    regulated: true,
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    why: "Talc is a traditional glidant, lubricant and anti-caking agent in tablet and capsule manufacture.",
    properties: ["Improves powder flow into tablet dies", "Reduces sticking to punches", "Chemically inert excipient"],
    buyersEvaluate: [
      "Conformity to the relevant pharmacopoeia monograph, tested by the buyer",
      "Mineralogical purity",
      "Documentation and traceability requirements",
    ],
    form: "Micronized talc powder",
    regulated: true,
  },
];

export const regulatedNote =
  "Cosmetic and pharmaceutical uses are regulated. PakTalc does not claim pharmacopoeial or cosmetic-regulatory compliance on this website. Buyers in these sectors should ask for samples and qualify the material with their own accredited testing. We will share the lot documentation we hold.";
