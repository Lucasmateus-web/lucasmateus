"use client"

import { useState, type ReactNode } from "react"
import { IntroScreen } from "@/components/intro-screen"

export function EntryShell({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false)

  return (
    <>
      <IntroScreen onComplete={() => setEntered(true)} />
      {entered ? children : null}
    </>
  )
}
