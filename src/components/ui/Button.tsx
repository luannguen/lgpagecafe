import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-gold text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]',
      secondary: 'bg-brand-gray text-white hover:bg-brand-gold hover:text-black',
      outline: 'border border-brand-gold/50 text-brand-gold hover:bg-brand-gold hover:text-black',
      ghost: 'text-white hover:text-brand-gold hover:bg-white/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-3 text-base tracking-wide',
      lg: 'px-12 py-4 text-lg tracking-wider',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative overflow-hidden uppercase font-semibold transition-colors duration-300',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
