"use client"

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconSearch, IconArrowLeft, IconCalendar, IconClock, IconTag, IconStar } from '@tabler/icons-react'
import { blogPosts } from '@/lib/blog-data'

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [])

  // Get featured posts
  const featuredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      if (!post.featured) return false
      
      // If there's a search term or selected tag, filter featured posts too
      if (searchTerm || selectedTag) {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTag = !selectedTag || post.tags.includes(selectedTag)
        return matchesSearch && matchesTag
      }
      
      return true
    })
  }, [searchTerm, selectedTag])

  // Filter posts based on search term and selected tag (excluding featured posts from regular list)
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      if (post.featured) return false // Featured posts are shown separately
      
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = !selectedTag || post.tags.includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [searchTerm, selectedTag])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag(null)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="container mx-auto px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="cinematic-gradient">Blog</span>
          </motion.h1>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-rose-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={clearFilters}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedTag && !searchTerm 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1 ${
                  selectedTag === tag 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <IconTag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedTag) && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Active filters:</span>
              {searchTerm && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  Search: &ldquo;{searchTerm}&rdquo;
                </span>
              )}
              {selectedTag && (
                <span className="bg-gray-800 px-2 py-1 rounded">
                  Tag: {selectedTag}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-rose-500 hover:text-rose-400 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <IconStar className="w-6 h-6 text-rose-500" />
              <h2 className="text-2xl font-bold text-white">Featured Posts</h2>
            </div>
            
            <div className="space-y-0">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative py-8 border-t border-rose-500/20 overflow-hidden hover:bg-gradient-to-r hover:from-rose-900/10 hover:to-transparent transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-bold group-hover:text-rose-500 transition-colors">
                              {post.title}
                            </h3>
                            <span className="px-2 py-1 bg-rose-600/20 text-rose-400 text-xs rounded-full border border-rose-500/30">
                              Featured
                            </span>
                          </div>
                          
                          <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-3xl">
                            {post.excerpt}
                          </p>

                          {/* Meta Information */}
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-2">
                              <IconCalendar className="w-4 h-4" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <IconClock className="w-4 h-4" />
                              {post.readTime} min read
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-400 group-hover:text-rose-500 transition-colors">
                          <span className="text-xl font-mono">0{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white">All Posts</h2>
        </motion.div>

        {/* Blog Posts List */}
        <div className="space-y-0">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative py-8 border-t border-white/10 overflow-hidden hover:bg-gray-900/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold group-hover:text-rose-500 transition-colors mb-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-3xl">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-2">
                          <IconCalendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <IconClock className="w-4 h-4" />
                          {post.readTime} min read
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-400 group-hover:text-rose-500 transition-colors">
                      <span className="text-xl font-mono">0{featuredPosts.length + index + 1}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && featuredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <IconSearch className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg">No posts found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
            <button
              onClick={clearFilters}
              className="text-rose-500 hover:text-rose-400 underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BlogPage
