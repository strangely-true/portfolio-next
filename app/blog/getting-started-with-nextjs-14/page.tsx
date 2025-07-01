"use client"

import React, { useState } from 'react'
import { BlogPostLayout, CodeBlock, InteractiveExample } from '@/components/ui/blog-post-layout'

const NextJSGuidePost = () => {
  const [counter, setCounter] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const post = {
    title: 'Getting Started with Next.js 14: A Complete Guide',
    date: 'December 15, 2024',
    readTime: 8,
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    author: 'Sabittwa Banerjee',
    image: '/blog/nextjs-guide.jpg'
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
        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Next.js 14 brings revolutionary changes to React development with the App Router, 
            Server Components, and enhanced performance optimizations. In this comprehensive guide, 
            we'll explore everything you need to know to get started with Next.js 14.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">What's New in Next.js 14?</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Turbopack (Beta):</strong> Rust-based bundler for faster development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Server Actions (Stable):</strong> Full-stack React architecture</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Partial Prerendering (Preview):</strong> Combine static and dynamic content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Next.js Learn Course:</strong> Updated learning materials</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Setting Up Your First Next.js 14 Project</h2>
          <p className="text-gray-300 mb-4">
            Getting started with Next.js 14 is straightforward. Let's create a new project from scratch:
          </p>
          
          <CodeBlock 
            code={`npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm run dev`}
            language="bash"
            filename="terminal"
          />

          <p className="text-gray-300 mt-4">
            During setup, you'll be prompted with several options. Here's what I recommend for most projects:
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
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Understanding the App Router</h2>
          <p className="text-gray-300 mb-4">
            The App Router is the new paradigm in Next.js 14. Unlike the Pages Router, 
            it uses a file-system based router built on React Server Components.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-rose-500">File Structure</h3>
          <CodeBlock 
            code={`app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
├── about/
│   └── page.tsx       # /about page
└── blog/
    ├── page.tsx       # /blog page
    └── [slug]/
        └── page.tsx   # /blog/[slug] page`}
            language="text"
            filename="app-structure"
          />
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
          </div>
        </InteractiveExample>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Configuration and Optimization</h2>
          <p className="text-gray-300 mb-4">
            Next.js 14 offers extensive configuration options. Here's a typical <code>next.config.js</code> setup:
          </p>

          <CodeBlock 
            code={nextConfigCode}
            language="javascript"
            filename="next.config.js"
          />
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
          <div className="space-y-4 text-gray-300">
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">📦 Bundle Optimization</h4>
              <p>Use Server Components for data fetching and Client Components only when necessary for interactivity.</p>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">🚀 Performance</h4>
              <p>Leverage Next.js built-in optimizations like Image component, Font optimization, and automatic code splitting.</p>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">🔒 Security</h4>
              <p>Use Server Actions for secure data mutations and keep sensitive logic on the server.</p>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">🎯 SEO</h4>
              <p>Take advantage of Server Components for better SEO and faster initial page loads.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Conclusion</h2>
          <p className="text-gray-300 leading-relaxed">
            Next.js 14 represents a significant evolution in React development, offering powerful new features 
            while maintaining the developer experience that makes Next.js so popular. The App Router, Server Components, 
            and improved performance optimizations make it an excellent choice for modern web applications.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Start with the basics, experiment with the interactive examples above, and gradually explore more 
            advanced features as you become comfortable with the new paradigms. Happy coding!
          </p>
        </section>
      </div>
    </BlogPostLayout>
  )
}

export default NextJSGuidePost
