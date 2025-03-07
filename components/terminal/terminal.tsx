"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import TerminalBody from "./terminal-body"
import TerminalFooter from "./terminal-footer"
import TerminalEditor from "./terminal-editor"
import { useTerminalCommands } from "@/hooks/use-terminal-commands"
import { useTerminalHistory } from "@/hooks/use-terminal-history"
import { useTerminalTheme } from "@/hooks/use-terminal-theme"
import { TerminalProvider } from "@/contexts/terminal-context"
import type { EditorState } from "@/contexts/terminal-context"
import TerminalHeader from "../terminal-header"

export default function Terminal() {
  const [activeSection, setActiveSection] = useState("home")
  const terminalRef = useRef<HTMLDivElement>(null)
  const [editorState, setEditorState] = useState<EditorState>({
    active: false,
    section: "",
    fileName: "",
  })

  // Custom hooks for terminal functionality
  const {
    commandHistory,
    outputHistory,
    addToCommandHistory,
    addToOutputHistory,
    clearHistory,
    compactMode,
    toggleCompactMode,
  } = useTerminalHistory()

  const { processCommand, isProcessing } = useTerminalCommands({
    activeSection,
    setActiveSection,
    addToOutputHistory,
  })

  const { theme, toggleTheme, availableThemes } = useTerminalTheme()

  // Editor functions
  const openEditor = useCallback((section: string, fileName: string) => {
    setEditorState({
      active: true,
      section,
      fileName,
    })
    setActiveSection(section)
  }, [])

  const closeEditor = useCallback(() => {
    setEditorState({
      active: false,
      section: "",
      fileName: "",
    })
  }, [])

  // Handle tab navigation
  const handleTabChange = (section: string) => {
    // Get file name based on section
    const fileNames: Record<string, string> = {
      home: "home.sh",
      about: "about.md",
      skills: "skills.json",
      projects: "projects.js",
      contact: "contact.html",
      files: "files.txt",
    }

    // Open editor with the section
    openEditor(section, fileNames[section] || `${section}.txt`)
  }

  // Process command
  const handleCommand = async (command: string) => {
    // Add to history
    addToCommandHistory(command)

    // Check if it's a section command to open in editor
    const sectionCommands = ["home", "about", "skills", "projects", "contact", "files"]
    const cmd = command.trim().toLowerCase()

    if (sectionCommands.includes(cmd)) {
      const fileNames: Record<string, string> = {
        home: "home.sh",
        about: "about.md",
        skills: "skills.json",
        projects: "projects.js",
        contact: "contact.html",
        files: "files.txt",
      }

      // Add command output
      await processCommand(command)

      // Open editor with the section
      openEditor(cmd, fileNames[cmd] || `${cmd}.txt`)
    } else {
      // Process regular command
      await processCommand(command)
    }

    // Scroll to bottom
    scrollToBottom()
  }

  // Scroll to bottom helper
  const scrollToBottom = () => {
    if (terminalRef.current) {
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      }, 10)
    }
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key to close editor
      if (e.key === "Escape" && editorState.active) {
        closeEditor()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [editorState.active, closeEditor])

  // Scroll to bottom when content changes
  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, outputHistory])

  // Handle editor events
  useEffect(() => {
    const handleEditorEvent = (e: CustomEvent<{ section: string; fileName: string }>) => {
      const { section, fileName } = e.detail
      openEditor(section, fileName)
    }

    window.addEventListener("openEditor", handleEditorEvent as EventListener)
    return () => window.removeEventListener("openEditor", handleEditorEvent as EventListener)
  }, [openEditor])

  return (
    <TerminalProvider
      value={{
        activeSection,
        setActiveSection,
        commandHistory,
        outputHistory,
        handleCommand,
        isProcessing,
        compactMode,
        toggleCompactMode,
        clearHistory,
        theme,
        toggleTheme,
        availableThemes,
        editorState,
        openEditor,
        closeEditor,
      }}
    >
      <div className="container mx-auto px-4 py-8 h-screen max-h-screen flex flex-col transition-colors duration-300">
        <TerminalHeader activeSection={activeSection} onTabChange={handleTabChange} />

        <div
          ref={terminalRef}
          className={`flex-1 overflow-auto ${theme.bgClass} rounded-b-lg font-mono text-sm md:text-base p-4 border ${theme.borderClass} border-t-0 shadow-inner transition-colors duration-300`}
        >
          {editorState.active ? <TerminalEditor /> : <TerminalBody />}
        </div>

        <TerminalFooter />
      </div>
    </TerminalProvider>
  )
}

