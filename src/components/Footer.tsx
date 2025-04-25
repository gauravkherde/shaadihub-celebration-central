
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gradient bg-gradient-to-r from-shaadi-red via-shaadi-maroon to-shaadi-orange inline-block text-transparent bg-clip-text">
              ShaadiHub
            </h3>
            <p className="text-sm text-muted-foreground">
              The all-in-one Indian wedding event management platform.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#event-creation" className="text-muted-foreground hover:text-foreground">Event Creation</Link></li>
              <li><Link to="/#guest-management" className="text-muted-foreground hover:text-foreground">Guest Management</Link></li>
              <li><Link to="/#channels" className="text-muted-foreground hover:text-foreground">Topic Channels</Link></li>
              <li><Link to="/#schedule" className="text-muted-foreground hover:text-foreground">Event Schedule</Link></li>
              <li><Link to="/#photos" className="text-muted-foreground hover:text-foreground">Photo Gallery</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://twitter.com/shaadihub" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
              <li><a href="https://instagram.com/shaadihub" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
              <li><a href="https://facebook.com/shaadihub" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
              <li><a href="mailto:hello@shaadihub.com" className="text-muted-foreground hover:text-foreground">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShaadiHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
