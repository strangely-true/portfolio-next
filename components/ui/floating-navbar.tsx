'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IconHome, IconUser, IconMessage, IconBriefcase } from '@tabler/icons-react'
import { useLenis } from 'lenis/react'

const navItems = [
  {
    name: 'Home',
    link: '#home',
    icon: <IconHome className="h-4 w-4" />,
  },
  {
    name: 'About',
    link: '#about',
    icon: <IconUser className="h-4 w-4" />,
  },
  {
    name: 'Projects',
    link: '#projects',
    icon: <IconBriefcase className="h-4 w-4" />,
  },
  {
    name: 'Contact',
    link: '#contact',
    icon: <IconMessage className="h-4 w-4" />,
  },
]

export const FloatingNav = ({ className }: { className?: string }) => {
  const [activeSection, setActiveSection] = useState('')
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      if (!lenis) return

      const currentScrollY = lenis.scroll

      if (currentScrollY < lastScrollY) {
        setVisible(true)
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setVisible(false)
      }

      setLastScrollY(currentScrollY)

      const sections = navItems.map(item => item.name.toLowerCase())
      let currentSection = ''

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    lenis?.on('scroll', handleScroll)

    return () => {
      lenis?.off('scroll', handleScroll)
    }
  }, [lenis, lastScrollY])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault()
    const targetId = link.replace('#', '')
    const element = document.getElementById(targetId)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -100 })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed top-0 inset-x-0 z-50 backdrop-blur-sm',
            className
          )}
        >
          <div className="container mx-auto px-4 pt-2 pb-5">
            <div className="flex items-center justify-between">
                <Link href="#home" className="text-xl font-bold text-white hover:text-rose-600 flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-15 w-12 invert" />
                <span className="hidden md:inline">Sabittwa.</span>
                </Link>
              <div className="hidden md:flex space-x-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={(e) => handleClick(e, item.link)}
                    className={cn(
                      'text-sm uppercase tracking-wider transition-colors',
                      activeSection === item.name.toLowerCase()
                        ? 'text-rose-500 font-bold'
                        : 'text-white font-bold hover:cinematic-gradient'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex md:hidden">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={(e) => handleClick(e, item.link)}
                    className={cn(
                      'p-2 transition-colors',
                      activeSection === item.name.toLowerCase()
                        ? 'text-rose-600'
                        : 'text-white hover:text-rose-600'
                    )}
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

