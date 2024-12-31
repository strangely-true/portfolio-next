'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GalaxyBackground = () => (
  <div className="absolute inset-0 bg-black overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-50"></div>
    {[...Array(100)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full"
        initial={{
          opacity: Math.random(),
          scale: Math.random() * 0.5 + 0.5,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
          transition: {
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        style={{
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
        }}
      />
    ))}
  </div>
)



export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GalaxyBackground />
          <div className="relative z-10 text-center">
            <motion.h1
              className="mt-4 text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Sabittwa Banerjee
            </motion.h1>
            <motion.p
              className="mt-2 text-xl text-purple-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Web Developer & Designer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

