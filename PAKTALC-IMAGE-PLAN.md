# PakTalc.com — New Website Image Set

Built 22 Sep 2026 from the approved asset library, for the **new PakTalc site** (talc division of SKZ Mining Company Pvt. Ltd.).
Location: `D:\media-library-2026-09-22\paktalc-website\`

```
paktalc-website/
  images.json            ← every image slot: alt, caption, srcset (AVIF + WebP), width/height, loading
  paktalc-image-map.csv  ← the same as a spreadsheet (one row per slot + variant)
  paktalc-image-redirects.csv ← 301 map: old WordPress image URLs → new files (keeps image SEO)
  page-previews.jpg      ← visual check of what goes on each page
  public/images/
    home/  talc/  mining-operations/  quality/  logistics/
    about/  affiliation/  gallery/  brand/  og/
```

**What's in it:** 109 image slots across 6 pages, the gallery and the global brand files, using 102 unique photos. There are 593 files (AVIF + WebP, 44 MB). Each photo is stored once; if a slot reuses another slot's image, `images.json` points to that slot (`reuses_slot`).
**Social share images:** 7 files, 1200×630, in `og/` (home, talc, mining operations, about, quality, affiliation, gallery).

## Rules this set follows (PakTalc = talc only)
- **Talc-only brand.** Pink salt, calcium carbonate, dolomite and the Hunza landscape photos are **left out**. They belong on the SKZ site, not PakTalc.
- **Real photos only.** No stock images and no AI images. The stock open-pit sliders from the current paktalc.com are gone.
- **Talc named only where confirmed** (your "all white lumps = talc" decision, SKZ talc bags, lab reports). Rock faces, adits and quarries have neutral alt text.
- **No certification claims** in any alt text or caption.
- **Locations** appear only where verified: Peshawar (signage/label). Afghanistan and Kurram stay in the manifest notes only.
- EXIF and GPS are stripped. Nothing is upscaled. Hero ≈ 115 KB AVIF at 1920 px.

## How to use a slot (example: talc page hero)
```html
<picture>
  <source media="(max-width:767px)" type="image/avif" srcset="<images.talc-hero.variants.mobile-4x5.avif>">
  <source media="(max-width:767px)" type="image/webp" srcset="<images.talc-hero.variants.mobile-4x5.webp>">
  <source type="image/avif" srcset="<images.talc-hero.variants.banner-16x9.avif>" sizes="100vw">
  <img srcset="<images.talc-hero.variants.banner-16x9.webp>" sizes="100vw"
       width="1920" height="1080" fetchpriority="high" alt="<images.talc-hero.alt>">
