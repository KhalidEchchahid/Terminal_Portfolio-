"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Cursor } from "react-simple-typewriter"

interface TerminalPromptProps {
  onSubmit?: (command: string) => void
  readOnly?: boolean
  value?: string
}

export default function TerminalPrompt({ onSubmit, readOnly = false, value = "" }: TerminalPromptProps) {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!readOnly && inputRef.current) {
      inputRef.current.focus()
    }
  }, [readOnly])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (onSubmit && input.trim()) {
        onSubmit(input)
        // Add to command history
        setCommandHistory((prev) => [input, ...prev].slice(0, 50))
        setInput("")
        setHistoryIndex(-1)
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      // Navigate command history
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      // Navigate command history
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Simple tab completion for common commands
      const commonCommands = ["help", "about", "skills", "projects", "contact", "clear", "social", "launch_portfolio"]
      const inputLower = input.toLowerCase()

      for (const cmd of commonCommands) {
        if (cmd.startsWith(inputLower) && cmd !== inputLower) {
          setInput(cmd)
          break
        }
      }
    }
  }

  return (
    <div className="flex items-center text-terminal-text">
      <span className="text-terminal-green mr-2">➜</span>
      <span className="text-terminal-yellow mr-2">~/portfolio</span>
      <span className="text-terminal-blue mr-2">$</span>

      {readOnly ? (
        <div className="flex-1">{value}</div>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none p-0"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      )}

      {!readOnly && input === "" && <Cursor cursorStyle="_" cursorColor="#9ca3af" />}
    </div>
  )
}

