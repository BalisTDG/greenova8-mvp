import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { WalletMultiButton } from '../context/SimpleWalletContext';
import { Home, Briefcase, Settings, Menu, X, Zap, LogOut, Wind, Shield } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const publicNavItems = [
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/features', label: 'Projects' },
    { path: '/benefits', label: 'Benefits' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/faq', label: 'FAQ' },
  ];

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <>
      <motion.header 
        className="cyber-nav fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-14 h-14 glass-card flex items-center justify-center group-hover:shadow-glow transition-all duration-300 glow-green">
                    <div className="relative">
                      <Wind className="w-7 h-7 text-neon-green" style={{color: 'var(--neon-green)'}} />
                      <Zap className="w-3 h-3 absolute -top-1 -right-1" style={{color: 'var(--cyber-blue)'}} />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
                </div>
                <div className="ml-4 hidden sm:block">
                  <span className="text-2xl font-bold holo-text font-mono">
                    GREENOVA8
                  </span>
                  <div className="text-xs font-semibold tracking-wider uppercase" style={{color: 'var(--secondary-text)'}}>
                    CLEAN ENERGY • BLOCKCHAIN
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {user ? (
                // Logged-in user navigation
                navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.path} whileHover={{ scale: 1.02 }}>
                      <Link
                        to={item.path}
                        className={`cyber-nav-link flex items-center space-x-2 px-4 py-3 rounded-12 text-sm font-medium transition-all duration-200 ${
                          isActive(item.path)
                            ? 'active'
                            : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wide">{item.label.toUpperCase()}</span>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                // Public navigation
                publicNavItems.map((item) => (
                  <motion.div key={item.path} whileHover={{ scale: 1.02 }}>
                    <Link
                      to={item.path}
                      className={`cyber-nav-link px-4 py-3 rounded-12 text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'active'
                          : ''
                      }`}
                    >
                      <span className="text-xs font-mono tracking-wide">{item.label.toUpperCase()}</span>
                    </Link>
                  </motion.div>
                ))
              )}
            </nav>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              {user && (
                <div className="hidden sm:block">
                  <WalletMultiButton />
                </div>
              )}
              
              {/* User Actions */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block px-3 py-1 rounded-full glass-card">
                    <span className="text-xs font-mono tracking-wide" style={{color: 'var(--secondary-text)'}}>
                      {user.email}
                    </span>
                  </div>
                  <motion.button
                    onClick={logout}
                    className="neon-btn-secondary flex items-center space-x-2 px-4 py-2 text-xs font-mono tracking-wide"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">LOGOUT</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/login"
                    className="neon-btn flex items-center space-x-2 px-6 py-3 text-xs font-mono tracking-wide"
                  >
                    <Shield className="w-4 h-4" />
                    <span>LOGIN</span>
                  </Link>
                </motion.div>
              )}

              {/* Mobile menu button */}
              {user && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 glass-card transition-colors"
                  style={{color: 'var(--secondary-text)'}}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      {user && isMenuOpen && (
        <motion.div
          className="fixed top-20 left-0 right-0 z-40 glass-card m-4 rounded-3xl md:hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="p-6">
            <nav className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`cyber-nav-link flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-mono tracking-wide">{item.label.toUpperCase()}</span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile Wallet Connection */}
            <div className="mt-4 pt-4" style={{borderTop: '1px solid var(--border-subtle)'}}>
              <WalletMultiButton />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16"></div>
    </>
  );
}
