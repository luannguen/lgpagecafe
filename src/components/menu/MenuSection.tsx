'use client';

import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollSection } from '../animations/ScrollSection';
import { MENU_ITEMS } from '@/lib/constants';
import { MenuCard } from './MenuCard';

export function MenuSection() {
  return (
    <ScrollSection id="menu" scrollRange={[0.70, 0.85]} className="bg-transparent pointer-events-auto items-start pt-32">
      <div className="container mx-auto px-6 md:px-12 w-full">
        <SectionTitle 
          title="Signature Collection" 
          subtitle="The Menu" 
          align="left" 
        />
        
        <div className="max-w-3xl mt-20">
          <div className="flex flex-col gap-4">
            {MENU_ITEMS.map((item, index) => (
              <MenuCard key={item.id} {...item} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-left">
            <button className="text-brand-gold hover:text-white uppercase tracking-widest text-sm underline underline-offset-8 transition-colors">
              View Full Menu
            </button>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
