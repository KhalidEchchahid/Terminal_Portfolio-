"use client"

import { useState } from "react"

export function useTerminalState() {
  const [activeSection, setActiveSection] = useState("home")

  return {
    activeSection,
    setActiveSection,
  }
}

