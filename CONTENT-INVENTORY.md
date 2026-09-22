# Content Inventory — paktalc.com (crawled 22 Sep 2026)

Crawled from the All-in-One-SEO sitemap index (19 sub-sitemaps). Every reachable URL is listed.
Decisions: **KEEP / REWRITE / MERGE / REMOVE / VERIFY**.

## Real pages

| Source URL | Topic | Decision | Destination | Reason / notes |
|---|---|---|---|---|
| `/` | Home | REWRITE | `/` | Keeps "division of SKZ", talc origin, product forms, sustainability themes. Removes demo features (oil & gas, atomic energy, wood processing), fake team counters, "Industrium co" partner, demo California address & +1 phones, 3 unattributed testimonials, unverified export markets |
| `/about/` | Company | REWRITE | `/about/` | Keeps overview, mission/vision (condensed), team roles, facility themes. Removes demo history timeline (1982/1995/2005/2017 with fish-name filler), placeholder certification sentence ("specific certifications can be listed here…"), "globally recognized" claims |
| `/services/talc/` | Talc product | REWRITE + SPLIT | `/talc/`, `/talc/lumps/`, `/talc/powder/`, `/applications/` | Application texts merged into `/applications/`. Grade cards (cosmetic/pharma "USP/EP/BP", "asbestos-free", "safe for skin") **removed** – no supporting documents |
| `/services-products-page/` | Services | MERGE | `/talc/powder/` (custom grinding), `/processing/`, `/quality-control/`, `/sustainability/` | Import-of-niche-talc service → VERIFY; "ISO 9001 compliance, REACH-ready" removed |
| `/mining-operations/` | Operations | REWRITE | `/mining-operations/`, `/processing/`, `/quality-control/` | Non-talc sections (pink salt, calcium carbonate, bauxite, barite) removed. "AI-based exploration", "automated drilling", "satellite imaging", "ISO-certified labs", ISO 9001/14001, SGS/BV, plants in Hiroshima/Gilgit → VERIFY, not published |
| `/applications/` | Applications | KEEP (edited) | `/applications/` | Solid, general mineral-science text. Rewritten to add "what buyers evaluate"; product-safety/regulatory promises removed |
| `/affiliation/` | SKZ relationship | KEEP (restructured) | `/affiliation/`, `/facilities/`, `/talc/` | **Most factual page on the site**: structure, branches, meshing plants (250–2500 mesh, hammer & Raymond mills), warehouses, spec table, colour grades, lump/powder ratios. Personal names of managers moved to VERIFY (consent) |
| `/sustainability/` | Sustainability | REWRITE | `/sustainability/` | Keeps tree plantation, Japanese farming techniques, geology training, local employment, dust control. Removes ISO 14001 claim, "OHSAS 18001 or ISO 45001 equivalent", "closed-loop water recycling" (unverified) |
| `/gallery/` | Gallery | REWRITE | `/gallery/` | Text described salt mines, Tokyo plant, "climate-controlled storage", "pharmaceutical-grade packaging" – removed. Gallery now built from 27 + page photos |
| `/contacts/` | Contact | REWRITE | `/contacts/` (URL kept) | Lahore address vs Islamabad head office conflict → VERIFY. Form rebuilt as B2B RFQ |
| `/news-updates/` | News hub | REMOVE → 301 | `/insights/` | Only placeholder headings ("New Mining Site Acquisitions"…); no actual news |
| `/blog-classic/` | Theme demo | REMOVE → 301 | `/insights/` | Theme listing page |
| `/category/blog/` | Category | REMOVE → 301 | `/insights/` | |

## Posts

| Source URL | Decision | Destination | Reason |
|---|---|---|---|
| `/2025/03/20/why-talc-is-essential-for-modern-industries/` | REWRITE | `/insights/talc-in-industry/` | Thin (≈150 words) and duplicated verbatim on skzminingcompany.com. Replaced by a substantive article |
| `/2025/03/20/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/` | MERGE | `/sustainability/` | SKZ-level topic, duplicated on SKZ site |
| `/2025/03/20/empowering-future-geologists-skzs-training-development-programs/` | MERGE | `/sustainability/#training` | SKZ-level topic, duplicated on SKZ site |
| `/2022/08/02/creation-of-industrial-projects-around-the-world/` | REMOVE → 301 | `/insights/` | Theme demo post |

## Template garbage (all REMOVE; 301 to nearest relevant page, never blanket-to-home)

| Group | URLs | Destination |
|---|---|---|
| Demo services | `/services/industrial-cleaning-and-degreasing/`, `-2/`, `/services/chemical-processing-of-super-alloys-2/`, `/services/acidic-and-neutral-pickling-2/` | `/talc/` |
| SKZ non-talc products | `/services/calcium-carbonate/`, `/services/himalayan-pink-salt/`, `/services/salt-dolomite/`, `/services/salt-sheets-for-steaks/` | `/affiliation/` (explains SKZ's wider range, links out to SKZ) |
| Demo case studies | `/case-studies/*` (13) + category/tag archives | `/insights/` |
| Demo portfolio | `/portfolio/*` (5) + categories | `/gallery/` |
| Demo project | `/projects/dace-pacific-hake-sailbearer-butterflyfish/`, `/projects/`, category | `/gallery/` |
| Demo team | `/team/*` (4 placeholder profiles) | `/about/` |
| Demo vacancies | `/careers/*` | `/contacts/` |
| Archives | `/services/`, `/team/`, `/careers/`, `/portfolio/`, `/case-studies/` | as above |
| Tags | `/tag/factory/`, `/tag/industry/`, `/tag/manufacturing/` | `/insights/` |

Full machine-readable map: `content/redirects.ts` → generated into `out/.htaccess`.

## Other fragments found
- Joinchat WhatsApp widget (no number exposed in HTML) → VERIFY whether a WhatsApp number should be published.
- Social links point to bare `facebook.com/`, `linkedin.com/` etc. (placeholders) plus one personal Facebook profile → not published.
- Footer "© 2025 SKZ Mining" → replaced with PakTalc / SKZ wording.
