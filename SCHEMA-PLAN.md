# Structured Data Plan

Builders live in `src/lib/schema.ts`. Each page emits a single `@graph` via `<JsonLd>`, and the checker validates that the JSON parses.

| Entity | Where | Key properties | Notes |
|---|---|---|---|
| `Organization` (PakTalc) | Every page (in graph) | `@id`, name, alternateName "Pak Talc", url, logo (ImageObject), email, telephone, `contactPoint` (sales, languages en/ur), `parentOrganization` → SKZ, `address` (Islamabad, PK — locality only) | No `sameAs` social profiles until verified. No founding date |
| `Organization` (SKZ) | Referenced | `@id https://skzminingcompany.com/#organization`, name, url | Only name + url |
| `WebSite` | Every page | `@id`, url, name, publisher → PakTalc, inLanguage en | No SearchAction (no site search) |
| `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` | Per page | `@id` = canonical + `#webpage`, name, description, isPartOf WebSite, breadcrumb, primaryImageOfPage | |
| `BreadcrumbList` | All non-home pages | positions from route | Mirrors the visible breadcrumb |
| `Product` | `/talc/lumps/`, `/talc/powder/` | name, description, image[], brand PakTalc, manufacturer SKZ, category, `additionalProperty` only for verified facts (colour grades, packing) | **No `offers`, price, availability, rating or review** |
| `Article` | Insights | headline, description, image, datePublished, dateModified, author (Organization "PakTalc Technical Team" → PakTalc), publisher | Author becomes `Person` once a named reviewer is confirmed |
| `ImageObject` | Lab reports on `/quality-control/` | contentUrl, caption, creator SKZ Laboratory Peshawar | |
| `Place` | `/facilities/` | name, address (locality/region/country), containedInPlace | No geo coordinates (not verified) |

Excluded on purpose: AggregateRating, Review, Offer, FAQPage (no real FAQ set), certification/award properties.
