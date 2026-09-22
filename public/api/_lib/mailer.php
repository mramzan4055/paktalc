<?php
/**
 * Minimal, dependency-free mail transport: "mail" (PHP mail()), "smtp" (STARTTLS/SSL + AUTH LOGIN), or "log" (write .eml files, for testing).
 * All header values are checked for CR/LF before use (header-injection guard).
 */
declare(strict_types=1);

final class PtMailer
{
    public function __construct(private array $config)
    {
    }

    /** @throws RuntimeException */
    public function send(string $to, string $subject, string $text, string $html, ?string $replyTo): void
    {
        foreach ([$to, $subject, (string) $replyTo, (string) ($this->config['from'] ?? '')] as $h) {
            if (preg_match('/[\r\n]/', $h)) {
                throw new RuntimeException('Header injection attempt');
            }
        }
        $from = (string) ($this->config['from'] ?? 'noreply@paktalc.com');
        $fromName = (string) ($this->config['from_name'] ?? 'PakTalc website');
        $boundary = 'b_' . bin2hex(random_bytes(12));
        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'From: =?UTF-8?B?' . base64_encode($fromName) . "?= <{$from}>",
            'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . (explode('@', $from)[1] ?? 'paktalc.com') . '>',
            'MIME-Version: 1.0',
            "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
            'X-Mailer: PakTalc-RFQ',
        ];
        if ($replyTo) {
            $headers[] = "Reply-To: <{$replyTo}>";
        }
        $body = "--{$boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($text))
            . "--{$boundary}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($html))
            . "--{$boundary}--\r\n";

        $transport = $this->config['transport'] ?? 'mail';
        match ($transport) {
            'smtp' => $this->smtp($from, $to, $encodedSubject, $headers, $body),
            'log' => $this->log($to, $encodedSubject, $headers, $body),
            default => $this->phpMail($from, $to, $encodedSubject, $headers, $body),
        };
    }

    private function phpMail(string $from, string $to, string $subject, array $headers, string $body): void
    {
        $ok = mail($to, $subject, $body, implode("\r\n", $headers), '-f' . escapeshellarg($from));
        if (!$ok) {
            throw new RuntimeException('mail() failed');
        }
    }

    private function log(string $to, string $subject, array $headers, string $body): void
    {
        $dir = rtrim((string) $this->config['storage_dir'], '/\\') . '/outbox';
        if (!is_dir($dir)) {
            @mkdir($dir, 0750, true);
        }
        $file = $dir . '/' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.eml';
        $eml = "To: {$to}\r\nSubject: {$subject}\r\n" . implode("\r\n", $headers) . "\r\n\r\n" . $body;
        if (file_put_contents($file, $eml, LOCK_EX) === false) {
            throw new RuntimeException('Could not write outbox file');
        }
    }

    private function smtp(string $from, string $to, string $subject, array $headers, string $body): void
    {
        $s = $this->config['smtp'] ?? [];
        $host = (string) ($s['host'] ?? '');
        $port = (int) ($s['port'] ?? 587);
        $secure = (string) ($s['secure'] ?? 'tls'); // tls (STARTTLS) | ssl | none
        if ($host === '') {
            throw new RuntimeException('SMTP host not configured');
        }
        $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
        $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host]]);
        $fp = @stream_socket_client($remote, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
        if (!$fp) {
            throw new RuntimeException("SMTP connect failed: {$errstr}");
        }
        stream_set_timeout($fp, 15);
        $read = function () use ($fp): string {
            $out = '';
            while (($line = fgets($fp, 1024)) !== false) {
                $out .= $line;
                if (isset($line[3]) && $line[3] === ' ') {
                    break;
                }
            }
            return $out;
        };
        $cmd = function (string $c, array $expect) use ($fp, $read): string {
            fwrite($fp, $c . "\r\n");
            $r = $read();
            if (!in_array((int) substr($r, 0, 3), $expect, true)) {
                throw new RuntimeException('SMTP error after "' . explode(' ', $c)[0] . '": ' . trim($r));
            }
            return $r;
        };
        $ehloHost = (string) (explode('@', $from)[1] ?? 'localhost');
        $greet = $read();
        if ((int) substr($greet, 0, 3) !== 220) {
            throw new RuntimeException('SMTP greeting failed');
        }
        $cmd("EHLO {$ehloHost}", [250]);
        if ($secure === 'tls') {
            $cmd('STARTTLS', [220]);
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
                throw new RuntimeException('STARTTLS failed');
            }
            $cmd("EHLO {$ehloHost}", [250]);
        }
        if (!empty($s['username'])) {
            $cmd('AUTH LOGIN', [334]);
            $cmd(base64_encode((string) $s['username']), [334]);
            $cmd(base64_encode((string) ($s['password'] ?? '')), [235]);
        }
        $cmd("MAIL FROM:<{$from}>", [250]);
        $cmd("RCPT TO:<{$to}>", [250, 251]);
        $cmd('DATA', [354]);
        // Dot-stuffing per RFC 5321
        $data = "To: <{$to}>\r\nSubject: {$subject}\r\n" . implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $data = preg_replace('/^\./m', '..', $data);
        $cmd($data . "\r\n.", [250]);
        $cmd('QUIT', [221]);
        fclose($fp);
    }
}
