$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    & .\runtime\node.exe .\tools\refresh-windrunner-catalog.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Windranger catalog refresh failed.' }
    & .\runtime\node.exe .\tools\publish-public-arcanas.mjs --hero windrunner
    if ($LASTEXITCODE -ne 0) { throw 'Windranger export failed. R2 upload was not started.' }
    & powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\upload-static-r2.ps1
    if ($LASTEXITCODE -ne 0) { throw 'R2 upload failed.' }
} finally { Pop-Location }
