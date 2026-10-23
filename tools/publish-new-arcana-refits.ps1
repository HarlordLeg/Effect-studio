$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    $node = Join-Path (Get-Location) 'runtime\node.exe'
    $failed = @()
    foreach ($hero in @('earthshaker','faceless_void','juggernaut','nevermore','ogre_magi','phantom_assassin','queenofpain','razor','skeleton_king','spectre','tidehunter','windrunner','wisp')) {
        & cmd.exe /d /c ('"' + $node + '" .\tools\publish-public-arcanas.mjs --hero ' + $hero + ' 2>&1')
        if ($LASTEXITCODE -ne 0) { $failed += $hero; Write-Warning ('FAILED: ' + $hero + '. Continuing with other heroes.') }
    }
    if ($failed.Count) { throw ('Some refit exports failed: ' + ($failed -join ', ') + '. Completed style checkpoints were saved; R2 was not uploaded.') }
    & '.\tools\upload-static-r2.ps1'
} finally { Pop-Location }
