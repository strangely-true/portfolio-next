import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'MealMetric',
    description: 'A dynamic web application to calculate nutritional information for meals based on user-inputted ingredients.',
    image: '/mealmetric.png',
    link: 'https://github.com/strangely-true/MealMetric',
    technologies: 'Node.js, Express.js, PostgreSQL, EJS',
  },
  {
    title: 'Coordina',
    description: 'Smart India Hackathon project for government department dashboards and project conflict resolution.',
    image: '/coordina.png',
    link: 'https://coordina-murex.vercel.app/',
    technologies: 'Next.js, React.js, MongoDB',
  },
  {
    title: 'Real-Time Chat Application',
    description: 'A full-stack real-time chat application with type-safe messaging and user authentication.',
    image: '/chat-app.png',
    link: 'https://github.com/strangely-true/Chat-app',
    technologies: 'Next.js, React.js, Convex DB, Clerk',
  },
]

export function ProjectSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div key={index} className="border border-white p-4 rounded-lg flex flex-col items-center">
          <div className="w-full h-48 relative mb-4">
            <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>
          <p className="mb-2 text-center">{project.description}</p>
          <p className="text-sm mb-4 text-center">{project.technologies}</p>
          <Link href={project.link} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
            View Project
          </Link>
        </div>
      ))}
    </div>
  )
}

