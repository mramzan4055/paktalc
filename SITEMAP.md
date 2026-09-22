# Sitemap & Page Specifications

Canonical host: `https://paktalc.com` · trailing slash on every URL · all pages `index,follow` unless noted.
Titles and descriptions below are the defaults. The live values are in `content/seo.ts`.

| URL | Purpose | Primary intent | H1 | Title | Structured data | Key images | Links in (main) | Links out (main) | Status |
|---|---|---|---|---|---|---|---|---|---|
| `/` | Brand + capability overview, route to products/RFQ | Brand / talc supplier | Talc from mine to shipment, sorted and processed in Pakistan | PakTalc — Talc Lumps & Talc Powder Supplier, Pakistan | Organization, WebSite, WebPage | hero-main, product cards, mining-teaser, export-teaser | all | talc, lumps, powder, mining, processing, quality, applications, affiliation, contacts | Built |
| `/talc/` | Talc hub | Talc / soapstone | Talc from PakTalc | Talc (Soapstone): Properties, Grades & Origins | WebPage, BreadcrumbList, ImageObject | talc-hero, lumps, colour grades, origins | home, nav | lumps, powder, applications, quality, mining | Built |
| `/talc/lumps/` | Product | Talc lumps supplier | Talc lumps | Talc Lumps Supplier & Exporter — Sorted Raw Talc | Product, BreadcrumbList | talc-lumps-*, sorting-*, export-* | home, talc, apps | processing, quality, contacts | Built |
| `/talc/powder/` | Product | Talc powder manufacturer | Talc powder | Talc Powder — Ground & Micronized Talc from Peshawar | Product, BreadcrumbList | powder bags, grinding, packaging | home, talc, apps | processing, quality, contacts | Built |
| `/mining-operations/` | Operations narrative | Talc mining | Talc mining operations | Talc Mining Operations: Exploration to Sorting | WebPage, BreadcrumbList | mining-hero, exploration-*, extraction-*, sorting-* | home, talc | processing, facilities, sustainability | Built |
| `/processing/` | Processing chain | Talc processing | Talc processing | Talc Processing: Crushing, Grinding, Micronizing & Packing | WebPage, BreadcrumbList, HowTo-free (plain steps) | crushing, grinding, micronizing, packaging | mining, powder | quality, facilities, contacts | Built |
| `/quality-control/` | Evidence of QC | Talc specification / testing | Quality control and laboratory testing | Talc Quality Control & Lab Analysis — SKZ Laboratory Peshawar | WebPage, BreadcrumbList, ImageObject | lab-1..4, lab reports | powder, talc | contacts | Built |
| `/applications/` | Uses | Talc uses | Where talc is used | Talc Applications: Plastics, Paint, Paper, Ceramics & More | WebPage, BreadcrumbList | lump/powder imagery only | home, talc | lumps, powder, contacts | Built |
| `/facilities/` | Plants/warehouses | Talc plant Peshawar | Facilities | Talc Processing Facilities in Peshawar & Karachi | WebPage, BreadcrumbList, Place | mesh-plant, grinding, export | about, processing | affiliation, contacts | Built |
| `/sustainability/` | Responsibility | Responsible talc mining | Responsibility in practice | Sustainability & Responsible Talc Mining | WebPage, BreadcrumbList | sustainability-hero, partners | home | about | Built |
| `/about/` | Entity credibility | PakTalc | About PakTalc | About PakTalc — Talc Division of SKZ Mining Company | AboutPage, BreadcrumbList | about-hero, team, partners | home | affiliation, facilities | Built |
| `/affiliation/` | Entity relationship | SKZ Mining talc | PakTalc and SKZ Mining Company | PakTalc & SKZ Mining Company — Company Structure | WebPage, BreadcrumbList | charts, SKZ logo | about, footer | skzminingcompany.com | Built |
| `/gallery/` | Evidence | PakTalc photos | Gallery | Photo Gallery — Talc Mines, Plants & Logistics | CollectionPage, BreadcrumbList | gallery-01..27 + page photos | footer | — | Built |
| `/insights/` | Articles hub | — | Insights | Talc Insights — Guides for Industrial Buyers | CollectionPage, BreadcrumbList | article images | nav | articles | Built |
| `/insights/[slug]/` ×4 | Articles | per SEARCH-INTENT-MAP | per article | per article | Article, BreadcrumbList | per article | insights | product pages | Built |
| `/contacts/` | RFQ + contact | Talc quotation | Request a quotation | Request a Talc Quote — Contact PakTalc | ContactPage, BreadcrumbList | — | all CTAs | — | Built |
| `/contacts/thank-you/` | Form confirmation (no-JS path) | — | Thank you | — | — | — | form | home | **noindex**, not in sitemap |
| `/privacy/` | Legal | — | Privacy policy | Privacy Policy | WebPage | — | footer | — | Built |
| `/404` | Not found | — | Page not found | — | — | — | — | hub links | Real 404 via `.htaccess ErrorDocument` |

Legacy URL `/contacts/` is kept as-is (preserves equity). `/contact/` 301 → `/contacts/`.
