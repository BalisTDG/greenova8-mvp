import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Zap, Shield, TrendingUp, Wallet, Search, CheckCircle, BarChart3, Users, Globe, Coins } from 'lucide-react';
import { useWallet } from '../context/SimpleWalletContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
            top: `${10 + (i * 7)}%`,
            left: `${5 + (i * 8)}%`,
            animationDelay: `${i * 0.5}s`
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

export default function HowItWorks() {
  const { connect, connected, publicKey } = useWallet();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login');
      return;
    }
    
    try {
      await connect();
      // Wallet connection will be handled by the wallet context
    } catch (error: any) {
      alert('Failed to connect wallet: ' + (error?.message || 'Unknown error'));
    }
  };

  const handleStepClick = (stepNumber: string, stepTitle: string) => {
    switch(stepNumber) {
      case '01':
        // Step 1: Connect Wallet
        if (!user) {
          navigate('/login');
        } else if (!connected) {
          handleWalletConnect();
        } else {
          alert('✅ Wallet already connected! You can now explore projects.');
        }
        break;
      case '02':
        // Step 2: Explore Projects
        if (!user) {
          navigate('/login');
        } else {
          navigate('/features'); // This route shows PublicProjects component
        }
        break;
      case '03':
        // Step 3: Make Investment
        if (!user) {
          navigate('/login');
        } else {
          navigate('/projects'); // This route shows Projects component for investments
        }
        break;
      case '04':
        // Step 4: Track Returns
        if (!user) {
          navigate('/login');
        } else {
          navigate('/dashboard'); // This route shows Dashboard with performance tracking
        }
        break;
      default:
        // All steps are properly handled above
        break;
    }
  };

  const steps = [
    {
      number: "01",
      title: "CONNECT_WALLET",
      subtitle: "Blockchain Authentication",
      description: "Connect your Solana wallet to securely access the platform. Our system uses advanced cryptographic protocols to ensure your identity and funds remain safe.",
      icon: Wallet,
      color: "var(--cyber-blue)",
      features: ["Multi-wallet support", "Hardware wallet compatible", "Biometric authentication", "Zero-knowledge proofs"]
    },
    {
      number: "02", 
      title: "EXPLORE_PROJECTS",
      subtitle: "Verified Investment Opportunities",
      description: "Browse through our curated portfolio of renewable energy projects. Each project undergoes rigorous due diligence and real-time monitoring.",
      icon: Search,
      color: "var(--eco-green)",
      features: ["AI-powered matching", "Risk assessment", "Environmental impact data", "Real-time analytics"]
    },
    {
      number: "03",
      title: "MAKE_INVESTMENT",
      subtitle: "Smart Contract Execution",
      description: "Invest with confidence using our automated smart contracts. Your investment is tokenized and recorded immutably on the Solana blockchain.",
      icon: Coins,
      color: "var(--neon-green)",
      features: ["Instant execution", "Fractional ownership", "Transparent fees", "Automated compliance"]
    },
    {
      number: "04",
      title: "TRACK_RETURNS",
      subtitle: "Real-time Performance",
      description: "Monitor your investment performance in real-time. Receive automated returns directly to your wallet as projects generate clean energy revenue.",
      icon: BarChart3,
      color: "var(--electric-purple)",
      features: ["Live dashboard", "Automated payouts", "Performance analytics", "Carbon credit tracking"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "SECURE_&_TRANSPARENT",
      description: "All transactions are recorded on-chain with military-grade encryption",
      color: "var(--cyber-blue)"
    },
    {
      icon: TrendingUp,
      title: "COMPETITIVE_RETURNS",
      description: "Earn up to 15% annually while supporting renewable energy",
      color: "var(--neon-green)"
    },
    {
      icon: Globe,
      title: "GLOBAL_IMPACT",
      description: "Contribute to reducing global carbon emissions by 50K+ kg annually",
      color: "var(--eco-green)"
    },
    {
      icon: Users,
      title: "COMMUNITY_DRIVEN",
      description: "Join 1,200+ investors building a sustainable future together",
      color: "var(--electric-purple)"
    }
  ];

  return (
    <div className="min-h-screen relative" style={{color: 'var(--primary-text)'}}>
      <EnergyBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-24 h-24 glass-card flex items-center justify-center glow-green">
                <Wind className="w-12 h-12" style={{color: 'var(--neon-green)'}} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{background: 'var(--neon-green)'}}>
                <Zap className="w-3 h-3 text-black" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold font-mono mb-6 holo-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            HOW_IT_<span style={{color: 'var(--neon-green)'}}>WORKS</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl max-w-4xl mx-auto leading-relaxed font-light" 
            style={{color: 'var(--secondary-text)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Discover how GreenOVA8 revolutionizes renewable energy investments through blockchain technology.
            <br />
            <span style={{color: 'var(--neon-green)'}} className="font-medium">
              SIMPLE • SECURE • SUSTAINABLE
            </span>
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                className="relative mb-16 last:mb-0"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-col-dense'}`}>
                  {/* Content */}
                  <div className={isEven ? '' : 'md:col-start-2'}>
                    <div className="glass-card p-8">
                      <div className="flex items-center mb-6">
                        <div 
                          className="w-16 h-16 glass-card flex items-center justify-center mr-4"
                          style={{boxShadow: `0 0 20px ${step.color}`}}
                        >
                          <Icon className="w-8 h-8" style={{color: step.color}} />
                        </div>
                        <div>
                          <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{color: 'var(--dim-text)'}}>
                            STEP {step.number}
                          </div>
                          <h3 className="text-2xl font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                            {step.title}
                          </h3>
                          <div className="text-sm font-mono" style={{color: step.color}}>
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-lg leading-relaxed mb-6" style={{color: 'var(--secondary-text)'}}>
                        {step.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {step.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" style={{color: step.color}} />
                            <span className="text-sm font-mono" style={{color: 'var(--secondary-text)'}}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual Element */}
                  <div className={isEven ? '' : 'md:col-start-1'}>
                    <div className="relative w-full max-w-md mx-auto">
                      <motion.div 
                        className="p-4 md:p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: `0 25px 80px rgba(0, 0, 0, 0.3), 0 0 60px ${step.color}80`
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStepClick(step.number, step.title)}
                        style={{
                          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)`,
                          border: `3px solid ${step.color}`,
                          boxShadow: `0 0 40px ${step.color}40, inset 0 0 20px ${step.color}10`,
                          width: '100%',
                          maxWidth: '320px',
                          margin: '0 auto'
                        }}
                      >
                        <div className="relative w-full" style={{ minHeight: '180px', maxHeight: '220px' }}>
                          <div className="flex items-center justify-center h-full">
                            {/* Main step number - Properly contained */}
                            <div 
                              className="text-6xl md:text-7xl lg:text-8xl font-mono font-black relative z-20 select-none overflow-hidden"
                              style={{
                                color: '#ffffff',
                                textShadow: `0 0 20px ${step.color}, 0 0 40px ${step.color}`,
                                WebkitTextStroke: `1px ${step.color}`,
                                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))',
                                lineHeight: '1',
                                maxWidth: '100%',
                                wordBreak: 'keep-all'
                              }}
                            >
                              {step.number}
                            </div>
                          </div>
                          
                          {/* Strong background glow */}
                          <div 
                            className="absolute inset-0 flex items-center justify-center opacity-60 z-10"
                            style={{
                              background: `radial-gradient(circle, ${step.color}30 0%, transparent 60%)`
                            }}
                          ></div>
                          
                          {/* Animated border ring - Responsive */}
                          <div className="absolute inset-2 md:inset-4 flex items-center justify-center z-5">
                            <div className="animate-spin" style={{animationDuration: '8s'}}>
                              <div 
                                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-2 md:border-4 border-dashed rounded-full"
                                style={{borderColor: step.color, opacity: 0.6}}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Enhanced floating particles - Responsive */}
                          <div className="absolute top-2 left-2 w-3 h-3 rounded-full animate-pulse" style={{background: step.color, boxShadow: `0 0 10px ${step.color}`}}></div>
                          <div className="absolute top-8 right-4 w-2 h-2 rounded-full animate-pulse" style={{background: step.color, animationDelay: '1s', boxShadow: `0 0 8px ${step.color}`}}></div>
                          <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full animate-pulse" style={{background: step.color, animationDelay: '2s', boxShadow: `0 0 8px ${step.color}`}}></div>
                          <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full animate-pulse" style={{background: step.color, animationDelay: '3s', boxShadow: `0 0 6px ${step.color}`}}></div>
                        </div>
                        
                        {/* Step info always visible at bottom */}
                        <div className="mt-4 relative z-20">
                          <div 
                            className="text-sm font-mono font-bold px-4 py-2 rounded-full inline-block"
                            style={{
                              background: `${step.color}20`,
                              color: '#ffffff',
                              border: `2px solid ${step.color}`,
                              boxShadow: `0 0 15px ${step.color}40`
                            }}
                          >
                            STEP {step.number} - CLICK ME
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Connection line (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-8">
                    <div 
                      className="w-0.5 h-16 mx-auto"
                      style={{background: `linear-gradient(to bottom, ${step.color}, ${steps[index + 1].color})`}}
                    ></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div 
          className="glass-card p-8 md:p-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-center mb-16 holo-text">
            WHY_CHOOSE_<span style={{color: 'var(--neon-green)'}}>GREENOVA8</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div 
                    className="w-20 h-20 glass-card flex items-center justify-center mx-auto mb-6"
                    style={{boxShadow: `0 0 20px ${benefit.color}`}}
                  >
                    <Icon className="w-10 h-10" style={{color: benefit.color}} />
                  </div>
                  <h3 className="text-xl font-bold font-mono mb-4" style={{color: 'var(--primary-text)'}}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{color: 'var(--secondary-text)'}}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="glass-card p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
        >
          <h2 className="text-4xl font-bold font-mono mb-6 holo-text">
            READY_TO_<span style={{color: 'var(--neon-green)'}}>START?</span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{color: 'var(--secondary-text)'}}>
            Join thousands of investors who are already earning returns while building a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="neon-btn px-8 py-4 font-mono flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWalletConnect}
            >
              <Zap className="w-5 h-5 mr-2" />
              {connected ? `CONNECTED (${publicKey?.toBase58().slice(0, 6)}...)` : 'CONNECT_WALLET'}
            </motion.button>
            
            <motion.button
              className="glass-btn px-8 py-4 font-mono flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shield className="w-5 h-5 mr-2" />
              LEARN_MORE
            </motion.button>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono" style={{color: 'var(--neon-green)'}}>25+</div>
              <div className="text-xs font-mono uppercase" style={{color: 'var(--dim-text)'}}>PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono" style={{color: 'var(--cyber-blue)'}}>$2.5M</div>
              <div className="text-xs font-mono uppercase" style={{color: 'var(--dim-text)'}}>INVESTED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono" style={{color: 'var(--eco-green)'}}>1.2K+</div>
              <div className="text-xs font-mono uppercase" style={{color: 'var(--dim-text)'}}>INVESTORS</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
