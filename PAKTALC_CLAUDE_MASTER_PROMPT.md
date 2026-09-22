# PAKTALC.COM — COMPLETE WEBSITE REBUILD MASTER PROMPT

Act as a **Principal Web Architect, Senior UI/UX Designer, Technical SEO Engineer, AEO/GEO Strategist, Content Architect, Conversion Designer, Accessibility Specialist, Performance Engineer, and Senior Next.js Developer**.

You are rebuilding:

**Primary website:**  
https://paktalc.com/

**Official parent/reference company:**  
https://skzminingcompany.com/

A prepared website image package is also available in the workspace:

`paktalc-website-images-2026-09-22.zip`

or an already extracted directory similar to:

`paktalc-website/`

The prepared asset package is important and must be treated as the canonical image library for the new website.

The goal is NOT to simply reskin the existing WordPress website.

The goal is to create a **next-generation international B2B mineral/talc website**, significantly more polished, responsive, technically sophisticated and search-friendly than the existing PakTalc and SKZ Mining websites while retaining PakTalc's real content, business identity and authentic company imagery.

---

## 1. CORE BUSINESS POSITIONING

Understand this before writing any code.

PakTalc should be positioned primarily as a **specialized talc-focused brand/division associated with SKZ Mining Company Pvt. Ltd.**

PakTalc's primary topical authority should revolve around:

- Talc
- Talc stone / soapstone
- Talc lumps
- Talc powder
- Talc mining
- Talc extraction
- Talc sorting
- Talc processing
- Crushing
- Grinding
- Micronizing
- Mesh sizes
- Quality control
- Laboratory testing
- Packaging
- Warehousing
- Logistics
- Export
- Talc applications
- Talc supply chain
- Responsible mining
- SKZ Mining relationship

Do NOT turn PakTalc into a general catalogue for every SKZ mineral.

Calcium carbonate, Himalayan pink salt, dolomite, quartz, barite, bauxite and other SKZ minerals may be referenced contextually where needed to explain SKZ Mining, but do NOT create major PakTalc product silos for these minerals unless explicitly instructed.

PakTalc should build deep topical authority around TALC.

This is important for:

- Brand clarity
- Search intent
- SEO topical authority
- Entity recognition
- AI search understanding
- Conversion quality
- avoiding content cannibalization with SKZMiningCompany.com

---

## 2. CRITICAL RULE: DO NOT BLINDLY COPY THE CURRENT WEBSITE

The existing PakTalc website is a **content source**, not a design source and not an unquestionable factual source.

Crawl and analyze the complete existing website before implementation.

Extract:

- navigation
- pages
- headings
- paragraphs
- product descriptions
- operations information
- company information
- contact information
- articles
- blogs
- locations
- plant information
- application information
- sustainability information
- affiliation information
- laboratory information
- available metadata
- existing URLs
- internal links
- old image URLs

For every content block classify it:

`KEEP`  
`REWRITE`  
`MERGE`  
`REMOVE`  
`VERIFY_REQUIRED`

Do NOT automatically publish everything from WordPress.

Specifically identify and remove:

- template/demo copy
- Industrium theme leftovers
- fake/demo company information
- unrelated industries
- placeholder team members
- placeholder counters
- placeholder addresses
- California/demo addresses
- demo telephone numbers
- demo emails
- repeated navigation
- repeated content
- irrelevant oil/gas/atomic/wood industry content
- outdated WordPress shortcodes
- template text
- duplicated sections
- stock-photo claims
- filler paragraphs

Never invent a replacement merely because something was removed.

---

## 3. FACTUAL ACCURACY RULE

Do not invent:

- certifications
- laboratory results
- purity percentages
- mesh ranges
- mine ownership
- facility ownership
- customer names
- export markets
- years of experience
- company founding dates
- production capacity
- monthly tonnage
- annual tonnage
- locations
- pharmaceutical compliance
- cosmetic safety certifications
- ISO certifications
- FDA compliance
- GMP compliance
- international approvals
- awards
- testimonials
- partners
- machinery
- logistics infrastructure

unless supported by official company content/documents supplied to this project.

If an existing claim is questionable, add:

`VERIFY_REQUIRED`

and continue development using conservative wording.

Do NOT stop the complete project just because one fact requires verification.

Keep a file:

`CONTENT-VERIFICATION.md`

containing all facts that require human confirmation.

---

## 4. CURRENT SITE + SKZ SOURCE PRIORITY

Use factual sources in this order:

1. Supplied PakTalc project files/documents
2. Prepared PakTalc asset manifest
3. Existing PakTalc website
4. Official SKZ Mining website
5. Official SKZ/PakTalc-owned media
6. Reputable technical sources for general mineral science only

Do not copy competitors.

Competitors may be researched only for:

- search intent
- information architecture
- missing topics
- UX expectations
- market positioning

Never plagiarize competitor content.

---

## 5. FIRST PHASE — PROJECT AUDIT

Before modifying code, inspect the entire repository.

Determine:

- framework
- framework version
- package manager
- routing architecture
- TypeScript status
- CSS system
- animation libraries
- image implementation
- components
- current pages
- existing metadata
- dependencies
- build configuration
- deployment assumptions

Do NOT unnecessarily rebuild infrastructure that already works.

Do NOT perform an unnecessary framework upgrade.

If this is a Next.js project, continue with the current stable App Router architecture unless there is a strong technical reason otherwise.

Prefer:

- TypeScript
- server components where appropriate
- server-rendered/indexable content
- minimal client-side JavaScript
- reusable components
- clean semantic HTML
- structured content
- modular design system

---

## 6. CREATE PROJECT CONTROL FILES

