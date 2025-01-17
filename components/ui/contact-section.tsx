'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { SiLinkedin } from 'react-icons/si'

export default function ContactSection() {
  const { toast } = useToast()
  const email = 'sabittwa.work@gmail.com'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      toast({
        description: "Email copied to clipboard.",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy. Please try manually.",
      })
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full mx-auto text-center space-y-16 border border-white/10 rounded-[2rem] py-20 px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-light text-white/80"
        >
          Looking for a new talent?
        </motion.h2>
        
        <motion.button
          onClick={copyToClipboard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white hover:text-neutral-300 transition-colors cursor-pointer w-full break-all"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {email}
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center space-x-6 text-white/80"
        >
          <a 
            href="https://linkedin.com/in/sabittwa-banerjee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <SiLinkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <a 
            href="/resume.pdf" 
            className="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Download CV</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

