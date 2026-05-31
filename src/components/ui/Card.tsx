import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', children, ...props }, ref) => {
    const variants = {
      glass: 'bg-black/40 backdrop-blur-md border border-white/10',
      solid: 'bg-brand-gray border border-transparent',
      outline: 'bg-transparent border border-white/20',
    };

    return (
      <motion.div
        ref={ref}
        className={cn('rounded-2xl p-6 overflow-hidden', variants[variant], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
