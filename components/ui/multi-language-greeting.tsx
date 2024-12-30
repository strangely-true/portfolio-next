"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = [
  { language: 'English', text: 'Hello' },
  { language: 'Hindi', text: 'Namaste' },
  { language: 'Italian', text: 'Ciao' },
  { language: 'Spanish', text: 'Hola' },
  { language: 'French', text: 'Bonjour' },
  { language: 'Japanese', text: 'こんにちは' },
  { language: 'Chinese', text: '你好' },
]

export function MultiLanguageGreeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-20 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={greetings[index].language}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold cinematic-gradient"
        >
          {greetings[index].text}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

