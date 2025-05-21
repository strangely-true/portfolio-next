"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  name: string
  color: string
  image: string
  link: string
  description: string
}

const projects: Project[] = [
  { 
    id: '1', 
    name: 'TruthScope', 
    color: '#A23B5A', // Dark pastel red color
    image: '/truthscope.png',
    link: 'https://github.com/sujayx07/TruthScope',
    description: 'A chrome extension that detects fake news and misinformation using AI. It uses sentiment analysis and LLMs to analyze the content and provide a credibility score. Built with JS, Gemini SDK, Manifest V3.'
  },
  { 
    id: '2', 
    name: 'Coordina', 
    color: '#321353', // Dark purple color
    image: '/coordina.png',
    link: 'https://coordina-murex.vercel.app/',
    description: 'A Smart India Hackathon project focusing on user-friendly dashboard interfaces for government departments. Developed using Next.js, React.js, and MongoDB.'
  },
  { 
    id: '3', 
    name: 'Github Diary', 
    color: '#014D4E', // Blue 
    image: '/github-diary.png',
    link: 'https://marketplace.visualstudio.com/items?itemName=strangely-true.github-diary',
    description: 'Never lose track of your coding progress. Git Diary automatically records your development activity in a private GitHub repository, creating a detailed, timestamped journal of your work.'
  },
  { 
    id: '4', 
    name: 'MealMetric', 
    color: '#06402B', 
    image: '/mealmetric.png',
    link: 'https://github.com/strangely-true/MealMetric',
    description: 'A dynamic web application to calculate nutritional information for meals based on user-inputted ingredients. Built with Node.js, Express.js, PostgreSQL, and EJS.'
  },
  { 
    id: '5', 
    name: 'Real-Time Chat Application', 
    color: '#085548', 
    image: '/chat-app.png',
    link: 'https://github.com/strangely-true/Chat-app',
    description: 'A full-stack real-time chat application with type-safe messaging and user authentication. Built using Next.js, React.js, Convex DB, and Clerk.'
  }
]

export function ProjectSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen text-white pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="relative">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              className="block relative py-16 border-t border-white/20 overflow-hidden"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              initial={{ backgroundColor: 'transparent' }}
              animate={{ backgroundColor: hoveredProject === project.id ? project.color : 'transparent' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col space-y-4"
                initial={{ opacity: 1 }}
                animate={{ opacity: hoveredProject === project.id ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-medium">{project.name}</span>
                  <span className="text-xl">0{index + 1}</span>
                </div>
                <p className="text-lg text-white/70 max-w-2xl">{project.description}</p>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-between p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex flex-col space-y-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: hoveredProject === project.id ? 0 : -20, opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div
                    className="flex items-center space-x-2 text-3xl font-medium"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowUpRight size={32} />
                    <span className="hover:underline">View Project</span>
                  </motion.div>
                  <p className="text-lg text-white max-w-lg">{project.description}</p>
                </motion.div>
                <motion.div
                  className="relative w-96 h-56"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: hoveredProject === project.id ? 0 : 100, opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
