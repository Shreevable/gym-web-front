import HowItWorksScrollStory from '../../animation/HowItWorksScrollStory'
import PageSection from '../../ui/PageSection'
import { howItWorksContent, workflowSteps } from '../../../content/home'

export default function HowItWorksSection() {
  return (
    <PageSection variant="fluid" showDots={false} className="mt-15">
      <HowItWorksScrollStory content={howItWorksContent} steps={workflowSteps} />
    </PageSection>
  )
}
