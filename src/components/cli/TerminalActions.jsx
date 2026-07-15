import { CALENDLY_SCHEDULE_URL, LINKEDIN_COMPANY_URL, SCHEDULE_CALL_LABEL } from '../../constants/links'
import LinkedInIcon from '../icons/LinkedInIcon'

export default function TerminalActions() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={LINKEDIN_COMPANY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WeDecode on LinkedIn"
        className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-cli-border text-neutral-400 transition-colors hover:border-neutral-500 hover:bg-white/[0.04] hover:text-white"
      >
        <LinkedInIcon className="h-4 w-4" />
      </a>
      <a
        href={CALENDLY_SCHEDULE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-sm border border-cli-accent bg-cli-accent px-3 py-1.5 font-mono text-xs font-semibold text-black transition-colors hover:bg-cli-accent/90"
      >
        {SCHEDULE_CALL_LABEL}
      </a>
    </div>
  )
}
