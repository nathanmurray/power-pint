import type { Transition } from 'framer-motion';

// Spring animation for smooth, natural movements
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
};

// Softer spring for glass scaling
export const glassSpring: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
  mass: 1.5,
};

// Quick transition for UI elements
export const quickTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

// Wave animation for liquid surface
export const waveVariants = {
  animate: {
    d: [
      'M 0 10 Q 25 5, 50 10 T 100 10 L 100 100 L 0 100 Z',
      'M 0 10 Q 25 15, 50 10 T 100 10 L 100 100 L 0 100 Z',
      'M 0 10 Q 25 5, 50 10 T 100 10 L 100 100 L 0 100 Z',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Bubble animation
export const bubbleVariants = {
  initial: { y: 0, opacity: 0.6, scale: 1 },
  animate: {
    y: -100,
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

// Foam pulse animation
export const foamPulseVariants = {
  animate: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
