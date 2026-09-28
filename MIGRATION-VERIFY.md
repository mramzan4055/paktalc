# PakTalc migration verification

Build date: 2026-09-28. Source of truth: `content/redirects.ts` and `paktalc-image-redirects.csv`.

## Results

- `npm run build`: passed; generated `out/.htaccess` and `out/redirects.json`.
- `npm run check:redirects`: passed 569 local HTTP checks against rules read from the generated `.htaccess`. Checked both slash variants, HTTP/www legacy requests, final 200 targets, the listed theme URL examples, 102 legacy image redirects, WordPress system 410 responses, sitemap canonicals, and old internal links.
- `npm run check`: passed; 26 HTML files, 25 sitemap URLs. Existing warning: homepage description is 182 characters.
- `npm run lint` and `npm run typecheck`: passed.
- The 599 supplied image files are already predominantly WebP/AVIF variants (585 files, 42 MB total). This migration did not alter visual assets or page content.

The HTTP checker runs a local server against the rewrite expressions emitted for Apache. It does not run Apache itself. After upload to Hostinger, verify selected legacy URLs with `curl -I` and submit both forms to confirm PHP/SMTP on the actual host. PHP was not installed in this build environment, so PHP runtime and mail delivery were not tested.

## Deployment

Extract the credential-inclusive deploy ZIP. Upload the contents of `public_html/` into the actual Hostinger document root, including hidden `.htaccess` and the `api/` PHP directory. Put `php-private/` as a sibling of the document root, outside it. Its `config.php` contains the credentials supplied in the original project. Never put it inside the document root.

The original upload and the credential-inclusive ZIP contain a real SMTP password and secret. Keep these archives private and rotate credentials if they were exposed. Check `https://paktalc.com/php-private/config.php` returns 403 or 404, and that both forms deliver to the intended mailbox.
