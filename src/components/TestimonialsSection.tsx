
import React from 'react';

const testimonials = [
  {
    quote: "ShaadiHub transformed our wedding planning experience. No more scattered WhatsApp groups and missed information!",
    author: "Priya & Rahul",
    role: "Newlyweds, Delhi"
  },
  {
    quote: "As a wedding planner, this app has become essential for my business. My clients love how organized everything is.",
    author: "Anjali Sharma",
    role: "Professional Wedding Planner, Mumbai"
  },
  {
    quote: "The topic channels kept everyone informed, and the photo gallery was perfect for collecting memories from all our guests.",
    author: "Vikram & Meera",
    role: "Newlyweds, Bangalore"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved By Couples & Planners</h2>
          <p className="text-lg text-muted-foreground">
            See what our users have to say about their ShaadiHub experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-muted/30 p-6 rounded-lg border border-shaadi-gold/20 relative"
            >
              <div className="absolute top-4 left-4 text-5xl text-shaadi-gold/20 font-serif">
                "
              </div>
              <div className="relative z-10">
                <p className="mb-6 text-muted-foreground">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
