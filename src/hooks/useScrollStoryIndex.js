import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

/**
 * Maps vertical scroll through a tall container to a step index and progress value.
 * Container height should be stepCount * 100vh so each step gets one viewport of scroll.
 */
export function useScrollStory(containerRef, stepCount) {
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(0.999, Math.max(0, latest))
    const next = Math.min(stepCount - 1, Math.floor(clamped * stepCount))
    setActiveIndex(next)
  })

  return { activeIndex, scrollYProgress }
}

/** @deprecated Use useScrollStory instead */
export function useScrollStoryIndex(stepCount, containerRef) {
  const { activeIndex } = useScrollStory(containerRef, stepCount)
  return activeIndex
}

export function scrollStoryHeight(stepCount) {
  return `${stepCount * 100}vh`
}

export function scrollStoryRotation(stepCount) {
  return -(stepCount - 1) * (360 / stepCount)
}
