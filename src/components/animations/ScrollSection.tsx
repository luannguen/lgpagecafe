'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  scrollRange: [number, number]; // e.g. [0.15, 0.35]
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, className, id, scrollRange }) => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Define fade transitions. Add a 0.05 buffer for fading.
  const [start, end] = scrollRange;
  
  const opacityInput = [
    Math.max(0, start - 0.05),
    start,
    end,
    Math.min(1, end + 0.05)
  ];
  
  const opacityOutput = [
    start === 0 ? 1 : 0, 
    1, 
    1, 
    end === 1 ? 1 : 0
  ];

  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);

  // We need to disable pointer events when opacity is 0 so users can click what's underneath
  // We can track the raw value to toggle pointer-events
  useEffect(() => {
    return opacity.on("change", (v) => {
      setIsVisible(v > 0.1);
    });
  }, [opacity]);

  return (
    <motion.section 
      id={id}
      style={{ opacity }}
      className={cn(
        "fixed inset-0 flex items-center justify-center w-full h-screen",
        isVisible ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
    >
      {children}
    </motion.section>
  );
};
