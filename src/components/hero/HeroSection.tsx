'use client';

import React from 'react';
import { HeroContent } from './HeroContent';
import { ScrollSection } from '../animations/ScrollSection';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <ScrollSection id="hero" scrollRange={[0, 0.15]} className="bg-transparent flex-col justify-center">
      <HeroContent />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-brand-gold w-full"
          />
        </div>
      </motion.div>
    </ScrollSection>
  );
}
