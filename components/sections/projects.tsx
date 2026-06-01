"use client"

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, BarChart3, Bell, Bot, Check, ExternalLink, Github, HeartPulse, LayoutTemplate, Mail, Play, Send, Smartphone, Workflow } from "lucide-react"
import {
  siDart,
  siFirebase,
  siFigma,
  siFlutter,
  siCss,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siOpenjdk,
  siPython,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons/icons"
import { SectionHeading } from "@/components/section-heading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  portfolioProjects,
  type PortfolioProject,
} from "@/lib/project-data"
import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const cardReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
}

const technologyIcons: Partial<Record<string, SimpleIcon>> = {
  Dart: siDart,
  Firebase: siFirebase,
  Figma: siFigma,
  Flutter: siFlutter,
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  "Next.js": siNextdotjs,
  Java: siOpenjdk,
  Python: siPython,
  SQL: siPostgresql,
  React: siReact,
  Supabase: siSupabase,
  Tailwind: siTailwindcss,
  "Tailwind CSS": siTailwindcss,
  TypeScript: siTypescript,
}

export function Projects() {
  const { t } = useLanguage()
  const localizedProjects = portfolioProjects.map((project, index) => ({
    ...project,
    ...t.projects.items[index],
    features: [...t.projects.items[index].features],
  })) as PortfolioProject[]
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackViewportRef = useRef<HTMLDivElement>(null)
  const reducedMotion = Boolean(useReducedMotion())
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollDistance, setScrollDistance] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -scrollDistance],
  )
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(Math.round(latest * (localizedProjects.length - 1)))
  })

  useEffect(() => {
    const track = trackRef.current
    const viewport = trackViewportRef.current
    if (!track || !viewport) return

    const updateDistance = () => {
      setScrollDistance(Math.max(0, track.scrollWidth - viewport.clientWidth))
    }

    updateDistance()
    const observer = new ResizeObserver(updateDistance)
    observer.observe(track)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projetos"
      style={{ "--projects-scroll-distance": `${scrollDistance}px` } as CSSProperties}
      className="relative py-20 sm:py-32 lg:h-[calc(100vh+var(--projects-scroll-distance))] lg:py-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-48 mx-auto h-80 max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(220,232,240,0.055),transparent_68%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:hidden">
        <SectionHeading
          title={t.projects.title}
          description={t.projects.description}
        />

        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {localizedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardReveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-[86vw] max-w-[520px] shrink-0 snap-center"
            >
              <ProjectCard
                project={project}
                number={String(index + 1).padStart(2, "0")}
                onOpen={() => setSelectedIndex(index)}
                featured
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto shrink-0 max-w-2xl py-2 text-center"
          >
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">{t.projects.title}</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-text-secondary">
              {t.projects.description}
            </p>
          </motion.div>

          <div ref={trackViewportRef} className="mt-5">
            <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-20 pl-[1vw]">
              {localizedProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className={cn(
                    "w-[68vw] max-w-[780px] shrink-0 transition-all duration-500",
                    activeIndex === index ? "scale-100 opacity-100" : "scale-[0.96] opacity-55",
                  )}
                >
                  <ProjectCard
                    project={project}
                    number={String(index + 1).padStart(2, "0")}
                    active={activeIndex === index}
                    onOpen={() => setSelectedIndex(index)}
                    featured
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 overflow-hidden bg-white/[0.08]">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-[#dce8f0]/55" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">{t.projects.scroll}</span>
            </div>
          </div>
        </div>
      </div>

      <ProjectDialog
        project={selectedIndex === null ? null : localizedProjects[selectedIndex]}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      />
    </section>
  )
}

function ProjectCard({
  project,
  onOpen,
  number,
  active = true,
  featured = false,
  compact = false,
}: {
  project: PortfolioProject
  onOpen: () => void
  number?: string
  active?: boolean
  featured?: boolean
  compact?: boolean
}) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const element = ref.current
    if (!element || window.matchMedia("(pointer: coarse)").matches) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty("--rotate-x", `${-y * 5}deg`)
    element.style.setProperty("--rotate-y", `${x * 6}deg`)
    element.style.setProperty("--glow-x", `${event.clientX - rect.left}px`)
    element.style.setProperty("--glow-y", `${event.clientY - rect.top}px`)
  }

  function resetTilt() {
    ref.current?.style.setProperty("--rotate-x", "0deg")
    ref.current?.style.setProperty("--rotate-y", "0deg")
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <div className="cursor-pointer">
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className={cn(
          "group relative cursor-pointer outline-none transition-all duration-500",
          active ? "opacity-100" : "opacity-80",
        )}
      >
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-5xl font-semibold tracking-tight text-white/[0.15] md:text-6xl">{number}</span>
          <span className="h-px w-16 bg-white/12" />
        </div>
        <ProjectPreview project={project} featured={featured} compact={compact} />
        <div className="relative pt-7">
          <div className="flex items-center justify-end gap-3">
            <span className="grid size-9 place-items-center text-white/45 transition-all duration-300 group-hover:text-white">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:mt-5 sm:text-3xl">{project.title}</h3>
          <p className={cn("mt-3 max-w-2xl text-sm leading-relaxed text-white/58 sm:text-base", compact && "line-clamp-3")}>{project.description}</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <TechnologyIcon key={tag} tag={tag} />
              ))}
            </div>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-[#dce8f0]/55 transition-colors group-hover:text-[#f4f8fa]">
              {t.projects.details}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectPreview({
  project,
  featured = false,
  compact = false,
}: {
  project: PortfolioProject
  featured?: boolean
  compact?: boolean
}) {
  const { t } = useLanguage()
  const accentClass = project.accent === "violet" ? "bg-violet" : "bg-mint"
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-transparent transition-all duration-500 group-hover:-translate-y-1.5",
        featured ? "h-[clamp(190px,29vh,330px)]" : compact ? "h-48" : "h-64",
      )}
    >
      <div className={cn("absolute -right-12 -top-14 size-36 rounded-full opacity-10 blur-3xl", accentClass)} />
      {project.cover ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black/35 transition-transform duration-500 group-hover:scale-[1.015]">
          <img
            src={project.cover}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
          />
          <img
            src={project.cover}
            alt={`${t.projects.preview.coverAlt} ${project.title}`}
            className="relative z-10 h-full w-full object-contain object-center"
          />
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/12 via-transparent to-black/[0.04]" />
        </div>
      ) : (
      <div className="absolute inset-0 overflow-hidden bg-white/[0.025] p-5 transition-transform duration-500 group-hover:scale-[1.015]">
        {project.title === "GlicLog" ? <GlucosePreview /> : null}
        {project.preview === "portal" ? <SupplierPreview /> : null}
        {project.preview === "dashboard" ? <DashboardPreview /> : null}
        {project.preview === "automation" ? <AutomationPreview /> : null}
        {project.preview === "website" ? <WebsitePreview title={project.title} accentClass={accentClass} /> : null}
      </div>
      )}
    </div>
  )
}

