# Launch Checklist

## Content & legal (client)
- [ ] Resolve every item in `CONTENT-VERIFICATION.md` (head-office address, phones, lab report dates, mesh range, director names)
- [ ] Photo consent for identifiable people (`review_flag` in `paktalc-image-map.csv`)
- [ ] Legal review of `/privacy/`
- [ ] Provide missing photos (IMAGE-USAGE.md → Gaps)

## Hosting
- [ ] Domain points to the host; SSL certificate active on `paktalc.com` and `www.paktalc.com`
- [ ] Upload `out/` to web root, and `php-private/` beside it (README → Deploying)
- [ ] `php-private/config.php`: secret, SMTP, allowed origins; `storage/` writable
- [ ] SPF/DKIM for the `from` address; send a test enquiry and confirm delivery to info@paktalc.com
- [ ] Optional: Cloudflare Turnstile keys (site key at build, secret in config)

## Verify on production
- [ ] `http://`, `www.` and missing-slash URLs 301 in one hop to `https://paktalc.com/.../`
- [ ] Spot-check legacy 301s: `/services/talc/` → `/talc/`, `/contacts/` stays 200, `/team/chief-executive-officer/` → `/about/`, a `/wp-content/uploads/2025/03/DSC05907.jpeg` → `/images/...webp`
- [ ] Unknown URL returns a **404 status** with the custom page
- [ ] Response headers present (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS)
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt` load
- [ ] Mobile menu, hero slider, gallery lightbox, RFQ form on a real phone
- [ ] Favicon and OG previews (share a URL in WhatsApp/LinkedIn)

## Search
- [ ] Google Search Console (Domain property): verify, submit `sitemap.xml`, inspect `/`, `/talc/`, `/talc/lumps/`, `/talc/powder/`
- [ ] Bing Webmaster Tools: import from GSC
- [ ] Analytics only if credentials are supplied (no IDs are hard-coded); update the privacy policy if added
- [ ] Decide the AI-training crawler policy (`allowAITraining` in `content/seo.ts`)
- [ ] Monitor Core Web Vitals (field) and indexing for 4–6 weeks
