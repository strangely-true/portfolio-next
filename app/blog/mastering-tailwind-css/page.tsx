"use client"

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Code, Smartphone, Monitor, Tablet, Zap, CheckCircle, Circle, Play, Pause, RotateCcw, Copy, Check, Star, Trophy, Target, Lightbulb, Rocket, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { BlogPostLayout } from '@/components/ui/blog-post-layout'
import Image from 'next/image'

// Types for better type safety
interface InteractiveDemoState {
  padding: number
  margin: number
  borderRadius: string
  shadow: string
  backgroundColor: string
}

interface ProgressState {
  completedSections: Set<string>
  currentSection: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  totalInteractions: number
}

// Custom hooks for better state management
const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>({
    completedSections: new Set(),
    currentSection: 'introduction',
    skillLevel: 'beginner',
    totalInteractions: 0
  })

  const markSectionComplete = useCallback((section: string) => {
    setProgress(prev => ({
      ...prev,
      completedSections: new Set([...prev.completedSections, section]),
      totalInteractions: prev.totalInteractions + 1
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress({
      completedSections: new Set(),
      currentSection: 'introduction',
      skillLevel: 'beginner',
      totalInteractions: 0
    })
  }, [])

  return { progress, markSectionComplete, resetProgress, setProgress }
}

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }, [])

  return { copied, copyToClipboard }
}

