import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import Header from './components/Header';
import AdminDashboard from './components/AdminDashboard';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Benefits from './components/Benefits';
import PublicProjects from './components/PublicProjects';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SimpleWalletProvider } from './context/SimpleWalletContext';
import './index.css';

function AppRoutes() {
  const { user, loading } = useAuth();
  
  console.log('AppRoutes rendering - user:', user, 'loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen greenova8-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-mono">Loading GreenOVA8...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen greenova8-bg">
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Hero />} 
        />
        <Route 
          path="/home" 
          element={<Hero />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/projects" 
          element={user ? <Projects /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/projects/:id" 
          element={user ? <ProjectDetail /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={user ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/about" 
          element={<About />} 
        />
        <Route 
          path="/how-it-works" 
          element={<HowItWorks />} 
        />
        <Route 
          path="/features" 
          element={<PublicProjects />} 
        />
        <Route 
          path="/benefits" 
          element={<Benefits />} 
        />
        <Route 
          path="/testimonials" 
          element={<Testimonials />} 
        />
        <Route 
          path="/faq" 
          element={<FAQ />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  console.log('🏁 App component rendering');
  
  try {
    return (
      <Router>
        <AuthProvider>
          <SimpleWalletProvider>
            <AppRoutes />
          </SimpleWalletProvider>
        </AuthProvider>
      </Router>
    );
  } catch (error) {
    console.error('❌ Error in App component:', error);
    return (
      <div style={{ padding: '20px', color: 'red', backgroundColor: 'white' }}>
        <h1>❌ App Error</h1>
        <p>Check console for details</p>
      </div>
    );
  }
}

export default App;
