#!/bin/bash

# Cloudinary Configuration Setup Script
# This script updates your .env file with Cloudinary credentials

echo "🚀 Setting up Cloudinary configuration..."

# Cloudinary credentials (from your account)
CLOUDINARY_CLOUD_NAME="dqjhf8ios"
CLOUDINARY_API_KEY="975461118425658"
CLOUDINARY_API_SECRET="4SdGHJknlmUqpgIltOyfRZMD9zc"

echo "📋 Using credentials:"
echo "   Cloud Name: $CLOUDINARY_CLOUD_NAME"
echo "   API Key: $CLOUDINARY_API_KEY"
echo "   API Secret: ${CLOUDINARY_API_SECRET:0:10}..."

# Check if .env file exists
ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
  echo "📝 Creating new .env file from env.example..."
  cp env.example .env
fi

# Update or add Cloudinary credentials
echo ""
echo "📝 Updating Cloudinary configuration..."

# Function to update or add env variable
update_env() {
  local key=$1
  local value=$2
  
  if grep -q "^${key}=" "$ENV_FILE"; then
    # Update existing
    sed -i.bak "s|^${key}=.*|${key}=${value}|" "$ENV_FILE"
    echo "   ✅ Updated ${key}"
  else
    # Add new
    echo "${key}=${value}" >> "$ENV_FILE"
    echo "   ✅ Added ${key}"
  fi
}

# Update credentials
update_env "CLOUDINARY_CLOUD_NAME" "$CLOUDINARY_CLOUD_NAME"
update_env "CLOUDINARY_API_KEY" "$CLOUDINARY_API_KEY"
update_env "CLOUDINARY_API_SECRET" "$CLOUDINARY_API_SECRET"

# Clean up backup file
rm -f .env.bak

echo ""
echo "✅ Cloudinary configuration completed!"
echo ""
echo "📋 Current Configuration:"
echo "   Cloud Name: $CLOUDINARY_CLOUD_NAME"
echo "   API Key: $CLOUDINARY_API_KEY"
echo "   API Secret: ${CLOUDINARY_API_SECRET:0:10}..." # Show only first 10 chars
echo ""
echo "🚀 Next steps:"
echo "   1. Restart your server: npm run dev"
echo "   2. Test product creation with image upload"
echo ""

