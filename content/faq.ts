/**
 * Buyer FAQs. Every answer restates something already published and verified on this site
 * (product forms, colour grades, yields, mesh, packing, testing). No invented claims,
 * no certifications, no delivery promises — see CONTENT-VERIFICATION.md.
 * Rendered as visible content + FAQPage structured data.
 */
export type Faq = { q: string; a: string };

export const faqs: Record<string, Faq[]> = {
  "/talc/": [
    {
      q: "What is talc?",
      a: "Talc is a hydrated magnesium silicate mineral, Mg₃Si₄O₁₀(OH)₂. It is the softest mineral on the Mohs scale, splits into thin plates, feels smooth or soapy and is chemically inert. Rock made up largely of talc is called soapstone or talc stone.",
    },
    {
      q: "Is soapstone the same as talc?",
      a: "In trade they are used interchangeably: soapstone is rock rich in talc. SKZ's own bags are labelled “Soap Stone / Talc Powder”. PakTalc supplies it as hand-sorted lumps or as ground mesh powder.",
    },
    {
      q: "What is the difference between talc lumps and talc powder?",
      a: "Talc lumps are pieces of raw talc, hand-sorted by colour and size and supplied un-ground for buyers who run their own mills. Talc powder is those lumps crushed, ground and air-classified to a stated fineness, ready to use in production.",
    },
    {
      q: "Where does PakTalc's talc come from?",
      a: "Company records list Afghan talc from Khogyani, Agam and Shinwari, and Pakistani talc from Haripur, Parachinar and Chitral. Material is stocked and segregated by grade in Peshawar before grinding or dispatch.",
    },
    {
      q: "Which colour grades are available?",
      a: "White, grey, green and coffee. The grade is set during hand sorting at the mine yard and carries through to the powder, so it is worth specifying with your enquiry.",
    },
  ],
  "/talc/lumps/": [
    {
      q: "What are talc lumps?",
      a: "Talc lumps are pieces of raw talc (soapstone) broken at the mine and picked over by hand. Foreign rock is removed and the lumps are separated by colour grade and size, then supplied un-ground in jumbo bags.",
    },
    {
      q: "What lump sizes can you supply?",
      a: "Size classes are agreed per order. Company records for Afghan sources distinguish big lumps above 20 mm and small lumps above 5 mm. Tell us your minimum and maximum size and whether fines are acceptable.",
    },
    {
      q: "How much of a deposit comes out as lumps?",
      a: "It depends on the source. Company records give roughly 95 % lumps for Parachinar talc, about 50 % for Haripur talc, and for Afghan talc about 50 % big lumps, 20 % small lumps and 30 % fines. These are typical values, not a guarantee for a particular shipment.",
    },
    {
      q: "How are talc lumps packed and shipped?",
      a: "Lumps are filled into jumbo (ton) bags and loaded into containers at the warehouse. Bag type, labelling and the container loading plan are confirmed per order.",
    },
    {
      q: "Can I get a sample before ordering?",
      a: "Yes. Ask for a sample with your enquiry, and say which colour grade and size range you need so the sample reflects the material you would receive.",
    },
  ],
  "/talc/powder/": [
    {
      q: "What mesh sizes of talc powder can you supply?",
      a: "Fineness is set per order. Company records rate the two Peshawar meshing plants for 250 to 2,500 mesh, and the published SKZ Laboratory reports cover samples above 325 mesh and above 400 mesh. Send your target mesh or D50 and we will confirm what the plants can hold.",
    },
    {
      q: "How is your talc powder produced?",
      a: "Hand-sorted lumps are crushed and screened, ground on hammer and Raymond mill lines and cut to size by air classification, with cyclones and dust collectors recovering the powder. Finer grades pass through a micronizing classifier.",
    },
    {
      q: "What is tested on each sample?",
      a: "SKZ Laboratory Peshawar measures particle size (Bettersizer ST), whiteness (Konica colour reader), sieve residue, bulk density, loss on ignition at 1000 °C, silica (SiO₂) and magnesia (MgO). Published sample results are on the quality control page.",
    },
    {
      q: "How is talc powder packed?",
      a: "In printed 25 kg SKZ Soap Stone / Talc Powder bags or in jumbo (ton) bags, filled under a hopper with dust collection, then stacked, wrapped and loaded into containers.",
    },
    {
      q: "Can you match the talc we buy today?",
      a: "Send your current data sheet or specification. We will compare it with what the plants produce and tell you honestly whether it can be matched, and on which parameters.",
    },
  ],
};
