# Hostinger deployment (Apache + PHP, no Node.js hosting)

The project uses Node.js **on your computer only** to generate static files. Hostinger serves the generated HTML, CSS, JS and images; PHP handles the contact and quote forms.

## Upload the supplied deployment ZIP

1. In Hostinger File Manager, open your domain's document root, usually `public_html`. Upload **the contents of `public_html/`** from `paktalc-hostinger-deploy.zip` directly into that root. Include hidden `.htaccess` and the `api/` PHP directory. Do not upload the outer `public_html` folder as another nested folder.
2. Upload the ZIP's `php-private/` folder **beside** `public_html`, outside the public web root. The credential-inclusive ZIP already contains `config.php` from the supplied project.
3. Check that `config.php` has the correct mailbox under `to` and `from` and current SMTP credentials. Keep it private and never upload it to `public_html`.
4. Ensure the hosting plan runs PHP 8.1 or newer with `mbstring`, OpenSSL and Apache rewrite support. Make `php-private/storage/` writable by the PHP process. Enable SSL for `paktalc.com` and `www.paktalc.com`.
5. Test `/`, `/talc/`, `/contact/`, `/contacts/`, `/sitemap.xml`, both forms, their email delivery and an invalid URL (which should return HTTP 404). Test the desktop dropdown and hero slider on a real browser after clearing the cache.

If your Hostinger account has a different document root, keep the same relationship: `php-private/` must be **one directory above** the web root. The PHP handler also supports the `PAKTALC_CONFIG` environment variable pointing to `config.php`.

## Rebuild after editing source

On a computer with Node.js 22.18 or newer, run `npm ci`, `npm run build`, then `npm run check`. Re-upload the **contents of the regenerated `out/` directory**, keeping the private PHP configuration on the server. The source ZIP contains editable code; `out/` is the production output. No Node.js process is required on Hostinger.

The credential-inclusive ZIP contains a real email password and server secret. Keep it private. SMTP delivery still needs a live form submission test on the actual hosting account.
