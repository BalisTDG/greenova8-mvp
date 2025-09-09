#!/bin/bash

# Greenova8 Solana Development Environment Setup Script
# This script sets up everything needed for Solana smart contract development

set -e  # Exit on any error

echo "🚀 Setting up Solana Development Environment for Greenova8..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Rust is installed
if ! command -v rustc &> /dev/null; then
    echo "📦 Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.zshrc
    print_status "Rust installed successfully"
else
    print_status "Rust is already installed"
fi

# Check if Solana CLI is installed
if ! command -v solana &> /dev/null; then
    echo "📦 Installing Solana CLI..."
    sh -c "$(curl -sSfL https://release.solana.com/v1.18.2/install)"
    
    # Add Solana to PATH
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
    
    # Add to shell profile
    if [[ "$SHELL" == *"zsh"* ]]; then
        echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.zshrc
    else
        echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
    fi
    
    print_status "Solana CLI installed successfully"
else
    print_status "Solana CLI is already installed"
fi

# Install Anchor if not already installed
if ! command -v anchor &> /dev/null; then
    echo "📦 Installing Anchor Framework..."
    
    # Install via npm first (easier)
    if command -v npm &> /dev/null; then
        npm install -g @coral-xyz/anchor-cli
        print_status "Anchor installed via npm"
    else
        # Fallback to cargo install
        cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
        print_status "Anchor installed via cargo"
    fi
else
    print_status "Anchor is already installed"
fi

# Configure Solana for development
echo "⚙️  Configuring Solana..."

# Create keypair if it doesn't exist
if [ ! -f ~/.config/solana/id.json ]; then
    solana-keygen new --no-bip39-passphrase --silent
    print_status "New Solana keypair created"
else
    print_status "Using existing Solana keypair"
fi

# Set to devnet
solana config set --url devnet
print_status "Solana configured for devnet"

# Get some devnet SOL for testing
echo "💰 Requesting devnet SOL..."
solana airdrop 2
print_status "Airdropped 2 SOL to your wallet"

# Install smart contract dependencies
echo "📦 Installing smart contract dependencies..."
cd smart-contracts
npm install
print_status "Smart contract dependencies installed"

# Try to build the smart contracts
echo "🔨 Building smart contracts..."
if anchor build; then
    print_status "Smart contracts built successfully"
else
    print_warning "Smart contracts build failed - this is normal on first setup"
    print_warning "Run 'anchor build' manually after reviewing any errors"
fi

# Generate TypeScript types
if [ -d "target/types" ]; then
    print_status "TypeScript types generated"
fi

echo ""
echo "🎉 Solana development environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review your Anchor.toml configuration"
echo "2. Build contracts: cd smart-contracts && anchor build"
echo "3. Run tests: cd smart-contracts && anchor test"
echo "4. Deploy to devnet: cd smart-contracts && npm run deploy:devnet"
echo ""
echo "🔧 Useful commands:"
echo "- Check Solana config: solana config get"
echo "- Check wallet balance: solana balance"
echo "- Get more devnet SOL: solana airdrop 1"
echo "- Start local validator: solana-test-validator"
echo ""
echo "📊 Current status:"
solana --version
anchor --version
solana config get
solana balance
