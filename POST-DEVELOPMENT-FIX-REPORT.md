# Post-Development Fix Report

Repair pass completed 22 September 2026. Audit: `POST-DEVELOPMENT-AUDIT.md`.
Verified on the production static export (`npm run build`), served locally with PHP (`php -S localhost:8080 -t out`) and a gzip static server for Lighthouse.

## Fixed

### Mobile navigation (P0)
Issue: The hamburger toggled state, but no menu appeared.
Root cause: The drawer was `position: fixed` inside `<header>`. The header's `backdrop-filter` makes it the containing block for fixed children, so the drawer's `top: 64px; bottom: 0` resolved against the 64 px header and gave a **0 px height**.
Files changed: `src/components/SiteHeader.tsx` (rewritten), `src/styles/components.css` (nav/drawer section).
Fix applied: The drawer and a new overlay render as siblings of `<header>`. It is a right-side slide-in (translateX, 300 ms) with the logo, a close button, expandable groups (the current section opens automatically), a Request a quote CTA, email and phone. It closes on overlay tap, the close button, Esc (focus returns to the hamburger), any link tap, or when the viewport grows to desktop. It has scroll lock, `inert` on page content, a focus trap, 52 px rows and 44 px sub-links.
Status: Fixed. Verified at 375 px: drawer 330 × 812 px, every close path, route change unlocks scroll.

### Hero slider and hero content synchronisation (P0)
Issue: There was no working slider; the home hero was a single static image.
Root cause: The first build shipped a single-image hero. Also, **this machine has Windows animations turned off (`prefers-reduced-motion: reduce`)**, and a reduced-motion-disables-autoplay rule would have made any slider look broken to such users.
Files changed: `content/hero.ts` (new), `src/components/HeroSlider.tsx` (new, server), `src/components/HeroSliderController.tsx` (new, client), `src/styles/pages.css` (hero section), `src/components/Icon.tsx` (play/pause), `src/app/page.tsx`.
Fix applied:
- Three slides, each **one data object** (image + mobile crop + eyebrow + title + description + two CTAs). All slides are server-rendered HTML; slide 1 carries the only H1, slides 2–3 use H2.
- **One** index state drives everything, so image and text cannot desync. There is one timer.
- 7 s autoplay (9 s with reduced motion, instant swaps, no drift). Pauses on hover, keyboard focus and hidden tab, and via a pause/play button (WCAG 2.2.2). Manual prev/next/dot restarts the timer.
- Prev/next buttons, labelled progress dots (`aria-current`), ← → keys, touch swipe (pointer events, horizontal-intent check), and `aria-roledescription` carousel/slide with inactive slides `inert` + `aria-hidden`.
- Performance: slide 1 is the priority image with explicit `sizes`. Slides 2–3 are not fetched until 600 ms after `load` (measured: fetch starts ~0.7 s after load). Slide order was chosen so slide 1 has the largest effective image area; otherwise a later slide became the LCP at 11 s. Slides are stacked in one grid cell, so there is no text overflow and CLS is 0.
- Motion: 900 ms crossfade, 8 s subtle 1.06→1 image drift, staggered 18 px text rise. All of it is disabled under reduced motion.
Status: Fixed. Verified: autoplay 1→2→3, next/dot/wrap, keyboard, swipe, one H1, LCP stays on slide 1 (desktop 1.4 s, mobile 0.8 s, local).

### Navigation structure, Home and Gallery links (P1)
Issue: No Home link; Gallery and Contact were hidden inside "Company"; vague "Operations"/"Company" labels.
Root cause: Information-architecture decision in `content/navigation.ts`.
Files changed: `content/navigation.ts`, `SiteHeader.tsx`, `components.css`.
Fix applied: Home · Talc ▾ · Mining & Processing ▾ · Applications · Quality · About ▾ · Gallery · Insights · Contact, plus the Request a quote CTA. Desktop nav shows from 1200 px (it never collides); below that the hamburger shows. The active state covers parents and children (e.g. `/talc/lumps/` highlights Talc).
Status: Fixed.

### Desktop dropdowns (P2)
Issue: The menu could vanish while crossing the gap; hover and click could conflict.
Fix applied: A pointer-intent controller with a 160 ms close delay. The panel's top padding acts as a hover bridge. Click/Enter/Space/↓ open (↓ focuses the first item), Esc closes and refocuses the trigger, and outside click closes. There is a no-JS hover/focus-within fallback.
Status: Fixed.

### Missing images (P1/P2)
Files changed: `src/app/facilities/page.tsx`, `src/app/sustainability/page.tsx`, `src/app/affiliation/page.tsx`, `src/app/{talc/lumps,talc/powder,mining-operations,quality-control,facilities,about}/page.tsx`, `src/components/Picture.tsx` (`SideFigure`).
Fix applied:
- Facility site cards now have location-confirmed photos (mesh-plant signage; Peshawar yard). Karachi uses a neutral storage photo labelled "Representative photo".
- Sustainability plantation uses a green-hillside mine site (temporary). Farming, which has no authentic photo, gets a designed key-points panel.
- Heading-only split sections (Lumps and Powder "What to include", Mining overview, Quality test parameters, Facilities equipment, About mission) now carry a best-fit authentic photo under the heading.
- The Affiliation header uses the SKZ Mining Company Peshawar office photo.
- A homepage gallery preview was added.
- Remaining genuine gaps are listed as IMAGE_MISSING in the audit.
Status: Fixed (with documented gaps).

