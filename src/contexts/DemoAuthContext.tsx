
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: 'host' | 'guest';
  roomAllocation?: {
    roomNumber: string;
    wifiUsername: string;
    wifiPassword: string;
  };
  rsvpStatus: 'attending' | 'not-attending' | 'pending';
}

interface AuthContextType {
  user: DemoUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserRsvp: (status: 'attending' | 'not-attending' | 'pending') => void;
}

const DemoAuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_HOST = {
  id: "demo-123",
  email: "demo@shaadihub.com",
  name: "Demo Host",
  role: "host" as const,
  rsvpStatus: "attending" as const
};

const DEMO_GUEST = {
  id: "guest-123",
  email: "guest@shaadihub.com",
  name: "Demo Guest",
  role: "guest" as const,
  roomAllocation: {
    roomNumber: "304",
    wifiUsername: "SharmaWedding",
    wifiPassword: "Celebrate2025!"
  },
  rsvpStatus: "pending" as const
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

  const updateUserRsvp = (status: 'attending' | 'not-attending' | 'pending') => {
    if (user) {
      const updatedUser = { ...user, rsvpStatus: status };
      setUser(updatedUser);
      localStorage.setItem('demoUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <DemoAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateUserRsvp }}>
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
