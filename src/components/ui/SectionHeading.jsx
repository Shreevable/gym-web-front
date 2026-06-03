import { StaggerItem, StaggerReveal } from '../animation/StaggerReveal'

const EYEBROW_CLASS = 'type-eyebrow mb-1 text-neutral-400'
const TITLE_CLASS =
  'type-display-tight mt-1 text-[clamp(1.875rem,4.2vw,3.25rem)] leading-[1.08] font-semibold text-white'
const DESCRIPTION_CLASS =
  'mt-3 max-w-[min(48rem,90%)] text-base leading-relaxed text-neutral-400 md:text-[clamp(1rem,1.35vw,1.125rem)]'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  animated = true,
  trigger = 'inView',
}) {
  const body = (
    <>
      {eyebrow ? <p className={EYEBROW_CLASS}>{eyebrow}</p> : null}
      <h1 className={TITLE_CLASS}>{title}</h1>
      {description ? <p className={DESCRIPTION_CLASS}>{description}</p> : null}
    </>
  )

  if (!animated) {
    return <div>{body}</div>
  }

  return (
    <StaggerReveal trigger={trigger}>
      {eyebrow ? (
        <StaggerItem>
          <p className={EYEBROW_CLASS}>{eyebrow}</p>
        </StaggerItem>
      ) : null}
      <StaggerItem>
        <h1 className={TITLE_CLASS}>{title}</h1>
      </StaggerItem>
      {description ? (
        <StaggerItem>
          <p className={DESCRIPTION_CLASS}>{description}</p>
        </StaggerItem>
      ) : null}
    </StaggerReveal>
  )
}
