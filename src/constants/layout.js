/** Scales with viewport — wider on monitors, same feel on laptop */
export const CONTENT_MAX = 'mx-auto w-full max-w-[min(96rem,94vw)]'

export const CONTENT_GUTTER = 'px-[clamp(1.25rem,4vw,3.5rem)]'

/** Header + section copy — shared max width and side gutters */
export const CONTENT_ALIGN = `${CONTENT_MAX} ${CONTENT_GUTTER}`

export const CONTENT_PADDING = `${CONTENT_GUTTER} py-6 md:py-7`

/**
 * Laptop: one full screen per section.
 * Large monitors (2xl+): height follows content; vertical padding scales with viewport.
 */
export const SECTION_VIEWPORT =
  'min-h-[calc(100svh-var(--site-header-h))] 2xl:min-h-0'

/** Vertical layout inside dark full-bleed sections */
export const SECTION_CONTENT_LAYOUT =
  'flex flex-1 flex-col justify-center gap-6 md:gap-8 2xl:justify-start 2xl:gap-5 2xl:py-[5vh]'

/** Full-bleed backgrounds only — no horizontal padding (keeps copy aligned with header) */
export const DARK_SECTION_SHELL =
  'full-bleed relative flex min-h-full flex-1 flex-col overflow-hidden py-6 text-neutral-100 md:py-8 2xl:py-[4vh]'
