// Firebase database service for GreenOVA8
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Type definitions
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  walletAddress?: string;
  isAdmin?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'solar' | 'wind' | 'hydro' | 'geothermal' | 'other';
  targetAmount: number;
  currentAmount: number;
  location: string;
  imageUrl: string;
  status: 'active' | 'funded' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deadline: Timestamp;
  minimumInvestment: number;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
  documents?: string[];
}

export interface Investment {
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  transactionHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'investment' | 'withdrawal' | 'dividend' | 'fee';
  amount: number;
  projectId?: string;
  transactionHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  description: string;
}

// User Management Functions
export class UserService {
  static async createUser(userId: string, userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      id: userId,
      ...userData,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
    
    await setDoc(doc(db, 'users', userId), user);
    return user;
  }

  static async getUser(userId: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() as User : null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('email', '==', email), limit(1));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data() as User;
  }
}

// Project Management Functions
export class ProjectService {
  static async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'currentAmount'>): Promise<Project> {
    const project: Omit<Project, 'id'> = {
      ...projectData,
      currentAmount: 0,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
    
    const docRef = await addDoc(collection(db, 'projects'), project);
    return { id: docRef.id, ...project } as Project;
  }

  static async getProject(projectId: string): Promise<Project | null> {
    const projectDoc = await getDoc(doc(db, 'projects', projectId));
    return projectDoc.exists() ? { id: projectId, ...projectDoc.data() } as Project : null;
  }

  static async getAllProjects(statusFilter?: Project['status']): Promise<Project[]> {
    let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    
    if (statusFilter) {
      q = query(collection(db, 'projects'), where('status', '==', statusFilter), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  }

  static async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    await updateDoc(doc(db, 'projects', projectId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }

  static async deleteProject(projectId: string): Promise<void> {
    await deleteDoc(doc(db, 'projects', projectId));
  }

  static async getUserProjects(userId: string): Promise<Project[]> {
    const q = query(collection(db, 'projects'), where('createdBy', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  }
}

// Investment Management Functions
export class InvestmentService {
  static async createInvestment(investmentData: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Investment> {
    const investment: Omit<Investment, 'id'> = {
      ...investmentData,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
    
    const docRef = await addDoc(collection(db, 'investments'), investment);
    
    // Update project's current amount
    const project = await ProjectService.getProject(investmentData.projectId);
    if (project) {
      await ProjectService.updateProject(investmentData.projectId, {
        currentAmount: project.currentAmount + investmentData.amount
      });
    }
    
    return { id: docRef.id, ...investment } as Investment;
  }

  static async getUserInvestments(userId: string): Promise<Investment[]> {
    const q = query(collection(db, 'investments'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investment));
  }

  static async getProjectInvestments(projectId: string): Promise<Investment[]> {
    const q = query(collection(db, 'investments'), where('projectId', '==', projectId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investment));
  }

  static async updateInvestment(investmentId: string, updates: Partial<Investment>): Promise<void> {
    await updateDoc(doc(db, 'investments', investmentId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }
}

// Transaction Management Functions
export class TransactionService {
  static async createTransaction(transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const transaction: Omit<Transaction, 'id'> = {
      ...transactionData,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
    
    const docRef = await addDoc(collection(db, 'transactions'), transaction);
    return { id: docRef.id, ...transaction } as Transaction;
  }

  static async getUserTransactions(userId: string): Promise<Transaction[]> {
    const q = query(collection(db, 'transactions'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  }

  static async getProjectTransactions(projectId: string): Promise<Transaction[]> {
    const q = query(collection(db, 'transactions'), where('projectId', '==', projectId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  }

  static async updateTransaction(transactionId: string, updates: Partial<Transaction>): Promise<void> {
    await updateDoc(doc(db, 'transactions', transactionId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }

  static async getAllTransactions(): Promise<Transaction[]> {
    const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  }
}

// Analytics and Statistics
export class AnalyticsService {
  static async getTotalInvestments(): Promise<number> {
    const investments = await getDocs(collection(db, 'investments'));
    return investments.docs.reduce((total, doc) => {
      const investment = doc.data() as Investment;
      return investment.status === 'confirmed' ? total + investment.amount : total;
    }, 0);
  }

  static async getTotalProjects(): Promise<number> {
    const projects = await getDocs(collection(db, 'projects'));
    return projects.size;
  }

  static async getTotalUsers(): Promise<number> {
    const users = await getDocs(collection(db, 'users'));
    return users.size;
  }

  static async getProjectStats(projectId: string): Promise<{
    totalInvestors: number;
    totalAmount: number;
    avgInvestment: number;
  }> {
    const q = query(collection(db, 'investments'), where('projectId', '==', projectId), where('status', '==', 'confirmed'));
    const querySnapshot = await getDocs(q);
    
    const investments = querySnapshot.docs.map(doc => doc.data() as Investment);
    const totalAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);
    
    return {
      totalInvestors: investments.length,
      totalAmount,
      avgInvestment: investments.length > 0 ? totalAmount / investments.length : 0
    };
  }
}
