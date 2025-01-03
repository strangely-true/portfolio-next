import './globals.css'
import type { Metadata } from 'next'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import Loader from '@/components/Loader'

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
      <body className="antialiased min-h-screen bg-black text-white">
      <Loader />
        <div className="fixed inset-0 z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        
        {children}
      </body>
    </html>
  )
}

