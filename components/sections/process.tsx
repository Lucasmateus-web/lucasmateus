"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { premiumEase } from "@/lib/animations"
import { useLanguage } from "@/lib/i18n"
import { processSteps } from "@/lib/portfolio-data"

const createFadeUp = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 28,
    filter: reducedMotion ? "blur(0px)" : "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.65,
      ease: premiumEase,
    },
  },
})

const createStepReveal = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 28,
    scale: reducedMotion ? 1 : 0.98,
    filter: reducedMotion ? "blur(0px)" : "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.65,
      ease: premiumEase,
    },
  },
})

const createStaggerContainer = (reducedMotion: boolean): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: reducedMotion ? 0 : 0.1,
      staggerChildren: reducedMotion ? 0 : 0.1,
    },
  },
})

export function Process() {
  const { t } = useLanguage()
  const localizedSteps = processSteps.map((step, index) => ({
    ...step,
    ...t.process.steps[index],
  }))
  const reducedMotion = Boolean(useReducedMotion())
  const fadeUp = createFadeUp(reducedMotion)
  const stepReveal = createStepReveal(reducedMotion)
  const staggerContainer = createStaggerContainer(reducedMotion)

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-white/40"
          >
            {t.process.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold leading-tight [font-family:var(--font-syne)] sm:text-4xl md:text-5xl"
          >
            {t.process.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-text-secondary"
          >
            {t.process.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:min-h-[390px] lg:grid-cols-4"
        >
          <motion.svg
            viewBox="0 0 1000 160"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 w-full overflow-visible lg:block"
          >
            <defs>
              <linearGradient id="process-line-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(220,232,240,0.16)" />
                <stop offset="52%" stopColor="rgba(220,232,240,0.5)" />
                <stop offset="100%" stopColor="rgba(220,232,240,0.2)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 125 18 L 375 18 C 490 18, 510 138, 625 138 L 875 138"
              fill="none"
              stroke="url(#process-line-gradient)"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reducedMotion ? 0.25 : 1.2, delay: reducedMotion ? 0 : 0.2, ease: premiumEase }}
            />
          </motion.svg>

          {localizedSteps.map((step, index) => (
            <motion.div
              key={`node-${step.number}`}
              initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.35, delay: reducedMotion ? 0 : 0.28 + index * 0.2, ease: premiumEase }}
              className="pointer-events-none absolute z-10 hidden size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#dce8f0]/25 bg-background font-mono text-[10px] tracking-[0.12em] text-[#dce8f0]/75 shadow-[0_0_0_6px_rgba(220,232,240,0.025)] lg:flex"
              style={{ left: `${12.5 + index * 25}%`, top: index < 2 ? 18 : 138 }}
            >
              {step.number}
            </motion.div>
          ))}

          {localizedSteps.map((step, index) => (
            <motion.div key={step.number} variants={stepReveal} className={index < 2 ? "relative lg:mt-14" : "relative lg:mt-44"}>
              <StepCard step={step} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StepCard({
  step,
}: {
  step: { number: string; title: string; description: string }
}) {
  return (
    <article className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_16px_46px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.055] hover:shadow-[0_24px_64px_rgba(0,0,0,0.3)] md:p-7">
      <div className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(120deg,transparent_22%,rgba(255,255,255,0.09)_48%,transparent_72%)] opacity-0 transition-all duration-700 group-hover:translate-x-[120%] group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,232,240,0.09),transparent_38%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <span className="font-mono text-xs tracking-[0.24em] text-white/35">{step.number}</span>
        <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/58">{step.description}</p>
      </div>
    </article>
  )
}
