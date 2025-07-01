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
    <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Overall Progress</span>
            <span className="text-purple-400 font-semibold">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {sections.map((section) => (
              <div key={section} className="flex items-center gap-2">
                {progress.completedSections.has(section) ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-600" />
                )}
                <span className={`text-xs ${
                  progress.completedSections.has(section) 
                    ? 'text-green-400' 
                    : 'text-gray-400'
                }`}>
                  {section}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Skill Level: <span className="text-purple-400 capitalize">{progress.skillLevel}</span>
            </div>
            <div className="text-xs text-gray-400">
              Interactions: <span className="text-blue-400">{progress.totalInteractions}</span>
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

  const sections = ['Configuration', 'Responsive Design', 'Custom Utilities', 'Components', 'Performance']
  
  // Blog post metadata
  const post = {
    title: 'Mastering Tailwind CSS: Advanced Techniques & Interactive Guide',
    date: 'January 15, 2025',
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
    components: `<!-- Reusable Component Patterns -->

<!-- Button Component -->
<button class="
  inline-flex items-center justify-center
  px-4 py-2
  bg-blue-600 hover:bg-blue-700 focus:bg-blue-700
  text-white font-medium
  rounded-lg
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
  transform hover:scale-105 active:scale-95
">
  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 12l-4-4h8l-4 4z"/>
  </svg>
  Click me
</button>

<!-- Card Component -->
<div class="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-800
  rounded-xl
  p-6
  shadow-lg hover:shadow-xl
  transition-all duration-300
  transform hover:-translate-y-1
">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      Card Title
    </h3>
    <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
      New
    </span>
  </div>
  <p class="text-gray-600 dark:text-gray-300 mb-4">
    Card content with proper spacing and typography.
  </p>
  <div class="flex justify-between items-center">
    <span class="text-sm text-gray-500">Updated 2 hours ago</span>
    <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
      Read more →
    </button>
  </div>
</div>

<!-- Input Component -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Email Address
  </label>
  <input 
    type="email" 
    class="
      w-full px-3 py-2
      border border-gray-300 dark:border-gray-700
      rounded-lg
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-colors duration-200
    "
    placeholder="Enter your email"
  />
</div>`
  }

  return (
    <BlogPostLayout post={post}>
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
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            Advanced Configuration
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-gray-300 mb-6">
                Mastering Tailwind configuration is crucial for creating scalable design systems. 
                Learn how to extend the default theme, create custom utilities, and optimize your build process.
              </p>
              
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Configuration Explorer
                    <Button
                      onClick={() => markSectionComplete('Configuration')}
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedUtility} onValueChange={setSelectedUtility}>
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                      <TabsTrigger value="colors">Colors</TabsTrigger>
                      <TabsTrigger value="spacing">Spacing</TabsTrigger>
                      <TabsTrigger value="typography">Typography</TabsTrigger>
                      <TabsTrigger value="animations">Animations</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="colors" className="space-y-4">
                      <p className="text-gray-300 text-sm">
                        Explore custom color palette configuration:
                      </p>
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                        {Object.entries(colorPalettes).map(([name, colors]) => (
                          <div key={name} className="text-center">
                            <div 
                              className={`w-12 h-12 rounded-lg mb-2 ${colors.primary} hover:scale-110 transition-transform cursor-pointer`}
                              onClick={() => setActiveColorPalette(name)}
                            />
                            <span className="text-xs text-gray-400 capitalize">{name}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="spacing" className="space-y-4">
                      <p className="text-gray-300 text-sm">
                        Interactive spacing demonstration:
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white text-sm mb-2">
                            Padding: {interactiveDemo.padding}
                          </label>
                          <Slider
                            value={[interactiveDemo.padding]}
                            onValueChange={([value]) => 
                              setInteractiveDemo(prev => ({...prev, padding: value}))
                            }
                            max={12}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div className={`bg-purple-500/20 border border-purple-500/50 rounded-lg`} style={{ padding: `${interactiveDemo.padding * 0.25}rem` }}>
                          <div className="bg-purple-500 text-white p-3 rounded text-center">
                            Dynamic padding: p-{interactiveDemo.padding}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="typography" className="space-y-4">
                      <div className="space-y-4">
                        <div className="text-xs text-gray-500 font-mono">font-sans</div>
                        <div className="text-4xl font-sans">The quick brown fox</div>
                        <div className="text-xs text-gray-500 font-mono">font-serif</div>
                        <div className="text-4xl font-serif">The quick brown fox</div>
                        <div className="text-xs text-gray-500 font-mono">font-mono</div>
                        <div className="text-4xl font-mono">The quick brown fox</div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="animations" className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <Button
                          onClick={toggleAnimation}
                          variant="outline"
                          size="sm"
                          className="border-gray-700"
                        >
                          {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                          {isAnimating ? 'Pause' : 'Play'} Animations
                        </Button>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Speed:</span>
                          <Slider
                            value={[animationSpeed]}
                            onValueChange={([value]) => setAnimationSpeed(value)}
                            max={3}
                            min={0.5}
                            step={0.5}
                            className="w-20"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className={`w-16 h-16 bg-blue-500 rounded-lg ${isAnimating ? 'animate-bounce' : ''}`} style={{ animationDuration: `${1/animationSpeed}s` }} />
                        <div className={`w-16 h-16 bg-green-500 rounded-lg ${isAnimating ? 'animate-pulse' : ''}`} style={{ animationDuration: `${2/animationSpeed}s` }} />
                        <div className={`w-16 h-16 bg-purple-500 rounded-lg ${isAnimating ? 'animate-spin' : ''}`} style={{ animationDuration: `${1/animationSpeed}s` }} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <CodeBlock 
                code={codeExamples.configuration}
                language="javascript"
                filename="tailwind.config.js"
                highlightLines={[8, 9, 10, 15, 16]}
              />
            </div>
          </div>
        </section>

        {/* Responsive Design Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Smartphone className="w-6 h-6 text-blue-400" />
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
                      className={currentDevice === device ? "" : "border-gray-700"}
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
                      className={gridColumns === cols ? "" : "border-gray-700"}
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
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Section Complete
              </Button>
            </div>
          </InteractiveExample>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30">
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
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-green-400" />
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
              <div className="bg-gray-800 p-8 rounded-lg">
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
                      interactiveDemo.shadow === 'sm' ? 'shadow-sm' :
                      interactiveDemo.shadow === 'md' ? 'shadow-md' :
                      interactiveDemo.shadow === 'lg' ? 'shadow-lg' :
                      interactiveDemo.shadow === 'xl' ? 'shadow-xl' :
                      'shadow-2xl'}
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
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Section Complete
              </Button>
            </div>
          </InteractiveExample>

          {/* Custom Utility Examples */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <h4 className="text-gradient text-xl font-bold mb-3">
                  Gradient Text
                </h4>
                <p className="text-gray-300 text-sm">
                  Custom utility for gradient text effects using background-clip.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardContent className="p-6">
                <h4 className="text-white font-bold mb-3">
                  Glass Morphism
                </h4>
                <p className="text-white/80 text-sm">
                  Backdrop blur effect with semi-transparent backgrounds.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 custom-shadow">
              <CardContent className="p-6">
                <h4 className="text-gray-900 dark:text-white font-bold mb-3">
                  Custom Shadow
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Enhanced shadow effects with multiple layers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Patterns Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            Professional Component Patterns
          </h2>

          <InteractiveExample
            title="Component Library Showcase"
            description="Explore reusable component patterns and design systems"
            code={codeExamples.components}
          >
            <div className="space-y-8">
              {/* Button Variants */}
              <div>
                <h4 className="text-white font-semibold mb-4">Button Components</h4>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Primary Button
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Secondary Button
                  </Button>
                  <Button variant="destructive">
                    Danger Button
                  </Button>
                  <Button variant="ghost" className="text-gray-300 hover:bg-gray-800">
                    Ghost Button
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Small Button
                  </Button>
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Large Button
                  </Button>
                </div>
              </div>

              {/* Card Variants */}
              <div>
                <h4 className="text-white font-semibold mb-4">Card Components</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Basic Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Simple card with clean styling and proper contrast.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <CardHeader>
                      <CardTitle>Gradient Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/90 text-sm">
                        Eye-catching gradient background with proper text contrast.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Interactive Card</CardTitle>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-3">
                        Card with interactive elements and status indicators.
                      </p>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                        Action
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Form Components */}
              <div>
                <h4 className="text-white font-semibold mb-4">Form Components</h4>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      rows={3}
                      placeholder="Your message..."
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => markSectionComplete('Components')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Section Complete
              </Button>
            </div>
          </InteractiveExample>
        </section>

        {/* Performance & Optimization */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Rocket className="w-6 h-6 text-red-400" />
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <item.icon className="w-5 h-5 text-blue-400" />
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
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Section Complete
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
                      <div className="text-3xl font-bold text-white capitalize">{progress.skillLevel}</div>
                      <div className="text-sm text-gray-400">Skill Level</div>
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
