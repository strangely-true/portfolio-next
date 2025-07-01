export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tags: string[]
  author: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14: A Complete Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 14, including server components, app router, and the latest features.',
    date: 'December 15, 2024',
    readTime: 8,
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    author: 'Sabittwa Banerjee',
    featured: true
  },
  {
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    excerpt: 'Discover advanced Tailwind CSS techniques, custom configurations, and best practices for building beautiful interfaces.',
    date: 'December 10, 2024',
    readTime: 6,
    tags: ['CSS', 'Tailwind', 'Design', 'Frontend'],
    author: 'Sabittwa Banerjee'
  },
  {
    slug: 'building-responsive-layouts',
    title: 'Building Responsive Layouts with Flexbox and Grid',
    excerpt: 'Master CSS Flexbox and Grid to create responsive, flexible layouts that work on all devices.',
    date: 'December 5, 2024',
    readTime: 10,
    tags: ['CSS', 'Responsive Design', 'Flexbox', 'Grid'],
    author: 'Sabittwa Banerjee'
  }
]
