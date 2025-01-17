'use client'

import { motion } from 'framer-motion'
import { Linkedin, FileText, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function ContactSection() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const email = 'sabittwa.work@gmail.com'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast({
        title: "Copied to clipboard!",
        description: "Email address has been copied.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try copying manually.",
      })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full mx-auto text-center space-y-16 border border-white/10 rounded-[2rem] py-28 px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-5xl lg:text-5xl font-light text-white font-sorren"
        >
          Looking for a new talent?
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            className="w-full text-2xl md:text-4xl lg:text-8xl font-light text-white hover:text-rose-600 transition-all duration-300 group-hover:bg-white/5 rounded-xl p-20"
          >
            <span className="mr-4">{email}</span>
            {copied ? (
              <Check className="w-6 h-6 text-green-500" />
            ) : (
              <Copy className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center space-x-8"
        >
          <Button
            variant="ghost"
            className="group"
            asChild
          >
            <a 
              href="https://linkedin.com/in/sabittwa-banerjee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span>
            </a>
          </Button>

          <div className="w-2 h-2 rounded-full bg-rose-500" />

          <Button
            variant="ghost"
            className="group"
            asChild
          >
            <a 
              href="/resume.pdf" 
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="group-hover:translate-x-1 transition-transform">Download CV</span>
            </a>
          </Button>
        </motion.div>
      </div>
      <Toaster />
    </section>
  )
}

