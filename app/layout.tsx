import type { Metadata } from "next"
import { Syne, Inter, JetBrains_Mono, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { CustomCursor } from "@/components/custom-cursor"
import { LanguageProvider } from "@/contexts/language-context"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Lucas Mateus — Desenvolvedor Full Stack",
  description:
    "Portfólio de Lucas Mateus, desenvolvedor full stack em formação. Web, mobile, dados, automação e UI/UX com design moderno e performance.",
  generator: "v0.app",
  icons: {
    icon: "/Logo-ico-large.png",
    shortcut: "/Logo-ico-large.png",
    apple: "/Logo-ico-large.png",
  },
  keywords: [
    "Lucas Mateus",
    "Desenvolvedor Full Stack",
    "React",
    "Next.js",
    "Flutter",
    "Python",
    "UI/UX",
    "Análise de Dados",
  ],
  authors: [{ name: "Lucas Mateus" }],
  openGraph: {
    title: "Lucas Mateus — Desenvolvedor Full Stack",
    description:
      "Crio experiências digitais modernas: web, mobile, dashboards e automações inteligentes.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#020202",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-[#020202]">
      <body
        className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} ${sora.variable} font-sans antialiased bg-[#020202] text-[#F5F5F5]`}
      >
        <LanguageProvider>
          <AnimatedBackground />
          <CustomCursor />
          <main className="relative z-10">{children}</main>
        </LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
