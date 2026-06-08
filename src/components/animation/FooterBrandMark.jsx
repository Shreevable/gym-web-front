import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const BRAND_TEXT = 'WeDecode'

export default function FooterBrandMark() {
  const textRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [clipHeight, setClipHeight] = useState(null)

  useEffect(() => {
    const fitToViewport = () => {
      const el = textRef.current
      if (!el) return

      const targetWidth = window.innerWidth
      let size = 32

      el.style.fontSize = `${size}px`

      while (el.scrollWidth < targetWidth * 0.998 && size < 720) {
        size += 2
        el.style.fontSize = `${size}px`
      }

      while (el.scrollWidth > targetWidth && size > 20) {
        size -= 1
        el.style.fontSize = `${size}px`
      }

      setClipHeight(Math.ceil(size * 0.76))
    }

    fitToViewport()
    window.addEventListener('resize', fitToViewport)
    return () => window.removeEventListener('resize', fitToViewport)
  }, [])

  return (
    <div
      aria-hidden
      className="footer-brand-clip pointer-events-none w-screen max-w-[100vw] select-none"
      style={clipHeight ? { height: clipHeight } : undefined}
    >
      <motion.p
        ref={textRef}
        className="footer-brand-watermark bg-[linear-gradient(90deg,#1f1f1f_0%,#1f1f1f_24%,#3f3f3f_38%,#737373_50%,#3f3f3f_62%,#1f1f1f_76%,#1f1f1f_100%)] bg-clip-text text-transparent"
        style={{ backgroundSize: '220% 100%' }}
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
        }
      >
        {BRAND_TEXT}
      </motion.p>
    </div>
  )
}
