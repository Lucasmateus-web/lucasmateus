"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  delay?: number
  replay?: boolean
  className?: string
  formatValue?: (value: number) => string
}

export function CountUp({ end, suffix = "", duration = 1600, delay = 0, replay = false, className, formatValue }: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !started.current) {
          started.current = true
          setValue(0)
          window.setTimeout(() => {
            const start = performance.now()
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(Math.round(eased * end))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }, delay)
        } else if (!entry.isIntersecting && replay) {
          started.current = false
          setValue(0)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, duration, end, replay])

  return (
    <span ref={ref} className={className}>
      {formatValue ? formatValue(value) : value}
      {suffix}
    </span>
  )
}
