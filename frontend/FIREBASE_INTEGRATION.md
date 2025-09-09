# Firebase Integration for GreenOVA8

This document describes the Firebase integration that has been added to the GreenOVA8 application for database storage and authentication.

## 🔥 What's Been Added

### 1. Firebase Configuration (`src/config/firebase.ts`)
- Centralized Firebase initialization using environment variables
- Initialized services: Authentication, Firestore, Storage, Analytics
- Environment variable validation to prevent misconfiguration

### 2. Firebase Database Service (`src/services/firebaseService.ts`)
Complete database abstraction layer with the following services:

#### UserService
- `createUser()` - Create new user in Firestore
- `getUser()` - Get user by ID
- `updateUser()` - Update user data
- `getUserByEmail()` - Find user by email

#### ProjectService  
- `createProject()` - Create new renewable energy project
- `getProject()` - Get project by ID
- `getAllProjects()` - Get all projects with optional status filter
- `updateProject()` - Update project data
- `deleteProject()` - Delete project
- `getUserProjects()` - Get projects created by specific user

#### InvestmentService
- `createInvestment()` - Create new investment record
- `getUserInvestments()` - Get user's investment history
- `getProjectInvestments()` - Get all investments for a project
- `updateInvestment()` - Update investment status

#### TransactionService
- `createTransaction()` - Record transaction (investment, withdrawal, etc.)
- `getUserTransactions()` - Get user's transaction history
- `getProjectTransactions()` - Get project's transaction history
- `updateTransaction()` - Update transaction status
- `getAllTransactions()` - Get all transactions (admin)

#### AnalyticsService
- `getTotalInvestments()` - Get platform-wide investment totals
- `getTotalProjects()` - Get total project count
- `getTotalUsers()` - Get total user count
- `getProjectStats()` - Get detailed stats for a project

### 3. Firebase Authentication Context (`src/context/FirebaseAuthContext.tsx`)
- Full Firebase Authentication integration
- Email/password authentication
- Google OAuth sign-in
- Password reset functionality
- Automatic user profile creation in Firestore
- User-friendly error handling

## 📊 Database Structure

### Collections

#### `users`
```typescript
{
  id: string;                    // Firebase Auth UID
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  walletAddress?: string;        // Blockchain wallet
  isAdmin?: boolean;
}
```

#### `projects`
```typescript
{
  id: string;
  title: string;
  description: string;
  category: 'solar' | 'wind' | 'hydro' | 'geothermal' | 'other';
  targetAmount: number;
  currentAmount: number;
  location: string;
  imageUrl: string;
  status: 'active' | 'funded' | 'completed' | 'cancelled';
  createdBy: string;             // User ID
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deadline: Timestamp;
  minimumInvestment: number;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
  documents?: string[];          // File URLs
}
```

#### `investments`
```typescript
{
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  transactionHash?: string;      // Blockchain transaction
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `transactions`
```typescript
{
  id: string;
  userId: string;
  type: 'investment' | 'withdrawal' | 'dividend' | 'fee';
  amount: number;
  projectId?: string;
  transactionHash?: string;      // Blockchain transaction
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  description: string;
}
```

## 🚀 Usage Examples

### Using Firebase Authentication
```typescript
import { useFirebaseAuth } from '../context/FirebaseAuthContext';

function LoginComponent() {
  const { login, googleLogin, user, loading } = useFirebaseAuth();
  
  const handleEmailLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // User is automatically logged in and stored in Firestore
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      // User profile created automatically in Firestore
    } catch (error) {
      console.error('Google login failed:', error.message);
    }
  };
}
```

### Using Database Services
```typescript
import { ProjectService, InvestmentService } from '../services/firebaseService';

// Create a new project
const newProject = await ProjectService.createProject({
  title: "Solar Farm Project",
  description: "100MW solar installation",
  category: "solar",
  targetAmount: 1000000,
  location: "California, USA",
  imageUrl: "https://...",
  status: "active",
  createdBy: user.id,
  deadline: new Date("2024-12-31"),
  minimumInvestment: 1000,
  expectedROI: 8.5,
  riskLevel: "medium"
});

// Make an investment
const investment = await InvestmentService.createInvestment({
  userId: user.id,
  projectId: newProject.id,
  amount: 5000,
  status: "pending"
});

// Get user's investments
const userInvestments = await InvestmentService.getUserInvestments(user.id);
```

## 🔐 Security Rules

**Important:** You need to set up Firebase Security Rules in the Firebase Console:

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Projects are readable by all authenticated users
    // Only project creators can update their projects
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.createdBy == request.auth.uid;
    }
    
    // Users can only read/write their own investments
    match /investments/{investmentId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Users can only read/write their own transactions
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🔧 Setup Instructions

### 1. Environment Variables
The Firebase configuration is already added to `.env`:

```bash
REACT_APP_FIREBASE_API_KEY=AIzaSyDLpnqtX5kR2rKHR6OtCVZ3WKZFIodX9ZU
REACT_APP_FIREBASE_AUTH_DOMAIN=greenov8-de4d7.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=greenov8-de4d7
REACT_APP_FIREBASE_STORAGE_BUCKET=greenov8-de4d7.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=774373131681
REACT_APP_FIREBASE_APP_ID=1:774373131681:web:8ddf601dc4de45ea46b7e0
REACT_APP_FIREBASE_MEASUREMENT_ID=G-NVKMQFWL7P
```

### 2. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `greenov8-de4d7`
3. Enable Authentication providers:
   - Email/Password ✅
   - Google ✅
4. Set up Firestore Database
5. Configure Security Rules (see above)
6. Enable Storage (for file uploads)

### 3. Switching to Firebase Auth

To use Firebase authentication instead of the current system:

1. Replace `AuthProvider` with `FirebaseAuthProvider` in `App.tsx`:
```typescript
import { FirebaseAuthProvider } from './context/FirebaseAuthContext';

// Replace AuthProvider with FirebaseAuthProvider
<FirebaseAuthProvider>
  <SimpleWalletProvider>
    <AppRoutes />
  </SimpleWalletProvider>
</FirebaseAuthProvider>
```

2. Update components to use `useFirebaseAuth` instead of `useAuth`

## 📈 Benefits of Firebase Integration

1. **Real Database**: Replace mock data with persistent storage
2. **Scalability**: Firebase scales automatically
3. **Real-time Updates**: Firestore provides real-time listeners
4. **Security**: Built-in security rules and authentication
5. **Analytics**: Built-in analytics for user behavior
6. **Offline Support**: Firestore works offline
7. **File Storage**: Firebase Storage for project images/documents

## 🔄 Migration Path

1. **Phase 1**: Test Firebase authentication alongside existing system
2. **Phase 2**: Migrate user registration/login to Firebase
3. **Phase 3**: Replace mock project data with Firebase data
4. **Phase 4**: Implement real investment tracking
5. **Phase 5**: Add real-time updates and notifications

## 🧪 Testing

The Firebase integration includes comprehensive console logging for debugging:
- 🔥 All Firebase operations are logged with fire emoji
- Authentication state changes are tracked
- Database operations show success/failure status

Check the browser console for detailed Firebase operation logs.

---

**Next Steps:**
1. Set up Firebase Security Rules
2. Test authentication flow
3. Create sample project data
4. Implement real investment functionality
5. Add real-time updates to dashboard
