#!/bin/bash

# Wholesale Market Deployment Script
# Usage: ./deploy.sh [service] [environment]

set -e

SERVICE=${1:-all}
ENVIRONMENT=${2:-production}

echo "🚀 Deploying Wholesale Market - Service: $SERVICE, Environment: $ENVIRONMENT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_service() {
    echo -e "${BLUE}[SERVICE]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Deploy function
deploy_service() {
    local service=$1
    local env=$2
    
    print_service "Deploying $service to $env environment..."
    
    if [ -d "$service" ]; then
        cd "$service"
        if [ -f "deploy.sh" ]; then
            ./deploy.sh "$env"
        else
            print_error "deploy.sh not found in $service directory"
            exit 1
        fi
        cd ..
    else
        print_error "$service directory not found"
        exit 1
    fi
}

# Main deployment logic
case $SERVICE in
    "client")
        print_status "Deploying Client only..."
        deploy_service "client" "$ENVIRONMENT"
        ;;
    "server")
        print_status "Deploying Server only..."
        deploy_service "server" "$ENVIRONMENT"
        ;;
    "all")
        print_status "Deploying both Client and Server..."
        
        # Deploy server first (API)
        print_service "Deploying Server (API) first..."
        deploy_service "server" "$ENVIRONMENT"
        
        # Wait a bit for server to be ready
        sleep 5
        
        # Deploy client
        print_service "Deploying Client (Frontend)..."
        deploy_service "client" "$ENVIRONMENT"
        ;;
    *)
        print_error "Invalid service. Use: client, server, or all"
        echo ""
        echo "Usage: ./deploy.sh [service] [environment]"
        echo ""
        echo "Services:"
        echo "  client  - Deploy frontend only"
        echo "  server  - Deploy backend only"
        echo "  all     - Deploy both (default)"
        echo ""
        echo "Environments:"
        echo "  development - Development environment"
        echo "  staging     - Staging environment"
        echo "  production  - Production environment (default)"
        echo ""
        exit 1
        ;;
esac

# Final status
echo ""
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📱 Service URLs:"
echo "   Frontend: http://localhost:3000"
echo "   API: http://localhost:5000"
echo "   API Health: http://localhost:5000/health"
echo ""
echo "📊 Docker Services:"
if [ -d "client" ]; then
    echo "   Client Services:"
    cd client && docker-compose ps 2>/dev/null || echo "   No client services running"
    cd ..
fi
if [ -d "server" ]; then
    echo "   Server Services:"
    cd server && docker-compose ps 2>/dev/null || echo "   No server services running"
    cd ..
fi
echo ""
echo "📝 Management Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo ""
