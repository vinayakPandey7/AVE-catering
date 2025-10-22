#!/bin/bash

echo "🔧 Disabling AirPlay Receiver to free port 5000..."

# Disable AirPlay Receiver (this frees up port 5000)
sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.controlcenter.plist 2>/dev/null || echo "Control Center already disabled"

# Wait for port to be freed
sleep 3

# Set environment variable
export PORT=5000

echo "🚀 Starting server on port 5000..."
npm run dev
