"use client"

import { useCallback, useMemo } from "react"
import { useReducedMotion } from "framer-motion"
import Particles, { ParticlesProvider } from "@tsparticles/react"
import type { Engine, ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { cn } from "@/lib/utils"

type SparklesProps = {
  className?: string
  density?: number
  color?: string
  speed?: number
  size?: number
  opacity?: number
  opacitySpeed?: number
}

export function Sparkles({
  className,
  density = 250,
  color = "#ffffff",
  speed = 0.08,
  size = 1,
  opacity = 0.2,
  opacitySpeed = 2,
}: SparklesProps) {
  const shouldReduceMotion = useReducedMotion()
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    await loadSlim(engine)
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: false,
      fpsLimit: 30,
      detectRetina: false,
      particles: {
        color: { value: color },
        move: {
          enable: !shouldReduceMotion,
          speed,
          direction: "none",
          outModes: { default: "out" },
        },
        number: {
          value: density,
          density: {
            enable: true,
            width: 1200,
            height: 100,
          },
        },
        opacity: {
          value: { min: 0.04, max: opacity },
          animation: {
            enable: !shouldReduceMotion,
            speed: opacitySpeed,
            sync: false,
          },
        },
        shape: { type: "circle" },
        size: {
          value: { min: Math.max(0.25, size * 0.35), max: size },
        },
      },
    }),
    [color, density, opacity, opacitySpeed, shouldReduceMotion, size, speed]
  )

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles className={cn("pointer-events-none", className)} options={options} />
    </ParticlesProvider>
  )
}
