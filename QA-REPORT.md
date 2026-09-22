# QA Report

Date: 22 September 2026. Build: Next.js 16.3.5 static export + PHP 8 RFQ backend.

| Area | Status |
|---|---|
| Pages completed | 17 routes + 4 Insights articles + thank-you + 404 (see SITEMAP.md) |
| Responsive | 21 routes × 9 viewports (360–1920): no horizontal overflow; visual review at 390 / 820 / 1280 / 1440 |
| Images | All from the prepared package; every src/srcset resolves (checker); alt from the manifest; hero priority only; no upscaling of small crops |
| SEO metadata | Unique title/description/canonical/OG on every indexable page (checker); Lighthouse SEO 100 |
| Structured data | Organization (+ parent SKZ), WebSite, WebPage types, BreadcrumbList, Product (no offers/ratings), Article, ImageObject, Place. All parse (checker) |
| Sitemap | 20 canonical URLs; excludes thank-you/404/api |
| Robots | Allows all incl. OAI-SearchBot; references the sitemap; training-bot flag in `content/seo.ts` |
| Redirects | 29 page rules + 102 image rules, single hop, absolute targets; no chains (enforced by postbuild) |
| Accessibility | Lighthouse 100 on sampled pages; skip link, landmarks, one H1, focus rings, labelled controls, drawer focus trap, reduced motion |
| Performance | CLS 0; measured FCP/LCP ≈ 0.8 s; Lighthouse mobile (clean profile, gzip router): Home 79, Talc lumps 76, Contact 90; A11y/BP/SEO 100. Homepage HTML 191 KB raw / 26 KB gz (was 396/66 before disabling inlineCss). Remaining gap = framework JS (~115 KB gz) |
| Security | PHP: origin check, HMAC single-use token + min fill time, honeypot, per-IP rate limit, optional Turnstile, strict validation, CR/LF guard, escaped email body, secrets outside web root. Apache: CSP, nosniff, Referrer-Policy, Permissions-Policy, COOP, HSTS (HTTPS only), dotfile deny |
| Form | Tested end-to-end (valid, invalid, too-fast, replay, foreign origin, honeypot, header injection, no-JS redirect) |
| Content requiring verification | `CONTENT-VERIFICATION.md` |
| Missing assets | `IMAGE-USAGE.md` → Gaps |
| Known limitations | 404 status and `.htaccess` behaviour need verifying on the Apache host; CSP needs `'unsafe-inline'` scripts (Next static export) |

Detailed repair log: `POST-DEVELOPMENT-FIX-REPORT.md`.
