import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import simpleBlockchainService from '../services/simpleBlockchainService';
import axios from 'axios';
import { useWallet } from '../context/SimpleWalletContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [solPrice, setSolPrice] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  
  const { connected, connect } = useWallet();

  // Mock project data
  const mockProject = {
    id: parseInt(id || '1'),
    name: id === '1' ? 'Solar Farm Lahore' : 'Wind Power Karachi',
    description: id === '1' 
      ? 'A comprehensive 50MW solar farm project located in Lahore, Punjab. This state-of-the-art facility will utilize advanced photovoltaic technology to provide clean, renewable energy to thousands of homes and businesses in the region.'
      : 'Coastal wind turbines generating 30MW of clean energy for Karachi metropolitan area. These modern wind turbines will harness the coastal winds to provide sustainable energy.',
    targetAmount: id === '1' ? 500000 : 750000,
    raisedAmount: id === '1' ? 125000 : 45000,
    status: 'active',
    totalInvestors: id === '1' ? 15 : 8,
    location: id === '1' ? 'Lahore, Punjab' : 'Karachi, Sindh',
    expectedROI: id === '1' ? '8-12%' : '10-15%',
    duration: '5 years',
  };

  const progressPercentage = Math.round((mockProject.raisedAmount / mockProject.targetAmount) * 100);
  const remainingAmount = mockProject.targetAmount - mockProject.raisedAmount;

  // Load wallet data and SOL price
  useEffect(() => {
    const loadWalletData = async () => {
      if (connected) {
        const balance = await simpleBlockchainService.getWalletBalance();
        setWalletBalance(balance);
      }
      
      const price = await simpleBlockchainService.getSolPrice();
      setSolPrice(price);
    };

    loadWalletData();
  }, [connected]);

  const handleInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }

    setIsInvesting(true);
    
    try {
      const amount = parseFloat(investmentAmount);
      
      // Create payment with blockchain service
      const paymentResult = await simpleBlockchainService.sendPayment(null, {
        projectId: mockProject.id,
        amount: amount,
        solAmount: amount / solPrice,
        recipientAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      });

      if (paymentResult.success) {
        // Record investment in backend
        try {
          await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/investments`, {
            projectId: mockProject.id,
            amount: amount,
            solanaTransaction: paymentResult.signature
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          setSuccessData({
            amount: amount,
            solPaid: paymentResult.amount?.toFixed(4),
            transaction: paymentResult.signature
          });
          setShowSuccessModal(true);
          setInvestmentAmount('');
          
          // Refresh wallet balance
          if (connected) {
            const newBalance = await simpleBlockchainService.getWalletBalance();
            setWalletBalance(newBalance);
          }
        } catch (apiError) {
          console.error('API Error:', apiError);
          setSuccessData({
            amount: amount,
            solPaid: paymentResult.amount?.toFixed(4),
            transaction: paymentResult.signature,
            warning: 'Blockchain payment successful but failed to record in database.'
          });
          setShowSuccessModal(true);
        }
      } else {
        alert(`Payment failed: ${paymentResult.error}`);
      }
    } catch (error: any) {
      console.error('Investment error:', error);
      alert(`Investment failed: ${error.message}`);
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            ← Back to Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {mockProject.name}
                </h1>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Funding Progress</span>
                    <span>{progressPercentage}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${mockProject.targetAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Target</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${mockProject.raisedAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Raised</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${remainingAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mockProject.totalInvestors}
                    </div>
                    <div className="text-sm text-gray-600">Investors</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Project Description
                    </h3>
                    <p className="text-gray-600">
                      {mockProject.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Project Details
                    </h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="text-sm text-gray-900">{mockProject.location}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Expected ROI</dt>
                        <dd className="text-sm text-gray-900">{mockProject.expectedROI}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Duration</dt>
                        <dd className="text-sm text-gray-900">{mockProject.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="text-sm">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg sticky top-6">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Make an Investment
                </h3>
                
                {/* Wallet Info */}
                {connected ? (
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <div className="text-xs text-green-800">
                      <div className="font-semibold">Wallet Connected ✅</div>
                      <div>Balance: {walletBalance.toFixed(4)} SOL</div>
                      <div>SOL Price: ${solPrice.toFixed(2)}</div>
                      {investmentAmount && (
                        <div className="mt-1 font-medium">
                          Will pay: {(parseFloat(investmentAmount) / solPrice).toFixed(4)} SOL
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                    <div className="text-xs text-yellow-800">
                      <div className="font-semibold">⚠️ Connect Wallet Required</div>
                      <div>Connect your wallet to invest</div>
                    </div>
                    <button
                      onClick={connect}
                      className="mt-2 w-full bg-yellow-600 hover:bg-yellow-700 text-white text-xs py-2 px-3 rounded"
                    >
                      Connect Wallet
                    </button>
                  </div>
                )}
                
                <form onSubmit={handleInvestment} className="space-y-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Investment Amount (USD)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        min="100"
                        step="1"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="100"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum investment: $100
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isInvesting || !investmentAmount || parseInt(investmentAmount) < 100 || !connected}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-md text-sm"
                  >
                    {isInvesting ? 'Processing...' : 'Invest Now'}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Why Invest?
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Support clean energy in Pakistan</li>
                    <li>• Competitive returns</li>
                    <li>• Verified projects</li>
                    <li>• Low minimum investment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{background: 'rgba(15, 23, 42, 0.95)'}}>
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowSuccessModal(false)}>
              <div className="absolute inset-0" style={{background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)'}}></div>
            </div>
            
            <div className="max-w-md w-full relative z-10 p-8 rounded-2xl" style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(110, 255, 157, 0.8)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(110, 255, 157, 0.4)'
            }}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" style={{
                  background: 'linear-gradient(135deg, #6eff9d 0%, #10b981 100%)',
                  boxShadow: '0 0 20px rgba(110, 255, 157, 0.6)'
                }}>
                  <span className="text-3xl">🎉</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 font-mono" style={{color: '#ffffff', textShadow: '0 0 10px rgba(110, 255, 157, 0.5)'}}>INVESTMENT SUCCESSFUL!</h3>
                
                {successData && (
                  <div className="space-y-3 text-sm">
                    <div className="glass-card p-4 text-left" style={{
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{color: 'var(--secondary-text)'}}>Amount:</span>
                        <span className="font-mono font-bold" style={{color: 'var(--neon-green)'}}>${successData.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{color: 'var(--secondary-text)'}}>SOL paid:</span>
                        <span className="font-mono font-bold" style={{color: 'var(--neon-green)'}}>{successData.solPaid}</span>
                      </div>
                    </div>
                    
                    <div className="glass-card p-4" style={{
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div className="text-xs font-mono mb-2" style={{color: 'var(--dim-text)'}}>TRANSACTION_ID:</div>
                      <div className="font-mono text-xs break-all p-2 rounded" style={{
                        color: 'var(--cyber-blue)',
                        background: 'rgba(14, 165, 233, 0.1)',
                        border: '1px solid rgba(14, 165, 233, 0.2)'
                      }}>
                        {successData.transaction}
                      </div>
                    </div>
                    
                    {successData.warning && (
                      <div className="p-3 rounded-lg" style={{
                        background: 'rgba(245, 158, 11, 0.15)', 
                        border: '1px solid rgba(245, 158, 11, 0.4)'
                      }}>
                        <div className="text-xs font-mono" style={{color: 'var(--warning)'}}>
                          ⚠️ {successData.warning}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="neon-btn px-8 py-3 mt-6 font-mono tracking-wide"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
