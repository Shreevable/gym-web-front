import Reveal from '../../animation/Reveal'
import CapabilityCard from '../../ui/CapabilityCard'
import DarkSectionFrame from '../../ui/DarkSectionFrame'
import PageSection from '../../ui/PageSection'
import SectionIntro from '../../ui/SectionIntro'
import ThreeColumnGrid from '../../ui/ThreeColumnGrid'
import { capabilityCards, environmentsContent } from '../../../content/home'

export default function EnvironmentsSection() {
  return (
    <PageSection variant="stack" showDots={false}>
      <DarkSectionFrame className="min-h-full 2xl:min-h-0">
        <SectionIntro
          className="max-w-5xl"
          eyebrow={environmentsContent.eyebrow}
          title={environmentsContent.title}
          subtitle={environmentsContent.subtitle}
          description={environmentsContent.description}
        />

        <ThreeColumnGrid className="mt-8 md:mt-10">
          {capabilityCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <CapabilityCard {...card} />
            </Reveal>
          ))}
        </ThreeColumnGrid>
      </DarkSectionFrame>
    </PageSection>
  )
}
