<?php
/**
 * PakTalc RFQ backend — shared bootstrap.
 * This directory is denied to web clients (see .htaccess). Secrets live in php-private/config.php,
 * which is deployed OUTSIDE the web root (sibling of public_html). Nothing here is sent to browsers.
 */
declare(strict_types=1);

if (PHP_VERSION_ID < 80100) {
    http_response_code(500);
    exit('PHP 8.1+ required');
}

const PT_TOKEN_MIN_AGE = 3;      // seconds — humans need time to fill the form
const PT_TOKEN_MAX_AGE = 7200;   // seconds — token expires after 2 h
const PT_RATE_WINDOW = 600;      // 10 minutes
const PT_RATE_MAX_WINDOW = 5;    // submissions per IP per window
const PT_RATE_MAX_DAY = 20;      // submissions per IP per day

function pt_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $candidates = array_filter([
        getenv('PAKTALC_CONFIG') ?: null,
        dirname(__DIR__, 3) . '/php-private/config.php', // <web root>/../php-private/config.php
        dirname(__DIR__, 4) . '/php-private/config.php',
    ]);
    foreach ($candidates as $file) {
        if (is_file($file) && is_readable($file)) {
            $loaded = require $file;
            if (is_array($loaded)) {
                $config = $loaded + ['_file' => $file];
                break;
            }
        }
    }
    if ($config === null) {
        pt_fail(500, 'The enquiry service is not configured yet. Please email us directly.', [], 'config missing');
    }
    if (empty($config['secret']) || strlen((string) $config['secret']) < 32) {
        pt_fail(500, 'The enquiry service is not configured correctly. Please email us directly.', [], 'secret too short');
    }
    $config['storage_dir'] = rtrim($config['storage_dir'] ?? (dirname($config['_file']) . '/storage'), '/\\');
    return $config;
}

function pt_security_headers(): void
{
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('X-Frame-Options: DENY');
    header('Cache-Control: no-store, max-age=0');
    header_remove('X-Powered-By');
}

function pt_wants_json(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

/** Send a JSON (fetch) or redirect (no-JS) response and stop. */
function pt_respond(int $status, array $payload, ?string $redirect = null): never
{
    if (!pt_wants_json() && $redirect !== null) {
        header('Location: ' . $redirect, true, 303);
        exit;
    }
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function pt_fail(int $status, string $message, array $errors = [], string $log = ''): never
{
    if ($log !== '') {
        error_log('[paktalc-rfq] ' . $log);
    }
    pt_respond($status, ['ok' => false, 'message' => $message, 'errors' => (object) $errors], '/contacts/?sent=0#rfq');
}

/** Only accept requests that originate from our own site (CSRF defence in depth, alongside the signed token). */
function pt_check_origin(array $config): void
{
    $allowed = $config['allowed_origins'] ?? [];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        $ref = $_SERVER['HTTP_REFERER'] ?? '';
        if ($ref !== '') {
            $p = parse_url($ref);
            $origin = ($p['scheme'] ?? '') . '://' . ($p['host'] ?? '') . (isset($p['port']) ? ':' . $p['port'] : '');
        }
    }
    if ($origin !== '' && !in_array($origin, $allowed, true)) {
        pt_fail(403, 'This request was blocked. Please submit the form from paktalc.com.', [], 'origin rejected: ' . $origin);
    }
}

function pt_b64url(string $bin): string
{
    return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
}

function pt_issue_token(array $config): string
{
    $ts = (string) time();
    $nonce = pt_b64url(random_bytes(16));
    $sig = pt_b64url(hash_hmac('sha256', $ts . '.' . $nonce, (string) $config['secret'], true));
    return $ts . '.' . $nonce . '.' . $sig;
}

/** Returns null when valid, otherwise a reason string. Rejects tokens already consumed (replay). */
function pt_verify_token(array $config, string $token): ?string
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return 'malformed';
    }
    [$ts, $nonce, $sig] = $parts;
    if (!ctype_digit($ts) || !preg_match('/^[A-Za-z0-9_-]{16,32}$/', $nonce)) {
        return 'malformed';
    }
    $expected = pt_b64url(hash_hmac('sha256', $ts . '.' . $nonce, (string) $config['secret'], true));
    if (!hash_equals($expected, $sig)) {
        return 'bad signature';
    }
    $age = time() - (int) $ts;
    if ($age < PT_TOKEN_MIN_AGE) {
        return 'too fast';
    }
    if ($age > PT_TOKEN_MAX_AGE) {
        return 'expired';
    }
    if (is_file(pt_nonce_file($config, $nonce))) {
        return 'replayed';
    }
    return null;
}

