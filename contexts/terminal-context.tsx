"use client"

import { createContext, type ReactNode } from "react"

// Define theme type
export interface TerminalTheme {
  name: string
  variables: Record<string, string>
  bgClass: string
  bgHeaderClass: string
  bgHeaderDarkClass: string
  bgHeaderLightClass: string
  textClass: string
  textGreenClass: string
  textYellowClass: string
  textRedClass: string
  textBlueClass: string
  textPurpleClass: string
  borderClass: string
  borderGreenClass: string
}

// Define output type
export interface TerminalOutput {
  type: string
  content: ReactNode
  id: string
}

// Define editor mode type
export interface EditorState {
  active: boolean
  section: string
  fileName: string
}

// Define context type
interface TerminalContextType {
  activeSection: string
  setActiveSection: (section: string) => void
  commandHistory: string[]
  outputHistory: TerminalOutput[]
  handleCommand: (command: string) => void
  isProcessing: boolean
  compactMode: boolean
  toggleCompactMode: () => void
  clearHistory: () => void
  theme: TerminalTheme
  toggleTheme: (themeName: string) => void
  availableThemes: Record<string, TerminalTheme>
  editorState: EditorState
  openEditor: (section: string, fileName: string) => void
  closeEditor: () => void
}

// Create context with default values
export const TerminalContext = createContext<TerminalContextType>({
  activeSection: "home",
  setActiveSection: () => {},
  commandHistory: [],
  outputHistory: [],
  handleCommand: () => {},
  isProcessing: false,
  compactMode: false,
  toggleCompactMode: () => {},
  clearHistory: () => {},
  theme: {
    name: "dark",
    variables: {
      "--terminal-bg": "#1e1e2e",
      "--terminal-code": "#1a1b26",
      "--terminal-text": "#cdd6f4",
      "--terminal-text-dim": "#a6adc8",
      "--terminal-text-bright": "#f5f5f7",
      "--terminal-border": "#313244",
      "--terminal-header": "#181825",
      "--terminal-header-dark": "#11111b",
      "--terminal-header-light": "#313244",
      "--terminal-green": "#a6e3a1",
      "--terminal-yellow": "#f9e2af",
      "--terminal-red": "#f38ba8",
      "--terminal-blue": "#89b4fa",
      "--terminal-purple": "#cba6f7",
    },
    bgClass: "bg-terminal-bg",
    bgHeaderClass: "bg-terminal-header",
    bgHeaderDarkClass: "bg-terminal-header-dark",
    bgHeaderLightClass: "bg-terminal-header-light",
    textClass: "text-terminal-text",
    textGreenClass: "text-terminal-green",
    textYellowClass: "text-terminal-yellow",
    textRedClass: "text-terminal-red",
    textBlueClass: "text-terminal-blue",
    textPurpleClass: "text-terminal-purple",
    borderClass: "border-terminal-border",
    borderGreenClass: "border-terminal-green",
  },
  toggleTheme: () => {},
  availableThemes: {},
  editorState: {
    active: false,
    section: "",
    fileName: "",
  },
  openEditor: () => {},
  closeEditor: () => {},
})

// Create provider component
interface TerminalProviderProps {
  children: ReactNode
  value: TerminalContextType
}

export const TerminalProvider = ({ children, value }: TerminalProviderProps) => {
  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>
}

