@echo off
setlocal
cd /d "%~dp0"
node tools\build-native.mjs assets
if errorlevel 1 goto fail
echo [OK] Native build complete.
if not defined DES_UPDATE pause
exit /b 0
:fail
echo [ERROR] Build failed. Copy the complete output above.
if not defined DES_UPDATE pause
exit /b 1
