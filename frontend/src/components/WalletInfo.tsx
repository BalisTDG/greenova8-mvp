import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/SimpleWalletContext';
import simpleBlockchainService from '../services/simpleBlockchainService';

interface WalletInfoProps {
  className?: string;
}

export default function WalletInfo({ className = '' }: WalletInfoProps) {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [isAirdropping, setIsAirdropping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update balance and price when wallet connects
  useEffect(() => {
    const updateWalletInfo = async () => {
      if (wallet.publicKey) {
        setIsLoading(true);
        try {
          const [walletBalance, currentSolPrice] = await Promise.all([
            simpleBlockchainService.getWalletBalance(),
            simpleBlockchainService.getSolPrice()
          ]);
          setBalance(walletBalance);
          setSolPrice(currentSolPrice);
        } catch (error) {
          console.error('Error updating wallet info:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    updateWalletInfo();
    
    // Set up interval to refresh balance and price every 30 seconds
    const interval = setInterval(updateWalletInfo, 30000);
    
    return () => clearInterval(interval);
  }, [wallet.publicKey, wallet.connected]);

  const handleAirdrop = async () => {
    if (!wallet.publicKey) return;
    
    setIsAirdropping(true);
    try {
      await simpleBlockchainService.requestAirdrop();
      
      // Wait a moment for the airdrop to process
      setTimeout(async () => {
        const newBalance = await simpleBlockchainService.getWalletBalance();
        setBalance(newBalance);
      }, 3000);
      
      alert('🎉 Successfully received 1 SOL! Check your balance.');
    } catch (error) {
      console.error('Airdrop failed:', error);
      alert('Airdrop failed. You may have reached the rate limit or there was a network error.');
    } finally {
      setIsAirdropping(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!wallet.connected) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Connect Your Wallet
            </h3>
            <p className="text-xs text-yellow-700 mt-1">
              Connect your Solana wallet to start investing
            </p>
          </div>
          <button
            onClick={() => wallet.connect()}
            className="bg-yellow-600 text-white text-xs py-2 px-3 rounded-md hover:bg-yellow-700"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 ${className}`} style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
      border: '2px solid var(--border-glow)',
      boxShadow: '0 0 20px rgba(110, 255, 157, 0.2)'
    }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium font-mono flex items-center" style={{color: 'var(--primary-text)'}}>
            <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" style={{boxShadow: '0 0 8px var(--neon-green)'}}></span>
            WALLET CONNECTED ✅
          </h3>
          
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded" style={{background: 'rgba(110, 255, 157, 0.1)'}}>
              <span className="font-mono" style={{color: 'var(--secondary-text)'}}>Address:</span>
              <span className="font-mono font-bold" style={{color: 'var(--neon-green)'}}>
                {wallet.publicKey ? truncateAddress(wallet.publicKey.toBase58()) : ''}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-2 rounded" style={{background: 'rgba(110, 255, 157, 0.1)'}}>
              <span className="font-mono" style={{color: 'var(--secondary-text)'}}>Balance:</span>
              <span className="font-mono font-bold" style={{color: 'var(--neon-green)'}}>
                {isLoading ? '...' : `${balance.toFixed(4)} SOL`}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-2 rounded" style={{background: 'rgba(110, 255, 157, 0.1)'}}>
              <span className="font-mono" style={{color: 'var(--secondary-text)'}}>USD Value:</span>
              <span className="font-mono font-bold" style={{color: 'var(--neon-green)'}}>
                {isLoading ? '...' : `$${(balance * solPrice).toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-2 rounded" style={{background: 'rgba(110, 255, 157, 0.1)'}}>
              <span className="font-mono" style={{color: 'var(--secondary-text)'}}>SOL Price:</span>
              <span className="font-mono font-bold" style={{color: 'var(--neon-green)'}}>
                {isLoading ? '...' : `$${solPrice.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col space-y-2">
          <button
            onClick={() => wallet.disconnect()}
            className="bg-red-500 text-white text-xs py-1 px-2 rounded-md hover:bg-red-600"
          >
            Disconnect
          </button>
          
          {/* Airdrop button for testing (devnet only) */}
          <button
            onClick={handleAirdrop}
            disabled={isAirdropping}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-xs py-1 px-2 rounded-md font-medium"
          >
            {isAirdropping ? '...' : 'Get SOL'}
          </button>
        </div>
      </div>
      
      {balance < 0.1 && (
        <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
          ⚠️ Low balance. Use "Get SOL" button above for testing on devnet.
        </div>
      )}
    </div>
  );
}
