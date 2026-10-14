@echo off
setlocal
cd /d "%~dp0.."
if exist runtime\node.exe (
  runtime\node.exe tools\preexport-models.mjs %*
) else (
  node tools\preexport-models.mjs %*
)
pause
