@echo off
cd /d "%~dp0"
if exist runtime\node.exe (runtime\node.exe tools\publish-static-viewer.mjs %*) else (node tools\publish-static-viewer.mjs %*)
if errorlevel 1 echo [ERROR] Static export failed. Read the output above.
pause
