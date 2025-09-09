# Greenova8 MVP Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database
- Git

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma generate
npx prisma db push
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default should work for local development)
npm start
```

### 3. Database Setup
Your `.env` file should contain:
```
DATABASE_URL="postgresql://username:password@localhost:5432/greenova8"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
```

## Production Deployment

### Backend (Railway)
1. Connect your GitHub repo to Railway
2. Deploy the `backend` directory
3. Set environment variables in Railway dashboard
4. Database will be automatically provisioned

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build directory to `frontend`
3. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app/api`
4. Deploy

## Demo Data
To add demo projects, register a user and use these API calls:

```bash
# Create demo project 1
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Solar Farm Lahore",
    "description": "A 50MW solar farm project in Lahore, Punjab",
    "targetAmount": 500000
  }'

# Create demo project 2
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Wind Power Karachi", 
    "description": "Coastal wind turbines generating 30MW of clean energy",
    "targetAmount": 750000
  }'
```

## Testing
- Register a new user at `/login`
- Browse projects at `/projects`
- Make test investments (demo only)
- View dashboard at `/dashboard`

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project (authenticated)
- `POST /api/investments` - Make investment (authenticated)

Your MVP is now ready for deployment! 🚀
