import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '../../lib/utils'

const SNAKE_LENGTH = 22
const SNAKE_STEP_MS = 42
const SNAKE_TAIL_MS = 520

function generateSnakePath(startIndex, horizontal, vertical, length = SNAKE_LENGTH) {
  const visited = new Set([startIndex])
  const path = [startIndex]
  let current = startIndex

  for (let i = 1; i < length; i += 1) {
    const x = current % horizontal
    const y = Math.floor(current / horizontal)
    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]
      .filter(([nx, ny]) => nx >= 0 && nx < horizontal && ny >= 0 && ny < vertical)
      .map(([nx, ny]) => ny * horizontal + nx)
      .filter((index) => !visited.has(index))

    if (neighbors.length === 0) break

    const next = neighbors[Math.floor(Math.random() * neighbors.length)]
    visited.add(next)
    path.push(next)
    current = next
  }

  return path
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  enableSnake = false,
  ...props
}) {
  const [horizontal, vertical] = squares
  const [litCells, setLitCells] = useState({})
  const timeoutsRef = useRef([])
  const snakeRunRef = useRef(0)

  const clearSnakeTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
  }, [])

  useEffect(() => clearSnakeTimers, [clearSnakeTimers])

  const runSnake = useCallback(
    (startIndex) => {
      if (!enableSnake) return

      clearSnakeTimers()
      snakeRunRef.current += 1
      const runId = snakeRunRef.current
      const path = generateSnakePath(startIndex, horizontal, vertical)

      path.forEach((cellIndex, step) => {
        const lightId = window.setTimeout(() => {
          if (runId !== snakeRunRef.current) return

          setLitCells((prev) => ({
            ...prev,
            [cellIndex]: { role: step === path.length - 1 ? 'head' : 'trail', litAt: Date.now() },
          }))
        }, step * SNAKE_STEP_MS)
        timeoutsRef.current.push(lightId)

        const fadeId = window.setTimeout(() => {
          if (runId !== snakeRunRef.current) return

          setLitCells((prev) => {
            if (!prev[cellIndex]) return prev
            const next = { ...prev }
            delete next[cellIndex]
            return next
          })
        }, step * SNAKE_STEP_MS + SNAKE_TAIL_MS)
        timeoutsRef.current.push(fadeId)
      })
    },
    [clearSnakeTimers, enableSnake, horizontal, vertical]
  )

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn('absolute inset-0 h-full w-full border-0', className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        const lit = litCells[index]
        const isHead = lit?.role === 'head'
        const isTrail = lit?.role === 'trail'

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              'stroke-white/[0.05] transition-[fill,filter,opacity] duration-300 ease-out',
              isHead && 'fill-white/[0.14]',
              isTrail && 'fill-white/[0.07]',
              !lit && 'fill-transparent',
              enableSnake && 'cursor-crosshair',
              squaresClassName
            )}
            style={
              isHead
                ? { filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.55))' }
                : isTrail
                  ? { filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.25))' }
                  : undefined
            }
            onClick={() => runSnake(index)}
          />
        )
      })}
    </svg>
  )
}
