<?php
/**
 * PakTalc contact form handler (POST).
 * General enquiries from the Contact page.
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
    pt_fail(413, 'Your message is too large.');
}

$config = pt_config();
pt_check_origin($config);
$ip = pt_client_ip($config);

// Honeypot
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    pt_respond(200, ['ok' => true, 'message' => 'Thank you — your message has been sent.'], '/contact/thank-you/');
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

// Validation
$in = [
    'name' => pt_clean($_POST['name'] ?? null, 120),
    'company' => pt_clean($_POST['company'] ?? null, 160),
    'email' => pt_clean($_POST['email'] ?? null, 190),
    'phone' => pt_clean($_POST['phone'] ?? null, 40),
    'subject' => pt_clean($_POST['subject'] ?? null, 200),
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
if (mb_strlen($in['subject']) < 3) {
    $errors['subject'] = 'Please enter a subject.';
}
if (mb_strlen($in['message']) < 10) {
    $errors['message'] = 'Please enter your message (at least 10 characters).';
}
if (!$in['consent']) {
    $errors['consent'] = 'Please agree so we can reply to your message.';
}

if (preg_match_all('#https?://#i', $in['message']) > 3 || preg_match('/<\s*(a|script|iframe)\b/i', $in['message'])) {
    $errors['message'] = 'Please remove links or HTML from your message.';
}

$captchaError = pt_verify_captcha($config, $_POST['captcha_a'] ?? null, $_POST['captcha_b'] ?? null, $_POST['captcha_proof'] ?? null, $_POST['captcha_answer'] ?? null);
if ($captchaError === 'wrong') {
    $errors['captcha'] = 'That answer does not match. Please try the sum again.';
} elseif ($captchaError !== null) {
    $errors['captcha'] = 'The check expired. Please answer the new sum.';
}

if ($errors) {
    pt_form_fail(422, 'Please correct the highlighted fields.', $errors, $config, $captchaError !== null && $captchaError !== 'wrong', '/contact/?sent=0#contact');
}

pt_consume_token($config, $token);

// Compose
$h = static fn (string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$rows = [
    'Name' => $in['name'],
    'Company' => $in['company'],
    'Email' => $in['email'],
    'Phone' => $in['phone'],
    'Subject' => $in['subject'],
];
$rows = array_filter($rows, static fn ($v) => $v !== '');

$subjectLine = mb_substr(sprintf('Contact: %s — %s', $in['subject'], $in['name']), 0, 150);
$subjectLine = (string) preg_replace('/[\r\n]+/', ' ', $subjectLine);

$text = "New contact message from paktalc.com\n\n";
foreach ($rows as $k => $v) {
    $text .= str_pad($k . ':', 30) . $v . "\n";
}
$text .= "\nMessage:\n" . $in['message'] . "\n\n—\nSubmitted " . gmdate('Y-m-d H:i') . " UTC.\n";

$html = '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1a1c16;line-height:1.5">'
    . '<h2 style="color:#566b2f;margin:0 0 12px">New contact message from paktalc.com</h2>'
    . '<table cellpadding="6" style="border-collapse:collapse;font-size:14px">';
foreach ($rows as $k => $v) {
    $html .= '<tr><th align="left" style="border-bottom:1px solid #e2dfd5;color:#65624f">' . $h($k) . '</th>'
        . '<td style="border-bottom:1px solid #e2dfd5">' . $h($v) . '</td></tr>';
}
$html .= '</table><h3 style="margin:20px 0 6px">Message</h3><p>' . nl2br($h($in['message'])) . '</p>'
    . '<p style="color:#65624f;font-size:12px">Submitted ' . $h(gmdate('Y-m-d H:i')) . ' UTC. Reply to this email to answer.</p></body></html>';

if (!empty($config['store_copy'])) {
    $dir = pt_storage($config, 'contacts');
    @file_put_contents($dir . '/' . gmdate('Y-m') . '.jsonl', json_encode(['at' => gmdate('c')] + $rows + ['message' => $in['message']], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

try {
    (new PtMailer($config))->send((string) $config['to'], $subjectLine, $text, $html, $in['email']);
} catch (Throwable $e) {
    error_log('[paktalc-contact] send failed: ' . $e->getMessage());
    pt_fail(502, 'We could not send your message just now. Please email ' . ($config['public_email'] ?? 'contact@paktalc.com') . ' directly.');
}

pt_respond(200, ['ok' => true, 'message' => 'Thank you — your message has been sent.'], '/contact/thank-you/');
