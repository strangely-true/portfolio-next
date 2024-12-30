"use client"

import { motion } from "framer-motion"
import { NavMenu } from "@/components/ui/nav-menu"
import { Reveal } from "@/components/ui/reveal"
import { MultiLanguageGreeting } from "@/components/ui/multi-language-greeting"
import { HeroParallax } from "@/components/ui/hero-parallax"
import Image from "next/image"

const products = [
  {
    title: "Project 1",
    link: "#",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  {
    title: "Project 2",
    link: "#",
    thumbnail: "/placeholder.svg?height=600&width=600",
  },
  // Add more projects here...
]

export default function Home() {
  return (
    <>
      <NavMenu />
      
      <main className="overflow-hidden">
        <section className="relative min-h-screen flex items-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-80" />
          
          <div className="container mx-auto px-8 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Reveal>
                  <motion.p 
                    className="text-sm tracking-wider text-neutral-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Web Developer & Photographer
                  </motion.p>
                </Reveal>

                <Reveal>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  
                    <span className="cinematic-gradient"><MultiLanguageGreeting />I'm Sabittwa</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-lg text-neutral-300 max-w-md leading-relaxed">
                    Computer Science student specializing in web development 
                    and IoT solutions. Focused on crafting modern, innovative 
                    digital experiences.
                  </p>
                </Reveal>

                <Reveal>
                  <div className="flex items-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-black rounded-full font-medium"
                    >
                      View Projects
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
                    >
                      Contact Me
                    </motion.button>
                  </div>
                </Reveal>
              </div>

              <div className="relative hidden lg:block">
                {/* Placeholder for your photo */}
                <div className="relative w-[400px] h-[500px] mx-auto">
                  <div className="absolute inset-0 " />
                  <Image
                    src="/DSC09490.jpg"
                    alt="Sabittwa Banerjee"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-sm text-neutral-400 tracking-wider">SCROLL</p>
          </motion.div> */}
        </section>

        <HeroParallax products={products} />
      </main>
    </>
  )
}

