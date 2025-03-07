"use client"

import { useState, useCallback, useEffect } from "react"
import type { TerminalTheme } from "@/contexts/terminal-context"

export function useTerminalTheme() {
  // Define available themes with CSS variable values
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const availableThemes: Record<string, TerminalTheme> = {
    dark: {
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
    light: {
      name: "light",
      variables: {
        "--terminal-bg": "#f8f9fa",
        "--terminal-code": "#e9ecef",
        "--terminal-text": "#343a40",
        "--terminal-text-dim": "#6c757d",
        "--terminal-text-bright": "#212529",
        "--terminal-border": "#dee2e6",
        "--terminal-header": "#e9ecef",
        "--terminal-header-dark": "#dee2e6",
        "--terminal-header-light": "#ced4da",
        "--terminal-green": "#198754",
        "--terminal-yellow": "#ffc107",
        "--terminal-red": "#dc3545",
        "--terminal-blue": "#0d6efd",
        "--terminal-purple": "#6f42c1",
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
    hacker: {
      name: "hacker",
      variables: {
        "--terminal-bg": "#0d0208",
        "--terminal-code": "#0a0106",
        "--terminal-text": "#00ff41",
        "--terminal-text-dim": "#008f11",
        "--terminal-text-bright": "#00ff41",
        "--terminal-border": "#003b00",
        "--terminal-header": "#0d0208",
        "--terminal-header-dark": "#000000",
        "--terminal-header-light": "#001100",
        "--terminal-green": "#00ff41",
        "--terminal-yellow": "#00ff41",
        "--terminal-red": "#ff0000",
        "--terminal-blue": "#00ff41",
        "--terminal-purple": "#00ff41",
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
    dracula: {
      name: "dracula",
      variables: {
        "--terminal-bg": "#282a36",
        "--terminal-code": "#21222c",
        "--terminal-text": "#f8f8f2",
        "--terminal-text-dim": "#6272a4",
        "--terminal-text-bright": "#ffffff",
        "--terminal-border": "#44475a",
        "--terminal-header": "#44475a",
        "--terminal-header-dark": "#21222c",
        "--terminal-header-light": "#6272a4",
        "--terminal-green": "#50fa7b",
        "--terminal-yellow": "#f1fa8c",
        "--terminal-red": "#ff5555",
        "--terminal-blue": "#8be9fd",
        "--terminal-purple": "#bd93f9",
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
  }

  const [theme, setTheme] = useState<TerminalTheme>(availableThemes.dark)

  // Apply theme by updating CSS variables
  const applyTheme = useCallback((theme: TerminalTheme) => {
    const root = document.documentElement

    // Apply all CSS variables from the theme
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [])

  // Toggle theme function
  const toggleTheme = useCallback(
    (themeName: string) => {
      if (availableThemes[themeName]) {
        const newTheme = availableThemes[themeName]
        setTheme(newTheme)
        applyTheme(newTheme)
      }
    },
    [availableThemes, applyTheme],
  )

  // Apply initial theme on mount
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  return {
    theme,
    toggleTheme,
    availableThemes,
  }
}

