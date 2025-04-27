type TransitionDuration = 'fast' | 'normal' | 'slow'

const durations = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
}

export const transitions = {
  fade: (duration: TransitionDuration = 'normal') => ({
    enter: `transition-opacity duration-${durations[duration]} ease-out`,
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: `transition-opacity duration-${durations[duration]} ease-in`,
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  }),

  slide: (duration: TransitionDuration = 'normal') => ({
    enter: `transform transition-all duration-${durations[duration]} ease-out`,
    enterFrom: 'opacity-0 translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leave: `transform transition-all duration-${durations[duration]} ease-in`,
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-4',
  }),

  scale: (duration: TransitionDuration = 'normal') => ({
    enter: `transform transition-all duration-${durations[duration]} ease-out`,
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: `transform transition-all duration-${durations[duration]} ease-in`,
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  }),
}

import { Variants } from 'framer-motion'

export const pageTransitions: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const slideTransitions: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

export const fadeTransitions: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const cardTransitions: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

export const listItemTransitions: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

// Motion settings for consistent feel
export const motionConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30
}

// Helper function to stagger children animations
export const staggerChildren = (staggerTime = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerTime
    }
  }
})