"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const premiumEase = [0.22, 1, 0.36, 1] as const
const portfolio = "portfólio"

export function IntroScreen({ onComplete }: { onComplete?: () => void }) {
  const shouldReduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [typedLength, setTypedLength] = useState(shouldReduceMotion ? portfolio.length : 0)

  useEffect(() => {
    const closeIntro = () => setVisible(false)
    const timeout = window.setTimeout(
      closeIntro,
      shouldReduceMotion ? 900 : portfolio.length * 115 + 1500,
    )

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeIntro)

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener("keydown", closeIntro)
      document.body.style.overflow = ""
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedLength(portfolio.length)
      return
    }

    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTypedLength((currentLength) => {
          if (currentLength >= portfolio.length) {
            window.clearInterval(interval)
            return currentLength
          }

          return currentLength + 1
        })
      }, 115)
    }, 520)

    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ""
    }
  }, [visible])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          role="presentation"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : "-5%",
            filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.72, ease: premiumEase }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-[#020202]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.055),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: shouldReduceMotion ? 0 : 0.2,
                  staggerChildren: shouldReduceMotion ? 0 : 0.16,
                },
              },
            }}
            className="relative flex flex-col items-center px-6 text-center"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: premiumEase },
                },
              }}
              className="mb-2 text-xs font-medium tracking-[0.24em] text-white/40 sm:text-sm"
            >
              Bem-vindo ao meu
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: premiumEase },
                },
              }}
              className="bg-[linear-gradient(115deg,#ffffff_0%,#c5cbd3_35%,#ffffff_62%,#8d96a3_100%)] bg-clip-text [font-family:var(--font-syne)] text-6xl font-semibold tracking-[-0.09em] text-transparent drop-shadow-[0_10px_36px_rgba(255,255,255,0.1)] sm:text-8xl md:text-9xl"
            >
              <span className="sr-only">{portfolio}</span>
              <span aria-hidden="true">
                {portfolio.slice(0, typedLength)}
                <motion.span
                  animate={{ opacity: [1, 0.18, 1] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="ml-[0.08em] inline-block h-[0.8em] w-[0.035em] translate-y-[0.06em] bg-white/70"
                />
              </span>
            </motion.h1>

            <motion.span
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: {
                  opacity: 1,
                  scaleX: 1,
                  transition: { duration: 0.8, ease: premiumEase },
                },
              }}
              className="mt-6 h-px w-20 origin-center bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
