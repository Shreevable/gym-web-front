import { useLocation } from 'react-router-dom'
import { CONTENT_GUTTER } from '../../constants/layout'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function SiteLayout({ children }) {
  const { pathname } = useLocation()
  const showFooter = pathname === '/'

  return (
    <div className="min-h-screen bg-[#040404]">
      <SiteHeader />
      <main
        className={`snap-y snap-proximity 2xl:snap-none pt-4 pb-0 md:pt-5 md:pb-0 ${CONTENT_GUTTER}`}
      >
        {children}
      </main>
      {showFooter ? <SiteFooter /> : null}
    </div>
  )
}
