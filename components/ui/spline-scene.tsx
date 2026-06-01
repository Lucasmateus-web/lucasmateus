"use client"

import dynamic from "next/dynamic"
import { memo, useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

function RobotPlaceholderComponent({ className }: { className?: string }) {
  return (
    <div className={`${className ?? ""} grid place-items-center`}>
      <div className="relative h-[82%] w-[64%] max-w-[360px] animate-pulse opacity-60">
        <div className="absolute left-1/2 top-[4%] h-[22%] w-[38%] -translate-x-1/2 rounded-[48%] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_45%,rgba(0,0,0,0.46))] shadow-[inset_14px_0_30px_rgba(255,255,255,0.06)]" />
        <div className="absolute left-1/2 top-[26%] h-[38%] w-[48%] -translate-x-1/2 rounded-[40%_40%_34%_34%] bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(0,0,0,0.92)_52%,rgba(255,255,255,0.04))] shadow-[inset_18px_0_36px_rgba(255,255,255,0.05)]" />
        <div className="absolute left-[12%] top-[30%] h-[32%] w-[20%] rotate-[-14deg] rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(0,0,0,0.86))]" />
        <div className="absolute right-[12%] top-[30%] h-[32%] w-[20%] rotate-[14deg] rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(0,0,0,0.86))]" />
        <div className="absolute bottom-[7%] left-[31%] h-[32%] w-[14%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(0,0,0,0.9))]" />
        <div className="absolute bottom-[7%] right-[31%] h-[32%] w-[14%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(0,0,0,0.9))]" />
      </div>
    </div>
  )
}

const RobotPlaceholder = memo(RobotPlaceholderComponent)

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
})

function SplineSceneComponent({
  scene,
  className,
  deferMs = 0,
}: {
  scene: string
  className?: string
  deferMs?: number
}) {
  const shouldReduceMotion = useReducedMotion()
  const [shouldMount, setShouldMount] = useState(deferMs === 0)

  useEffect(() => {
    if (deferMs === 0) return

    const timeout = window.setTimeout(() => {
      const mount = () => setShouldMount(true)

      if (!shouldReduceMotion && "requestIdleCallback" in window) {
        window.requestIdleCallback(mount, { timeout: 900 })
        return
      }

      mount()
    }, deferMs)

    return () => window.clearTimeout(timeout)
  }, [deferMs, shouldReduceMotion])

  if (!shouldMount) {
    return <RobotPlaceholder className={className} />
  }

  return <Spline scene={scene} className={className} />
}

export const SplineScene = memo(SplineSceneComponent)