Before major implementation create:

`PROJECT-CONTEXT.md`  
`TASKS.md`  
`WORKLOG.md`  
`CONTENT-INVENTORY.md`  
`CONTENT-VERIFICATION.md`  
`SITEMAP.md`  
`SEARCH-INTENT-MAP.md`  
`DESIGN-SYSTEM.md`  
`SEO-STRATEGY.md`  
`IMAGE-USAGE.md`  
`REDIRECT-PLAN.md`  
`SCHEMA-PLAN.md`  
`QA-CHECKLIST.md`

Update these throughout development.

The project should remain understandable even after context is lost.

---

## 7. WORK AUTONOMOUSLY PHASE BY PHASE

Do not repeatedly stop and ask me what to do next.

Work through the phases sequentially.

After each phase:

1. validate the work
2. update TASKS.md
3. update WORKLOG.md
4. record unresolved factual issues
5. continue to the next phase

Ask me only if development becomes genuinely impossible without a missing credential, legal/business decision, or unavailable critical asset.

When information is uncertain:

- do not fabricate
- mark it
- use conservative content
- continue the rest of the work

---

## 8. PREPARED IMAGE PACKAGE IS THE IMAGE SOURCE OF TRUTH

Inspect:

`paktalc-website/PAKTALC-IMAGE-PLAN.md`

`paktalc-website/images.json`

`paktalc-website/paktalc-image-map.csv`

`paktalc-website/paktalc-image-redirects.csv`

`paktalc-website/page-previews.jpg`

and:

`paktalc-website/public/images/`

Do NOT rename these images again.

Do NOT regenerate their metadata without reason.

Do NOT replace authentic company images with stock photos.

The package already contains responsive:

- AVIF
- WebP
- mobile crops
- card crops
- banner crops
- social/OG assets

Use the supplied:

- filenames
- srcsets
- alt text
- captions
- widths
- heights
- loading strategies
- page assignments

as the baseline.

---

## 9. IMAGE IMPLEMENTATION

Every image should be implemented correctly.

For each page hero:

- use art-directed mobile and desktop sources when supplied
- use AVIF first
- WebP fallback
- explicit width and height
- responsive `sizes`
- no layout shift
- hero only should normally use eager/fetchPriority high
- all non-critical images should lazy-load

Use semantic `<figure>` and `<figcaption>` when captions add meaning.

Do not repeat the same photograph everywhere simply to fill space.

The supplied image map should determine the strongest page placement.

Preserve original aspect ratio unless a prepared crop exists.

Never upscale low-resolution images.

---

## 10. KNOWN IMAGE GAPS

Respect known asset limitations.

The image package identifies missing/limited areas including:

- confirmed high-resolution talc mine hero photography
- dedicated high-resolution talc powder images
- stronger high-resolution plant interiors
- grade-specific cosmetic/pharmaceutical/industrial photography
- application visuals
- sustainability photography
- stronger port/export logistics photography

Do NOT solve these gaps with random stock images.

Where authentic imagery does not exist:

1. use an existing authentic related photograph where reasonable;
2. use an illustration only where appropriate;
3. clearly separate conceptual visuals from documentary company photography;
4. never make an AI image appear to be a real PakTalc/SKZ mine or facility.

---

## 11. WEBSITE INFORMATION ARCHITECTURE

Start with the following recommended architecture and refine it based on the content audit.

### Main navigation

- Home
- Talc
- Mining & Processing
- Applications
- Quality
- About
- Insights
- Contact / Request Quote

Recommended URL architecture:

`/`

`/about/`

`/talc/`

`/talc/lumps/`

`/talc/powder/`

`/mining-operations/`

`/processing/`

`/quality-control/`

`/applications/`

`/facilities/`

`/sustainability/`

`/affiliation/`

`/gallery/`

`/insights/`

`/insights/[slug]/`

`/contact/`

Potential dedicated application pages may include:

`/applications/cosmetics/`

`/applications/pharmaceuticals/`

`/applications/plastics/`

`/applications/paints-coatings/`

`/applications/paper/`

`/applications/ceramics/`

Only create a separate application page when there is enough verified, unique and useful content.

Do NOT create thin SEO doorway pages.

---

## 12. HOME PAGE — PREMIUM B2B EXPERIENCE

The homepage should immediately communicate:

**WHAT:** Premium talc products and processing.  
**WHO:** PakTalc.  
**RELATIONSHIP:** Part of / division of SKZ Mining, using the exact verified corporate wording.  
**CAPABILITY:** Mine → sorting → processing → quality → packaging → export.  
**CUSTOMER:** International industrial buyers.

Build a premium, editorial-industrial homepage.

Recommended structure:

### 1. Header

Clean premium header.

Desktop:
- logo
- navigation
- dropdown/mega menu where useful
- Request a Quote CTA

Mobile:
- compact header
- accessible animated navigation drawer
- prominent inquiry CTA
- no clutter

### 2. Hero

Use authentic imagery from the prepared asset plan.

Cinematic but professional.

Hero copy should be short, clear and highly relevant.

Example content direction:

Primary:
**Premium Talc. From Source to Global Supply.**

Supporting:
**Mining, processing and supplying talc for demanding industrial applications.**

Do not necessarily use this exact text.

Write the final heading after keyword/content analysis.

Hero should provide:

- clear H1
- short supporting copy
- primary CTA
- secondary CTA
- business trust cue
- appropriate real image

Do not put huge paragraphs inside the hero.

### 3. Trust / Value Proposition

Communicate real differentiators only.

### 4. Talc Products

Strong visual cards for:

- Talc Lumps
- Talc Powder
- relevant verified grades/forms

