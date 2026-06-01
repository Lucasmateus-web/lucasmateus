"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/ui/reveal"
import { skillGroups } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"

export function Skills() {
  return (
    <section id="habilidades" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Habilidades"
          title="Tecnologias que domino"
          description="Um stack versátil que cobre todo o ciclo de desenvolvimento, do front-end ao back-end, dados e mobile."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delayIndex={gi}>
              <div className="flex h-full cursor-pointer flex-col gap-5 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        group.accent === "violet" ? "bg-violet" : "bg-mint",
                      )}
                    />
                    <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{group.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="font-mono text-xs text-text-secondary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            group.accent === "violet"
                              ? "bg-gradient-to-r from-violet to-violet/60"
                              : "bg-gradient-to-r from-mint to-mint/60",
                          )}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
