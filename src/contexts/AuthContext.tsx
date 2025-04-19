import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';

// Function to generate mock user data
const generateMockUser = (email: string): User => {
  const roles = ['Product Manager', 'Developer', 'Designer', 'Marketing Manager', 'Sales Representative'];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000) + 100}/pexels-photo-${Math.floor(Math.random() * 1000) + 100}.jpeg?auto=compress&cs=tinysrgb&w=150`,
    role: randomRole,
    joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    lastActive: 'Just now'
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock user data
      const mockUser = generateMockUser(email);
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};