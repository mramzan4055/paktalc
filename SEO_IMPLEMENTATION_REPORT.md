# SEO implementation report — paktalc.com

This pass inspected the Next.js 16 static-export codebase and changed it. It does not promise rankings.

## Executive summary

The repository is not the old Industrium theme. It is a static Next.js site (`output: "export"`) whose copy lives in `content/*.ts`, with PHP only for the quote and contact forms. Demo company text, fake counters, fake testimonials, and unsupported certificates are already absent. This pass separated search topics between the homepage and the product pages, stopped the sitemap from inventing a new date on every build, and added the product list to the homepage structured data.

## What the site actually is

| Item | Implementation |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript |
| Rendering | Static HTML export to `out/` |
| Content | `content/*.ts` (no database, no CMS) |
| Forms | `RfqForm` and `ContactForm`, posted to `public/api/*.php` |
| Metadata | `content/seo.ts` via `src/lib/seo.ts` |
| Schema | JSON-LD in `src/lib/schema.ts` |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Redirects | `content/redirects.ts` compiled into `out/.htaccess` |
| Canonical host | `https://paktalc.com` |

Localhost appears only in development mail config, the local PHP server, and Apache rules that skip host redirects on localhost. Public canonicals, Open Graph, and the sitemap use `https://paktalc.com`.

## Critical problems found

The old public URLs (`/services/talc/`, `/blog-classic/`, `/news-updates/`, Industrium archives) are not pages in this codebase. They 301 to the matching new page. A search of the source found no Industrium copy, fish placeholder text, Mountain View address, or “certifications can be listed here”.

Remaining risk is claim risk, not template risk. Certificates, cosmetic-grade status, plant lists, and export markets stay unpublished. See `BUSINESS_VERIFICATION_REQUIRED.md`.

## Keyword-to-URL map

One primary page per commercial topic. Volumes were not invented.

| Topic | Primary URL |
|---|---|
| Talc supplier and exporter in Pakistan | `/` |
| What talc is, grades, origins | `/talc/` |
| Talc lumps | `/talc/lumps/` |
| Talc powder | `/talc/powder/` |
| Grinding and packing process | `/processing/` |
| Mining and sorting | `/mining-operations/` |
| Industrial uses | `/applications/` |
| Laboratory methods and the two sample reports | `/quality-control/` |
| Company entity | `/about/` |
| Parent company and supply chain | `/affiliation/` |
| Quote | `/contacts/` |
| General message | `/contact/` |
| Buyer guides | `/insights/` and the four articles |

## Titles changed in this pass

| URL | Title |
|---|---|
| `/` | PakTalc \| Talc Supplier and Exporter in Pakistan |
| `/talc/` | Talc Grades, Properties and Origins \| PakTalc |
| `/talc/powder/` | Talc Powder Supplier in Pakistan \| PakTalc |

The homepage H1 is now “Talc lumps and powder, supplied from Pakistan.” Other slides stay H2s, so the page has one H1.

## Structured data

Every indexable page emits Organization, the parent SKZ organization, and WebSite, plus that page’s WebPage (and Article, Product, FAQ, or Breadcrumb where the visible content supports it). There is no price, review, or rating markup. “Cosmetic grade talc” was removed from `knowsAbout` because the site does not claim a cosmetic certification. The homepage now also lists the two real products (lumps and powder) as an ItemList.

`dateModified` and sitemap `lastmod` use `contentUpdated` in `content/company.ts` (`2026-09-28`), not the build clock.

## AEO and generative search

Visible FAQs already answer what talc is, lumps versus powder, grades, mesh, testing, and how to request a quote. The homepage FAQ is in the HTML and in FAQPage JSON-LD. `llms.txt` is generated at build for any consumer that wants it. It is not treated as a Google ranking file.

## Technical SEO already in place

- HTTPS and host canonicalisation in `.htaccess`, skipped on localhost
- One-hop 301s from the old WordPress and theme URLs, plus `/about-us/`, `/contact-us/`, and `/blog/` added in this pass
- `robots.txt` allows search and answer-engine crawlers, and disallows `/api/`, `/php-private/`, and thank-you URLs
- Sitemap lists indexable URLs on `https://paktalc.com` only
- Unique title, description, and canonical per route in `content/seo.ts`
- Thank-you pages are `noindex`
- No site search, so there is no SearchAction and no indexable search URLs
- Images are responsive WebP/AVIF from `images.json`
- No analytics ID is present, so none was invented
- IndexNow was not added, because there is no key

## Forms and conversion

Quote and contact forms ask for company, specification, quantity, and destination, require a signed addition check, and send through `contact@paktalc.com`. No SMTP password is in frontend code.

## Files changed in this pass

- `content/company.ts`, `content/seo.ts`, `content/hero.ts`, `content/redirects.ts`
- `src/lib/schema.ts`, `src/app/sitemap.ts`, `src/app/page.tsx`
- `BUSINESS_VERIFICATION_REQUIRED.md`, `SEO_IMPLEMENTATION_REPORT.md`

## Post-deployment checklist

These need the live host or a Google/Bing account. They cannot be finished from the repository.

1. Extract `paktalc-deploy.zip` into `public_html`. It was rebuilt after this pass.
2. Confirm `https://paktalc.com/robots.txt` and `https://paktalc.com/sitemap.xml` return 200.
3. Add the site in Google Search Console and Bing Webmaster Tools, then submit the sitemap.
4. Inspect `/`, `/talc/`, `/talc/lumps/`, and `/talc/powder/`.
5. Send one quote and one contact message and confirm both arrive at `contact@paktalc.com`.
6. Open `https://paktalc.com/php-private/config.php` and confirm it is not readable.
7. Add GA4 only after a real measurement ID exists.
8. Add IndexNow only after a real key exists.
9. Do not add ISO, cosmetic-grade, or pharmaceutical-grade copy until the documents in `BUSINESS_VERIFICATION_REQUIRED.md` are in hand.
