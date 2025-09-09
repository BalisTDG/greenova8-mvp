import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Wind, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EnergyBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 50%, var(--accent-bg) 100%)'
      }}></div>
      
      {/* Animated energy particles */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
      <div className="absolute top-40 right-20 w-1 h-1 rounded-full animate-pulse" style={{background: 'var(--cyber-blue)', animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 rounded-full animate-pulse" style={{background: 'var(--neon-green)', animationDelay: '2s'}}></div>
      <div className="absolute top-60 left-1/3 w-1 h-1 rounded-full animate-pulse" style={{background: 'var(--electric-purple)', animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-60 right-1/4 w-1 h-1 rounded-full animate-pulse" style={{background: 'var(--neon-green)', animationDelay: '3s'}}></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236eff9d' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
    </div>
  );
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const { login, register, googleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    console.log('Form submitted:', { isLogin, email, passwordLength: password.length });

    try {
      if (isLogin) {
        console.log('Attempting login...');
        await login(email, password);
        console.log('Login successful, should redirect to dashboard');
      } else {
        console.log('Attempting registration...');
        await register(email, password);
        console.log('Registration successful, should redirect to dashboard');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    console.log('Google login button clicked');
    
    try {
      await googleLogin();
      console.log('Google login successful, should redirect to dashboard');
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <EnergyBackground />
      
      <motion.div 
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="mx-auto w-20 h-20 glass-card flex items-center justify-center mb-6 glow-green"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <Wind className="w-10 h-10" style={{color: 'var(--neon-green)'}} />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold mb-2 holo-text font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            GREENOVA8
          </motion.h1>
          <motion.p 
            className="font-mono text-sm tracking-wider" 
            style={{color: 'var(--secondary-text)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isLogin 
              ? 'BLOCKCHAIN_NETWORK_ACCESS' 
              : 'WALLET_INITIALIZATION'
            }
          </motion.p>
          <motion.div 
            className="mt-4 flex justify-center space-x-3 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="status-badge status-active">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
              SOLANA
            </div>
            <div className="status-badge status-online">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--eco-green)'}}></div>
              ONLINE
            </div>
          </motion.div>
        </div>

        {/* Form Card */}
        <motion.div 
          className="glass-card p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex space-x-1 p-1 rounded-xl" style={{background: 'var(--accent-bg)'}}>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all font-mono tracking-wide ${
                  isLogin 
                    ? 'neon-btn' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                style={!isLogin ? {color: 'var(--dim-text)'} : {}}
              >
                AUTHENTICATE
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all font-mono tracking-wide ${
                  !isLogin 
                    ? 'neon-btn' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                style={isLogin ? {color: 'var(--dim-text)'} : {}}
              >
                REGISTER
              </button>
            </div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-md" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5" style={{color: 'var(--error)'}} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-mono" style={{color: 'var(--error)'}}>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-mono font-medium mb-2 tracking-wide" style={{color: 'var(--secondary-text)'}}>
                    USER_NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{color: 'var(--dim-text)'}} />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="cyber-input pl-12"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
              )}

              <div>
                  <label htmlFor="email" className="block text-sm font-mono font-medium mb-2 tracking-wide uppercase" style={{color: 'var(--accent-text)'}}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 z-10" style={{color: 'var(--neon-green)'}} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-4 py-4 rounded-lg font-mono"
                      placeholder="user@greenova8.com"
                      style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '2px solid var(--border-glow)',
                        color: 'var(--primary-text)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--neon-green)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(110, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-glow)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-mono font-medium mb-2 tracking-wide uppercase" style={{color: 'var(--accent-text)'}}>
                    {isLogin ? 'Access Code' : 'Create Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 z-10" style={{color: 'var(--neon-green)'}} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-14 py-4 rounded-lg font-mono"
                      placeholder={isLogin ? '••••••••' : 'Min. 8 characters'}
                      minLength={!isLogin ? 8 : undefined}
                      style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '2px solid var(--border-glow)',
                        color: 'var(--primary-text)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--neon-green)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(110, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-glow)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{color: 'var(--dim-text)'}}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="mt-2 text-xs font-mono" style={{color: 'var(--dim-text)'}}>
                    Password must contain at least 6 characters
                  </p>
                )}
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={rememberSession}
                    onChange={(e) => {
                      setRememberSession(e.target.checked);
                      alert(`Remember session is now ${e.target.checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                  <div className="relative">
                    <div className={`w-5 h-5 glass-card border border-subtle rounded flex items-center justify-center transition-all duration-200 ${
                      rememberSession ? 'bg-opacity-20' : ''
                    }`} style={rememberSession ? {borderColor: 'var(--neon-green)', backgroundColor: 'var(--neon-green)'} : {}}>
                      {rememberSession && (
                        <div className="w-2 h-2 rounded-sm" style={{background: 'var(--neon-green)'}}></div>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-mono" style={{color: 'var(--secondary-text)'}}>
                    REMEMBER_SESSION
                  </span>
                </label>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    alert('To reset your password, please contact the administrator at admin@greenova8.com');
                    setShowForgotPassword(false);
                  }}
                  className="text-sm font-mono transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1"
                  style={{color: 'var(--neon-green)'}}
                >
                  FORGOT_PASSWORD?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full neon-btn py-4 px-6 font-mono tracking-wide text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin mr-3"></div>
                  PROCESSING...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {isLogin ? (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      ACCESS_DASHBOARD
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      CREATE_ACCOUNT
                    </>
                  )}
                </div>
              )}
            </motion.button>

            {/* Google OAuth Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{borderColor: 'var(--border-glow)'}}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 font-mono" style={{background: 'var(--primary-bg)', color: 'var(--dim-text)'}}>
                  OR
                </span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className={`w-full flex items-center justify-center py-4 px-6 rounded-lg font-mono text-sm font-semibold transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              style={{
                background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.9) 0%, rgba(52, 168, 83, 0.9) 100%)',
                border: '2px solid rgba(66, 133, 244, 0.3)',
                color: '#ffffff',
                boxShadow: '0 0 20px rgba(66, 133, 244, 0.3)'
              }}
              whileHover={!loading ? {
                boxShadow: '0 0 30px rgba(66, 133, 244, 0.5), 0 5px 20px rgba(0, 0, 0, 0.2)',
                scale: 1.02
              } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin mr-3"></div>
                  PROCESSING...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  CONTINUE_WITH_GOOGLE
                </div>
              )}
            </motion.button>

            {!isLogin && (
              <div className="text-center">
                <p className="text-xs font-mono" style={{color: 'var(--dim-text)'}}>
                  By creating account, agree to{' '}
                  <button 
                    type="button"
                    onClick={() => console.log('Terms of Service clicked')}
                    className="font-medium transition-colors hover:underline"
                    style={{color: 'var(--neon-green)'}}
                  >
                    TERMS
                  </button>
                  {' & '}
                  <button 
                    type="button"
                    onClick={() => console.log('Privacy Policy clicked')}
                    className="font-medium transition-colors hover:underline"
                    style={{color: 'var(--neon-green)'}}
                  >
                    PRIVACY
                  </button>
                </p>
              </div>
            )}
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm font-mono tracking-wider" style={{color: 'var(--dim-text)'}}>
            POWERING_CLEAN_ENERGY_FUTURE
            <br />
            <span style={{color: 'var(--neon-green)'}}>BLOCKCHAIN_SECURED</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
