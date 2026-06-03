import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpItem, staggerContainer, VIEWPORT_DEFAULT } from '../../constants/motion'

/**
 * Staggered fade-up for section copy (eyebrow → title → body).
 * @param {'mount' | 'inView'} trigger — hero uses mount; sections use inView
 */
export function StaggerReveal({
  children,
  className = '',
  trigger = 'inView',
  delay = 0,
}) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const motionProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT_DEFAULT }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerContainer.visible.transition.staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={fadeUpItem}>
      {children}
    </motion.div>
  )
}
