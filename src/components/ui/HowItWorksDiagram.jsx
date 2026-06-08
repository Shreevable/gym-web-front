import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import FlowConnector from '../animation/FlowConnector'
import FlowStepBox from '../animation/FlowStepBox'
import { transition, VIEWPORT_DEFAULT } from '../../constants/motion'

const ROW_START = ['md:row-start-1', 'md:row-start-2', 'md:row-start-3']

function StepPill({ name }) {
  return (
    <div className="type-display-tight inline-flex min-w-[180px] justify-center rounded-full border border-white/20 bg-white/[0.03] px-8 py-3 text-4xl font-semibold text-neutral-100 md:min-w-[215px]">
      {name}
    </div>
  )
}

function SideCopy({ eyebrow, body, align = 'end', delay, shouldReduceMotion, className = '' }) {
  const alignClass = align === 'end' ? 'justify-self-end text-left' : 'justify-self-start text-left'

  return (
    <motion.div
      className={`${alignClass} max-w-[290px] self-center ${className}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_DEFAULT}
      transition={{ ...transition.base, delay }}
    >
      <p className="type-eyebrow mb-1 text-[0.65rem]">{eyebrow}</p>
      <p className="text-base leading-relaxed text-neutral-100 md:text-[1.05rem]">{body}</p>
    </motion.div>
  )
}

function MobileFlow({ steps, shouldReduceMotion }) {
  return (
    <div className="flex flex-col md:hidden">
      {steps.map((step, index) => (
        <Fragment key={step.name}>
          <div className="space-y-4 py-4">
            <SideCopy
              eyebrow="What happens"
              body={step.whatHappens}
              align="start"
              delay={index * 0.1}
              shouldReduceMotion={shouldReduceMotion}
            />
            <div className="flex justify-center">
              <FlowStepBox delay={index * 0.12}>
                <StepPill name={step.name} />
              </FlowStepBox>
            </div>
            <SideCopy
              eyebrow="What you get"
              body={step.result}
              align="start"
              delay={index * 0.1 + 0.05}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
          {index < steps.length - 1 ? (
            <FlowConnector delay={index * 0.35} className="min-h-14" />
          ) : null}
        </Fragment>
      ))}
    </div>
  )
}

function DesktopFlow({ steps, shouldReduceMotion }) {
  return (
    <div className="relative z-10 hidden md:grid md:grid-cols-[1fr_auto_1fr] md:grid-rows-3 md:gap-x-4">
      {steps.map((step, index) => (
        <Fragment key={`${step.name}-sides`}>
          <SideCopy
            className={`md:col-start-1 ${ROW_START[index]}`}
            eyebrow="What happens"
            body={step.whatHappens}
            align="end"
            delay={index * 0.1}
            shouldReduceMotion={shouldReduceMotion}
          />
          <SideCopy
            className={`md:col-start-3 ${ROW_START[index]}`}
            eyebrow="What you get"
            body={step.result}
            align="start"
            delay={index * 0.1 + 0.05}
            shouldReduceMotion={shouldReduceMotion}
          />
        </Fragment>
      ))}

      <div className="col-start-2 row-span-3 row-start-1 flex flex-col items-center">
        {steps.map((step, index) => (
          <Fragment key={step.name}>
            <FlowStepBox delay={index * 0.12} className="flex shrink-0 justify-center">
              <StepPill name={step.name} />
            </FlowStepBox>
            {index < steps.length - 1 ? (
              <FlowConnector delay={index * 0.35} className="min-h-20 w-8 flex-1" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default function HowItWorksDiagram({ steps, className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`relative mx-auto mt-4 max-w-6xl px-3 py-2 md:px-5 md:py-3 ${className}`}>
      <div
        aria-hidden
        className="glow-feather-mask full-bleed-layer pointer-events-none bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.008)_45%,transparent_72%)]"
      />
      <MobileFlow steps={steps} shouldReduceMotion={shouldReduceMotion} />
      <DesktopFlow steps={steps} shouldReduceMotion={shouldReduceMotion} />
    </div>
  )
}
