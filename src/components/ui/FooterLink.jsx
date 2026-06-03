import { Link } from 'react-router-dom'
import ExternalLink from './ExternalLink'

export default function FooterLink({ link, className = 'transition-colors hover:text-white', icon: Icon }) {
  const content = (
    <>
      {Icon ? <Icon /> : null}
      {link.label}
    </>
  )

  if (link.to) {
    return (
      <Link to={link.to} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <ExternalLink href={link.href} className={className} external={link.external}>
      {content}
    </ExternalLink>
  )
}
