param([Parameter(Mandatory=$true)][string]$DotaPath,[string]$OutputPath=(Join-Path $PSScriptRoot ('hud-preview-assets-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))))
$ErrorActionPreference='Stop'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Установите Node.js или запустите из папки проекта на сервере с Node.js.' }
$zipPath=$OutputPath+'.zip'
if (Test-Path -LiteralPath $zipPath) { throw "Архив уже существует: $zipPath" }
& node (Join-Path $PSScriptRoot 'tools/collect-hud-preview.mjs') $DotaPath $OutputPath
if ($LASTEXITCODE -ne 0) { throw 'Сбор ресурсов завершился с ошибкой. Архив не создан.' }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($OutputPath,$zipPath,[System.IO.Compression.CompressionLevel]::Fastest,$false)
Write-Host "Готово. Прикрепи этот архив в чат: $zipPath"
