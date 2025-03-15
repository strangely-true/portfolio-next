"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { CounterSection } from "@/components/ui/counter-section"
import { TechCarousel } from "@/components/ui/tech-carousel"
import { useEffect, useState } from "react"
import Loader  from "@/components/Loader"
import { ScrollRevealText } from "@/components/ScrollRevealText"
import { ProjectSection } from "@/components/ProjectSection"
import ContactSection from "@/components/ui/contact-section"
import HeroSection from "@/components/ui/hero-section"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const onLoad = () => setIsLoading(false)
    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <FloatingNav />
      <main className="overflow-hidden">
        <section id="home">
          <HeroSection />
        </section>
        <section id="about">
          <ScrollRevealText />
        </section>
        <CounterSection />
        <TechCarousel />
        <section id="projects">
          <ProjectSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
