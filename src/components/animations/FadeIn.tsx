'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInVariants } from '@/lib/animations';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className 
}) => {
  const directionOffsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  const hiddenState = {
    opacity: 0,
    ...directionOffsets[direction],
  };

  return (
    <motion.div
      initial={hiddenState}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...fadeInVariants.visible.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
