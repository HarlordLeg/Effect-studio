$ErrorActionPreference = 'Stop'
$uploader = Join-Path $PSScriptRoot 'upload-static-r2.py'
if (-not (Test-Path $uploader)) { throw 'upload-static-r2.py is missing. Update the application first.' }
if (-not $env:R2_ACCOUNT_ID) {
    $account = Read-Host 'Cloudflare Account ID [6e7d6fe4e71b6cb4c3dcc6bfe8209ad3]'
    if (-not $account) { $account = '6e7d6fe4e71b6cb4c3dcc6bfe8209ad3' }
    $env:R2_ACCOUNT_ID = $account.Trim()
}
if (-not $env:R2_BUCKET) { $env:R2_BUCKET = 'dota-studio-assets' }
if (-not $env:AWS_ACCESS_KEY_ID) { $env:AWS_ACCESS_KEY_ID = (Read-Host 'R2 S3 Access Key ID').Trim() }
if (-not $env:AWS_SECRET_ACCESS_KEY -or $env:AWS_SECRET_ACCESS_KEY.Length -lt 32) {
    $r2Secret = Read-Host 'R2 S3 Secret Access Key' -AsSecureString
    $r2Pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($r2Secret)
    try { $env:AWS_SECRET_ACCESS_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($r2Pointer).Trim() }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($r2Pointer); $r2Secret.Dispose() }
}
if ($env:R2_ACCOUNT_ID -notmatch '^[a-fA-F0-9]{32}$') { throw 'Invalid Cloudflare Account ID.' }
if ($env:AWS_ACCESS_KEY_ID.Length -ne 32 -or $env:AWS_SECRET_ACCESS_KEY.Length -lt 32) { throw 'Invalid S3 key lengths. Use the R2 S3 Access Key ID and Secret Access Key, not the Cloudflare OAuth/API bearer token.' }
& py -3 $uploader
if ($LASTEXITCODE -ne 0) { throw "R2 upload failed (exit $LASTEXITCODE)." }
