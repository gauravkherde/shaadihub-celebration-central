
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export function Navbar() {
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
          <Link to="/events" className="text-sm font-medium transition-colors hover:text-shaadi-red">My Events</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">Login</Button>
          <Button className="bg-shaadi-red hover:bg-shaadi-maroon">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
