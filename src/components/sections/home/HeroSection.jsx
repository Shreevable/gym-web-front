import BrandFlowStrip from '../../animation/BrandFlowStrip'
import SectionHeading from '../../ui/SectionHeading'
import PageSection from '../../ui/PageSection'
import { CONTENT_ALIGN } from '../../../constants/layout'
import { heroContent } from '../../../content/home'

export default function HeroSection() {
  return (
    <PageSection className="mb-0 mt-2 md:mt-3" showDots={false}>
      <div className="full-bleed relative min-h-[calc(100svh-var(--site-header-h))]">
        <div className="absolute inset-0">
          <BrandFlowStrip trustText={heroContent.trustText} />
        </div>

        <div className={`relative z-20 ${CONTENT_ALIGN}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -top-2 bottom-8 bg-linear-to-b from-[#040404] from-40% via-[#040404]/92 to-transparent"
          />
          <div className="relative pt-0 pb-3 md:pb-4">
            <SectionHeading
              trigger="mount"
              eyebrow={heroContent.eyebrow}
              title={heroContent.title}
              description={heroContent.description}
            />
          </div>
        </div>
      </div>
    </PageSection>
  )
}
