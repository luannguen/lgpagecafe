import React from 'react';
import { FadeIn } from '../animations/FadeIn';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: string;
  notes: string;
  index: number;
}

export const MenuCard: React.FC<MenuItemProps> = ({ name, description, price, notes, index }) => {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-white/10 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 hover:border-brand-gold/50 transition-colors duration-500 cursor-pointer">
        <div className="max-w-xl">
          <h4 className="text-2xl font-serif text-white group-hover:text-brand-gold transition-colors duration-300 mb-2">
            {name}
          </h4>
          <p className="text-white/70 font-light mb-4 md:mb-0">
            {description}
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end min-w-[120px]">
          <span className="text-xl text-brand-gold font-serif mb-1">{price}</span>
          <span className="text-xs text-white/50 uppercase tracking-widest">{notes}</span>
        </div>
      </div>
    </FadeIn>
  );
};
