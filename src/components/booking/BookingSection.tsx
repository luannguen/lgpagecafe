'use client';

import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollSection } from '../animations/ScrollSection';
import { Card } from '../ui/Card';
import { FadeIn } from '../animations/FadeIn';
import { BookingForm } from './BookingForm';

export function BookingSection() {
  return (
    <ScrollSection id="reservation" className="bg-transparent">
      {/* Background glow specific to this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-2xl mx-auto">
          <SectionTitle 
            title="Reserve Your Experience" 
            subtitle="Booking" 
            align="center" 
          />
          
          <FadeIn delay={0.2} className="mt-12">
            <Card variant="glass" className="p-8 md:p-12">
              <BookingForm />
            </Card>
          </FadeIn>
        </div>
      </div>
    </ScrollSection>
  );
}
