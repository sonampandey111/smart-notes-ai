@echo off
title Uploading Smart AI Notes Analyzer to GitHub
echo ========================================================
echo     Uploading Smart AI Notes Analyzer to GitHub
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/3] Checking Git Status...
git status -s
echo.

echo [2/3] Staging and Committing Changes...
git add .
git commit -m "feat: complete Smart AI Notes Analyzer with PDF, DOCX, TXT, MongoDB, Gemini AI quiz, flashcards, bilingual support"

echo.
echo [3/3] Pushing to GitHub repository...
echo Repository: https://github.com/sonampandey111/smart-notes-ai
echo Branch:     main
echo.
git branch -M main
git push --force -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   [SUCCESS] Code successfully uploaded to GitHub!
    echo   View your repository at:
    echo   https://github.com/sonampandey111/smart-notes-ai
    echo ========================================================
) else (
    echo [ERROR] Push failed. If authentication or permissions are needed,
    echo make sure you are logged into GitHub in your terminal or browser.
)
echo.
pause
