# SEO / AEO / GEO Strategy

## Positioning
PakTalc builds topical authority on **talc only**: forms (lumps, powder), origin, mining, processing, quality, packing and applications.
SKZMiningCompany.com owns the multi-mineral topics. Both sites currently publish the same three blog posts. The new site replaces them with original talc content and 301s the old URLs.

## Technical foundation
- Static HTML for every page, with all content in the document (no JS-only tabs or carousels).
- One canonical host `https://paktalc.com`, HTTPS, non-www, trailing slash. All three are enforced in `.htaccess`.
- `metadataBase` + per-page `alternates.canonical`, unique title/description, OG + Twitter cards using the prepared 1200×630 OG files.
- `sitemap.xml` generated from the route list plus Insights front-matter dates. Excludes thank-you, 404 and API.
- `robots.txt`: allow all, including `OAI-SearchBot`, `PerplexityBot`, `Googlebot`, `Bingbot`. **GPTBot / Google-Extended / CCBot** (training crawlers) are also allowed by default, controlled by one flag in `content/seo.ts` (`allowAITraining`) because that is a business decision.
- Breadcrumbs (visible and `BreadcrumbList`) on every page below home.
- Real 404 status, one-to-one 301s for every legacy URL, and 301s for old WordPress image URLs.
- `max-image-preview: large` + `max-snippet: -1` for Google (photo-led site), image entries in `sitemap.xml`, and a preloaded hero AVIF for LCP.
- Buyer FAQs (visible + FAQPage) on the talc hub and both product pages: answer-first text that search and AI answer engines can quote.

## On-page rules
- Exactly one H1, sequential H2/H3.
- Answer-first: every key page opens with a 1–2 sentence plain-text definition ("Talc lumps are…").
- Descriptive anchors ("talc powder mesh options"), with no sitewide exact-match footer spam.
- Facts that AI systems should cite (who PakTalc is, relationship, products, where processing happens, how to request a quote) appear as plain sentences on the canonical page.

## Entity model (JSON-LD)
`Organization` PakTalc (`@id https://paktalc.com/#organization`) → `parentOrganization` SKZ Mining Company Pvt. Ltd. (`@id https://skzminingcompany.com/#organization`, `url`, `sameAs` skzminingcompany.com).
Shokozan is **not** modelled until the relationship is verified (CONTENT-VERIFICATION A8).

## AI discoverability
- `/llms.txt` generated at build from the `content/` modules, so it never goes stale.
- No fake FAQs. Question-style H2s are used only where the page genuinely answers them.

## Content roadmap (post-launch, only with real input)
1. Talc colour variations (coffee/white/grey/green) and typical uses. Needs input from the company geologist.
2. Packing & export checklist for talc buyers (documents, jumbo vs 25 kg). Needs verified logistics details.
3. Responsible talc mining. Needs sustainability photos (currently a known gap).

## Measurement
Search Console (Domain property), with the sitemap submitted. Monitor: page indexing, CWV, image indexing, queries per cluster in SEARCH-INTENT-MAP.
