#!/bin/bash

# WFD Compliance Dashboard - Dependency Fix Script

echo "🔧 WFD Compliance Dashboard - Fixing Dependencies"
echo "=================================================="
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "  Node.js: $NODE_VERSION"
echo ""

# Remove problematic files
echo "✓ Cleaning old installations..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf .vite-temp
echo "  Cleaned: node_modules, package-lock.json, .vite-temp"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install
echo ""

# Verify vite installation
echo "✓ Verifying critical packages..."
if [ -d "node_modules/vite" ]; then
    echo "  ✅ vite: INSTALLED"
else
    echo "  ❌ vite: MISSING - Installing manually..."
    npm install vite@5.4.20 --save-dev
fi

if [ -d "node_modules/zustand" ]; then
    echo "  ✅ zustand: INSTALLED"
else
    echo "  ❌ zustand: MISSING"
fi

if [ -d "node_modules/xlsx" ]; then
    echo "  ✅ xlsx: INSTALLED"
else
    echo "  ❌ xlsx: MISSING"
fi

if [ -d "node_modules/react-dropzone" ]; then
    echo "  ✅ react-dropzone: INSTALLED"
else
    echo "  ❌ react-dropzone: MISSING"
fi

echo ""
echo "=================================================="
echo "✅ Dependency check complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Navigate to: http://localhost:8080/wfd/compliance"
echo "3. Test file upload with sample Housing Tracker data"
echo ""
