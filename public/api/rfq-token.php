<?php
/** Issues a signed, time-stamped, single-use form token (GET, JSON). */
declare(strict_types=1);
require __DIR__ . '/_lib/bootstrap.php';

pt_security_headers();
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    pt_respond(405, ['ok' => false]);
}
$config = pt_config();
pt_check_origin($config);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['token' => pt_issue_token($config)]);
