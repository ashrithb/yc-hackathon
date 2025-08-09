#!/bin/bash

echo "🎬 Starting Dynamic Website Personalization Demo"

# Function to check if port is in use
check_port() {
    lsof -i :$1 >/dev/null 2>&1
}

# Kill existing processes on our ports
echo "🧹 Cleaning up existing processes..."
if check_port 5000; then
    echo "Stopping process on port 5000..."
    lsof -ti :5000 | xargs kill -9 2>/dev/null
fi

if check_port 3000; then
    echo "Stopping process on port 3000..."
    lsof -ti :3000 | xargs kill -9 2>/dev/null
fi

# Start backend
echo "🐍 Starting Python backend..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "⚛️  Starting React frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "🎉 Demo is starting up!"
echo "📡 Backend running on: http://localhost:5000"
echo "🌐 Frontend running on: http://localhost:3000"
echo ""
echo "🎬 Demo Instructions:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Use the demo controls (bottom-left) to simulate different users:"
echo "   - Sarah: Pricing-focused returning visitor"
echo "   - Marcus: Content explorer who reads everything"
echo "   - Alex: Quick browser who wants simplicity"
echo "3. Watch the AI optimize the page in real-time!"
echo "4. Toggle analytics (top bar) to see optimization metrics"
echo ""
echo "Press Ctrl+C to stop the demo"

# Wait for user to stop the demo
trap "echo '🛑 Stopping demo...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
