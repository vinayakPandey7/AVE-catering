#!/bin/bash

echo "🔧 Forcing server to run on port 5000..."

# Kill any process using port 5000 (including macOS Control Center)
echo "Stopping processes on port 5000..."
sudo lsof -ti:5000 | xargs sudo kill -9 2>/dev/null || echo "No processes found on port 5000"

# Wait for port to be freed
sleep 3

# Set environment variable
export PORT=5000

echo "🚀 Starting server on port 5000..."
npm run dev
