param([switch]$Remaining)
$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    $node = Join-Path (Get-Location) 'runtime\node.exe'
    if (-not (Test-Path $node)) { throw 'runtime\node.exe is missing.' }
    & $node '.\tools\audit-public-arcanas.mjs'
    if ($LASTEXITCODE -ne 0) { throw 'Arcana audit failed. Check output\public-arcanas-audit.json.' }
    $failed = @()
    $heroes = if ($Remaining) { @('vengefulspirit','skywrath_mage','zuus','crystal_maiden') } else { @('legion_commander','pudge','vengefulspirit','skywrath_mage','zuus','crystal_maiden') }
    foreach ($hero in $heroes) {
        Write-Host ('START: ' + $hero)
        # cmd keeps native stderr in the log without PowerShell treating each
        # stderr line as a terminating exception before other heroes can run.
        & cmd.exe /d /c "`"$node`" .\tools\publish-public-arcanas.mjs --hero $hero 2>&1"
        if ($LASTEXITCODE -ne 0) {
            $failed += $hero
            Write-Warning ('FAILED: ' + $hero + '. Continuing with other heroes.')
        }
    }
    if ($failed.Count -gt 0) { throw ('Some arcanas failed: ' + ($failed -join ', ') + '. Completed style checkpoints were saved. Nothing was uploaded to R2.') }
    Write-Host 'Selected arcanas exported. Run tools\upload-static-r2.ps1 next.'
} finally { Pop-Location }
