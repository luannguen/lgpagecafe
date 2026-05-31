'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, className, id }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Fade section in and out based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      id={id}
      ref={ref}
      style={{ opacity }}
      className={cn("min-h-[120vh] relative flex items-center pt-20", className)}
    >
      {children}
    </motion.section>
  );
};
