import type { Variants } from 'framer-motion';

// Cinema-grade cubic bezier curve for natural, weighted motion (easeOutCubic / filmic deceleration)
export const cinematicEase = [0.215, 0.61, 0.355, 1] as const;

// Viewport configuration ensuring animations trigger once when entering view
export const defaultViewport = {
  once: true,
  amount: 0.15,
};

// Section Header Slide-Up Variant
export const headerVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: cinematicEase,
    },
  },
};

// Card Slide-Up Variant with subtle elevation
export const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cinematicEase,
    },
  },
};

// Subtle slide-up and fade-in variant
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cinematicEase,
    },
  },
};

// Stagger container generator for child elements
export const createStaggerContainer = (staggerChildren = 0.09, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

