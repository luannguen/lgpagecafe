// Global animation configurations and GSAP / Framer Motion variants

export const TRANSITION_SLOW = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const TRANSITION_NORMAL = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const TRANSITION_FAST = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

// Framer motion variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_NORMAL,
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};
