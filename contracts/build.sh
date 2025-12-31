#!/bin/bash
# Adelanta Smart Contract Build & Deploy Script

set -e

echo "🔨 Building Adelanta Invoice Contract..."

# Build the contract
cargo build --target wasm32-unknown-unknown --release

echo "✅ Build complete!"

# Optimize the WASM (requires soroban-cli)
if command -v soroban &> /dev/null; then
    echo "📦 Optimizing WASM..."
    soroban contract optimize \
        --wasm target/wasm32-unknown-unknown/release/adelanta_invoice.wasm \
        --out-wasm target/wasm32-unknown-unknown/release/adelanta_invoice_optimized.wasm
    
    echo "✅ Optimization complete!"
    
    # Show file sizes
    echo ""
    echo "📊 WASM sizes:"
    ls -lh target/wasm32-unknown-unknown/release/*.wasm
else
    echo "⚠️  soroban-cli not found. Skipping optimization."
    echo "   Install with: cargo install soroban-cli"
fi

echo ""
echo "🎉 Done! Contract ready for deployment."
