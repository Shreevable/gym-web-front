import AdvantageSection from '../components/sections/home/AdvantageSection'
import EnvironmentsSection from '../components/sections/home/EnvironmentsSection'
import HeroSection from '../components/sections/home/HeroSection'
import HowItWorksSection from '../components/sections/home/HowItWorksSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdvantageSection />
      <HowItWorksSection />
      <EnvironmentsSection />
    </>
  )
}
