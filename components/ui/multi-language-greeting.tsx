"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = [
  { language: 'English', text: 'Hello' },
  { language: 'Hindi', text: 'नमस्ते' },
  { language: 'Italian', text: 'Ciao' },
  { language: 'Spanish', text: 'Hola' },
  { language: 'French', text: 'Bonjour' },
  { language: 'Japanese', text: 'こんにちは' },
  { language: 'Chinese', text: '你好' },
  { language: 'Bengali', text: 'স্বাগতম' },
  { language: 'Telugu', text: 'నమస్తే' },
  { language: 'Marathi', text: 'नमस्कार' },
  { language: 'Tamil', text: 'வணக்கம்' },
  { language: 'Gujarati', text: 'નમસ્તે' },
  { language: 'Kannada', text: 'ನಮಸ್ಕಾರ' },
  { language: 'Malayalam', text: 'നമസ്കാരം' },
  { language: 'Punjabi', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' },
  { language: 'Odia', text: 'ନମସ୍କାର' },
  { language: 'Assamese', text: 'নমস্কাৰ' },
  { language: 'Urdu', text: 'سلام' },
  { language: 'Portuguese', text: 'Olá' },
  { language: 'Korean', text: '안녕하세요' },
  { language: 'German', text: 'Hallo' },
  { language: 'Arabic', text: 'مرحبا' },
  { language: 'Turkish', text: 'Merhaba' },
  { language: 'Vietnamese', text: 'Xin chào' },
  { language: 'Persian', text: 'سلام' },
  { language: 'Thai', text: 'สวัสดี' },
  { language: 'Greek', text: 'Γειά σας' },
  { language: 'Swedish', text: 'Hej' },
  { language: 'Polish', text: 'Cześć' },
]

export function MultiLanguageGreeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-20 overflow-y-visible ">
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
