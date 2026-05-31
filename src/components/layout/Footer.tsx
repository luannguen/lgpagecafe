import React from 'react';
import { NAV_LINKS, SITE_META } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif text-brand-gold mb-6 uppercase tracking-widest">Kūro</h3>
            <p className="text-white/50 max-w-sm">
              {SITE_META.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest mb-6 text-sm">Explore</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 hover:text-brand-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest mb-6 text-sm">Contact</h4>
            <ul className="space-y-4 text-white/50">
              <li>1-2-3 Omotesando</li>
              <li>Minato City, Tokyo</li>
              <li>info@kurocoffee.jp</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/30 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Kūro Coffee. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
