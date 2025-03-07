"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { motion, AnimatePresence } from "framer-motion"

export default function ThreeDSkillsVisualization() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const skillCategories = [
    {
      name: "Frontend",
      color: "#89b4fa", // Blue
      skills: [
        { name: "React.js", level: 0.9 },
        { name: "Next.js", level: 0.85 },
        { name: "Tailwind CSS", level: 0.9 },
        { name: "HTML/CSS", level: 0.95 },
        { name: "JavaScript", level: 0.9 },
      ],
    },
    {
      name: "Backend",
      color: "#a6e3a1", // Green
      skills: [
        { name: "Spring Boot", level: 0.8 },
        { name: "Node.js", level: 0.75 },
        { name: "Express.js", level: 0.7 },
        { name: "PHP", level: 0.6 },
      ],
    },
    {
      name: "Databases",
      color: "#f9e2af", // Yellow
      skills: [
        { name: "MongoDB", level: 0.85 },
        { name: "PostgreSQL", level: 0.7 },
        { name: "MySQL", level: 0.75 },
        { name: "Oracle", level: 0.6 },
      ],
    },
    {
      name: "DevOps",
      color: "#f38ba8", // Red
      skills: [
        { name: "Docker", level: 0.7 },
        { name: "Git", level: 0.85 },
        { name: "Linux", level: 0.75 },
      ],
    },
    {
      name: "Languages",
      color: "#cba6f7", // Purple
      skills: [
        { name: "Java", level: 0.85 },
        { name: "C/C++", level: 0.7 },
        { name: "TypeScript", level: 0.8 },
      ],
    },
  ]

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#0f0f1a")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 30)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxDistance = 50
    controls.minDistance = 10

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create skill visualization
    const skillGroups: THREE.Group[] = []
    const skillObjects: { mesh: THREE.Mesh; name: string }[] = []

    // Create a central sphere
    const centralGeometry = new THREE.SphereGeometry(2, 32, 32)
    const centralMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    })
    const centralSphere = new THREE.Mesh(centralGeometry, centralMaterial)
    scene.add(centralSphere)

    // Create skill categories
    skillCategories.forEach((category, categoryIndex) => {
      const categoryGroup = new THREE.Group()

      // Position category in a circle around the center
      const categoryAngle = (categoryIndex / skillCategories.length) * Math.PI * 2
      const categoryRadius = 10
      const categoryX = Math.cos(categoryAngle) * categoryRadius
      const categoryY = Math.sin(categoryAngle) * categoryRadius

      categoryGroup.position.set(categoryX, categoryY, 0)

      // Create category label
      const categoryLabelCanvas = document.createElement("canvas")
      categoryLabelCanvas.width = 256
      categoryLabelCanvas.height = 128
      const categoryContext = categoryLabelCanvas.getContext("2d")

      if (categoryContext) {
        categoryContext.fillStyle = "rgba(0, 0, 0, 0)"
        categoryContext.fillRect(0, 0, categoryLabelCanvas.width, categoryLabelCanvas.height)

        categoryContext.font = "bold 36px JetBrains Mono, monospace"
        categoryContext.textAlign = "center"
        categoryContext.textBaseline = "middle"
        categoryContext.fillStyle = category.color
        categoryContext.fillText(category.name, categoryLabelCanvas.width / 2, categoryLabelCanvas.height / 2)

        const categoryTexture = new THREE.CanvasTexture(categoryLabelCanvas)
        const categoryLabelMaterial = new THREE.MeshBasicMaterial({
          map: categoryTexture,
          transparent: true,
          side: THREE.DoubleSide,
        })

        const categoryLabelGeometry = new THREE.PlaneGeometry(4, 2)
        const categoryLabel = new THREE.Mesh(categoryLabelGeometry, categoryLabelMaterial)
        categoryLabel.position.set(0, 3, 0)
        categoryGroup.add(categoryLabel)
      }

      // Create skills for this category
      category.skills.forEach((skill, skillIndex) => {
        // Create skill sphere
        const skillGeometry = new THREE.SphereGeometry(skill.level * 0.8, 32, 32)
        const skillMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(category.color),
          metalness: 0.3,
          roughness: 0.4,
          emissive: new THREE.Color(category.color),
          emissiveIntensity: 0.2,
        })

        const skillMesh = new THREE.Mesh(skillGeometry, skillMaterial)

        // Position skill in a circle around the category
        const skillAngle = (skillIndex / category.skills.length) * Math.PI * 2
        const skillRadius = 4
        const skillX = Math.cos(skillAngle) * skillRadius
        const skillY = Math.sin(skillAngle) * skillRadius

        skillMesh.position.set(skillX, skillY, 0)
        skillMesh.name = `skill-${category.name}-${skill.name}`
        categoryGroup.add(skillMesh)

        // Add to skill objects array for raycasting
        skillObjects.push({ mesh: skillMesh, name: skill.name })

        // Create skill label
        const skillLabelCanvas = document.createElement("canvas")
        skillLabelCanvas.width = 256
        skillLabelCanvas.height = 128
        const skillContext = skillLabelCanvas.getContext("2d")

        if (skillContext) {
          skillContext.fillStyle = "rgba(0, 0, 0, 0)"
          skillContext.fillRect(0, 0, skillLabelCanvas.width, skillLabelCanvas.height)

          skillContext.font = "24px JetBrains Mono, monospace"
          skillContext.textAlign = "center"
          skillContext.textBaseline = "middle"
          skillContext.fillStyle = "white"
          skillContext.fillText(skill.name, skillLabelCanvas.width / 2, skillLabelCanvas.height / 2)

          const skillTexture = new THREE.CanvasTexture(skillLabelCanvas)
          const skillLabelMaterial = new THREE.MeshBasicMaterial({
            map: skillTexture,
            transparent: true,
            side: THREE.DoubleSide,
          })

          const skillLabelGeometry = new THREE.PlaneGeometry(2, 1)
          const skillLabel = new THREE.Mesh(skillLabelGeometry, skillLabelMaterial)
          skillLabel.position.set(skillX, skillY - 1.2, 0)
          categoryGroup.add(skillLabel)
        }

        // Create connection line to category center
        const lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(category.color),
          transparent: true,
          opacity: 0.5,
        })
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(skillX, skillY, 0),
        ])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        categoryGroup.add(line)
      })

      // Create connection line to central sphere
      const connectionMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(category.color),
        transparent: true,
        opacity: 0.3,
      })
      const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-categoryX, -categoryY, 0),
      ])
      const connection = new THREE.Line(connectionGeometry, connectionMaterial)
      categoryGroup.add(connection)

      scene.add(categoryGroup)
      skillGroups.push(categoryGroup)
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

        // Check if we're hovering over a skill
        if (object.name && object.name.startsWith("skill-")) {
          const skillName = object.name.split("-")[2]
          setHoveredSkill(skillName)
          document.body.style.cursor = "pointer"
        } else {
          setHoveredSkill(null)
          document.body.style.cursor = "auto"
        }
      } else {
        setHoveredSkill(null)
        document.body.style.cursor = "auto"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate central sphere
      centralSphere.rotation.y = elapsedTime * 0.2

      // Animate skill groups
      skillGroups.forEach((group, index) => {
        // Gentle floating animation
        group.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.003

        // Slight rotation
        group.rotation.z = Math.sin(elapsedTime * 0.2 + index) * 0.05
      })

      // Highlight hovered skill
      skillObjects.forEach((obj) => {
        if (obj.name === hoveredSkill) {
          obj.mesh.scale.set(1.2, 1.2, 1.2)
          if (obj.mesh.material instanceof THREE.MeshPhysicalMaterial) {
            obj.mesh.material.emissiveIntensity = 0.5
          }
        } else {
          obj.mesh.scale.set(1, 1, 1)
          if (obj.mesh.material instanceof THREE.MeshPhysicalMaterial) {
            obj.mesh.material.emissiveIntensity = 0.2
          }
        }
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

      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [skillCategories, hoveredSkill])

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Skill info overlay */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-terminal-header-dark/80 backdrop-blur-md p-3 rounded-lg border border-terminal-border"
          >
            <h3 className="text-terminal-green font-bold">{hoveredSkill}</h3>

            {skillCategories
              .flatMap((category) => category.skills.filter((skill) => skill.name === hoveredSkill))
              .map((skill, index) => (
                <div key={index} className="mt-1">
                  <div className="w-full bg-terminal-border rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-terminal-green"
                      style={{ width: `${skill.level * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-terminal-text-dim mt-1">
                    Proficiency: {Math.round(skill.level * 100)}%
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