// Enhanced Components
const CodeBlock = ({ 
  code, 
  language, 
  filename, 
  highlightLines = [] 
}: { 
  code: string
  language: string
  filename?: string
  highlightLines?: number[]
}) => {
  const { copied, copyToClipboard } = useCopyToClipboard()

  return (
    <div className="relative group">
      {filename && (
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
          <span className="text-sm text-gray-300 font-mono">{filename}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(code)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      )}
      <pre className={`bg-gray-900 p-4 overflow-x-auto text-sm ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code className={`language-${language} text-gray-100`}>
          {code.split('\n').map((line, index) => (
            <div 
              key={index}
              className={`${highlightLines.includes(index + 1) ? 'bg-blue-500/20 -mx-4 px-4' : ''}`}
            >
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

const InteractiveExample = ({ 
  title, 
  description, 
  children, 
  code 
}: { 
  title: string
  description: string
  children: React.ReactNode
  code?: string
}) => {
  const [showCode, setShowCode] = useState(false)
  const { copied, copyToClipboard } = useCopyToClipboard()

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
          {code && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className="border-gray-700 text-gray-300"
              >
                <Code className="w-4 h-4 mr-2" />
                {showCode ? 'Hide' : 'Show'} Code
              </Button>
              {showCode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(code)}
                  className="border-gray-700 text-gray-300"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          {children}
        </div>
        <AnimatePresence>
          {showCode && code && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CodeBlock code={code} language="jsx" />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

const ProgressTracker = ({ 
  progress, 
  sections 
}: { 
  progress: ProgressState
  sections: string[]
}) => {
  const completionPercentage = (progress.completedSections.size / sections.length) * 100

  return (
    <Card className="bg-transparent border-rose-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Overall Progress</span>
            <span className="text-rose-400 font-semibold">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Vertical stacked sections */}
          <div className="space-y-3">
            {sections.map((section) => (
              <div key={section} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center gap-3">
                  {progress.completedSections.has(section) ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    progress.completedSections.has(section) 
                      ? 'text-emerald-400' 
                      : 'text-gray-400'
                  }`}>
                    {section}
                  </span>
                </div>
                {progress.completedSections.has(section) && (
                  <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Complete
                  </Badge>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Interactions: <span className="text-orange-400">{progress.totalInteractions}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ResponsivePreview = ({ 
  children, 
  device = 'desktop' 
}: { 
  children: React.ReactNode
  device: 'mobile' | 'tablet' | 'desktop'
}) => {
  const deviceStyles = {
    mobile: 'max-w-sm mx-auto',
    tablet: 'max-w-2xl mx-auto',
    desktop: 'w-full'
  }

  const DeviceIcon = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor
  }[device]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-400">
        <DeviceIcon className="w-4 h-4" />
        <span className="text-sm capitalize">{device} Preview</span>
      </div>
      <div className={`${deviceStyles[device]} transition-all duration-300`}>
        {children}
      </div>
    </div>
  )
}

export default function TailwindGuidePost() {
  const { progress, markSectionComplete, resetProgress } = useProgress()
  const [activeColorPalette, setActiveColorPalette] = useState('blue')
  const [selectedUtility, setSelectedUtility] = useState('colors')
  const [gridColumns, setGridColumns] = useState(3)
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const [interactiveDemo, setInteractiveDemo] = useState<InteractiveDemoState>({
    padding: 4,
    margin: 2,
    borderRadius: 'md',
    shadow: 'lg',
    backgroundColor: 'blue'
  })

  // New state for component demo
  const [selectedComponentCategory, setSelectedComponentCategory] = useState('buttons')
  const [componentDemo, setComponentDemo] = useState({
    buttonStyle: 'solid',
    buttonSize: 'md',
    buttonShape: 'rounded'
  })

  const sections = ['Configuration', 'Responsive Design', 'Custom Utilities', 'Components', 'Performance']
  
  // Blog post metadata
  const post = {
    title: 'Mastering Tailwind CSS: Advanced Techniques & Interactive Guide',
    date: 'July 1, 2025',
    readTime: 25,
    tags: ['Tailwind CSS', 'CSS', 'Web Development', 'Frontend', 'Interactive Tutorial', 'Advanced Techniques'],
    author: 'Sabittwa Banerjee'
  }
  
  // Memoized color palettes to prevent unnecessary re-renders
  const colorPalettes = useMemo(() => ({
    blue: { primary: 'bg-blue-500', secondary: 'bg-blue-600', accent: 'bg-blue-400' },
    purple: { primary: 'bg-purple-500', secondary: 'bg-purple-600', accent: 'bg-purple-400' },
    green: { primary: 'bg-green-500', secondary: 'bg-green-600', accent: 'bg-green-400' },
    red: { primary: 'bg-red-500', secondary: 'bg-red-600', accent: 'bg-red-400' },
    yellow: { primary: 'bg-yellow-500', secondary: 'bg-yellow-600', accent: 'bg-yellow-400' },
  }), [])

  // Enhanced grid system with proper Tailwind classes
  const gridClasses = useMemo(() => ({
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  }), [])

  // Animation controls
  const toggleAnimation = useCallback(() => {
    setIsAnimating(!isAnimating)
  }, [isAnimating])

  // Code examples
  const codeExamples = {
    configuration: `// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}`,
    responsive: `<!-- Mobile-First Responsive Design -->
<div class="
  w-full 
  sm:w-1/2 
  md:w-1/3 
  lg:w-1/4 
  xl:w-1/5
  p-4 
  sm:p-6 
  md:p-8
  bg-white 
  dark:bg-gray-900
  rounded-lg 
  shadow-lg
">
  <h2 class="
    text-lg 
    sm:text-xl 
    md:text-2xl 
    lg:text-3xl
    font-bold 
    text-gray-900 
    dark:text-white
    mb-4
  ">
    Responsive Title
  </h2>
  <p class="
    text-sm 
    sm:text-base
    text-gray-600 
    dark:text-gray-300
    leading-relaxed
  ">
    This content adapts beautifully across all screen sizes.
  </p>
</div>`,
    utilities: `/* Custom Utility Classes */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent;
  }
  
  .glass-morphism {
    @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl;
  }
  
  .custom-shadow {
    box-shadow: 
      0 10px 25px -3px rgba(0, 0, 0, 0.1), 
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(255, 255, 255, 0.05);
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .btn-primary {
    @apply inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95;
  }
}`,
    components: `<!-- Professional Component Library Patterns -->

<!-- Advanced Button System -->
<div class="button-showcase space-y-4">
  <!-- Primary Button Variants -->
  <button class="
    btn-primary
    inline-flex items-center justify-center
    px-4 py-2 text-base font-medium
    bg-blue-600 hover:bg-blue-700 focus:bg-blue-700
    text-white rounded-lg shadow-lg hover:shadow-xl
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    transition-all duration-200 transform hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
  ">
    Primary Action
  </button>

  <!-- Gradient Button -->
  <button class="
    inline-flex items-center justify-center
    px-6 py-3 text-lg font-semibold
    bg-gradient-to-r from-purple-600 to-pink-600
    text-white rounded-full
    shadow-lg hover:shadow-2xl
    transform hover:-translate-y-1 active:translate-y-0
    transition-all duration-300
  ">
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
    Get Premium
  </button>
</div>

<!-- Advanced Card System -->
<div class="card-showcase grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Glass Morphism Card -->
  <div class="
    bg-white/10 backdrop-blur-md border border-white/20
    rounded-xl p-6 shadow-xl hover:shadow-2xl
    transition-all duration-300 transform hover:-translate-y-2
    relative overflow-hidden group
  ">
    <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold text-white">Glass Card</h3>
        <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </div>
      <p class="text-gray-200 mb-4">Modern glass morphism effect with backdrop blur.</p>
      <div class="flex justify-between items-center">
        <span class="text-xs text-gray-300">Live Status</span>
        <button class="
          px-3 py-1 bg-white/20 hover:bg-white/30
          text-white text-sm rounded-full
          transition-colors duration-200
        ">
          Explore
        </button>
      </div>
    </div>
  </div>

  <!-- Pricing Card -->
  <div class="
    bg-white dark:bg-gray-800
    border-2 border-blue-500 rounded-xl p-6
    shadow-lg hover:shadow-2xl
    transition-all duration-300
    relative
  ">
    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
        Popular
      </span>
    </div>
    <div class="text-center mb-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pro Plan</h3>
      <div class="text-4xl font-bold text-gray-900 dark:text-white">
        $29
        <span class="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span>
      </div>
    </div>
    <ul class="space-y-3 mb-6">
      <li class="flex items-center text-gray-600 dark:text-gray-300">
        <svg class="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
        Unlimited projects
      </li>
      <li class="flex items-center text-gray-600 dark:text-gray-300">
        <svg class="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
        Priority support
      </li>
    </ul>
    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
      Get Started
    </button>
  </div>
</div>

<!-- Advanced Form System -->
<form class="form-showcase max-w-lg mx-auto space-y-6">
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Email Address
    </label>
    <div class="relative">
      <input 
        type="email" 
        class="
          w-full px-3 py-2 pl-10
          border border-gray-300 dark:border-gray-600
          rounded-lg
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200
        "
        placeholder="Enter your email"
      />
      <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      </div>
    </div>
  </div>

  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Message
    </label>
    <textarea 
      class="
        w-full px-3 py-2
        border border-gray-300 dark:border-gray-600
        rounded-lg resize-none
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-white
        placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-colors duration-200
      "
      rows="4"
      placeholder="Tell us about your project..."
    />
  </div>

  <button 
    type="submit"
    class="
      w-full px-4 py-2
      bg-blue-600 hover:bg-blue-700 focus:bg-blue-700
      text-white font-medium rounded-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      transition-all duration-200
      transform hover:scale-[1.02] active:scale-[0.98]
    "
  >
    Send Message
  </button>
</form>

<!-- Status & Feedback Components -->
<div class="feedback-showcase space-y-4">
  <!-- Success Alert -->
  <div class="
    bg-green-50 dark:bg-green-900/20
    border border-green-200 dark:border-green-800
    rounded-lg p-4
  ">
    <div class="flex">
      <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
          Success!
        </h3>
        <p class="text-sm text-green-700 dark:text-green-300 mt-1">
          Your changes have been saved successfully.
        </p>
      </div>
    </div>
  </div>

  <!-- Progress Bar -->
  <div class="space-y-2">
    <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
      <span>Upload Progress</span>
      <span>75%</span>
    </div>
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div class="
        bg-blue-600 h-2 rounded-full transition-all duration-300
        shadow-sm
      " style="width: 75%"></div>
    </div>
  </div>

  <!-- Status Badges -->
  <div class="flex flex-wrap gap-2">
    <span class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
      Active
    </span>
    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full">
      Pending
    </span>
    <span class="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs rounded-full">
      Error
    </span>
  </div>
</div>`
  }

  return (
    <BlogPostLayout post={post}>
      <div className="relative w-full aspect-[3/1] mb-12">
        <Image
          src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.a1069bda.svg"
          alt="Mastering Tailwind CSS Banner"
          fill
          className="object-contain w-full h-full rounded-lg shadow-lg p-10"
          priority
          sizes="100vw"
        />
      </div>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Tailwind CSS has revolutionized modern web development with its utility-first approach, 
            enabling developers to build consistent, maintainable, and highly customizable user interfaces. 
            This interactive guide will take you through advanced techniques, optimization strategies, 
            and professional patterns that will elevate your Tailwind CSS skills to the next level.
          </p>
          
          {/* Interactive Color Palette */}
          <div className="flex justify-center gap-3 mb-8">
            {Object.keys(colorPalettes).map((color) => (
              <motion.button
                key={color}
                onClick={() => setActiveColorPalette(color)}
                className={`w-12 h-12 rounded-full transition-all duration-300 ${
                  colorPalettes[color as keyof typeof colorPalettes].primary
                } ${
                  activeColorPalette === color 
                    ? 'ring-4 ring-white/50 scale-110' 
                    : 'hover:scale-105'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                icon: Palette, 
                title: "Interactive Demos", 
                desc: "Try utilities in real-time with live previews" 
              },
              { 
                icon: Zap, 
                title: "Advanced Patterns", 
                desc: "Learn professional techniques and best practices" 
              },
              { 
                icon: Target, 
                title: "Skill Assessment", 
                desc: "Track progress with interactive challenges" 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  activeColorPalette === 'blue' ? 'bg-blue-500/10 border-blue-500/30' :
                  activeColorPalette === 'purple' ? 'bg-purple-500/10 border-purple-500/30' :
                  activeColorPalette === 'green' ? 'bg-green-500/10 border-green-500/30' :
                  activeColorPalette === 'red' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <feature.icon className="w-8 h-8 mb-4 mx-auto text-white" />
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Progress Tracker */}
        <ProgressTracker progress={progress} sections={sections} />

        {/* Configuration Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              activeColorPalette === 'blue' ? 'bg-blue-500/20' :
              activeColorPalette === 'purple' ? 'bg-purple-500/20' :
              activeColorPalette === 'green' ? 'bg-green-500/20' :
              activeColorPalette === 'red' ? 'bg-red-500/20' :
              'bg-yellow-500/20'
            }`}>
              <Code className={`w-6 h-6 ${
                activeColorPalette === 'blue' ? 'text-blue-400' :
                activeColorPalette === 'purple' ? 'text-purple-400' :
                activeColorPalette === 'green' ? 'text-green-400' :
                activeColorPalette === 'red' ? 'text-red-400' :
                'text-yellow-400'
              }`} />
            </div>
            Advanced Configuration
          </h2>

          <div className="space-y-8">
            {/* Introduction Card */}
            <div className={`rounded-2xl p-8 border ${
              activeColorPalette === 'blue' ? 'bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-cyan-900/30 border-blue-500/30' :
              activeColorPalette === 'purple' ? 'bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-blue-900/30 border-purple-500/30' :
              activeColorPalette === 'green' ? 'bg-gradient-to-br from-green-900/30 via-emerald-900/20 to-teal-900/30 border-green-500/30' :
              activeColorPalette === 'red' ? 'bg-gradient-to-br from-red-900/30 via-rose-900/20 to-pink-900/30 border-red-500/30' :
              'bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-amber-900/30 border-yellow-500/30'
            }`}>
              
              <div className="flex items-center justify-between">
                
                <Button
                  onClick={() => markSectionComplete('Configuration')}
                  variant={progress.completedSections.has('Configuration') ? "default" : "outline"}
                  size="sm"
                  className={progress.completedSections.has('Configuration') 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : `${
                        activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                        activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                        activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                        activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                        'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                      }`
                  }
                >
                  {progress.completedSections.has('Configuration') ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
              {/* Interactive Configuration Panel */}
              <div className="xl:col-span-3 space-y-6">
                <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Interactive Configuration Explorer
                    </CardTitle>
                    <p className="text-gray-400 text-sm">
                      Experiment with different configuration options and see their impact in real-time.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={selectedUtility} onValueChange={setSelectedUtility} className="space-y-6">
                      <TabsList className="grid w-full grid-cols-4 bg-gray-800/80 p-1 rounded-xl">
                        <TabsTrigger 
                          value="colors" 
                          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all"
                        >
                          Colors
                        </TabsTrigger>
                        <TabsTrigger 
                          value="spacing" 
                          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                        >
                          Spacing
                        </TabsTrigger>
                        <TabsTrigger 
                          value="typography" 
                          className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all"
                        >
                          Typography
                        </TabsTrigger>
                        <TabsTrigger 
                          value="animations" 
                          className="data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"
                        >
                          Animations
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="colors" className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Custom Color Palette
                          </h4>
                          <p className="text-gray-300 text-sm mb-6">
                            Design your brand&apos;s color system with semantic naming and consistent scales.
                          </p>
                          <div className="grid grid-cols-5 gap-4">
                            {Object.entries(colorPalettes).map(([name, colors]) => (
                              <motion.div 
                                key={name} 
                                className="text-center group cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div 
                                  className={`w-16 h-16 rounded-2xl mb-3 ${colors.primary} shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                                  onClick={() => setActiveColorPalette(name)}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                  {activeColorPalette === name && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400 capitalize font-medium">{name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="spacing" className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                          <h4 className="font-semibold text-white mb-4">Dynamic Spacing System</h4>
                          <p className="text-gray-300 text-sm mb-6">
                            Create consistent spacing scales that work across all breakpoints.
                          </p>
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <label className="text-white text-sm font-medium">
                                  Padding Scale
                                </label>
                                <span className="text-blue-400 text-sm font-mono">
                                  p-{interactiveDemo.padding}
                                </span>
                              </div>
                              <Slider
                                value={[interactiveDemo.padding]}
                                onValueChange={([value]) => 
                                  setInteractiveDemo(prev => ({...prev, padding: value}))
                                }
                                max={16}
                                min={1}
                                step={1}
                                className="w-full"
                              />
                            </div>
                            
                            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg transition-all duration-300 flex items-center justify-center text-white font-semibold"
                                style={{ padding: `${interactiveDemo.padding * 0.25}rem` }}
                              >
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  Dynamic Padding: p-{interactiveDemo.padding}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="typography" className="space-y-6">
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                          <h4 className="font-semibold text-white mb-4">Typography Scale</h4>
                          <p className="text-gray-300 text-sm mb-6">
                            Establish a typographic hierarchy with custom font families and scales.
                          </p>
                          <div className="space-y-6">
                            {[
                              { name: 'Sans-Serif', class: 'font-sans', size: 'text-3xl' },
                              { name: 'Serif', class: 'font-serif', size: 'text-2xl' },
                              { name: 'Monospace', class: 'font-mono', size: 'text-xl' }
                            ].map((font, index) => (
                              <motion.div 
                                key={font.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-gray-400 font-medium">{font.name}</span>
                                  <code className="text-xs text-green-400 bg-gray-900/50 px-2 py-1 rounded">
                                    {font.class}
                                  </code>
                                </div>
                                <div className={`${font.class} ${font.size} text-white`}>
                                  The quick brown fox jumps
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="animations" className="space-y-6">
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                          <h4 className="font-semibold text-white mb-4">Animation System</h4>
                          <p className="text-gray-300 text-sm mb-6">
                            Create smooth, performant animations with custom keyframes and timing.
                          </p>
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <Button
                                onClick={toggleAnimation}
                                variant="outline"
                                size="sm"
                                className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                              >
                                {isAnimating ? (
                                  <>
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Play
                                  </>
                                )}
                              </Button>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">Speed:</span>
                                <Slider
                                  value={[animationSpeed]}
                                  onValueChange={([value]) => setAnimationSpeed(value)}
                                  max={3}
                                  min={0.5}
                                  step={0.5}
                                  className="w-24"
                                />
                                <span className="text-xs text-orange-400 font-mono min-w-[2rem]">
                                  {animationSpeed}x
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6">
                              {[
                                { name: 'Bounce', class: 'animate-bounce', color: 'bg-blue-500' },
                                { name: 'Pulse', class: 'animate-pulse', color: 'bg-green-500' },
                                { name: 'Spin', class: 'animate-spin', color: 'bg-purple-500' }
                              ].map((animation) => (
                                <div key={animation.name} className="text-center">
                                  <div 
                                    className={`w-16 h-16 ${animation.color} rounded-xl mx-auto mb-3 shadow-lg ${
                                      isAnimating ? animation.class : ''
                                    }`}
                                    style={{ animationDuration: `${1/animationSpeed}s` }}
                                  />
                                  <span className="text-xs text-gray-400 font-medium">
                                    {animation.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Code Example */}
              <div className="xl:col-span-2">
                <div className="sticky top-8">
                  <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2 text-lg">
                        <Code className="w-5 h-5 text-purple-400" />
                        tailwind.config.js
                      </CardTitle>
                      <p className="text-gray-400 text-sm">
                        Your complete configuration file
                      </p>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock 
                        code={codeExamples.configuration}
                        language="javascript"
                        filename="tailwind.config.js"
                        highlightLines={[8, 9, 10, 15, 16]}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Design Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              activeColorPalette === 'blue' ? 'bg-blue-500/20' :
              activeColorPalette === 'purple' ? 'bg-purple-500/20' :
              activeColorPalette === 'green' ? 'bg-green-500/20' :
              activeColorPalette === 'red' ? 'bg-red-500/20' :
              'bg-yellow-500/20'
            }`}>
              <Smartphone className={`w-6 h-6 ${
                activeColorPalette === 'blue' ? 'text-blue-400' :
                activeColorPalette === 'purple' ? 'text-purple-400' :
                activeColorPalette === 'green' ? 'text-green-400' :
                activeColorPalette === 'red' ? 'text-red-400' :
                'text-yellow-400'
              }`} />
            </div>
            Responsive Design Mastery
          </h2>

          <InteractiveExample
            title="Responsive Grid Builder"
            description="Build responsive layouts with live device previews"
            code={codeExamples.responsive}
          >
            <div className="space-y-6">
              {/* Device Selector */}
              <div className="flex justify-center gap-2">
                {(['mobile', 'tablet', 'desktop'] as const).map((device) => {
                  const Icon = { mobile: Smartphone, tablet: Tablet, desktop: Monitor }[device]
                  return (
                    <Button
                      key={device}
                      onClick={() => setCurrentDevice(device)}
                      variant={currentDevice === device ? "default" : "outline"}
                      size="sm"
                      className={currentDevice === device 
                        ? `${
                            activeColorPalette === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                            activeColorPalette === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                            activeColorPalette === 'green' ? 'bg-green-600 hover:bg-green-700' :
                            activeColorPalette === 'red' ? 'bg-red-600 hover:bg-red-700' :
                            'bg-yellow-600 hover:bg-yellow-700'
                          } text-white` 
                        : `${
                            activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                            activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                            activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                            activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                            'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                          }`
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {device}
                    </Button>
                  )
                })}
              </div>

              {/* Grid Controls */}
              <div className="flex items-center justify-center gap-4">
                <label className="text-white text-sm">Grid Columns:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 6].map((cols) => (
                    <Button
                      key={cols}
                      onClick={() => setGridColumns(cols)}
                      variant={gridColumns === cols ? "default" : "outline"}
                      size="sm"
                      className={gridColumns === cols 
                        ? `${
                            activeColorPalette === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                            activeColorPalette === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                            activeColorPalette === 'green' ? 'bg-green-600 hover:bg-green-700' :
                            activeColorPalette === 'red' ? 'bg-red-600 hover:bg-red-700' :
                            'bg-yellow-600 hover:bg-yellow-700'
                          } text-white` 
                        : `${
                            activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                            activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                            activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                            activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                            'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                          }`
                      }
                    >
                      {cols}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Responsive Preview */}
              <ResponsivePreview device={currentDevice}>
                <div className={`grid ${gridClasses[gridColumns as keyof typeof gridClasses]} gap-4`}>
                  {Array.from({length: gridColumns * 2}, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className={`h-20 rounded-lg flex items-center justify-center text-white font-semibold ${
                        colorPalettes[activeColorPalette as keyof typeof colorPalettes].primary
                      }`}
                    >
                      {i + 1}
                    </motion.div>
                  ))}
                </div>
              </ResponsivePreview>

              <Button
                onClick={() => markSectionComplete('Responsive Design')}
                variant={progress.completedSections.has('Responsive Design') ? "default" : "outline"}
                className={progress.completedSections.has('Responsive Design') 
                  ? "w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : `w-full ${
                      activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                      activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                      activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                      activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                      'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                    }`
                }
              >
                {progress.completedSections.has('Responsive Design') ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </div>
          </InteractiveExample>

          <div className={`mt-8 p-6 rounded-xl border ${
            activeColorPalette === 'blue' ? 'bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30' :
            activeColorPalette === 'purple' ? 'bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-500/30' :
            activeColorPalette === 'green' ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30' :
            activeColorPalette === 'red' ? 'bg-gradient-to-r from-red-900/20 to-rose-900/20 border-red-500/30' :
            'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Pro Tips for Responsive Design</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Use <code className="bg-gray-800 px-2 py-1 rounded">container mx-auto px-4 sm:px-6 lg:px-8</code> for consistent layouts</li>
                  <li>• Always design mobile-first, then enhance for larger screens</li>
                  <li>• Use <code className="bg-gray-800 px-2 py-1 rounded">aspect-ratio</code> utilities for consistent media dimensions</li>
                  <li>• Combine <code className="bg-gray-800 px-2 py-1 rounded">hidden</code> and <code className="bg-gray-800 px-2 py-1 rounded">block</code> classes for responsive visibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Utilities Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              activeColorPalette === 'blue' ? 'bg-blue-500/20' :
              activeColorPalette === 'purple' ? 'bg-purple-500/20' :
              activeColorPalette === 'green' ? 'bg-green-500/20' :
              activeColorPalette === 'red' ? 'bg-red-500/20' :
              'bg-yellow-500/20'
            }`}>
              <Sparkles className={`w-6 h-6 ${
                activeColorPalette === 'blue' ? 'text-blue-400' :
                activeColorPalette === 'purple' ? 'text-purple-400' :
                activeColorPalette === 'green' ? 'text-green-400' :
                activeColorPalette === 'red' ? 'text-red-400' :
                'text-yellow-400'
              }`} />
            </div>
            Custom Utilities &amp; Advanced Patterns
          </h2>

          <InteractiveExample
            title="Interactive Style Builder"
            description="Create and preview custom utility combinations"
            code={codeExamples.utilities}
          >
            <div className="space-y-6">
              {/* Style Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-sm mb-2">Border Radius:</label>
                  <select 
                    value={interactiveDemo.borderRadius}
                    onChange={(e) => setInteractiveDemo(prev => ({...prev, borderRadius: e.target.value}))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="none">None</option>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                    <option value="xl">Extra Large</option>
                    <option value="full">Full</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-2">Shadow:</label>
                  <select 
                    value={interactiveDemo.shadow}
                    onChange={(e) => setInteractiveDemo(prev => ({...prev, shadow: e.target.value}))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="none">None</option>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                    <option value="xl">Extra Large</option>
                    <option value="2xl">2XL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">Background:</label>
                  <select 
                    value={interactiveDemo.backgroundColor}
                    onChange={(e) => setInteractiveDemo(prev => ({...prev, backgroundColor: e.target.value}))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    {Object.keys(colorPalettes).map(color => (
                      <option key={color} value={color} className="capitalize">{color}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-gray-100 dark:bg-gray-200 p-8 rounded-lg">
                <motion.div 
                  className={`
                    ${colorPalettes[interactiveDemo.backgroundColor as keyof typeof colorPalettes].primary}
                    text-white p-8 text-center
                    ${interactiveDemo.borderRadius === 'none' ? '' : 
                      interactiveDemo.borderRadius === 'sm' ? 'rounded-sm' :
                      interactiveDemo.borderRadius === 'md' ? 'rounded-md' :
                      interactiveDemo.borderRadius === 'lg' ? 'rounded-lg' :
                      interactiveDemo.borderRadius === 'xl' ? 'rounded-xl' :
                      'rounded-full'}
                    ${interactiveDemo.shadow === 'none' ? '' :
                      interactiveDemo.shadow === 'sm' ? 'shadow-sm shadow-black/50' :
                      interactiveDemo.shadow === 'md' ? 'shadow-md shadow-black/50' :
                      interactiveDemo.shadow === 'lg' ? 'shadow-lg shadow-black/50' :
                      interactiveDemo.shadow === 'xl' ? 'shadow-xl shadow-black/50' :
                      'shadow-2xl shadow-black/50'}
                  `}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-3">Live Preview</h4>
                  <p className="text-sm opacity-90 mb-4">
                    Interactive styling with Tailwind utilities
                  </p>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Dynamic Styles
                  </Badge>
                </motion.div>
              </div>

              {/* Generated Classes */}
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Generated Classes:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const classes = `${colorPalettes[interactiveDemo.backgroundColor as keyof typeof colorPalettes].primary} text-white p-8 text-center rounded-${interactiveDemo.borderRadius} shadow-${interactiveDemo.shadow}`
                      navigator.clipboard.writeText(classes)
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code className="text-sm text-green-400 font-mono">
                  {`className="${colorPalettes[interactiveDemo.backgroundColor as keyof typeof colorPalettes].primary.replace('bg-', '')} text-white p-8 text-center rounded-${interactiveDemo.borderRadius} shadow-${interactiveDemo.shadow}"`}
                </code>
              </div>

              <Button
                onClick={() => markSectionComplete('Custom Utilities')}
                variant={progress.completedSections.has('Custom Utilities') ? "default" : "outline"}
                className={progress.completedSections.has('Custom Utilities') 
                  ? "w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : `w-full ${
                      activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                      activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                      activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                      activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                      'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                    }`
                }
              >
                {progress.completedSections.has('Custom Utilities') ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </div>
          </InteractiveExample>
          <Card className={`mt-12 bg-gray-900/50 border-gray-800`}>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-yellow-400">
                    <Lightbulb className="w-6 h-6" />
                    Community & Open Source
                </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
                <p>
                    Leveraging the open-source community is a superpower for any developer. Platforms like{' '}
                    <a href="https://ui.aceternity.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Aceternity UI</a>{' '}
                    and{' '}
                    <a href="https://blocks.mvp-subha.me/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mvpblocks</a>{' '}
                    offer a wealth of free, high-quality components that can dramatically accelerate your workflow and enhance your project&apos;s UI.
                </p>
                <p>
                    Furthermore, creating your own UI library is an excellent way to deepen your skills. A well-crafted library not only serves as a valuable personal project but can also open up professional opportunities. For instance, the creator of{' '}
                    <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ShadCN/UI</a>{' '}
                    was hired by Vercel, a testament to the value of such endeavors.
                </p>
            </CardContent>
        </Card>
          {/* Component Library Showcase */}
          <div className={`mt-6 p-6  `}> </div>
          <InteractiveExample
            title="Component Library Showcase"
            description="Explore comprehensive component patterns with live customization"
            code={codeExamples.components}
          >
            <div className="space-y-8">
              {/* Component Category Tabs */}
              <Tabs value={selectedComponentCategory} onValueChange={setSelectedComponentCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-gray-800/80 p-1 rounded-xl mb-6">
                  <TabsTrigger value="buttons" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Buttons</TabsTrigger>
                  <TabsTrigger value="cards" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all">Cards</TabsTrigger>
                  <TabsTrigger value="forms" className="data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">Forms</TabsTrigger>
                  <TabsTrigger value="navigation" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all">Navigation</TabsTrigger>
                  <TabsTrigger value="feedback" className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all">Feedback</TabsTrigger>
                </TabsList>

                {/* BUTTONS TAB */}
                <TabsContent value="buttons" className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Interactive Button Variants
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-white text-sm mb-2">Button Style:</label>
                        <select value={componentDemo.buttonStyle} onChange={e => setComponentDemo(prev => ({...prev, buttonStyle: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="solid">Solid</option>
                          <option value="outline">Outline</option>
                          <option value="ghost">Ghost</option>
                          <option value="gradient">Gradient</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-2">Button Size:</label>
                        <select value={componentDemo.buttonSize} onChange={e => setComponentDemo(prev => ({...prev, buttonSize: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="sm">Small</option>
                          <option value="md">Medium</option>
                          <option value="lg">Large</option>
                          <option value="xl">Extra Large</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-2">Button Shape:</label>
                        <select value={componentDemo.buttonShape} onChange={e => setComponentDemo(prev => ({...prev, buttonShape: e.target.value}))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
                          <option value="rounded">Rounded</option>
                          <option value="square">Square</option>
                          <option value="pill">Pill</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center bg-gray-100 dark:bg-gray-200 p-8 rounded-lg">
                      {['primary', 'secondary', 'success', 'warning', 'danger'].map(color => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            ${componentDemo.buttonSize === 'sm' ? 'px-3 py-1.5 text-sm' :
                              componentDemo.buttonSize === 'md' ? 'px-4 py-2 text-base' :
                              componentDemo.buttonSize === 'lg' ? 'px-6 py-3 text-lg' :
                              'px-8 py-4 text-xl'}
                            ${componentDemo.buttonShape === 'rounded' ? 'rounded-lg' :
                              componentDemo.buttonShape === 'square' ? 'rounded-none' :
                              'rounded-full'}
                            ${componentDemo.buttonStyle === 'solid' ? 
                              (color === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                               color === 'secondary' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
                               color === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                               color === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                               'bg-red-600 hover:bg-red-700 text-white') :
                              componentDemo.buttonStyle === 'outline' ?
                              (color === 'primary' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' :
                               color === 'secondary' ? 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white' :
                               color === 'success' ? 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white' :
                               color === 'warning' ? 'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white' :
                               'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white') :
                              componentDemo.buttonStyle === 'ghost' ?
                              (color === 'primary' ? 'text-blue-600 hover:bg-blue-100' :
                               color === 'secondary' ? 'text-gray-600 hover:bg-gray-100' :
                               color === 'success' ? 'text-green-600 hover:bg-green-100' :
                               color === 'warning' ? 'text-yellow-600 hover:bg-yellow-100' :
                               'text-red-600 hover:bg-red-100') :
                              (color === 'primary' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' :
                               color === 'secondary' ? 'bg-gradient-to-r from-gray-500 to-gray-700 text-white' :
                               color === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
                               color === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' :
                               'bg-gradient-to-r from-red-500 to-pink-600 text-white')}
                            font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          `}
                          aria-label={`${color} button`}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* CARDS TAB */}
                <TabsContent value="cards" className="space-y-8">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Advanced Card Patterns
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Basic Card */}
                      <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-gray-900 dark:text-white">Basic Card</span>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">New</Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Clean, minimal card design with proper spacing and typography hierarchy.</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">2 hours ago</span>
                          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">Read more →</Button>
                        </div>
                      </Card>
                      {/* Gradient Card */}
                      <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold">Gradient Card</span>
                            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" />
                          </div>
                          <p className="text-white/90 text-sm mb-4">Eye-catching gradient background with animated elements and hover effects.</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 bg-white/20 rounded-full border-2 border-white/50" />
                            <div className="w-6 h-6 bg-white/20 rounded-full border-2 border-white/50" />
                            <div className="w-6 h-6 bg-white/20 rounded-full border-2 border-white/50" />
                          </div>
                          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">Explore</Button>
                        </div>
                      </Card>
                      {/* Glass Morphism Card */}
                      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between" style={{ backdropFilter: 'blur(12px)' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-white">Glass Morphism</span>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full" />
                              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                              <div className="w-2 h-2 bg-red-400 rounded-full" />
                            </div>
                          </div>
                          <p className="text-gray-200 text-sm mb-4">Modern glass morphism effect with backdrop blur and transparency.</p>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-300">Active now</div>
                            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">View Details</Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* FORMS TAB */}
                <TabsContent value="forms" className="space-y-8">
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                    <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-400" />
                      Advanced Form Components
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Contact Form */}
                      <form className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="John" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Doe" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                          <input type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                          <textarea className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none" rows={4} placeholder="Tell us about your project..." />
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                      </form>
                      {/* Login Form */}
                      <form className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email or Username</label>
                          <input type="text" className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Enter your email" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                          <input type="password" className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Enter your password" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500" />
                            <label className="ml-2 text-sm text-gray-300">Remember me</label>
                          </div>
                          <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>

                {/* NAVIGATION TAB */}
                <TabsContent value="navigation" className="space-y-8">
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                    <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      Navigation Components
                    </h4>
                    <div className="space-y-8">
                      {/* Top Navigation */}
                      <nav className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-lg flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">L</span>
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">Logo</span>
                          </div>
                          <nav className="hidden md:flex space-x-6">
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
                            <a href="#" className="text-blue-600 font-medium">Services</a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
                          </nav>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">Sign In</Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                        </div>
                      </nav>
                      {/* Sidebar Navigation */}
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <aside className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-2">
                          <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-600">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            </div>
                            <span className="text-white font-medium">Dashboard</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            <CheckCircle className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-300">Projects</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            <Target className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-300">Analytics</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            <Sparkles className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-300">Settings</span>
                          </div>
                        </aside>
                        <main className="lg:col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-32">
                          <h6 className="font-semibold text-gray-900 dark:text-white mb-2">Main Content Area</h6>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">This is where the main content would be displayed based on the selected navigation item.</p>
                        </main>
                      </div>
                      {/* Breadcrumb Navigation */}
                      <nav className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                          <li><a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Home</a></li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Components</a>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            <span className="text-gray-900 dark:text-white font-medium">Navigation</span>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </TabsContent>

                {/* FEEDBACK TAB */}
                <TabsContent value="feedback" className="space-y-8">
                  <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl p-6 border border-red-500/20">
                    <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-red-400" />
                      Feedback & Status Components
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Alerts */}
                      <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <div className="ml-3">
                            <h6 className="text-sm font-medium text-green-800 dark:text-green-200">Success Alert</h6>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">Your changes have been saved successfully!</p>
                          </div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-center">
                          <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <div className="ml-3">
                            <h6 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Warning Alert</h6>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Please review your input before proceeding.</p>
                          </div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
                          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                          <div className="ml-3">
                            <h6 className="text-sm font-medium text-red-800 dark:text-red-200">Error Alert</h6>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">Something went wrong. Please try again.</p>
                          </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center">
                          <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                          <div className="ml-3">
                            <h6 className="text-sm font-medium text-blue-800 dark:text-blue-200">Info Alert</h6>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">New updates are available for your dashboard.</p>
                          </div>
                        </div>
                      </div>
                      {/* Badges and Progress */}
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-white font-medium mb-4">Status Badges</h5>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Inactive</Badge>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Draft</Badge>
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Premium</Badge>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-white font-medium mb-4">Progress Indicators</h5>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Upload Progress</span>
                                <span className="text-gray-300">75%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div className="bg-blue-600 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1.5 }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Storage Used</span>
                                <span className="text-gray-300">45%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div className="bg-green-600 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 1.5, delay: 0.2 }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">CPU Usage</span>
                                <span className="text-gray-300">89%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div className="bg-red-600 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: '89%' }} transition={{ duration: 1.5, delay: 0.4 }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-white font-medium mb-4">Loading States</h5>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                              <span className="text-gray-300 text-sm">Loading...</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                              <span className="text-gray-300 text-sm">Processing...</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 border-2 border-gray-600 border-l-blue-600 rounded-full animate-spin" />
                              <span className="text-gray-300 text-sm">Syncing data...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Button
                onClick={() => markSectionComplete('Components')}
                variant={progress.completedSections.has('Components') ? "default" : "outline"}
                className={progress.completedSections.has('Components') 
                  ? "w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : `w-full ${
                      activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                      activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                      activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                      activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                      'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                    }`
                }
              >
                {progress.completedSections.has('Components') ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 mr-2" />
                    Mark Section Complete
                  </>
                )}
              </Button>
            </div>
          </InteractiveExample>
        </section>

        {/* Performance & Optimization */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              activeColorPalette === 'blue' ? 'bg-blue-500/20' :
              activeColorPalette === 'purple' ? 'bg-purple-500/20' :
              activeColorPalette === 'green' ? 'bg-green-500/20' :
              activeColorPalette === 'red' ? 'bg-red-500/20' :
              'bg-yellow-500/20'
            }`}>
              <Rocket className={`w-6 h-6 ${
                activeColorPalette === 'blue' ? 'text-blue-400' :
                activeColorPalette === 'purple' ? 'text-purple-400' :
                activeColorPalette === 'green' ? 'text-green-400' :
                activeColorPalette === 'red' ? 'text-red-400' :
                'text-yellow-400'
              }`} />
            </div>
            Performance &amp; Optimization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Zap,
                title: "Purge Unused CSS",
                description: "Configure content paths properly to remove unused styles in production builds.",
                tip: "Always include all template paths in your content configuration."
              },
              {
                icon: Target,
                title: "JIT Mode Benefits",
                description: "Just-In-Time compilation generates styles on-demand, reducing build times.",
                tip: "JIT mode is enabled by default in Tailwind CSS v3+."
              },
              {
                icon: Lightbulb,
                title: "Avoid @apply Overuse",
                description: "Use utility classes directly instead of @apply in component-level CSS.",
                tip: "Reserve @apply for base styles and truly reusable patterns."
              },
              {
                icon: Rocket,
                title: "Bundle Size Optimization",
                description: "Use tree-shaking and proper imports to minimize JavaScript bundle size.",
                tip: "Import only the Tailwind features you actually use."
              },
              {
                icon: Star,
                title: "CSS Custom Properties",
                description: "Leverage CSS variables for dynamic theming and better performance.",
                tip: "Use CSS custom properties for values that change at runtime."
              },
              {
                icon: Sparkles,
                title: "Component Extraction",
                description: "Extract commonly used utility combinations into reusable components.",
                tip: "Create a design system with consistent component patterns."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-gray-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">                    <div className={`p-2 rounded-lg ${
                      activeColorPalette === 'blue' ? 'bg-blue-500/20' :
                      activeColorPalette === 'purple' ? 'bg-purple-500/20' :
                      activeColorPalette === 'green' ? 'bg-green-500/20' :
                      activeColorPalette === 'red' ? 'bg-red-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        activeColorPalette === 'blue' ? 'text-blue-400' :
                        activeColorPalette === 'purple' ? 'text-purple-400' :
                        activeColorPalette === 'green' ? 'text-green-400' :
                        activeColorPalette === 'red' ? 'text-red-400' :
                        'text-yellow-400'
                      }`} />
                    </div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-400 text-xs">{item.tip}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={() => markSectionComplete('Performance')}
            variant={progress.completedSections.has('Performance') ? "default" : "outline"}
            className={progress.completedSections.has('Performance') 
              ? "w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
              : `w-full ${
                  activeColorPalette === 'blue' ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' :
                  activeColorPalette === 'purple' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' :
                  activeColorPalette === 'green' ? 'border-green-500 text-green-400 hover:bg-green-500/10' :
                  activeColorPalette === 'red' ? 'border-red-500 text-red-400 hover:bg-red-500/10' :
                  'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10'
                }`
            }
          >
            {progress.completedSections.has('Performance') ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 mr-2" />
                Mark Section Complete
              </>
            )}
          </Button>
        </section>

        {/* Completion Celebration */}
        <AnimatePresence>
          {progress.completedSections.size === sections.length && (
            <motion.section
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl animate-pulse" />
              <Card className="relative bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm border-green-500/50">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-8xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Congratulations!
                  </h2>
                  <p className="text-xl text-green-400 mb-8">
                    You&apos;ve mastered all sections of the Tailwind CSS guide!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{progress.completedSections.size}/{sections.length}</div>
                      <div className="text-sm text-gray-400">Sections Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{progress.totalInteractions}</div>
                      <div className="text-sm text-gray-400">Interactions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white capitalize">{activeColorPalette}</div>
                      <div className="text-sm text-gray-400">Favorite Theme</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={resetProgress}
                      className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 transform hover:scale-105 transition-all"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Share Achievement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Conclusion */}
        <section className="prose prose-lg prose-invert max-w-none">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">Key Takeaways</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Mastering Tailwind CSS involves more than memorizing utility classes. It requires 
                  understanding configuration, responsive design principles, performance optimization, 
                  and building maintainable component systems.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The interactive examples in this guide demonstrate real-world patterns that you can 
                  apply immediately in your projects. Remember to always prioritize accessibility, 
                  performance, and user experience in your implementations.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span className="text-gray-300 text-sm">Interactive learning with immediate feedback</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-gray-300 text-sm">Professional patterns and best practices</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-300 text-sm">Performance optimization techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-gray-300 text-sm">Responsive design mastery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-gray-300 text-sm">Custom utility creation and management</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BlogPostLayout>
  )
}
