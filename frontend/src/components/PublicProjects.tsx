import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Sun, Zap, MapPin, TrendingUp, Users, Calendar, Shield, Battery, Leaf, Wallet, ExternalLink } from 'lucide-react';
import { WalletMultiButton } from '../context/SimpleWalletContext';
import { useAuth } from '../context/AuthContext';

interface Project {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'solar' | 'wind' | 'hydro' | 'biomass';
  targetAmount: number;
  raisedAmount: number;
  investors: number;
  startDate: string;
  expectedROI: string;
  status: 'active' | 'completed' | 'upcoming';
  image: string;
  featured: boolean;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    name: "Sahiwal Solar Farm",
    description: "Large-scale photovoltaic solar power plant generating clean energy for 50,000 households in Punjab. Features advanced tracking systems and battery storage capabilities.",
    location: "Sahiwal, Punjab",
    type: 'solar',
    targetAmount: 2500000,
    raisedAmount: 2100000,
    investors: 847,
    startDate: "2024-03-15",
    expectedROI: "24-26%",
    status: 'active',
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    name: "Gharo Wind Power",
    description: "Coastal wind energy project harnessing the Arabian Sea winds. State-of-the-art turbines with smart grid integration for maximum efficiency.",
    location: "Gharo, Sindh",
    type: 'wind',
    targetAmount: 3200000,
    raisedAmount: 3200000,
    investors: 1205,
    startDate: "2023-08-20",
    expectedROI: "26-28%",
    status: 'completed',
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 3,
    name: "Muzaffargarh Biomass Plant",
    description: "Agricultural waste-to-energy facility converting rice husks and wheat straw into clean electricity while supporting local farmers.",
    location: "Muzaffargarh, Punjab",
    type: 'biomass',
    targetAmount: 1800000,
    raisedAmount: 1350000,
    investors: 523,
    startDate: "2024-06-10",
    expectedROI: "22-25%",
    status: 'active',
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 4,
    name: "Chitral Micro Hydro",
    description: "Small-scale hydroelectric project powering remote mountain communities. Sustainable design with minimal environmental impact.",
    location: "Chitral, KPK",
    type: 'hydro',
    targetAmount: 950000,
    raisedAmount: 420000,
    investors: 289,
    startDate: "2024-09-01",
    expectedROI: "20-23%",
    status: 'active',
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 5,
    name: "Quetta Solar Grid",
    description: "Distributed solar network across Balochistan's capital. Combines rooftop installations with community solar gardens.",
    location: "Quetta, Balochistan",
    type: 'solar',
    targetAmount: 2100000,
    raisedAmount: 0,
    investors: 0,
    startDate: "2024-12-01",
    expectedROI: "25-27%",
    status: 'upcoming',
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 6,
    name: "Karachi Offshore Wind",
    description: "Pakistan's first offshore wind project leveraging consistent sea breezes. Advanced floating turbine technology for maximum output.",
    location: "Karachi Coast, Sindh",
    type: 'wind',
    targetAmount: 4500000,
    raisedAmount: 0,
    investors: 0,
    startDate: "2025-02-15",
    expectedROI: "28-32%",
    status: 'upcoming',
    image: "/api/placeholder/400/250",
    featured: true
  }
];

const projectTypeIcons = {
  solar: Sun,
  wind: Wind,
  hydro: Zap,
  biomass: Leaf
};

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

