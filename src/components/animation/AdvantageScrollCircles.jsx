import { useRef, useState } from 'react'
import { CONTENT_ALIGN } from '../../constants/layout'
import SectionIntro from '../ui/SectionIntro'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'

const circleStates = [
  {
    left: 'Scale',
    middle: 'Limited synthetic proxies',
    right: '200 trillion tokens of data available across real and synthetic domains',
  },
  {
    left: 'Evaluation',
    middle: 'Stochastic, variable feedback',
    right: 'Deterministic signals based on human-recorded baselines',
  },
  {
    left: 'Architecture',
    middle: 'Sparse rewards',
    right: 'Dense reward architecture supporting Long Context RL',
  },
]

function CircleText({ heading, text, activeIndex }) {
  const sizeClass =
    text.length > 55
      ? 'text-sm md:text-xl'
      : text.length > 28
        ? 'text-base md:text-2xl'
        : 'text-lg md:text-3xl'

  return (
    <div className="px-5 text-center">
      <p className="type-eyebrow mb-3 text-[0.62rem] md:text-[0.68rem]">
        {heading}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${activeIndex}-${text}`}
          className={`${sizeClass} leading-tight font-medium text-neutral-100`}
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default function AdvantageScrollCircles({ eyebrow, title, subtitle, description }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.34) {
      setActiveIndex(0)
      return
    }

    if (latest < 0.68) {
      setActiveIndex(1)
      return
    }

    setActiveIndex(2)
  })

  return (
    <section ref={containerRef} className="full-bleed relative mt-1 h-[245vh]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-x-clip overflow-y-hidden md:top-[var(--site-header-h)] md:h-[calc(100svh-var(--site-header-h))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="glow-feather-mask-wide absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_50%,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.03)_42%,transparent_78%)]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#040404] via-black/85 to-transparent" />
        </div>

        <div className={`relative z-10 flex h-full w-full flex-col pt-3 md:pt-4 ${CONTENT_ALIGN}`}>
          <SectionIntro
            className="max-w-4xl"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            description={description}
          />

          <div className="relative mt-1 flex flex-1 items-center justify-center gap-[5px] pb-4 md:mt-2 md:gap-[7px] md:pb-6">
            <div aria-hidden className="full-bleed-layer pointer-events-none z-0 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-[#040404] via-[#040404]/70 to-transparent sm:w-16 md:w-20" />
              <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-[#040404] via-[#040404]/70 to-transparent sm:w-16 md:w-20" />
            </div>
            <div className="pointer-events-none absolute left-[13%] right-[13%] top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <motion.div
              className="relative z-10 flex h-52 w-52 shrink-0 items-center justify-center rounded-full border border-neutral-300/70 bg-black/55 md:h-72 md:w-72"
              animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            >
              {!shouldReduceMotion ? (
                <motion.svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="47.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.9"
                    strokeDasharray="30 269"
                    strokeLinecap="round"
                  />
                </motion.svg>
              ) : null}
              <CircleText
                heading="Feature"
                text={circleStates[activeIndex].left}
                activeIndex={activeIndex}
              />
            </motion.div>

            <motion.div
              className="relative z-10 flex h-56 w-56 shrink-0 items-center justify-center rounded-full border border-neutral-300/80 bg-black/60 md:h-80 md:w-80"
              animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            >
              {!shouldReduceMotion ? (
                <motion.svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="47.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.85"
                    strokeDasharray="36 263"
                    strokeLinecap="round"
                  />
                </motion.svg>
              ) : null}
              <CircleText
                heading="The Industry Standard"
                text={circleStates[activeIndex].middle}
                activeIndex={activeIndex}
              />
            </motion.div>

            <motion.div
              className="relative z-10 flex h-60 w-60 shrink-0 items-center justify-center rounded-full border border-neutral-200/90 bg-black/65 md:h-[22rem] md:w-[22rem]"
              animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            >
              {!shouldReduceMotion ? (
                <motion.svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 34, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="47.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.32)"
                    strokeWidth="0.8"
                    strokeDasharray="42 257"
                    strokeLinecap="round"
                  />
                </motion.svg>
              ) : null}
              <CircleText
                heading="With WeDecode"
                text={circleStates[activeIndex].right}
                activeIndex={activeIndex}
              />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0">
            <div className="mx-auto h-px w-[72%] bg-linear-to-r from-transparent via-neutral-300/40 to-transparent" />
          </div>

          <div className="pointer-events-none absolute right-0 bottom-5 text-right">
            <p className="type-eyebrow text-[0.65rem] text-neutral-500">
              State 0{activeIndex + 1}
            </p>
            <div className="mt-1 h-[2px] w-20 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full bg-white/70"
                animate={{ width: `${((activeIndex + 1) / 3) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