function PreviewToolbar({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/10" />
      </div>
      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/28">{label}</span>
    </div>
  )
}

function FitnessPreview() {
  const { t } = useLanguage()
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="h-full w-24 rounded-[18px] border border-white/15 bg-black/75 p-2 shadow-2xl">
        <div className="flex items-center justify-between"><Smartphone className="size-3 text-white/35" /><span className="size-2 rounded-full bg-mint/70" /></div>
        <p className="mt-3 text-[8px] font-semibold text-white/80">{t.projects.preview.workout}</p>
        <div className="mt-2 rounded-lg bg-violet/25 p-2"><div className="h-1.5 w-10 rounded bg-white/45" /><div className="mt-1 h-1 w-7 rounded bg-white/20" /></div>
        <div className="mt-2 flex items-end gap-1">{[45, 72, 55, 84, 62].map((height) => <span key={height} className="w-1.5 rounded-t bg-mint/60" style={{ height }} />)}</div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-mint/80 py-1 text-[7px] font-bold text-black"><Play className="size-2" />{t.projects.preview.start}</div>
      </div>
      <div className="hidden space-y-2 sm:block">
        <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-mint/60">NexFit</span>
        <div className="h-1.5 w-24 rounded bg-white/15" /><div className="h-1.5 w-16 rounded bg-white/10" />
      </div>
    </div>
  )
}

