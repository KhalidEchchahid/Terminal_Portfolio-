"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThreeDProjectCard from "../ui/3d-project-card"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  color: string
}

export default function ProjectsSection(): JSX.Element {
  const [activeProject, setActiveProject] = useState<number>(0)

  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "University Collaboration Platform",
      description:
        "A comprehensive platform that facilitates collaboration between students and professors. Features include file sharing, online requests for recommendation letters, announcement boards, and blogs.",
      technologies: [
        "React",
        "Spring Boot",
        "Spring Security",
        "Spring Cloud",
        "Microservices",
        "PostgreSQL",
        "RabbitMQ",
      ],
      image: "/placeholder.svg?height=300&width=600",
      color: "#89b4fa", // Blue
    },
    {
      id: 2,
      title: "Intra-Enterprise Collaboration System",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs for internal communication.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#a6e3a1", // Green
    },
    {
      id: 3,
      title: "Gladiator: 2D Fighting Game",
      description:
        "A 2D fighting game developed from scratch using the C programming language and GTK for the graphical user interface. The game includes various mechanics, characters, and visual effects.",
      technologies: ["C", "GTK Library"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#f9e2af", // Yellow
    },
    {
      id: 4,
      title: "Maze Pathfinder",
      description:
        "A Next.js web application that visualizes Dijkstra's Algorithm and Breadth-First Search (BFS) for maze pathfinding, with backend processing handled by a C++ web server.",
      technologies: ["C++", "Next.js 15", "Tailwind CSS"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#f38ba8", // Red
    },
  ]

  // Handle project navigation
  const nextProject = (): void => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = (): void => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
        <h2 className="text-2xl font-bold text-terminal-green mb-6">Projects</h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <ThreeDProjectCard key={projects[activeProject].id} project={projects[activeProject]} />
          </AnimatePresence>

          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={prevProject} className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>

            <div className="flex space-x-1">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeProject ? "bg-terminal-green" : "bg-terminal-text-dim"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                ></button>
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextProject} className="flex items-center gap-1">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