export default function PublicProjects() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'upcoming'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'solar' | 'wind' | 'hydro' | 'biomass'>('all');

  const filteredProjects = sampleProjects.filter(project => {
    const statusMatch = filter === 'all' || project.status === filter;
    const typeMatch = typeFilter === 'all' || project.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--neon-green)';
      case 'completed': return 'var(--cyber-blue)';
      case 'upcoming': return 'var(--electric-purple)';
      default: return 'var(--secondary-text)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'FUNDING_LIVE';
      case 'completed': return 'FULLY_FUNDED';
      case 'upcoming': return 'LAUNCHING_SOON';
      default: return 'UNKNOWN';
    }
  };

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
            GREEN_ENERGY <span style={{color: 'var(--neon-green)'}}>PROJECTS</span>
          </motion.h1>

          <motion.p 
            className="text-xl max-w-3xl mx-auto leading-relaxed font-light mb-8" 
            style={{color: 'var(--secondary-text)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Discover and invest in Pakistan's most promising renewable energy projects.
            <br />
            <span style={{color: 'var(--neon-green)'}} className="font-medium">Blockchain-Secured • Transparent • High Returns</span>
          </motion.p>

          {/* Wallet Connection for Public */}
          {!user && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="glass-card max-w-md mx-auto p-6">
                <div className="flex items-center justify-center mb-4">
                  <Wallet className="w-8 h-8 mr-3" style={{color: 'var(--neon-green)'}} />
                  <h3 className="text-lg font-bold font-mono">CONNECT_WALLET</h3>
                </div>
                <p className="text-sm mb-4" style={{color: 'var(--secondary-text)'}}>
                  Connect your Solana wallet to start investing in clean energy projects
                </p>
                <WalletMultiButton />
              </div>
            </motion.div>
          )}
          
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

        {/* Filters */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="glass-card p-4">
              <h3 className="text-sm font-mono font-bold mb-3" style={{color: 'var(--primary-text)'}}>PROJECT_STATUS</h3>
              <div className="flex gap-2">
                {['all', 'active', 'completed', 'upcoming'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      filter === status 
                        ? 'text-black font-bold' 
                        : 'glass-btn'
                    }`}
                    style={{
                      background: filter === status ? 'var(--neon-green)' : undefined
                    }}
                  >
                    {status.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h3 className="text-sm font-mono font-bold mb-3" style={{color: 'var(--primary-text)'}}>ENERGY_TYPE</h3>
              <div className="flex gap-2">
                {['all', 'solar', 'wind', 'hydro', 'biomass'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      typeFilter === type 
                        ? 'text-black font-bold' 
                        : 'glass-btn'
                    }`}
                    style={{
                      background: typeFilter === type ? 'var(--neon-green)' : undefined
                    }}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delay: 1.2 }}
        >
          {filteredProjects.map((project, index) => {
            const Icon = projectTypeIcons[project.type];
            const progressPercentage = Math.round((project.raisedAmount / project.targetAmount) * 100);
            
            return (
              <motion.div 
                key={project.id} 
                className="glass-card group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-2 py-1 rounded-full text-xs font-bold font-mono" style={{background: 'var(--neon-green)', color: 'var(--primary-bg)'}}>
                      FEATURED
                    </div>
                  </div>
                )}

                {/* Project Image Placeholder */}
                <div 
                  className="h-48 relative overflow-hidden" 
                  style={{background: 'linear-gradient(135deg, var(--accent-bg) 0%, var(--secondary-bg) 100%)'}}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 opacity-20" style={{color: 'var(--neon-green)'}} />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="status-badge" style={{background: getStatusColor(project.status)}}>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{background: 'white'}}></div>
                      {getStatusText(project.status)}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-mono mb-2 group-hover:scale-105 transition-all" style={{color: 'var(--primary-text)'}}>
                        {project.name}
                      </h3>
                      <div className="flex items-center text-sm mb-2" style={{color: 'var(--secondary-text)'}}>
                        <MapPin className="w-4 h-4 mr-1" style={{color: 'var(--cyber-blue)'}} />
                        {project.location}
                      </div>
                    </div>
                    <div className="w-12 h-12 glass-card flex items-center justify-center glow-green">
                      <Icon className="w-6 h-6" style={{color: 'var(--neon-green)'}} />
                    </div>
                  </div>
                  
                  <p className="mb-6 line-clamp-3 leading-relaxed text-sm" style={{color: 'var(--secondary-text)'}}>
                    {project.description}
                  </p>

                  {/* Progress Section */}
                  {project.status !== 'upcoming' && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-mono font-medium" style={{color: 'var(--dim-text)'}}>FUNDING_PROGRESS</span>
                        <span className="text-sm font-bold font-mono" style={{color: 'var(--neon-green)'}}>{progressPercentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{background: 'var(--accent-bg)'}}>
                        <div 
                          className="h-2 rounded-full transition-all duration-700 ease-out relative shimmer-effect" 
                          style={{ 
                            width: `${progressPercentage}%`,
                            background: 'linear-gradient(90deg, var(--neon-green), var(--eco-green))'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 rounded-xl" style={{background: 'var(--accent-bg)', border: '1px solid var(--border-subtle)'}}>
                      <div className="text-lg font-bold font-mono" style={{color: 'var(--primary-text)'}}>
                        ${project.targetAmount.toLocaleString()}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wide font-medium" style={{color: 'var(--dim-text)'}}>TARGET</div>
                    </div>
                    <div className="text-center p-3 glass-card glow-green">
                      <div className="text-lg font-bold font-mono" style={{color: 'var(--neon-green)'}}>
                        {project.expectedROI}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wide font-medium" style={{color: 'var(--dim-text)'}}>EXPECTED_ROI</div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm mb-6" style={{color: 'var(--dim-text)'}}>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" style={{color: 'var(--neon-green)'}} />
                      <span style={{color: 'var(--secondary-text)'}}>{project.investors} investors</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" style={{color: 'var(--cyber-blue)'}} />
                      <span style={{color: 'var(--secondary-text)'}}>{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {user ? (
                      <Link
                        to={`/projects/${project.id}`}
                        className="neon-btn flex-1 text-center group font-mono text-sm relative overflow-hidden"
                      >
                        <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        {project.status === 'upcoming' ? 'NOTIFY_ME' : 'INVEST_NOW'}
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="neon-btn flex-1 text-center group font-mono text-sm relative overflow-hidden"
                      >
                        <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        LOGIN_TO_INVEST
                      </Link>
                    )}
                    <button className="glass-btn flex items-center justify-center w-12 h-12 font-mono text-sm">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
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
                <h3 className="text-xl font-bold font-mono mb-4" style={{color: 'var(--primary-text)'}}>NO_PROJECTS_MATCH_FILTER</h3>
                <p className="mb-6" style={{color: 'var(--secondary-text)'}}>
                  Try adjusting your filters to see more projects.
                </p>
                <button 
                  onClick={() => {
                    setFilter('all');
                    setTypeFilter('all');
                  }}
                  className="neon-btn font-mono"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  RESET_FILTERS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
