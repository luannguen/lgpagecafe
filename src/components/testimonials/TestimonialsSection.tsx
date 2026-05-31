'use client';

import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollSection } from '../animations/ScrollSection';
import { Card } from '../ui/Card';
import { FadeIn } from '../animations/FadeIn';

const TESTIMONIALS = [
  {
    quote: "A transformative coffee experience. The Kyoto Black is unlike anything I've ever tasted.",
    author: "James T.",
    role: "Coffee Connoisseur"
  },
  {
    quote: "The intersection of art and beverage. Kūro has perfected the aesthetic of silence.",
    author: "Elena R.",
    role: "Design Director"
  },
  {
    quote: "An absolute masterclass in minimalism. The interior alone is worth the visit.",
    author: "Kenji M.",
    role: "Architect"
  }
];

export function TestimonialsSection() {
  return (
    <ScrollSection id="testimonials" className="bg-transparent pointer-events-auto">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle 
          title="Voices of the Craft" 
          subtitle="Testimonials" 
          align="center" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {TESTIMONIALS.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <Card variant="glass" className="h-full flex flex-col justify-between">
                <p className="text-white/80 font-light italic text-lg leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
                <div>
                  <h5 className="text-brand-gold font-serif text-lg">{testimonial.author}</h5>
                  <span className="text-white/40 text-sm tracking-widest uppercase">{testimonial.role}</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
