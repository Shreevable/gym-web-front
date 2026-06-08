import { motion, useReducedMotion } from 'framer-motion'
import { transition, VIEWPORT_DEFAULT } from '../../constants/motion'

export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
  blur = true,
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(5px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT_DEFAULT}
      transition={{ ...transition.base, delay }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}