### 5. Mine-to-Market Story

Interactive or animated process:

Extraction  
→ Sorting  
→ Crushing  
→ Grinding  
→ Quality Control  
→ Packaging  
→ Logistics

Use real supplied photography.

### 6. Why PakTalc

Evidence-based selling points.

### 7. Applications

Visually show where talc is used.

### 8. Quality

Use lab/testing imagery.

Explain quality process without unsupported certification claims.

### 9. Processing / Facilities

Strong industrial photography.

### 10. Global Supply

Explain packaging and export capability.

Use maps only if destinations are factually verified.

### 11. Sustainability

Concise authentic section linked to deeper page.

### 12. SKZ Mining Affiliation

Explain the relationship clearly.

Link to SKZMiningCompany.com where appropriate.

### 13. Insights

Show high-quality talc/mining content.

### 14. RFQ CTA

High-conversion end section.

### 15. Footer

Structured, rich footer containing:

- logo
- concise business description
- product links
- operation links
- useful resources
- verified contact details
- legal links
- social profiles where verified

---

## 13. TALC HUB PAGE

`/talc/` should be one of the strongest pages on the entire website.

It should become a comprehensive authoritative resource about PakTalc's talc offering.

Structure logically around:

- What is talc?
- Talc / soapstone terminology
- Talc composition
- Physical characteristics
- Talc lumps
- Talc powder
- available colours
- available processing
- mesh information if verified
- source/origin information if verified
- laboratory testing
- processing
- packaging
- applications
- quality
- sourcing
- inquiry CTA

Use the prepared:

- talc lump images
- colour-grade imagery
- powder packaging
- lab reports
- origin diagrams

Do not bury valuable information inside sliders.

Important SEO content must exist as normal HTML text.

---

## 14. TALC LUMPS PAGE

Create strong commercial + educational content.

Target natural search concepts such as:

- talc lumps
- talc lumps supplier
- talc lumps exporter
- talc stone
- soapstone
- raw talc
- talc stone Pakistan
- talc lumps Pakistan
- talc supplier Pakistan

Do not keyword-stuff these phrases.

Use natural language and topical relationships.

Include:

- product explanation
- appearance/physical form
- sorting
- processing
- applications
- available variations if verified
- packaging if verified
- supply capability
- image gallery
- inquiry section

---

## 15. TALC POWDER PAGE

Cover:

- talc powder
- grinding
- micronizing
- particle size concepts
- available mesh range only if verified
- quality control
- packaging
- industrial applications
- bulk supply
- product inquiry

Do not make pharmaceutical or cosmetic regulatory claims without supporting documentation.

---

## 16. MINING OPERATIONS PAGE

Build this as a visual narrative instead of a normal corporate text page.

Suggested flow:

Exploration  
↓  
Mine Development  
↓  
Extraction  
↓  
Material Selection  
↓  
Sorting  
↓  
Transport to Processing

Use authentic mine and team photography.

Animations can progressively reveal the process as users scroll.

However:

- no scroll hijacking
- no forced horizontal scrolling on mobile
- content must remain readable without JavaScript animations
- search crawlers must receive the full HTML content

---

## 17. PROCESSING PAGE

Explain the processing chain visually.

Possible sections:

- Raw material intake
- Crushing
- Screening
- Grinding
- Micronizing
- Dust collection
- Quality checks
- Packing
- Storage
- Dispatch

Use real processing equipment photography supplied in the asset library.

Build an advanced interactive process diagram for desktop.

On mobile convert it into an easy vertical sequence.

---

## 18. QUALITY CONTROL PAGE

Create a credible quality page based on evidence.

Use:

- laboratory photographs
- inspection photographs
- sampling
- analysis reports
- process checks

If laboratory reports are published:

- show them clearly
- mention sample/date if available
- do not imply one report describes every shipment
- ensure sensitive/private information is not exposed
- verify values before launch

Do NOT use unverified certification badges.

---

## 19. APPLICATIONS CONTENT

Build useful application content rather than generic AI-written paragraphs.

Potential application clusters:

- Plastics & polymers
- Paints & coatings
- Paper
- Ceramics
- Cosmetics/personal care
- Pharmaceuticals

For every application explain:

- why talc is used
- relevant physical/functional properties
- what buyers generally evaluate
- relevant PakTalc product form where verified

Do not make medical claims.

Do not promise product suitability for regulated use without verification.

---

## 20. ABOUT PAGE

This page should establish entity credibility.

Include verified information about:

- PakTalc
- SKZ Mining relationship
- company expertise
- team
- operations
- facilities
- international activity
- values

Use supplied real:

- management images
- technical team images
- field visits
- office images
- mining team imagery

Do not use fake executives or stock portraits.

---

## 21. AFFILIATION / SKZ PAGE

Explain:

PakTalc ↔ SKZ Mining Company

clearly enough for customers and search systems to understand entity relationships.

Use:

- SKZ logo
- relationship copy
- structure diagram
- supply chain diagrams
- facility context

Link directly to relevant official SKZ pages.

Use proper `sameAs`, `parentOrganization`, `subOrganization`, or equivalent structured-data relationships only when factually correct.

---

## 22. CONTENT SYSTEM

Do not scatter business copy through React components.

Create a proper content system.

Use appropriate structured files such as:

`content/company.ts`

`content/navigation.ts`

`content/talc.ts`

`content/applications.ts`

`content/operations.ts`

`content/facilities.ts`

`content/quality.ts`

`content/seo.ts`

and MDX for long-form Insights where appropriate.

Each major content entity should be reusable.

Separate:

**DATA**  
from  
**PRESENTATION**

This will make later editing easier and improve consistency.

