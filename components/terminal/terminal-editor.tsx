"use client"

import { useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Save, FileText } from "lucide-react"
import { TerminalContext } from "@/contexts/terminal-context"
import TerminalSection from "./terminal-section"

export default function TerminalEditor() {
  const { theme, editorState, closeEditor } = useContext(TerminalContext)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+X to close editor (like nano)
      if (e.ctrlKey && e.key === "x") {
        closeEditor()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeEditor])

  return (
    <div className="flex flex-col h-full">
      {/* Editor header */}
      <div className={`flex items-center justify-between p-2 ${theme.bgHeaderDarkClass} rounded-t mb-2`}>
        <div className="flex items-center">
          <FileText className={`h-4 w-4 mr-2 ${theme.textBlueClass}`} />
          <span className={theme.textClass}>{editorState.fileName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`flex items-center px-2 py-1 rounded text-xs ${theme.bgHeaderLightClass} ${theme.textGreenClass}`}
            onClick={closeEditor}
          >
            <Save className="h-3 w-3 mr-1" />
            Save & Exit
          </button>
          <button
            className={`flex items-center p-1 rounded hover:${theme.bgHeaderClass}`}
            onClick={closeEditor}
            aria-label="Close"
          >
            <X className={`h-4 w-4 ${theme.textRedClass}`} />
          </button>
        </div>
      </div>

      {/* Editor content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 overflow-auto"
      >
        <TerminalSection section={editorState.section} />
      </motion.div>

      {/* Editor status bar */}
      <div
        className={`flex items-center justify-between p-2 ${theme.bgHeaderDarkClass} rounded-b mt-2 text-xs ${theme.textClass}`}
      >
        <div>
          <span className={theme.textGreenClass}>READ ONLY</span> | {editorState.fileName}
        </div>
        <div className="flex space-x-4">
          <span>
            <kbd className={theme.textYellowClass}>ESC</kbd> or <kbd className={theme.textYellowClass}>Ctrl+X</kbd>:
            Exit
          </span>
        </div>
      </div>
    </div>
  )
}

