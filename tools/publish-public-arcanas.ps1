$ErrorActionPreference = 'Stop'
$studioRoot = Split-Path $PSScriptRoot -Parent
Set-Location $studioRoot
& "$studioRoot\runtime\node.exe" "$PSScriptRoot\publish-public-arcanas.mjs"
if ($LASTEXITCODE -ne 0) { throw 'Arcana export failed. R2 upload was not started.' }
& py -3 "$PSScriptRoot\upload-static-r2.py"
if ($LASTEXITCODE -ne 0) { throw 'R2 upload failed. Keep the exported cache and retry the upload.' }
