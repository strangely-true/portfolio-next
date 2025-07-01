"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { IconArrowLeft, IconCalendar, IconClock, IconTag, IconUser } from '@tabler/icons-react'
import { CodeBlock, InteractiveExample } from '@/components/ui/code-block'

interface BlogPostLayoutProps {
  post: {
    title: string
    date: string
    readTime: number
    tags: string[]
    author: string
    image?: string
  }
  children: React.ReactNode
}

export const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post, children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="container mx-auto px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors mb-8"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>

          {/* Hero Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 max-w-2xl mx-auto aspect-video bg-gray-800 rounded-xl overflow-hidden relative"
            >
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 66vw"
                priority
              />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="cinematic-gradient">{post.title}</span>
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-gray-400 mb-8"
          >
            <div className="flex items-center gap-2">
              <IconUser className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCalendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconClock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {post.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
              >
                <IconTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="prose prose-invert prose-lg max-w-none px-4 md:px-8 lg:px-12"
          style={{
            '--tw-prose-body': 'rgb(229 231 235)',
            '--tw-prose-headings': 'rgb(255 255 255)',
            '--tw-prose-links': 'rgb(244 63 94)',
            '--tw-prose-quotes': 'rgb(156 163 175)',
            '--tw-prose-code': 'rgb(229 231 235)',
            '--tw-prose-pre-code': 'rgb(229 231 235)',
            '--tw-prose-pre-bg': 'rgb(17 24 39)',
          } as React.CSSProperties}
        >
          {children}
        </motion.article>

        {/* Navigation Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span>Back to all posts</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export { CodeBlock, InteractiveExample }
