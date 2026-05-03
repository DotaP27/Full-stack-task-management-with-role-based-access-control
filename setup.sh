#!/bin/bash

# Team Task Manager Setup Script

echo "Team Task Manager - Setup Script"
echo "=================================="

# Backend setup
echo ""
echo "Setting up Backend..."
cd backend

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Copy .env file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please update the .env file with your database credentials"
fi

cd ..

# Frontend setup
echo ""
echo "Setting up Frontend..."
cd frontend

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Install dependencies
echo "Installing Node dependencies..."
npm install

# Copy .env file
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database URL"
echo "2. Update frontend/.env if needed"
echo "3. Start the backend: cd backend && source venv/bin/activate && python main.py"
echo "4. Start the frontend: cd frontend && npm run dev"
echo ""
