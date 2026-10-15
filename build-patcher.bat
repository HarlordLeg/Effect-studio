@echo off
setlocal
cd /d "%~dp0"
dotnet run --project tests\ModelKeyText.Tests.csproj -c Release
if errorlevel 1 goto fail
dotnet run --project tests\hero-activities\HeroActivities.Tests.csproj -c Release
if errorlevel 1 goto fail
dotnet run --project tests\terrorblade-arcana\TerrorbladeArcana.Tests.csproj -c Release
if errorlevel 1 goto fail
node tools\build-native.mjs patcher
if errorlevel 1 goto fail
echo [OK] Native build complete.
if not defined DES_UPDATE pause
exit /b 0
:fail
echo [ERROR] Build failed. Copy the complete output above.
if not defined DES_UPDATE pause
exit /b 1