---

## 23. CONTENT QUALITY STANDARD

Avoid generic AI copy such as:

> We are committed to excellence and innovation.

> We provide best-in-class solutions.

> Your trusted partner.

unless supported by meaningful explanation.

Prefer evidence.

For example, instead of:

> We ensure superior quality.

explain:

- where inspection occurs
- how sorting works
- what laboratory testing checks
- how material is processed
- how packaging happens

First-hand operational detail is more useful than marketing adjectives.

---

## 24. SEO TOPICAL STRATEGY

Do a current keyword/search-intent analysis before finalizing headings.

Build topical clusters around genuine user intent.

Core concepts to evaluate include:

- Talc
- Talc stone
- Soapstone
- Talc lumps
- Talc powder
- Talc supplier
- Talc exporter
- Talc manufacturer
- Talc Pakistan
- Talc lumps Pakistan
- Talc lumps exporter Pakistan
- Talc powder manufacturer Pakistan
- Talc mining Pakistan
- Talc processing
- Talc grinding
- Micronized talc
- Industrial talc
- Talc for plastics
- Talc for paint
- Talc for paper
- Talc for ceramics
- Cosmetic talc
- Pharmaceutical talc
- High-whiteness talc
- High-purity talc

Do NOT automatically put all phrases into titles.

Map:

one primary intent  
+ supporting entities  
+ semantic subtopics

to each page.

Prevent cannibalization between:

`/talc/`  
`/talc/lumps/`  
`/talc/powder/`  
`/applications/`

---

## 25. INTERNATIONAL SEARCH STRATEGY

The company serves B2B buyers.

Write content useful to:

- importers
- distributors
- manufacturers
- procurement managers
- formulators
- industrial buyers

Build useful commercial information around:

- product form
- processing
- quality
- packaging
- quantities where verified
- sourcing
- logistics
- documentation
- inquiry process

Do NOT create hundreds of fake country landing pages unless each page provides unique legitimate value.

No doorway SEO.

---

## 26. ON-PAGE SEO

Every indexable page needs unique:

- `<title>`
- meta description
- canonical
- H1
- logical H2/H3 structure
- clean slug
- OG title
- OG description
- OG image
- Twitter/social metadata where applicable

Rules:

Only one primary H1 per page.

Do not skip heading hierarchy for styling.

Do not keyword-stuff headings.

Use descriptive anchor text.

Build strong contextual internal linking.

Include breadcrumbs on deeper pages.

---

## 27. STRUCTURED DATA / JSON-LD

Implement valid structured data where factually appropriate.

Potential entities:

- `Organization`
- `WebSite`
- `WebPage`
- `AboutPage`
- `Product`
- `BreadcrumbList`
- `Article`
- `ImageObject`
- `ContactPoint`
- `Place`

Do NOT inject schema merely because a schema type exists.

Do NOT create:

- fake AggregateRating
- fake Review
- fake Offer
- fake price
- fake availability
- fake certification data

For Product markup use only real product information.

For Insights use Article markup with:

- headline
- description
- author
- datePublished
- dateModified
- representative image

Validate JSON-LD syntax.

---

## 28. AI SEARCH / AEO / GEO

Treat AEO/GEO as an extension of strong search architecture, NOT as keyword tricks.

Create content that AI systems can accurately understand and cite.

### Clear entity definitions

Pages should clearly explain:

- what PakTalc is
- what SKZ Mining is
- their relationship
- what talc is
- which product forms are supplied
- what operations are performed

### Answer-first sections

Where natural, give direct answers before detailed explanation.

Examples:

- What are talc lumps?
- How is talc processed?
- What industries use talc?
- What is the difference between talc lumps and talc powder?
- How is talc quality checked?

Do not create hundreds of fake FAQs.

### Structured information

Use:

- descriptive headings
- lists
- process steps
- comparison tables where genuinely useful
- technical specifications where verified
- captions
- glossary terms
- internal links

### First-hand evidence

Prioritize:

- original mine images
- original plant images
- real quality-control images
- original laboratory reports
- real processing photos
- company diagrams
- operational expertise

This is far more valuable than generic generated content.

---

## 29. AI CRAWLER ACCESS

The public content should be accessible to normal search and search-oriented AI crawlers.

Do not accidentally block the website with:

- robots rules
- authentication
- CDN bot challenges
- firewall rules
- JavaScript-only rendering
- cookie walls
- CAPTCHA on normal page access

Configure `robots.txt` appropriately.

Allow standard search crawling.

Also ensure `OAI-SearchBot` is not accidentally blocked if the business wants PakTalc pages discoverable in ChatGPT search.

Do NOT assume GPTBot and OAI-SearchBot perform the same function.

Training crawler policy should remain a business choice.

---

## 30. LLMS.TXT

You MAY provide:

`/llms.txt`

and optionally:

`/llms-full.txt`

as a convenience for AI systems/services that choose to use them.

However:

Do NOT treat llms.txt as a Google ranking factor.

Do NOT duplicate manually maintained content that will quickly become stale.

If implemented, generate it from the same canonical content system.

Keep it concise and factual.

Suggested sections:

- About PakTalc
- Parent/related organization
- Products
- Operations
- Applications
- Quality
- Important URLs
- Contact
- Insights

---

## 31. SERVER-RENDER IMPORTANT CONTENT

Important content must be available in rendered HTML.

Do NOT require:

- clicking tabs
- running heavy client JS
- opening modals
- scrolling through a JS-only carousel

for search systems to discover essential product information.

Interactive UI can enhance content but must not hide it from the document structure.

---

## 32. XML SITEMAP

Generate production-quality:

