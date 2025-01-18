'use client'

import { motion } from 'framer-motion'
import { Linkedin, FileText, Copy, Check, Github, Instagram } from 'lucide-react'
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
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try copying manually.",
      })
    }
  }

  return (
    <>
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
          <a href="https://linkedin.com/in/sabittwa-banerjee" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-rose-600 transition duration-300 ease-out border-2 border-rose-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#0077B5] group-hover:translate-x-0 ease">
              <Linkedin className="w-5 h-5" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-rose-500 transition-all duration-300 transform group-hover:translate-x-full ease">LinkedIn</span>
            <span className="relative invisible">LinkedIn</span>
          </a>


          <div className="w-2 h-2 rounded-full bg-rose-500" />

          <a href="https://github.com/strangely-true" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-rose-600 transition duration-300 ease-out border-2 border-rose-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2b3137] group-hover:translate-x-0 ease">
              <Github className="w-5 h-5" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-rose-500 transition-all duration-300 transform group-hover:translate-x-full ease">GitHub</span>
            <span className="relative invisible">GitHub</span>
          </a>

          <div className="w-2 h-2 rounded-full bg-rose-500" />

          <a href="https://www.instagram.com/strangely_true" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-rose-600 transition duration-300 ease-out border-2 border-rose-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 group-hover:translate-x-0 ease">
              <Instagram className="w-5 h-5" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-rose-500 transition-all duration-300 transform group-hover:translate-x-full ease">Instagram</span>
            <span className="relative invisible">Instagram</span>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center space-x-8"
        > <a href="/resume.pdf" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-rose-500 rounded-xl group">
        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-rose-700 rounded group-hover:-mr-4 group-hover:-mt-4">
          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
        </span>
        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-rose-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Download CV
        </span>
      </a>
      </motion.div>
      </div>
      <Toaster />
    </section>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative bottom-8 left-0 right-0 flex justify-between px-8 pt-20 text-sm text-white/50"
      >
        <p>©2025 Sabittwa Banerjee</p>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>Available for a full-time position</span>
        </div>
        <p>Made by Sabittwa B.</p>
      </motion.div>
    </>
  )
}

