#!/usr/bin/env zsh

# Category API Test Script for AVE Catering
echo "=== AVE Catering Category API Tests ==="
echo ""

# Base URL - adjust if your server runs on a different port
BASE_URL="http://localhost:5000/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
    echo -e "${YELLOW}Testing: $1${NC}"
    echo "Endpoint: $2"
    echo "Response:"
    curl -s -X GET "$2" | jq . || curl -s -X GET "$2"
    echo ""
    echo "-------------------"
    echo ""
}

echo "Make sure your server is running on port 5000!"
echo "Run: npm run dev in the backend directory"
echo ""
read -p "Press Enter when server is ready..."

# Test 1: Get all categories
test_endpoint "Get all categories" "$BASE_URL/categories"

# Test 2: Get category tree structure  
test_endpoint "Get category tree" "$BASE_URL/categories/tree"

# Test 3: Get specific category by slug
test_endpoint "Get Beverages category" "$BASE_URL/categories/beverages"

# Test 4: Get products by category (using existing products endpoint)
test_endpoint "Get products in Beverages category" "$BASE_URL/products?category=Beverages"

echo -e "${GREEN}API Tests completed!${NC}"
echo ""
echo "Available Category API Endpoints:"
echo "- GET /api/categories - Get all main categories with subcategories"
echo "- GET /api/categories/tree - Get hierarchical category tree"  
echo "- GET /api/categories/:slug - Get specific category by slug"
echo "- POST /api/categories/admin/create - Create new category (admin)"
echo "- PUT /api/categories/admin/:id - Update category (admin)"
echo "- DELETE /api/categories/admin/:id - Delete category (admin)"
echo ""
echo "To seed categories, run: npm run seed:categories"
