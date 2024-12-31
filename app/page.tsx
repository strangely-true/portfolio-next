"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"
import { MultiLanguageGreeting } from "@/components/ui/multi-language-greeting"
import { HeroParallax } from "@/components/ui/hero-parallax"
import { CounterSection } from "@/components/ui/counter-section"
import { TechCarousel } from "@/components/ui/tech-carousel"
import Image from "next/image"
// import { ProjectSection } from "@/components/ProjectSection"
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Header from "@/components/Header"


const navItems = [
  {
    name: "Home",
    link: "#",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: (
      <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];
const products = [
  {
    title: "Coordina",
    link: "#projects",
    thumbnail: "/coordina.png",
  },
  {
    title: "MealMetric",
    link: "#projects",
    thumbnail: "/mealmetric.png",
  },
  {
    title: "Chat App",
    link: "#projects",
    thumbnail: "/chat-app.png",
  },
  {
    title: "MealMetric Dashboard",
    link: "#projects",
    thumbnail: "/mealmetric.png",
  },
  {
    title: "Project 5",
    link: "#projects",
    thumbnail: "/coordina.png",
  },
  {
    title: "Project 6",
    link: "#projects",
    thumbnail: "/mealmetric.png",
  },
  {
    title: "Project 7",
    link: "#projects",
    thumbnail: "/chat-app.png",
  },
  {
    title: "Project 8",
    link: "#projects",
    thumbnail: "/coordina.png",
  },
  {
    title: "Project 9",
    link: "#projects",
    thumbnail: "/mealmetric.png",
  },
  {
    title: "Project 10",
    link: "#projects",
    thumbnail: "/chat-app.png",
  },
  {
    title: "Project 11",
    link: "#projects",
    thumbnail: "/coordina.png",
  },
  {
    title: "Project 12",
    link: "#projects",
    thumbnail: "/mealmetric.png",
  },
  {
    title: "Project 13",
    link: "#projects",
    thumbnail: "/chat-app.png",
  },
  {
    title: "Project 14",
    link: "#projects",
    thumbnail: "/coordina.png",
  },
  {
    title: "Project 15",
    link: "#projects",
    thumbnail: "/mealmetric.png",
  },
  {
    title: "Project 16",
    link: "#projects",
    thumbnail: "/chat-app.png",
  },
]

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [])

  // if (isLoading) {
  //   return (
  //     <Loader />
  //   )
  // }

  return (
    <>
      <Header />
      <FloatingNav navItems={navItems} />
      
      <main className="overflow-hidden">
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b" />
          
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
                    <span className="cinematic-gradient">
                      <MultiLanguageGreeting />
                      I&apos;m Sabittwa
                    </span>
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
                <div className="relative w-[400px] h-[500px] mx-auto">
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
        </section>

        

        <HeroParallax products={products} />
        <CounterSection />
        <TechCarousel />

      </main>
    </>
  )
}


