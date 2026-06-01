"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorVariant = "default" | "text" | "link"

const sizes: Record<CursorVariant, number> = {
  default: 28,
  text: 84,
  link: 48,
}

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default")
  const [visible, setVisible] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    if (!finePointer.matches) return

    const move = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const nextVariant: CursorVariant = target?.closest("a, button, [role='button'], .cursor-hover")
        ? "link"
        : target?.closest(".cursor-text, h1, h2, .typewriter-text")
          ? "text"
          : "default"
      const size = sizes[nextVariant]

      setVariant(nextVariant)
      setVisible(true)
      mouseX.set(event.clientX - size / 2)
      mouseY.set(event.clientY - size / 2)
    }

    const hide = () => setVisible(false)
    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", hide)

    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", hide)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        mixBlendMode: variant === "text" ? "difference" : "normal",
      }}
      animate={{
        width: sizes[variant],
        height: sizes[variant],
        opacity: visible ? (variant === "default" ? 0.82 : 1) : 0,
        backgroundColor: variant === "link" ? "rgba(220,232,240,0.12)" : "rgba(255,255,255,1)",
        border: variant === "link" ? "1px solid rgba(220,232,240,0.42)" : "0px solid transparent",
        backdropFilter: variant === "link" ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
    />
  )
}
