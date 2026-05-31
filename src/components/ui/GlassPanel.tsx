import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = 'medium', children, ...props }, ref) => {
    const intensities = {
      light: 'bg-black/20 backdrop-blur-md border-white/5',
      medium: 'bg-black/40 backdrop-blur-xl border-white/10',
      heavy: 'bg-black/60 backdrop-blur-2xl border-white/20',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'border rounded-2xl shadow-2xl overflow-hidden',
          intensities[intensity],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
