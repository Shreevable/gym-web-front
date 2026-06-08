import { useEffect } from 'react'
import { CALENDLY_SCHEDULE_URL } from '../constants/links'

export default function CalendlyRedirect() {
  useEffect(() => {
    window.location.replace(CALENDLY_SCHEDULE_URL)
  }, [])

  return <p className="py-24 text-center text-neutral-400">Redirecting to schedule a call…</p>
}
