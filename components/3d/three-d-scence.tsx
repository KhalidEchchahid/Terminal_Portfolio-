"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"

interface ThreeDSceneProps {
  activeSection: string
  isRotating: boolean
}

export default function ThreeDScene({ activeSection, isRotating }: ThreeDSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const outlinePassRef = useRef<OutlinePass | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const [hoveredFace, setHoveredFace] = useState<number | null>(null)

  // Setup the scene
  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color("#0f0f1a") // Darker background for better contrast

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5

    // Renderer setup with antialiasing and better shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit for performance
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mountRef.current.appendChild(renderer.domElement)

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enableZoom = true
    controls.minDistance = 3
    controls.maxDistance = 10
    controls.maxPolarAngle = Math.PI / 1.5 // Limit vertical rotation
    controls.minPolarAngle = Math.PI / 4 // Limit vertical rotation

    // Advanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    // Main directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    scene.add(directionalLight)

    // Add a point light for more dynamic lighting
    const pointLight = new THREE.PointLight(0x89b4fa, 1, 10)
    pointLight.position.set(-2, 1, 4)
    scene.add(pointLight)

    // Create cube with different colored faces for each section
    const geometry = new THREE.BoxGeometry(2, 2, 2)

    // More sophisticated materials with environment mapping
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const envMap = cubeTextureLoader.load([
      "/assets/envmap/px.png",
      "/assets/envmap/nx.png",
      "/assets/envmap/py.png",
      "/assets/envmap/ny.png",
      "/assets/envmap/pz.png",
      "/assets/envmap/nz.png",
    ])

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x89b4fa,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
      }), // About - blue
      new THREE.MeshPhysicalMaterial({
        color: 0xa6e3a1,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
      }), // Skills - green
      new THREE.MeshPhysicalMaterial({
        color: 0xf9e2af,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
      }), // Projects - yellow
      new THREE.MeshPhysicalMaterial({
        color: 0xf38ba8,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
      }), // Contact - red
      new THREE.MeshPhysicalMaterial({
        color: 0xcba6f7,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
      }), // Top - purple
      new THREE.MeshPhysicalMaterial({
        color: 0xcba6f7,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
      }), // Bottom - purple
    ]

    const cube = new THREE.Mesh(geometry, materials)
    cube.castShadow = true
    cube.receiveShadow = true
    cubeRef.current = cube
    scene.add(cube)

    // Add text labels to cube faces with improved visuals
    const addTextToFace = (text: string, position: THREE.Vector3, rotation: THREE.Euler, faceIndex: number) => {
      const canvas = document.createElement("canvas")
      canvas.width = 512 // Higher resolution
      canvas.height = 512
      const context = canvas.getContext("2d")
      if (context) {
        // Create gradient background
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#1a1b2a")
        gradient.addColorStop(1, "#2a2b3a")
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Add subtle pattern
        context.fillStyle = "rgba(255, 255, 255, 0.03)"
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 5 + 1
          context.beginPath()
          context.arc(x, y, size, 0, Math.PI * 2)
          context.fill()
        }

        // Draw text with shadow
        context.shadowColor = "rgba(0, 0, 0, 0.5)"
        context.shadowBlur = 10
        context.shadowOffsetX = 5
        context.shadowOffsetY = 5
        context.font = "Bold 80px JetBrains Mono, monospace"
        context.textAlign = "center"
        context.textBaseline = "middle"

        // Create text gradient
        const textGradient = context.createLinearGradient(
          canvas.width / 2 - 100,
          canvas.height / 2,
          canvas.width / 2 + 100,
          canvas.height / 2,
        )

        // Set gradient colors based on face
        switch (faceIndex) {
          case 0: // About
            textGradient.addColorStop(0, "#89b4fa")
            textGradient.addColorStop(1, "#b4befe")
            break
          case 1: // Skills
            textGradient.addColorStop(0, "#a6e3a1")
            textGradient.addColorStop(1, "#94e2d5")
            break
          case 2: // Projects
            textGradient.addColorStop(0, "#f9e2af")
            textGradient.addColorStop(1, "#fab387")
            break
          case 3: // Contact
            textGradient.addColorStop(0, "#f38ba8")
            textGradient.addColorStop(1, "#f5c2e7")
            break
          default:
            textGradient.addColorStop(0, "#cdd6f4")
            textGradient.addColorStop(1, "#a6adc8")
        }

        context.fillStyle = textGradient
        context.fillText(text, canvas.width / 2, canvas.height / 2)

        // Add subtle border
        context.strokeStyle = "rgba(255, 255, 255, 0.1)"
        context.lineWidth = 8
        context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

        const texture = new THREE.CanvasTexture(canvas)
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        })

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), material)

        plane.position.copy(position)
        plane.rotation.copy(rotation)
        plane.userData = { faceIndex }

        // Add slight offset to prevent z-fighting
        const normal = new THREE.Vector3().copy(position).normalize()
        plane.position.add(normal.multiplyScalar(0.01))

        scene.add(plane)
      }
    }

    // Add text to each face
    addTextToFace("ABOUT", new THREE.Vector3(0, 0, 1.01), new THREE.Euler(0, 0, 0), 0)
    addTextToFace("SKILLS", new THREE.Vector3(1.01, 0, 0), new THREE.Euler(0, Math.PI / 2, 0), 1)
    addTextToFace("PROJECTS", new THREE.Vector3(0, 0, -1.01), new THREE.Euler(0, Math.PI, 0), 2)
    addTextToFace("CONTACT", new THREE.Vector3(-1.01, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0), 3)

    // Add particle system for background
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere of particles
      const radius = 20 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)

      scaleArray[i / 3] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Create shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x89b4fa) },
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        
        void main() {
          vec3 pos = position;
          
          // Add subtle movement
          float noise = sin(pos.x * 0.05 + time) * cos(pos.z * 0.05 + time) * sin(pos.y * 0.05 + time);
          pos.x += noise * 0.2;
          pos.y += noise * 0.2;
          pos.z += noise * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 2.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        void main() {
          // Create circular particles
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Add glow effect
          float intensity = 1.0 - dist * 2.0;
          gl_FragColor = vec4(color, intensity * 0.5);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particlesRef.current = particles
    scene.add(particles)

    // Post-processing setup
    const composer = new EffectComposer(renderer)
    composerRef.current = composer

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // Add bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, // strength
      0.4, // radius
      0.9, // threshold
    )
    composer.addPass(bloomPass)

    // Add outline effect
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
    outlinePass.edgeStrength = 3
    outlinePass.edgeGlow = 1
    outlinePass.edgeThickness = 1
    outlinePass.pulsePeriod = 0
    outlinePass.visibleEdgeColor.set("#ffffff")
    outlinePass.hiddenEdgeColor.set("#190a05")
    outlinePassRef.current = outlinePass
    composer.addPass(outlinePass)

    // Raycaster for interactive elements
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera)

      // Check for intersections with the cube faces
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object

        // Check if we're hovering over a face label
        if (object.userData && typeof object.userData.faceIndex === "number") {
          setHoveredFace(object.userData.faceIndex)

          // Add outline effect
          if (outlinePassRef.current) {
            outlinePassRef.current.selectedObjects = [object]
          }

          // Change cursor
          document.body.style.cursor = "pointer"
        } else {
          setHoveredFace(null)

          // Remove outline effect
          if (outlinePassRef.current) {
            outlinePassRef.current.selectedObjects = []
          }

          // Reset cursor
          document.body.style.cursor = "auto"
        }
      } else {
        setHoveredFace(null)

        // Remove outline effect
        if (outlinePassRef.current) {
          outlinePassRef.current.selectedObjects = []
        }

        // Reset cursor
        document.body.style.cursor = "auto"
      }
    }

    const handleClick = (event: MouseEvent) => {
      // Only handle click if we're hovering over a face
      if (hoveredFace !== null) {
        // Map face index to section
        const sections = ["about", "skills", "projects", "contact"]
        if (hoveredFace >= 0 && hoveredFace < sections.length) {
          // Trigger section change
          const event = new CustomEvent("sectionChange", {
            detail: { section: sections[hoveredFace] },
          })
          window.dispatchEvent(event)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Auto-rotation
      if (isRotating && cubeRef.current) {
        cubeRef.current.rotation.y += 0.005
      }

      // Update particle shader time
      if (particlesRef.current && particlesRef.current.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.time.value = clock.getElapsedTime()

        // Slowly rotate particles
        particlesRef.current.rotation.y += 0.0003
        particlesRef.current.rotation.x += 0.0001
      }

      // Render with post-processing
      if (composerRef.current) {
        composerRef.current.render()
      } else if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && composerRef.current) {
        // Update camera
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()

        // Update renderer and composer
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        composerRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)

      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }

      if (mountRef.current && rendererRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(rendererRef.current.domElement)
      }

      // Dispose of geometries and materials
      if (cubeRef.current) {
        cubeRef.current.geometry.dispose()
        if (Array.isArray(cubeRef.current.material)) {
          cubeRef.current.material.forEach((material) => material.dispose())
        } else {
          cubeRef.current.material.dispose()
        }
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose()
        // particlesRef.current.material.dispose()
      }

      // Reset cursor
      document.body.style.cursor = "auto"
    }
  }, [isRotating, hoveredFace])

  // Update cube rotation based on active section
  useEffect(() => {
    if (!cubeRef.current || isRotating) return

    const targetRotation = {
      about: { y: 0 },
      skills: { y: Math.PI / 2 },
      projects: { y: Math.PI },
      contact: { y: -Math.PI / 2 },
    }[activeSection]

    // Animate to the target rotation
    const animate = () => {
      if (!cubeRef.current || isRotating) return

      const cube = cubeRef.current
      const targetY = targetRotation?.y || 0
      const currentY = cube.rotation.y % (Math.PI * 2)

      // Calculate the shortest path to the target rotation
      let diff = targetY - currentY
      if (diff > Math.PI) diff -= Math.PI * 2
      if (diff < -Math.PI) diff += Math.PI * 2

      // Smoothly interpolate to the target rotation
      cube.rotation.y += diff * 0.05

      // Stop animating when close enough
      if (Math.abs(diff) > 0.01) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [activeSection, isRotating])

  return <div ref={mountRef} className="w-full h-full" />
}

