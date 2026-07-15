import { motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import WeDecodeLogo from '../brand/WeDecodeLogo'
import ScheduleCallLink from '../ui/ScheduleCallLink'
import { transition } from '../../constants/motion'
import { CONTENT_GUTTER, CONTENT_MAX } from '../../constants/layout'

export default function SiteHeader() {
  const reducedMotion = useReducedMotion()
  const HeaderTag = reducedMotion ? 'header' : motion.header

  const headerMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: transition.base,
      }

  return (
    <HeaderTag
      className="full-bleed sticky top-0 z-50 border-b border-white/[0.06] bg-[#040404]/45 backdrop-blur-xl backdrop-saturate-150"
      {...headerMotion}
    >
      <div
        className={`${CONTENT_MAX} flex w-full items-center justify-between ${CONTENT_GUTTER} py-4 lg:min-h-[4.75rem] lg:py-5`}
      >
        <NavLink
          to="/"
          className="rounded-sm transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label="WeDecode home"
        >
          <WeDecodeLogo />
        </NavLink>

        <nav className="flex items-center">
          <ScheduleCallLink />
        </nav>
      </div>
    </HeaderTag>
  )
}
