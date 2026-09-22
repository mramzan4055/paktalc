# Worklog

## 2026-09-22 — Build
- Discovery: crawled paktalc.com (19 sub-sitemaps; 11 real pages, 3 real posts, ~40 Industrium demo URLs) and skzminingcompany.com; read the image package, lab report scans and structure/supply-chain diagrams.
- Found that the old "spec table" SiO₂/MgO/H₂O values equal the theoretical talc composition, so they are not published as a company spec (CONTENT-VERIFICATION C3).
- Control docs, content system (`content/*.ts`), design tokens, components, 17 routes + 4 articles.
- Static export + postbuild (`.htaccess`, `llms.txt`); PHP RFQ backend with token/honeypot/rate limit; `scripts/check-site.mjs`.
- QA: fixed upscaling of 480 px crops, report-scan overflow, duplicate ids, a contrast issue, and prefetch/CSS inlining/font trimming for performance.

## 2026-09-22 — Post-development repair pass
- P0: mobile drawer collapsed to 0 px (fixed-position child inside a backdrop-filter header). Moved outside the header and rebuilt as an accessible slide-in drawer.
- P0: built a 3-slide synchronised hero slider (single index, autoplay, controls, swipe, keyboard, deferred later slides, LCP-safe slide order). Autoplay works under reduced motion (this machine has OS animations off).
- Navigation: Home, Gallery and Contact top-level; desktop nav from 1200 px; intent-delay dropdowns.
- Card system (`Card`/`CardGrid`); horizontal 2-up cards on desktop (feedback: cards too big); related links as small thumbnail cards (feedback).
- Images: removed machinery from sustainability, location-confirmed facility photos, side photos in heading-only sections (feedback), Affiliation hero, homepage gallery preview, gallery uniform grid + filter.
- Motion: single reveal standard + failsafe. `favicon.ico`. Single-hop absolute redirects.
- QA: 21 routes × 9 viewports clean; Lighthouse A11y/BP/SEO 100.
