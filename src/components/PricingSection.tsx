
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

export function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50" id="pricing">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that's right for your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-muted-foreground mb-6">For small family gatherings</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-muted-foreground ml-2">/event</span>
              </div>
              <ul className="space-y-3 mb-6">
                <PricingItem>Up to 50 guests</PricingItem>
                <PricingItem>Basic event page</PricingItem>
                <PricingItem>RSVP management</PricingItem>
                <PricingItem>Event schedule</PricingItem>
                <PricingItem>1 photo gallery</PricingItem>
              </ul>
              <Button className="w-full bg-shaadi-red hover:bg-shaadi-maroon">Get Started</Button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border-2 border-shaadi-gold relative">
            <div className="absolute top-0 right-0 bg-shaadi-gold text-xs font-bold px-3 py-1 uppercase tracking-wide text-card-foreground rounded-bl-lg">
              POPULAR
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-muted-foreground mb-6">For complete wedding celebrations</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">₹499</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <PricingItem>Unlimited guests</PricingItem>
                <PricingItem>All Free features</PricingItem>
                <PricingItem>Topic-based channels</PricingItem>
                <PricingItem>Multiple event management</PricingItem>
                <PricingItem>Seating arrangements</PricingItem>
                <PricingItem>Custom app theme</PricingItem>
                <PricingItem>Vendor coordination</PricingItem>
                <PricingItem>No ads</PricingItem>
              </ul>
              <Button className="w-full gradient-bg bg-gradient-to-r from-shaadi-red to-shaadi-maroon hover:from-shaadi-maroon hover:to-shaadi-red">
                Choose Premium
              </Button>
            </div>
            <div className="bg-muted py-2 px-6 text-center">
              <p className="text-xs text-muted-foreground">Cancel anytime</p>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For wedding planners & businesses</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-6">
                <PricingItem>All Premium features</PricingItem>
                <PricingItem>White-label solution</PricingItem>
                <PricingItem>API access</PricingItem>
                <PricingItem>Dedicated account manager</PricingItem>
                <PricingItem>Priority support</PricingItem>
                <PricingItem>Custom integrations</PricingItem>
              </ul>
              <Button variant="outline" className="w-full border-shaadi-gold/50 hover:bg-shaadi-gold/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <Check className="h-5 w-5 text-shaadi-green mr-2 flex-shrink-0" />
      <span className="text-sm">{children}</span>
    </li>
  );
}
