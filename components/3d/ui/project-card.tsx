"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    technologies: string[]
    image: string
    color: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="bg-terminal-header p-6 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: `${project.color}33`,
                  color: project.color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Github className="h-4 w-4" /> GitHub
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" /> Demo
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: project.color }}>
            {project.title}
          </h3>
          <p className="text-terminal-text-dim mb-4">{project.description}</p>

          <div className="bg-terminal-bg p-3 rounded-md">
            <div className="flex items-center mb-2">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: project.color,
                }}
              ></div>
              <span className="text-sm font-medium">Key Features</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-terminal-text-dim">
              <li>Responsive design for all devices</li>
              <li>Secure authentication and authorization</li>
              <li>Real-time updates and notifications</li>
              <li>Comprehensive documentation</li>
              <li>Automated testing suite</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

