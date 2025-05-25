
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('binoryx_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login logic
    if (email === 'admin@binoryx.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        email: 'admin@binoryx.com',
        name: 'Admin User',
        balance: 10000,
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem('binoryx_user', JSON.stringify(adminUser));
      return true;
    } else if (password === 'demo123') {
      const demoUser = {
        id: '2',
        email,
        name: email.split('@')[0],
        balance: 1000
      };
      setUser(demoUser);
      localStorage.setItem('binoryx_user', JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Demo signup logic
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      balance: 1000 // Welcome bonus
    };
    setUser(newUser);
    localStorage.setItem('binoryx_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('binoryx_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
