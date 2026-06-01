"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"
import { ArrowDown, Coffee, GitCommit, Github, GitPullRequest, Linkedin } from "lucide-react"
import { siWhatsapp } from "simple-icons/icons"
import { TypewriterRoles } from "@/components/typewriter-roles"
import { CountUp } from "@/components/ui/count-up"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { SplineScene } from "@/components/ui/spline-scene"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg role="img" aria-label="WhatsApp" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={siWhatsapp.path} />
    </svg>
  )
}

const socials = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: WhatsAppIcon, href: profile.whatsappUrl, label: "WhatsApp" },
]
const metrics = [
  { icon: GitCommit, value: 1712 },
  { icon: GitPullRequest, value: 74 },
  { icon: Coffee, value: 449 },
]

const premiumEase = [0.22, 1, 0.36, 1] as const

const createFadeUp = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 24,
    filter: reducedMotion ? "blur(0px)" : "blur(8px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.65,
      delay: reducedMotion ? 0 : delay,
      ease: premiumEase,
    },
  }),
})

const createTitleReveal = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 16,
    filter: reducedMotion ? "blur(0px)" : "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.2 : 0.42,
      ease: premiumEase,
    },
  },
})

const createStaggerContainer = (
  reducedMotion: boolean,
  delayChildren = 0.15,
  staggerChildren = 0.08
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: reducedMotion ? 0 : delayChildren,
      staggerChildren: reducedMotion ? 0 : staggerChildren,
    },
  },
})

const createRobotReveal = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 44,
    rotateX: reducedMotion ? 0 : 10,
    scale: reducedMotion ? 1 : 0.86,
    filter: reducedMotion ? "blur(0px)" : "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.25 : 0.72,
      delay: reducedMotion ? 0 : 0.16,
      ease: premiumEase,
    },
  },
})

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const reducedMotion = Boolean(shouldReduceMotion)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const lastScrollY = useRef(0)
  const fadeUp = createFadeUp(reducedMotion)
  const titleReveal = createTitleReveal(reducedMotion)
  const titleContainer = createStaggerContainer(reducedMotion, 0.15, 0.08)
  const robotReveal = createRobotReveal(reducedMotion)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const difference = currentScrollY - lastScrollY.current

      if (Math.abs(difference) > 4) {
        setShowScrollIndicator(difference < 0 || currentScrollY < 24)
        lastScrollY.current = currentScrollY
      }
    }

    lastScrollY.current = window.scrollY
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.section
      id="inicio"
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className="mx-auto grid w-full max-w-6xl items-center gap-4 px-4 sm:gap-8 sm:px-6 lg:grid-cols-2"
      >
        <div className="flex flex-col gap-6">
          <motion.h1
            variants={titleContainer}
            className="cursor-text flex flex-wrap gap-x-3 text-balance text-4xl font-extrabold leading-[1.02] tracking-normal [font-family:var(--font-sora)] min-[380px]:text-5xl sm:gap-x-4 sm:text-6xl md:text-7xl"
          >
            <motion.span
              variants={titleReveal}
              className="inline-flex bg-[linear-gradient(115deg,#ffffff_0%,#d7dde6_22%,#ffffff_46%,#9aa7b8_68%,#f4f7fb_100%)] bg-clip-text text-transparent drop-shadow-[0_10px_38px_rgba(255,255,255,0.08)]"
            >
              Lucas
            </motion.span>
            <motion.span
              variants={titleReveal}
              className="inline-flex bg-[linear-gradient(115deg,#f8fafc_0%,#aeb9c8_24%,#ffffff_48%,#7c899b_72%,#e8edf5_100%)] bg-clip-text text-transparent drop-shadow-[0_12px_42px_rgba(148,163,184,0.14)]"
            >
              Mateus
            </motion.span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            custom={0.82}
          >
            <TypewriterRoles />
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="max-w-lg text-pretty text-sm leading-relaxed text-text-secondary sm:text-base"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={1.12}
            className="grid grid-cols-1 gap-3 min-[390px]:flex min-[390px]:flex-wrap min-[390px]:items-center"
          >
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <a
                href="#projetos"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 min-[390px]:w-auto"
              >
                {t.hero.projects}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <HoverBorderGradient
                as="a"
                href="#footer"
                clockwise={false}
                className="w-full justify-center border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.065] min-[390px]:w-auto"
              >
                {t.hero.contact}
              </HoverBorderGradient>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1.32}
            className="flex items-center gap-3 pt-2"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="group grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/45 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.055] hover:text-white"
              >
                <social.icon className="size-4" strokeWidth={1.7} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={robotReveal}
          className="relative flex h-[300px] w-full items-center justify-center overflow-visible min-[420px]:h-[360px] sm:h-[500px] lg:h-[620px]"
        >
          <div className="pointer-events-none absolute inset-[-10%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_35%,transparent_70%)]" />
          <div className="pointer-events-none absolute bottom-8 left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-full bg-black/50 blur-3xl" />
          <div className="pointer-events-none absolute bottom-16 left-1/2 h-12 w-[48%] -translate-x-1/2 rounded-full bg-black/40 blur-xl" />

          <div className="relative h-full w-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              deferMs={900}
              className="h-full w-full origin-bottom scale-[0.92] sm:scale-[0.98] lg:scale-[1.02]"
            />
          </div>

          <motion.div
            variants={fadeUp}
            custom={1.35}
            className="absolute right-0 bottom-10 z-20 hidden items-center gap-5 lg:flex xl:-right-8 xl:gap-7"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={t.hero.metrics[index]}
                variants={fadeUp}
                className="group flex min-w-[74px] flex-col items-center text-center"
              >
                <metric.icon className="mb-2 size-4 text-white/35 transition-colors duration-300 group-hover:text-white/70" strokeWidth={1.7} />
                <CountUp
                  end={metric.value}
                  duration={1800}
                  delay={350 + index * 140}
                  replay
                  formatValue={(value) => value.toLocaleString("pt-BR")}
                  className="text-sm font-semibold tracking-tight text-white"
                />
                <span className="mt-1 text-[11px] text-white/40">{t.hero.metrics[index]}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showScrollIndicator ? (
          <motion.a
            href="#sobre"
            aria-label={t.hero.scroll}
            initial={{ opacity: 0, y: -8, scale: 0.92, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.82,
              filter: reducedMotion ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: premiumEase }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/45 transition-colors hover:text-white/75 md:block"
          >
            <span className="relative block h-9 w-6 rounded-full border border-current">
              <motion.span
                className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-current"
                animate={reducedMotion ? undefined : { y: [0, 11, 0], opacity: [0.9, 0.25, 0.9] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6, ease: "easeInOut" }}
              />
            </span>
          </motion.a>
        ) : null}
      </AnimatePresence>
    </motion.section>
  )
}
