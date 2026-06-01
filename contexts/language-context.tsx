"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { translations, type Dictionary, type Language } from "@/lib/translations"

const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
} | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language") as Language | null
    if (saved === "pt" || saved === "en" || saved === "es") setLanguage(saved)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language)
    document.documentElement.lang = language === "pt" ? "pt-BR" : language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider")
  return context
}

