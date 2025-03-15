"use client"

import { type ReactNode, useEffect, useState } from "react"
import Navigation from "./navigation"
import AnimatedBackground from "./ui/animted-background"

interface PortfolioLayoutProps {
  children: ReactNode
  activeSection: string
  setActiveSection: (section: string) => void
  sections: { id: string; label: string }[]
}

export default function PortfolioLayout({ children, activeSection, setActiveSection, sections }: PortfolioLayoutProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure the component is mounted before rendering the 3D background
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen  text-terminal-text relative overflow-hidden">
      {/* Animated Background - only render on client side */}
      {mounted && <AnimatedBackground />}

      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} sections={sections} />

      {/* Main Content */}
      <main className="pt-24 pb-16 container mx-auto px-4 relative z-10">{children}</main>

      {/* Footer */}
      <footer className="py-6 glass relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-terminal-text-dim">© {new Date().getFullYear()} Khalid Echchahid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

