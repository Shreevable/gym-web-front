import { motion, useReducedMotion } from 'framer-motion'
import { transition, VIEWPORT_DEFAULT } from '../../constants/motion'

/** Step box scroll reveal — same feel as hero pipeline boxes. */
export default function FlowStepBox({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_DEFAULT}
      transition={{ ...transition.base, delay }}
    >
      {children}
    </motion.div>
  )
}
