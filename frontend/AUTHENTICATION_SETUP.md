# GreenOVA8 Authentication & Wallet Connection Setup

## Overview
This document outlines the improvements made to the GreenOVA8 frontend to implement Google OAuth authentication and secure wallet connection flow.

## Changes Made

### 1. Google OAuth Integration

#### Files Modified/Created:
- `frontend/public/index.html` - Added Google Identity Services script
- `frontend/src/services/googleAuthService.ts` - New Google OAuth service
- `frontend/src/context/AuthContext.tsx` - Added Google login method
- `frontend/src/components/Login.tsx` - Added Google OAuth button
- `frontend/.env` - Added Google client ID configuration

#### Key Features:
- Modern Google Identity Services (GIS) integration
- JWT token decoding and validation
- Custom event handling for OAuth responses
- Futuristic UI design for Google login button

### 2. Authentication-Gated Wallet Connection

#### Files Modified:
- `frontend/src/context/SimpleWalletContext.tsx` - Updated to require authentication

#### Key Features:
- Users must be authenticated before connecting wallet
- Generates user-specific wallet addresses (deterministic based on user ID)
- Replaced random demo addresses with auth-gated addresses
- Error handling for unauthenticated wallet connection attempts

### 3. Enhanced "CLICK ME" Button Functionality

#### Files Modified:
- `frontend/src/components/HowItWorks.tsx` - Improved step navigation

#### Key Features:
- All CLICK ME buttons now have proper navigation logic
- Step 1: Redirects to login if not authenticated, otherwise connects wallet
- Step 2: Redirects to features/projects exploration page
- Step 3: Redirects to investment projects page
- Step 4: Redirects to dashboard for tracking returns
- Removed placeholder console.log statements

## Setup Instructions

### 1. Google OAuth Configuration

To enable Google OAuth, you need to set up Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Identity API
   - Google+ API (if needed)
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Select "Web application" as the application type
6. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: Your production domain
7. Copy the Client ID and update `.env` file:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-actual-client-id.googleusercontent.com
```

### 2. Backend API Integration

The frontend now sends Google OAuth credentials to these endpoints:

- `POST /api/auth/google` - For Google OAuth login
  - Expects: `{ credential: string, userInfo: GoogleUserInfo }`
  - Returns: `{ user: User, token: string }`

Ensure your backend API supports this endpoint and can:
1. Verify Google JWT tokens
2. Extract user information
3. Create/login users with Google accounts
4. Return a JWT token for session management

### 3. Environment Variables

Update your `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here.googleusercontent.com
```

## User Flow

### Authentication Flow:
1. User visits the app
2. If not authenticated, redirected to login page
3. User can choose:
   - Email/password authentication (existing)
   - Google OAuth authentication (new)
4. Upon successful authentication, user is redirected to dashboard

### Wallet Connection Flow:
1. User must be authenticated first
2. User clicks "Connect Wallet" from HowItWorks page or any wallet button
3. If authenticated: wallet connects with user-specific address
4. If not authenticated: redirected to login page
5. Connected wallet shows consistent address per user (not random demo)

### How It Works Page Interaction:
1. Each numbered step (01-04) is clickable
2. Clicking redirects to appropriate pages based on user authentication
3. All buttons provide meaningful navigation instead of console logs

## Technical Details

### Google OAuth Service Features:
- Asynchronous initialization with error handling
- Custom event system for OAuth responses
- JWT token decoding for user information
- Fallback button rendering if popup fails
- Proper TypeScript typing for all responses

### Wallet Context Improvements:
- User authentication validation before connection
- Deterministic address generation per user
- Enhanced error messaging
- Integration with authentication context

### Security Considerations:
- JWT tokens stored in localStorage with automatic cleanup
- Axios interceptors for authenticated requests
- Proper error handling and user feedback
- No sensitive data in console logs

## Testing

To test the implementation:

1. Start the frontend: `npm start`
2. Navigate to `/login` page
3. Try Google OAuth button (requires valid Google Client ID)
4. Try wallet connection (should require authentication)
5. Test HowItWorks page step buttons
6. Verify proper navigation and error handling

## Notes

- Google OAuth requires HTTPS in production
- Client ID must be configured for proper OAuth flow
- Backend must support Google credential verification
- All wallet connections are simulated (not real Solana integration)
- Addresses are deterministic but still mock addresses for demo purposes
