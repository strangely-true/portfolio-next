import './globals.css'
import type { Metadata } from 'next'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import CustomCursor from '@/components/ui/custom-cursor'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// import Loader from '@/components/Loader'

export const metadata: Metadata = {
  title: 'Sabittwa Banerjee - Portfolio',
  description: 'Web Developer & IoT Enthusiast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-gray-950 text-white">
      <CustomCursor/>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ShootingStars />
          <StarsBackground />
        </div>
        <SmoothScroll>
        {children}
        </SmoothScroll>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