`/sitemap.xml`

or sitemap index where appropriate.

Include:

- canonical public pages
- insight articles
- valid modification dates

Exclude:

- internal search URLs
- draft content
- test pages
- duplicate variants
- parameter URLs
- API URLs
- admin utilities

Also evaluate whether an image sitemap adds meaningful benefit.

Ensure:

`robots.txt`

references the production sitemap.

---

## 33. LEGACY URL MIGRATION

Before replacing the WordPress site:

Crawl all currently indexed/reachable URLs.

Create:

`REDIRECT-PLAN.md`

and a machine-readable redirect mapping.

Rules:

- preserve existing URLs where sensible
- if a URL changes, implement one-to-one 301 redirect
- never redirect everything to homepage
- remove redirect chains
- maintain canonical consistency
- preserve blog/article URLs where possible

Use:

`paktalc-image-redirects.csv`

for old WordPress image URLs.

This is critical for existing Google Images signals and external backlinks.

---

## 34. IMAGE SEO

Every meaningful content image should have:

- descriptive filename
- correct alt text
- intrinsic width/height
- responsive source
- correct nearby text
- caption where useful
- crawlable file URL

Do not keyword-stuff ALT text.

Decorative images must use appropriate empty alt attributes.

Do not embed important information only inside images.

For technical diagrams, provide an HTML explanation alongside the image.

---

## 35. SOCIAL / OPEN GRAPH

Use prepared 1200×630 OG assets where available.

Every important page needs an appropriate OG image.

Do not use the same generic logo image for every share card if specific OG assets exist.

---

## 36. MOBILE-FIRST DESIGN — NON-NEGOTIABLE

Design MOBILE FIRST.

Do not design desktop first and then "make it responsive."

Begin at approximately:

360–390px

then progressively enhance.

Test approximately:

360  
390  
430  
480  
768  
820  
1024  
1280  
1440  
1920

Use fluid layouts rather than hard-coded breakpoint hacks.

Typography should use fluid scaling such as `clamp()` where appropriate.

---

## 37. MOBILE EXPERIENCE

Mobile should feel intentionally designed.

Not like compressed desktop.

Requirements:

- compact premium header
- clear tap targets
- minimum comfortable touch target sizes
- short hero content
- optimized vertical rhythm
- no horizontal overflow
- no microscopic labels
- no desktop-only hover dependency
- well-designed accordions where appropriate
- accessible menus
- cards adapted to narrow widths
- vertical process timelines
- image art direction
- sticky inquiry CTA only if it improves experience
- forms optimized for mobile keyboards

Do not make users scroll through enormous decorative sections before reaching content.

---

## 38. TABLET DESIGN

Tablet must receive intentional layout behavior.

Do not treat 768–1024 px as an accidental intermediate breakpoint.

Review:

- navigation
- grids
- image cropping
- text line lengths
- process diagrams
- cards
- forms
- modals
- galleries
- footer columns

in portrait and landscape tablet modes.

---

## 39. DESKTOP DESIGN

Desktop should feel premium and spacious.

Use a strong grid.

Keep readable text line lengths.

Avoid enormous empty whitespace that forces unnecessary scrolling.

Use asymmetric image/text layouts where appropriate.

Create clear content hierarchy.

---

## 40. VISUAL DIRECTION

The visual personality should communicate:

- PRECISION
- GEOLOGY
- MATERIAL QUALITY
- INDUSTRIAL CAPABILITY
- GLOBAL B2B BUSINESS
- AUTHENTICITY

Avoid:

- generic corporate template appearance
- neon effects
- excessive glassmorphism
- gaming UI
- crypto-style visuals
- excessive gradients
- fake 3D minerals
- excessive rounded cards
- random floating blobs
- generic AI images
- oversaturated colors

Use the real PakTalc logo and derive the final design system from its brand identity and the mineral imagery.

The design should feel closer to a premium international mining/materials company than a generic WordPress industrial template.

---

## 41. CREATE A COMPLETE DESIGN SYSTEM

Document in:

`DESIGN-SYSTEM.md`

Include:

- brand colors
- neutral colors
- surface colors
- border colors
- text hierarchy
- primary CTA
- secondary CTA
- states
- typography
- spacing scale
- border radius system
- shadow system
- responsive grid
- container widths
- icon style
- image treatment
- animation tokens

Use CSS variables/design tokens.

Do not hard-code random styling values throughout components.

---

## 42. TYPOGRAPHY

Typography must feel international, technical and premium.

Use at most a restrained font system.

Optimize font loading.

Prefer:

- local/system-efficient strategy
- font subsetting
- appropriate `font-display`

Avoid unnecessarily downloading many font weights.

Headings may be editorial and confident.

Body copy must remain extremely readable.

---

## 43. ANIMATION SYSTEM

Animations are important.

They should feel exceptional but not gimmicky.

Design a controlled motion language.

Potential interactions:

### Hero

- controlled image reveal
- subtle scale movement
- text mask/reveal
- elegant transition between a limited number of hero visuals
- CTA entrance

### Section reveal

- opacity + translate
- staggered cards
- image mask/clip reveals

### Process section

- progressive connecting line
- sequential process stage activation
- supporting image transition

### Product cards

- subtle image scale
- arrow movement
- refined metadata reveal

### Gallery

- polished image transitions
- responsive lightbox
- keyboard support

### Header

- smooth compact state on scroll
- subtle background transition

### Statistics

Only animate numerical statistics that are VERIFIED.

Do not animate fake numbers.

---

## 44. ANIMATION PERFORMANCE RULES

Prefer:

- CSS transforms
- opacity
- requestAnimationFrame-safe techniques
- IntersectionObserver
- lazy animation initialization

