
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useDemoAuth } from '@/contexts/DemoAuthContext';

export function Navbar() {
  const { user, logout, isAuthenticated } = useDemoAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-shaadi-orange inline-block text-transparent bg-clip-text">
              ShaadiHub
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm font-medium transition-colors hover:text-primary">Features</Link>
          <Link to="/#pricing" className="text-sm font-medium transition-colors hover:text-primary">Pricing</Link>
          {isAuthenticated && (
            <Link to="/events/dashboard" className="text-sm font-medium transition-colors hover:text-primary">My Events</Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground mr-2">Welcome, {user?.name}</span>
              <Button variant="outline" className="border-secondary/50 hover:bg-secondary/10" onClick={() => logout()}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10" onClick={() => navigate('/login')}>Login</Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => navigate('/login')}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
