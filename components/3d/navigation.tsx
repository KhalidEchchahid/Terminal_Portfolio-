"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Menu, X, Terminal } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  sections: { id: string; label: string }[]
}

export default function Navigation({ activeSection, setActiveSection, sections }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 glass" : "py-5"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mr-4 flex items-center gap-2 border-terminal-border hover:bg-terminal-header-light"
            >
              <Terminal className="h-4 w-4 text-terminal-green" />
              <span className="text-terminal-green">Back to Terminal</span>
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-xl font-bold text-gradient-1">Khalid Echchahid</h1>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <motion.div
            className="flex items-center space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(section.id)}
                  className={`relative px-4 ${
                    activeSection === section.id
                      ? "bg-terminal-purple text-terminal-text-bright"
                      : "hover:bg-terminal-header-light"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-terminal-text-bright"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="ml-4 btn-gradient-1">
              <Download className="mr-2 h-4 w-4" /> Resume
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          className={`absolute top-full left-0 right-0 glass ${mobileMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                onClick={() => {
                  setActiveSection(section.id)
                  setMobileMenuOpen(false)
                }}
                className={
                  activeSection === section.id
                    ? "bg-terminal-purple text-terminal-text-bright"
                    : "hover:bg-terminal-header-light"
                }
              >
                {section.label}
              </Button>
            ))}
            <Button className="btn-gradient-1 mt-4">
              <Download className="mr-2 h-4 w-4" /> Resume
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

