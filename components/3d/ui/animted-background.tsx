"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { inSphere } from "maath/random"
import type * as THREE from "three"

function StarField({ count = 5000 }) {
  const points = useRef<THREE.Points>(null)

  // Generate random points in a sphere
  const positions = inSphere(new Float32Array(count * 3), { radius: 1.5 })

  useFrame((state, delta) => {
    if (!points.current) return

    // Rotate the star field slowly
    points.current.rotation.x += delta * 0.05
    points.current.rotation.y += delta * 0.075
  })

  return (
    <Points ref={points} positions={positions as Float32Array} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

function MovingGradient() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return

    // Move the gradient sphere slowly
    const t = clock.getElapsedTime() * 0.15
    mesh.current.position.x = Math.sin(t) * 0.5
    mesh.current.position.y = Math.cos(t * 0.7) * 0.3
    mesh.current.position.z = -1 + Math.sin(t * 0.3) * 0.3
  })

  return (
    <mesh ref={mesh} position={[0, 0, -1]} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#cba6f7" transparent opacity={0.15} />
    </mesh>
  )
}

function MovingGradient2() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return

    // Move the gradient sphere slowly in a different pattern
    const t = clock.getElapsedTime() * 0.15
    mesh.current.position.x = Math.cos(t) * 0.6
    mesh.current.position.y = Math.sin(t * 0.8) * 0.4
    mesh.current.position.z = -1.2 + Math.cos(t * 0.4) * 0.3
  })

  return (
    <mesh ref={mesh} position={[0, 0, -1.2]} scale={1.2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#89b4fa" transparent opacity={0.12} />
    </mesh>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-terminal-bg">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={["#0f0f11"]} />
        <StarField />
        <MovingGradient />
        <MovingGradient2 />
      </Canvas>
    </div>
  )
}

