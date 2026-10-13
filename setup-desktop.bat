@echo off
setlocal
cd /d "%~dp0"
call npm install
if errorlevel 1 (
  echo [ERROR] Dependency installation failed.
  pause
  exit /b 1
)
echo [OK] Dependencies installed. Run start-desktop.bat.
pause