### Incorrect or repeated images (P2/P3)
Fix applied:
- Sustainability "site practice" no longer shows grinding machinery; it shows a mine site and hand sorting.
- Quality "grade segregation" uses a stockpile yard instead of the reused truck photo. The lab section now uses an inspection photo instead of a duplicate.
- Facilities hero changed so it doesn't duplicate its first site card.
Status: Fixed.

### Cards, card heights and image ratios (P1)
Root cause: Every page hand-built its cards; there was no shared component.
Files changed: `src/components/Card.tsx` (new `Card` + `CardGrid`), `components.css` (card system), `page.tsx`, `talc/page.tsx`, `insights/page.tsx`, `facilities/page.tsx`.
Fix applied:
- One card: fixed media ratio per family (products 4:3, editorial 3:2, articles 16:9), `height: 100%` flex column, `flex: 1` body, CTA pinned to the bottom.
- Eyebrow + meta line, stretched-link click area (one tab stop), focus ring, 2 px hover lift, 1.035 image scale and arrow nudge.
- In a 2-up tablet grid an odd last card spans full width.
- **Per feedback:** cards in two-column grids are horizontal on desktop (image 44 % | text). The Talc forms card went from 688 px to 360 px tall.
Status: Fixed.

### "Read more" cards lacking context (P2)
Fix applied: Every card now has an eyebrow/category, a 2–3 line description and a specific CTA ("Explore talc lumps", "Read the guide", "View process", "Lab reports & methods"). Articles gained a `category` field and dates on cards.
Status: Fixed.

### Related links (per feedback)
Fix applied: "Continue reading" / "Related pages" rows are now small cards with a best-fit thumbnail for each destination (route → image map in `sections.tsx`; articles use their hero image).
Status: Fixed.

### Buttons and CTAs (P2)
Fix applied: Standard vocabulary: primary **Request a quote**; secondary **Explore talc / Learn more / View process / View gallery / All insights**; contextual **Ask about talc lumps / Ask about talc powder**. The final band defaults to "Discuss your talc requirements". CTAs were added where a next step was missing: after the process explorer, applications list, quality and supply sections, gallery preview and insights.
Status: Fixed.

### Gallery (P2)
Fix applied: A uniform 4:3 cover grid (2/3/4 columns). Category filter chips (All, Talc, Mining, Sorting, Processing, Storage & logistics, Quality & laboratory, Team & field work) in a `role="toolbar"`, with `aria-pressed`. The lightbox cycles only through visible images. All images stay in the HTML; without JS every category shows.
Status: Fixed.

### Animation issues (P1)
Root cause: A clip-path "mask" reveal could leave images blank if the observer never fired.
Fix applied: One motion standard (opacity + 20 px, 600 ms, 70 ms stagger) with the mask removed. A 2.5 s failsafe reveals everything, and content is never hidden without JS.
Status: Fixed.

### Mobile, tablet and desktop responsiveness (P1/P2)
Fix applied:
- The phone process explorer uses compact thumbnail rows.
- Phone section spacing is tighter (`--section-y: 3.25rem`).
- Phone hero H1 is clamped (2.05–2.6 rem) and hero CTAs are full width.
- The about photo gets a landscape crop below 896 px.
- On tablet, the 2-up explorer and card grids handle an odd last card.
- Desktop nav appears only at 1200 px and up.
Verified: **21 routes × 9 viewports** (360×800 … 1920×1080) with no horizontal overflow, no HTTP errors and no console errors.
Status: Fixed.

### Broken links, favicon, redirects
Fix applied:
- `public/favicon.ico` (PNG-in-ICO 16/32/48) generated; it caused the 404s.
- `.htaccess` legacy and image rules now come first with absolute `https://paktalc.com` targets, so every old URL resolves in one hop.
- The checker verifies every internal href, src and srcset.
Status: Fixed.

### Accessibility
Fix applied:
- Hero slides changed from `<article role="group">` (not allowed) to `<div role="group">`.
- "Learn more" links on process steps get a screen-reader suffix ("…about exploration"), which also fixes Lighthouse `link-text`.
- The yield-bar contrast is fixed.
- The drawer is a labelled `dialog` with focus management.
Status: Fixed. Lighthouse accessibility 100 on Home, Processing and Gallery.

## QA results (final)
| Check | Result |
|---|---|
| `npm run build` (Next 16 static export + postbuild) | Pass |
| `tsc --noEmit` | Pass |
| `eslint .` | Pass (0 warnings) |
| `npm run check` (links, meta, canonical, H1, headings, img attrs, JSON-LD, sitemap, robots) | Pass, 24 HTML files |
| CDP sweep: 21 routes × 9 viewports | No overflow / 4xx / console errors |
| Lighthouse mobile (gzip server): Home / Processing / Gallery | A11y 100/100/100 · BP 100 · SEO 100 · CLS 0 · Perf 67 / 76 / 82 (simulated) |
| Real-browser paint (local) | FCP/LCP ≈ 0.25 s on content pages; home LCP 0.8–1.4 s |
| RFQ form (browser) | Validation, token, submit → success state ✔ |

## Remaining issues
- **Lighthouse mobile Performance 67–82 (simulated).** The remaining cost is Next.js/React hydration JS (~150 KB gz framework). There are no render-blocking resources, CLS is 0 and real-browser paints are fast. Confirm with field data (CrUX / Search Console) after launch; further gains would need less hydrated DOM (e.g. fewer client components).
- **Image gaps** (no authentic photos exist): Karachi warehouse, plantation, farming, application imagery. See IMAGE_MISSING in the audit.
- **404 status** can only be verified on Apache (`ErrorDocument 404` in `.htaccess`); PHP's dev server falls back to the home page.
- Content facts still awaiting company confirmation: see `CONTENT-VERIFICATION.md`.
