"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls, Environment } from "@react-three/drei"

function HeroText() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-4.5, 0, 0]}
        >
          Developer
          <meshStandardMaterial color="var(--terminal-purple)" />
        </Text3D>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="city" />
    </Canvas>
  )
}

export default function AboutSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-gradient-1">Khalid</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-terminal-text-dim">
            Full-Stack <span className="text-gradient-2">Developer</span>
          </h2>
          <p className="text-lg mb-8 text-terminal-text-dim max-w-lg">
            I build innovative web applications with modern technologies. Currently pursuing a degree in Software
            Engineering and Integration of Computer Systems.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="btn-gradient-1">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <Button variant="outline" className="border-terminal-purple hover:bg-terminal-purple/10">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button variant="outline" className="border-terminal-purple hover:bg-terminal-purple/10">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] lg:h-[500px] animated-border"
        >
          <div className="absolute inset-[3px] glass-card overflow-hidden">
            <div className="relative h-full w-full">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4E03AQFnSpoqTalvpg/profile-displayphoto-shrink_800_800/B4EZVNq_ZTH0Ag-/0/1740764870634?e=1746662400&v=beta&t=A9Esf5PhuJozuVbXoBVmXjh-TTne0MxIk02wUNLXzmo"
                fill
                alt="Khalid Echchahid"
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-terminal-purple" />
            Education
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-terminal-purple pl-4 py-1">
              <p className="font-semibold">Software Engineering and Integration of Computer Systems</p>
              <p className="text-terminal-text-dim">Faculty of Sciences and Techniques, Mohammedia</p>
              <div className="flex items-center text-sm text-terminal-purple mt-1">
                <Calendar className="h-3 w-3 mr-1" /> Ongoing - 2026
              </div>
            </div>
            <div className="border-l-2 border-terminal-purple pl-4 py-1">
              <p className="font-semibold">Bachelor in Mathematics and Computer Science</p>
              <p className="text-terminal-text-dim">Faculty of Sciences, Fez</p>
              <div className="flex items-center text-sm text-terminal-purple mt-1">
                <Calendar className="h-3 w-3 mr-1" /> 2020 - 2023
              </div>
              <p className="text-sm text-terminal-purple">Grade: A</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-terminal-purple" />
            Experience
          </h3>
          <div className="border-l-2 border-terminal-purple pl-4 py-1">
            <p className="font-semibold">Freelance Full-Stack Developer</p>
            <p className="text-terminal-text-dim">Self-Employed, Remote</p>
            <div className="flex items-center text-sm text-terminal-purple mt-1">
              <Calendar className="h-3 w-3 mr-1" /> Since January 2024
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-terminal-text-dim mt-2">
              <li>Built custom e-commerce platforms and admin dashboards</li>
              <li>Handled end-to-end development from UI design to MongoDB implementation</li>
              <li>Developed systems for tracking products, orders, and customers</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-terminal-purple" />
            Personal Info
          </h3>
          <ul className="space-y-3">
            <li className="flex">
              <span className="text-terminal-text-dim w-24">Name:</span>
              <span className="font-medium">Khalid Echchahid</span>
            </li>
            <li className="flex">
              <span className="text-terminal-text-dim w-24">Age:</span>
              <span>22 years old</span>
            </li>
            <li className="flex">
              <span className="text-terminal-text-dim w-24">Location:</span>
              <span>Fez, Morocco</span>
            </li>
            <li className="flex">
              <span className="text-terminal-text-dim w-24">Email:</span>
              <span className="break-all">echchahidkhalid7@gmail.com</span>
            </li>
            <li className="flex">
              <span className="text-terminal-text-dim w-24">Languages:</span>
              <span>English, Arabic, French</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

