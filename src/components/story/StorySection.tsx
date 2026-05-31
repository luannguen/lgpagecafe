'use client';

import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { FadeIn } from '../animations/FadeIn';
import { ParallaxLayer } from '../animations/ParallaxLayer';
import { ScrollSection } from '../animations/ScrollSection';

export function StorySection() {
  return (
    <ScrollSection id="story" scrollRange={[0.15, 0.35]} className="bg-transparent pointer-events-auto">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <SectionTitle 
          title="Rooted in Tradition" 
          subtitle="Our Story" 
          align="center" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
          <FadeIn direction="right" delay={0.2} className="relative">
            <ParallaxLayer offset={30}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/5 backdrop-blur-sm bg-black/20">
                {/* Abstract placeholder for story image - can be replaced with an actual image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#1a1a1a] to-[#2a2a2a] opacity-80" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            </ParallaxLayer>
          </FadeIn>
          
          <div className="space-y-8">
            <FadeIn delay={0.4}>
              <h3 className="text-2xl md:text-3xl font-serif text-brand-gold drop-shadow-lg">A legacy born in the quiet streets of Kyoto.</h3>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <p className="text-white/80 leading-relaxed font-light text-lg drop-shadow-md">
                Kūro was founded on a simple philosophy: coffee is not merely a beverage, but a momentary sanctuary. We draw inspiration from the meticulous care found in traditional Japanese tea ceremonies, translating that reverence into modern coffee culture.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <p className="text-white/80 leading-relaxed font-light text-lg drop-shadow-md">
                Every bean is carefully selected, perfectly roasted, and intentionally brewed to evoke a sense of calm and sophistication. Welcome to your escape.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
