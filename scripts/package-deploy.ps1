$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$stage = Join-Path $root "deploy-staging"
$zip = Join-Path $root "paktalc-hostinger-public_html.zip"

if (Test-Path $stage) { Remove-Item -Recurse -Force $stage }
New-Item -ItemType Directory -Path $stage | Out-Null

# Copy the static site, including .htaccess.
Copy-Item -Path (Join-Path $root "out\*") -Destination $stage -Recurse -Force
Copy-Item -Path (Join-Path $root "out\.htaccess") -Destination (Join-Path $stage ".htaccess") -Force

$private = Join-Path $stage "php-private"
$storage = Join-Path $private "storage"
New-Item -ItemType Directory -Path $storage -Force | Out-Null
Copy-Item (Join-Path $root "php-private\config.php") (Join-Path $private "config.php") -Force
Copy-Item (Join-Path $root "php-private\.htaccess") (Join-Path $private ".htaccess") -Force
Set-Content -Path (Join-Path $storage ".htaccess") -Value "Require all denied" -Encoding ascii

$note = @"
PakTalc — upload this zip into public_html and extract it there.

The site files (index.html, images, CSS, the enquiry form) must sit directly in public_html, not inside another folder.

php-private/ holds the mail password. Apache is set to refuse web access to that folder. Do not move config.php into a public folder of its own.

After upload:
1. Open https://paktalc.com/ and click through a few pages.
2. Send a test enquiry from the quote form.
3. Confirm the message arrives at contact@paktalc.com.
4. Visit https://paktalc.com/php-private/config.php — it must NOT show the file (403 or 404).

PHP 8.1 or newer is required. Mail uses smtp.hostinger.com, port 465, SSL, mailbox contact@paktalc.com.
"@
Set-Content -Path (Join-Path $stage "UPLOAD.txt") -Value $note -Encoding utf8

if (Test-Path $zip) { Remove-Item -Force $zip }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($stage, $zip)
Remove-Item -Recurse -Force $stage

$item = Get-Item $zip
Write-Output ("zip bytes " + $item.Length)
