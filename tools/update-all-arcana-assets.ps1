# Run after deployment; one publisher at a time uses static-publish.lock.
$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    & .\runtime\node.exe .\tools\refresh-windrunner-catalog.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Catalog refresh failed.' }
    & .\runtime\node.exe .\tools\publish-all-arcana-previews.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Arcana export failed. Completed styles remain checkpointed. R2 upload was not started.' }
    & powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\upload-static-r2.ps1
    if ($LASTEXITCODE -ne 0) { throw 'R2 upload failed. Retain the cache and retry upload.' }
} finally { Pop-Location }
