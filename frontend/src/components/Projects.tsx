import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Wind, Users, MapPin, TrendingUp, Shield, Battery, Leaf } from 'lucide-react';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  status: string;
  totalInvestors: number;
  totalRaised: number;
}

const EnergyBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 50%, var(--accent-bg) 100%)'
      }}></div>
      
      {/* Animated energy particles */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-1 h-1 rounded-full animate-pulse`}
          style={{
            background: i % 2 === 0 ? 'var(--neon-green)' : 'var(--cyber-blue)',
            top: `${20 + (i * 10)}%`,
            left: `${10 + (i * 12)}%`,
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/projects`);
        setProjects(response.data.projects || []);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen relative" style={{color: 'var(--primary-text)'}}>
      <EnergyBackground />
      
      <div className="relative container mx-auto px-4 py-8 z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
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
            className="text-5xl md:text-6xl font-bold mb-6 font-mono holo-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            CLEAN_ENERGY <span style={{color: 'var(--neon-green)'}}>PORTFOLIO</span>
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto leading-relaxed font-light" 
            style={{color: 'var(--secondary-text)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Invest in verified renewable energy projects secured by blockchain technology.
            <br />
            <span style={{color: 'var(--neon-green)'}} className="font-medium">Transparent • Sustainable • Profitable</span>
          </motion.p>
          
          {/* Status indicators */}
          <motion.div 
            className="mt-8 flex justify-center space-x-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="status-badge status-active">
              <Shield className="w-3 h-3" />
              BLOCKCHAIN_SECURED
            </div>
            <div className="status-badge status-online">
              <Battery className="w-3 h-3" />
              LIVE_PROJECTS
            </div>
            <div className="status-badge status-active">
              <Leaf className="w-3 h-3" />
              ECO_VERIFIED
            </div>
          </motion.div>
        </motion.div>

        {loading ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 glass-card flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-transparent border-t-current rounded-full animate-spin" style={{color: 'var(--neon-green)'}}></div>
              </div>
              <p className="text-xl font-mono" style={{color: 'var(--secondary-text)'}}>LOADING_PORTFOLIO...</p>
              <div className="mt-4 flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{
                      background: 'var(--neon-green)',
                      animationDelay: `${i * 0.3}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card max-w-md mx-auto">
              <div className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full" style={{background: 'var(--error-bg)', border: '1px solid var(--error-border)'}}>
                  <Zap className="w-8 h-8" style={{color: 'var(--error-text)'}} />
                </div>
                <h3 className="text-xl font-bold font-mono mb-4" style={{color: 'var(--primary-text)'}}>SYSTEM_ERROR</h3>
                <p className="mb-6" style={{color: 'var(--secondary-text)'}}>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="neon-btn font-mono"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  RETRY_CONNECTION
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {projects.map((project, index) => {
              const raisedAmount = project.totalRaised || project.raisedAmount;
              const progressPercentage = Math.round((raisedAmount / project.targetAmount) * 100);
            
            return (
              <motion.div 
                key={project.id} 
                className="glass-card group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-mono mb-3 group-hover:scale-105 transition-all" style={{color: 'var(--primary-text)'}}>
                        {project.name}
                      </h3>
                      <div className="status-badge status-active">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--neon-green)'}}></div>
                        ACTIVE_PROJECT
                      </div>
                    </div>
                    <div className="w-12 h-12 glass-card flex items-center justify-center glow-green">
                      <Wind className="w-6 h-6" style={{color: 'var(--neon-green)'}} />
                    </div>
                  </div>
                  
                  <p className="mb-6 line-clamp-3 leading-relaxed" style={{color: 'var(--secondary-text)'}}>
                    {project.description}
                  </p>
                  
                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-mono font-medium" style={{color: 'var(--dim-text)'}}>FUNDING_PROGRESS</span>
                      <span className="text-sm font-bold font-mono" style={{color: 'var(--neon-green)'}}>{progressPercentage}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full overflow-hidden" style={{background: 'var(--accent-bg)'}}>
                      <div 
                        className="h-3 rounded-full transition-all duration-700 ease-out relative shimmer-effect" 
                        style={{ 
                          width: `${progressPercentage}%`,
                          background: 'linear-gradient(90deg, var(--neon-green), var(--eco-green))'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 rounded-xl" style={{background: 'var(--accent-bg)', border: '1px solid var(--border-subtle)'}}>
                      <div className="text-lg font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                        ${project.targetAmount.toLocaleString()}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wide font-medium" style={{color: 'var(--dim-text)'}}>TARGET</div>
                    </div>
                    <div className="text-center p-4 glass-card glow-green">
                      <div className="text-lg font-bold font-mono" style={{color: 'var(--neon-green)'}}>
                        ${raisedAmount.toLocaleString()}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wide font-medium" style={{color: 'var(--dim-text)'}}>RAISED</div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm mb-6" style={{color: 'var(--dim-text)'}}>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" style={{color: 'var(--neon-green)'}} />
                      <span style={{color: 'var(--secondary-text)'}}>{project.totalInvestors} investors</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" style={{color: 'var(--cyber-blue)'}} />
                      <span style={{color: 'var(--secondary-text)'}}>Pakistan</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/projects/${project.id}`}
                      className="neon-btn flex-1 text-center group font-mono text-sm relative overflow-hidden"
                    >
                      <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      INVEST_NOW
                    </Link>
                    <Link
                      to={`/projects/${project.id}`}
                      className="glass-btn flex-1 text-center font-mono text-sm"
                    >
                      DETAILS
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </motion.div>
        )}

        {!loading && !error && projects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card max-w-md mx-auto">
              <div className="p-12">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center glass-card">
                  <Battery className="w-8 h-8" style={{color: 'var(--dim-text)'}} />
                </div>
                <h3 className="text-xl font-bold font-mono mb-4" style={{color: 'var(--primary-text)'}}>NO_PROJECTS_AVAILABLE</h3>
                <p className="mb-6" style={{color: 'var(--secondary-text)'}}>
                  New renewable energy projects will be deployed to the blockchain network soon.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="neon-btn font-mono"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  REFRESH_NETWORK
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
