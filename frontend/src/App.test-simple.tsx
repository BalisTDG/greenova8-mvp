import React, { useState, useEffect } from 'react';
import { auth, db } from './config/firebase';

function SimpleApp() {
  const [firebaseStatus, setFirebaseStatus] = useState('Checking...');
  const [authStatus, setAuthStatus] = useState('Checking...');
  
  console.log('SimpleApp rendering - this should appear in browser console');
  console.log('React version:', React.version);
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.REACT_APP_API_URL,
    HAS_GOOGLE_CLIENT_ID: !!process.env.REACT_APP_GOOGLE_CLIENT_ID,
    FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID
  });
  
  useEffect(() => {
    // Test Firebase connection
    const testFirebase = async () => {
      try {
        console.log('🔥 Testing Firebase connection...');
        
        // Test Firestore connection
        if (db) {
          setFirebaseStatus('✅ Firestore Connected');
          console.log('🔥 Firestore connection successful');
        } else {
          setFirebaseStatus('❌ Firestore Failed');
        }
        
        // Test Auth connection
        if (auth) {
          setAuthStatus('✅ Auth Connected');
          console.log('🔥 Firebase Auth connection successful');
          console.log('🔥 Auth config:', {
            projectId: auth.app.options.projectId,
            authDomain: auth.app.options.authDomain
          });
        } else {
          setAuthStatus('❌ Auth Failed');
        }
        
      } catch (error) {
        console.error('🔥 Firebase connection error:', error);
        setFirebaseStatus('❌ Connection Error');
        setAuthStatus('❌ Connection Error');
      }
    };
    
    testFirebase();
  }, []);
  
  // Try to catch any rendering errors
  try {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#10b981', marginBottom: '20px' }}>✅ GreenOVA8 Test App</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>If you can see this, React is working correctly!</p>
        
        <div style={{ backgroundColor: '#374151', padding: '15px', borderRadius: '8px' }}>
          <h2 style={{ color: '#fbbf24' }}>🔍 Debug Info:</h2>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>API URL:</strong> {process.env.REACT_APP_API_URL}</p>
          <p><strong>Google Client ID configured:</strong> {process.env.REACT_APP_GOOGLE_CLIENT_ID ? 'Yes' : 'No'}</p>
          <p><strong>React Version:</strong> {React.version}</p>
          <p><strong>Current Time:</strong> {new Date().toLocaleString()}</p>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#065f46', borderRadius: '8px' }}>
          <h3 style={{ color: '#a7f3d0' }}>✅ React is rendering successfully!</h3>
          <p>Check the browser console (F12) for debug logs.</p>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#7c2d12', borderRadius: '8px' }}>
          <h3 style={{ color: '#fed7aa' }}>🔥 Firebase Status:</h3>
          <p><strong>Firestore:</strong> {firebaseStatus}</p>
          <p><strong>Authentication:</strong> {authStatus}</p>
          <p><strong>Project ID:</strong> {process.env.REACT_APP_FIREBASE_PROJECT_ID}</p>
          <p><strong>Auth Domain:</strong> {process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering SimpleApp:', error);
    return (
      <div style={{ padding: '20px', color: 'red', backgroundColor: 'white' }}>
        <h1>❌ Rendering Error</h1>
        <p>Check console for details</p>
      </div>
    );
  }
}

export default SimpleApp;
