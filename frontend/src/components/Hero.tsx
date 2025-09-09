import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Clock, Lock, BarChart3, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };


  const stats = [
    { label: "Projects Funded", value: "25+", color: "text-green-400" },
    { label: "Total Invested", value: "$2.5M", color: "text-blue-400" },
    { label: "Active Investors", value: "1,200+", color: "text-purple-400" },
    { label: "Clean Energy", value: "75 MW", color: "text-yellow-400" },
  ];


  return (
    <div className="cyber-hero min-h-screen relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br" style={{
          background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 50%, var(--accent-bg) 100%)'
        }}></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
        <div className="absolute top-40 right-20 w-1 h-1 rounded-full animate-pulse" style={{background: 'var(--cyber-blue)', animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 rounded-full animate-pulse" style={{background: 'var(--neon-green)', animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 rounded-full animate-pulse" style={{background: 'var(--electric-purple)', animationDelay: '0.5s'}}></div>
      </div>
      
      {/* Status Indicators - Top */}
      <motion.div 
        className="relative z-20 pt-8 pb-4 flex justify-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <div className="status-badge status-active text-xs">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
            SOLANA NETWORK
          </div>
          <div className="status-badge status-online text-xs">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--eco-green)'}}></div>
            DEVNET
          </div>
          <div className="status-badge status-online text-xs">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--eco-green)'}}></div>
            ONLINE
          </div>
        </div>
        
        {/* Additional Status Info */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-sm font-mono" style={{color: 'var(--neon-green)'}}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--warning)'}}></div>
            Only 3 projects live this month
          </div>
        </div>
        
        {/* Trust Rating */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
          <span className="text-sm font-mono" style={{color: 'var(--secondary-text)'}}>
            Trusted by 1,500+ Pakistani investors
          </span>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center px-4 pt-32 pb-16">
        <motion.div 
          className="text-center max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="block holo-text font-mono tracking-tight leading-tight mb-3">The Climate Investment</span>
              <span className="block holo-text font-mono tracking-tight leading-tight mb-3">Platform for</span>
              <span className="block holo-text font-mono tracking-tight leading-tight" style={{color: 'var(--neon-green)'}}>Everyone</span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium font-mono px-4 mb-4"
              variants={itemVariants}
              style={{color: 'var(--secondary-text)'}}
            >
              Projected 24–28% annual returns, backed by audited solar & wind projects.
            </motion.p>
            
            <motion.p 
              className="text-lg font-bold max-w-3xl mx-auto font-mono px-4"
              variants={itemVariants}
              style={{color: 'var(--neon-green)'}}
            >
              Starting at Rs10,000.
            </motion.p>
            
            <motion.p 
              className="text-sm max-w-3xl mx-auto font-mono px-4 mt-2"
              variants={itemVariants}
              style={{color: 'var(--dim-text)'}}
            >
              *Past performance doesn't guarantee future returns. All investments carry risk.
            </motion.p>
          </motion.div>
          
          {/* Central Energy Cylinder */}
          <motion.div 
            className="relative my-12 mx-auto"
            variants={itemVariants}
          >
            <div className="energy-cylinder mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold mb-2 holo-text">8</div>
                  <div className="text-sm font-mono tracking-widest" style={{color: 'var(--neon-green)'}}>
                    GREENOVA8
                  </div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="particle absolute top-1/4 left-1/4"></div>
              <div className="particle absolute top-3/4 right-1/4"></div>
              <div className="particle absolute top-1/2 left-1/6"></div>
            </div>
          </motion.div>

          {/* Surrounding Information Cards */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {/* About Us Card - Bottom Left */}
            <motion.div 
              className="absolute bottom-16 left-4 xl:left-10 glass-card p-4 xl:p-6 pointer-events-auto float-slow max-w-xs"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <h3 className="text-lg font-bold mb-3 holo-text">About Us</h3>
              <p className="text-sm mb-4" style={{color: 'var(--secondary-text)'}}>
                Learn more about our mission, our innovative technology, and our commitment to clean energy.
              </p>
              <Link to="/about" className="neon-btn text-xs px-4 py-2 inline-block">
                ABOUT US
              </Link>
            </motion.div>

            {/* Profit Calculator Card - Top Right */}
            <motion.div 
              className="absolute top-32 right-4 xl:right-10 glass-card p-4 xl:p-6 pointer-events-auto float-slow max-w-xs"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h3 className="text-lg font-bold mb-3 holo-text">See My Profit</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold" style={{color: 'var(--neon-green)'}}>$100</span>
                  <span className="text-lg" style={{color: 'var(--secondary-text)'}}>→</span>
                  <span className="text-2xl font-bold" style={{color: 'var(--neon-green)'}}>$126/year</span>
                </div>
                <div className="text-center py-2 px-4 rounded-lg" style={{background: 'var(--eco-green)', color: 'white'}}>
                  <span className="text-sm font-bold">26% Annual Returns</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs" style={{color: 'var(--dim-text)'}}>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--electric-purple)'}}></div>
                  <span>47 people viewing this page</span>
                </div>
              </div>
            </motion.div>

            {/* How it Works Card - Bottom Right */}
            <motion.div 
              className="absolute bottom-16 right-4 xl:right-10 glass-card p-4 xl:p-6 pointer-events-auto float-slow max-w-xs"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ animationDelay: '2s' }}
            >
              <h3 className="text-lg font-bold mb-3 holo-text">How it Works</h3>
              <p className="text-sm mb-4" style={{color: 'var(--secondary-text)'}}>
                Discover how our platform makes blockchain-based clean energy investment simple and secure.
              </p>
              <Link to="/how-it-works" className="neon-btn text-xs px-4 py-2 inline-block">
                HOW IT WORKS
              </Link>
            </motion.div>

            {/* Status Indicators - Top */}
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {user ? (
                <Link to="/projects" className="neon-btn px-8 py-3 inline-flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Investing Now
                </Link>
              ) : (
                <Link to="/login" className="neon-btn px-8 py-3 inline-flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Investing Now
                </Link>
              )}
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/dashboard" className="neon-btn-secondary px-8 py-3 inline-flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Calculate My Returns
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-12 border-2 border-gray-400/60 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mt-2"></div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + index * 0.1 }}
          >
            <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform font-mono`}>
              {stat.value}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide font-mono" style={{color: 'var(--secondary-text)'}}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" 
            style={{background: 'var(--neon-green)', color: 'var(--primary-bg)'}}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-bold">Four Simple Steps</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold holo-text font-mono mb-6">
            How Greenova8 Works
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto leading-relaxed font-mono mb-8" style={{color: 'var(--secondary-text)'}}>
            Our platform makes it easy to invest in renewable energy projects with blockchain security and complete transparency.
          </p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm font-medium font-mono" style={{color: 'var(--secondary-text)'}}>Step 1 of 4</span>
            <div className="flex gap-1">
              <div className="w-8 h-1 rounded" style={{background: 'var(--neon-green)'}}></div>
              <div className="w-8 h-1 rounded" style={{background: 'var(--border-subtle)'}}></div>
              <div className="w-8 h-1 rounded" style={{background: 'var(--border-subtle)'}}></div>
              <div className="w-8 h-1 rounded" style={{background: 'var(--border-subtle)'}}></div>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {[
            {
              stepNumber: "01",
              title: "Create Your Account",
              subtitle: "Quick digital KYC via NADRA",
              description: "Complete KYC in < 60 sec",
              verification: "Secure & Fast Verification",
              isActive: true
            },
            {
              stepNumber: "02",
              title: "Choose a Project",
              subtitle: "Browse verified solar, wind, hydro & more clean energy options",
              description: "Browse verified projects. Tap Invest.",
              verification: "Curated Green Investments",
              isActive: false
            },
            {
              stepNumber: "03",
              title: "Fund via Blockchain",
              subtitle: "Invest from just $100 via bank transfer or mobile payment",
              description: "Use local payment options—Rs. or USD stablecoins",
              verification: "Transparent & Secure",
              isActive: false
            },
            {
              stepNumber: "04",
              title: "Track ROI & Impact",
              subtitle: "Monitor 24-28% returns & CO₂ offset in real-time dashboard",
              description: "Real-time analytics",
              verification: "Live Performance Tracking",
              isActive: false
            }
          ].map((step, index) => {
            return (
              <motion.div 
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              >
                {/* Circular Progress Indicator */}
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 font-mono ${
                    step.isActive 
                      ? 'text-white shadow-lg border-4'
                      : 'border-4'
                  }`} style={{
                    background: step.isActive ? 'var(--neon-green)' : 'var(--glass-bg)',
                    borderColor: step.isActive ? 'var(--neon-green)' : 'var(--border-subtle)',
                    color: step.isActive ? 'var(--primary-bg)' : 'var(--secondary-text)'
                  }}>
                    <span className="text-sm font-bold">{step.stepNumber}</span>
                  </div>
                </div>

                {/* Step Card */}
                <div className={`glass-card p-6 transition-all duration-300 h-full group-hover:shadow-2xl ${
                  step.isActive 
                    ? 'border-2 shadow-lg'
                    : 'border hover:scale-105'
                }`} style={{
                  borderColor: step.isActive ? 'var(--neon-green)' : 'var(--border-subtle)',
                  boxShadow: step.isActive ? '0 0 20px rgba(0, 255, 127, 0.3)' : undefined
                }}>
                  <h3 className="text-xl font-bold holo-text font-mono mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm mb-4 leading-relaxed font-mono" style={{color: 'var(--secondary-text)'}}>
                    {step.subtitle}
                  </p>
                  
                  <div className="text-xs font-medium mb-4 font-mono" style={{color: 'var(--neon-green)'}}>
                    {step.description}
                  </div>
                  
                  {/* Verification Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium font-mono ${
                    step.isActive
                      ? 'text-white'
                      : ''
                  }`} style={{
                    background: step.isActive ? 'var(--neon-green)' : 'var(--glass-bg)',
                    color: step.isActive ? 'var(--primary-bg)' : 'var(--secondary-text)',
                    border: `1px solid ${step.isActive ? 'var(--neon-green)' : 'var(--border-subtle)'}`
                  }}>
                    <CheckCircle className="w-3 h-3" />
                    {step.verification}
                  </div>
                </div>
                
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 z-0" style={{
                    background: 'var(--border-subtle)',
                    transform: 'translateX(-50%)'
                  }}></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <motion.button 
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center transition-colors"
            style={{color: 'var(--secondary-text)'}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button 
            className="px-6 py-2 rounded-full font-medium font-mono transition-colors"
            style={{
              background: 'var(--neon-green)',
              color: 'var(--primary-bg)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pause
          </motion.button>
          
          <motion.button 
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center transition-colors"
            style={{color: 'var(--secondary-text)'}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Bottom Status */}
        <div className="flex justify-center items-center mt-8 text-sm" style={{color: 'var(--secondary-text)'}}>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
            <span className="font-mono">47 people viewing this page</span>
          </div>
        </div>
      </motion.div>

      {/* Impact Investing Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold holo-text font-mono mb-6">
            You're 1 step away from impact investing
          </h2>
          <Link 
            to="/how-it-works" 
            className="inline-flex items-center gap-2 text-lg font-mono group" 
            style={{color: 'var(--neon-green)'}}
          >
            How It Works 
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Instant KYC in 60s",
              icon: Clock,
              description: "Quick identity verification",
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Smart-Contract Escrow",
              icon: Lock,
              description: "Secure automated transactions",
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "Realtime CO₂ Dashboard",
              icon: BarChart3,
              description: "Track environmental impact",
              color: "from-purple-500 to-pink-500"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                className="glass-card p-6 text-center group"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold holo-text font-mono mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm" style={{color: 'var(--secondary-text)'}}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 glass-card"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
            <span className="text-sm font-mono">47 people are viewing this</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full" 
            style={{background: 'var(--eco-green)', color: 'white'}}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-bold">+26.2% ROI Today</span>
          </motion.div>
        </div>

        {/* Impact Call-to-Action */}
        <div className="text-center mb-16">
          <p className="text-xl font-mono" style={{color: 'var(--secondary-text)'}}>
            Learn how to turn your investment into both profit and impact.
          </p>
        </div>
      </motion.div>


      {/* Bottom Green CTA Section */}
      <motion.div 
        className="relative z-10 py-12"
        style={{
          background: 'linear-gradient(135deg, var(--eco-green) 0%, var(--neon-green) 100%)'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg font-mono font-bold">
                Start with just Rs10,000 • Audited projects • Instant KYC
              </span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/login" 
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Start Investing
              </Link>
            </motion.div>
            <div className="flex items-center gap-1 text-white text-sm">
              <div className="w-2 h-2 rounded-full animate-pulse bg-white"></div>
              <span>47 people viewing this page</span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
