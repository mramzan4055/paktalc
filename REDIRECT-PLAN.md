# Redirect Plan

Machine-readable source: **`content/redirects.ts`** (page URLs) + **`paktalc-image-redirects.csv`** (old WP image URLs).
Both are compiled by `scripts/postbuild.mjs` into `out/.htaccess` as `RewriteRule … [R=301,L]` lines.

Rules followed
- One-to-one mapping to the closest relevant page. Nothing is blanket-redirected to the homepage (only the old home-alias archives go to `/`).
- Single hop: every target is a final 200 URL (the checker verifies that no target is itself a redirect source).
- Kept URLs (no redirect): `/`, `/about/`, `/mining-operations/`, `/applications/`, `/affiliation/`, `/sustainability/`, `/gallery/`, `/contacts/`.
- Host/protocol: `http://` and `www.` → `https://paktalc.com` in one hop. Missing trailing slash → add slash (except files).
- Query strings from WP (`?p=123`, `?page_id=`) aren't mapped individually. `/?s=` search URLs return the home page, which is already canonical.

## Page redirects

| Old | New | Reason |
|---|---|---|
| `/services/talc/` | `/talc/` | New talc hub |
| `/services-products-page/` | `/talc/` | Services merged into product pages |
| `/services/` | `/talc/` | Archive |
| `/services/calcium-carbonate/`, `/services/himalayan-pink-salt/`, `/services/salt-dolomite/`, `/services/salt-sheets-for-steaks/` | `/affiliation/` | SKZ products, explained + linked on Affiliation |
| `/services/industrial-cleaning-and-degreasing/`, `…-2/`, `/services/chemical-processing-of-super-alloys-2/`, `/services/acidic-and-neutral-pickling-2/` | `/talc/` | Theme demo |
| `/industrium_services_category/*` | `/talc/` | Theme taxonomy |
| `/news-updates/`, `/blog-classic/`, `/category/blog/`, `/tag/*` | `/insights/` | Blog structure replaced |
| `/2025/03/20/why-talc-is-essential-for-modern-industries/` | `/insights/talc-in-industry/` | Rewritten article |
| `/2025/03/20/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/` | `/sustainability/` | Merged |
| `/2025/03/20/empowering-future-geologists-skzs-training-development-programs/` | `/sustainability/` | Merged (training section) |
| `/2022/08/02/creation-of-industrial-projects-around-the-world/` | `/insights/` | Demo post |
| `/case-studies/*`, `/industrium_case_study_category/*`, `/industrium_case_study_tag/*` | `/insights/` | Demo |
| `/portfolio/*`, `/industrium_portfolio_category/*`, `/projects/*`, `/industrium_project_category/*` | `/gallery/` | Demo |
| `/team/*`, `/industrium_team_department/*` | `/about/` | Demo profiles |
| `/careers/*` | `/contacts/` | Demo vacancies |
| `/contact/` | `/contacts/` | Common mistype of the kept URL |
| `/feed/`, `/comments/feed/` | `/insights/` | WP feeds (410 would also be fine) |

## Image redirects
`paktalc-image-redirects.csv` has 100+ rows mapping `/wp-content/uploads/...` to `/images/...webp`. Every row becomes an exact-match 301.
Any other unmatched `/wp-content/uploads/*` falls through to the real 404 page. This is deliberate: those were stock or demo images, so no redirect.
