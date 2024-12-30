'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const skills = [
  { name: 'Python', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'JavaScript', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'React', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Next.js', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Node.js', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Express.js', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'PostgreSQL', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'MongoDB', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Git', logo: '/placeholder.svg?height=50&width=50' },
  { name: 'Tailwind CSS', logo: '/placeholder.svg?height=50&width=50' },
]

export function SkillsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-8">
      {[...Array(3)].map((_, i) => {
        const index = (currentIndex + i) % skills.length
        return (
          <div key={index} className="text-center">
            <Image src={skills[index].logo} alt={skills[index].name} width={50} height={50} className="mx-auto mb-2" />
            <p>{skills[index].name}</p>
          </div>
        )
      })}
    </div>
  )
}

