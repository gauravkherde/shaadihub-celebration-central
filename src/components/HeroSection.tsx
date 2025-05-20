
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/login');
  };

  const handleHowItWorks = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 pattern-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-shaadi-cream/80 to-shaadi-light/30 backdrop-blur-sm"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-shaadi-gold/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-shaadi-red/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-block rounded-full bg-shaadi-cream px-4 py-1.5 text-sm font-medium text-shaadi-maroon mb-4">
            Coordinate Your Indian Wedding Seamlessly
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-shaadi-maroon via-shaadi-red to-shaadi-orange inline-block text-transparent bg-clip-text">
            Your Indian Wedding, Beautifully Organized
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Replace chaotic WhatsApp groups with one powerful app to manage guests, 
            schedules, photos, and communications for your wedding celebrations.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-shaadi-red hover:bg-shaadi-maroon" onClick={handleCreateEvent}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-shaadi-gold/50 hover:bg-shaadi-gold/10" onClick={handleHowItWorks}>
              See How It Works
            </Button>
          </div>
          
          <div className="w-full max-w-2xl mx-auto mt-12 relative">
            <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-2xl border border-shaadi-gold/20">
              <div className="w-full h-full bg-shaadi-cream/50 flex items-center justify-center">
                <div className="text-2xl font-semibold text-shaadi-maroon">
                  App Interface Preview
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg bg-gradient-to-r from-shaadi-gold/30 to-shaadi-orange/30 blur-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
