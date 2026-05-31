'use client';

import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { FadeIn } from '../animations/FadeIn';
import { ScrollSection } from '../animations/ScrollSection';

const CRAFT_STEPS = [
  { num: "01", title: "Selection", desc: "Sourcing only the top 1% of single-origin beans globally." },
  { num: "02", title: "Precision Roast", desc: "Roasted in small batches using specialized infrared technology." },
  { num: "03", title: "Water Alchemy", desc: "Filtered through Japanese bamboo charcoal for ultimate purity." },
  { num: "04", title: "The Pour", desc: "Crafted with measured intent, controlling flow and temperature." }
];

export function CraftSection() {
  return (
    <ScrollSection id="craft" scrollRange={[0.35, 0.55]} className="bg-transparent pointer-events-auto">
      <div className="container mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          title="The Pursuit of Perfection" 
          subtitle="Craftsmanship" 
          align="left" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {CRAFT_STEPS.map((step, index) => (
            <FadeIn key={step.num} delay={index * 0.2}>
              <div className="group relative border border-white/10 p-8 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors duration-500 overflow-hidden h-full">
                <div className="absolute -bottom-6 -right-2 text-8xl font-serif text-white/5 group-hover:text-brand-gold/10 transition-colors duration-500 select-none">
                  {step.num}
                </div>
                <h4 className="text-brand-gold font-serif text-xl mb-4">{step.title}</h4>
                <p className="text-white/70 font-light leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
