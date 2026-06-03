import { motion, useReducedMotion } from 'framer-motion'

/** Vertical dashed line + chevron — stretches between step boxes, tip meets next box. */
export default function FlowConnector({ delay = 0, className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className={`flex w-full flex-col items-center ${className}`}
      aria-hidden
    >
      <div className="relative w-px flex-1 min-h-[2.5rem]">
        <div className="absolute inset-0 bg-white/15" />
        {!shouldReduceMotion ? (
          <motion.div
            className="absolute inset-0 w-px"
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 4px, transparent 4px 16px)',
            }}
            animate={{ backgroundPosition: ['0 0', '0 32px'] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
              delay,
            }}
          />
        ) : null}
      </div>
      <svg
        width="8"
        height="7"
        viewBox="0 0 8 7"
        className="shrink-0 translate-y-px text-white/45"
      >
        <path d="M0 0 L4 7 L8 0 Z" fill="currentColor" />
      </svg>
    </div>
  )
}
