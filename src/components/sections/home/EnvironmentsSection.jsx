import EnvironmentsScrollStory from '../../animation/EnvironmentsScrollStory'
import PageSection from '../../ui/PageSection'
import { capabilityCards, environmentsContent } from '../../../content/home'

export default function EnvironmentsSection() {
  return (
    <PageSection variant="fluid" showDots={false}>
      <EnvironmentsScrollStory content={environmentsContent} cards={capabilityCards} />
    </PageSection>
  )
}
