"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { navLinks, profile } from "@/lib/portfolio-data"
import { useLanguage, type Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const languages: Language[] = ["pt", "en", "es"]

function LanguageSelector({
  language,
  setLanguage,
}: {
  language: Language
  setLanguage: (language: Language) => void
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.025] p-1 backdrop-blur-md">
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          className={cn(
            "cursor-pointer rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
            language === item
              ? "bg-white/[0.12] text-white"
              : "text-white/40 hover:text-white/80",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState("#inicio")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) {
          setActiveHref(`#${visibleSection.target.id}`)
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    )

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href)
      if (section) observer.observe(section)
    })

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  function handleScrollTo(href: string) {
    const section = document.querySelector(href)
    if (!section) return

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setActiveHref(href)
    setOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "pt-4" : "pt-6",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled ? "opacity-100" : "opacity-90",
        )}
      >
        <a
          href="#inicio"
          onClick={(event) => {
            event.preventDefault()
            handleScrollTo("#inicio")
          }}
          className="group flex items-center"
        >
          <span className="grid size-14 place-items-center overflow-hidden sm:size-[72px] lg:size-20">
            <img
              src="/Logo.png"
              alt={profile.name}
              className="size-full scale-[1.16] object-contain opacity-95 transition-all duration-300 group-hover:scale-[1.2] group-hover:opacity-100"
            />
          </span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex xl:gap-2">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                handleScrollTo(link.href)
              }}
              aria-current={activeHref === link.href ? "page" : undefined}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:rounded-full before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.12),transparent)] before:transition-transform before:duration-500 after:absolute after:bottom-0 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-white/75 after:transition-all after:duration-300 hover:bg-white/[0.045] hover:text-white hover:before:translate-x-full",
                activeHref === link.href
                  ? "bg-white/[0.055] text-white after:w-7"
                  : "text-white/55 after:w-0 hover:after:w-7",
              )}
            >
              {t.nav[index]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label={open ? t.menu.close : t.menu.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 cursor-pointer place-items-center text-white/80 transition-colors duration-300 hover:text-white"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 flex max-w-6xl justify-end px-4 sm:px-6 lg:hidden">
          <nav className="flex w-full flex-col gap-1 border-t border-white/[0.1] bg-black/45 py-2 backdrop-blur-md">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  handleScrollTo(link.href)
                }}
                aria-current={activeHref === link.href ? "page" : undefined}
                className={cn(
                  "cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-300",
                  activeHref === link.href
                    ? "text-white"
                    : "text-white/55 hover:text-white",
                )}
              >
                {t.nav[index]}
              </a>
            ))}
            <div className="mt-2 border-t border-white/[0.08] px-4 pt-4 pb-2">
              <LanguageSelector language={language} setLanguage={setLanguage} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
