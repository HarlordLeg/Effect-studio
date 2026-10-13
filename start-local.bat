@echo off
setlocal
cd /d "%~dp0"
node --version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Install Node.js 22 or newer.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:8787 after the server starts.
node server.mjs
pause
