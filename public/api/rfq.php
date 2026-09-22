<?php
/**
 * PakTalc RFQ / contact form handler (POST).
 * Defences: method + origin check, signed single-use token with minimum fill time (CSRF-style), honeypot,
 * per-IP rate limit, optional Cloudflare Turnstile, strict server-side validation, CR/LF header-injection guard,
 * HTML-escaped email body. Returns JSON for fetch() requests, 303 redirects for plain form posts.
 */
declare(strict_types=1);
require __DIR__ . '/_lib/bootstrap.php';
require __DIR__ . '/_lib/mailer.php';

pt_security_headers();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    pt_fail(405, 'Method not allowed.');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 64 * 1024) {
    pt_fail(413, 'Your enquiry is too large. Please shorten the message.');
}

$config = pt_config();
pt_check_origin($config);
$ip = pt_client_ip($config);

// Honeypot: real people never see or fill this. Pretend success so bots learn nothing.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    pt_respond(200, ['ok' => true, 'message' => 'Thank you — your enquiry has been sent.'], '/contacts/thank-you/');
}

$token = (string) ($_POST['token'] ?? '');
$tokenError = pt_verify_token($config, $token);
if ($tokenError !== null) {
    $msg = $tokenError === 'too fast'
        ? 'That was very quick. Please check your details and submit again.'
        : 'Your session has expired. Please reload the page and submit again.';
    pt_fail(400, $msg, [], 'token ' . $tokenError);
}

pt_rate_limit($config, $ip);

if (!pt_verify_turnstile($config, (string) ($_POST['cf-turnstile-response'] ?? ''), $ip)) {
    pt_fail(400, 'Please complete the spam check and submit again.', [], 'turnstile failed');
}

// ---------------- Validation (mirrors client rules; server is authoritative) ----------------
$forms = ['lumps' => 'Talc lumps', 'powder' => 'Talc powder', 'unsure' => 'Not sure yet'];
$grades = ['White', 'Grey', 'Green', 'Coffee', 'Not sure'];
$apps = ['Plastics & polymers', 'Paints & coatings', 'Paper', 'Ceramics', 'Rubber', 'Cosmetics', 'Pharmaceuticals', 'Grinding / resale', 'Other'];

$in = [
    'name' => pt_clean($_POST['name'] ?? null, 120),
    'company' => pt_clean($_POST['company'] ?? null, 160),
    'email' => pt_clean($_POST['email'] ?? null, 190),
    'country' => pt_clean($_POST['country'] ?? null, 80),
    'phone' => pt_clean($_POST['phone'] ?? null, 40),
    'form' => pt_clean($_POST['form'] ?? null, 10),
    'grade' => pt_clean($_POST['grade'] ?? null, 20),
    'spec' => pt_clean($_POST['spec'] ?? null, 200),
    'application' => pt_clean($_POST['application'] ?? null, 40),
    'quantity' => pt_clean($_POST['quantity'] ?? null, 80),
    'destination' => pt_clean($_POST['destination'] ?? null, 120),
    'message' => pt_clean($_POST['message'] ?? null, 4000, true),
    'consent' => ($_POST['consent'] ?? '') === 'yes',
];

$errors = [];
if (mb_strlen($in['name']) < 2) {
    $errors['name'] = 'Please enter your name.';
}
if (mb_strlen($in['company']) < 2) {
    $errors['company'] = 'Please enter your company name.';
}
if (!filter_var($in['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (mb_strlen($in['country']) < 2) {
    $errors['country'] = 'Please enter your country.';
}
if (!isset($forms[$in['form']])) {
    $errors['form'] = 'Please choose a product form.';
}
if ($in['grade'] !== '' && !in_array($in['grade'], $grades, true)) {
    $in['grade'] = '';
}
if ($in['application'] !== '' && !in_array($in['application'], $apps, true)) {
    $in['application'] = '';
}
if ($in['phone'] !== '' && !preg_match('/^[0-9+()\-.\s]{5,40}$/', $in['phone'])) {
    $errors['phone'] = 'Please enter a valid phone number, or leave it blank.';
}
if (mb_strlen($in['message']) < 10) {
    $errors['message'] = 'Please describe your requirement (at least 10 characters).';
}
if (!$in['consent']) {
    $errors['consent'] = 'Please agree so we can reply to your enquiry.';
}
// Simple content heuristics against link spam.
if (preg_match_all('#https?://#i', $in['message']) > 3 || preg_match('/<\s*(a|script|iframe)\b/i', $in['message'])) {
    $errors['message'] = 'Please remove links or HTML from your message.';
}

if ($errors) {
    pt_fail(422, 'Please correct the highlighted fields.', $errors);
}

pt_consume_token($config, $token);

// ---------------- Compose ----------------
$h = static fn (string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$rows = [
    'Name' => $in['name'],
    'Company' => $in['company'],
    'Email' => $in['email'],
    'Country' => $in['country'],
    'Phone' => $in['phone'],
    'Product form' => $forms[$in['form']],
    'Colour grade' => $in['grade'],
    'Mesh / specification / size' => $in['spec'],
    'Application' => $in['application'],
    'Quantity' => $in['quantity'],
    'Destination' => $in['destination'],
];
$rows = array_filter($rows, static fn ($v) => $v !== '');

$subject = mb_substr(sprintf('RFQ: %s — %s (%s)', $forms[$in['form']], $in['company'], $in['country']), 0, 150);
$subject = (string) preg_replace('/[\r\n]+/', ' ', $subject);

$text = "New enquiry from paktalc.com\n\n";
foreach ($rows as $k => $v) {
    $text .= str_pad($k . ':', 30) . $v . "\n";
}
$text .= "\nMessage:\n" . $in['message'] . "\n\n—\nSubmitted " . gmdate('Y-m-d H:i') . " UTC. Reply to this email to answer the buyer directly.\n";

$html = '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1a1c16;line-height:1.5">'
    . '<h2 style="color:#566b2f;margin:0 0 12px">New enquiry from paktalc.com</h2>'
    . '<table cellpadding="6" style="border-collapse:collapse;font-size:14px">';
foreach ($rows as $k => $v) {
    $html .= '<tr><th align="left" style="border-bottom:1px solid #e2dfd5;color:#65624f">' . $h($k) . '</th>'
        . '<td style="border-bottom:1px solid #e2dfd5">' . $h($v) . '</td></tr>';
}
$html .= '</table><h3 style="margin:20px 0 6px">Message</h3><p>' . nl2br($h($in['message'])) . '</p>'
    . '<p style="color:#65624f;font-size:12px">Submitted ' . $h(gmdate('Y-m-d H:i')) . ' UTC. Reply to this email to answer the buyer directly.</p></body></html>';

// Optional server-side copy (JSON lines) so no enquiry is lost if email delivery fails.
if (!empty($config['store_copy'])) {
    $dir = pt_storage($config, 'enquiries');
    @file_put_contents($dir . '/' . gmdate('Y-m') . '.jsonl', json_encode(['at' => gmdate('c')] + $rows + ['message' => $in['message']], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

try {
    (new PtMailer($config))->send((string) $config['to'], $subject, $text, $html, $in['email']);
} catch (Throwable $e) {
    error_log('[paktalc-rfq] send failed: ' . $e->getMessage());
    pt_fail(502, 'We could not send your enquiry just now. Please email ' . ($config['public_email'] ?? 'info@paktalc.com') . ' directly.');
}

pt_respond(200, ['ok' => true, 'message' => 'Thank you — your enquiry has been sent.'], '/contacts/thank-you/');
