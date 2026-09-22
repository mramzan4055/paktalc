# PakTalc.com — Project Context

Read this first if context is lost.

## What this is
A full rebuild of https://paktalc.com/ (currently WordPress + the "Industrium" demo theme) as a
talc-focused international B2B website for **PakTalc, a division of SKZ Mining Company Pvt. Ltd.**

- Parent/reference: https://skzminingcompany.com/ (multi-mineral; same WP theme, same 3 blog posts)
- PakTalc = **talc only**. Other SKZ minerals are mentioned only to explain SKZ.
- Corporate wording used everywhere: "PakTalc — a division of SKZ Mining Company Pvt. Ltd."
  (the exact wording published on the current site). Shokozan Mining Co., Ltd. (Japan) appears
  above SKZ in the company's own structure chart; the legal relationship is `VERIFY_REQUIRED`.

## Stack (decided)
| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router, TypeScript, React 19 | Requested; server components by default |
| Rendering | `output: "export"` static HTML, `trailingSlash: true` | Full HTML for crawlers; deploys to ordinary PHP/Apache hosting; trailing slashes match legacy WP URLs |
| Styling | Plain CSS with design tokens (`src/styles/*.css`) | No framework weight; tokens documented in DESIGN-SYSTEM.md |
| Fonts | `next/font` (self-hosted at build): Saira (display) + IBM Plex Sans (body) | No runtime Google request, `font-display: swap` |
| Images | Prepared package (`images.json`) rendered via `<Picture>` → `<picture>` AVIF/WebP | Package already has srcsets/crops; `next/image` optimisation is unavailable in static export anyway |
| Motion | ~1 KB IntersectionObserver + CSS; no animation library | Performance; honours `prefers-reduced-motion` |
| RFQ form | **PHP** endpoint `public/api/rfq.php` (+ `rfq-token.php`) | Requested; runs on the same host as the static export |
| Redirects / headers | Generated Apache `.htaccess` (`scripts/postbuild.mjs`) | Static export cannot run Next redirects/headers |

## Directory map
```
content/            ← ALL business copy + facts (data, not presentation)
src/app/            ← routes (one folder per URL)
src/components/     ← presentation components
src/lib/            ← images manifest helpers, SEO/metadata, JSON-LD builders
src/styles/         ← tokens.css, base.css, components.css, pages.css
public/images/      ← prepared asset package (DO NOT RENAME)
public/api/         ← PHP RFQ handler (copied into out/api/)
php-private/        ← config template for secrets (deploy OUTSIDE web root)
scripts/            ← postbuild (.htaccess, llms.txt), site checker
images.json, paktalc-image-map.csv, paktalc-image-redirects.csv, PAKTALC-IMAGE-PLAN.md ← asset package (source of truth)
```

## Commands
- `npm run dev` — local dev (the PHP form needs a PHP server, see README)
- `npm run build` — static export to `out/` + `.htaccess`, `llms.txt`
- `npm run check` — crawl `out/` for links, metadata, H1s, JSON-LD validity, image attributes

## Source-of-truth order
1. Supplied project files (lab report scans, structure/supply-chain diagrams in `public/images`)
2. Asset manifest (`images.json`)
3. Existing paktalc.com (only where not contradicted and not template text)
4. skzminingcompany.com
5. General mineral science (for "what is talc" type explanations only)

Anything uncertain → `CONTENT-VERIFICATION.md`, conservative wording on site.
