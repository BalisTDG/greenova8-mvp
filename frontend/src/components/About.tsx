import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Zap, Shield, Users, Globe, Award, Target, Heart, Leaf, Battery } from 'lucide-react';

const EnergyBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 50%, var(--accent-bg) 100%)'
      }}></div>
      
      {/* Animated energy particles */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-1 h-1 rounded-full animate-pulse`}
          style={{
            background: i % 2 === 0 ? 'var(--neon-green)' : 'var(--cyber-blue)',
            top: `${15 + (i * 8)}%`,
            left: `${10 + (i * 9)}%`,
            animationDelay: `${i * 0.6}s`
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

export default function About() {
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
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { label: "YEARS_EXPERIENCE", value: "5+", icon: Award },
    { label: "PROJECTS_COMPLETED", value: "25+", icon: Target },
    { label: "INVESTORS_SERVED", value: "1.2K+", icon: Users },
    { label: "CARBON_REDUCED", value: "50K kg", icon: Leaf },
  ];

  const values = [
    {
      icon: Shield,
      title: "TRANSPARENCY",
      description: "Every transaction is recorded on the blockchain, ensuring complete transparency and accountability in all our operations.",
      color: "var(--cyber-blue)"
    },
    {
      icon: Leaf,
      title: "SUSTAINABILITY",
      description: "We prioritize environmental sustainability, focusing exclusively on renewable energy projects that reduce carbon footprint.",
      color: "var(--eco-green)"
    },
    {
      icon: Zap,
      title: "INNOVATION",
      description: "Leveraging cutting-edge blockchain technology to revolutionize how clean energy investments are made and managed.",
      color: "var(--neon-green)"
    },
    {
      icon: Heart,
      title: "COMMUNITY",
      description: "Building a global community of investors committed to creating a sustainable future for generations to come.",
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            variants={itemVariants}
          >
            <div className="w-24 h-24 glass-card flex items-center justify-center glow-green">
              <Wind className="w-12 h-12" style={{color: 'var(--neon-green)'}} />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold font-mono mb-6 holo-text"
            variants={itemVariants}
          >
            ABOUT_<span style={{color: 'var(--neon-green)'}}>GREENOVA8</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl max-w-4xl mx-auto leading-relaxed font-light" 
            style={{color: 'var(--secondary-text)'}}
            variants={itemVariants}
          >
            Pioneering the future of renewable energy investments through blockchain technology.
            <br />
            <span style={{color: 'var(--neon-green)'}} className="font-medium">
              SUSTAINABLE • TRANSPARENT • PROFITABLE
            </span>
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="glass-card p-8 md:p-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-6 holo-text">
                OUR_MISSION
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{color: 'var(--secondary-text)'}}>
                GreenOVA8 was founded with a singular vision: to democratize access to renewable energy investments 
                while accelerating the global transition to clean energy through innovative blockchain technology.
              </p>
              <p className="text-lg leading-relaxed" style={{color: 'var(--secondary-text)'}}>
                We believe that by combining the transparency of blockchain with the urgency of climate action, 
                we can create unprecedented opportunities for both investors and the planet.
              </p>
              <div className="mt-8 flex space-x-4">
                <div className="status-badge status-active">
                  <Globe className="w-3 h-3" />
                  GLOBAL_IMPACT
                </div>
                <div className="status-badge status-online">
                  <Battery className="w-3 h-3" />
                  RENEWABLE_FOCUS
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl font-mono font-bold holo-text mb-2">8</div>
                  <div className="text-sm font-mono tracking-widest" style={{color: 'var(--neon-green)'}}>
                    GREENOVA8
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="text-center p-4 glass-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" style={{color: 'var(--neon-green)'}} />
                        <div className="text-2xl font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                          {stat.value}
                        </div>
                        <div className="text-xs font-mono uppercase tracking-wide" style={{color: 'var(--dim-text)'}}>
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-center mb-16 holo-text">
            OUR_<span style={{color: 'var(--neon-green)'}}>VALUES</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-6 text-center relative overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="relative z-10">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 glass-card flex items-center justify-center"
                      style={{boxShadow: `0 0 20px ${value.color}`}}
                    >
                      <Icon className="w-8 h-8" style={{color: value.color}} />
                    </div>
                    <h3 className="text-xl font-bold font-mono mb-4" style={{color: 'var(--primary-text)'}}>
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{color: 'var(--secondary-text)'}}>
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div 
          className="glass-card p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-8 holo-text">
            POWERED_BY_<span style={{color: 'var(--neon-green)'}}>SOLANA</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-8" style={{color: 'var(--secondary-text)'}}>
              Built on the Solana blockchain, GreenOVA8 leverages high-speed, low-cost transactions to make 
              renewable energy investments accessible to everyone. Our smart contracts ensure transparent, 
              secure, and automated execution of all investment processes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-4 glow-green">
                  <Zap className="w-8 h-8" style={{color: 'var(--neon-green)'}} />
                </div>
                <h3 className="text-xl font-bold font-mono mb-2" style={{color: 'var(--primary-text)'}}>
                  HIGH_SPEED
                </h3>
                <p className="text-sm" style={{color: 'var(--secondary-text)'}}>
                  Sub-second transaction finality
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-4" style={{boxShadow: '0 0 20px var(--cyber-blue)'}}>
                  <Shield className="w-8 h-8" style={{color: 'var(--cyber-blue)'}} />
                </div>
                <h3 className="text-xl font-bold font-mono mb-2" style={{color: 'var(--primary-text)'}}>
                  SECURE
                </h3>
                <p className="text-sm" style={{color: 'var(--secondary-text)'}}>
                  Military-grade encryption
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-4" style={{boxShadow: '0 0 20px var(--eco-green)'}}>
                  <Leaf className="w-8 h-8" style={{color: 'var(--eco-green)'}} />
                </div>
                <h3 className="text-xl font-bold font-mono mb-2" style={{color: 'var(--primary-text)'}}>
                  ECO_FRIENDLY
                </h3>
                <p className="text-sm" style={{color: 'var(--secondary-text)'}}>
                  Energy-efficient consensus
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
