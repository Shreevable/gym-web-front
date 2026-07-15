import { useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { scrollStoryHeight, useScrollStory } from '../../hooks/useScrollStoryIndex'
import { CONTENT_ALIGN } from '../../constants/layout'
import SectionBackdrop from '../ui/SectionBackdrop'
import SectionIntro from '../ui/SectionIntro'

function CapabilityPanel({ card, activeIndex }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="w-full"
        >
          <p className="type-eyebrow mb-4 text-[0.62rem] md:text-[0.68rem]">{card.title}</p>
          <p className="type-display-tight text-[clamp(1.35rem,2.8vw,2rem)] leading-snug font-semibold text-white">
            {card.summary}
          </p>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease: 'easeOut' }}
          >
            {card.details}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function EnvironmentsScrollStory({ content, cards }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { activeIndex } = useScrollStory(containerRef, cards.length)
  const card = cards[activeIndex]

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
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {cards.map((item, index) => (
              <CapabilityPanel key={item.title} card={item} activeIndex={index} />
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
      style={{ height: scrollStoryHeight(cards.length) }}
    >
      <SectionBackdrop />

      <div className="sticky top-16 z-10 h-[calc(100svh-4rem)] overflow-hidden md:top-[var(--site-header-h)] md:h-[calc(100svh-var(--site-header-h))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="glow-feather-mask-wide absolute inset-0 bg-[radial-gradient(ellipse_100%_75%_at_50%_50%,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        </div>

        <div className={`relative z-10 flex h-full flex-col pt-4 md:pt-6 ${CONTENT_ALIGN}`}>
          <SectionIntro
            className="max-w-5xl"
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            trigger="mount"
          />

          <div className="relative mt-8 flex flex-1 flex-col items-center justify-center pb-10 md:mt-10">
            <motion.div
              className="relative w-full rounded-2xl border border-white/[0.08] bg-black/40 px-6 py-10 md:px-12 md:py-14"
              animate={{
                borderColor: `rgba(255,255,255,${0.08 + activeIndex * 0.04})`,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.03)_0%,transparent_70%)]"
              />
              <CapabilityPanel card={card} activeIndex={activeIndex} />
            </motion.div>

            <div className="mt-8 flex items-center gap-3">
              {cards.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-full border px-3 py-1.5 font-mono text-[0.62rem] tracking-wider uppercase md:px-4 md:text-[0.68rem]"
                  animate={{
                    borderColor:
                      index === activeIndex ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)',
                    backgroundColor:
                      index === activeIndex ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: index === activeIndex ? '#f7f7f7' : '#737373',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none absolute right-0 bottom-4 text-right">
              <p className="type-eyebrow text-[0.65rem] text-neutral-500">
                Surface 0{activeIndex + 1}
              </p>
              <div className="mt-1 h-[2px] w-20 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full bg-white/70"
                  animate={{ width: `${((activeIndex + 1) / cards.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
