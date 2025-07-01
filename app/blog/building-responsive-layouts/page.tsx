"use client"

import React, { useState } from 'react'
import { BlogPostLayout, CodeBlock, InteractiveExample } from '@/components/ui/blog-post-layout'

const ResponsiveLayoutsPost = () => {
  const [activeExample, setActiveExample] = useState('flexbox')

  const post = {
    title: 'Building Responsive Layouts with Flexbox and Grid',
    date: 'July 1, 2025',
    readTime: 10,
    tags: ['CSS', 'Responsive Design', 'Flexbox', 'Grid'],
    author: 'Sabittwa Banerjee',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
  }

  const flexboxCode = `/* Flexbox Layout Examples */

/* Basic Flex Container */
.container {
  display: flex;
  gap: 1rem;
}

/* Responsive Navigation */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
  }
  
  .nav-links {
    gap: 1rem;
    margin-top: 1rem;
  }
}

/* Card Layout */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.card {
  flex: 1 1 300px;
  max-width: 400px;
  min-width: 280px;
}`

  const gridCode = `/* CSS Grid Layout Examples */

/* Basic Grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Complex Layout */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr 200px;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive Grid */
@media (max-width: 1024px) {
  .layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}

/* Gallery Grid */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  grid-auto-rows: 200px;
}

.gallery-item:nth-child(3n) {
  grid-row: span 2;
}

.gallery-item:nth-child(5n) {
  grid-column: span 2;
}`

  const responsiveCode = `/* Modern Responsive Patterns */

/* Container Queries (Modern) */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}

/* Intrinsic Web Design */
.fluid-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 4vw, 2rem);
}

/* Flexible Typography */
.responsive-text {
  font-size: clamp(1rem, 4vw, 3rem);
  line-height: 1.4;
}

/* Aspect Ratio Boxes */
.aspect-box {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

/* Modern Centering */
.center {
  display: grid;
  place-items: center;
  min-height: 50vh;
}

/* Responsive Spacing */
.section {
  padding: clamp(2rem, 8vw, 8rem) clamp(1rem, 4vw, 4rem);
}`

  return (
    <BlogPostLayout post={post}>
      <div className="space-y-8">
        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Modern web design requires layouts that work seamlessly across all devices and screen sizes. 
            CSS Flexbox and Grid provide powerful tools for creating responsive layouts that adapt to 
            different contexts while maintaining visual hierarchy and usability.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Understanding Layout Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-rose-500 mb-4">Flexbox</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>One-dimensional layout (row or column)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Perfect for component-level layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Excellent for alignment and distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Content-driven sizing</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">Grid</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Two-dimensional layout (rows and columns)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Ideal for page-level layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Precise control over placement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Layout-driven sizing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Interactive Layout Examples</h2>
          <InteractiveExample
            title="Responsive Layout Patterns"
            description="Explore different layout techniques and see how they adapt to various screen sizes."
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'flexbox', label: 'Flexbox Patterns' },
                  { key: 'grid', label: 'Grid Layouts' },
                  { key: 'responsive', label: 'Modern Responsive' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveExample(key)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeExample === key
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              <CodeBlock 
                code={
                  activeExample === 'flexbox' ? flexboxCode :
                  activeExample === 'grid' ? gridCode :
                  responsiveCode
                }
                language="css"
                filename={`${activeExample}-examples.css`}
              />
            </div>
          </InteractiveExample>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Flexbox Deep Dive</h2>
          <p className="text-gray-300 mb-4">
            Flexbox excels at distributing space and aligning items in one dimension. 
            Here are the most important properties and patterns:
          </p>

          <CodeBlock 
            code={flexboxCode}
            language="css"
            filename="flexbox-patterns.css"
          />

          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">💡 Pro Tip</h4>
            <p className="text-gray-300 text-sm">
              Use <code className="bg-gray-800 px-2 py-1 rounded">gap</code> instead of margins for spacing between flex items. 
              It&apos;s more reliable and easier to maintain.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">CSS Grid Mastery</h2>
          <p className="text-gray-300 mb-4">
            CSS Grid provides unprecedented control over two-dimensional layouts. 
            It&apos;s perfect for complex page structures and responsive designs:
          </p>

          <CodeBlock 
            code={gridCode}
            language="css"
            filename="grid-layouts.css"
          />

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">Grid Template Areas</h4>
              <p className="text-gray-300 text-sm">
                Use named grid areas for semantic, readable layouts that are easy to modify.
              </p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">Auto-Fit vs Auto-Fill</h4>
              <p className="text-gray-300 text-sm">
                Auto-fit collapses empty tracks, while auto-fill maintains them for consistent spacing.
              </p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-rose-500 mb-2">Minmax Function</h4>
              <p className="text-gray-300 text-sm">
                Combine with auto-fit for truly responsive grids that adapt to content and viewport.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Modern Responsive Techniques</h2>
          <p className="text-gray-300 mb-4">
            Beyond traditional media queries, modern CSS offers powerful new tools for responsive design:
          </p>

          <CodeBlock 
            code={responsiveCode}
            language="css"
            filename="modern-responsive.css"
          />

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">🚀 Container Queries</h4>
              <p className="text-gray-300 text-sm">
                Style components based on their container size, not the viewport. Perfect for component-driven design.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">📐 Aspect Ratio</h4>
              <p className="text-gray-300 text-sm">
                Maintain consistent proportions across different screen sizes without JavaScript hacks.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg">
              <h4 className="font-semibold text-orange-400 mb-2">🎯 Clamp Function</h4>
              <p className="text-gray-300 text-sm">
                Create fluid typography and spacing that scales smoothly between minimum and maximum values.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Best Practices</h2>
          <div className="space-y-4">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-rose-500 mb-4">Layout Strategy</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Start with mobile-first approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use Grid for page layout, Flexbox for components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Prefer logical properties (inline-start vs left)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Test on real devices, not just browser dev tools</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Conclusion</h2>
          <p className="text-gray-300 leading-relaxed">
            Mastering responsive layouts requires understanding when to use Flexbox vs Grid, 
            embracing modern CSS features like container queries and the clamp function, 
            and always keeping user experience at the forefront. The combination of these 
            techniques provides endless possibilities for creating beautiful, functional layouts 
            that work across all devices and contexts.
          </p>
        </section>
      </div>
    </BlogPostLayout>
  )
}

export default ResponsiveLayoutsPost
