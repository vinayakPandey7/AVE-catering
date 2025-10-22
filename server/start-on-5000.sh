#!/bin/bash

echo "🔧 Attempting to free port 5000..."

# Kill any process using port 5000
lsof -ti:5000 | xargs kill -9 2>/dev/null || echo "No processes found on port 5000"

# Wait a moment for the port to be freed
sleep 2

echo "🚀 Starting server on port 5000..."

# Set PORT environment variable to 5000
export PORT=5000

# Start the server
npm run dev
