
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useDemoAuth } from '@/contexts/DemoAuthContext';

export function Navbar() {
  const { user, logout, isAuthenticated } = useDemoAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gradient bg-gradient-to-r from-shaadi-red via-shaadi-maroon to-shaadi-orange inline-block text-transparent bg-clip-text">
              ShaadiHub
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm font-medium transition-colors hover:text-shaadi-red">Features</Link>
          <Link to="/#pricing" className="text-sm font-medium transition-colors hover:text-shaadi-red">Pricing</Link>
          {isAuthenticated && (
            <Link to="/events/dashboard" className="text-sm font-medium transition-colors hover:text-shaadi-red">My Events</Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground mr-2">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={() => logout()}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
              <Button className="bg-shaadi-red hover:bg-shaadi-maroon" onClick={() => navigate('/login')}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
