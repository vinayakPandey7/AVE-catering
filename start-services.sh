#!/bin/bash

echo "🚀 Starting Wholesale Market Services..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_service() {
    echo -e "${BLUE}[SERVICE]${NC} $1"
}

# Start Backend Server
print_service "Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait a moment
sleep 3

# Start Frontend Client
print_service "Starting Frontend Client..."
cd ../client
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait for services to start
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
print_status "Checking services..."

# Check Backend
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    print_status "✅ Backend is running at http://localhost:5000"
else
    print_status "⚠️  Backend health check failed"
fi

# Check Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Frontend is running at http://localhost:3000"
else
    print_status "⚠️  Frontend health check failed"
fi

echo ""
print_status "🎉 Services started!"
echo ""
echo "📱 Service URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo "   Backend Health: http://localhost:5000/health"
echo ""
echo "📝 To stop services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
