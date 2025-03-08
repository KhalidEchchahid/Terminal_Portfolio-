"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal, Command, ArrowRight, Key } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TerminalGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasSeenGuide, setHasSeenGuide] = useState(false)

  // Check if user has seen the guide before
  useEffect(() => {
    const guideSeen = localStorage.getItem("terminal-guide-seen")
    setHasSeenGuide(!!guideSeen)

    // If they haven't seen it, show it automatically
    if (!guideSeen) {
      setIsOpen(true)
    }
  }, [])

  // Mark guide as seen when closed
  const closeGuide = () => {
    setIsOpen(false)
    localStorage.setItem("terminal-guide-seen", "true")
    setHasSeenGuide(true)
  }

  // Common commands to showcase
  const commonCommands = [
    { command: "help", description: "Show available commands" },
    { command: "about", description: "Learn about me" },
    { command: "skills", description: "View my technical skills" },
    { command: "projects", description: "Browse my projects" },
    { command: "contact", description: "Get my contact information" },
    { command: "clear", description: "Clear the terminal screen" },
    { command: "cat about.txt", description: "Read about me" },
    { command: "ls", description: "List files in current directory" },
  ]

  // Fun commands to discover
  const funCommands = [
    { command: "coffee", description: "Take a coffee break" },
    { command: "joke", description: "Get a programming joke" },
    { command: "3d_portfolio", description: "Launch 3D portfolio experience" },
  ]

  return (
    <>
      {/* Guide toggle button (only shown after first visit) */}
      {hasSeenGuide && !isOpen && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 bg-terminal-header-dark/80 backdrop-blur-sm"
        >
          <Terminal className="h-4 w-4 mr-2" />
          Terminal Guide
        </Button>
      )}

      {/* Guide modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-terminal-header-dark/90 backdrop-blur-md rounded-lg border border-terminal-border max-w-2xl w-full max-h-[80vh] overflow-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-terminal-green flex items-center">
                    <Terminal className="h-5 w-5 mr-2" />
                    Terminal Guide
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeGuide}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-terminal-text mb-4">
                      Welcome to my interactive portfolio! This portfolio features a fully functional terminal interface
                      that you can use to explore my work and skills.
                    </p>
                    <p className="text-terminal-text-dim mb-2">
                      If you are not familiar with terminal commands, you can use the navigation bar at the top to browse
                      through different sections.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-terminal-yellow font-bold mb-2 flex items-center">
                      <Command className="h-4 w-4 mr-2" />
                      Common Commands
                    </h3>
                    <div className="bg-terminal-bg rounded-md p-3 space-y-2">
                      {commonCommands.map((cmd) => (
                        <div key={cmd.command} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <ArrowRight className="h-3 w-3 text-terminal-green" />
                          </div>
                          <div className="ml-2">
                            <code className="text-terminal-yellow font-mono">{cmd.command}</code>
                            <span className="text-terminal-text-dim ml-2">- {cmd.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-terminal-yellow font-bold mb-2 flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Terminal Tips
                    </h3>
                    <ul className="bg-terminal-bg rounded-md p-3 space-y-2 text-terminal-text-dim">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <ArrowRight className="h-3 w-3 text-terminal-green" />
                        </div>
                        <div className="ml-2">
                          Press <kbd className="px-1 bg-terminal-header-light rounded">Tab</kbd> to autocomplete
                          commands
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <ArrowRight className="h-3 w-3 text-terminal-green" />
                        </div>
                        <div className="ml-2">
                          Use <kbd className="px-1 bg-terminal-header-light rounded">↑</kbd> and{" "}
                          <kbd className="px-1 bg-terminal-header-light rounded">↓</kbd> to navigate command history
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <ArrowRight className="h-3 w-3 text-terminal-green" />
                        </div>
                        <div className="ml-2">
                          Type <code className="text-terminal-yellow">help</code> to see all available commands
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-terminal-purple font-bold mb-2">Fun Commands to Discover</h3>
                    <div className="bg-terminal-bg rounded-md p-3 space-y-2">
                      {funCommands.map((cmd) => (
                        <div key={cmd.command} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <ArrowRight className="h-3 w-3 text-terminal-purple" />
                          </div>
                          <div className="ml-2">
                            <code className="text-terminal-yellow font-mono">{cmd.command}</code>
                            <span className="text-terminal-text-dim ml-2">- {cmd.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={closeGuide} className="bg-terminal-green text-black hover:bg-terminal-green/90">
                    Got it!
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

