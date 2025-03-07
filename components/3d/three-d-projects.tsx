"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThreeDProjectsShowcase() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const projects = [
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

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#0f0f1a")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxDistance = 20
    controls.minDistance = 5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Project cards
    const projectCards: THREE.Group[] = []
    const projectRadius = 6

    projects.forEach((project, index) => {
      // Create project card group
      const card = new THREE.Group()

      // Position in a circle
      const angle = (index / projects.length) * Math.PI * 2
      const x = Math.cos(angle) * projectRadius
      const z = Math.sin(angle) * projectRadius
      card.position.set(x, 0, z)

      // Make card face center
      card.lookAt(0, 0, 0)

      // Create card background
      const cardGeometry = new THREE.PlaneGeometry(3, 2)
      const cardMaterial = new THREE.MeshPhysicalMaterial({
        color: project.color,
        metalness: 0.3,
        roughness: 0.4,
        side: THREE.DoubleSide,
      })
      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial)
      cardMesh.name = `project-${project.id}`
      card.add(cardMesh)

      // Create project title texture
      const canvas = document.createElement("canvas")
      canvas.width = 512
      canvas.height = 256
      const context = canvas.getContext("2d")

      if (context) {
        // Background with gradient
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)")
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Title
        context.font = "bold 36px JetBrains Mono, monospace"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "white"

        // Wrap text if needed
        const words = project.title.split(" ")
        let line = ""
        const lines = []
        let y = canvas.height / 2 - 20

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " "
          const metrics = context.measureText(testLine)

          if (metrics.width > canvas.width - 40 && i > 0) {
            lines.push(line)
            line = words[i] + " "
          } else {
            line = testLine
          }
        }
        lines.push(line)

        // Adjust y position based on number of lines
        y = canvas.height / 2 - ((lines.length - 1) * 40) / 2

        // Draw each line
        lines.forEach((line) => {
          context.fillText(line.trim(), canvas.width / 2, y)
          y += 40
        })

        // Add technologies
        context.font = "16px JetBrains Mono, monospace"
        context.fillStyle = "rgba(255, 255, 255, 0.7)"
        context.fillText(project.technologies.slice(0, 3).join(" • "), canvas.width / 2, canvas.height - 30)

        const texture = new THREE.CanvasTexture(canvas)
        const titleMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        })

        const titleGeometry = new THREE.PlaneGeometry(2.8, 1.4)
        const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial)
        titleMesh.position.z = 0.01
        card.add(titleMesh)
      }

      // Add card to scene
      scene.add(card)
      projectCards.push(card)

      // Add animation
      card.userData = {
        originalPosition: card.position.clone(),
        originalRotation: card.rotation.clone(),
        id: project.id,
      }
    })

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object

        // Check if we're hovering over a project card
        if (object.name && object.name.startsWith("project-")) {
          document.body.style.cursor = "pointer"
        } else {
          document.body.style.cursor = "auto"
        }
      } else {
        document.body.style.cursor = "auto"
      }
    }

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object

        // Check if we're clicking on a project card
        if (object.name && object.name.startsWith("project-")) {
          const projectId = Number.parseInt(object.name.split("-")[1])
          setSelectedProject(projectId)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Animate project cards
      projectCards.forEach((card, index) => {
        // Skip animation if this card is selected
        if (selectedProject === card.userData.id) return

        // Floating animation
        card.position.y = Math.sin(elapsedTime * 0.5 + index) * 0.2

        // Slight rotation
        card.rotation.z = Math.sin(elapsedTime * 0.3 + index) * 0.05
      })

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)

      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      projectCards.forEach((card) => {
        card.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      })
    }
  }, [projects, selectedProject])

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Project detail overlay */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-terminal-header-dark/90 backdrop-blur-md p-6 rounded-lg border border-terminal-border max-w-2xl relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-terminal-text-dim hover:text-terminal-text"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              {projects.find((p) => p.id === selectedProject) && (
                <div>
                  <h2 className="text-2xl font-bold text-terminal-green mb-4">
                    {projects.find((p) => p.id === selectedProject)?.title}
                  </h2>

                  <div className="mb-4">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={projects.find((p) => p.id === selectedProject)?.image || "/placeholder.svg"}
                      alt={projects.find((p) => p.id === selectedProject)?.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />

                    <p className="text-terminal-text mb-4">
                      {projects.find((p) => p.id === selectedProject)?.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {projects
                        .find((p) => p.id === selectedProject)
                        ?.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded bg-terminal-header-light text-terminal-text-bright"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

