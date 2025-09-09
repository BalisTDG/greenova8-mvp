import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Zap, Shield, TrendingUp, Users, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EnhancedHero() {
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

  const features = [
    { icon: Shield, text: "Blockchain Secured", color: "text-blue-600" },
    { icon: Leaf, text: "100% Clean Energy", color: "text-green-600" },
    { icon: TrendingUp, text: "Up to 15% Returns", color: "text-purple-600" },
  ];

  const stats = [
    { label: "Projects Funded", value: "25+", color: "text-green-600" },
    { label: "Total Invested", value: "$2.5M", color: "text-blue-600" },
    { label: "Active Investors", value: "1,200+", color: "text-purple-600" },
    { label: "Clean Energy", value: "75 MW", color: "text-orange-600" },
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="pt-24 pb-16 text-center lg:pt-40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mx-auto max-w-5xl">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight"
              variants={itemVariants}
            >
              <span className="block mb-2">Invest in a</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 mb-4">
                Greener Tomorrow
              </span>
            </motion.h1>
            
            <motion.p 
              className="mt-8 text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium"
              variants={itemVariants}
            >
              Join the blockchain revolution and support sustainable energy projects across Pakistan. 
              Start investing from just <span className="font-bold text-green-600">$100</span> and earn up to <span className="font-bold text-blue-600">15% returns</span> while building a cleaner future.
            </motion.p>

            {/* Features Pills */}
            <motion.div 
              className="mt-10 flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                    <span className="text-sm font-semibold text-gray-700">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user ? (
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Browse Projects
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Start Investing
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  View Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform`}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Greenova8 Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Simple, secure, and transparent blockchain-powered investing in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Connect Wallet",
              description: "Link your digital wallet and verify your identity securely on the blockchain with advanced encryption",
              icon: Shield,
              color: "from-blue-500 to-cyan-500"
            },
            {
              step: "02", 
              title: "Choose Projects",
              description: "Browse verified clean energy projects with detailed analytics and select investments that match your sustainability goals",
              icon: Leaf,
              color: "from-green-500 to-emerald-500"
            },
            {
              step: "03",
              title: "Earn Returns",
              description: "Track your investments in real-time and earn competitive returns while contributing to Pakistan's sustainable future",
              icon: TrendingUp,
              color: "from-purple-500 to-pink-500"
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>

                {/* Decorative line */}
                <div className={`w-20 h-1 bg-gradient-to-r ${item.color} rounded-full mt-6 opacity-60`}></div>
              </motion.div>
            );
          })}
        </div>

        {/* Connection Lines */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <svg className="w-full h-4" viewBox="0 0 800 40" fill="none">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
                <stop offset="50%" style={{stopColor: '#10b981', stopOpacity: 0.5}} />
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0.3}} />
              </linearGradient>
            </defs>
            <path 
              d="M100 20 Q400 5 700 20" 
              stroke="url(#connectionGradient)" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-12 border-2 border-gray-400/60 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
          <div className="w-1.5 h-4 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  );
}
