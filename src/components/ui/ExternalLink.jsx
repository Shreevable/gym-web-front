/**
 * Internal route or external URL — used in footer and nav-adjacent UI.
 */
export default function ExternalLink({
  href,
  children,
  className = 'transition-colors hover:text-white',
  external = href?.startsWith('http'),
}) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
