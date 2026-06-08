import SectionBackdrop from './SectionBackdrop'
import {
  CONTENT_MAX,
  CONTENT_PADDING,
  DARK_SECTION_SHELL,
  SECTION_CONTENT_LAYOUT,
} from '../../constants/layout'

/**
 * Full-bleed dark section wrapper shared by How It Works and Environments.
 */
export default function DarkSectionFrame({ children, className = '' }) {
  return (
    <div className={`${DARK_SECTION_SHELL} ${className}`}>
      <SectionBackdrop />
      <div
        className={`relative z-10 ${SECTION_CONTENT_LAYOUT} ${CONTENT_MAX} ${CONTENT_PADDING}`}
      >
        {children}
      </div>
    </div>
  )
}
