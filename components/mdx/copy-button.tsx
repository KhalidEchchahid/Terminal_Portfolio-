"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 text-terminal-text-dim hover:text-terminal-green hover:bg-terminal-header"
      onClick={copyToClipboard}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">Copy code</span>
    </Button>
  )
}

