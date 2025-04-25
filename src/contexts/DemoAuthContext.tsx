
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: 'host' | 'guest';
}

interface AuthContextType {
  user: DemoUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const DemoAuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_HOST = {
  id: "demo-123",
  email: "demo@shaadihub.com",
  name: "Demo Host",
  role: "host" as const
};

const DEMO_GUEST = {
  id: "guest-123",
  email: "guest@shaadihub.com",
  name: "Demo Guest",
  role: "guest" as const
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
      setUser(DEMO_HOST);
      localStorage.setItem('demoUser', JSON.stringify(DEMO_HOST));
    } else if (email === "guest@shaadihub.com" && password === "guest123") {
      setUser(DEMO_GUEST);
      localStorage.setItem('demoUser', JSON.stringify(DEMO_GUEST));
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
