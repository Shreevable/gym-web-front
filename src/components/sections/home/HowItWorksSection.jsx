import Reveal from '../../animation/Reveal'
import HowItWorksDiagram from '../../ui/HowItWorksDiagram'
import DarkSectionFrame from '../../ui/DarkSectionFrame'
import PageSection from '../../ui/PageSection'
import SectionIntro from '../../ui/SectionIntro'
import { howItWorksContent, workflowSteps } from '../../../content/home'

export default function HowItWorksSection() {
  return (
    <PageSection variant="stack" showDots={false} className="mt-15">
      <DarkSectionFrame>
        <SectionIntro
          className="max-w-5xl"
          eyebrow={howItWorksContent.eyebrow}
          title={howItWorksContent.title}
          subtitle={howItWorksContent.subtitle}
          description={howItWorksContent.description}
        />
        <Reveal delay={0.12} className="mt-3 p-0 md:px-0">
          <HowItWorksDiagram steps={workflowSteps} />
        </Reveal>
      </DarkSectionFrame>
    </PageSection>
  )
}
