"use client"

import { useState, type FormEvent } from "react"
import { Check, Github, Linkedin, MapPin, Send } from "lucide-react"
import { siWhatsapp } from "simple-icons/icons"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/ui/reveal"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg role="img" aria-label="WhatsApp" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={siWhatsapp.path} />
    </svg>
  )
}

export function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const contactItems = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: profile.whatsapp, href: profile.whatsappUrl },
    { icon: MapPin, label: t.contact.location, value: t.contact.locationValue },
    { icon: Github, label: "GitHub", value: "@Lucasmateus-web", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: "in/lucas-mateus-b8abaa30b", href: profile.linkedin },
  ]

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    e.currentTarget.reset()
  }

  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactItems.map((item, i) => {
              const content = (
                <div className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-colors hover:border-violet/50">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-violet">
                    <item.icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                      {item.label}
                    </p>
                    <p className="truncate text-sm text-foreground">{item.value}</p>
                  </div>
                </div>
              )
              return (
                <Reveal key={item.label} delayIndex={i}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal delayIndex={1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.contact.name} name="name">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder={t.contact.yourName}
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-secondary focus:border-violet"
                  />
                </Field>
                <Field label="Email" name="email">
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="voce@email.com"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-secondary focus:border-violet"
                  />
                </Field>
              </div>
              <Field label={t.contact.subject} name="subject">
                <input
                  required
                  name="subject"
                  type="text"
                  placeholder={t.contact.subjectPlaceholder}
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-secondary focus:border-violet"
                />
              </Field>
              <Field label={t.contact.message} name="message">
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-secondary focus:border-violet"
                />
              </Field>
              <button
                type="submit"
                disabled={sent}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-mint disabled:text-ink"
              >
                {sent ? (
                  <>
                    <Check className="size-4" />
                    {t.contact.sent}
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    {t.contact.send}
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  children,
}: {
  label: string
  name: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={name} className="flex flex-col gap-1.5">
      <span className="text-sm text-text-secondary">{label}</span>
      {children}
    </label>
  )
}
