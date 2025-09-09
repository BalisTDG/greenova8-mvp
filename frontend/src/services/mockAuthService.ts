// Mock Authentication Service for Demo Purposes
// This allows the app to work without Firebase/Google OAuth for client presentations

export interface MockUser {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: Date;
  updatedAt: Date;
  walletAddress?: string;
  isAdmin?: boolean;
}

class MockAuthService {
  private currentUser: MockUser | null = null;
  private users: MockUser[] = [
    {
      id: '1',
      email: 'demo@greenova8.com',
      displayName: 'Demo User',
      photoURL: 'https://via.placeholder.com/150',
      provider: 'email',
      createdAt: new Date(),
      updatedAt: new Date(),
      walletAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
      isAdmin: false
    },
    {
      id: '2',
      email: 'admin@greenova8.com',
      displayName: 'Admin User',
      photoURL: 'https://via.placeholder.com/150',
      provider: 'email',
      createdAt: new Date(),
      updatedAt: new Date(),
      walletAddress: '5FLSigC9HGRKVhB9FiEo4Y3koPFNTTX2p5b6xfn8QgjC7A7E',
      isAdmin: true
    },
    {
      id: '3',
      email: 'investor@greenova8.com',
      displayName: 'John Smith',
      photoURL: 'https://via.placeholder.com/150',
      provider: 'google',
      createdAt: new Date(),
      updatedAt: new Date(),
      walletAddress: '5FpvjGP7KvfHU8kNjzkjf8Y6sKZNTpYgL9xGYz6qW9jK3s4v',
      isAdmin: false
    }
  ];

  async login(email: string, password: string): Promise<MockUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user && password.length >= 6) {
          this.currentUser = user;
          localStorage.setItem('mockToken', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid email or password (password must be 6+ characters)'));
        }
      }, 500); // Simulate API delay
    });
  }

  async register(email: string, password: string): Promise<MockUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        const existingUser = this.users.find(u => u.email === email);
        if (existingUser) {
          reject(new Error('User already exists with this email'));
          return;
        }

        const newUser: MockUser = {
          id: Date.now().toString(),
          email,
          displayName: email.split('@')[0],
          provider: 'email',
          createdAt: new Date(),
          updatedAt: new Date(),
          walletAddress: this.generateMockWalletAddress(),
          isAdmin: false
        };

        this.users.push(newUser);
        this.currentUser = newUser;
        localStorage.setItem('mockToken', JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  }

  async googleLogin(): Promise<MockUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate Google OAuth success
        const googleUser: MockUser = {
          id: 'google_' + Date.now(),
          email: 'client@demo.com',
          displayName: 'Client Demo User',
          photoURL: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
          provider: 'google',
          createdAt: new Date(),
          updatedAt: new Date(),
          walletAddress: this.generateMockWalletAddress(),
          isAdmin: false
        };

        this.currentUser = googleUser;
        localStorage.setItem('mockToken', JSON.stringify(googleUser));
        resolve(googleUser);
      }, 1000); // Simulate Google OAuth delay
    });
  }

  async getCurrentUser(): Promise<MockUser | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedToken = localStorage.getItem('mockToken');
        if (storedToken) {
          try {
            const user = JSON.parse(storedToken);
            this.currentUser = user;
            resolve(user);
          } catch {
            localStorage.removeItem('mockToken');
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('mockToken');
  }

  private generateMockWalletAddress(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789';
    let result = '';
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Check if we should use mock authentication (when Firebase is not properly configured)
  shouldUseMockAuth(): boolean {
    const hasFirebaseConfig = !!(
      process.env.REACT_APP_FIREBASE_API_KEY && 
      process.env.REACT_APP_FIREBASE_PROJECT_ID &&
      !process.env.REACT_APP_FIREBASE_API_KEY.includes('placeholder')
    );
    
    console.log('Mock auth detection:', {
      hasFirebaseConfig,
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });

    // Always use Firebase authentication since you have it configured
    // Only use mock auth if Firebase config is completely missing
    return !hasFirebaseConfig;
  }
}

const mockAuthService = new MockAuthService();
export default mockAuthService;
