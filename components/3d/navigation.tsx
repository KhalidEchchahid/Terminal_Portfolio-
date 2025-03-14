"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "./ui/link"
import type { JSX } from "react"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  sections: { id: string; label: string }[]
}

export default function Navigation({ activeSection, setActiveSection, sections }: NavigationProps): JSX.Element {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-header-dark/80 backdrop-blur-md border-b border-terminal-border">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Terminal
          </Button>
        </Link>

        <div className="flex flex-wrap justify-center gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className={activeSection === section.id ? "bg-terminal-green text-black hover:bg-terminal-green/90" : ""}
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}

