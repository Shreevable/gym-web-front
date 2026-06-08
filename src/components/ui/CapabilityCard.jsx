import { motion, useReducedMotion } from 'framer-motion'
import { transition } from '../../constants/motion'
import InfoCard from './InfoCard'

export default function CapabilityCard({ title, summary, details }) {
  const shouldReduceMotion = useReducedMotion()

  const card = (
    <InfoCard
      title={title}
      className="h-full rounded-2xl border border-neutral-500/50 bg-black/50 p-5 text-left transition-colors duration-300 md:p-6"
    >
      <p className="text-base leading-relaxed text-neutral-300">{summary}</p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-400">{details}</p>
    </InfoCard>
  )

  if (shouldReduceMotion) {
    return card
  }

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -3 }}
      transition={transition.fast}
    >
      {card}
    </motion.div>
  )
}
