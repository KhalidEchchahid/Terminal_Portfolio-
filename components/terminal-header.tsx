"use client"

import { useContext } from "react"
import { Circle, X, Minus, Maximize2 } from "lucide-react"
import { TerminalContext } from "@/contexts/terminal-context"

interface TerminalHeaderProps {
  activeSection: string
  onTabChange: (section: string) => void
}

export default function TerminalHeader({ activeSection, onTabChange }: TerminalHeaderProps) {
  const { theme } = useContext(TerminalContext)

  // Update the tabs array to include proper paths
  const tabs = [
    { id: "home", label: "home.sh" },
    { id: "about", label: "about.md" },
    { id: "skills", label: "skills.json" },
    { id: "projects", label: "projects.js" },
    { id: "contact", label: "contact.html" },
    { id: "files", label: "files.txt" },
  ]

  return (
    <div className={`rounded-t-lg overflow-hidden ${theme.bgHeaderClass} border ${theme.borderClass} border-b-0`}>
      {/* Window controls */}
      <div className={`flex items-center px-4 py-2 ${theme.bgHeaderDarkClass}`}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red flex items-center justify-center group">
            <X className="w-2 h-2 text-terminal-bg opacity-0 group-hover:opacity-100" />
          </div>
          <div className="w-3 h-3 rounded-full bg-terminal-yellow flex items-center justify-center group">
            <Minus className="w-2 h-2 text-terminal-bg opacity-0 group-hover:opacity-100" />
          </div>
          <div className="w-3 h-3 rounded-full bg-terminal-green flex items-center justify-center group">
            <Maximize2 className="w-2 h-2 text-terminal-bg opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex-grow text-center text-terminal-text-dim text-xs">khalid@portfolio ~ bash</div>
      </div>

      {/* Tabs */}
      <div className={`flex overflow-x-auto ${theme.bgHeaderClass} text-terminal-text-dim scrollbar-hide`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`group flex items-center px-4 py-2 text-xs cursor-pointer whitespace-nowrap border-r ${theme.borderClass} ${
              activeSection === tab.id ? theme.bgClass + " " + theme.textClass : `hover:${theme.bgHeaderLightClass}`
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Circle
              className={`w-2 h-2 mr-2 ${activeSection === tab.id ? theme.textGreenClass : "text-terminal-text-dim"}`}
              fill={activeSection === tab.id ? "currentColor" : "none"}
            />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