Avoid animating:

- width
- height
- top
- left
- huge blur filters
- expensive box shadows

when it causes layout/paint problems.

Do not import a massive animation library for two simple transitions.

If an animation library is already present, use it carefully.

Honor:

`prefers-reduced-motion`

All information must remain usable when motion is disabled.

No scroll hijacking.

---

## 45. CORE WEB VITALS

Target excellent real-world performance.

Aim for:

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

Treat mobile performance as the primary constraint.

Optimize:

- images
- fonts
- critical CSS
- JS
- third-party scripts
- hydration
- layout stability

Do not sacrifice performance for decorative animation.

---

## 46. LIGHTHOUSE TARGETS

Aim for production builds around:

- Performance: 90+ mobile, preferably higher
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100 or as close as legitimately possible

Do not manipulate audits.

Solve actual performance problems.

---

## 47. ACCESSIBILITY

Target WCAG 2.2 AA good practice.

Include:

- keyboard navigation
- visible focus states
- semantic landmarks
- proper labels
- descriptive form errors
- adequate contrast
- useful alt text
- logical heading structure
- screen-reader-friendly navigation
- accessible dialogs/lightboxes
- skip-to-content link
- reduced-motion support

Do not sacrifice accessibility for animation.

---

## 48. CONVERSION DESIGN

The website is not merely informational.

It should convert industrial buyers into inquiries.

Build clear contextual CTAs:

- Request a Quote
- Discuss Your Requirements
- Ask About Talc Lumps
- Ask About Talc Powder
- Contact Sales

Avoid aggressive popups.

Use trust before asking for conversion.

---

## 49. RFQ / CONTACT FORM

Design a high-quality B2B inquiry flow.

Possible fields:

- Name
- Company
- Business Email
- Country
- Product Interest
- Product Form
  - Lumps
  - Powder
  - Other/Not sure
- Required Mesh / Specification
- Estimated Quantity
- Destination
- Message / Requirement
- Attachment if genuinely needed
- Consent where legally appropriate

Do not add fields simply for decoration.

Use progressive disclosure where beneficial.

---

## 50. FORM SECURITY

If forms are functional, implement:

- server-side validation
- schema validation
- input sanitization
- spam protection
- rate limiting
- CSRF-safe architecture
- honeypot
- secure headers
- safe email handling

Use Cloudflare Turnstile or another appropriate free CAPTCHA alternative where infrastructure allows.

Never expose:

- SMTP passwords
- API secrets
- private keys
- backend credentials

in browser code.

---

## 51. SECURITY BASELINE

Review:

- CSP
- HSTS where deployment supports it
- Referrer-Policy
- X-Content-Type-Options
- Permissions-Policy
- secure external links
- form validation
- dependency vulnerabilities
- unsafe HTML rendering
- XSS risks
- injection risks

Avoid unnecessary dependencies.

Do not render untrusted HTML using `dangerouslySetInnerHTML` without sanitization.

---

## 52. SEARCH ENGINE CRAWLABILITY

Confirm:

- production pages return 200
- no accidental noindex
- no blanket robots block
- no auth wall
- canonical URLs resolve
- sitemap URLs resolve
- image URLs resolve
- server content is visible
- redirects are intentional
- 404s return real 404 status
- removed URLs use appropriate status/redirects

---

## 53. INTERNAL LINKING

Create a meaningful knowledge graph inside the site.

Examples:

Talc page  
→ Talc Lumps  
→ Mining Operations  
→ Processing  
→ Applications  
→ Quality Control

Talc Lumps  
→ Processing  
→ Quality  
→ Contact/RFQ

Applications  
→ corresponding talc form  
→ technical content  
→ inquiry

Insights  
→ relevant product/application pages

Do not add sitewide exact-match keyword links everywhere.

---

## 54. CONTENT FOR AI UNDERSTANDING

Important company and product facts should be represented in plain text.

For example, make it easy for a machine to answer:

- Who is PakTalc?
- What does PakTalc supply?
- What are talc lumps?
- Does PakTalc provide talc powder?
- How is talc processed?
- Which industries use talc?
- How is product quality checked?
- What is PakTalc's relationship with SKZ Mining?
- Where should a buyer request a quotation?

The answer should exist directly on relevant canonical pages.

---

## 55. INSIGHTS / BLOG STRATEGY

Do NOT mass-generate hundreds of SEO articles.

Build a smaller set of authoritative content based on actual expertise.

Potential themes:

- Understanding Talc Lumps
- How Talc Is Processed from Mine to Powder
- Talc Particle Size and Mesh Explained
- How Talc Is Used in Plastics
- Talc in Paints and Coatings
- Talc in Paper Manufacturing
- Understanding Talc Colour Variations
- Quality Control in Talc Processing
- Talc Packaging and Export Considerations
- Responsible Talc Mining

Each article must:

- provide useful information
- link to relevant commercial pages
- contain original company insight where possible
- use original imagery where relevant
- have a real author/reviewer where available
- display dates
- avoid unsupported claims

---

## 56. E-E-A-T / TRUST

Strengthen trust through real evidence.

Use:

- identifiable company entity
- verified address/contact
- About information
- original photos
- mine/process photographs
- technical team
- laboratory evidence
- author/reviewer information
- update dates
- clear relationship to SKZ Mining
- legal/privacy pages
- transparent inquiries

Trust should come from evidence rather than badges.

---

## 57. SITEMAP CONTENT STRATEGY

Create:

`SITEMAP.md`

For every URL record:

- URL
- page purpose
- primary search intent
- secondary topics
- H1
- proposed title
- proposed description
- target audience
- supporting images
- internal links in
- internal links out
- structured data
- canonical
- content status

