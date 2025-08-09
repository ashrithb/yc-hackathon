#!/bin/bash

echo "🚀 Setting up Dynamic Website Personalization Demo"

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    exit 1
fi

echo "✅ Dependencies check passed"

# Setup backend
echo "🐍 Setting up Python backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

echo "✅ Backend setup complete"

# Setup frontend
echo "⚛️  Setting up React frontend..."
cd ../frontend

# Install dependencies
npm install

echo "✅ Frontend setup complete"

echo "🎉 Setup complete!"
echo ""
echo "To start the demo:"
echo "1. Terminal 1: cd backend && source venv/bin/activate && python app.py"
echo "2. Terminal 2: cd frontend && npm run dev"
echo "3. Open http://localhost:3000"
echo ""
echo "🎬 Use the demo controls in the bottom-left to simulate different user behaviors!"
