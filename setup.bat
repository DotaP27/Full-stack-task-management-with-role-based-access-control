@echo off

REM Team Task Manager Setup Script for Windows

echo Team Task Manager - Setup Script
echo ==================================

REM Backend setup
echo.
echo Setting up Backend...
cd backend

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Copy .env file
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please update the .env file with your database credentials
)

cd ..

REM Frontend setup
echo.
echo Setting up Frontend...
cd frontend

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    exit /b 1
)

REM Install dependencies
echo Installing Node dependencies...
npm install

REM Copy .env file
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your database URL
echo 2. Update frontend\.env if needed
echo 3. Start the backend: cd backend ^&^& venv\Scripts\activate.bat ^&^& python main.py
echo 4. Start the frontend: cd frontend ^&^& npm run dev
echo.
