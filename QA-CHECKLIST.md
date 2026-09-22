# QA Checklist (repeatable)

Run after any change:
1. `npm run build` passes (postbuild prints page/image rule counts).
2. `npm run typecheck` and `npm run lint` are clean.
3. `npm run check` reports "All checks passed" (links, src/srcset, titles/descriptions unique, canonical = path, one H1, og:image exists, JSON-LD parses, no rating/offer schema, sitemap URLs exist, robots references the sitemap).
4. Serve: `php -S localhost:8080 -t out`, then check:
   - Mobile (≤1199 px): hamburger opens the drawer; Esc / overlay / ✕ / link close it; the current section is expanded.
   - Desktop (≥1200 px): dropdowns open on hover/click/↓ and close on Esc/outside click.
   - Home hero: autoplay advances, prev/next/dots/swipe/←→ work, pause works, text changes with the image.
   - Gallery: filter chips; lightbox ←/→/Esc.
   - Contact: empty submit shows the error summary; a valid submit shows the success state (outbox .eml written).
5. Viewports 360, 390, 430, 768, 820, 1024, 1280, 1440, 1920: no horizontal scroll, no clipped text, cards equal height per row.
6. Lighthouse (mobile) on Home, a product page and Contact: A11y/BP/SEO ≥ 95, CLS < 0.1.
7. Any new factual claim is recorded or cleared in `CONTENT-VERIFICATION.md`.
