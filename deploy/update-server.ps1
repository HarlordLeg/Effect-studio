param([Parameter(Mandatory=$true)][string]$ArtifactZip)
$ErrorActionPreference='Stop'
$settings=Get-Content (Join-Path $PSScriptRoot 'settings.json') -Raw | ConvertFrom-Json
$app=[IO.Path]::GetFullPath($settings.appDirectory).TrimEnd('\');$task=$settings.taskName
$managed=@('public','lib','licenses','samples','runtime','patcher\publish','asset-bridge\publish','tools','server.mjs','desktop.cjs','package.json','config.example.json','start-local.bat','start-desktop.bat','configure-dota.bat','configure-pages.bat','data\catalog.json','data\effect-collections.json','data\frostbloom.json')
$stage=Join-Path $PSScriptRoot ('stage-'+[guid]::NewGuid().ToString('N'))
$backup=Join-Path $PSScriptRoot 'previous'
function Copy-Managed([string]$from,[string]$to) {
  foreach($relative in $managed) {
    $source=Join-Path $from $relative;$target=Join-Path $to $relative
    if (Test-Path $source -PathType Container) {
      New-Item -ItemType Directory -Force -Path $target | Out-Null
      & robocopy $source $target /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS /NP | Out-Null
      if ($LASTEXITCODE -ge 8) { throw "Copy failed: $relative ($LASTEXITCODE)" }
    } elseif (Test-Path $source -PathType Leaf) {
      New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
      Copy-Item $source $target -Force
    } else { throw "Missing managed file: $relative" }
  }
}
function Stop-App {
  Stop-ScheduledTask -TaskName $task
  Start-Sleep -Seconds 2
  $node=Join-Path $app 'runtime\node.exe'
  Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.ExecutablePath -eq $node -and $_.CommandLine -match 'server\.mjs' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}
function Wait-App {
  $config=Get-Content (Join-Path $app 'config.json') -Raw | ConvertFrom-Json
  for($i=0;$i -lt 45;$i++) {
    try { $result=Invoke-RestMethod -Uri ('http://127.0.0.1:'+$config.port+'/api/health') -TimeoutSec 2; if ($result.status -eq 'ready') { return } } catch {}
    Start-Sleep -Seconds 1
  }
  throw 'Server did not become healthy. See deployment logs.'
}
$stopped=$false;$backedUp=$false
try {
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  New-Item -ItemType Directory -Force -Path $stage | Out-Null
  $zip=[IO.Compression.ZipFile]::OpenRead([IO.Path]::GetFullPath($ArtifactZip))
  try {
    foreach($entry in $zip.Entries) {
      $target=[IO.Path]::GetFullPath((Join-Path $stage $entry.FullName))
      if (-not $target.StartsWith($stage+'\',[StringComparison]::OrdinalIgnoreCase)) { throw 'Invalid archive entry.' }
    }
  } finally { $zip.Dispose() }
  [IO.Compression.ZipFile]::ExtractToDirectory([IO.Path]::GetFullPath($ArtifactZip),$stage)
  $incoming=Join-Path $stage 'DotaEffectStudio'
  foreach($relative in $managed) { if (-not (Test-Path (Join-Path $incoming $relative))) { throw "Incomplete artifact: $relative" } }
  foreach($relative in @('server.mjs','lib\request-access.mjs')) {
    & (Join-Path $incoming 'runtime\node.exe') --check (Join-Path $incoming $relative)
    if($LASTEXITCODE -ne 0){throw 'JavaScript validation failed.'}
  }
  foreach($relative in @('patcher\publish\Dota2UnusualPatcher.exe','asset-bridge\publish\DotaAssetBridge.exe')) {
    $capabilities=& (Join-Path $incoming $relative) --capabilities
    if($LASTEXITCODE -ne 0){throw "Native validation failed: $relative"}
    $null=$capabilities | ConvertFrom-Json
  }
  $stopped=$true;Stop-App
  # Existing manual installs may lack newer BAT files; only copy incoming-managed paths that exist.
  if(Test-Path $backup){Remove-Item $backup -Recurse -Force}
  New-Item -ItemType Directory -Path $backup | Out-Null
  $savedManaged=$managed;$managed=@($managed | Where-Object {Test-Path (Join-Path $app $_)})
  Copy-Managed $app $backup;$managed=$savedManaged;$backedUp=$true
  Copy-Managed $incoming $app
  Start-ScheduledTask -TaskName $task
  Wait-App
  Write-Host 'Update installed. Settings, cache, site keys, output and docs were preserved.'
} catch {
  $failure=$_
  if($stopped) {
    Stop-App
    if($backedUp) { $managed=@($managed | Where-Object {Test-Path (Join-Path $backup $_)});Copy-Managed $backup $app }
    Start-ScheduledTask -TaskName $task
    Write-Warning 'Previous application restored. Check logs before retrying.'
  }
  throw $failure
} finally { if(Test-Path $stage){Remove-Item $stage -Recurse -Force} }
