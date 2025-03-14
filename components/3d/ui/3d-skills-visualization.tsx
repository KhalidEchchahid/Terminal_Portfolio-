"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, OrbitControls } from "@react-three/drei"
import type { Mesh, Group } from "three"
import type { JSX } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface Skill {
  name: string
  level: number
}

interface SkillPillarProps {
  skill: Skill
  index: number
  totalSkills: number
  color: string
}

function SkillPillar({ skill, index, totalSkills, color }: SkillPillarProps) {
  const { name, level } = skill
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)

  // Calculate position in a circle
  const angle = (index / totalSkills) * Math.PI * 2
  const radius = 3
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  // Height based on skill level
  const height = level * 2

  useFrame((state) => {
    if (!meshRef.current) return

    // Subtle animation
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.1 + height / 2

    // Scale effect on hover
    meshRef.current.scale.y = hovered ? 1.1 + Math.sin(time * 2) * 0.05 : clicked ? 1.2 : 1
  })

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={[0.5, height, 0.5]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>

      <Text
        position={[0, -0.5, 0]}
        rotation={[0, -angle, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="top"
        maxWidth={2}
      >
        {name}
      </Text>

      <Text
        position={[0, height + 0.3, 0]}
        rotation={[0, -angle, 0]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="bottom"
      >
        {`${Math.round(level * 100)}%`}
      </Text>
    </group>
  )
}

interface SkillsSceneProps {
  skills: Skill[]
  color: string
}

function SkillsScene({ skills, color }: SkillsSceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    // Slow rotation of the entire group
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillPillar key={skill.name} skill={skill} index={index} totalSkills={skills.length} color={color} />
      ))}
    </group>
  )
}

interface SkillCategory {
  name: string
  color: string
  skills: Skill[]
}

interface ThreeDSkillsVisualizationProps {
  category: SkillCategory
}

export default function ThreeDSkillsVisualization({ category }: ThreeDSkillsVisualizationProps): JSX.Element {
  const isMobile = useMobile()

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden bg-terminal-header-dark">
      <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <SkillsScene skills={category.skills} color={category.color} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={isMobile ? 0.5 : 0.8}
        />
      </Canvas>
    </div>
  )
}

