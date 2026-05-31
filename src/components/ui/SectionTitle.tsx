import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  className 
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('max-w-3xl mb-16', alignments[align], className)}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-brand-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
};
