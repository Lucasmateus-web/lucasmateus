"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { useLanguage } from "@/lib/i18n"

const typingSpeed = 18
const deletingSpeed = 12
const pauseDuration = 520

export function TypewriterRoles() {
  const shouldReduceMotion = useReducedMotion()
  const { language, t } = useLanguage()
  const roles = t.hero.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setRoleIndex(0)
    setDisplayedText("")
    setIsDeleting(false)
  }, [language])

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(roles[0])
      return
    }

    const currentRole = roles[roleIndex]
    const isWordComplete = displayedText === currentRole
    const isWordDeleted = displayedText.length === 0
    const timeoutDelay = isWordComplete
      ? pauseDuration
      : isDeleting
        ? deletingSpeed
        : typingSpeed

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isWordComplete) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && isWordDeleted) {
        setIsDeleting(false)
        setRoleIndex((currentIndex) => (currentIndex + 1) % roles.length)
        return
      }

      const nextLength = displayedText.length + (isDeleting ? -1 : 1)
      setDisplayedText(currentRole.slice(0, nextLength))
    }, timeoutDelay)

    return () => window.clearTimeout(timeout)
  }, [displayedText, isDeleting, roleIndex, roles, shouldReduceMotion])

  return (
    <p
      aria-label={displayedText || roles[roleIndex]}
      className="typewriter-text cursor-text min-h-[1.25em] font-sans text-xl font-medium text-white/90 md:text-2xl lg:text-3xl"
    >
      <span>{displayedText}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block animate-pulse text-violet"
      >
        |
      </span>
    </p>
  )
}
