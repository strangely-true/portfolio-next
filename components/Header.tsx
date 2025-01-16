"use client"

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, Github, Mail, FileBadge } from 'lucide-react'

const GalaxyHeader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext('2d')
  //   if (!ctx) return

  //   canvas.width = window.innerWidth
  //   canvas.height = 100

  //   const stars: { x: number; y: number; radius: number; vx: number; vy: number }[] = []

  //   for (let i = 0; i < 100; i++) {
  //     stars.push({
  //       x: Math.random() * canvas.width,
  //       y: Math.random() * canvas.height,
  //       radius: Math.random() * 1.5,
  //       vx: Math.random() * 0.5 - 0.25,
  //       vy: Math.random() * 0.5 - 0.25
  //     })
  //   }

  //   function drawStars() {
  //     if (!ctx) return
  //     if (!canvas) return
  //     ctx.clearRect(0, 0, canvas.width, canvas.height)
  //     ctx.fillStyle = 'white'
  //     stars.forEach(star => {
  //       ctx.beginPath()
  //       ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
  //       ctx.fill()

  //       star.x += star.vx
  //       star.y += star.vy

  //       if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx
  //       if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy
  //     })
  //     requestAnimationFrame(drawStars)
  //   }

  //   drawStars()

  //   const handleResize = () => {
  //     canvas.width = window.innerWidth
  //     canvas.height = 100
  //   }

  //   window.addEventListener('resize', handleResize)

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  return (
    <header className="relative h-10 pt-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 h-full flex justify-between items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 hover:cinematic-gradient transition-colors">
            SB
            </Link>
        </motion.div>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SocialLink href="/resume.pdf" icon={FileBadge} label="Download Resume" />
          <SocialLink href="mailto:sabittwa.work@gmail.com" icon={Mail} label="Email" />
          <SocialLink href="https://www.linkedin.com/in/sabittwa-banerjee" icon={Linkedin} label="LinkedIn" />
          <SocialLink href="https://github.com/strangely-true" icon={Github} label="GitHub" />
        </motion.div>
      </div>
    </header>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ElementType
  label: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <Link
    href={href}
    className="text-white hover:text-purple-300 transition-colors"
    target={href.startsWith('http') ? "_blank" : undefined}
    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
  >
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-6 h-6 " />
      <span className="sr-only ">{label}</span>
    </motion.div>
  </Link>
)

export default GalaxyHeader
