import { CALENDLY_SCHEDULE_URL, SCHEDULE_CALL_LABEL } from '../../constants/links'
import { NAV_CTA_PRIMARY_CLASS } from '../../constants/nav'
import ExternalLink from './ExternalLink'

export default function ScheduleCallLink({ className }) {
  return (
    <ExternalLink href={CALENDLY_SCHEDULE_URL} className={className ?? NAV_CTA_PRIMARY_CLASS}>
      {SCHEDULE_CALL_LABEL}
    </ExternalLink>
  )
}
