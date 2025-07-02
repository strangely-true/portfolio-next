"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IconCopy, IconCheck } from '@tabler/icons-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group my-6 bg-gray-900 rounded-lg overflow-hidden border border-gray-800 z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {filename && (
            <span className="text-sm text-gray-400 ml-2">{filename}</span>
          )}
          <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
            {language}
          </span>
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700"
        >
          {copied ? (
            <>
              <IconCheck className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <IconCopy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto text-base">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#030712', // bg-gray-950
            fontSize: '1rem',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
            },
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  )
}

interface InteractiveExampleProps {
  title: string
  description: string
  children: React.ReactNode
  code?: string
}

export const InteractiveExample: React.FC<InteractiveExampleProps> = ({ 
  title, 
  description, 
  children, 
  code 
}) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="my-8 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        {code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="mt-2 text-xs text-rose-500 hover:text-rose-400 transition-colors"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        )}
      </div>

      {/* Interactive Content */}
      <div className="p-6">
        {children}
      </div>

      {/* Code Section */}
      {code && showCode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CodeBlock code={code} language="tsx" />
        </motion.div>
      )}
    </motion.div>
  )
}
