"use client"

import type { ReactNode } from "react"
import Navigation from "./navigation"

interface PortfolioLayoutProps {
  children: ReactNode
  activeSection: string
  setActiveSection: (section: string) => void
  sections: { id: string; label: string }[]
}

export default function PortfolioLayout({
  children,
  activeSection,
  setActiveSection,
  sections,
}: PortfolioLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text overflow-hidden">
      {/* Header */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} sections={sections} />

      {/* Main content */}
      <main className="pt-24 md:pt-24 pb-10 container mx-auto px-4">{children}</main>
    </div>
  )
}

