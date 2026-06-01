"use client"

import { motion, useReducedMotion } from "framer-motion"
import { techStack } from "@/lib/portfolio-data"

export function TechMarquee() {
  const shouldReduceMotion = useReducedMotion()
  const items = [...techStack, ...techStack]

  return (
    <motion.section
      aria-label="Tecnologias"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.25 : 0.8,
        delay: shouldReduceMotion ? 0 : 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative border-y border-border py-6"
    >
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-display text-xl font-semibold text-text-secondary transition-colors hover:text-foreground sm:text-2xl"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
