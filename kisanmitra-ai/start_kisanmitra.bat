@echo off
title KisanMitra AI - End-to-End Farm Advisor
echo ========================================================
echo        Starting KisanMitra AI Development Server
echo ========================================================
echo.
cd /d "%~dp0"

if not exist "node_modules" (
    echo [INFO] Installing required dependencies...
    npm install
)

echo.
echo [INFO] Launching KisanMitra AI on Vite...
echo.
npm run dev

pause
