# Greenova8 Blockchain MVP - Complete Setup Guide

## 🚀 Project Overview

Greenova8 is a blockchain-powered clean energy investment platform built on the Solana network. This MVP demonstrates a complete full-stack application with:

- **Frontend**: React TypeScript with blockchain-themed UI
- **Backend**: Node.js with Express and Prisma ORM
- **Database**: PostgreSQL
- **Blockchain**: Solana integration for transactions
- **Authentication**: JWT-based user management

## 🏗️ Project Structure

```
greenova8-mvp/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Blockchain-themed React components
│   │   ├── context/         # Auth and Wallet contexts
│   │   ├── services/        # API services
│   │   └── index.css        # Blockchain-themed CSS variables
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Database seeder and utilities
│   │   └── server.ts        # Main server file
├── smart-contracts/         # Solana smart contracts (Rust)
├── .vscode/                # VS Code configuration
└── docs/                   # Documentation
```

## 🛠️ Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** 14+
- **VS Code** (recommended)
- **Git**

## 📦 Quick Setup (5 minutes)

### 1. Clone and Setup
```bash
cd /Users/bilawalcheema/greenova8-mvp
code .  # Open in VS Code
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Database Setup
Make sure PostgreSQL is running, then:
```bash
cd backend
npx prisma db push
npm run seed  # Creates test data
```

### 4. Start Development Servers
```bash
npm run dev
```

## 🔐 Test User Credentials

```
Email: test@greenova8.com
Password: password123
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Database**: localhost:5432/greenova8

## 🎨 Blockchain Theme Features

The application includes a complete blockchain-themed UI with:

### Design Elements
- **Dark color scheme** with cyan/blue accents
- **Matrix-style background** animations
- **Monospace fonts** for technical elements
- **Glowing effects** and hover animations
- **Gradient borders** and cards

### CSS Variables
```css
:root {
  --primary-bg: #0a0a0b;        /* Deep black background */
  --secondary-bg: #1a1a1c;      /* Card backgrounds */
  --accent-text: #00d4ff;       /* Cyan highlights */
  --success: #00ff88;           /* Green for success states */
  --primary-text: #ffffff;      /* White text */
  --secondary-text: #b4b4b8;    /* Gray text */
}
```

### Components
- **Login**: Matrix background with blockchain authentication
- **Dashboard**: Crypto-style stats cards with live data
- **Header**: Blockchain network status indicators
- **Projects**: Investment cards with progress bars
- **Forms**: Futuristic input styling

## 🔧 VS Code Configuration

The project includes VS Code settings for optimal development:

### Extensions (Auto-installed)
- TypeScript support
- Tailwind CSS IntelliSense
- Prettier code formatting
- ESLint
- Prisma syntax highlighting

### Available Tasks
- **Start Development Server**: `Cmd+Shift+P` → "Tasks: Run Task" → "Start Development Server"
- **Seed Database**: "Seed Database"
- **Build Frontend**: "Build Frontend"

### Debugging
- Press `F5` to start debugging both frontend and backend
- Breakpoints work in VS Code for both TypeScript files

## 🧪 Testing Features

### 1. Authentication
```bash
# Test login API
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@greenova8.com", "password": "password123"}'
```

### 2. Projects API
```bash
# Get all projects
curl http://localhost:3001/api/projects
```

### 3. Database Check
```bash
cd backend
npx prisma studio  # Opens database browser
```

## 📊 Sample Data

The seeder creates:
- **1 Test User**: test@greenova8.com
- **3 Energy Projects**: Solar, Wind, Hydro
- **2 Sample Investments**: $1,500 total

## 🔗 Blockchain Integration

### Solana Features
- **Devnet** connection for testing
- **Wallet** connection simulation
- **Transaction** hash displays
- **Network** status indicators

### Smart Contract (Future)
```rust
// Located in smart-contracts/programs/
use anchor_lang::prelude::*;

#[program]
pub mod greenova8 {
    // Investment tracking on-chain
}
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway)
```bash
# Connect GitHub repo to Railway
# Auto-deploys on push to main
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```bash
   # Check PostgreSQL is running
   brew services start postgresql
   
   # Check connection
   psql -h localhost -p 5432 -d greenova8
   ```

2. **Port Already in Use**
   ```bash
   # Kill existing processes
   pkill -f "node.*greenova8"
   lsof -ti :3000 | xargs kill
   lsof -ti :3001 | xargs kill
   ```

3. **Frontend Build Errors**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript Errors**
   ```bash
   # Reset TypeScript cache
   npx tsc --build --clean
   ```

## 📝 Development Workflow

### 1. Feature Development
```bash
git checkout -b feature/new-feature
# Make changes
npm run dev  # Test locally
git commit -m "Add new feature"
git push origin feature/new-feature
```

### 2. Database Changes
```bash
cd backend
# Edit schema.prisma
npx prisma db push
npx prisma generate
```

### 3. Adding Components
```bash
# Create in frontend/src/components/
# Use blockchain theme classes
# Follow existing patterns
```

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/greenova8"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
SOLANA_RPC_URL="https://api.devnet.solana.com"
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (admin)
- `GET /api/projects/:id` - Get project details

### Investments
- `POST /api/investments` - Make investment
- `GET /api/investments/my-investments` - User's investments

## 🎯 Next Steps

1. **Blockchain Integration**
   - Complete Solana smart contract
   - Real wallet connection
   - On-chain transactions

2. **Enhanced Features**
   - Real-time notifications
   - Advanced analytics
   - Mobile responsive design

3. **Production Ready**
   - Add comprehensive testing
   - Performance optimization
   - Security hardening

## 🏆 Success Checklist

- ✅ Complete blockchain-themed UI
- ✅ Working authentication system
- ✅ Database with sample data
- ✅ API endpoints functional
- ✅ VS Code development setup
- ✅ Docker configuration ready
- ✅ Documentation complete

## 🆘 Support

If you encounter any issues:

1. Check this guide first
2. Review VS Code terminal output
3. Check browser console for errors
4. Verify database connection
5. Ensure all services are running

The application is now ready for development and testing with a complete blockchain-themed interface!
