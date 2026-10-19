@echo off
title Uploading KisanMitra AI to GitHub
echo ========================================================
echo          Uploading KisanMitra AI to GitHub
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/4] Checking Git Repository...
if not exist ".git" (
    echo Initializing new Git repository...
    git init
)

echo.
echo [2/4] Configuring Remote Origin...
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Adding remote origin: https://github.com/sonampandey111/kisanmitra-ai.git
    git remote add origin https://github.com/sonampandey111/kisanmitra-ai.git
) else (
    git remote set-url origin https://github.com/sonampandey111/kisanmitra-ai.git
)

echo.
echo [3/4] Staging and Committing Code...
git branch -M main
git add .
git commit -m "feat: complete KisanMitra AI - End-to-End Smart Farm Advisor (Leaf Blight Computer Vision, Weather Spray Window, Satellite NDVI & Live Mandi Marketplace)"

echo.
echo [4/4] Pushing to GitHub (https://github.com/sonampandey111/kisanmitra-ai)...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   [SUCCESS] KisanMitra AI is live on GitHub!
    echo   Repository: https://github.com/sonampandey111/kisanmitra-ai
    echo ========================================================
) else (
    echo ========================================================
    echo   [NOTICE / ACTION NEEDED]
    echo   If the repository has not been created on GitHub yet:
    echo   1. Open: https://github.com/new
    echo   2. Repository name: kisanmitra-ai
    echo   3. Click "Create repository"
    echo   4. Re-run this push_to_github.bat script!
    echo ========================================================
)
echo.
pause
