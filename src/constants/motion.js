/** Shared motion tokens — smooth, restrained, respects reduced motion */

export const EASE_SMOOTH = [0.22, 1, 0.36, 1]

export const VIEWPORT_DEFAULT = { once: true, amount: 0.22 }

export const transition = {
  fast: { duration: 0.32, ease: EASE_SMOOTH },
  base: { duration: 0.5, ease: EASE_SMOOTH },
  slow: { duration: 0.62, ease: EASE_SMOOTH },
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: transition.base,
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transition.base },
}
