"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Github, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ProjectFeature {
  title: string
  description: string
}

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  color: string
  githubUrl: string
  features: ProjectFeature[]
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)

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
      image: "/architecture_diagram.png?height=600&width=800&text=University+Collaboration+Platform",
      color: "#cba6f7", // Terminal Purple
      githubUrl: "https://github.com/khalid-echchahid/university-collaboration-platform",
      features: [
        {
          title: "Secure Authentication",
          description: "JWT-based authentication with role-based access control for students and professors",
        },
        {
          title: "File Sharing",
          description: "Secure document sharing with version control and access permissions",
        },
        {
          title: "Recommendation Letters",
          description: "Digital workflow for requesting and managing recommendation letters",
        },
        {
          title: "Announcement System",
          description: "Real-time notifications and announcements with priority levels",
        },
      ],
    },
    {
      id: 2,
      title: "Intra-Enterprise Collaboration System",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs for internal communication.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB"],
      image: "/architecture_diagram.png?height=600&width=800&text=Intra-Enterprise+Collaboration",
      color: "#89b4fa", // Terminal Blue
      githubUrl: "https://github.com/khalid-echchahid/intra-enterprise-collab",
      features: [
        {
          title: "Knowledge Base",
          description: "Searchable Q&A platform with tagging and voting system",
        },
        {
          title: "Event Management",
          description: "Calendar integration with RSVP and reminder functionality",
        },
        {
          title: "Internal Blogging",
          description: "Rich text editor with media embedding and commenting",
        },
        {
          title: "Analytics Dashboard",
          description: "Engagement metrics and content performance tracking",
        },
      ],
    },
    {
      id: 3,
      title: "Gladiator: 2D Fighting Game",
      description:
        "A 2D fighting game developed from scratch using the C programming language and GTK for the graphical user interface. The game includes various mechanics, characters, and visual effects.",
      technologies: ["C", "GTK Library"],
      image: "/placeholder.svg?height=600&width=800&text=Gladiator+Fighting+Game",
      color: "#a6e3a1", // Terminal Green
      githubUrl: "https://github.com/khalid-echchahid/gladiator-game",
      features: [
        {
          title: "Custom Physics Engine",
          description: "Hand-crafted collision detection and response system",
        },
        {
          title: "Character System",
          description: "Multiple playable characters with unique abilities and animations",
        },
        {
          title: "AI Opponents",
          description: "Computer-controlled enemies with different difficulty levels",
        },
        {
          title: "Level Design",
          description: "Various arenas with interactive elements and hazards",
        },
      ],
    },
    {
      id: 4,
      title: "Maze Pathfinder",
      description:
        "A Next.js web application that visualizes Dijkstra's Algorithm and Breadth-First Search (BFS) for maze pathfinding, with backend processing handled by a C++ web server.",
      technologies: ["C++", "Next.js 15", "Tailwind CSS"],
      image: "/placeholder.svg?height=600&width=800&text=Maze+Pathfinder",
      color: "#f38ba8", // Terminal Red
      githubUrl: "https://github.com/khalid-echchahid/maze-pathfinder",
      features: [
        {
          title: "Algorithm Visualization",
          description: "Step-by-step visual representation of pathfinding algorithms",
        },
        {
          title: "Custom Maze Creation",
          description: "Interactive maze editor with save/load functionality",
        },
        {
          title: "Performance Metrics",
          description: "Real-time comparison of algorithm efficiency and path quality",
        },
        {
          title: "C++ Integration",
          description: "High-performance backend calculations with WebAssembly integration",
        },
      ],
    },
  ]

  // Handle project navigation
  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Share functionality
  const shareProject = (project: Project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project.title,
          text: project.description,
          url: project.githubUrl,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard
        .writeText(project.githubUrl)
        .then(() => alert("Project link copied to clipboard!"))
        .catch((err) => console.error("Could not copy text: ", err))
    }
  }

  return (
    <section className="min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          My <span className="text-gradient-1">Projects</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and showcases different
          aspects of my skills and expertise.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevProject}
            className="rounded-full border-primary hover:bg-primary/10"
          >
            <ArrowLeft />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-primary hover:bg-primary/10">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => shareProject(projects[activeProject])}>
                Share Current Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
                Copy Portfolio URL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={nextProject}
            className="rounded-full border-primary hover:bg-primary/10"
          >
            <ArrowRight />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={projects[activeProject].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Project Image */}
              <div className="relative overflow-hidden bg-terminal-header-dark">
                <div className="aspect-video w-full h-full">
                  <img
                    src={projects[activeProject].image || "/placeholder.svg"}
                    alt={projects[activeProject].title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(projects[activeProject].title)}`
                    }}
                  />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  style={{ color: projects[activeProject].color }}
                >
                  <div className="flex flex-wrap gap-2">
                    {projects[activeProject].technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        style={{
                          borderColor: projects[activeProject].color,
                          color: projects[activeProject].color,
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: projects[activeProject].color }}>
                  {projects[activeProject].title}
                </h3>

                <p className="text-muted-foreground mb-4">{projects[activeProject].description}</p>

                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold">Key Features</h4>
                  {projects[activeProject].features.map((feature, index) => (
                    <div key={index} className="pl-4 border-l-2" style={{ borderColor: projects[activeProject].color }}>
                      <h5 className="font-medium" style={{ color: projects[activeProject].color }}>
                        {feature.title}
                      </h5>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    style={{
                      backgroundColor: projects[activeProject].color,
                      color: "white",
                    }}
                    onClick={() => window.open(projects[activeProject].githubUrl, "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    style={{
                      borderColor: projects[activeProject].color,
                      color: projects[activeProject].color,
                    }}
                    onClick={() => window.open(projects[activeProject].githubUrl, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                index === activeProject ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"
              }`}
              style={{
                backgroundColor: index === activeProject ? projects[activeProject].color : undefined,
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

