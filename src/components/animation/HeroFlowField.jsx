import { motion } from 'framer-motion'
import {
  FLOW_LANES,
  FLOW_METRIC_TRACES,
  PRIMARY_FLOW_LANE,
} from './heroFlowPaths'

function AmbientGlow({ reducedMotion }) {
  if (reducedMotion) {
    return (
      <>
        <div className="pointer-events-none absolute top-[38%] left-[28%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl md:h-80 md:w-80" />
        <div className="pointer-events-none absolute top-[52%] left-[62%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl md:h-56 md:w-56" />
      </>
    )
  }

  return (
    <>
      <motion.div
        className="pointer-events-none absolute top-[38%] left-[28%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl md:h-96 md:w-96"
        animate={{
          x: [0, 24, -12, 0],
          y: [0, -16, 10, 0],
          opacity: [0.45, 0.7, 0.5, 0.45],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-[52%] left-[62%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl md:h-72 md:w-72"
        animate={{
          x: [0, -20, 14, 0],
          y: [0, 12, -8, 0],
          opacity: [0.35, 0.55, 0.4, 0.35],
        }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 2 }}
      />
    </>
  )
}

function MetricTrace({ trace, index, reducedMotion }) {
  return (
    <g>
      <path
        d={trace.path}
        stroke={`rgba(255,255,255,${trace.opacity})`}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {!reducedMotion ? (
        <motion.path
          d={trace.path}
          stroke={`rgba(255,255,255,${trace.opacity * 1.6})`}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [trace.opacity, trace.opacity * 2.2, trace.opacity] }}
          transition={{
            duration: 8 + index * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: index * 0.8,
          }}
        />
      ) : null}
    </g>
  )
}

function Lane({ lane, index, reducedMotion }) {
  return (
    <g>
      <path
        d={lane.path}
        stroke={`rgba(255,255,255,${lane.opacity * 0.28})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {!reducedMotion ? (
        <>
          <motion.path
            d={lane.path}
            stroke={`rgba(255,255,255,${lane.opacity})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              pathLength: [0.55, 1, 0.6],
              opacity: [lane.opacity * 0.4, lane.opacity * 0.85, lane.opacity * 0.45],
            }}
            transition={{
              duration: 6 + index,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d={lane.path}
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 28"
            animate={{ strokeDashoffset: [0, -64] }}
            transition={{
              duration: 2.8 + index * 0.35,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        </>
      ) : null}
    </g>
  )
}

export default function HeroFlowField({ reducedMotion }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[16vh] z-[1] md:top-[20vh]"
      aria-hidden
    >
      <AmbientGlow reducedMotion={reducedMotion} />

      <svg viewBox="0 0 1320 380" className="relative h-full w-full" preserveAspectRatio="none" fill="none">
        {FLOW_METRIC_TRACES.map((trace, index) => (
          <MetricTrace key={trace.path} trace={trace} index={index} reducedMotion={reducedMotion} />
        ))}

        {FLOW_LANES.map((lane, index) => (
          <Lane key={lane.path} lane={lane} index={index} reducedMotion={reducedMotion} />
        ))}

        {!reducedMotion ? (
          <>
            <circle r="3" fill="rgba(255,255,255,0.95)">
              <animateMotion dur="5.5s" repeatCount="indefinite" path={PRIMARY_FLOW_LANE} />
            </circle>
            <circle r="2.5" fill="rgba(255,255,255,0.55)">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path={PRIMARY_FLOW_LANE}
                begin="1.4s"
              />
            </circle>
          </>
        ) : null}
      </svg>
    </div>
  )
}
