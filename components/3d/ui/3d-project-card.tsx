"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, useTexture, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Group, Mesh } from "three"
import type { JSX } from "react"

interface ProjectModelProps {
  color: string
  title: string
  isHovered: boolean
}

function ProjectModel({ color, title, isHovered }: ProjectModelProps) {
  const groupRef = useRef<Group>(null)
  const boxRef = useRef<Mesh>(null)

  // Create a texture for the project
  const texture = useTexture("/placeholder.svg?height=300&width=300")

  useFrame((state) => {
    if (!groupRef.current || !boxRef.current) return

    // Rotate the group
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2

    // Scale effect on hover
    boxRef.current.scale.x =
      boxRef.current.scale.y =
      boxRef.current.scale.z =
        isHovered ? 1.1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05 : 1
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={boxRef}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            emissive={color}
            emissiveIntensity={isHovered ? 0.5 : 0.2}
          />
        </mesh>

        {/* Add texture to one face */}
        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>

        <Text position={[0, -1.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="top" maxWidth={2}>
          {title}
        </Text>
      </Float>
    </group>
  )
}

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  color: string
}

interface ThreeDProjectCardProps {
  project: Project
}

export default function ThreeDProjectCard({ project }: ThreeDProjectCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false)

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
          <div
            className="aspect-video rounded-lg overflow-hidden mb-4 bg-terminal-header-dark"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <Environment preset="night" />

              <ProjectModel color={project.color} title={project.title} isHovered={isHovered} />
            </Canvas>
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

