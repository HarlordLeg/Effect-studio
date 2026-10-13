@echo off
cd /d "%~dp0"
if exist runtime\node.exe (
 runtime\node.exe tools\configure-admin.mjs
) else (
 node tools\configure-admin.mjs
)
pause
