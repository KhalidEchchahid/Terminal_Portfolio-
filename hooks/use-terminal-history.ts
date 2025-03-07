"use client"

import { useState, useCallback } from "react"
import type { TerminalOutput } from "@/contexts/terminal-context"

export function useTerminalHistory() {
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [outputHistory, setOutputHistory] = useState<TerminalOutput[]>([])
  const [compactMode, setCompactMode] = useState(false)

  const addToCommandHistory = useCallback((command: string) => {
    setCommandHistory((prev) => [...prev, command])
  }, [])

  const addToOutputHistory = useCallback((output: TerminalOutput) => {
    setOutputHistory((prev) => [...prev, output])
  }, [])

  const clearHistory = useCallback(() => {
    setCommandHistory([])
    setOutputHistory([])
  }, [])

  const toggleCompactMode = useCallback(() => {
    setCompactMode((prev) => !prev)
  }, [])

  return {
    commandHistory,
    outputHistory,
    addToCommandHistory,
    addToOutputHistory,
    clearHistory,
    compactMode,
    toggleCompactMode,
  }
}

