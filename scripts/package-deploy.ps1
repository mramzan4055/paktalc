$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$stage = Join-Path $root "deploy-staging"
$zip = Join-Path $root "paktalc-hostinger-deploy.zip"

if (Test-Path $stage) { Remove-Item -Recurse -Force $stage }
New-Item -ItemType Directory -Path $stage | Out-Null

# Copy the static site, including .htaccess.
$public = Join-Path $stage "public_html"
New-Item -ItemType Directory -Path $public -Force | Out-Null
Copy-Item -Path (Join-Path $root "out\*") -Destination $public -Recurse -Force
Copy-Item -Path (Join-Path $root "out\.htaccess") -Destination (Join-Path $public ".htaccess") -Force

$private = Join-Path $stage "php-private"
$storage = Join-Path $private "storage"
New-Item -ItemType Directory -Path $storage -Force | Out-Null
Copy-Item (Join-Path $root "php-private\config.example.php") (Join-Path $private "config.example.php") -Force
Copy-Item (Join-Path $root "php-private\.htaccess") (Join-Path $private ".htaccess") -Force
Set-Content -Path (Join-Path $storage ".htaccess") -Value "Require all denied" -Encoding ascii

$note = @"
PakTalc — extract the zip first, then upload the contents of public_html/ to the web root.

Upload php-private/ BESIDE public_html/; create config.php there from config.example.php and fill in private credentials.

Never upload config.php into public_html or add it to the deploy ZIP.

After upload:
1. Open https://paktalc.com/ and click through a few pages.
2. Send a test enquiry from the quote form.
3. Confirm the message arrives at contact@paktalc.com.
4. Visit https://paktalc.com/php-private/config.php — it must NOT show the file (403 or 404).

PHP 8.1 or newer is required. Confirm the SMTP settings with your hosting mailbox.
"@
Set-Content -Path (Join-Path $stage "UPLOAD.txt") -Value $note -Encoding utf8

if (Test-Path $zip) { Remove-Item -Force $zip }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($stage, $zip)
Remove-Item -Recurse -Force $stage

$item = Get-Item $zip
Write-Output ("zip bytes " + $item.Length)
