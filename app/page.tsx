import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { LogosSlider } from "@/components/logos-slider"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Process } from "@/components/sections/process"

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Projects />
      <LogosSlider />
      <Experience />
      <Process />
      <Footer />
    </>
  )
}
