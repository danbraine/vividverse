import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

interface AuthContextType {
  isAuthenticated: boolean;
  principal: Principal | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authClient = await AuthClient.create();
      const isAuth = await authClient.isAuthenticated();
      
      if (isAuth) {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal());
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const authClient = await AuthClient.create();
      
      const isProduction = import.meta.env.MODE === 'production' || import.meta.env.VITE_DFX_NETWORK === 'ic';
      
      // For local development, use production Internet Identity (simpler for PoC)
      // For production, you can use:
      // - Internet Identity: https://identity.ic0.app
      // - NFID (with Google/Apple): https://nfid.one
      const identityProvider = isProduction
        ? 'https://identity.ic0.app' // or 'https://nfid.one' for Google/Apple login
        : 'https://identity.ic0.app'; // Use production II for local dev (works fine for PoC)
      
      await authClient.login({
        identityProvider,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          setPrincipal(identity.getPrincipal());
          setIsAuthenticated(true);
        },
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      setPrincipal(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, principal, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



