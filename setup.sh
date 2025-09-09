#!/bin/bash

echo "🚀 GreenOva8 MVP Complete Setup Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the root of the GreenOva8 project"
    exit 1
fi

print_info "Installing root dependencies..."
npm install

print_status "Root dependencies installed"

# Setup Backend
print_info "Setting up backend..."
cd backend

# Install backend dependencies
npm install

# Generate Prisma client
print_info "Generating Prisma client..."
npx prisma generate

# Setup database (if DATABASE_URL is configured)
if [ -f ".env" ]; then
    print_info "Database configuration found, setting up database..."
    npx prisma db push
    
    print_info "Seeding database with sample data..."
    npm run seed
    print_status "Database setup complete"
else
    print_warning "No .env file found in backend. Please configure your database before running the backend."
    print_info "Copy .env.example to .env and configure your DATABASE_URL"
fi

cd ..

# Setup Frontend
print_info "Setting up frontend..."
cd frontend

# Install frontend dependencies
npm install

print_status "Frontend setup complete"

cd ..

# Setup Smart Contracts
print_info "Setting up smart contracts..."
cd smart-contracts

# Install smart contract dependencies
npm install

# Build smart contracts
print_info "Building smart contracts..."
npm run build

print_status "Smart contracts setup complete"

cd ..

echo ""
echo "🎉 GreenOva8 MVP Setup Complete!"
echo "================================"
echo ""

print_info "To start the development servers:"
echo ""
echo "  Backend:      cd backend && npm run dev"
echo "  Frontend:     cd frontend && npm start"
echo "  Both:         npm run dev (from root)"
echo ""

print_info "Default credentials:"
echo "  Email:        test@greenova8.com"
echo "  Password:     password123"
echo ""

print_info "Access URLs:"
echo "  Frontend:     http://localhost:3000"
echo "  Backend API:  http://localhost:3001/api"
echo ""

print_info "Features available:"
echo "  ✅ User authentication"
echo "  ✅ Solana wallet integration"
echo "  ✅ Real blockchain payments"
echo "  ✅ Project investment system"
echo "  ✅ Dashboard with wallet info"
echo "  ✅ Database with sample projects"
echo ""

print_warning "Make sure to:"
echo "  1. Configure your database URL in backend/.env"
echo "  2. Have PostgreSQL running"
echo "  3. Install Phantom wallet for testing"
echo "  4. Switch Phantom to Devnet for testing"
echo ""

print_status "Setup completed successfully! 🚀"
