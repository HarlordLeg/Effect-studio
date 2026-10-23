$ErrorActionPreference = 'Stop'
Push-Location (Split-Path -Parent $PSScriptRoot)
try {
    & '.\runtime\node.exe' '.\tools\connect-new-arcanas.mjs'
    if ($LASTEXITCODE -ne 0) { throw 'Connection failed. See output\new-arcanas-connection.json. R2 was not modified.' }
    & '.\tools\upload-static-r2.ps1'
} finally { Pop-Location }
