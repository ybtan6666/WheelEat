@echo off
echo ========================================
echo Starting WheelEat Backend Server
echo ========================================
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        echo Please make sure Python is installed and in your PATH
        pause
        exit /b 1
    )
)

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Checking if dependencies are installed...
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo Dependencies not found. Installing...
    echo.
    echo Using installation script (handles Python 3.14 compatibility)...
    python install.py
    if errorlevel 1 (
        echo.
        echo ERROR: Installation failed
        echo.
        echo If you're using Python 3.14 and got a Rust error:
        echo 1. Install Rust from https://rustup.rs/
        echo 2. Restart this terminal
        echo 3. Run this script again
        echo.
        echo Or use Python 3.12 instead (no Rust needed)
        echo.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Checking database schema...
python -c "from database import SpinLog; from sqlalchemy import inspect; engine = __import__('database', fromlist=['engine']).engine; inspector = inspect(engine); cols = [c['name'] for c in inspector.get_columns('spin_logs')] if 'spin_logs' in inspector.get_table_names() else []; exit(0 if 'restaurant_name' in cols else 1)" 2>nul
if errorlevel 1 (
    echo Database schema is outdated. Resetting database...
    python reset_database.py
    if errorlevel 1 (
        echo ERROR: Failed to reset database
        pause
        exit /b 1
    )
)

echo.
echo Checking database schema...
python -c "import sqlite3; import os; db_file = 'wheeleat.db'; conn = sqlite3.connect(db_file) if os.path.exists(db_file) else None; has_restaurant_name = False; conn and (has_restaurant_name := 'restaurant_name' in [row[1] for row in conn.execute('PRAGMA table_info(spin_logs)').fetchall()]); conn and conn.close(); exit(0 if has_restaurant_name or not os.path.exists(db_file) else 1)" 2>nul
if errorlevel 1 (
    echo.
    echo Database schema is outdated. Resetting database...
    python reset_database.py
    if errorlevel 1 (
        echo ERROR: Failed to reset database
        echo You can manually delete wheeleat.db and restart
        pause
        exit /b 1
    )
    echo Database reset complete!
)

echo.
echo ========================================
echo Backend server starting on http://localhost:8000
echo Press Ctrl+C to stop the server
echo ========================================
echo.

uvicorn main:app --reload --port 8000
