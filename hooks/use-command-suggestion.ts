"use client"

import { useState, useCallback } from "react"

export function useCommandSuggestions(input: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // List of all available commands
  const allCommands = [
    "help",
    "clear",
    "about",
    "skills",
    "projects",
    "contact",
    "social",
    "exit",
    "launch_portfolio",
    "coffee",
    "joke",
    "github",
    "linkedin",
    "resume",
    "open resume",
    "3d_portfolio",
    "ls",
    "cat",
    "pwd",
    "cd",
    "echo",
    "man",
    "whoami",
    "date",
    "history",
    "files",
    "ascii-art",
    "weather",
    "matrix",
  ]

  // Get suggestions based on input
  const getSuggestions = useCallback((input: string) => {
    const inputValue = input.trim().toLowerCase()

    if (inputValue === "") {
      setSuggestions([])
      return
    }

    const filteredSuggestions = allCommands.filter((command) => command.toLowerCase().startsWith(inputValue))

    setSuggestions(filteredSuggestions)
    setActiveSuggestion(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Navigate through suggestions
  const navigateSuggestions = useCallback(
    (direction: number) => {
      if (!suggestions.length) return

      const newIndex = (activeSuggestion + direction + suggestions.length) % suggestions.length
      setActiveSuggestion(newIndex)
    },
    [activeSuggestion, suggestions],
  )

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSuggestions([])
    setShowSuggestions(false)
    return suggestion
  }, [])

  return {
    suggestions,
    activeSuggestion,
    showSuggestions,
    setShowSuggestions,
    handleSuggestionClick,
    navigateSuggestions,
    getSuggestions,
  }
}

