@echo off
title Launching AquaStrip AI
echo ========================================================
echo        Starting AquaStrip AI - Water Quality Scanner
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/2] Checking dependencies...
if not exist "node_modules" (
    echo Installing required packages...
    call npm install
)

echo.
echo [2/2] Launching AquaStrip AI on localhost:5173...
echo.
start http://localhost:5173
call npm run dev
pause