function pt_nonce_file(array $config, string $nonce): string
{
    return pt_storage($config, 'nonces') . '/' . hash('sha256', $nonce);
}

/** Mark a token as used. Called only once an enquiry is accepted, so a buyer can fix validation errors and resubmit. */
function pt_consume_token(array $config, string $token): void
{
    $nonce = explode('.', $token)[1] ?? '';
    @file_put_contents(pt_nonce_file($config, $nonce), (string) time(), LOCK_EX);
    pt_gc(dirname(pt_nonce_file($config, $nonce)), PT_TOKEN_MAX_AGE + 60);
}

function pt_storage(array $config, string $sub): string
{
    $dir = $config['storage_dir'] . '/' . $sub;
    if (!is_dir($dir) && !@mkdir($dir, 0750, true) && !is_dir($dir)) {
        pt_fail(500, 'The enquiry service is temporarily unavailable. Please email us directly.', [], 'cannot create ' . $dir);
    }
    return $dir;
}

/** Delete files older than $maxAge seconds (cheap probabilistic cleanup). */
function pt_gc(string $dir, int $maxAge): void
{
    if (random_int(1, 20) !== 1) {
        return;
    }
    foreach (glob($dir . '/*') ?: [] as $f) {
        if (is_file($f) && filemtime($f) < time() - $maxAge) {
            @unlink($f);
        }
    }
}

function pt_client_ip(array $config): string
{
    // Only trust proxy headers when explicitly configured (e.g. behind Cloudflare).
    if (!empty($config['trust_proxy'])) {
        foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR'] as $h) {
            if (!empty($_SERVER[$h])) {
                $ip = trim(explode(',', (string) $_SERVER[$h])[0]);
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
    }
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

/** File-based sliding-window rate limit per IP (hashed — raw IPs are not stored). */
function pt_rate_limit(array $config, string $ip): void
{
    $dir = pt_storage($config, 'ratelimit');
    $file = $dir . '/' . hash_hmac('sha256', $ip, (string) $config['secret']);
    $fh = @fopen($file, 'c+');
    if (!$fh) {
        return; // fail open rather than block genuine buyers
    }
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $hits = array_values(array_filter(json_decode($raw ?: '[]', true) ?: [], fn ($t) => is_int($t) && $t > time() - 86400));
    $recent = count(array_filter($hits, fn ($t) => $t > time() - PT_RATE_WINDOW));
    if ($recent >= PT_RATE_MAX_WINDOW || count($hits) >= PT_RATE_MAX_DAY) {
        flock($fh, LOCK_UN);
        fclose($fh);
        header('Retry-After: ' . PT_RATE_WINDOW);
        pt_fail(429, 'Too many enquiries from your connection. Please wait a few minutes, or email us directly.', [], 'rate limited');
    }
    $hits[] = time();
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);
    pt_gc($dir, 86400);
}

/** Normalise user text: UTF-8 only, no control chars (except newlines in multi-line fields), trimmed, length-capped. */
function pt_clean(mixed $value, int $max, bool $multiline = false): string
{
    if (!is_string($value)) {
        return '';
    }
    if (!mb_check_encoding($value, 'UTF-8')) {
        $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $pattern = $multiline ? '/[\x00-\x09\x0B-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u';
    $value = (string) preg_replace($pattern, '', $value);
    $value = trim((string) preg_replace('/[ \t]+/u', ' ', $value));
    return mb_substr($value, 0, $max);
}

function pt_verify_turnstile(array $config, string $response, string $ip): bool
{
    $secret = $config['turnstile_secret'] ?? '';
    if ($secret === '') {
        return true; // not enabled
    }
    if ($response === '') {
        return false;
    }
    $body = http_build_query(['secret' => $secret, 'response' => $response, 'remoteip' => $ip]);
    $ctx = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $body,
        'timeout' => 8,
    ]]);
    $res = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx);
    $data = $res ? json_decode($res, true) : null;
    return is_array($data) && !empty($data['success']);
}
