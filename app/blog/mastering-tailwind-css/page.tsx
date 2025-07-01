"use client"

import React, { useState } from 'react'
import { BlogPostLayout, CodeBlock, InteractiveExample } from '@/components/ui/blog-post-layout'

const TailwindGuidePost = () => {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [showAnimation, setShowAnimation] = useState(false)

  const post = {
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    date: 'December 10, 2024',
    readTime: 6,
    tags: ['CSS', 'Tailwind', 'Design', 'Frontend'],
    author: 'Sabittwa Banerjee',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
  }

  const customConfigCode = `// tailwind.config.js
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
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
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
  ],
}`

  const responsiveCode = `<!-- Mobile First Approach -->
<div class="
  w-full 
  sm:w-1/2 
  md:w-1/3 
  lg:w-1/4 
  xl:w-1/5
  p-4 
  sm:p-6 
  md:p-8
">
  <h2 class="
    text-lg 
    sm:text-xl 
    md:text-2xl 
    lg:text-3xl
    font-bold 
    text-gray-900 
    dark:text-white
  ">
    Responsive Title
  </h2>
</div>`

  const customUtilitiesCode = `/* Custom utilities */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent;
  }
  
  .glass-morphism {
    @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl;
  }
  
  .custom-shadow {
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .animate-bounce-slow {
    animation: bounce 3s infinite;
  }
}`

  const componentCode = `<!-- Button Component Pattern -->
<button class="
  inline-flex items-center justify-center
  px-4 py-2
  bg-blue-600 hover:bg-blue-700
  text-white font-medium
  rounded-lg
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors duration-200
">
  Click me
</button>

<!-- Card Component Pattern -->
<div class="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-800
  rounded-xl
  p-6
  shadow-lg hover:shadow-xl
  transition-shadow duration-300
">
  <h3 class="text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-gray-600 dark:text-gray-300">Card content goes here...</p>
</div>`

  return (
    <BlogPostLayout post={post}>
      <div className="space-y-8">
        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Tailwind CSS has revolutionized how we write CSS by providing a utility-first approach 
            that promotes consistency, maintainability, and rapid development. In this guide, we will explore 
            advanced techniques, tips, and tricks to master Tailwind CSS.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Advanced Configuration</h2>
          <p className="text-gray-300 mb-4">
            Customizing your Tailwind configuration is essential for creating a design system that matches 
            your brand and project requirements.
          </p>

          <CodeBlock 
            code={customConfigCode}
            language="javascript"
            filename="tailwind.config.js"
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Responsive Design Mastery</h2>
          <p className="text-gray-300 mb-4">
            Tailwind&apos;s mobile-first approach makes responsive design intuitive. Here are some advanced patterns:
          </p>

          <CodeBlock 
            code={responsiveCode}
            language="html"
            filename="responsive-example.html"
          />

          <div className="mt-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
            <h4 className="font-semibold text-rose-500 mb-2">💡 Pro Tip</h4>
            <p className="text-gray-300 text-sm">
              Use the <code>container</code> class with <code>mx-auto</code> and responsive padding 
              for consistent layouts: <code>container mx-auto px-4 sm:px-6 lg:px-8</code>
            </p>
          </div>
        </section>

        <InteractiveExample
          title="Responsive Grid Demo"
          description="This grid adapts from 1 column on mobile to 4 columns on desktop. Resize your browser to see it in action!"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <div 
                key={num}
                className="bg-gradient-to-br from-rose-500 to-purple-600 rounded-lg p-4 text-white text-center font-semibold"
              >
                Item {num}
              </div>
            ))}
          </div>
        </InteractiveExample>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Custom Utilities</h2>
          <p className="text-gray-300 mb-4">
            Create your own utility classes for commonly used patterns in your project:
          </p>

          <CodeBlock 
            code={customUtilitiesCode}
            language="css"
            filename="globals.css"
          />
        </section>

        <InteractiveExample
          title="Custom Utility Classes Demo"
          description="Examples of custom utility classes in action. Click the buttons to see different effects!"
        >
          <div className="space-y-4">
            <div className="text-gradient text-2xl font-bold">
              Gradient Text Effect
            </div>
            
            <div className="glass-morphism p-4">
              <p className="text-white">Glass morphism card with backdrop blur</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg custom-shadow">
              <p className="text-gray-900 dark:text-white">Custom shadow effect</p>
            </div>

            <button
              onClick={() => setShowAnimation(!showAnimation)}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Toggle Animation
            </button>
            
            {showAnimation && (
              <div className="animate-bounce-slow bg-purple-600 text-white p-4 rounded-lg text-center">
                Slow bouncing animation!
              </div>
            )}
          </div>
        </InteractiveExample>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Component Patterns</h2>
          <p className="text-gray-300 mb-4">
            Develop reusable component patterns using Tailwind classes. Here are some common patterns:
          </p>

          <CodeBlock 
            code={componentCode}
            language="html"
            filename="component-patterns.html"
          />
        </section>

        <InteractiveExample
          title="Theme Switcher"
          description="A practical example of using Tailwind's dark mode classes with React state management."
          code={`const [theme, setTheme] = useState('dark')

<div className={\`\${theme} min-h-screen transition-colors\`}>
  <div className="bg-white dark:bg-gray-900 p-8">
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Toggle Theme
    </button>
    <p className="mt-4 text-gray-900 dark:text-white">
      Current theme: {theme}
    </p>
  </div>
</div>`}
        >
          <div className={`${currentTheme} transition-colors duration-300`}>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Theme Example
                </h3>
                <button 
                  onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Toggle
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Current theme: <span className="font-semibold">{currentTheme}</span>
              </p>
              <div className="space-y-2">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Background adapts to theme</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
                  <p className="text-sm text-blue-800 dark:text-blue-200">Colored backgrounds work too</p>
                </div>
              </div>
            </div>
          </div>
        </InteractiveExample>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Performance Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">🚀 Purge Unused CSS</h4>
              <p className="text-gray-300 text-sm">
                Always configure the <code>content</code> option properly to remove unused styles in production.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">📦 Use JIT Mode</h4>
              <p className="text-gray-300 text-sm">
                Just-In-Time mode generates styles on-demand, reducing build times and CSS file size.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">🎯 Avoid @apply in Components</h4>
              <p className="text-gray-300 text-sm">
                Use utility classes directly in your HTML/JSX instead of @apply in component-level CSS.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Advanced Techniques</h2>
          
          <h3 className="text-2xl font-semibold mb-4 text-rose-500">1. Dynamic Classes with Template Literals</h3>
          <CodeBlock 
            code={`// Dynamic button variants
const getButtonClasses = (variant, size) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return \`\${baseClasses} \${variants[variant]} \${sizes[size]}\`
}`}
            language="javascript"
            filename="button-utils.js"
          />

          <h3 className="text-2xl font-semibold mb-4 mt-8 text-rose-500">2. CSS Variables with Tailwind</h3>
          <CodeBlock 
            code={`:root {
  --color-primary: 59 130 246; /* RGB values for blue-500 */
  --color-secondary: 107 114 128; /* RGB values for gray-500 */
}

.custom-button {
  @apply bg-[color:rgb(var(--color-primary))] text-white px-4 py-2 rounded-lg;
}

/* Use in HTML */
<button class="bg-[color:rgb(var(--color-primary))] hover:bg-[color:rgb(var(--color-primary)_/_0.8)] text-white px-4 py-2 rounded-lg">
  Dynamic Color Button
</button>`}
            language="css"
            filename="custom-properties.css"
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Conclusion</h2>
          <p className="text-gray-300 leading-relaxed">
            Mastering Tailwind CSS goes beyond knowing the utility classes. It involves understanding 
            how to configure it effectively, create reusable patterns, optimize for performance, and 
            leverage its full potential for rapid UI development.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Start implementing these techniques in your projects, experiment with the interactive examples, 
            and remember that consistency is key to building maintainable design systems with Tailwind CSS.
          </p>
        </section>
      </div>
    </BlogPostLayout>
  )
}

export default TailwindGuidePost
