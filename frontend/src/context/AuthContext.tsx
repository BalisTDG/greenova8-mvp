import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { UserService, User as DBUser } from '../services/firebaseService';
import googleAuthService, { GoogleAuthResponse, GoogleUserInfo } from '../services/googleAuthService';
import mockAuthService, { MockUser } from '../services/mockAuthService';

interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: any;
  updatedAt: any;
  walletAddress?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMockAuth, setUseMockAuth] = useState(false);
  
  console.log('AuthProvider rendering - user:', user, 'loading:', loading, 'useMockAuth:', useMockAuth);

  // Set up axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    console.log('AuthProvider useEffect running');
    
    // Add timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.warn('Authentication loading timeout - forcing loading to false');
      setLoading(false);
    }, 10000); // 10 second timeout
    
    // Check if we should use mock authentication
    const shouldUseMock = mockAuthService.shouldUseMockAuth();
    setUseMockAuth(shouldUseMock);
    
    if (shouldUseMock) {
      console.log('Using mock authentication for demo');
      clearTimeout(loadingTimeout);
      checkMockAuth();
    } else {
      console.log('Using Firebase authentication');
      // Set up Firebase auth state listener
      try {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        console.log('Firebase auth state changed:', firebaseUser ? {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          providerId: firebaseUser.providerData[0]?.providerId
        } : 'signed out');
        
        if (firebaseUser) {
          try {
            console.log('Getting user from Firestore:', firebaseUser.uid);
            // Get or create user in Firestore
            let userData = await UserService.getUser(firebaseUser.uid);
            if (!userData) {
              console.log('User not found in Firestore, creating new user');
              // Create user in Firestore if doesn't exist
              userData = await UserService.createUser(firebaseUser.uid, {
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                photoURL: firebaseUser.photoURL || undefined,
                provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
                walletAddress: undefined,
                isAdmin: false
              });
              console.log('Created new user in Firestore:', userData);
            } else {
              console.log('Found existing user in Firestore:', userData);
            }
            
            // Convert Firestore user to our User interface
            const user: User = {
              id: userData.id,
              email: userData.email,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              provider: userData.provider,
              createdAt: userData.createdAt,
              updatedAt: userData.updatedAt,
              walletAddress: userData.walletAddress,
              isAdmin: userData.isAdmin
            };
            
            setUser(user);
            console.log('✅ Firebase user authenticated and set:', user);
          } catch (error) {
            console.error('❌ Error handling Firebase user:', error);
            // Still set loading to false even if there's an error
            setLoading(false);
          }
        } else {
          setUser(null);
          console.log('🔄 Firebase user signed out, clearing user state');
        }
        setLoading(false);
      });
      
        // Initialize Google OAuth
        initializeGoogleAuth();
        
        // Cleanup subscription on unmount
        return () => {
          clearTimeout(loadingTimeout);
          unsubscribe();
        };
      } catch (firebaseError) {
        console.error('Firebase initialization error:', firebaseError);
        clearTimeout(loadingTimeout);
        setLoading(false);
        setUser(null);
      }
    }
    
    // Cleanup timeout on unmount
    return () => clearTimeout(loadingTimeout);
  }, []);

  const initializeGoogleAuth = async () => {
    try {
      // Only initialize Google OAuth if the script loaded successfully
      await googleAuthService.waitForGoogleToLoad();
      await googleAuthService.initialize();
      console.log('Google OAuth initialized successfully');
    } catch (error) {
      // Don't let Google OAuth initialization errors break the app
      console.warn('Google OAuth initialization failed (this is non-critical):', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/profile`);
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const checkMockAuth = async () => {
    try {
      // Check for demo user first
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        const user = JSON.parse(demoUser);
        console.log('Found demo user in localStorage:', user);
        setUser(user);
        setLoading(false);
        return;
      }
      
      const mockUser = await mockAuthService.getCurrentUser();
      if (mockUser) {
        // Convert MockUser to User interface
        const user: User = {
          id: mockUser.id,
          email: mockUser.email,
          displayName: mockUser.displayName,
          photoURL: mockUser.photoURL,
          provider: mockUser.provider,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
          walletAddress: mockUser.walletAddress,
          isAdmin: mockUser.isAdmin
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Mock auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('Login function called with:', email);
    
    // Simple validation
    if (!email || !password) {
      throw new Error('Please enter both email and password');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // For demo - create instant login with any valid credentials
    try {
      const demoUser: User = {
        id: Date.now().toString(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: undefined,
        provider: 'email',
        createdAt: new Date(),
        updatedAt: new Date(),
        walletAddress: undefined, // No wallet assigned initially - user must connect manually
        isAdmin: email.includes('admin')
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
      
      console.log('Setting user:', demoUser);
      setUser(demoUser);
      
      console.log('Login completed successfully');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error('Login failed: ' + error.message);
    }
  };

  const register = async (email: string, password: string) => {
    if (useMockAuth) {
      try {
        const mockUser = await mockAuthService.register(email, password);
        const user: User = {
          id: mockUser.id,
          email: mockUser.email,
          displayName: mockUser.displayName,
          photoURL: mockUser.photoURL,
          provider: mockUser.provider,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
          walletAddress: mockUser.walletAddress,
          isAdmin: mockUser.isAdmin
        };
        setUser(user);
      } catch (error: any) {
        throw new Error(error.message);
      }
    } else {
      try {
        console.log('Firebase registration attempt:', email);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Firebase registration successful:', userCredential.user.uid);
        
        // Update display name if provided
        const displayName = email.split('@')[0];
        
        // User will be created in Firestore through the onAuthStateChanged listener
        // But we can update the display name here
        if (userCredential.user) {
          try {
            await updateProfile(userCredential.user, { displayName });
          } catch (profileError) {
            console.warn('Could not update user profile:', profileError);
          }
        }
      } catch (error: any) {
        console.error('Firebase registration error:', error);
        let errorMessage = 'Registration failed';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'An account with this email already exists';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        }
        throw new Error(errorMessage);
      }
    }
  };

  const googleLogin = async () => {
    console.log('Google login called - creating demo Google user');
    
    // Simple Google demo login - same approach as regular login
    try {
      const googleDemoUser: User = {
        id: Date.now().toString(),
        email: 'demo.google@gmail.com',
        displayName: 'Google Demo User',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
        provider: 'google',
        createdAt: new Date(),
        updatedAt: new Date(),
        walletAddress: undefined, // No wallet assigned initially - user must connect manually
        isAdmin: false
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('demoUser', JSON.stringify(googleDemoUser));
      
      console.log('Setting Google demo user:', googleDemoUser);
      setUser(googleDemoUser);
      
      console.log('Google login completed successfully');
    } catch (error: any) {
      console.error('Google login error:', error);
      throw new Error('Google login failed: ' + error.message);
    }
  };

  const logout = () => {
    if (useMockAuth) {
      mockAuthService.logout();
      setUser(null);
    } else {
      signOut(auth).then(() => {
        console.log('Firebase logout successful');
        // User state will be updated through onAuthStateChanged listener
      }).catch((error) => {
        console.error('Firebase logout error:', error);
        // Force logout even if signOut fails
        setUser(null);
      });
    }
  };

  const value = {
    user,
    login,
    register,
    googleLogin,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
