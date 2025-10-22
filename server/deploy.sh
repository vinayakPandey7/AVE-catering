#!/bin/bash

# Wholesale Market Server Deployment Script
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="wholesale-market-server"

echo "🚀 Deploying Wholesale Market Server to $ENVIRONMENT environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if required files exist
if [ ! -f "Dockerfile" ]; then
    print_error "Dockerfile not found. Please run this script from the server directory."
    exit 1
fi

# Environment-specific deployment
case $ENVIRONMENT in
    "development")
        print_status "Starting development environment..."
        npm run dev
        ;;
    "production")
        print_status "Building and starting production environment..."
        docker-compose up -d --build
        ;;
    "staging")
        print_status "Building and starting staging environment..."
        docker-compose up -d --build
        ;;
    *)
        print_error "Invalid environment. Use: development, staging, or production"
        exit 1
        ;;
esac

# Wait for services to be ready
if [ "$ENVIRONMENT" != "development" ]; then
    print_status "Waiting for services to start..."
    sleep 15

    # Health checks
    print_status "Performing health checks..."

    # Check API health
    if curl -f http://localhost:5000/health > /dev/null 2>&1; then
        print_status "✅ API is healthy"
    else
        print_warning "⚠️  API health check failed"
    fi

    # Check MongoDB
    if docker exec wholesale-mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        print_status "✅ MongoDB is healthy"
    else
        print_warning "⚠️  MongoDB health check failed"
    fi

    # Check Redis
    if docker exec wholesale-redis redis-cli ping > /dev/null 2>&1; then
        print_status "✅ Redis is healthy"
    else
        print_warning "⚠️  Redis health check failed"
    fi

    # Display service URLs
    echo ""
    print_status "🎉 Server deployment completed successfully!"
    echo ""
    echo "📱 Service URLs:"
    echo "   API: http://localhost:5000"
    echo "   API Health: http://localhost:5000/health"
    echo "   MongoDB: mongodb://localhost:27017"
    echo "   Redis: redis://localhost:6379"
    echo "   Nginx: http://localhost:8080"
    echo ""
    echo "📊 Docker Services:"
    docker-compose ps
    echo ""
    echo "📝 Logs:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo ""
fi
