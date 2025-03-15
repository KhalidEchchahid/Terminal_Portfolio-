"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Phone, MapPin, Send, Share2 } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, Environment } from "@react-three/drei"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function ContactText() {
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
          Contact
          <meshStandardMaterial color="#7c3aed" />
        </Text3D>
      </Float>
      <Environment preset="city" />
    </Canvas>
  )
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the form data to your backend
    alert("Message sent! I will get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  // Share functionality
  const shareContact = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Contact Khalid Echchahid",
          text: "Get in touch with Khalid Echchahid, Software Engineer",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Contact page link copied to clipboard!"))
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
          Get In <span className="text-gradient-1">Touch</span>
        </h2>
        <p className="text-terminal-text-dim max-w-2xl mx-auto">
          Have a project in mind or want to discuss potential opportunities? Feel free to reach out to me through any of
          the channels below.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-terminal-purple hover:bg-primary/10">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={shareContact}>Share Contact Info</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText("echchahidkhalid7@gmail.com")}>
                Copy Email Address
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-6 text-gradient-1">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="bg-secondary/50 border-terminal-purple/30 focus:border-terminal-purple"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="bg-secondary/50 border-terminal-purple/30 focus:border-terminal-purple"
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="bg-secondary/50 border-terminal-purple/30 focus:border-terminal-purple"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="bg-secondary/50 border-terminal-purple/30 focus:border-terminal-purple"
                />
              </div>

              <Button type="submit" className="w-full btn-gradient-1">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6 text-gradient-1">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-terminal-purple/10 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-terminal-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-terminal-text-dim">echchahidkhalid7@gmail.com</p>
                    <p className="text-terminal-text-dim">khalid.echchahid@usmba.ac.ma</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-terminal-purple/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-terminal-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-terminal-text-dim">+212-645557609</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-terminal-purple/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-terminal-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-terminal-text-dim">Fez, Morocco</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6 text-gradient-1">Social Links</h3>

              <div className="flex flex-col space-y-4">
                <a
                  href="https://github.com/khalid-echchahid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 glass hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Github className="h-5 w-5 text-terminal-purple mr-3" />
                  <span>github.com/khalidEchchahid</span>
                </a>

                <a
                  href="https://linkedin.com/in/khalid-echchahid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 glass hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-terminal-purple mr-3" />
                  <span>linkedin.com/in/khalid-echchahid</span>
                </a>
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="glass-card p-6 h-[200px] flex items-center justify-center">
              <p className="text-center text-terminal-text-dim">
                Available for remote work and collaborations worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

