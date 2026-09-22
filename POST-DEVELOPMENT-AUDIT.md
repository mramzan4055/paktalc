# Post-Development Audit

Audited 22 September 2026 against the static export (`out/`), served locally by PHP (`php -S localhost:8080 -t out`).
Methods: in-app browser checks (DOM/JS), headless Chrome over CDP (full-page captures at 360–1920 px, network 4xx/5xx and console capture on all 22 routes), `scripts/check-site.mjs`, Lighthouse 12, and code review.

Severity: **P0** broken functionality · **P1** major UX · **P2** visual · **P3** polish.
Status is updated in `POST-DEVELOPMENT-FIX-REPORT.md`.

---

### A-01
Page: All (mobile / tablet < 1024 px)
Component: `SiteHeader` → `.drawer`
Problem: Tapping the hamburger toggles `aria-expanded` and the icon changes to ✕, but no menu appears.
Root Cause: The drawer is `position: fixed` **inside** `<header>`, and the header has `backdrop-filter`, which makes it the containing block for fixed descendants. The drawer is inset `top: var(--header-h); bottom: 0` of a 64 px-tall header, so it gets a height of **0 px**: it opens, but invisibly. Measured: `getBoundingClientRect().height === 0` while open.
Severity: P0
Fix: Render the drawer and a new overlay as siblings of `<header>` (outside the backdrop-filter context). Rebuild it as a right-side slide-in drawer (translateX) with a logo, close button, expandable groups, Request-quote CTA, overlay click to close, Esc, focus trap and scroll lock.
Status: Fixed

### A-02
Page: Home
Component: Hero
Problem: No slider. A single static image (`hero-main`); the image plan also assigns `hero-alt-slide` to the home hero.
Root Cause: The first build shipped a single-image hero for LCP reasons. The requested three-slide hero was never built.
Severity: P0 (requested functionality missing)
Fix: New `HeroSlider`. Three slides defined as one data array (image, mobile image, eyebrow, title, text, CTAs), all rendered as server HTML. A client controller drives a single index: autoplay 7 s, prev/next, dots, swipe, keyboard, and pause on hover/focus/hidden tab. Slide 1 is the H1 and priority image; slides 2–3 load after first paint. Reduced motion → no autoplay, instant switch.
Status: Fixed

### A-03
Page: All
Component: Desktop nav (`content/navigation.ts`)
Problem: No Home link. Gallery and Contact are hidden inside the "Company" dropdown. "Operations" and "Company" labels are vague.
Root Cause: The information architecture put Gallery under Company and relied on the logo for Home.
Severity: P1
Fix: Top level becomes Home · Talc ▾ · Mining & Processing ▾ · Applications · Quality · About ▾ · Gallery · Insights · Contact, plus the Request a quote CTA. The desktop nav breakpoint moves to 1200 px so the nine items never collide. The active state covers parents.
Status: Fixed

### A-04
Page: All (desktop)
Component: Dropdown menus
Problem: A menu can close while the pointer crosses the 6 px gap, and the click toggle fights hover on hybrid devices.
Root Cause: A CSS-hover-only bridge with no close delay.
Severity: P2
Fix: A pointer-intent controller with a 150 ms close delay. Click/Enter/Space/ArrowDown open, Esc closes, and focus returns to the trigger.
Status: Fixed

### A-05
Page: Home, Talc, Insights, Applications
Component: Cards
Problem: Card markup is hand-built per page. Heights differ within a row (Home products: 1.35fr/1fr/0.8fr with a text-only third box). Some cards have no CTA line (Talc "Processing and quality", Home and Insights article cards). Image ratios are mixed (portrait powder bag forced into a landscape box).
Root Cause: No shared card component.
Severity: P1
Fix: A single `<Card>` component. The media box has a fixed ratio per family (products 4:3, editorial 3:2, articles 16:9), a flex column body, and a bottom-aligned CTA. There is an optional eyebrow/meta, the whole card is clickable via a stretched link, and hover/focus states are consistent. It is applied to every card grid.
Status: Fixed

### A-06
Page: Home
Component: Insights cards
Problem: The cards show only title and excerpt, with no category, date or CTA ("Read more" context missing).
Root Cause: See A-05.
Severity: P2
Fix: Eyebrow ("Buyer's guide" / "Technical" / "Process" / "Applications"), date, 2-line excerpt, "Read the guide →".
Status: Fixed

### A-07
Page: Sustainability
Component: "Site practice" evidence photos
Problem: It shows a grinding mill/dust collector and plant workers, i.e. processing machinery in a sustainability section.
Root Cause: The photos were chosen for "dust collection" evidence, but they read as processing.
Severity: P2
Fix: Use a green-hillside mine site (`gallery-13`) and hand sorting at the face (`sorting-3`). The plantation area uses `sustainability-teaser` (mine site with vegetation) as a documented temporary image. Farming has no suitable authentic photo, so it gets a designed text panel (IMAGE_MISSING recorded).
Status: Fixed

### A-08
Page: Facilities
Component: Site cards
Problem: The three site cards are text-only, so the section looks empty.
Root Cause: Photos were removed earlier because location attribution was unverified.
Severity: P2
Fix: Use only location-confirmed photos. Peshawar mesh plant → `mesh-plant-peshawar` (signage). Peshawar yard → `export-4` (alt text says Peshawar warehouse yard). Karachi has no confirmed photo, so it uses `export-5` (bagged storage) as a clearly neutral placeholder captioned "Bagged product in storage" (IMAGE_MISSING recorded).
Status: Fixed

