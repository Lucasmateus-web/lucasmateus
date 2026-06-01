"use client"

import { motion } from "framer-motion"

const orbits = [
  { label: "React", radius: 150, duration: 18, delay: 0, accent: "violet" },
  { label: "Next.js", radius: 150, duration: 18, delay: -6, accent: "mint" },
  { label: "Python", radius: 150, duration: 18, delay: -12, accent: "violet" },
  { label: "Flutter", radius: 220, duration: 26, delay: -4, accent: "mint" },
  { label: "TypeScript", radius: 220, duration: 26, delay: -17, accent: "violet" },
]

const codeLines = [
  { w: "70%", c: "text-violet" },
  { w: "45%", c: "text-text-secondary" },
  { w: "88%", c: "text-mint" },
  { w: "60%", c: "text-text-secondary" },
  { w: "52%", c: "text-violet" },
]

export function HeroVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* Glow */}
      <div className="absolute size-72 rounded-full bg-violet/20 blur-[90px]" />
      <div className="absolute right-10 top-16 size-40 rounded-full bg-mint/20 blur-[70px]" />

      {/* Orbit rings */}
      {[150, 220].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-border"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}

      {/* Orbiting badges */}
      {orbits.map((o) => (
        <motion.div
          key={o.label}
          className="absolute"
          style={{ width: o.radius * 2, height: o.radius * 2 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: o.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: o.delay,
          }}
          initial={{ rotate: (o.delay / o.duration) * -360 }}
        >
          <motion.span
            className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full border border-border bg-card/90 px-3 py-1 font-mono text-xs backdrop-blur-sm ${
              o.accent === "violet" ? "text-violet" : "text-mint"
            }`}
            animate={{ rotate: -360 }}
            transition={{
              duration: o.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: o.delay,
            }}
          >
            {o.label}
          </motion.span>
        </motion.div>
      ))}

      {/* Center code card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="relative z-10 w-60 rounded-2xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-mint/70" />
          <span className="size-2.5 rounded-full bg-violet/70" />
          <span className="ml-2 font-mono text-[10px] text-text-secondary">dev.tsx</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {codeLines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-text-secondary/50">{i + 1}</span>
              <span className={`h-2 rounded-full ${line.c} bg-current`} style={{ width: line.w }} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
