"use client"

import { useContext } from "react"
import { Moon, Sun, Info, TerminalIcon } from "lucide-react"
import { TerminalContext } from "@/contexts/terminal-context"

export default function TerminalFooter() {
  const { theme, toggleTheme, availableThemes, editorState } = useContext(TerminalContext)

  return (
    <div
      className={`flex z-10 items-center justify-between py-2 px-4 ${theme.bgHeaderClass} text-terminal-text-dim text-xs rounded-b-lg mt-1 border ${theme.borderClass} border-t-0`}
    >
      <div className="flex items-center space-x-2">
        <TerminalIcon className="h-3 w-3" />
        <span>khalid@portfolio</span>
        {editorState.active && (
          <>
            <span className="mx-1">•</span>
            <span className={theme.textGreenClass}>{editorState.fileName}</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span>Theme:</span>
          <select
            value={theme.name}
            onChange={(e) => toggleTheme(e.target.value)}
            className={`bg-terminal-header-dark border ${theme.borderClass} rounded px-2 py-1 text-xs cursor-pointer`}
          >
            {Object.keys(availableThemes).map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleTheme(theme.name === "dark" ? "light" : "dark")}
            className={`p-1 rounded hover:${theme.bgHeaderLightClass}`}
            aria-label="Toggle dark mode"
          >
            {theme.name === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
          </button>

          <button className={`p-1 rounded hover:${theme.bgHeaderLightClass}`} aria-label="Terminal info">
            <Info className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

