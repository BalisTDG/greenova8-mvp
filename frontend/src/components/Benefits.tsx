import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, TrendingDown, PieChart, Globe, Droplets, Building, CheckCircle, TreePine, Mail, UserPlus } from 'lucide-react';

export default function Benefits() {
  const [investmentAmount, setInvestmentAmount] = useState(25000);
  const [referralEmail, setReferralEmail] = useState('');

  return (
    <div className="min-h-screen greenova8-bg">
      {/* Benefits Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" 
            style={{background: 'var(--cyber-blue)', color: 'white'}}
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-bold">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold holo-text font-mono mb-6">
            Benefits of Investing with <span style={{color: 'var(--neon-green)'}}>Greenova8</span>
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto leading-relaxed font-mono mb-8" style={{color: 'var(--secondary-text)'}}>
            By investing through our platform, you're not just growing your wealth—you're helping build a sustainable future for Pakistan.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Benefits Lists */}
          <div className="space-y-12">
            {/* Financial Benefits */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6" style={{color: 'var(--neon-green)'}} />
                <h3 className="text-2xl font-bold holo-text font-mono">Financial Benefits</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: DollarSign, text: "24-28% Annual Returns", desc: "Higher than traditional investments" },
                  { icon: TrendingDown, text: "Low Volatility", desc: "Stable, predictable returns" },
                  { icon: PieChart, text: "Portfolio Diversification", desc: "Spread risk across multiple projects" }
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4 glass-card p-4 group"
                      whileHover={{ x: 10, scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold" style={{color: 'var(--primary-text)'}}>{benefit.text}</div>
                        <div className="text-sm" style={{color: 'var(--secondary-text)'}}>{benefit.desc}</div>
                      </div>
                      <CheckCircle className="w-5 h-5 ml-auto flex-shrink-0" style={{color: 'var(--neon-green)'}} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Environmental Impact */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-6 h-6" style={{color: 'var(--eco-green)'}} />
                <h3 className="text-2xl font-bold holo-text font-mono">Environmental Impact</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: Globe, text: "Carbon Offset", desc: "Reduce your environmental footprint" },
                  { icon: Droplets, text: "Liquidity on Demand", desc: "Access your funds when needed" },
                  { icon: Building, text: "Infrastructure-backed Assets", desc: "Investments in real, tangible projects" }
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4 glass-card p-4 group"
                      whileHover={{ x: 10, scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold" style={{color: 'var(--primary-text)'}}>{benefit.text}</div>
                        <div className="text-sm" style={{color: 'var(--secondary-text)'}}>{benefit.desc}</div>
                      </div>
                      <CheckCircle className="w-5 h-5 ml-auto flex-shrink-0" style={{color: 'var(--neon-green)'}} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Impact Calculator */}
          <motion.div 
            className="glass-card p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold holo-text font-mono mb-6 text-center">Impact Calculator</h3>
            
            {/* Investment Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-mono" style={{color: 'var(--secondary-text)'}}>Your Investment Amount (Rs.)</span>
              </div>
              
              <div className="relative">
                <input 
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="5000" 
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--neon-green) 0%, var(--neon-green) ${((investmentAmount - 10000) / (500000 - 10000)) * 100}%, var(--border-subtle) ${((investmentAmount - 10000) / (500000 - 10000)) * 100}%, var(--border-subtle) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs font-mono mt-2" style={{color: 'var(--dim-text)'}}>
                  <span>Rs.10,000</span>
                  <span>Rs.25,000</span>
                  <span>Rs.500,000</span>
                </div>
              </div>
            </div>

            {/* Current Amount Display */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold holo-text font-mono mb-2">
                Rs.{investmentAmount.toLocaleString()}
              </div>
            </div>

            {/* Impact Results */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center glass-card p-4">
                <div className="text-2xl font-bold holo-text font-mono mb-1">
                  Rs.{Math.round(investmentAmount * 0.26).toLocaleString()}
                </div>
                <div className="text-xs" style={{color: 'var(--secondary-text)'}}>
                  Annual Return
                </div>
              </div>
              
              <div className="text-center glass-card p-4" style={{background: 'var(--eco-green)', color: 'white'}}>
                <div className="text-2xl font-bold font-mono mb-1">
                  {(investmentAmount / 20833).toFixed(2)} T
                </div>
                <div className="text-xs opacity-80">
                  CO₂ Offset
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TreePine className="w-3 h-3" />
                  <span className="text-xs">+ {Math.round(investmentAmount / 15151)} trees</span>
                </div>
              </div>
              
              <div className="text-center glass-card p-4">
                <div className="text-2xl font-bold holo-text font-mono mb-1">
                  {Math.round(investmentAmount / 25)} kWh
                </div>
                <div className="text-xs" style={{color: 'var(--secondary-text)'}}>
                  Energy Produced
                </div>
                <div className="text-xs mt-1" style={{color: 'var(--neon-green)'}}>
                  ⚡ Powers {Math.round(investmentAmount / 15151)} homes
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <motion.button 
                  className="glass-btn text-sm py-2 px-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Compare to Fixed Deposit
                </motion.button>
                <motion.button 
                  className="glass-btn text-sm py-2 px-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Share My Impact
                </motion.button>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/login" 
                  className="neon-btn w-full text-center block py-3 font-bold"
                >
                  Invest Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Referral Program Section */}
      <motion.div 
        className="relative z-10 py-24"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 150, 255, 0.1) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" 
              style={{background: 'var(--neon-green)', color: 'var(--primary-bg)'}}
              whileHover={{ scale: 1.05 }}
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm font-bold">Referral Program</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold holo-text font-mono mb-6">
              Earn Rs500 for Every Friend You Refer
            </h2>
            
            <p className="text-lg max-w-3xl mx-auto leading-relaxed font-mono mb-8" style={{color: 'var(--secondary-text)'}}>
              Share the power of clean energy investing. You and your friend both get Rs500 when they make their first investment.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <motion.div 
              className="glass-card p-8 text-center"
              whileHover={{ scale: 1.02 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold holo-text font-mono mb-4">
                Get Your Referral Code
              </h3>
              
              <p className="text-sm mb-6 font-mono" style={{color: 'var(--secondary-text)'}}>
                Enter your email to generate your unique referral code
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium font-mono mb-2" style={{color: 'var(--primary-text)'}}>
                    Your Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5" style={{color: 'var(--secondary-text)'}} />
                    </div>
                    <input
                      type="email"
                      value={referralEmail}
                      onChange={(e) => setReferralEmail(e.target.value)}
                      className="glass-card w-full pl-10 pr-4 py-3 rounded-lg font-mono text-sm"
                      placeholder="your.email@example.com"
                      style={{
                        background: 'var(--glass-bg)',
                        border: `1px solid var(--border-subtle)`,
                        color: 'var(--primary-text)'
                      }}
                    />
                  </div>
                </div>
                
                <motion.button 
                  className="w-full py-3 rounded-lg font-medium font-mono transition-colors"
                  style={{
                    background: 'var(--cyber-blue)',
                    color: 'white'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generate Referral Code
                </motion.button>
              </div>
              
              <p className="text-xs mt-4 font-mono" style={{color: 'var(--dim-text)'}}>
                * Bonus credited after your friend's first investment of Rs10,000 or more
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
