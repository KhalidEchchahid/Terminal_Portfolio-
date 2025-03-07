"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play, RotateCcw, CuboidIcon as Cube, Grid3X3, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

interface ThreeDControlsProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isRotating: boolean
  onToggleRotation: () => void
  viewMode: "cube" | "projects" | "skills"
  onViewModeChange: (mode: "cube" | "projects" | "skills") => void
}

export default function ThreeDControls({
  activeSection,
  onSectionChange,
  isRotating,
  onToggleRotation,
  viewMode,
  onViewModeChange,
}: ThreeDControlsProps) {
  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-auto"
    >
      <div className="bg-terminal-header-dark/80 backdrop-blur-md rounded-lg p-4 flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSectionChange(section.id)}
              className={
                activeSection === section.id
                  ? "bg-terminal-green text-black hover:bg-terminal-green/90"
                  : "bg-terminal-header-light hover:bg-terminal-header"
              }
            >
              {section.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleRotation}
            className="bg-terminal-header-light hover:bg-terminal-header flex items-center gap-1"
            disabled={viewMode !== "cube"}
          >
            {isRotating ? (
              <>
                <Pause className="h-4 w-4" /> Pause Rotation
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Auto Rotate
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onSectionChange("about")}
            className="bg-terminal-header-light hover:bg-terminal-header flex items-center gap-1"
          >
            <RotateCcw className="h-4 w-4" /> Reset View
          </Button>
        </div>

        <div className="mt-4 border-t border-terminal-border pt-4 flex space-x-2">
          <Button
            variant={viewMode === "cube" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("cube")}
            className={
              viewMode === "cube"
                ? "bg-terminal-blue text-white hover:bg-terminal-blue/90"
                : "bg-terminal-header-light hover:bg-terminal-header"
            }
          >
            <Cube className="h-4 w-4 mr-2" /> Cube View
          </Button>

          <Button
            variant={viewMode === "projects" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("projects")}
            className={
              viewMode === "projects"
                ? "bg-terminal-green text-black hover:bg-terminal-green/90"
                : "bg-terminal-header-light hover:bg-terminal-header"
            }
          >
            <Grid3X3 className="h-4 w-4 mr-2" /> Projects Gallery
          </Button>

          <Button
            variant={viewMode === "skills" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("skills")}
            className={
              viewMode === "skills"
                ? "bg-terminal-purple text-white hover:bg-terminal-purple/90"
                : "bg-terminal-header-light hover:bg-terminal-header"
            }
          >
            <BarChart3 className="h-4 w-4 mr-2" /> Skills Visualization
          </Button>
        </div>
      </div>

      <div className="mt-4 text-xs text-terminal-text-dim text-center bg-terminal-header-dark/80 backdrop-blur-md rounded-lg p-2">
        Drag to rotate • Scroll to zoom • Click a section to focus
      </div>
    </motion.div>
  )
}

