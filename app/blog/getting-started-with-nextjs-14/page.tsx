"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BlogPostLayout, CodeBlock, InteractiveExample } from '@/components/ui/blog-post-layout'

const NextJSGuidePost = () => {
  const [counter, setCounter] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [animatedText, setAnimatedText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [projectStructure, setProjectStructure] = useState({
    expanded: false,
    selectedFile: null as number | null
  })

  const tutorialSteps = [
    { id: 0, title: "Installation", completed: false },
    { id: 1, title: "Project Setup", completed: false },
    { id: 2, title: "App Router", completed: false },
    { id: 3, title: "Components", completed: false },
    { id: 4, title: "Configuration", completed: false }
  ]

  const [steps, setSteps] = useState(tutorialSteps)

  const quizQuestions = [
    {
      id: 1,
      question: "What directive is required for Client Components in Next.js 14?",
      options: ['"use client"', '"use server"', '"use browser"', '"client-side"'],
      correct: 0
    },
    {
      id: 2,
      question: "Which is the default component type in Next.js 14 App Router?",
      options: ["Client Components", "Server Components", "Static Components", "Hybrid Components"],
      correct: 1
    },
    {
      id: 3,
      question: "What file defines the root layout in App Router?",
      options: ["index.tsx", "page.tsx", "layout.tsx", "root.tsx"],
      correct: 2
    }
  ]

  const typewriterText = "Welcome to the interactive Next.js 14 guide! 🚀"

  useEffect(() => {
    if (typingIndex < typewriterText.length) {
      const timer = setTimeout(() => {
        setAnimatedText(prev => prev + typewriterText[typingIndex])
        setTypingIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [typingIndex, typewriterText])

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ))
    setCurrentStep(prev => Math.max(prev, stepId + 1))
  }

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateQuizScore = () => {
    const correctAnswers = quizQuestions.filter(q => 
      quizAnswers[q.id] === q.correct
    ).length
    return (correctAnswers / quizQuestions.length) * 100
  }

  const post = {
    title: 'Getting Started with Next.js 14: A Complete Interactive Guide',
    date: 'December 15, 2024',
    readTime: 12,
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development', 'Interactive Tutorial'],
    author: 'Sabittwa Banerjee'
  }

  const nextConfigCode = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['example.com', 'cdn.example.com']
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}

module.exports = nextConfig`

  const serverComponentCode = `// app/users/page.tsx
import { Suspense } from 'react'

// This is a Server Component
async function Users() {
  // Fetch data directly in the component
  const users = await fetch('https://api.example.com/users')
    .then(res => res.json())

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default function UsersPage() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <Users />
    </Suspense>
  )
}`

  const clientComponentCode = `"use client"

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Counter mounted!')
  }, [])

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl mb-4">Interactive Counter</h2>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          -
        </button>
        <span className="text-2xl font-bold text-rose-500">{count}</span>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => setCount(0)}
        className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Reset
      </button>
    </div>
  )
}`

  const formCode = `"use client"

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:border-rose-500 focus:outline-none"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:border-rose-500 focus:outline-none"
          placeholder="your@email.com"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
      >
        Submit
      </button>
    </form>
  )
}`

  return (
    <BlogPostLayout post={post}>
      <div className="space-y-8">
        {/* Hero Banner with Next.js Logo */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-blue-500/10"></div>
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:50px_50px] animate-pulse"></div>
          </div>
          
          <div className="relative px-8 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                      <Image 
                        src="/next.svg" 
                        alt="Next.js Logo" 
                        width={128}
                        height={128}
                        className="w-24 h-24 md:w-32 md:h-32 filter drop-shadow-lg"
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                      Next.js <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">14</span>
                    </h1>
                    <div className="text-xl md:text-2xl font-bold text-white mb-4 min-h-[2rem]">
                      {animatedText}
                      <span className="animate-pulse text-rose-500">|</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                    An interactive journey through Next.js 14&apos;s revolutionary features. 
                    Learn by doing with hands-on examples, quizzes, and real-time progress tracking.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {[
                      { icon: "⚡", text: "Interactive Learning" },
                      { icon: "🎯", text: "Hands-on Examples" },
                      { icon: "📊", text: "Progress Tracking" },
                      { icon: "🧠", text: "Knowledge Quizzes" }
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                      >
                        <span className="text-lg">{feature.icon}</span>
                        <span className="text-white text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>
        </section>

        {/* Progress Tracker */}
        <section className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">📚 Your Learning Progress</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                      ? 'bg-rose-500 text-white animate-pulse' 
                      : 'bg-gray-600 text-gray-400'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <span className={`${step.completed ? 'text-green-400' : 'text-gray-300'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Next.js 14 brings revolutionary changes to React development with the App Router, 
            Server Components, and enhanced performance optimizations. In this comprehensive guide, 
            we&apos;ll explore everything you need to know to get started with Next.js 14.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">What&apos;s New in Next.js 14?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                icon: "⚡", 
                title: "Turbopack (Beta)", 
                desc: "Rust-based bundler for faster development",
                color: "from-yellow-500 to-orange-500" 
              },
              { 
                icon: "🔄", 
                title: "Server Actions (Stable)", 
                desc: "Full-stack React architecture",
                color: "from-blue-500 to-purple-500" 
              },
              { 
                icon: "🎯", 
                title: "Partial Prerendering", 
                desc: "Combine static and dynamic content",
                color: "from-green-500 to-teal-500" 
              },
              { 
                icon: "📚", 
                title: "Next.js Learn Course", 
                desc: "Updated learning materials",
                color: "from-pink-500 to-rose-500" 
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-rose-500/50 transition-all duration-300 hover:transform hover:scale-105"
                onClick={() => completeStep(0)}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} text-white text-xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
                <div className="mt-4 text-xs text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to mark as learned! ✨
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Setting Up Your First Next.js 14 Project</h2>
          <p className="text-gray-300 mb-4">
            Getting started with Next.js 14 is straightforward. Let&apos;s create a new project from scratch:
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Step 1: Installation</h3>
                <button
                  onClick={() => completeStep(1)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm"
                >
                  Mark Complete
                </button>
              </div>
              <CodeBlock 
                code={`npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm run dev`}
                language="bash"
                filename="terminal"
              />
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Step 2: Configuration Options</h3>
                <button
                  onClick={() => completeStep(2)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm"
                >
                  Mark Complete
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                During setup, you&apos;ll be prompted with several options. Here&apos;s what I recommend for most projects:
              </p>
              <CodeBlock 
                code={`✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes  
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use \`src/\` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias (@/*)? … Yes`}
                language="text"
                filename="setup-options"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Understanding the App Router</h2>
          <p className="text-gray-300 mb-4">
            The App Router is the new paradigm in Next.js 14. Unlike the Pages Router, 
            it uses a file-system based router built on React Server Components.
          </p>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-rose-500">Interactive File Structure</h3>
              <button
                onClick={() => {
                  setProjectStructure(prev => ({ ...prev, expanded: !prev.expanded }))
                  completeStep(2)
                }}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                {projectStructure.expanded ? 'Collapse' : 'Explore Structure'}
              </button>
            </div>
            
            {projectStructure.expanded && (
              <div className="space-y-2 font-mono text-sm">
                {[
                  { name: 'app/', type: 'folder', desc: 'Main application directory' },
                  { name: '├── layout.tsx', type: 'file', desc: 'Root layout component' },
                  { name: '├── page.tsx', type: 'file', desc: 'Home page component' },
                  { name: '├── loading.tsx', type: 'file', desc: 'Loading UI component' },
                  { name: '├── error.tsx', type: 'file', desc: 'Error handling component' },
                  { name: '├── not-found.tsx', type: 'file', desc: '404 page component' },
                  { name: '├── about/', type: 'folder', desc: 'About page route' },
                  { name: '│   └── page.tsx', type: 'file', desc: '/about page' },
                  { name: '└── blog/', type: 'folder', desc: 'Blog routes' },
                  { name: '    ├── page.tsx', type: 'file', desc: '/blog page' },
                  { name: '    └── [slug]/', type: 'folder', desc: 'Dynamic route' },
                  { name: '        └── page.tsx', type: 'file', desc: '/blog/[slug] page' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      projectStructure.selectedFile === index 
                        ? 'bg-rose-500/20 border border-rose-500/30' 
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => setProjectStructure(prev => ({ 
                      ...prev, 
                      selectedFile: prev.selectedFile === index ? null : index 
                    }))}
                  >
                    <span className={`${item.type === 'folder' ? 'text-blue-400' : 'text-green-400'}`}>
                      {item.name}
                    </span>
                    <span className="text-gray-500 text-xs hidden md:block">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Server vs Client Components</h2>
          <p className="text-gray-300 mb-4">
            One of the biggest changes in Next.js 14 is the distinction between Server and Client Components. 
            Understanding when to use each is crucial for optimal performance.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-rose-500">Server Components (Default)</h3>
          <p className="text-gray-300 mb-4">
            Server Components run on the server and can fetch data directly, reducing client-side JavaScript bundle size.
          </p>

          <CodeBlock 
            code={serverComponentCode}
            language="tsx"
            filename="app/users/page.tsx"
          />

          <h3 className="text-2xl font-semibold mb-4 text-rose-500">Client Components</h3>
          <p className="text-gray-300 mb-4">
            Client Components run in the browser and can use hooks, event handlers, and browser APIs. 
            They must be explicitly marked with the &ldquo;use client&rdquo; directive.
          </p>

          <CodeBlock 
            code={clientComponentCode}
            language="tsx"
            filename="components/Counter.tsx"
          />
        </section>

        <InteractiveExample
          title="Interactive Counter Example"
          description="Try out this interactive counter built with a Client Component. Notice how it maintains state and responds to user interactions."
          code={clientComponentCode}
        >
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl mb-4">Interactive Counter</h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCounter(counter - 1)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                -
              </button>
              <span className="text-2xl font-bold text-rose-500">{counter}</span>
              <button 
                onClick={() => setCounter(counter + 1)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                +
              </button>
            </div>
            <button 
              onClick={() => setCounter(0)}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <div className="mt-4 text-sm text-gray-400">
              Current count: <span className="text-rose-400 font-semibold">{counter}</span>
            </div>
          </div>
        </InteractiveExample>

        {/* Interactive Quiz Section */}
        <section className="bg-gradient-to-r from-purple-900/20 to-rose-900/20 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-white">🧠 Test Your Knowledge</h2>
          <p className="text-gray-300 mb-6">
            Let&apos;s see how much you&apos;ve learned! Answer these questions to test your understanding of Next.js 14.
          </p>
          
          <div className="space-y-6">
            {quizQuestions.map((question) => (
              <div key={question.id} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {question.id}. {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(question.id, index)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        quizAnswers[question.id] === index
                          ? 'border-rose-500 bg-rose-500/20 text-white'
                          : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  ))}
                </div>
                {quizAnswers[question.id] !== undefined && (
                  <div className={`mt-3 p-3 rounded-lg ${
                    quizAnswers[question.id] === question.correct
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {quizAnswers[question.id] === question.correct
                      ? '✅ Correct! Great job!'
                      : `❌ Incorrect. The correct answer is: ${question.options[question.correct]}`
                    }
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(quizAnswers).length === quizQuestions.length && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-2">🎉 Quiz Complete!</h3>
              <p className="text-lg text-green-400">
                Your Score: {calculateQuizScore().toFixed(0)}% ({quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length}/{quizQuestions.length})
              </p>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setQuizAnswers({})
                    completeStep(3)
                  }}
                  className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Configuration and Optimization</h2>
          <p className="text-gray-300 mb-4">
            Next.js 14 offers extensive configuration options. Here&apos;s a typical <code>next.config.js</code> setup:
          </p>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Advanced Configuration</h3>
              <button
                onClick={() => completeStep(4)}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm"
              >
                Mark Complete
              </button>
            </div>
            <CodeBlock 
              code={nextConfigCode}
              language="javascript"
              filename="next.config.js"
            />
          </div>
        </section>

        <InteractiveExample
          title="Form Handling Example"
          description="This form demonstrates client-side state management and form handling in Next.js 14."
          code={formCode}
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              alert(`Form submitted with: ${formData.name}, ${formData.email}`)
            }} 
            className="space-y-4 p-4 bg-gray-800 rounded-lg"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:border-rose-500 focus:outline-none text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:border-rose-500 focus:outline-none text-white"
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </InteractiveExample>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                emoji: "📦",
                title: "Bundle Optimization",
                desc: "Use Server Components for data fetching and Client Components only when necessary for interactivity.",
                color: "from-blue-500 to-purple-500"
              },
              {
                emoji: "🚀",
                title: "Performance",
                desc: "Leverage Next.js built-in optimizations like Image component, Font optimization, and automatic code splitting.",
                color: "from-green-500 to-teal-500"
              },
              {
                emoji: "🔒",
                title: "Security",
                desc: "Use Server Actions for secure data mutations and keep sensitive logic on the server.",
                color: "from-red-500 to-pink-500"
              },
              {
                emoji: "🎯",
                title: "SEO",
                desc: "Take advantage of Server Components for better SEO and faster initial page loads.",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((practice, index) => (
              <div 
                key={index}
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-rose-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${practice.color} text-white text-xl mb-4`}>
                  {practice.emoji}
                </div>
                <h4 className="font-semibold text-rose-500 mb-2">{practice.title}</h4>
                <p className="text-gray-300 text-sm">{practice.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Completion Celebration */}
        {steps.every(step => step.completed) && (
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl animate-pulse"></div>
            <div className="relative p-8 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-green-500/50">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-4xl font-bold text-white mb-4">Congratulations!</h2>
                <p className="text-xl text-green-400 mb-6">
                  You&apos;ve completed the interactive Next.js 14 guide!
                </p>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{steps.filter(s => s.completed).length}</div>
                    <div className="text-sm text-gray-400">Steps Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{calculateQuizScore().toFixed(0)}%</div>
                    <div className="text-sm text-gray-400">Quiz Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{counter}</div>
                    <div className="text-sm text-gray-400">Counter Value</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSteps(tutorialSteps)
                    setQuizAnswers({})
                    setCounter(0)
                    setCurrentStep(0)
                    setAnimatedText('')
                    setTypingIndex(0)
                  }}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-lg hover:from-rose-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  Start Over 🔄
                </button>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Conclusion</h2>
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-800">
            <p className="text-gray-300 leading-relaxed mb-4">
              Next.js 14 represents a significant evolution in React development, offering powerful new features 
              while maintaining the developer experience that makes Next.js so popular. The App Router, Server Components, 
              and improved performance optimizations make it an excellent choice for modern web applications.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Start with the basics, experiment with the interactive examples above, and gradually explore more 
              advanced features as you become comfortable with the new paradigms. Happy coding! 🚀
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Interactive Learning Experience
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Hands-on Code Examples
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Progress Tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                Knowledge Assessment
              </div>
            </div>
          </div>
        </section>
      </div>
    </BlogPostLayout>
  )
}

export default NextJSGuidePost
