"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function NavMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-8 right-8 z-50 mix-blend-difference"
    >
      <ul className="flex items-center gap-8">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-sm tracking-wide relative py-2"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
              {hoveredItem === item.name && (
                <motion.div
                  layoutId="menu-underline"
                  className="absolute left-0 right-0 bottom-0 h-px bg-white"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

