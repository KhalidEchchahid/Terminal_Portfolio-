"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import PortfolioLayout from "./layout"
import AboutSection from "./sections/about-section"
import SkillsSection from "./sections/skills-section"
import ProjectsSection from "./sections/projects-section"
import ContactSection from "./sections/contact-section"
import LoadingScreen from "./ui/loading-screen"

interface Section {
  id: string
  label: string
}

export default function ModernPortfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Sections data
  const sections: Section[] = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything during SSR
  if (!mounted) return null

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <PortfolioLayout activeSection={activeSection} setActiveSection={setActiveSection} sections={sections}>
      <AnimatePresence mode="wait">
        {activeSection === "about" && <AboutSection key="about" />}
        {activeSection === "skills" && <SkillsSection key="skills" />}
        {activeSection === "projects" && <ProjectsSection key="projects" />}
        {activeSection === "contact" && <ContactSection key="contact" />}
      </AnimatePresence>
    </PortfolioLayout>
  )
}

