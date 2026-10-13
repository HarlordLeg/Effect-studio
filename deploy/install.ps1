param([string]$AppDirectory='D:\DotaEffectStudio',[string]$DeployDirectory='D:\DotaEffectStudio-deploy')
$ErrorActionPreference='Stop'
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) { throw 'Run PowerShell as Administrator.' }
$AppDirectory=[IO.Path]::GetFullPath($AppDirectory).TrimEnd('\')
$DeployDirectory=[IO.Path]::GetFullPath($DeployDirectory).TrimEnd('\')
if ($AppDirectory.Contains('"') -or $DeployDirectory.Contains('"') -or $AppDirectory -eq $DeployDirectory -or $DeployDirectory.StartsWith($AppDirectory+'\',[StringComparison]::OrdinalIgnoreCase)) { throw 'Deployment directory must be outside the app.' }
foreach($file in @('runtime\node.exe','server.mjs','config.json')) { if (-not (Test-Path (Join-Path $AppDirectory $file))) { throw "Missing app file: $file" } }
New-Item -ItemType Directory -Force -Path $DeployDirectory | Out-Null
foreach($file in @('run-server.ps1','update-server.ps1')) { Copy-Item (Join-Path $PSScriptRoot $file) (Join-Path $DeployDirectory $file) -Force }
@{appDirectory=$AppDirectory;taskName='DotaEffectStudio-Server'} | ConvertTo-Json | Set-Content (Join-Path $DeployDirectory 'settings.json') -Encoding UTF8
$action=New-ScheduledTaskAction -Execute "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" -Argument ('-NoProfile -ExecutionPolicy Bypass -File "'+(Join-Path $DeployDirectory 'run-server.ps1')+'" -AppDirectory "'+$AppDirectory+'"') -WorkingDirectory $AppDirectory
$settings=New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit ([TimeSpan]::Zero) -RestartCount 100 -RestartInterval (New-TimeSpan -Minutes 1) -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName 'DotaEffectStudio-Server' -Action $action -Trigger (New-ScheduledTaskTrigger -AtStartup) -Settings $settings -User 'SYSTEM' -RunLevel Highest -Force | Out-Null
Start-ScheduledTask -TaskName 'DotaEffectStudio-Server'
Write-Host "Installed. App starts at boot. Logs: $DeployDirectory\logs"
Write-Host 'Set repository variable DES_DEPLOY_DIR to this deployment directory.'
