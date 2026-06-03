import DiagramFloatingDots from '../animation/DiagramFloatingDots'
import { SECTION_VIEWPORT } from '../../constants/layout'

const VARIANTS = {
  /** Hero / Advantage — height set by their own layout */
  fluid: 'mb-0 min-h-0',
  /** How It Works + Environments — one viewport per section */
  stack: `mb-0 flex flex-col snap-start 2xl:snap-none ${SECTION_VIEWPORT}`,
  default: ' min-h-0 snap-start max-md:min-h-[calc(100svh-7.5rem)] md:mb-0',
}

export default function PageSection({
  children,
  className = '',
  showDots = true,
  variant = 'default',
}) {
  return (
    <section className={`relative ${VARIANTS[variant] ?? VARIANTS.default} ${className}`}>
      {showDots ? <DiagramFloatingDots /> : null}
      {children}
    </section>
  )
}
