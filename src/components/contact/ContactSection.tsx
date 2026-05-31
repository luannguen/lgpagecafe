'use client';

import React from 'react';
import { FadeIn } from '../animations/FadeIn';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-black border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <FadeIn delay={0.1}>
            <h4 className="text-brand-gold font-serif text-xl mb-4">Location</h4>
            <p className="text-white/50 font-light">
              1-2-3 Omotesando<br />
              Minato City, Tokyo 107-0061<br />
              Japan
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h4 className="text-brand-gold font-serif text-xl mb-4">Hours</h4>
            <p className="text-white/50 font-light">
              Mon - Thu: 08:00 - 22:00<br />
              Fri - Sat: 08:00 - 23:00<br />
              Sun: 09:00 - 20:00
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <h4 className="text-brand-gold font-serif text-xl mb-4">Contact</h4>
            <p className="text-white/50 font-light">
              info@kurocoffee.jp<br />
              +81 3-1234-5678<br />
              @kurocoffee_jp
            </p>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
}
