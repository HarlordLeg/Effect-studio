@echo off
setlocal
cd /d "%~dp0"
set DES_UPDATE=1
call build-patcher.bat
if errorlevel 1 goto fail
call build-assets.bat
if errorlevel 1 goto fail
node tools\sync-executables.mjs
if errorlevel 1 goto fail
echo [OK] Both executables updated. Restart the app.
pause
exit /b 0
:fail
echo [ERROR] Update failed. Copy the complete output above.
pause
exit /b 1
