# Image Usage

All images come from the prepared package (`images.json`, `public/images/`). Nothing is renamed; the only generated files are the small logo sizes, `favicon.ico`, `src/app/icon.png` and `apple-icon.png` (`scripts/make-brand-sizes.mjs`).
Rendering goes through `<Picture>` (`src/components/Picture.tsx`): AVIF first, WebP fallback, intrinsic width/height, the manifest alt text, and art-directed mobile crops where supplied. Only the page hero is `eager` + `fetchpriority=high`. Non-hero images are capped at their intrinsic width (no upscaling), except cover-cropped heroes and cards.

## Placement by page (main slots)
| Page | Hero | Key section images |
|---|---|---|
| Home | Slider: `talc-hero` (H1) → `hero-alt-slide` → `hero-main` | `why-card-quality`, product cards `product-card-talc-lumps` / `product-card-talc-powder` / `talc-lumps-alt-4`, explorer (exploration-1, mining-teaser, sorting-banner, crushing-1, grinding-1, lab-1, packaging-1, export-teaser), `lab-3`, `mining-teaser`, `export-teaser`, gallery preview (gallery-01/11/06/09, lab-4, gallery-17), `sustainability-teaser`, `skz-logo`, article heroes |
| Talc | `talc-hero` | talc-lumps-main, talc-powder-bags-stacked, talc-colour-grades, talc-origins, sorting-1, grinding-2, lab-2 |
| Talc lumps | `talc-lumps-main` | talc-lumps-alt-1/2/3, talc-colour-grades, sorting-1/2, talc-lumps-alt-4, export-3/6/2, gallery-04 |
| Talc powder | `talc-powder-bag` | crushing-1, grinding-2, micronizing-1, packaging-2, talc-powder-bags-stacked, packaging-1, packaging-4 |
| Mining operations | `mining-hero` | gallery-10, exploration-1…4, extraction-1…7, sorting-banner, sorting-1…4, export-3/4 |
| Processing | `grinding-1` | export-4, crushing-1, grinding-1/2/3/4, micronizing-1, maintenance-1, lab-2, packaging-1/2/3, export-5/6/2 |
| Quality control | `lab-1` | sorting-4, sorting-2, gallery-01, packaging-2, lab-3, lab-report-agam-02, lab-report-dd, lab-2, lab-4 |
| Applications | `talc-lumps-alt-1` | none (no authentic application imagery; see gaps) |
| Facilities | `export-6` | mesh-plant-peshawar, export-4, export-5 (representative), gallery-09, grinding-3, gallery-21, crushing-1, gallery-19, packaging-3, gallery-22 |
| Sustainability | `sustainability-hero` | gallery-13, sorting-3, gallery-14 (temporary), exploration-2, partners-1, gallery-06 |
| About | `about-hero` | gallery-15, overview-office, facility-mesh-plant, team-director-1, team-peshawar-manager, team-karachi-manager, team-lab, partners-1/2/3 |
| Affiliation | `overview-office` | skz-logo, affiliation-chart, supply-chain-1/2 |
| Gallery | none | 40 images in 7 categories (gallery-01…27 + selected page slots) |
| Insights | article heroes | talc-lumps-alt-4, micronizing-1, grinding-1, talc-lumps-main + in-article figures |
| OG images | `images/og/*` | home, talc, mining-operations, about, quality, affiliation, gallery; others use a slot (`ogSlot` in `content/seo.ts`) |

## Rules applied
- Image meaning matches section meaning: no machinery in sustainability, no warehouse photos for mining, and so on.
- A photo is attributed to a specific site only when its manifest alt/caption confirms the location (e.g. the Peshawar mesh plant and Peshawar yard).
- Location-unconfirmed stand-ins are labelled "Representative photo".
- Diagrams and scans are shown at intrinsic width in a white frame, with an HTML text version next to them.

## Gaps (authentic photos needed)
Karachi warehouse; plantation / farming / training programmes; application imagery (plastics, paint, paper, ceramics); high-res talc powder by mesh; high-res plant interiors (many plant photos are 480 × 600); port / sealed container. Old WordPress image URLs 301 to the new files (`paktalc-image-redirects.csv` → `.htaccess`).
