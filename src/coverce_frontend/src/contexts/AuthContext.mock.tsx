import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock User type for UI development
interface MockUser {
  id: string;
  email: string;
  name: string;
  isValidator: boolean;
  role: string;
}

const createMockUser = (): MockUser => ({
  id: 'mock-user-12345',
  email: 'miner@vividverse.ai',
  name: 'Creative Miner',
  isValidator: false,
  role: 'user',
});

interface AuthContextType {
  isAuthenticated: boolean;
  user: MockUser | null;
  login: (email?: string, password?: string) => Promise<void>;
  register: (email?: string, password?: string, name?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-login for UI development - makes it easier to preview
    // Check if user was previously logged in (stored in localStorage)
    const savedAuth = localStorage.getItem('vividverse_mock_auth');
    if (savedAuth === 'true' || savedAuth === null) {
      // Auto-login if no saved preference or if previously logged in
      setIsAuthenticated(true);
      setUser(createMockUser());
      if (savedAuth === null) {
        localStorage.setItem('vividverse_mock_auth', 'true');
      }
    }
  }, []);

  const login = async (email?: string, password?: string) => {
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(true);
    setUser(createMockUser());
    localStorage.setItem('vividverse_mock_auth', 'true');
    console.log('✅ Mock login successful - UI mode active');
  };

  const register = async (email?: string, password?: string, name?: string) => {
    // Simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(true);
    setUser({
      id: 'mock-user-' + Date.now(),
      email: email || 'miner@vividverse.ai',
      name: name || 'New Miner',
      isValidator: false,
      role: 'user',
    });
    localStorage.setItem('vividverse_mock_auth', 'true');
    console.log('✅ Mock registration successful');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem('vividverse_mock_auth', 'false'); // Set to 'false' to prevent auto-login
    console.log('✅ Mock logout successful');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
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
