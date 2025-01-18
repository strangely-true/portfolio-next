'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Removed springConfig and cursorXSpring/cursorYSpring declarations

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor)
    
    // Add hover detection
    const handleMouseEnter = () => {
      const hoverable = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        return target.closest('a, button, [data-hover]')
      }
      
      window.addEventListener('mouseover', (e) => {
        if (hoverable(e)) setIsHovered(true)
      })
      
      window.addEventListener('mouseout', (e) => {
        if (hoverable(e)) setIsHovered(false)
      })
    }

    handleMouseEnter()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mix-blend-difference">
      <motion.div
        className="absolute h-4 w-4 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{
            height: isHovered ? 80 : 16,
            width: isHovered ? 80 : 16,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent" />
        {/* <StarTrail /> */}
      </motion.div>
      
    </div>
  )
}

// function StarTrail() {
//   return (
//     <>
//       {[...Array(5)].map((_, index) => (
//         <motion.div
//           key={index}
//           className="absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0e0e0] opacity-50"
//           initial={{ scale: 0, x: 0, y: 0 }}
//           animate={{
//             scale: [1, 0],
//             x: Math.cos(index * Math.PI * 0.4) * 20,
//             y: Math.sin(index * Math.PI * 0.4) * 20,
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             repeatType: 'reverse',
//             delay: index * 0.2,
//           }}
//         />
//       ))}
//     </>
//   )
// }

