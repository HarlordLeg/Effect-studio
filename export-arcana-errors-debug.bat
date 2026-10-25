@echo off
setlocal
cd /d "%~dp0"
set "ARCANA_NODE=node"
if exist "runtime\node.exe" set "ARCANA_NODE=runtime\node.exe"
"%ARCANA_NODE%" tools\export-arcana-errors-debug.mjs
if errorlevel 1 goto failed
powershell -NoProfile -Command "Compress-Archive -Path 'output\arcana-errors-debug\*.vpk' -DestinationPath 'output\arcana-errors-debug.zip' -Force"
if errorlevel 1 goto failed
echo READY: output\arcana-errors-debug.zip
pause
exit /b 0
:failed
echo FAILED. See the error above.
pause
exit /b 1
