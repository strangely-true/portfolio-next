"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Menu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 py-4 z-50">
      <div className="bg-black/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
        <ul className="flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              <Link
                href={item.href}
                className="text-sm text-neutral-100 transition-colors hover:text-white"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}
                {hoveredItem === item.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full h-px w-full bg-white"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 12,
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