</picture>
```
Only the hero on each page is `eager` / `fetchpriority="high"`; every other image is `lazy`. Use `<figure><figcaption>` wherever a caption exists.

## Suggested new sitemap (image-wise)
Home · About · Talc (lumps, powder, colour grades, lab reports, origins) · Mining Operations (exploration → extraction → sorting → crushing & grinding → packaging → quality control → transport & export → our plants) · Applications · Sustainability · Affiliation (SKZ) · Insights · Gallery · Contact

## Page-by-page assignment

### HOME

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| hero | `hero-main` | A001 `open-pit-mine-excavator-01` | desktop-21x9 | Excavator and truck working on the terraced benches of an open-pit mine in arid mountains. |
| hero | `hero-alt-slide` | A085 `mine-adit-entrance-01` | banner-16x9 | Men gathered at the entrance of an adit cut into a white rock cliff among pine trees. |
| why-paktalc | `why-card-quality` | A063 `talc-lumps-close-up-01` | card-1x1 | White talc lumps arranged on a black background. |
| featured-products | `product-card-talc-lumps` | A316 `talc-lumps-close-up-02` | card-1x1 | Close-up of white talc lumps. |
| featured-products | `product-card-talc-powder` | A204 `talc-powder-25kg-bag-skz-01` | portrait-4x5 | 25 kg SKZ Soap Stone / Talc Powder bag with product label. |
| mining-operations-teaser | `mining-teaser` | A120 `underground-mine-chamber-01` | banner-16x9 | Two workers inside a large underground chamber floored with broken white rock, with a blue drum and hoses. |
| sustainability-teaser | `sustainability-teaser` | A105 `mine-site-01` | card-4x3 | Hillside mine site with waste dumps, a chute and a small shed among green vegetation. |
| global-export | `export-teaser` | A064 `jumbo-bags-container-loading-02` | portrait-4x5 | White jumbo bags stacked inside a blue shipping container. |

### TALC

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| hero | `talc-hero` | A040 `talc-lumps-stockpile-02` | banner-16x9 | Men working on a stockpile of white talc lumps, one carrying a sack, with a truck behind. |
| talc-lumps | `talc-lumps-main` | A070 `talc-lumps-close-up-06` | card-1x1 | Close-up of white foliated talc lumps showing flat, layered plates. |
| talc-lumps | `talc-lumps-alt-1` | A025 `talc-lumps-close-up-04` | card-1x1 | Full-frame view of flaky white talc lumps. |
| talc-lumps | `talc-lumps-alt-2` | A013 `talc-lumps-close-up-03` | card-1x1 | Close-up of pale, slightly translucent talc lumps. |
| talc-lumps | `talc-lumps-alt-3` | A295 `talc-lumps-close-up-08` | card-1x1 | Close-up of flaky white talc lumps. |
| talc-lumps | `talc-lumps-alt-4` | A032 `talc-lumps-close-up-05` | card-4x3 | Hand holding a flaky white talc lump above a pile of talc. |
| colour-grades | `talc-colour-grades` | A270 `talc-lumps-colour-grades-01` | original | Four talc lump samples shown side by side: coffee, white, grey and green. |
| talc-powder | `talc-powder-bag` | A204 `talc-powder-25kg-bag-skz-01` (reuses `product-card-talc-powder`) | portrait-4x5 | 25 kg SKZ Soap Stone / Talc Powder bag with product label. |
| talc-powder | `talc-powder-bags-stacked` | A213 `talc-powder-bags-stacked-skz-01` | portrait-4x5 | Stack of wrapped SKZ Soap Stone Talc Powder bags. |
| lab-reports | `lab-report-agam-02` | A091 `talc-laboratory-analysis-report-01` | original | Scanned SKZ Laboratory Peshawar analysis report for a talc mesh powder sample. |
| lab-reports | `lab-report-dd` | A092 `talc-laboratory-analysis-report-02` | original | Scanned SKZ Laboratory Peshawar analysis report for a talc powder sample above 400 mesh. |
| origins | `talc-origins` | A317 `talc-origins-diagram-01` | original | Diagram of talc types: Afghan talc from Khogyani, Agam and Shinwari; Pakistani talc from Haripur, Parachinar and Chitral. |

### MINING-OPERATIONS

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| hero | `mining-hero` | A089 `underground-mine-01` | banner-16x9 | Miners inside a timber-supported underground adit, one holding a headlamp. |
| exploration | `exploration-1` | A083 `geological-survey-rock-face-kurram-01` | card-4x3 | Two geologists at the base of a large folded orange-brown rock face. |
| exploration | `exploration-2` | A142 `geologist-field-survey-kurram-01` | card-4x3 | Geologist with backpack and field notes standing at a white rock face. |
| exploration | `exploration-3` | A084 `geological-compass-measurement-01` | card-4x3 | Hand holding a geological compass-clinometer to measure rock orientation in low light. |
| exploration | `exploration-4` | A139 `field-exploration-team-01` | card-4x3 | Field team with backpacks among boulders on a forested mountain slope. |
| extraction | `extraction-1` | A085 `mine-adit-entrance-01` (reuses `hero-alt-slide`) | banner-16x9 | Men gathered at the entrance of an adit cut into a white rock cliff among pine trees. |
| extraction | `extraction-2` | A120 `underground-mine-chamber-01` (reuses `mining-teaser`) | banner-16x9 | Two workers inside a large underground chamber floored with broken white rock, with a blue drum and hoses. |
| extraction | `extraction-3` | A118 `underground-mine-02` | card-4x3 | Worker at a white and grey rock face inside an underground mine. |
| extraction | `extraction-4` | A137 `underground-mine-survey-01` | card-4x3 | Surveyors measuring with a tape inside a cream-coloured rock adit. |
| extraction | `extraction-5` | A087 `underground-mine-inspection-01` | card-4x3 | Two men inspecting the pale rock walls inside an underground working. |
| extraction | `extraction-6` | A082 `talc-mine-site-scree-01` | card-4x3 | Man standing on a slope of flat white talc fragments below a rock outcrop. |
| extraction | `extraction-7` | A227 `underground-mine-04` | portrait-4x5 | Timber-supported underground adit with rail track and a mine cart. |
| sorting | `sorting-banner` | A102 `talc-lumps-hand-sorting-02` | banner-16x9 | Workers in hard hats and safety vests sorting white talc lumps beside filled bulk bags. |
| sorting | `sorting-1` | A015 `talc-lumps-hand-sorting-01` | card-4x3 | Workers sorting white talc lumps by hand in a walled yard. |
| sorting | `sorting-2` | A012 `talc-lumps-quality-inspection-01` | portrait-4x5 | Two inspectors in uniforms and caps checking white talc lumps with a worker during hand sorting. |
| sorting | `sorting-3` | A099 `talc-lumps-quality-inspection-02` | card-4x3 | Man crouching to inspect a pile of white talc lumps. |
| sorting | `sorting-4` | A166 `talc-lumps-field-sample-01` | portrait-4x5 | White talc fragments with a geological hammer resting on top at a field site. |
| crushing-grinding | `crushing-1` | A017 `talc-crushing-screening-conveyor-01` | card-4x3 | Conveyor stackers building a stockpile of crushed white talc, with jumbo bags and a worker nearby. |
| crushing-grinding | `grinding-1` | A297 `grinding-mill-talc-powder-bags-01` | card-4x3 | Raymond-type grinding mill beside stacked SKZ talc powder bags. |
| crushing-grinding | `grinding-2` | A212 `grinding-mill-01` | portrait-4x5 | Two staff standing beside a teal grinding mill in a brick processing shed. |
| crushing-grinding | `grinding-3` | A222 `grinding-mill-02` | portrait-4x5 | Silver grinding mill with piping and filled bags beside a powder stockpile. |
| crushing-grinding | `grinding-4` | A026 `grinding-mill-dust-collector-01` | portrait-4x5 | Grinding mill with cyclone and dust-collection hopper inside a processing shed, with two staff inspecting. |
| crushing-grinding | `micronizing-1` | A201 `micronizing-classifier-01` | portrait-4x5 | Micronizing classifier with cyclone and piping in a processing plant. |
| crushing-grinding | `maintenance-1` | A202 `grinding-mill-maintenance-01` | portrait-4x5 | Worker in helmet and mask servicing the grinding chamber of a mill. |
| packaging | `packaging-banner` | A310 `talc-powder-bags-stacked-skz-yard-01` | banner-16x9 | Wall of stacked white SKZ talc powder bags in a processing yard. |
| packaging | `packaging-1` | A215 `talc-powder-bagging-line-01` | portrait-4x5 | Workers in white uniforms and helmets filling and stacking SKZ talc powder bags in a large plant. |
| packaging | `packaging-2` | A205 `jumbo-bag-filling-01` | portrait-4x5 | White powder being filled into a jumbo bag under a hopper and dust collector. |
| packaging | `packaging-3` | A030 `bagged-product-palletization-01` | card-4x3 | Shrink-wrapped pallets of stacked paper bags in a warehouse. |
| packaging | `packaging-4` | A196 `plant-workers-safety-uniforms-01` | portrait-4x5 | Two workers in white uniforms and helmets beside bagged product in a processing plant. |
| our-plants | `mesh-plant-peshawar` | A298 `skz-mining-mesh-plant-signage-peshawar-01` | card-4x3 | Entrance of the SKZ Mining Company Peshawar mesh plant with its sign and a teal cyclone separator. |
| quality-control | `lab-1` | A114 `quality-testing-laboratory-01` | portrait-4x5 | Laboratory technician in a white coat operating an analytical instrument connected to a computer. |
| quality-control | `lab-2` | A233 `quality-testing-laboratory-02` | portrait-4x5 | Laboratory technician placing samples into a drying oven. |
| quality-control | `lab-3` | A272 `quality-testing-laboratory-03` | card-4x3 | Technician using an analytical instrument and computer in the laboratory. |
| quality-control | `lab-4` | A273 `quality-control-laboratory-01` | card-4x3 | Laboratory bench with drying ovens and staff at work. |
| transport-export | `export-1` | A064 `jumbo-bags-container-loading-02` (reuses `export-teaser`) | portrait-4x5 | White jumbo bags stacked inside a blue shipping container. |
| transport-export | `export-2` | A014 `jumbo-bags-container-loading-01` | portrait-4x5 | Worker loading white jumbo bags into a blue shipping container mounted on a truck. |
| transport-export | `export-3` | A097 `talc-lumps-truck-loading-01` | card-4x3 | Pile of white talc lumps beside a yellow truck being loaded. |
| transport-export | `export-4` | A294 `talc-lumps-stockyard-truck-loading-01` | card-4x3 | Decorated truck parked beside white talc stockpiles at the Peshawar warehouse yard. |
| transport-export | `export-5` | A260 `jumbo-bags-warehouse-storage-01` | card-4x3 | Corridor between tall rows of stacked white jumbo bags. |
| transport-export | `export-6` | A011 `jumbo-bags-storage-yard-01` | banner-16x9 | Rows of filled white jumbo bags in an open storage yard with a forklift. |

### ABOUT

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| hero | `about-hero` | A098 `team-mine-site-safety-gear-01` | portrait-4x5 | Team of workers and staff in helmets and high-visibility vests posing at a white rock quarry. |
| company-overview | `overview-office` | A056 `skz-mining-office-peshawar-01` | portrait-4x5 | Two men standing in front of the SKZ Mining Company Peshawar banner with Pakistani and Japanese flags. |
| facilities | `facility-mesh-plant` | A298 `skz-mining-mesh-plant-signage-peshawar-01` (reuses `mesh-plant-peshawar`) | card-4x3 | Entrance of the SKZ Mining Company Peshawar mesh plant with its sign and a teal cyclone separator. |
| team | `team-director-1` | A076 `director-rock-face-inspection-01` | card-4x3 | Company director examining a white rock face at a mine site. |
| team | `team-director-2` | A257 `japanese-expert-field-visit-01` | card-4x3 | Japanese technical expert seated on a white rock outcrop during a field visit. |
| team | `team-peshawar-manager` | A074 `skz-mining-office-peshawar-manager-01` | card-4x3 | Manager seated at his desk in the SKZ Mining Company Peshawar office beneath the company sign. |
| team | `team-karachi-manager` | A117 `manager-stockyard-01` | portrait-4x5 | Manager standing on a white mineral stockyard in front of processing sheds. |
| team | `team-lab` | A114 `quality-testing-laboratory-01` (reuses `lab-1`) | portrait-4x5 | Laboratory technician in a white coat operating an analytical instrument connected to a computer. |
| technical-partners | `partners-1` | A280 `japanese-technical-experts-site-visit-02` | card-4x3 | Five Japanese technical experts in helmets at a quarry site. |
| technical-partners | `partners-2` | A219 `technical-team-plant-visit-01` | portrait-4x5 | Three staff members, two of them Japanese technical partners, standing in a processing plant. |
| technical-partners | `partners-3` | A232 `japanese-technical-experts-site-visit-01` | portrait-4x5 | Three Japanese technical experts in helmets at a mine site. |

### AFFILIATION

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| structure | `affiliation-chart` | A292 `skz-mining-company-structure-chart-01` | original | Organisation chart linking Shokozan Japan to Afghan Talc (mining sites Agam and Khogyani, Jalalabad processing plant) and SKZ Company (Peshawar meshing and storage, Karachi sorting and packing). |
| supply-chain | `supply-chain-1` | A305 `talc-supply-chain-diagram-01` | original | Flow diagram: Afghan talc from open mining to the Morga stock area, Jalalabad factory and Torkham border, alongside Pakistani talc from open and tunnel mining to a stock area. |
| supply-chain | `supply-chain-2` | A306 `talc-supply-chain-diagram-02` | original | Flow diagram: Peshawar warehouse for stock and segregation, then Karachi warehouse for packing and exporting. |

### SUSTAINABILITY

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| hero | `sustainability-hero` | A105 `mine-site-01` (reuses `sustainability-teaser`) | card-4x3 | Hillside mine site with waste dumps, a chute and a small shed among green vegetation. |

### GLOBAL

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| header | `logo-horizontal` | A122 `paktalc-logo-horizontal-01` | original | PakTalc logo: Talc Extraction, Processing, Export & Import. |
| header | `logo-stacked` | A123 `paktalc-logo-stacked-01` | original | PakTalc logo, stacked version. |
| header | `logo-icon` | A124 `paktalc-logo-icon-01` | original | PakTalc crystal logo icon. |
| favicon | `favicon` | A264 `paktalc-favicon-01` | original | PakTalc icon. |
| favicon | `favicon-icon` | A265 `paktalc-favicon-icon-01` | original | PakTalc crystal icon. |

### AFFILIATION

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| parent-brand | `skz-logo` | A095 `skz-mining-logo-horizontal-01` | original | SKZ Mining Company logo. |
| parent-brand | `skz-logo-white` | A094 `skz-mining-logo-horizontal-white-01` | original | SKZ Mining Company logo in white. |

### GALLERY

| Section | Slot | Asset | Variant | Alt text |
|---|---|---|---|---|
| grid | `gallery-01` | A088 `talc-lumps-stockpile-05` | gallery | Two men standing in a yard of white talc lump stockpiles. |
| grid | `gallery-02` | A141 `talc-lumps-close-up-07` | gallery | Soft-focus close-up of white talc lumps. |
| grid | `gallery-03` | A054 `talc-lumps-stockpile-03` | gallery | Heap of crushed white talc lumps. |
| grid | `gallery-04` | A067 `talc-lumps-stockpile-04` | gallery | Man holding a large white talc lump on top of a talc stockpile. |
| grid | `gallery-05` | A243 `talc-lumps-hand-sorting-03` | gallery | Workers in hard hats hand-sorting a pile of white talc lumps near a plant building. |
| grid | `gallery-06` | A262 `talc-lumps-hand-sorting-04` | gallery | Men sorting white talc lumps in a walled yard beside bulk bags. |
| grid | `gallery-07` | A267 `talc-lumps-hand-sorting-05` | gallery | Workers in safety vests sorting white talc lumps between large stockpiles and bulk bags. |
| grid | `gallery-08` | A075 `talc-crushing-screening-conveyor-02` | gallery | Conveyor stacker discharging crushed white talc onto a stockpile, with a worker in the foreground. |
| grid | `gallery-09` | A318 `talc-crushing-screening-conveyor-03` | gallery | Screening plant with conveyors and white talc stockpiles, workers shovelling in the foreground. |
| grid | `gallery-10` | A039 `mine-excavation-site-01` | gallery | Wide view of an excavation site with workers and trucks on bare ground. |
| grid | `gallery-11` | A119 `underground-mine-03` | gallery | Broken white rock inside a dimly lit underground chamber. |
| grid | `gallery-12` | A138 `underground-mine-inspection-02` | gallery | Men inspecting the walls of a pale rock adit. |
| grid | `gallery-13` | A296 `mine-site-03` | gallery | Men standing on white mineral dumps on a green hillside with wheelbarrows. |
| grid | `gallery-14` | A253 `mine-site-02` | gallery | Hilltop mine site with a winch, wheelbarrows and visitors, green hills behind. |
| grid | `gallery-15` | A066 `site-visit-01` | gallery | Three men standing beside a white rock outcrop on a hillside road with a parked vehicle. |
| grid | `gallery-16` | A065 `jumbo-bags-container-loading-03` | gallery | Decorated Pakistani truck carrying a pink shipping container filled with jumbo bags. |
| grid | `gallery-17` | A106 `jumbo-bags-container-loading-04` | gallery | Blue shipping container with white jumbo bags loaded inside. |
| grid | `gallery-18` | A256 `jumbo-bags-container-loading-05` | gallery | Two white jumbo bags loaded in a shipping container. |
| grid | `gallery-19` | A216 `jumbo-bags-handling-loader-01` | gallery | Skid-steer loader lifting white jumbo bags beside a brick wall. |
| grid | `gallery-20` | A207 `cyclone-separator-01` | gallery | Teal cyclone separator installed in a processing shed. |
| grid | `gallery-21` | A218 `cyclone-separator-02` | gallery | Two teal cyclone separators in a processing shed. |
| grid | `gallery-22` | A223 `grinding-mill-03` | gallery | Three men inspecting a mill and cyclone assembly in a processing shed. |
| grid | `gallery-23` | A231 `processing-plant-machinery-01` | gallery | Machinery on a processing plant floor. |
| grid | `gallery-24` | A234 `processing-plant-machinery-02` | gallery | Industrial machinery in a large processing plant. |
| grid | `gallery-25` | A208 `processing-equipment-01` | gallery | Teal duct and filter column beside bagged product in a processing shed. |
| grid | `gallery-26` | A220 `technical-team-stockyard-01` | gallery | Two men standing in a yard of filled jumbo bags. |
| grid | `gallery-27` | A258 `japanese-expert-field-visit-02` | gallery | Japanese technical expert standing beside a small adit entrance in a rock face. |
### GALLERY
27 extra authentic photos (talc stockpiles, sorting yards, screening plant, mine sites, plant machinery, containers), in `public/images/gallery/` at their original ratio, max 1440 px.

---

## Still missing for the PakTalc site (real photos needed)
| Priority | Page / section | Needed |
|---|---|---|
| P0 | Home hero | A high-res **confirmed talc mine** photo. Current hero = "Upper Dar" open-pit mine; region not stated |
| P0 | Talc › powder | Real talc **powder** photos by mesh (the old powder shots were stock and are excluded) |
| P0 | Mining Ops › grinding / packaging | High-res plant interiors. Current ones are 500×600 crops (shown as small 4:5 cards) |
| P1 | Talc › cosmetic / pharmaceutical / industrial grade cards | No grade-specific photos exist. Use lump/powder photos or labelled AI application illustrations (see IMAGE-GENERATION-PROMPTS.md) |
| P1 | Applications page | AI conceptual illustrations only, clearly labelled |
| P1 | Sustainability | Tree plantation / farming / training photos. Only one mine-site photo exists (reused from the home teaser) |
| P1 | Transport & export | Port / sealed container / Karachi packing |

## Before launch
- **Consent:** people are visible in many images (team, sorting, labs, partners). `paktalc-image-map.csv` flags them in `review_flag`.
- **Lab reports:** check the figures are current before publishing.
- **Redirects:** add the 301s from `paktalc-image-redirects.csv` so old image links (Google Images, backlinks) keep working.
