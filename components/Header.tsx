import Link from 'next/link'
import { Linkedin, Github, Mail } from 'lucide-react'

export default function Header() {
  return (
    <header className="py-6">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-lg nav-link text-white">
          Sabittwa Banerjee
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link href="#about" className="nav-link text-white hover:text-gray-300">
            About
          </Link>
          <Link href="#skills" className="nav-link text-white hover:text-gray-300">
            Skills
          </Link>
          <Link href="#projects" className="nav-link text-white hover:text-gray-300">
            Projects
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="mailto:sabittwa.work@gmail.com" className="nav-link text-white hover:text-gray-300">
            <Mail className="w-5 h-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/sabittwa-banerjee" className="nav-link text-white hover:text-gray-300" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://github.com/strangely-true" className="nav-link text-white hover:text-gray-300" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

