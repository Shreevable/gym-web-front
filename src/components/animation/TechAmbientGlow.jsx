/**
 * Slow drifting radial glow — subtle “live system” feel behind dark sections.
 */
export default function TechAmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="tech-ambient-glow absolute -top-[20%] left-[10%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,transparent_68%)]" />
      <div
        className="tech-ambient-glow absolute -right-[10%] bottom-[5%] h-[50%] w-[40%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]"
        style={{ animationDelay: '-6s' }}
      />
    </div>
  )
}
