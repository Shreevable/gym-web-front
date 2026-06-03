import DiagramFloatingDots from '../animation/DiagramFloatingDots'
import TechAmbientGlow from '../animation/TechAmbientGlow'

/**
 * Shared dark-section background: gradient glow, edge fades, optional ambient dots.
 */
export default function SectionBackdrop({ showDots = true }) {
  return (
    <>
      <div className="glow-feather-mask absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_45%,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.01)_38%,transparent_72%),linear-gradient(180deg,#040404_0%,#0a0a0a_52%,#040404_100%)]" />
      <TechAmbientGlow />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-14 bg-linear-to-b from-black/65 via-black/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-14 bg-linear-to-t from-black/65 via-black/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-16 bg-linear-to-r from-black/65 via-black/25 to-transparent md:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-16 bg-linear-to-l from-black/65 via-black/25 to-transparent md:w-24"
      />
      {showDots ? <DiagramFloatingDots /> : null}
    </>
  )
}
