import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CONTENT_ALIGN } from '../../constants/layout'
import HeroFlowField from './HeroFlowField'
import HeroInteractiveGrid from './HeroInteractiveGrid'

const TRUST_TEXT_OFFSET = 'pt-[36vh] md:pt-[70vh]'

export default function BrandFlowStrip({ trustText }) {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [8, -10])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -18])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_55%,rgba(255,255,255,0.04)_0%,transparent_55%),linear-gradient(180deg,#080808_0%,#040404_100%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[min(42%,14rem)] bg-linear-to-b from-[#040404] via-[#040404]/85 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-36 bg-linear-to-t from-[#040404] via-[#040404]/80 to-transparent"
      />

      <motion.div
        className="absolute inset-0 z-0"
        style={reducedMotion ? undefined : { y: gridY }}
      >
        <HeroInteractiveGrid />
      </motion.div>

      <HeroFlowField reducedMotion={reducedMotion} />

      <motion.div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 ${TRUST_TEXT_OFFSET} ${CONTENT_ALIGN}`}
        style={reducedMotion ? undefined : { y: textY }}
      >
        <motion.p
          className="mx-auto max-w-3xl text-center font-mono text-[0.68rem] leading-relaxed tracking-[0.14em] text-neutral-300/90 uppercase md:text-xs"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {trustText}
        </motion.p>
      </motion.div>
    </div>
  )
}
