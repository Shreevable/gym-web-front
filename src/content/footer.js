import {
  CALENDLY_SCHEDULE_URL,
  LINKEDIN_COMPANY_URL,
  SCHEDULE_CALL_LABEL,
} from '../constants/links'

export const footerCta = {
  title: 'Scale Your Post-Training and RL with WeDecode.',
  description: 'Partner with us for deterministic evaluations and massive SFT data.',
}

export const footerAudience =
  'For AI labs, agent startups, and research teams. Every inquiry reviewed within 48 hours.'

export const footerEmail = 'info@wedecode.io'

export const footerCompanyLinks = [
  { label: 'Contact', to: '/contact' },
  { label: SCHEDULE_CALL_LABEL, href: CALENDLY_SCHEDULE_URL, external: true },
]

export const footerContactLinks = [
  { label: footerEmail, href: `mailto:${footerEmail}`, icon: 'mail' },
  { label: 'LinkedIn', href: LINKEDIN_COMPANY_URL, external: true, icon: 'linkedin' },
]

export const footerBottomLinks = [
  { label: 'Contact', to: '/contact' },
  { label: SCHEDULE_CALL_LABEL, href: CALENDLY_SCHEDULE_URL, external: true },
  { label: footerEmail, href: `mailto:${footerEmail}` },
  { label: 'LinkedIn', href: LINKEDIN_COMPANY_URL, external: true },
]