---

## 58. SEARCH INTENT MAP

Create:

`SEARCH-INTENT-MAP.md`

For every important query cluster record:

- topic
- user intent
- buyer stage
- relevant page
- supporting entities
- content gap
- commercial value
- cannibalization risk

Do this before writing hundreds of paragraphs.

---

## 59. CONTENT MIGRATION RECORD

Create:

`CONTENT-INVENTORY.md`

For each source page/block:

- Source URL
- Original topic
- Decision
- KEEP / REWRITE / MERGE / REMOVE / VERIFY
- Destination URL
- Reason
- Verification needed

This prevents accidental loss of valuable historical content.

---

## 60. PRESERVE SEO EQUITY

When replacing WordPress:

Do not assume the new design automatically inherits rankings.

Protect:

- old URLs
- backlinks
- page intent
- internal links
- image URLs
- titles worth preserving
- existing valuable article URLs

301 changed URLs carefully.

Do not redesign URL structures just for aesthetic reasons.

---

## 61. CANONICALIZATION

Ensure:

- HTTPS canonical
- one preferred hostname
- consistent trailing-slash policy
- canonical tags
- no indexable duplicated routes
- no duplicate parameter pages

Do not canonical every page to home.

---

## 62. PERFORMANCE BUDGET

Establish a reasonable performance budget.

Control:

- route JS
- animation JS
- fonts
- hero image weight
- third-party scripts

Avoid autoplay background video unless there is a compelling reason.

Prefer strong photography + motion over huge video backgrounds.

---

## 63. GALLERY

Build the gallery from authentic images.

Provide meaningful categories such as:

- Talc
- Mines
- Processing
- Facilities
- Quality
- Logistics
- Team / Field Work

Do not make a huge unstructured photo dump.

Use:

- responsive grid
- lazy loading
- keyboard-accessible lightbox
- proper alt
- intrinsic dimensions

---

## 64. SITE SEARCH

Do not add internal search just because the old template had one.

Only implement it if the final content volume makes it useful.

If implemented, keep search result pages controlled appropriately for indexing.

---

## 65. NO FAKE UI CONTENT

Never invent metrics such as:

- 50+ Countries
- 100K Tons
- 25+ Years
- 500 Clients

unless verified.

Never create fake logos under:

**Trusted by...**

Never generate fake reviews.

Never create fake certificates.

Use real operational evidence instead.

---

## 66. CONTENT TONE

Tone:

- Professional
- International
- Technically competent
- Confident
- Clear
- B2B
- Human

Avoid:

- overhype
- AI buzzwords
- excessive adjectives
- meaningless "world-class" repetition
- fake urgency
- salesy clichés

Write in polished international English.

---

## 67. RESPONSIVE QA

Manually inspect every route at:

- 360px
- 390px
- 430px
- 768px
- 820px
- 1024px
- 1280px
- 1440px
- 1920px

Check:

- navigation
- text wrapping
- hero
- image crops
- card alignment
- tables
- diagrams
- CTAs
- forms
- footer
- animations
- modals
- overflow
- line length

Do not consider the task complete after desktop looks good.

---

## 68. TECHNICAL QA

Before declaring completion run:

- production build
- TypeScript validation
- lint
- broken link scan
- metadata check
- sitemap check
- robots check
- schema validation
- accessibility audit
- responsive audit
- image loading audit
- console error review
- 404 test
- redirect test

No ignored build errors.

No browser console spam.

---

## 69. SEO QA

Verify every important page for:

- Title
- Description
- Canonical
- H1
- Heading hierarchy
- Index status
- OG
- Image ALT
- Internal links
- Breadcrumb
- JSON-LD
- Sitemap entry
- Robots accessibility
- Word count appropriate to intent
- Duplicate content
- Search intent alignment

---

## 70. IMAGE QA

Verify:

- correct asset in correct section
- no random stock
- correct mobile crop
- no distorted photos
- correct aspect ratio
- alt text
- width/height
- lazy loading
- fetch priority
- srcset
- captions
- image redirects

Use `images.json` as the reference.

---

## 71. MOBILE PERFORMANCE QA

Run mobile simulation on critical routes.

Pay special attention to:

- Home
- Talc
- Talc Lumps
- Talc Powder
- Mining Operations
- Contact

Do not ship a homepage that looks beautiful but has poor mobile LCP because of animation and huge imagery.

---

## 72. DESIGN COMPARISON REQUIREMENT

The final website should feel like an evolution beyond the existing SKZ Mining experience.

Use SKZ as:

- business-family reference
- trust reference
- shared mining identity reference

Do NOT clone its layout.

PakTalc must be:

- cleaner
- faster
- more focused
- more modern
- more mobile-first
- more editorial
- more technically polished
- more product-centric
- easier for industrial buyers
- easier for search/AI systems to parse

---

## 73. FINAL DOCUMENTATION

At completion provide/update:

`PROJECT-CONTEXT.md`

`CONTENT-INVENTORY.md`

`CONTENT-VERIFICATION.md`

`SITEMAP.md`

`SEARCH-INTENT-MAP.md`

`DESIGN-SYSTEM.md`

`SEO-STRATEGY.md`

`IMAGE-USAGE.md`

`SCHEMA-PLAN.md`

`REDIRECT-PLAN.md`

`QA-REPORT.md`

`LAUNCH-CHECKLIST.md`

`README.md`

---

## 74. FINAL QA REPORT

`QA-REPORT.md` should summarize:

