@echo off
echo ========================================
echo Starting WheelEat Frontend
echo ========================================
cd frontend

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        echo Please make sure Node.js and npm are installed
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo Frontend starting on http://localhost:3000
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call npm start
