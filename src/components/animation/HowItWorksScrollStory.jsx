import { useRef } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import {
  scrollStoryHeight,
  scrollStoryRotation,
  useScrollStory,
} from '../../hooks/useScrollStoryIndex'
import { CONTENT_ALIGN } from '../../constants/layout'
import SectionBackdrop from '../ui/SectionBackdrop'
import SectionIntro from '../ui/SectionIntro'

const RING_RX = 168
const RING_RY = 58

function DetailColumn({ eyebrow, body, activeIndex }) {
  return (
    <div className="text-center md:text-left">
      <p className="type-eyebrow mb-2 text-[0.62rem] md:text-[0.68rem]">{eyebrow}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${activeIndex}-${body}`}
          className="text-sm leading-relaxed text-neutral-200 md:text-base"
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {body}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function RingNode({ step, angle, isActive }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * RING_RX
  const y = Math.sin(rad) * RING_RY

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x: x - 44, y: y - 18 }}
      animate={{
        scale: isActive ? 1.05 : 0.88,
        opacity: isActive ? 1 : 0.38,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div
        className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium md:px-5 md:py-2 md:text-base ${
          isActive
            ? 'border-white/50 bg-white/[0.08] text-white shadow-[0_0_24px_rgba(255,255,255,0.12)]'
            : 'border-white/15 bg-black/40 text-neutral-400'
        }`}
      >
        {step.name}
      </div>
    </motion.div>
  )
}

function SaturnOrbit({ steps, activeIndex, ringRotation }) {
  const nodeAngles = steps.map((_, index) => 90 + index * (360 / steps.length))

  return (
    <div
      className="relative mx-auto flex w-full max-w-[26rem] items-center justify-center md:max-w-[32rem]"
      style={{ height: RING_RY * 2 + 120, perspective: 900 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: RING_RX * 2 + 40, height: RING_RY * 2 + 24 }}
      >
        <svg viewBox="0 0 400 140" className="h-full w-full overflow-visible opacity-60">
          <ellipse
            cx="200"
            cy="70"
            rx={RING_RX + 8}
            ry={RING_RY + 4}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <ellipse
            cx="200"
            cy="70"
            rx={RING_RX}
            ry={RING_RY}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
            strokeDasharray="6 10"
          />
        </svg>
      </div>

      <motion.div
        className="absolute inset-0"
        style={{ rotate: ringRotation, transformOrigin: '50% 50%' }}
      >
        {steps.map((step, index) => (
          <RingNode
            key={step.name}
            step={step}
            angle={nodeAngles[index]}
            isActive={index === activeIndex}
          />
        ))}
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          aria-hidden
          className="absolute h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,transparent_72%)] blur-md md:h-32 md:w-32"
        />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.85)_100%)] shadow-[inset_0_0_30px_rgba(255,255,255,0.08),0_0_40px_rgba(255,255,255,0.06)] md:h-28 md:w-28">
          <AnimatePresence mode="wait">
            <motion.span
              key={steps[activeIndex].name}
              className="type-display-tight text-xl font-semibold text-white md:text-2xl"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(3px)' }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              {steps[activeIndex].name}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="type-eyebrow mt-3 text-[0.6rem] text-neutral-500">RLaaS Core</p>
      </div>
    </div>
  )
}

export default function HowItWorksScrollStory({ content, steps }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { activeIndex, scrollYProgress } = useScrollStory(containerRef, steps.length)
  const step = steps[activeIndex]

  const ringRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollStoryRotation(steps.length)]
  )

  if (shouldReduceMotion) {
    return (
      <section className="full-bleed relative overflow-hidden py-16 text-neutral-100">
        <SectionBackdrop />
        <div className={`relative z-10 ${CONTENT_ALIGN}`}>
          <SectionIntro
            className="max-w-5xl"
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            animated={false}
          />
          <div className="mt-10 space-y-8">
            {steps.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6"
              >
                <DetailColumn eyebrow="What happens" body={item.whatHappens} activeIndex={0} />
                <p className="my-3 text-center text-lg font-semibold md:my-0">{item.name}</p>
                <DetailColumn eyebrow="What you get" body={item.result} activeIndex={0} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="full-bleed relative text-neutral-100"
      style={{ height: scrollStoryHeight(steps.length) }}
    >
      <SectionBackdrop />

      <div className="sticky top-16 z-10 h-[calc(100svh-4rem)] overflow-hidden md:top-[var(--site-header-h)] md:h-[calc(100svh-var(--site-header-h))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="glow-feather-mask absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_58%,rgba(255,255,255,0.06)_0%,transparent_68%)]" />
        </div>

        <div className={`relative z-10 flex h-full flex-col pt-4 md:pt-6 ${CONTENT_ALIGN}`}>
          <SectionIntro
            className="max-w-5xl"
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            trigger="mount"
          />

          <div className="relative mt-4 flex flex-1 flex-col items-center justify-center gap-8 pb-10 md:mt-6 md:gap-10">
            <SaturnOrbit
              steps={steps}
              activeIndex={activeIndex}
              ringRotation={ringRotation}
            />

            <div className="grid w-full max-w-3xl grid-cols-1 gap-6 border-t border-white/[0.08] pt-8 md:grid-cols-2 md:gap-10 md:pt-10">
              <DetailColumn
                eyebrow="What happens"
                body={step.whatHappens}
                activeIndex={activeIndex}
              />
              <DetailColumn
                eyebrow="What you get"
                body={step.result}
                activeIndex={activeIndex}
              />
            </div>

            <div className="pointer-events-none flex items-center gap-2">
              {steps.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="h-1 rounded-full"
                  animate={{
                    width: index === activeIndex ? 28 : 8,
                    backgroundColor:
                      index === activeIndex ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.15)',
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
