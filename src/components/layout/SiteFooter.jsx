import DiagramFloatingDots from '../animation/DiagramFloatingDots'
import FooterBrandMark from '../animation/FooterBrandMark'
import LinkedInIcon from '../icons/LinkedInIcon'
import MailIcon from '../icons/MailIcon'
import Reveal from '../animation/Reveal'
import FooterLink from '../ui/FooterLink'
import { CONTENT_MAX, CONTENT_PADDING } from '../../constants/layout'
import {
  footerAudience,
  footerBottomLinks,
  footerCompanyLinks,
  footerContactLinks,
  footerCta,
} from '../../content/footer'

const CONTACT_ROW_CLASS =
  'inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white'

const ICONS = {
  mail: MailIcon,
  linkedin: LinkedInIcon,
}

function FooterDot() {
  return (
    <span className="text-neutral-600" aria-hidden>
      ·
    </span>
  )
}

function FooterLinkList({ links }) {
  return (
    <ul className="space-y-3 text-sm text-neutral-300">
      {links.map((link) => (
        <li key={link.to ?? link.href}>
          <FooterLink link={link} />
        </li>
      ))}
    </ul>
  )
}

function FooterContactList() {
  return (
    <div className="flex flex-col gap-3">
      {footerContactLinks.map((link) => (
        <FooterLink
          key={link.href}
          link={link}
          className={CONTACT_ROW_CLASS}
          icon={ICONS[link.icon]}
        />
      ))}
    </div>
  )
}

function FooterBottomBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-400 sm:justify-end">
      {footerBottomLinks.map((link, index) => (
        <span key={link.to ?? link.href} className="contents">
          {index > 0 ? <FooterDot /> : null}
          <FooterLink link={link} className="hover:text-neutral-200" />
        </span>
      ))}
    </div>
  )
}

export default function SiteFooter() {
  return (
    <footer className="full-bleed relative mt-0 mb-0 border-t border-neutral-800/80 bg-[#040404] pb-0">
      <DiagramFloatingDots />

      <div className={`relative z-10 ${CONTENT_MAX} ${CONTENT_PADDING} pt-12 pb-6 md:pt-16 md:pb-8`}>
        <Reveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                {footerCta.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
                {footerCta.description}
              </p>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <p className="type-eyebrow mb-4">Company</p>
              <FooterLinkList links={footerCompanyLinks} />
            </div>

            <div className="lg:col-span-3">
              <p className="type-eyebrow mb-4">Who we work with</p>
              <p className="max-w-sm text-sm italic leading-relaxed text-neutral-300">
                {footerAudience}
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="type-eyebrow mb-4">Contact</p>
              <FooterContactList />
            </div>
          </div>
        </Reveal>
      </div>

      <div aria-hidden className="relative z-10 w-full border-t border-neutral-800/90" />

      <div
        className={`relative z-10 ${CONTENT_MAX} flex flex-col gap-4 px-6 py-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-7`}
      >
        <p>© 2026 WeDecode</p>
        <FooterBottomBar />
      </div>

      <FooterBrandMark />
    </footer>
  )
}
