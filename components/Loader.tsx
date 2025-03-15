"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

const StarField = ({ count = 100 }) => {
  const [stars, setStars] = useState<{ id: number; size: number; x: number; y: number; duration: number; delay: number; }[]>([])
  const mounted = useMounted()

  useEffect(() => {
    if (mounted) {
      setStars(Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 1.5 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 0.5,
      })));
    }
  }, [mounted, count]);

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  )
}

const Constellation = () => {
  const points = [
    { x: 30, y: 50 }, { x: 70, y: 30 }, { x: 110, y: 60 },
    { x: 150, y: 40 }, { x: 190, y: 70 }
  ]

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 100">
      {points.slice(0, -1).map((point, i) => (
        <motion.line
          key={i}
          x1={point.x}
          y1={point.y}
          x2={points[i + 1].x}
          y2={points[i + 1].y}
          stroke="white"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.2 + i * 0.1,
            ease: "circOut"
          }}
        />
      ))}
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={1.2}
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 150,
            delay: 1 + i * 0.15,
          }}
        />
      ))}
    </svg>
  )
}

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const mounted = useMounted()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3200)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center font-object-sans"
          initial={{ backgroundColor: "#ffffff" }}
          animate={{ backgroundColor: "#030712" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <StarField />
            <Constellation />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.h1
                className="text-5xl font-light tracking-tighter text-gray-950"
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ 
                  opacity: 1,
                  letterSpacing: "0.02em",
                  transition: {
                    opacity: { duration: 0.6, delay: 0.3 },
                    letterSpacing: { duration: 1.2, delay: 0.3 },
                  }
                }}
              >
                SABITTWA BANERJEE
              </motion.h1>
              
              <motion.p
                className="mt-4 text-xl tracking-wide text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: 0.6,
                    ease: "backOut"
                  }
                }}
              >
                WEB DEVELOPER & DESIGNER
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
