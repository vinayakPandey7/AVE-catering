#!/bin/bash

echo "🔍 Checking Render Deployment Status..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check health endpoint
echo "1️⃣  Checking server health..."
HEALTH=$(curl -s https://ave-catering.onrender.com/health)
echo "   Response: $HEALTH"

# Check banner endpoint
echo ""
echo "2️⃣  Checking banner API..."
BANNER=$(curl -s https://ave-catering.onrender.com/api/banners/public)
echo "   Response: $BANNER"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Interpret results
if echo "$BANNER" | grep -q "Not Found"; then
    echo "❌ Banner routes NOT deployed yet"
    echo "   Action: Go to Render dashboard and click 'Manual Deploy'"
    echo "   Link: https://dashboard.render.com/"
elif echo "$BANNER" | grep -q "\[\]"; then
    echo "✅ Banner routes ARE deployed!"
    echo "   You can now create banners in admin panel"
    echo "   Admin: https://ave-catering1.vercel.app/admin/banners"
else
    echo "✅ Banner routes ARE deployed!"
    echo "   Found banners: $BANNER"
fi
