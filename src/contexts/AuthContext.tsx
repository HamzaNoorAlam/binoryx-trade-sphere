
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  realBalance: number;
  demoBalance: number;
  accountType: 'real' | 'demo';
  isAdmin?: boolean;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  profileImage?: string;
  phone?: string;
  country?: string;
}

interface Trade {
  id: string;
  asset: string;
  amount: number;
  direction: 'UP' | 'DOWN';
  startTime: number;
  duration: number;
  entryPrice: number;
  currentPrice?: number;
  result?: 'win' | 'loss' | 'pending';
  profit?: number;
  cancelled?: boolean;
  refundAmount?: number;
}

interface AuthContextType {
  user: User | null;
  activeTrades: Trade[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  switchAccount: (type: 'real' | 'demo') => void;
  addDemoFunds: () => void;
  placeTrade: (trade: Omit<Trade, 'id' | 'startTime'>) => void;
  cancelTrade: (tradeId: string) => number; // returns refund percentage
  updateBalance: (amount: number, type: 'real' | 'demo') => void;
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
  const [activeTrades, setActiveTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('binoryx_user');
    const savedTrades = localStorage.getItem('binoryx_trades');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedTrades) {
      setActiveTrades(JSON.parse(savedTrades));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('binoryx_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('binoryx_trades', JSON.stringify(activeTrades));
  }, [activeTrades]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@binoryx.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        email: 'admin@binoryx.com',
        name: 'Admin User',
        realBalance: 10000,
        demoBalance: 10000,
        accountType: 'real',
        isAdmin: true,
        kycStatus: 'approved'
      };
      setUser(adminUser);
      return true;
    } else if (password === 'demo123') {
      const demoUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        realBalance: 1000,
        demoBalance: 10000,
        accountType: 'demo',
        kycStatus: 'pending'
      };
      setUser(demoUser);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      realBalance: 1000,
      demoBalance: 10000,
      accountType: 'demo',
      kycStatus: 'pending'
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setActiveTrades([]);
    localStorage.removeItem('binoryx_user');
    localStorage.removeItem('binoryx_trades');
  };

  const switchAccount = (type: 'real' | 'demo') => {
    if (user) {
      setUser({ ...user, accountType: type });
    }
  };

  const addDemoFunds = () => {
    if (user) {
      setUser({ ...user, demoBalance: user.demoBalance + 10000 });
    }
  };

  const placeTrade = (trade: Omit<Trade, 'id' | 'startTime'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
      startTime: Date.now(),
      result: 'pending'
    };
    setActiveTrades(prev => [...prev, newTrade]);
    
    // Deduct amount from balance
    if (user) {
      const balanceType = user.accountType === 'real' ? 'realBalance' : 'demoBalance';
      setUser({
        ...user,
        [balanceType]: user[balanceType] - trade.amount
      });
    }
  };

  const cancelTrade = (tradeId: string): number => {
    const trade = activeTrades.find(t => t.id === tradeId);
    if (!trade || trade.result !== 'pending') return 0;

    const timeElapsed = Date.now() - trade.startTime;
    const timeRemaining = trade.duration * 1000 - timeElapsed;
    
    let refundPercentage = 0;
    if (timeRemaining > 5000) refundPercentage = 50;
    else if (timeRemaining > 2000) refundPercentage = 20;
    else if (timeRemaining > 0) refundPercentage = 2;

    const refundAmount = (trade.amount * refundPercentage) / 100;

    setActiveTrades(prev => 
      prev.map(t => 
        t.id === tradeId 
          ? { ...t, cancelled: true, refundAmount, result: 'loss' as const }
          : t
      )
    );

    // Refund to balance
    if (user && refundAmount > 0) {
      const balanceType = user.accountType === 'real' ? 'realBalance' : 'demoBalance';
      setUser({
        ...user,
        [balanceType]: user[balanceType] + refundAmount
      });
    }

    return refundPercentage;
  };

  const updateBalance = (amount: number, type: 'real' | 'demo') => {
    if (user) {
      const balanceKey = type === 'real' ? 'realBalance' : 'demoBalance';
      setUser({
        ...user,
        [balanceKey]: user[balanceKey] + amount
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      activeTrades,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      switchAccount,
      addDemoFunds,
      placeTrade,
      cancelTrade,
      updateBalance
    }}>
      {children}
    </AuthContext.Provider>
  );
};
