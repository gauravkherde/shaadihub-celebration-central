
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: DemoUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const DemoAuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER = {
  id: "demo-123",
  email: "demo@shaadihub.com",
  name: "Demo User"
};

export const DemoAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === "demo@shaadihub.com" && password === "demo123") {
      setUser(DEMO_USER);
      localStorage.setItem('demoUser', JSON.stringify(DEMO_USER));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  return (
    <DemoAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </DemoAuthContext.Provider>
  );
};

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};
