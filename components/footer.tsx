"use client"

import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n"

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay, ease },
  }),
}

export function Footer() {
  const { t } = useLanguage()
  const contacts = [
    { icon: Mail, label: t.footer.email, value: profile.email, href: `mailto:${profile.email}` },
    { icon: MapPin, label: t.footer.location, value: profile.location },
  ]
  const socials = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ]

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#050507] py-20 sm:py-32 lg:min-h-[620px]">
      <div className="mx-auto max-w-[1620px] px-4 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[1.15fr_0.9fr_1fr] lg:gap-20 xl:gap-28">
          <div>
            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              custom={0}
              className="font-display text-4xl font-semibold tracking-[-0.055em] text-white/[0.16] min-[380px]:text-5xl sm:text-6xl lg:text-7xl xl:text-[74px]"
            >
              {profile.name}
            </motion.h2>

            <div className="mt-12 flex flex-col gap-8 sm:mt-16 sm:gap-11">
              {contacts.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={0.1 + index * 0.08}
                  className="group flex min-w-0 max-w-full items-center gap-4 sm:gap-5"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/[0.035] text-white/80 transition-colors duration-300 group-hover:bg-white/[0.065] group-hover:text-white">
                    <item.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white/35">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block break-all text-sm font-medium text-white/90 transition-colors duration-300 group-hover:text-white min-[420px]:text-base">
                      {item.value}
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={0.28}
            className="lg:pt-[132px]"
          >
            <p className="text-sm font-medium text-white/35">{t.footer.social}</p>
            <div className="mt-3 flex flex-col items-start gap-5">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={0.34 + index * 0.07}
                  className="group inline-flex items-center gap-2 border-b-2 border-white/85 pb-0.5 text-xl font-medium uppercase tracking-[-0.04em] text-white transition-all duration-300 hover:border-white hover:text-white sm:text-2xl"
                >
                  {social.label}
                  <motion.span
                    aria-hidden="true"
                    animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                    transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="inline-flex transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <ArrowUpRight className="size-4.5" />
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={0.62}
            className="flex flex-col lg:pt-[132px]"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-lg font-medium text-white/42 sm:text-xl">{t.footer.createdBy}</p>
              <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{profile.name}</p>
            </div>
            <p className="mt-4 text-lg text-white/48">&copy; 2026</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
