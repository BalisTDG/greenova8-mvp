import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { UserService, User as DBUser } from '../services/firebaseService';

interface AuthContextType {
  user: DBUser | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const FirebaseAuthContext = createContext<AuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DBUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('🔥 FirebaseAuthProvider rendering - user:', user, 'loading:', loading);

  useEffect(() => {
    console.log('🔥 Setting up Firebase auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Firebase auth state changed:', firebaseUser?.email);
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Get or create user in Firestore
          let dbUser = await UserService.getUser(firebaseUser.uid);
          
          if (!dbUser) {
            // Create new user in database
            console.log('🔥 Creating new user in database');
            dbUser = await UserService.createUser(firebaseUser.uid, {
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || undefined,
              photoURL: firebaseUser.photoURL || undefined,
              provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
            });
          }
          
          setUser(dbUser);
        } catch (error) {
          console.error('🔥 Error getting/creating user:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('🔥 Unsubscribing from Firebase auth state');
      unsubscribe();
    };
  }, []);

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      console.log('🔥 Registering user with email:', email);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(firebaseUser, { displayName });
      }
      
      // User will be created in database automatically via onAuthStateChanged
      console.log('🔥 User registered successfully');
    } catch (error: any) {
      console.error('🔥 Registration error:', error);
      throw new Error(getFirebaseErrorMessage(error.code) || 'Registration failed');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔥 Logging in user with email:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('🔥 User logged in successfully');
    } catch (error: any) {
      console.error('🔥 Login error:', error);
      throw new Error(getFirebaseErrorMessage(error.code) || 'Login failed');
    }
  };

  const googleLogin = async () => {
    try {
      console.log('🔥 Starting Google login');
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      console.log('🔥 Google login successful:', result.user.email);
    } catch (error: any) {
      console.error('🔥 Google login error:', error);
      throw new Error(getFirebaseErrorMessage(error.code) || 'Google login failed');
    }
  };

  const logout = async () => {
    try {
      console.log('🔥 Logging out user');
      await signOut(auth);
      console.log('🔥 User logged out successfully');
    } catch (error: any) {
      console.error('🔥 Logout error:', error);
      throw new Error('Logout failed');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('🔥 Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('🔥 Password reset email sent');
    } catch (error: any) {
      console.error('🔥 Password reset error:', error);
      throw new Error(getFirebaseErrorMessage(error.code) || 'Password reset failed');
    }
  };

  const value = {
    user,
    firebaseUser,
    login,
    register,
    googleLogin,
    logout,
    resetPassword,
    loading,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}

// Helper function to convert Firebase error codes to user-friendly messages
function getFirebaseErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'auth/popup-closed-by-user':
      return 'Sign-in cancelled';
    case 'auth/cancelled-popup-request':
      return 'Sign-in cancelled';
    default:
      return 'Authentication error occurred';
  }
}