function GlucosePreview() {
  const { t } = useLanguage()
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <div className="h-full w-24 rounded-[18px] border border-white/15 bg-black/75 p-2 shadow-2xl">
        <HeartPulse className="size-3 text-mint/70" />
        <p className="mt-3 text-[8px] text-white/40">{t.projects.preview.glucose}</p>
        <p className="text-base font-bold text-white">102<span className="ml-1 text-[7px] font-normal text-white/35">mg/dL</span></p>
        <div className="mt-2 flex h-9 items-end gap-1 border-b border-white/10">{[36, 56, 42, 70, 52, 62].map((height) => <span key={height} className="w-1.5 rounded-t bg-mint/55" style={{ height: `${height}%` }} />)}</div>
        <div className="mt-2 rounded-md bg-mint/10 p-1.5 text-[7px] text-mint/75">{t.projects.preview.onTarget}</div>
      </div>
      <div className="hidden space-y-2 sm:block"><div className="rounded-lg bg-white/[0.045] p-2"><div className="h-1.5 w-16 rounded bg-white/15" /><div className="mt-2 h-1 w-12 rounded bg-mint/45" /></div><div className="rounded-lg bg-white/[0.045] p-2"><div className="h-1.5 w-20 rounded bg-white/15" /></div></div>
    </div>
  )
}

function SupplierPreview() {
  const { t } = useLanguage()
  return (
    <div className="h-full">
      <PreviewToolbar label={t.projects.preview.suppliers} />
      <div className="mt-3 grid grid-cols-3 gap-2">{[`32 ${t.projects.preview.active}`, `08 ${t.projects.preview.pending}`, `94% ${t.projects.preview.valid}`].map((item) => <div key={item} className="rounded-md bg-white/[0.045] p-2 text-[8px] text-white/50">{item}</div>)}</div>
      <div className="mt-3 space-y-1.5">{["Alfa Industrial", "Norte Log", "Vetor Suprimentos"].map((item, index) => <div key={item} className="flex items-center gap-2 rounded-md border border-white/[0.05] px-2 py-1.5"><span className={cn("size-1.5 rounded-full", index === 1 ? "bg-violet/70" : "bg-mint/70")} /><span className="flex-1 text-[8px] text-white/42">{item}</span><span className="text-[7px] text-white/25">{index === 1 ? t.projects.preview.review : t.projects.preview.approved}</span></div>)}</div>
    </div>
  )
}

function DashboardPreview() {
  const { t } = useLanguage()
  return (
    <div className="h-full">
      <PreviewToolbar label={t.projects.preview.indicators} />
      <div className="mt-3 grid grid-cols-3 gap-2">{["84%", "1.2k", "+18%"].map((item) => <div key={item} className="rounded-md bg-white/[0.045] p-2 text-sm font-semibold text-white/65">{item}</div>)}</div>
      <div className="mt-3 grid grid-cols-[1fr_68px] gap-2"><div className="flex h-16 items-end gap-1 rounded-lg bg-white/[0.035] p-2">{[36, 56, 42, 76, 58, 88, 68].map((height) => <span key={height} className="flex-1 rounded-t bg-violet/55" style={{ height: `${height}%` }} />)}</div><div className="grid place-items-center rounded-lg bg-white/[0.035]"><BarChart3 className="size-7 text-mint/55" /></div></div>
    </div>
  )
}

function AutomationPreview() {
  const { t } = useLanguage()
  const nodes = [{ icon: Send, label: "Telegram" }, { icon: Bot, label: t.projects.preview.process }, { icon: Mail, label: "E-mail" }, { icon: Bell, label: t.projects.preview.alert }]
  return (
    <div className="flex h-full items-center justify-center gap-2">
      {nodes.map(({ icon: Icon, label }, index) => <div key={label} className="flex items-center gap-2"><div className="rounded-xl border border-white/[0.08] bg-white/[0.045] p-3 text-center"><Icon className={cn("mx-auto size-4", index === 1 ? "text-violet/75" : "text-mint/65")} /><span className="mt-2 block text-[7px] text-white/35">{label}</span></div>{index < nodes.length - 1 ? <span className="h-px w-4 bg-white/15" /> : null}</div>)}
    </div>
  )
}

