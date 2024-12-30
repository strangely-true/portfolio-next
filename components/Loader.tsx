'use client'

import { useState, useEffect } from 'react'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">SABITTWA BANERJEE</h1>
        <p className="text-xl">Web Developer</p>
      </div>
    </div>
  )
}

