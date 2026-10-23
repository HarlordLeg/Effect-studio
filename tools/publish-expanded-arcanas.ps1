$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    $node = Join-Path (Get-Location) 'runtime\node.exe'
    if (-not (Test-Path $node)) { throw 'runtime\node.exe is missing. Run this script from the deployed Windows app.' }
    & $node '.\tools\audit-public-arcanas.mjs'
    if ($LASTEXITCODE -ne 0) { throw 'Arcana audit failed. Check output\public-arcanas-audit.json before publishing.' }
    foreach ($hero in @('legion_commander','pudge','vengefulspirit','skywrath_mage','zuus','crystal_maiden')) {
        & $node '.\tools\publish-public-arcanas.mjs' '--hero' $hero
        if ($LASTEXITCODE -ne 0) { throw ('Arcana export failed: ' + $hero + '. Nothing was uploaded to R2.') }
    }
    Write-Host 'Six arcana exports completed. Run tools\upload-static-r2.ps1 to upload the assets and manifest.'
} finally {
    Pop-Location
}
