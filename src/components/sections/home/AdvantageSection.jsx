import AdvantageScrollCircles from '../../animation/AdvantageScrollCircles'
import PageSection from '../../ui/PageSection'
import { advantageContent } from '../../../content/home'

export default function AdvantageSection() {
  return (
    <PageSection className="mb-0 -mt-6 min-h-0 overflow-visible">
      <AdvantageScrollCircles
        eyebrow={advantageContent.eyebrow}
        title={advantageContent.title}
        subtitle={advantageContent.subtitle}
        description={advantageContent.description}
      />
    </PageSection>
  )
}
