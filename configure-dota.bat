@echo off
setlocal
cd /d "%~dp0"
node tools\configure-dota.mjs
pause
