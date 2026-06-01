"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const createVariants = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 28,
    filter: reducedMotion ? "blur(0px)" : "blur(8px)",
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.7,
      delay: reducedMotion ? 0 : i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
})

interface RevealProps {
  children: ReactNode
  className?: string
  /** stagger index */
  delayIndex?: number
  as?: "div" | "li" | "section" | "span"
}

export function Reveal({ children, className, delayIndex = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as]
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionTag
      className={className}
      custom={delayIndex}
      variants={createVariants(Boolean(shouldReduceMotion))}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  )
}