- Pages completed
- Responsive status
- Image status
- SEO metadata status
- Structured data status
- Sitemap status
- Robots status
- Redirect status
- Accessibility issues
- Performance issues
- Security issues
- Content requiring verification
- Missing assets
- Known limitations

---

## 75. LAUNCH CHECKLIST

Before production launch verify:

- production domain configuration
- SSL
- www/non-www strategy
- canonical domain
- robots.txt
- XML sitemap
- Search Console
- GA/analytics if credentials supplied
- redirects
- 404s
- image redirects
- structured data
- contact forms
- email delivery
- spam protection
- security headers
- favicon
- OG images
- social links
- privacy/legal pages
- cookie handling if required
- performance
- mobile responsiveness

Do not invent analytics IDs.

Use placeholders/config variables until supplied.

---

## 76. GOOGLE / AI DISCOVERY AFTER LAUNCH

Prepare the project so the owner can:

- verify Google Search Console
- submit XML sitemap
- inspect important URLs
- monitor indexing
- monitor Core Web Vitals
- monitor image indexing
- review generative AI visibility reports where available
- track organic query/page performance

No one can guarantee "#1 ranking."

The implementation goal is to provide the strongest legitimate foundation for long-term organic visibility.

---

## 77. CRITICAL DEVELOPMENT PRINCIPLES

Throughout the project:

**CONTENT BEFORE DECORATION**

**MOBILE BEFORE DESKTOP**

**AUTHENTICITY BEFORE STOCK**

**EVIDENCE BEFORE MARKETING CLAIMS**

**PERFORMANCE BEFORE EXCESSIVE ANIMATION**

**USER EXPERIENCE BEFORE SEO TRICKS**

**TECHNICAL SEO BEFORE KEYWORD STUFFING**

**TOPICAL AUTHORITY BEFORE MASS PAGE GENERATION**

**REAL COMPANY DATA BEFORE AI-GENERATED DATA**

---

## 78. EXECUTION PHASES

Execute in this order.

### PHASE 1 — DISCOVERY

- inspect repository
- inspect current PakTalc website
- inspect official SKZ website
- inspect prepared ZIP
- inventory existing URLs
- inventory content
- identify template garbage
- identify missing information
- create documentation

### PHASE 2 — CONTENT ARCHITECTURE

- content inventory
- factual verification list
- search intent mapping
- sitemap
- URL strategy
- redirect strategy
- internal linking plan

### PHASE 3 — DESIGN SYSTEM

- visual direction
- tokens
- typography
- responsive grid
- components
- animation language
- mobile patterns

### PHASE 4 — GLOBAL WEBSITE SHELL

Build:

- header
- mobile menu
- navigation
- footer
- breadcrumbs
- buttons
- forms
- cards
- containers
- image components
- animation primitives

### PHASE 5 — CORE PAGES

Develop in order:

1. Home
2. Talc
3. Talc Lumps
4. Talc Powder
5. Mining Operations
6. Processing
7. Quality Control
8. Applications
9. About
10. Sustainability
11. Affiliation
12. Gallery
13. Insights
14. Contact / RFQ

### PHASE 6 — IMAGE INTEGRATION

Integrate exact prepared assets from `images.json`.

### PHASE 7 — MOTION

Add refined animation after layout is stable.

Do not animate broken layouts.

### PHASE 8 — SEO

Implement:

- metadata
- canonicals
- internal links
- sitemap
- robots
- schema
- redirect maps
- image SEO

### PHASE 9 — AEO/GEO/AI DISCOVERABILITY

Improve:

- entity clarity
- answerable content
- structured information
- crawler access
- machine-readable relationships
- optional llms.txt

### PHASE 10 — PERFORMANCE

Optimize:

- LCP
- INP
- CLS
- images
- JS
- fonts
- animation

### PHASE 11 — SECURITY

Audit forms, headers, inputs and dependencies.

### PHASE 12 — FULL RESPONSIVE QA

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

### PHASE 13 — SEO + ACCESSIBILITY QA

Fix all meaningful issues.

### PHASE 14 — PRODUCTION BUILD

Run a clean production build.

No TypeScript errors.

No unresolved build failures.

### PHASE 15 — FINAL REPORT

Produce:

- completion summary
- remaining verification items
- launch checklist
- SEO checklist
- recommended post-launch work

---

## 79. IMPORTANT: DO NOT STOP AFTER MAKING THE HOMEPAGE

This is a complete website redevelopment.

Continue working phase by phase through all major pages, SEO, responsive design and QA.

Do not create one attractive homepage and leave internal pages using old/template designs.

The entire website must share one consistent premium system.

---

## 80. FINAL DEFINITION OF DONE

This project is DONE only when:

- current website content has been audited
- valuable content has been migrated
- template garbage has been removed
- factual uncertainty is documented
- final sitemap is implemented
- all major routes work
- prepared images are correctly integrated
- mobile design is excellent
- tablet design is excellent
- desktop design is excellent
- animations are refined and performant
- SEO metadata is complete
- structured data is valid
- robots.txt is correct
- sitemap is correct
- internal linking is strong
- legacy redirects are prepared
- image redirects are preserved
- AI/search crawlability is good
- contact/RFQ works
- accessibility has been reviewed
- security has been reviewed
- production build passes
- QA report exists
- launch checklist exists

The final product should not look like an AI-generated template.

It should look and behave like a carefully designed, technically credible, international **talc mining, processing and export brand website**, built around authentic PakTalc/SKZ operations and real customer information needs.

---

# START COMMAND

**BEGIN NOW WITH PHASE 1.**

First inspect everything available in the repository and prepared asset package, crawl the existing PakTalc website, establish the source-of-truth documentation, then continue sequentially through the phases without waiting for routine approval.
