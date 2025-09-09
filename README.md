# Greenova8 MVP - Clean Energy Investment Platform

## Executive Summary

The MVP of Greenova8 is a simplified, blockchain-enabled web platform that allows retail investors to fund pre-approved clean energy projects in Pakistan starting from $100. It will focus on launching with a small number of vetted projects, enabling basic user onboarding, investment, and tracking functionality. This MVP will serve as a functional proof-of-concept to attract early adopters, validate the model, and refine the roadmap for scale.

## MVP Objectives

- **Launch a basic web platform** that allows:
  - User signup and authentication
  - Project listing & descriptions
  - Blockchain-based investment in tokens
  - Portfolio tracking for early investors
- **Test business model** with 2 pilot projects
- **Gather feedback** from early users and partners

## Core MVP Features

1. **Clean UI/UX** - Intuitive interface for retail investors
2. **Admin Dashboard** - Project onboarding and management
3. **Basic Investor Analytics** - Investment confirmation receipts
4. **Investment Transaction Smart Contracts** - Secure blockchain transactions
5. **Payment Gateway Connection** - Fiat to crypto conversion

## Technology Stack

### Frontend
- **Framework**: React.js with TypeScript ✅
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Web3 Integration**: wagmi + viem

### Backend
- **Runtime**: Node.js with TypeScript ✅
- **Framework**: Express.js ✅
- **Database**: PostgreSQL with Prisma ✅
- **Authentication**: JWT + bcrypt ✅
- **API**: RESTful architecture

### Blockchain
- **Network**: Polygon (MATIC) for lower gas fees
- **Smart Contracts**: Solidity
- **Development**: Hardhat
- **Testing**: Chai/Mocha

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway (Backend)
- **Database**: PostgreSQL
- **File Storage**: IPFS for project documents
- **Monitoring**: Built-in logging

## Project Structure

```
greenova8-mvp/
├── frontend/                    # React TypeScript application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   └── package.json
├── backend/                     # Node.js Express API
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   └── generated/        # Prisma generated files
│   └── package.json
├── smart-contracts/            # Solidity contracts
│   ├── contracts/            # Smart contract files
│   ├── scripts/              # Deployment scripts
│   └── test/                 # Contract tests
├── prisma/                    # Database schema
├── docs/                      # Documentation
└── package.json              # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database
- Git
- Phantom Wallet (for testing Solana integration)

### ⚡ Quick Setup (Recommended)

Run the automated setup script:

```bash
git clone https://github.com/BalisTDG/greenova8-mvp.git
cd greenova8-mvp
./setup.sh
```

This will install all dependencies, set up the database, and prepare everything for you!

### 🔧 Manual Installation

If you prefer to set up manually:

1. **Clone the repository**
   ```bash
   git clone https://github.com/BalisTDG/greenova8-mvp.git
   cd greenova8-mvp
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your database URL and JWT secret
   npx prisma generate
   npx prisma db push
   npm run seed  # Add sample data
   npm run dev
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm start
   ```

5. **Setup Smart Contracts**
   ```bash
   cd smart-contracts
   npm install
   anchor build
   anchor test
   ```

## Development Workflow

### Backend Development
- API endpoints: `http://localhost:5000/api`
- Database management: Prisma Studio
- Hot reload: `npm run dev`

### Frontend Development
- Development server: `http://localhost:3000`
- Hot reload enabled
- Tailwind CSS for styling

### Smart Contract Development
- Local blockchain: Hardhat Network
- Testing: `npx hardhat test`
- Deployment: `npx hardhat deploy`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Project Endpoints
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project (admin)

### Investment Endpoints
- `POST /api/investments` - Create investment
- `GET /api/investments/user/:userId` - User's investments
- `GET /api/investments/project/:projectId` - Project investments

## Database Schema

### Core Tables
- **Users**: User accounts and profiles
- **Projects**: Clean energy projects
- **Investments**: Investment transactions
- **Transactions**: Blockchain transaction records

## Smart Contracts

### Core Contracts
- **ProjectToken**: ERC-20 tokens for each project
- **InvestmentManager**: Handles investments and distributions
- **ProjectFactory**: Creates new project contracts

## Security Measures

### Backend Security
- JWT authentication with httpOnly cookies
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Helmet for security headers

### Smart Contract Security
- Reentrancy guards
- Access control modifiers
- Safe math operations
- Emergency pause functionality

## Testing Strategy

### Unit Tests
- Backend: Jest + Supertest
- Frontend: React Testing Library
- Smart Contracts: Hardhat + Chai

### Integration Tests
- API endpoint testing
- Database integration
- Smart contract interactions

## Deployment

### Production Deployment
1. **Frontend**: Deploy to Vercel
2. **Backend**: Deploy to Railway
3. **Database**: PostgreSQL on Railway
4. **Smart Contracts**: Deploy to Polygon Mumbai (testnet)

### Environment Variables

#### Backend (.env)
```
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CHAIN_ID=80001
```

## Risk Mitigation

### Technical Risks
- **Smart contract bugs**: Extensive testing + professional audits
- **Scalability issues**: Load testing + monitoring systems
- **Security vulnerabilities**: Regular security reviews + best practices

### Business Risks
- **Regulatory compliance**: Legal consultation + KYC/AML implementation
- **Market adoption**: User feedback loops + iterative improvements
- **Competition**: Focus on unique value proposition for Pakistani market

## Success Metrics

### Technical KPIs
- Platform uptime > 99%
- Transaction success rate > 95%
- Page load time < 3 seconds
- Smart contract gas optimization

### Business KPIs
- 100+ registered users
- $50,000+ total investments
- 2 successful pilot projects funded
- User satisfaction score > 4.0/5.0

## Development Timeline

- **Week 1-2**: ✅ Project setup and core infrastructure
- **Week 3-4**: User authentication and basic UI
- **Week 5-6**: Smart contract development and testing
- **Week 7-8**: Payment integration and admin dashboard
- **Week 9-10**: Testing, security audit, and deployment
- **Week 11-12**: Beta testing with pilot projects

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

ISC License - see LICENSE file for details

---

*This MVP serves as the foundation for Greenova8's mission to democratize clean energy investment in Pakistan through blockchain technology.*
