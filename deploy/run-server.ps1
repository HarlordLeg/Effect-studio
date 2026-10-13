param([Parameter(Mandatory=$true)][string]$AppDirectory)
$ErrorActionPreference='Stop'
$AppDirectory=[IO.Path]::GetFullPath($AppDirectory)
$logs=Join-Path $PSScriptRoot 'logs'
New-Item -ItemType Directory -Force -Path $logs | Out-Null
while ($true) {
  $stamp=Get-Date -Format 'yyyyMMdd-HHmmss'
  $child=Start-Process -FilePath (Join-Path $AppDirectory 'runtime\node.exe') -ArgumentList ('"'+(Join-Path $AppDirectory 'server.mjs')+'"') -WorkingDirectory $AppDirectory -RedirectStandardOutput (Join-Path $logs ($stamp+'.out.log')) -RedirectStandardError (Join-Path $logs ($stamp+'.err.log')) -PassThru
  $child.WaitForExit()
  Get-ChildItem $logs -File | Sort-Object LastWriteTime -Descending | Select-Object -Skip 40 | Remove-Item -Force
  Start-Sleep -Seconds 5
}
