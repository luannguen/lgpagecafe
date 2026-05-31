'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';

export function HeroContent() {
  return (
    <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-32">
      <FadeIn delay={0.5}>
        <p className="text-brand-gold uppercase text-sm md:text-base font-semibold mb-6 tracking-widest">
          A Tokyo Experience
        </p>
      </FadeIn>
      
      <div className="overflow-hidden mb-8 max-w-5xl">
        <RevealText 
          text="The Art of Japanese Minimalism" 
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight justify-center" 
        />
      </div>
      
      <FadeIn delay={1.2}>
        <p className="text-white/60 max-w-xl text-lg md:text-xl mb-12 font-light mx-auto">
          Where centuries of craftsmanship meet modern precision. 
          Discover a sanctuary of taste.
        </p>
      </FadeIn>
      
      <FadeIn delay={1.5} className="flex flex-col sm:flex-row gap-6 pointer-events-auto justify-center w-full">
        <Button size="lg">Reserve a Table</Button>
        <Button size="lg" variant="ghost">Explore Menu</Button>
      </FadeIn>
    </div>
  );
}
