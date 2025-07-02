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
    slug: 'fools-journey-deep-learning-1',
    title: ' A Fool\'s Journey into Deep Learning: Part 1',
    excerpt: 'Join me on a journey into Deep Learning, and be a fool.',
    date: 'June 2, 2025',
    readTime: 10,
    tags: ['Deep Learning', 'AI', 'Data Ethics', 'Python'],
    author: 'Sabittwa Banerjee'
  },
  {
    slug: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14: A Complete Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 14, including server components, app router, and the latest features.',
    date: 'July 1, 2025',
    readTime: 8,
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    author: 'Sabittwa Banerjee'
  },
  {
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    excerpt: 'Discover advanced Tailwind CSS techniques, custom configurations, and best practices for building beautiful interfaces.',
    date: 'July 1, 2025',
    readTime: 25,
    tags: ['CSS', 'Tailwind', 'Design', 'Frontend'],
    author: 'Sabittwa Banerjee',
  }
]