function WebsitePreview({ title, accentClass }: { title: string; accentClass: string }) {
  const isForest = title === "Verde Floresta"
  return (
    <div className="h-full">
      <PreviewToolbar label={title} />
      <div className="mt-3 grid grid-cols-[1fr_42%] gap-3">
        <div>
          <div className={cn("h-2.5 w-2/3 rounded opacity-55", isForest ? "bg-mint" : accentClass)} />
          <div className="mt-3 h-1.5 w-full rounded bg-white/15" /><div className="mt-2 h-1.5 w-4/5 rounded bg-white/10" />
          <div className="mt-4 h-5 w-16 rounded-full border border-white/10 bg-white/[0.05]" />
        </div>
        <div className={cn("rounded-xl opacity-45", isForest ? "bg-[radial-gradient(circle_at_top,#34d399,transparent_70%)]" : "bg-[radial-gradient(circle_at_top,#a78bfa,transparent_70%)]")} />
      </div>
    </div>
  )
}

function ProjectDialog({ project, onOpenChange }: { project: PortfolioProject | null; onOpenChange: (open: boolean) => void }) {
  const { t } = useLanguage()

  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      {project ? (
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-3xl border-white/[0.12] bg-[#080808]/95 p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
          <ProjectPreview project={project} featured />
          <DialogHeader className="px-1 pt-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-violet/80">{project.category}</span>
            <DialogTitle className="font-display text-2xl text-white sm:text-3xl">{project.title}</DialogTitle>
            <DialogDescription className="leading-relaxed text-white/55">{project.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 px-1 pt-2 sm:grid-cols-2">
            <DetailBlock title={t.projects.about} text={project.objective} />
            <DetailBlock title={t.projects.role} text={project.role} />
            <div>
              <h4 className="text-sm font-semibold text-white">{t.projects.technologies}</h4>
              <div className="mt-3 flex flex-wrap gap-2">{project.tags.map((tag) => <TechnologyIcon key={tag} tag={tag} showLabel />)}</div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{t.projects.features}</h4>
              <ul className="mt-3 space-y-2">{project.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-white/55"><Check className="size-3.5 text-mint/75" />{feature}</li>)}</ul>
            </div>
          </div>
          {project.link || project.github ? <div className="flex flex-wrap gap-3 px-1 pt-2">
            {project.link ? <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"><ExternalLink className="size-4" />{t.projects.viewProject}</a> : null}
            {project.github ? <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75"><Github className="size-4" />{t.projects.viewCode}</a> : null}
          </div> : null}
        </DialogContent>
      ) : null}
    </Dialog>
  )
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return <div><h4 className="text-sm font-semibold text-white">{title}</h4><p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p></div>
}

function TechnologyIcon({ tag, showLabel = false }: { tag: string; showLabel?: boolean }) {
  const icon = technologyIcons[tag]
  const fallback = getFallbackTechnologyIcon(tag)

  return (
    <span
      title={tag}
      aria-label={tag}
      className={cn(
        "inline-flex items-center justify-center gap-2 text-[#dce8f0]/62 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#f4f8fa]",
        showLabel ? "py-1" : "size-9",
      )}
    >
      {icon ? (
        <svg role="img" aria-hidden="true" viewBox="0 0 24 24" className={showLabel ? "size-5" : "size-6"} fill="currentColor">
          <path d={icon.path} />
        </svg>
      ) : (
        fallback
      )}
      {showLabel ? <span className="font-mono text-[10px]">{tag}</span> : null}
    </span>
  )
}

function getFallbackTechnologyIcon(tag: string) {
  if (tag === "Mobile") return <Smartphone className="size-6" />
  if (tag === "UI/UX" || tag === "Produto" || tag === "Design" || tag === "Web") {
    return <LayoutTemplate className="size-6" />
  }
  if (tag === "Dashboard" || tag === "Power BI" || tag === "Dados") {
    return <BarChart3 className="size-6" />
  }
  return <Workflow className="size-6" />
}
