#!/bin/bash

# Build script for Render deployment

# Install dependencies
echo "Installing dependencies..."
pnpm install --frozen-lockfile

# Build the TypeScript project
echo "Building TypeScript project..."
pnpm run build

echo "Build completed successfully!"
