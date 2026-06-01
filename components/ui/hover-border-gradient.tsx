"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT"

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
}

const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, rgba(255, 255, 255, 0.88) 0%, rgba(203, 213, 225, 0.5) 42%, rgba(255, 255, 255, 0) 100%)"

type HoverBorderGradientProps<T extends React.ElementType> = {
  as?: T
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">

export function HoverBorderGradient<T extends React.ElementType = "button">({
  children,
  containerClassName,
  className,
  as,
  duration = 1.15,
  clockwise = true,
  ...props
}: HoverBorderGradientProps<T>) {
  const Element = as ?? "button"
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>("BOTTOM")

  useEffect(() => {
    if (hovered) return

    const interval = window.setInterval(() => {
      setDirection((currentDirection) => {
        const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"]
        const currentIndex = directions.indexOf(currentDirection)
        const nextIndex = clockwise
          ? (currentIndex - 1 + directions.length) % directions.length
          : (currentIndex + 1) % directions.length

        return directions[nextIndex]
      })
    }, duration * 1000)

    return () => window.clearInterval(interval)
  }, [clockwise, duration, hovered])

  return (
    <Element
      className={cn(
        "relative inline-flex h-min w-fit overflow-visible rounded-full p-px transition duration-300",
        containerClassName
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <span
        className={cn(
          "relative z-10 inline-flex w-full items-center justify-center rounded-[inherit]",
          className
        )}
      >
        {children}
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0.5 z-[1] rounded-[inherit] bg-background/90"
      />
    </Element>
  )
}
