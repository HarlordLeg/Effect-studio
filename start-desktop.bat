@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules\electron\dist\electron.exe (
  echo [ERROR] First run setup-desktop.bat.
  pause
  exit /b 1
)
call npm run desktop
pause
