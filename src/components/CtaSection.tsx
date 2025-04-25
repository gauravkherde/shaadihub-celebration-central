
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '@/contexts/DemoAuthContext';

export function CtaSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useDemoAuth();

  const handleCreateEvent = () => {
    if (isAuthenticated) {
      navigate('/events/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative py-16 md:py-24 pattern-bg">
      <div className="absolute inset-0 bg-gradient-to-r from-shaadi-maroon/10 via-shaadi-orange/10 to-shaadi-gold/10"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Make Your Wedding Planning Easier?</h2>
          <p className="text-lg text-muted-foreground">
            Create your event space now and start coordinating your perfect celebration with family and friends.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-shaadi-red hover:bg-shaadi-maroon" onClick={handleCreateEvent}>
              Create Your Event Now
            </Button>
            <Button size="lg" variant="outline" className="border-shaadi-gold/50 hover:bg-shaadi-gold/10" onClick={() => navigate('/login')}>
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
