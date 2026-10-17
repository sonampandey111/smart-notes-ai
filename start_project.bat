@echo off
echo ===================================================
echo       Launching SmartNotes AI Fullstack App
echo ===================================================
echo.

echo Starting Flask Backend Server on http://127.0.0.1:5000 ...
start "SmartNotes AI - Backend" cmd /k "cd /d %~dp0backend && python -m pip install -r requirements.txt && python app.py"

echo Starting React Vite Frontend on http://localhost:5173 ...
start "SmartNotes AI - Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo.
echo Both services are launching in separate windows!
echo - Backend: http://127.0.0.1:5000
echo - Frontend: http://localhost:5173
echo.
pause
