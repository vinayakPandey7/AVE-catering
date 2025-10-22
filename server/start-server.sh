#!/bin/bash

echo "🚀 Starting AVE Catering Server..."

# Check if port 5000 is available
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5000 is in use by macOS Control Center (AirPlay)"
    echo "🔧 To use port 5000, disable AirPlay Receiver in:"
    echo "   System Preferences > Sharing > AirPlay Receiver"
    echo ""
    echo "🔄 Starting server on port 8000 instead..."
    export PORT=8000
else
    echo "✅ Port 5000 is available, starting server on port 5000..."
    export PORT=5000
fi

echo "🚀 Server starting on port $PORT..."
npm run dev
