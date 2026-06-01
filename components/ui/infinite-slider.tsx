"use client"

import { useEffect, useState, type ReactNode } from "react"
import { animate, motion, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "framer-motion"
import useMeasure from "react-use-measure"
import { cn } from "@/lib/utils"

type InfiniteSliderProps = {
  children: ReactNode
  className?: string
  gap?: number
  duration?: number
  durationOnHover?: number
  direction?: "horizontal" | "vertical"
  reverse?: boolean
}

export function InfiniteSlider({
  children,
  className,
  gap = 48,
  duration = 30,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
}: InfiniteSliderProps) {
  const [ref, bounds] = useMeasure()
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const translate = useMotionValue(0)
  const size = direction === "horizontal" ? bounds.width : bounds.height
  const activeDuration = isHovered && durationOnHover ? durationOnHover : duration

  useEffect(() => {
    if (shouldReduceMotion || size === 0) {
      translate.set(0)
      return
    }

    const distance = size + gap
    const target = reverse ? distance : -distance
    const controls: AnimationPlaybackControls = animate(translate, [0, target], {
      duration: activeDuration,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    })

    return () => controls.stop()
  }, [activeDuration, gap, reverse, shouldReduceMotion, size, translate])

  const motionStyle = direction === "horizontal" ? { x: translate } : { y: translate }

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cn(
          "flex w-max will-change-transform",
          direction === "vertical" ? "flex-col" : "items-center"
        )}
        style={motionStyle}
      >
        <div
          ref={ref}
          className={cn("flex shrink-0", direction === "vertical" ? "flex-col" : "items-center")}
          style={{ gap }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn("flex shrink-0", direction === "vertical" ? "flex-col" : "items-center")}
          style={direction === "horizontal" ? { gap, marginLeft: gap } : { gap, marginTop: gap }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
