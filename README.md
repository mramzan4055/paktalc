# PakTalc.com

Talc-focused B2B website for **PakTalc, a division of SKZ Mining Company Pvt. Ltd.**
Next.js 16 (App Router, TypeScript) is exported to static HTML. The enquiry form is handled by a small **PHP** backend on the same host.

## Quick start
```bash
npm install
npm run dev          # http://localhost:3000 (the PHP form does not run under next dev)
npm run build        # static export to out/ + .htaccess, llms.txt, redirects.json
npm run check        # crawl out/: links, meta, canonicals, H1s, JSON-LD, images, sitemap, robots
npm run lint && npm run typecheck
```
Test the full site including the form: copy `php-private/config.example.php` → `php-private/config.php` (set `secret`, `transport: 'log'`), then run:
```bash
php -S localhost:8080 -t out
```
Emails are written to `php-private/storage/outbox/*.eml`.

## Deploying (Apache / cPanel)
1. `npm run build`
2. Upload the **contents of `out/`** (including `.htaccess`, `api/`, `_next/`) to `public_html/`.
3. Upload `php-private/` **next to** `public_html` (not inside it). Create `config.php` from the example: a long random `secret`, SMTP credentials, `allowed_origins`, and optionally `turnstile_secret`. Make `php-private/storage/` writable by PHP.
4. Optional spam check: build with `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...` and set `turnstile_secret`.
5. Requirements: PHP ≥ 8.1, Apache with `mod_rewrite`, `mod_headers`, `mod_deflate`. Behind Cloudflare, set `trust_proxy: true`.
6. HTTPS must work before HSTS matters (the header is only sent over HTTPS).

## Where things live
| Path | What |
|---|---|
| `content/*.ts` | **All copy and facts** (company, talc data, lab reports, operations, applications, insights, hero slides, navigation, SEO, redirects) |
| `src/app/` | Routes |
| `src/components/` | UI: `SiteHeader` (nav + drawer), `HeroSlider`, `Card`, `Picture`, `Explorer`, `StepTimeline`, `Lightbox`, `GalleryFilter`, `RfqForm` |
| `src/styles/` | `tokens.css` (design tokens), `base.css`, `components.css`, `pages.css` |
| `public/images/` | Prepared image package. **Do not rename**; slots are defined in `images.json` |
| `public/api/` | PHP RFQ endpoint (`rfq.php`, `rfq-token.php`, `_lib/`) |
| `scripts/postbuild.mjs` | Generates `.htaccess` (single-hop 301s, image 301s, headers, caching, 404) and `llms.txt` |
| `scripts/check-site.mjs` | Static QA crawler |

## Editing content
Change facts in `content/*.ts` and rebuild. Pages, JSON-LD, sitemap and `llms.txt` all read from the same modules. Before publishing new claims (certifications, markets, capacities), check `CONTENT-VERIFICATION.md`.

## Documentation
`PROJECT-CONTEXT.md` · `CONTENT-INVENTORY.md` · `CONTENT-VERIFICATION.md` · `SITEMAP.md` · `SEARCH-INTENT-MAP.md` · `DESIGN-SYSTEM.md` · `SEO-STRATEGY.md` · `IMAGE-USAGE.md` · `REDIRECT-PLAN.md` · `SCHEMA-PLAN.md` · `QA-REPORT.md` · `LAUNCH-CHECKLIST.md` · `POST-DEVELOPMENT-AUDIT.md` · `POST-DEVELOPMENT-FIX-REPORT.md`
