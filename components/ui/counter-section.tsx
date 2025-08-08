"use client"

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
// import Image from 'next/image'

const AnimatedCounter = ({ value, title, suffix = '' }: { value: number; title: string; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 3000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix
      }
    })
  }, [springValue, suffix])

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={ref}
        className="text-5xl md:text-7xl font-bold mb-2 cinematic-gradient"
      >
        0
      </motion.div>
      <div className="text-sm md:text-base text-neutral-400">{title}</div>
    </div>
  )
}

export function CounterSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* <Image
        src="/counter-background.jpg"
        alt="Counter Background"
        fill
        className="object-cover object-center"
      /> */}
      <div className="absolute inset-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <AnimatedCounter value={1200} title="LinkedIn Followers" suffix="+" />
          <AnimatedCounter value={50} title="LeetCode Problems Solved" />
          <AnimatedCounter value={900} title="Github Contributions" suffix="+" />
        </div>
      </div>
    </section>
  )
}

