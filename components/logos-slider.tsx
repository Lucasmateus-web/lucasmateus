"use client"

import { memo, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  siCss,
  siFigma,
  siFlutter,
  siGit,
  siGooglegemini,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siOpenapiinitiative,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  siClaude,
  type SimpleIcon,
} from "simple-icons/icons"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { Sparkles } from "@/components/ui/sparkles"
import { useLanguage } from "@/lib/i18n"

type Logo = {
  id: string
  icon?: SimpleIcon
  customIcon?: {
    path: string
    viewBox?: string
  }
  label: string
  className: string
}

const chatGptIcon = {
  viewBox: "0 0 16 16",
  path: "M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z",
}

const photoshopIcon = {
  path: "M0 .3v23.4h24V.3H0zm1 1h22v21.4H1V1.3zm4.8 4.48c0-.067.14-.116.224-.116.644-.033 1.588-.05 2.578-.05 2.772 0 3.85 1.52 3.85 3.466 0 2.54-1.842 3.63-4.102 3.63-.38 0-.51-.017-.775-.017v3.842c0 .083-.033.116-.115.116H5.916c-.083 0-.115-.03-.115-.113V5.78zm1.775 5.312c.23.016.412.016.81.016 1.17 0 2.27-.412 2.27-1.996 0-1.27-.786-1.914-2.122-1.914-.396 0-.775.016-.957.033v3.864zm8.607-1.188c-.792 0-1.056.396-1.056.726 0 .363.18.61 1.237 1.155 1.568.76 2.062 1.485 2.062 2.557 0 1.6-1.22 2.46-2.87 2.46-.876 0-1.62-.183-2.05-.43-.065-.033-.08-.082-.08-.165V14.74c0-.1.048-.133.114-.084.624.413 1.352.594 2.012.594.792 0 1.122-.33 1.122-.776 0-.363-.23-.677-1.237-1.205-1.42-.68-2.014-1.37-2.014-2.527 0-1.287 1.006-2.36 2.755-2.36.86 0 1.464.132 1.794.28.082.05.1.132.1.198v1.37c0 .083-.05.133-.15.1-.444-.264-1.1-.43-1.743-.43z",
}

const logos: Logo[] = [
  { id: "react", icon: siReact, label: "React", className: "w-32" },
  { id: "nextjs", icon: siNextdotjs, label: "Next.js", className: "w-32" },
  { id: "typescript", icon: siTypescript, label: "TypeScript", className: "w-32" },
  { id: "javascript", icon: siJavascript, label: "JavaScript", className: "w-32" },
  { id: "flutter", icon: siFlutter, label: "Flutter", className: "w-32" },
  { id: "react-native", icon: siReact, label: "React Native", className: "w-32" },
  { id: "python", icon: siPython, label: "Python", className: "w-32" },
  { id: "sql", icon: siPostgresql, label: "SQL", className: "w-32" },
  { id: "figma", icon: siFigma, label: "Figma", className: "w-32" },
  { id: "tailwind", icon: siTailwindcss, label: "Tailwind CSS", className: "w-32" },
  { id: "github", icon: siGithub, label: "GitHub", className: "w-32" },
  { id: "vercel", icon: siVercel, label: "Vercel", className: "w-32" },
  { id: "html5", icon: siHtml5, label: "HTML5", className: "w-32" },
  { id: "css3", icon: siCss, label: "CSS3", className: "w-32" },
  { id: "git", icon: siGit, label: "Git", className: "w-32" },
  { id: "apis", icon: siOpenapiinitiative, label: "APIs", className: "w-32" },
  { id: "photoshop", customIcon: photoshopIcon, label: "Photoshop", className: "w-36" },
  { id: "chatgpt", customIcon: chatGptIcon, label: "ChatGPT", className: "w-36" },
  { id: "gemini", icon: siGooglegemini, label: "Gemini", className: "w-32" },
  { id: "claude", icon: siClaude, label: "Claude", className: "w-32" },
]

const BrandIcon = memo(function BrandIcon({
  icon,
  customIcon,
  label,
}: {
  icon?: SimpleIcon
  customIcon?: {
    path: string
    viewBox?: string
  }
  label: string
}) {
  if (customIcon) {
    return (
      <svg
        role="img"
        aria-label={label}
        viewBox={customIcon.viewBox ?? "0 0 24 24"}
        className="h-7 w-7 shrink-0"
        fill="currentColor"
      >
        <path d={customIcon.path} />
      </svg>
    )
  }

  if (!icon) {
    return null
  }

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0"
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  )
})

function LogosSliderComponent() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const renderedLogos = useMemo(() => logos, [])

  return (
    <motion.section
      id="habilidades"
      aria-label={t.skills.eyebrow}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.25 : 0.8,
        delay: shouldReduceMotion ? 0 : 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full overflow-hidden py-14 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-52 max-w-3xl bg-[radial-gradient(ellipse_at_center,rgba(220,232,240,0.075),rgba(74,88,98,0.025)_46%,transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dce8f0]/10 to-transparent" />
      <Sparkles
        density={220}
        className="absolute inset-x-0 bottom-0 h-full w-full opacity-20 [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        color="#ffffff"
      />
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#dce8f0]/35 to-transparent" />
          <h2 className="mt-4 bg-gradient-to-b from-[#f4f8fa] via-[#dce8f0] to-[#a7b5bf]/70 bg-clip-text font-display text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
            {t.skills.title}
          </h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-[#dce8f0]/40 to-transparent" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#dce8f0]/45">
            {t.skills.description}
          </p>
        </div>
        <div className="relative h-[100px] w-full">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={48}
          >
            {renderedLogos.map(({ id, icon, customIcon, label, className }) => (
              <div
                key={id}
                className={`${className} group flex items-center justify-center gap-3 text-[#dce8f0]/42 transition-colors duration-300 hover:text-[#f4f8fa]/90`}
                title={label}
              >
                <BrandIcon icon={icon} customIcon={customIcon} label={label} />
                <span className="whitespace-nowrap font-sans text-sm font-medium leading-none">
                  {label}
                </span>
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[72px] sm:w-[140px] lg:w-[200px]"
            direction="left"
            blurLayers={4}
            blurIntensity={1}
          />

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[72px] sm:w-[140px] lg:w-[200px]"
            direction="right"
            blurLayers={4}
            blurIntensity={1}
          />
        </div>
      </div>
    </motion.section>
  )
}

export const LogosSlider = memo(LogosSliderComponent)
