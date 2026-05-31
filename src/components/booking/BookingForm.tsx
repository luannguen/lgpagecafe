'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pointer-events-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input label="Name" required />
        <Input label="Email Address" type="email" required />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input label="Date" type="date" className="text-white/80" required />
        <Input label="Time" type="time" className="text-white/80" required />
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Input label="Number of Guests" type="number" min="1" max="6" required />
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming...' : 'Request Reservation'}
        </Button>
      </div>
      
      <p className="text-center text-xs text-white/60 uppercase tracking-widest mt-4">
        Reservations require a 24-hour advance notice.
      </p>
    </form>
  );
}
