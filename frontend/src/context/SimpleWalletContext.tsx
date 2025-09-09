import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface PublicKey {
  toBase58(): string;
}

interface WalletContextState {
  connected: boolean;
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (transaction: any) => Promise<any>;
  isAuthRequired: boolean;
}

const WalletContext = createContext<WalletContextState>({
  connected: false,
  publicKey: null,
  connect: async () => {},
  disconnect: () => {},
  signTransaction: async (transaction: any) => transaction,
  isAuthRequired: true,
});

interface SimpleWalletProviderProps {
  children: ReactNode;
}

export const SimpleWalletProvider: FC<SimpleWalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const { user } = useAuth();

  const connect = async () => {
    // Check if user is authenticated before allowing wallet connection
    if (!user) {
      throw new Error('Please log in to connect your wallet');
    }

    // Simulate wallet connection with user-specific data
    setConnected(true);
    // Generate a more realistic looking Solana address format
    const mockAddress = generateMockSolanaAddress(user.id);
    setPublicKey({
      toBase58: () => mockAddress
    });
  };

  // Generate a mock Solana address that looks realistic and is consistent per user
  const generateMockSolanaAddress = (userId: string | number): string => {
    // Create a deterministic but realistic-looking Solana address
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
    let address = '';
    
    // Use user ID as seed for consistent address per user
    // Convert string ID to number for seeding
    const numericSeed = typeof userId === 'string' ? 
      userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) :
      userId;
    let seed = numericSeed * 12345;
    
    for (let i = 0; i < 44; i++) {
      seed = (seed * 9301 + 49297) % 233280; // Linear congruential generator
      address += characters[seed % characters.length];
    }
    
    return address;
  };

  const disconnect = () => {
    setConnected(false);
    setPublicKey(null);
  };

  const signTransaction = async (transaction: any) => {
    // Simulate transaction signing
    return { ...transaction, signed: true };
  };

  return (
    <WalletContext.Provider value={{
      connected,
      publicKey,
      connect,
      disconnect,
      signTransaction,
      isAuthRequired: !user,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};

// Simple wallet button component
export const WalletMultiButton: FC<{ className?: string }> = ({ className = '' }) => {
  const { connected, connect, disconnect, publicKey } = useWallet();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md font-medium ${
        connected 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } ${className}`}
    >
      {connected ? `Disconnect (${publicKey?.toBase58().slice(0, 6)}...)` : 'Connect Wallet'}
    </button>
  );
};
