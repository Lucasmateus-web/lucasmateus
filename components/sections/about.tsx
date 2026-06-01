"use client"

import { Code2, Sparkles, Zap } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/ui/reveal"
import { CountUp } from "@/components/ui/count-up"
import { SpotlightCard } from "@/components/ui/spotlight"
import { stats } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n"

const highlightIcons = [Code2, Sparkles, Zap]

export function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow={t.about.eyebrow}
            titleClassName="max-w-xl [font-family:var(--font-syne)] text-3xl font-bold leading-[1.08] tracking-[-0.025em] min-[420px]:text-4xl sm:text-5xl"
            title={t.about.title}
            description={t.about.description}
          />

          <div className="flex flex-col gap-4">
            {t.about.highlights.map((item, i) => {
              const Icon = highlightIcons[i]
              return (
              <Reveal key={item.title} delayIndex={i}>
                <SpotlightCard className="p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-violet">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 md:gap-x-12 md:gap-y-10">
          {stats.map((stat, i) => (
            <Reveal key={t.about.stats[i].label} delayIndex={i} className="flex w-full justify-center">
              <div className="group flex min-h-[128px] w-full max-w-[360px] cursor-pointer flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                <CountUp
                  end={stat.value}
                  suffix={t.about.stats[i].suffix}
                  className="max-w-full whitespace-nowrap bg-[linear-gradient(115deg,#ffffff_0%,#e9edf5_42%,#b8a5ff_72%,#87f0dd_100%)] bg-clip-text font-display text-5xl font-extrabold tracking-tight text-transparent drop-shadow-[0_8px_26px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:drop-shadow-[0_12px_34px_rgba(167,139,250,0.24)] md:text-6xl"
                />
                <div className="mt-4 h-px w-14 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300 group-hover:w-20 group-hover:via-violet/45" />
                <p className="mt-4 text-sm font-medium leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/80 md:text-base">
                  {t.about.stats[i].label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
