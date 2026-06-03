import { StaggerItem, StaggerReveal } from '../animation/StaggerReveal'

/**
 * Standard section header block (eyebrow + title + optional subtitle + description).
 */
export default function SectionIntro({
  eyebrow,
  title,
  subtitle,
  description,
  className = '',
  animated = true,
  trigger = 'inView',
}) {
  const content = (
    <>
      {eyebrow ? (
        <StaggerItem>
          <p className="type-eyebrow mb-2">{eyebrow}</p>
        </StaggerItem>
      ) : null}
      <StaggerItem>
        <h2 className="type-display-tight mb-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-white">
          {title}
        </h2>
      </StaggerItem>
      {subtitle ? (
        <StaggerItem>
          <h3 className="text-[clamp(1.25rem,2.2vw,1.875rem)] leading-tight font-semibold text-neutral-100">
            {subtitle}
          </h3>
        </StaggerItem>
      ) : null}
      {description ? (
        <StaggerItem>
          <p className="mt-3 max-w-3xl text-neutral-300">{description}</p>
        </StaggerItem>
      ) : null}
    </>
  )

  if (!animated) {
    return (
      <div className={className}>
        {eyebrow ? <p className="type-eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="type-display-tight mb-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-white">
          {title}
        </h2>
        {subtitle ? (
          <h3 className="text-[clamp(1.25rem,2.2vw,1.875rem)] leading-tight font-semibold text-neutral-100">
            {subtitle}
          </h3>
        ) : null}
        {description ? <p className="mt-3 max-w-3xl text-neutral-300">{description}</p> : null}
      </div>
    )
  }

  return (
    <StaggerReveal className={className} trigger={trigger}>
      {content}
    </StaggerReveal>
  )
}
