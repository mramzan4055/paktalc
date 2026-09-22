<?php
/**
 * Local production-like router for PHP's built-in server:
 *   npm run serve:php   (php -S localhost:8080 -t out scripts/php-router.php)
 * Mirrors the Apache .htaccess behaviour that matters for testing: gzip, cache headers,
 * trailing-slash redirect, security headers and a real 404 status. Not used in production.
 */
declare(strict_types=1);

$root = realpath(__DIR__ . '/../out');
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');

// PHP endpoints run normally.
if (str_starts_with($path, '/api/') && str_ends_with($path, '.php')) {
    if (str_starts_with($path, '/api/_lib/')) {
        http_response_code(403);
        exit('Forbidden');
    }
    return false;
}

$file = $root . $path;
if (str_ends_with($path, '/')) {
    $file .= 'index.html';
} elseif (is_dir($file) && is_file($file . '/index.html')) {
    header('Location: ' . $path . '/' . (isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] !== '' ? '?' . $_SERVER['QUERY_STRING'] : ''), true, 301);
    exit;
}

$real = realpath($file);
$status = 200;
if ($real === false || !str_starts_with($real, $root) || !is_file($real) || basename($real)[0] === '.') {
    $real = $root . '/404.html';
    $status = 404;
}

$ext = strtolower(pathinfo($real, PATHINFO_EXTENSION));
$types = [
    'html' => 'text/html; charset=utf-8', 'css' => 'text/css; charset=utf-8', 'js' => 'text/javascript; charset=utf-8',
    'json' => 'application/json', 'txt' => 'text/plain; charset=utf-8', 'xml' => 'application/xml', 'svg' => 'image/svg+xml',
    'avif' => 'image/avif', 'webp' => 'image/webp', 'png' => 'image/png', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg',
    'ico' => 'image/x-icon', 'woff2' => 'font/woff2',
];
http_response_code($status);
header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: SAMEORIGIN');
if (str_starts_with($path, '/_next/static/')) {
    header('Cache-Control: public, max-age=31536000, immutable');
} elseif (in_array($ext, ['avif', 'webp', 'png', 'jpg', 'jpeg', 'ico', 'svg', 'woff2'], true)) {
    header('Cache-Control: public, max-age=2592000');
} else {
    header('Cache-Control: public, max-age=0, must-revalidate');
}

$body = file_get_contents($real);
$compressible = in_array($ext, ['html', 'css', 'js', 'json', 'txt', 'xml', 'svg'], true);
if ($compressible && str_contains($_SERVER['HTTP_ACCEPT_ENCODING'] ?? '', 'gzip') && function_exists('gzencode')) {
    $body = gzencode($body, 6);
    header('Content-Encoding: gzip');
    header('Vary: Accept-Encoding');
}
header('Content-Length: ' . strlen($body));
echo $body;
return true;
