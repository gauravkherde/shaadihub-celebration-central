
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Bell, Calendar } from 'lucide-react';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleGetStarted = () => {
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-secondary inline-block text-transparent bg-clip-text">
              ShaadiHub
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">Features</a>
          {isAuthenticated && (
            <>
              <Link to="/events/dashboard" className="text-sm font-medium transition-colors hover:text-primary">My Events</Link>
              <Link to="/events/gallery" className="text-sm font-medium transition-colors hover:text-primary">Gallery</Link>
              <Link to="/events/chat" className="text-sm font-medium transition-colors hover:text-primary">Chat</Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline text-sm text-muted-foreground mr-2">Welcome, {user?.name}</span>
              {/* Notification bell for authenticated users */}
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5 text-primary" />
              </Button>
              <Button 
                variant="outline" 
                className="border-secondary/50 hover:bg-secondary/10 hidden md:flex" 
                onClick={handleLogout}
              >
                Logout
              </Button>
              
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-primary/50 hover:bg-primary/10 hidden md:inline-flex" 
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 hidden md:inline-flex" 
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-secondary/20 py-4">
          <div className="container space-y-3">
            <a 
              href="#features" 
              className="block py-2 px-4 hover:bg-secondary/10 rounded-md" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/events/dashboard" 
                  className="block py-2 px-4 hover:bg-secondary/10 rounded-md flex items-center gap-2" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="h-4 w-4" />
                  My Events
                </Link>
                <Link 
                  to="/events/gallery" 
                  className="block py-2 px-4 hover:bg-secondary/10 rounded-md" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  to="/events/chat" 
                  className="block py-2 px-4 hover:bg-secondary/10 rounded-md" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Chat
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-secondary/50 hover:bg-secondary/10" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="pt-2 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 hover:bg-primary/10" 
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
