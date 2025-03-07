"use client"

import { useContext } from "react"
import TerminalPrompt from "./terminal-prompt"
import { TerminalContext } from "@/contexts/terminal-context"

export default function TerminalHistory() {
  const { 
    commandHistory, 
    outputHistory, 
    compactMode, 
    toggleCompactMode, 
    clearHistory,
    theme
  } = useContext(TerminalContext)

  return (
    <>
      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={toggleCompactMode}
          className={`text-xs px-2 py-1 rounded border transition-colors ${
            compactMode
              ? `${theme.textGreenClass} ${theme.borderGreenClass}`
              : `text-terminal-text-dim border-terminal-border hover:${theme.textGreenClass} hover:${theme.borderGreenClass}`
          }`}
        >
          {compactMode ? "Show All History" : "Compact Mode"}
        </button>
        <button
          onClick={clearHistory}
          className={`text-xs text-terminal-text-dim hover:${theme.textGreenClass} px-2 py-1 rounded border border-terminal-border hover:${theme.borderGreenClass} transition-colors`}
        >
          Clear History
        </button>
      </div>

      {/* Command history */}
      {(compactMode ? commandHistory.slice(-3) : commandHistory).map((cmd, i) => {
        const index = compactMode ? commandHistory.length - 3 + i : i
        return (
          <div
            key={`cmd-${index}`}
            className={`mb-2 border-l-2 border-terminal-border pl-2 hover:${theme.borderGreenClass} transition-colors`}
          >
            <TerminalPrompt readOnly value={cmd} />
            {outputHistory[index] && (
              <div
                className={`pl-4 ${
                  outputHistory[index].type === "error"
                    ? theme.textRedClass
                    : outputHistory[index].type === "success"
                      ? theme.textGreenClass
                      : outputHistory[index].type === "special"
                        ? theme.textPurpleClass
                        : theme.textClass
                }`}
              >
                {outputHistory[index].content}
              </div>
            )}
          </div>
        )
      })}
      {compactMode && commandHistory.length > 3 && (
        <div className="text-xs text-terminal-text-dim mb-2 italic">
          {commandHistory.length - 3} earlier commands hidden. Click *Show All History* to view.
        </div>
      )}
    </>
  )
}
