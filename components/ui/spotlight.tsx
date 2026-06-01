"use client"

import { useRef, useState, type MouseEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** spotlight color, defaults to violet */
  color?: string
}

/**
 * A card that reveals a soft radial glow following the cursor.
 * Pure CSS variables + pointer tracking, no re-render per frame.
 */
export function SpotlightCard({
  children,
  className,
  color = "rgba(167, 139, 250, 0.15)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(0)

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(420px circle at var(--x) var(--y), ${color}, transparent 65%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
