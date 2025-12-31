#!/bin/bash
# Adelanta Smart Contract Deployment Script for Stellar Testnet

set -e

# Configuration
RPC_URL="https://soroban-testnet.stellar.org"
NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Adelanta Contract Deployment Script${NC}"
echo "=========================================="

# Check for required environment variables
if [ -z "$STELLAR_SECRET_KEY" ]; then
    echo -e "${RED}Error: STELLAR_SECRET_KEY environment variable not set${NC}"
    echo "Set it with: export STELLAR_SECRET_KEY=S..."
    exit 1
fi

# Check for soroban-cli
if ! command -v soroban &> /dev/null; then
    echo -e "${RED}Error: soroban-cli not found${NC}"
    echo "Install with: cargo install soroban-cli"
    exit 1
fi

# Build first
echo -e "${YELLOW}📦 Building contract...${NC}"
./build.sh

# Deploy
echo -e "${YELLOW}🌐 Deploying to Stellar Testnet...${NC}"

CONTRACT_ID=$(soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/adelanta_invoice.wasm \
    --source "$STELLAR_SECRET_KEY" \
    --rpc-url "$RPC_URL" \
    --network-passphrase "$NETWORK_PASSPHRASE")

echo -e "${GREEN}✅ Contract deployed!${NC}"
echo -e "Contract ID: ${YELLOW}$CONTRACT_ID${NC}"

# Save contract ID to file
echo "$CONTRACT_ID" > .contract_id
echo "Contract ID saved to .contract_id"

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Initialize the contract with:"
echo "   soroban contract invoke \\"
echo "     --id $CONTRACT_ID \\"
echo "     --source \$STELLAR_SECRET_KEY \\"
echo "     --rpc-url $RPC_URL \\"
echo "     --network-passphrase \"$NETWORK_PASSPHRASE\" \\"
echo "     -- \\"
echo "     initialize \\"
echo "     --admin <ADMIN_ADDRESS> \\"
echo "     --usdc_token <USDC_TOKEN_ID> \\"
echo "     --treasury <TREASURY_ADDRESS> \\"
echo "     --default_advance_bps 9000 \\"
echo "     --protocol_fee_bps 50"