### A-09
Page: Quality, Mining, Processing, Facilities
Component: Images
Problem: `export-4` (the Peshawar yard truck) is repeated on four pages.
Root Cause: Over-reuse.
Severity: P3
Fix: Quality "grade segregation" → `gallery-01` (stockpile yard). Mining keeps `export-4`; Processing intake and Facilities keep it (they are its location-confirmed uses).
Status: Fixed

### A-10
Page: Gallery
Component: Grid
Problem: The masonry grid mixes portrait, square and landscape thumbnails of very different sizes, and there is no filter.
Root Cause: A CSS-columns layout at native aspect ratios.
Severity: P2
Fix: A uniform 4:3 cover grid, category filter chips (All / Talc / Mining / Sorting / Processing / Logistics / Quality / Team & field work), and a full-image lightbox (unchanged, keyboard accessible). All images stay in the HTML.
Status: Fixed

### A-11
Page: Home
Component: Gallery preview
Problem: Missing. The homepage gives no visual entry point to the gallery.
Severity: P3
Fix: A compact "Inside our operations" 6-image grid with a View gallery CTA.
Status: Fixed

### A-12
Page: All
Component: Reveal animation (`data-reveal="mask"`)
Problem: The clip-path mask keeps images fully hidden until the observer fires. In edge cases (fast scroll, restored scroll position, tall element under a 12 % threshold) images appeared blank.
Root Cause: A mask reveal with no failsafe, and a different animation from every other reveal.
Severity: P1
Fix: A single motion standard (opacity + 20 px rise, 600 ms, 70 ms stagger). The mask is removed. There is a 2.5 s failsafe that reveals everything, elements already in view are revealed on load, and reduced motion shows everything immediately.
Status: Fixed

### A-13
Page: All
Component: CTAs
Problem: Labels are inconsistent: "Explore our talc", "Product forms", "Follow the process", "Discuss your specification", "Ask about…", "Request a lumps quote".
Severity: P2
Fix: Standard set: primary **Request a quote**; secondary **Explore talc / Learn more / View process / View gallery**; contextual **Ask about talc lumps / Ask about talc powder**. The final band defaults to "Discuss your talc requirements".
Status: Fixed

### A-14
Page: All
Component: Footer
Problem: No Home, Gallery-as-primary or Contact link in the link columns.
Severity: P2
Fix: Columns rebuilt: Talc / Mining & Processing / Company (Home, About, Affiliation, Sustainability, Gallery, Insights, Contact).
Status: Fixed

### A-15
Page: All
Component: `/favicon.ico`
Problem: Browsers request `/favicon.ico` → 404 (two console 404s observed).
Severity: P3
Fix: Generate `public/favicon.ico` (PNG-in-ICO, 16/32/48) from the prepared favicon.
Status: Fixed

### A-16
Page: Deployment
Component: `.htaccess`
Problem: An old `http://www.` legacy URL would take 2 hops (host → https, then legacy 301).
Severity: P2
Fix: Legacy page and image rules run first with absolute `https://paktalc.com/…` targets, so every legacy URL resolves in one hop.
Status: Fixed

### A-17
Page: Talc lumps
Component: Yield bars
Problem: White on olive-500 has 4.03:1 contrast (Lighthouse).
Severity: P2
Fix: olive-600 (≥ 4.5:1).
Status: Fixed (before this pass)

### A-18
Page: Home (tablet 768–1023)
Component: Products grid
Problem: The two product cards plus a full-width help box leave an unbalanced third row.
Severity: P2
Fix: The shared card grid (2-up on tablet, 3-up at ≥ 1024) with the help content moved into a card of the same family.
Status: Fixed

## Checked and OK (no action)
- All 22 routes return 200 with no console errors, no hydration warnings and no 4xx/5xx sub-requests (CDP crawl).
- No horizontal overflow at 360 / 430 / 768 / 820 / 1024 / 1440 / 1920 on any route.
- No placeholder UI text: repository search for `Lorem`, `Coming soon`, `href="#"`, `javascript:void`, `example.com` (only in form placeholders / test fixtures), `dummy`, `demo` in visible copy.
- JSON-LD valid on all pages; sitemap/robots correct; one H1 per page.
- RFQ form: client validation, server validation, token, honeypot, rate limit, replay and origin protection all verified end-to-end.

## IMAGE_MISSING
```text
IMAGE_MISSING:
Page: /facilities/
Section: Sites — Sorting & packing warehouse, Karachi
Required visual: Exterior or interior of the Moach Goth warehouse (packing / container loading)
Reason: No photo in the package is confirmed as Karachi. Temporary: export-5 (bagged storage), captioned neutrally.

IMAGE_MISSING:
Page: /sustainability/
Section: Fruit-tree plantation
Required visual: Plantation work near mining areas
Reason: None in the package. Temporary: sustainability-teaser (mine site among vegetation), captioned neutrally.

IMAGE_MISSING:
Page: /sustainability/
Section: Japanese farming techniques
Required visual: Farm / drip irrigation with local farmers
Reason: No related authentic image. Text panel only; no substitute used.

IMAGE_MISSING:
Page: /applications/
Section: Each industry block
Required visual: Application imagery (plastics parts, paint, paper, ceramics…)
Reason: The package has none. The plan allows only clearly labelled illustrations. Kept as text blocks with icons; no stock photos.
```
