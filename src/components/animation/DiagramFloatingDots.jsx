import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const DOT_LAYOUT = [
  { left: '6%', top: '8%', size: 2, drift: 10, duration: 9.2, delay: 0 },
  { left: '14%', top: '28%', size: 3, drift: 14, duration: 11.5, delay: 0.4 },
  { left: '4%', top: '52%', size: 2, drift: 8, duration: 8.6, delay: 1.1 },
  { left: '18%', top: '72%', size: 2, drift: 12, duration: 10.3, delay: 0.7 },
  { left: '10%', top: '90%', size: 3, drift: 9, duration: 12.1, delay: 1.8 },
  { left: '88%', top: '10%', size: 2, drift: 11, duration: 9.8, delay: 0.2 },
  { left: '92%', top: '32%', size: 3, drift: 13, duration: 10.7, delay: 1.3 },
  { left: '96%', top: '55%', size: 2, drift: 7, duration: 8.9, delay: 0.9 },
  { left: '84%', top: '74%', size: 2, drift: 10, duration: 11.2, delay: 1.6 },
  { left: '90%', top: '92%', size: 3, drift: 12, duration: 9.4, delay: 2.1 },
  { left: '38%', top: '6%', size: 2, drift: 6, duration: 10.5, delay: 0.5 },
  { left: '62%', top: '4%', size: 2, drift: 8, duration: 11.8, delay: 1.4 },
  { left: '44%', top: '94%', size: 2, drift: 7, duration: 9.6, delay: 0.8 },
  { left: '58%', top: '96%', size: 2, drift: 9, duration: 10.9, delay: 1.9 },
  { left: '48%', top: '22%', size: 1, drift: 5, duration: 7.8, delay: 1.2 },
  { left: '52%', top: '78%', size: 1, drift: 5, duration: 8.2, delay: 2.4 },
]

export default function DiagramFloatingDots({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const dots = useMemo(() => DOT_LAYOUT, [])

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
    >
      {dots.map((dot, index) => (
        <motion.span
          key={`${dot.left}-${dot.top}-${index}`}
          className="absolute rounded-full bg-neutral-400/70"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            boxShadow: `0 0 ${dot.size * 3}px rgba(163,163,163,0.25)`,
          }}
          initial={{ opacity: 0.2 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.35 }
              : {
                  y: [0, -dot.drift, 0],
                  x: [0, dot.drift * 0.35, 0],
                  opacity: [0.2, 0.55, 0.25],
                  scale: [1, 1.35, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: dot.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: dot.delay,
                }
          }
        />
      ))}
    </div>
  )
}
