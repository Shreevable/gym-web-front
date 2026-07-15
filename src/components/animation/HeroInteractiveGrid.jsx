import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { InteractiveGridPattern } from '../ui/interactive-grid-pattern'
import { cn } from '../../lib/utils'

const CELL = 48

export default function HeroInteractiveGrid({ className }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [squares, setSquares] = useState([28, 16])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const update = () => {
      const { width, height } = node.getBoundingClientRect()
      setSquares([
        Math.max(14, Math.ceil(width / CELL)),
        Math.max(8, Math.ceil(height / CELL)),
      ])
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'hero-grid-feather absolute inset-0',
        shouldReduceMotion && 'pointer-events-none',
        className
      )}
    >
      <InteractiveGridPattern
        width={CELL}
        height={CELL}
        squares={squares}
        preserveAspectRatio="none"
        enableSnake={!shouldReduceMotion}
        className="border-0 opacity-[0.35]"
        squaresClassName="stroke-white/[0.04]"
      />
    </div>
  )
}
