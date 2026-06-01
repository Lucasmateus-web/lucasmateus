"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { education, experiences } from "@/lib/portfolio-data"

const ease = [0.22, 1, 0.36, 1] as const

const createFadeUp = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 24,
    filter: reducedMotion ? "blur(0px)" : "blur(8px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.65,
      delay: reducedMotion ? 0 : delay,
      ease,
    },
  }),
})

const createCardScrollReveal = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 40,
    scale: reducedMotion ? 1 : 0.98,
    filter: reducedMotion ? "blur(0px)" : "blur(8px)",
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.6,
      delay: reducedMotion ? 0 : index * 0.08,
      ease,
    },
  }),
})

export function Experience() {
  const { t } = useLanguage()
  const localizedExperiences = experiences.map((experience, index) => ({
    ...experience,
    ...t.experience.items[index],
  }))
  const localizedEducation = education.map((item, index) => ({
    ...item,
    ...t.education.items[index],
    period: index === 0 ? t.education.inProgress : t.education.completed,
  }))
  const shouldReduceMotion = useReducedMotion()
  const reducedMotion = Boolean(shouldReduceMotion)
  const fadeUp = createFadeUp(reducedMotion)
  const cardScrollReveal = createCardScrollReveal(reducedMotion)

  return (
    <section id="experiencia" className="relative pt-24 pb-20 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <motion.h2
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="font-display text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            {t.experience.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-2xl text-pretty leading-relaxed text-text-secondary"
          >
            {t.experience.description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-12 sm:mt-20 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            custom={0.24}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="mb-7 font-mono text-xs uppercase tracking-[0.24em] text-white/45">
              <span className="mr-3 text-violet/80">•</span>
              {t.experience.work}
            </h3>

            <motion.ol
              className="relative space-y-6 pl-6"
            >
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reducedMotion ? 0.25 : 0.8, ease }}
                className="absolute left-0 top-0 h-full w-px origin-top bg-white/[0.08]"
              />
              {localizedExperiences.map((exp, index) => (
                <motion.li
                  key={exp.role}
                  custom={index}
                  variants={cardScrollReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  className="relative"
                >
                  <span className="absolute -left-[29px] top-6 size-2.5 rounded-full border border-violet/35 bg-background shadow-[0_0_0_4px_rgba(167,139,250,0.05)]" />
                  <article className="cursor-pointer rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04] md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-lg font-semibold text-white">
                        {exp.role}
                      </h4>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/35">
                        {exp.period}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-violet/80">{exp.company}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/58">
                      {exp.description}
                    </p>
                  </article>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.32}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="mb-7 font-mono text-xs uppercase tracking-[0.24em] text-white/45">
              <span className="mr-3 text-mint/80">•</span>
              {t.education.title}
            </h3>

            <motion.div
              className="flex flex-col gap-5"
            >
              {localizedEducation.map((edu, index) => (
                <motion.article
                  key={edu.course}
                  custom={index}
                  variants={cardScrollReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  className="flex cursor-pointer items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04] md:p-6"
                >
                  <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-mint/80">
                    <GraduationCap className="size-4" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-lg font-semibold text-white">
                        {edu.course}
                      </h4>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/35">
                        {edu.period}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-mint/80">{edu.institution}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/58">
                      {edu.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
