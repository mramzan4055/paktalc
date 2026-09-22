<?php
/**
 * PakTalc RFQ configuration — COPY to config.php and fill in.
 *
 * Deploy this folder OUTSIDE the public web root, as a sibling of it:
 *   /home/<account>/public_html/        ← contents of out/
 *   /home/<account>/php-private/config.php
 *   /home/<account>/php-private/storage/ (created automatically, must be writable by PHP)
 * Or point to it with the PAKTALC_CONFIG environment variable.
 *
 * config.php is git-ignored. Never commit real credentials.
 */
return [
    // 64+ random characters. Generate with: php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"
    'secret' => 'CHANGE_ME_TO_A_LONG_RANDOM_STRING_CHANGE_ME_TO_A_LONG_RANDOM_STRING',

    // Where enquiries are delivered, and the From address (must be a mailbox on your domain for SPF/DKIM).
    'to' => 'info@paktalc.com',
    'from' => 'noreply@paktalc.com',
    'from_name' => 'PakTalc website',
    'public_email' => 'info@paktalc.com',

    // Browser origins allowed to post the form.
    'allowed_origins' => ['https://paktalc.com', 'https://www.paktalc.com', 'http://localhost:8080', 'http://127.0.0.1:8080'],

    // "mail" (PHP mail()), "smtp" (recommended), or "log" (writes .eml files to storage/outbox — for testing only).
    'transport' => 'smtp',
    'smtp' => [
        'host' => 'mail.paktalc.com',
        'port' => 587,
        'secure' => 'tls',   // tls = STARTTLS on 587, ssl = implicit TLS on 465
        'username' => 'noreply@paktalc.com',
        'password' => '',
    ],

    // Cloudflare Turnstile secret (leave empty to disable). Also set NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time.
    'turnstile_secret' => '',

    // Keep a JSON-lines copy of each enquiry in storage/enquiries (covered by the privacy policy).
    'store_copy' => true,

    // Set true only if behind Cloudflare or a trusted reverse proxy (uses CF-Connecting-IP / X-Forwarded-For).
    'trust_proxy' => false,

    // Optional: override storage location (default: <this folder>/storage)
    // 'storage_dir' => '/home/account/php-private/storage',
];
