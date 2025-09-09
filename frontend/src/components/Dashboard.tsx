import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Wind, TrendingUp, Shield, Battery, Leaf, DollarSign, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import WalletInfo from './WalletInfo';
import axios from 'axios';

const EnergyBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 50%, var(--accent-bg) 100%)'
      }}></div>
      
      {/* Animated energy particles */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-1 h-1 rounded-full animate-pulse`}
          style={{
            background: i % 3 === 0 ? 'var(--neon-green)' : i % 3 === 1 ? 'var(--cyber-blue)' : 'var(--electric-purple)',
            top: `${15 + (i * 7)}%`,
            left: `${5 + (i * 8)}%`,
            animationDelay: `${i * 0.4}s`
          }}
        ></div>
      ))}
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236eff9d' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
    </div>
  );
};

interface InvestmentSummary {
  totalInvested: number;
  totalProjects: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [investmentSummary, setInvestmentSummary] = useState<InvestmentSummary>({
    totalInvested: 0,
    totalProjects: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvestmentSummary = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/investments/my-investments`
        );
        
        if (response.data.summary) {
          setInvestmentSummary(response.data.summary);
        }
      } catch (error) {
        console.error('Failed to fetch investment summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchInvestmentSummary();
    }
  }, [user]);

  return (
    <div className="min-h-screen relative" style={{color: 'var(--primary-text)'}}>
      <EnergyBackground />
      
      <div className="relative max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Hero Section */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <div className="relative">
                <div className="w-20 h-20 glass-card flex items-center justify-center glow-green">
                  <Wind className="w-10 h-10" style={{color: 'var(--neon-green)'}} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{background: 'var(--neon-green)'}}>
                  <Zap className="w-3 h-3 text-black" />
                </div>
              </div>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold font-mono mb-4 holo-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              WELCOME_BACK, <span style={{color: 'var(--neon-green)'}}>{user?.email?.split('@')[0]?.toUpperCase()}</span>
            </motion.h1>
            <motion.p 
              className="text-xl max-w-2xl mx-auto font-light" 
              style={{color: 'var(--secondary-text)'}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your renewable energy investment control center
              <br />
              <span style={{color: 'var(--neon-green)'}} className="font-medium text-sm">BLOCKCHAIN_SECURED • REAL_TIME_DATA</span>
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, staggerChildren: 0.1 }}
          >
            {/* Total Invested Card */}
            <motion.div 
              className="glass-card group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 glass-card flex items-center justify-center glow-green">
                      <DollarSign className="w-6 h-6" style={{color: 'var(--neon-green)'}} />
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-mono font-medium mb-1" style={{color: 'var(--dim-text)'}}>
                          TOTAL_INVESTED
                        </p>
                        <p className="text-2xl font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                          {isLoading ? (
                            <span className="animate-pulse" style={{color: 'var(--dim-text)'}}>LOADING...</span>
                          ) : (
                            <span style={{color: 'var(--neon-green)'}}>
                              ${investmentSummary.totalInvested.toLocaleString()}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium flex items-center" style={{color: 'var(--neon-green)'}}>
                          <TrendingUp className="w-4 h-4 mr-1" />
                          +12.5%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Projects Supported Card */}
            <motion.div 
              className="glass-card group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 glass-card flex items-center justify-center" style={{boxShadow: '0 0 20px var(--cyber-blue)'}}>
                      <Battery className="w-6 h-6" style={{color: 'var(--cyber-blue)'}} />
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-mono font-medium mb-1" style={{color: 'var(--dim-text)'}}>
                          PROJECTS_SUPPORTED
                        </p>
                        <p className="text-2xl font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                          {isLoading ? (
                            <span className="animate-pulse" style={{color: 'var(--dim-text)'}}>LOADING...</span>
                          ) : (
                            <span style={{color: 'var(--cyber-blue)'}}>
                              {investmentSummary.totalProjects}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-8 h-8 glass-card flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--cyber-blue)'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clean Energy Impact Card */}
            <motion.div 
              className="glass-card group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 glass-card flex items-center justify-center" style={{boxShadow: '0 0 20px var(--eco-green)'}}>
                      <Leaf className="w-6 h-6" style={{color: 'var(--eco-green)'}} />
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-mono font-medium mb-1" style={{color: 'var(--dim-text)'}}>
                          CLEAN_ENERGY_IMPACT
                        </p>
                        <p className="text-2xl font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                          <span style={{color: 'var(--eco-green)'}}>
                            {Math.round(investmentSummary.totalInvested * 1.5)} kWh
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium font-mono" style={{color: 'var(--eco-green)'}}>
                          CO₂_REDUCED
                        </div>
                        <div className="text-sm font-mono" style={{color: 'var(--secondary-text)'}}>
                          {Math.round(investmentSummary.totalInvested * 0.7)} kg
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Wallet Information */}
          <div className="mb-12">
            <WalletInfo className="" />
          </div>

          {/* Call to Action Section */}
          <motion.div 
            className="glass-card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="px-8 py-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 glass-card flex items-center justify-center glow-green">
                  <Plus className="w-8 h-8" style={{color: 'var(--neon-green)'}} />
                </div>
              </div>
              <h3 className="text-3xl font-bold font-mono mb-4 holo-text">
                EXPAND_YOUR <span style={{color: 'var(--neon-green)'}}>ENERGY_PORTFOLIO</span>
              </h3>
              <p className="text-xl max-w-2xl mx-auto mb-8 font-light" style={{color: 'var(--secondary-text)'}}>
                Discover verified renewable energy projects secured by blockchain technology.
                <br />
                <span style={{color: 'var(--neon-green)'}} className="font-medium text-sm">TRANSPARENT • SUSTAINABLE • PROFITABLE</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/projects"
                  className="neon-btn group font-mono"
                >
                  <Wind className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  BROWSE_PROJECTS
                </Link>
                <button className="glass-btn group font-mono">
                  <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  LEARN_MORE
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
