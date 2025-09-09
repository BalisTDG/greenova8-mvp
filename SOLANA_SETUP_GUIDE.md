# 🚀 Solana Smart Contract Setup Guide for Greenova8

This guide will walk you through setting up the complete Solana development environment for the Greenova8 MVP smart contracts.

## 📋 Prerequisites

- macOS (you're already on this)
- Node.js and npm installed
- Terminal access
- Internet connection

## 🎯 Quick Setup (Recommended)

Run the automated setup script:

```bash
cd /Users/bilawalcheema/greenova8-mvp
./setup-solana.sh
```

This script will automatically:
- Install Rust programming language
- Install Solana CLI tools
- Install Anchor framework
- Configure development environment
- Create wallet keypair
- Request devnet SOL for testing
- Install smart contract dependencies
- Attempt to build contracts

## 🔧 Manual Setup (If needed)

If the automated script fails, follow these manual steps:

### Step 1: Install Rust

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Restart terminal or run:
source ~/.zshrc

# Verify installation
rustc --version
cargo --version
```

### Step 2: Install Solana CLI

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.18.2/install)"

# Add to your PATH (add this line to ~/.zshrc)
export PATH="/Users/bilawalcheema/.local/share/solana/install/active_release/bin:$PATH"

# Reload shell
source ~/.zshrc

# Verify installation
solana --version
```

### Step 3: Install Anchor Framework

```bash
# Option 1: Install via npm (recommended)
npm install -g @coral-xyz/anchor-cli

# Option 2: Install via cargo (if npm fails)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Verify installation
anchor --version
```

### Step 4: Configure Solana

```bash
# Create wallet keypair
solana-keygen new --no-bip39-passphrase

# Set to devnet for development
solana config set --url devnet

# Check configuration
solana config get

# Request devnet SOL for testing
solana airdrop 2

# Check balance
solana balance
```

### Step 5: Install Smart Contract Dependencies

```bash
cd /Users/bilawalcheema/greenova8-mvp/smart-contracts
npm install
```

## 🏗️ Building and Testing Smart Contracts

### Build Contracts

```bash
cd /Users/bilawalcheema/greenova8-mvp/smart-contracts

# Clean previous builds
anchor clean

# Build contracts
anchor build
```

### Run Tests

```bash
# Run all tests
anchor test

# Run specific test
anchor test --skip-local-validator
```

### Deploy to Devnet

```bash
# Deploy to devnet
anchor deploy --provider.cluster devnet

# Or use npm script
npm run deploy:devnet
```

## 📁 Project Structure

After setup, your smart-contracts directory should look like:

```
smart-contracts/
├── Anchor.toml              # Anchor configuration
├── Cargo.toml              # Rust workspace config
├── package.json            # Node.js dependencies
├── tsconfig.json           # TypeScript configuration
├── programs/
│   └── greenova8/
│       ├── Cargo.toml      # Program dependencies
│       └── src/
│           └── lib.rs      # Main smart contract code
├── tests/
│   └── greenova8.ts        # Test files
├── migrations/
│   └── deploy.ts          # Deployment script
└── target/                # Build artifacts (created after build)
    ├── deploy/
    ├── idl/
    └── types/
```

## 🔍 Verification Steps

After setup, verify everything works:

```bash
# Check Solana version
solana --version

# Check Anchor version
anchor --version

# Check wallet balance
solana balance

# Check configuration
solana config get

# Test building contracts
cd smart-contracts && anchor build

# Test running tests (optional)
anchor test --skip-local-validator
```

## 🚨 Common Issues and Solutions

### Issue 1: Rust not found
```bash
# Add Rust to PATH
source ~/.cargo/env
# Or restart terminal
```

### Issue 2: Solana command not found
```bash
# Add Solana to PATH
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
# Add this line to ~/.zshrc to make it permanent
```

### Issue 3: Anchor build fails
```bash
# Update Rust toolchain
rustup update

# Clean and rebuild
anchor clean && anchor build
```

### Issue 4: Out of SOL for testing
```bash
# Request more devnet SOL
solana airdrop 2
```

### Issue 5: npm install fails in smart-contracts
```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Testing Your Setup

Once everything is installed, test your setup with these commands:

```bash
# Navigate to smart contracts directory
cd /Users/bilawalcheema/greenova8-mvp/smart-contracts

# Build the contracts (this should work without errors)
anchor build

# Check if TypeScript types were generated
ls -la target/types/

# Run a quick test
anchor test --skip-local-validator
```

## 📖 Next Steps

After successful setup:

1. **Review Smart Contract Code**: Check `programs/greenova8/src/lib.rs`
2. **Understand Tests**: Review `tests/greenova8.ts`
3. **Deploy to Devnet**: Use `npm run deploy:devnet`
4. **Integrate with Frontend**: Update frontend to interact with deployed contracts

## 🔗 Integration with Frontend

Once contracts are deployed, you'll need to:

1. **Update Frontend Environment**:
   ```bash
   # In frontend/.env
   REACT_APP_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
   REACT_APP_SOLANA_NETWORK=devnet
   REACT_APP_SOLANA_RPC_URL=https://api.devnet.solana.com
   ```

2. **Update Blockchain Service**: Modify `frontend/src/services/blockchainService.ts` with your deployed program ID

## 🆘 Getting Help

If you encounter issues:

1. Check Solana status: https://status.solana.com/
2. Anchor documentation: https://www.anchor-lang.com/
3. Solana documentation: https://docs.solana.com/
4. Common issues: Run `solana logs` to see transaction details

## ✅ Success Checklist

- [ ] Rust installed and working
- [ ] Solana CLI installed and configured
- [ ] Anchor framework installed
- [ ] Wallet keypair created
- [ ] Devnet SOL received
- [ ] Smart contract dependencies installed
- [ ] Contracts build successfully
- [ ] Tests run without errors
- [ ] Ready for deployment

Your Solana development environment is now ready for Greenova8 smart contract development! 🎉
