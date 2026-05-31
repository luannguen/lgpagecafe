'use client';

import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { FadeIn } from '../animations/FadeIn';
import { ScrollSection } from '../animations/ScrollSection';

export function SpaceSection() {
  return (
    <ScrollSection id="space" className="bg-transparent pointer-events-auto justify-end pb-32">
      <div className="container mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          title="Sanctuary of Shadows" 
          subtitle="The Environment" 
          align="right" 
        />
        
        <div className="mt-16 max-w-3xl ml-auto">
          <FadeIn direction="up">
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative border border-white/10 group bg-black/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600')] bg-cover bg-center transition-transform duration-[10s] group-hover:scale-105 opacity-50 mix-blend-overlay" />
              
              <div className="absolute bottom-10 left-10 z-20 max-w-lg">
                <h3 className="text-3xl font-serif text-brand-gold mb-4 drop-shadow-md">Architectural Silence</h3>
                <p className="text-white/80 font-light drop-shadow-md">
                  Designed around the concept of 'Yūgen' — a profound, mysterious sense of the beauty of the universe. Dark woods, soft ambient lighting, and minimalist concrete form a space where you can truly disconnect.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </ScrollSection>
  );
}
