"use client"

import { useContext } from "react"
import { Loader2 } from 'lucide-react'
import TerminalPrompt from "./terminal-prompt"
import { TerminalContext } from "@/contexts/terminal-context"

interface TerminalInputProps {
  isProcessing: boolean
}

export default function TerminalInput({ isProcessing }: TerminalInputProps) {
  const { handleCommand, theme } = useContext(TerminalContext)

  return (
    <>
      {isProcessing ? (
        <div className={`flex items-center ${theme.textYellowClass}`}>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Processing command...
        </div>
      ) : (
        <TerminalPrompt onSubmit={handleCommand} />
      )}
    </>
  )
}
