"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type ProgressiveBlurProps = {
  className?: string
  direction?: "left" | "right" | "top" | "bottom"
  blurLayers?: number
  blurIntensity?: number
}

export function ProgressiveBlur({
  className,
  direction = "left",
  blurLayers = 6,
  blurIntensity = 1,
}: ProgressiveBlurProps) {
  const gradientDirection = {
    left: "to right",
    right: "to left",
    top: "to bottom",
    bottom: "to top",
  }[direction]

  return (
    <div className={cn("overflow-hidden", className)}>
      {Array.from({ length: blurLayers }).map((_, index) => {
        const layer = index + 1
        const blur = Math.pow(2, index) * 0.5 * blurIntensity
        const start = Math.max(0, (index / blurLayers) * 76 - 8)
        const mid = Math.min(100, start + 28)
        const end = Math.min(100, mid + 20)

        return (
          <motion.div
            key={layer}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: `linear-gradient(${gradientDirection}, black ${start}%, black ${mid}%, transparent ${end}%)`,
              WebkitMaskImage: `linear-gradient(${gradientDirection}, black ${start}%, black ${mid}%, transparent ${end}%)`,
            }}
          />
        )
      })}
    </div>
  )
}
