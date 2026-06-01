"use client"

import { MeshGradient } from "@paper-design/shaders-react"

/**
 * Full-page ambient background.
 * A slow matte-black mesh-gradient shader sits behind everything, topped
 * with a fine grain + vignette so foreground content stays legible.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-35"
        colors={["#020202", "#050505", "#0a0a0a", "#111111", "#171717"]}
        distortion={0.42}
        swirl={0.32}
        speed={0.16}
        scale={1.12}
      />
      {/* Deep vignette to ground the gradient into pure black at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_12%,transparent_0%,rgba(2,2,2,0.72)_48%,#020202_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.025)_42%,#020202_100%)]" />
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
