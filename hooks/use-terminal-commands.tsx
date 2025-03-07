"use client"

import { useState, useCallback } from "react"
import type { TerminalOutput } from "@/contexts/terminal-context"

interface UseTerminalCommandsProps {
  activeSection: string
  setActiveSection: (section: string) => void
  addToOutputHistory: (output: TerminalOutput) => void
}

export function useTerminalCommands({ activeSection, setActiveSection, addToOutputHistory }: UseTerminalCommandsProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  // Define all available commands
  const COMMANDS = {
    BASIC: ["home", "about", "skills", "projects", "contact", "help", "clear", "social", "exit", "files"],
    EASTER_EGGS: ["launch_portfolio", "coffee", "joke", "github", "linkedin", "resume", "3d_portfolio"],
    SYSTEM: ["ls", "cat", "pwd", "cd", "echo", "man", "whoami", "date", "history", "edit", "nano", "vim"],
    FILE_SYSTEM: {
      directories: ["projects", "skills"],
      files: [
        "about.txt",
        "contact.txt",
        "projects/university-collaboration.md",
        "projects/intra-enterprise.md",
        "skills/frontend.json",
        "skills/backend.json",
      ],
    },
  }

  // Combine all commands for help display
  const ALL_COMMANDS = [...COMMANDS.BASIC, ...COMMANDS.EASTER_EGGS, ...COMMANDS.SYSTEM]

  // Current working directory for file system navigation
  const [currentDirectory, setCurrentDirectory] = useState("/")

  const processCommand = useCallback(
    async (command: string) => {
      const cmd = command.trim().toLowerCase()
      setIsProcessing(true)

      // Simulate processing delay for effect
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 50))

      // Add command to history
      setCommandHistory((prevHistory) => [...prevHistory, cmd])

      // Process commands
      if (cmd === "clear") {
        // Clear command is handled by the parent component
        setIsProcessing(false)
        return
      }

      // Navigation commands
      if (["home", "about", "skills", "projects", "contact", "files"].includes(cmd)) {
        setActiveSection(cmd)
        addToOutputHistory({
          type: "success",
          content: (
            <div>
              <span className="text-terminal-green">➜</span> Opening {cmd} section...
              <div className="mt-1 text-xs text-terminal-text-dim">
                <span className="text-terminal-yellow">TIP:</span> Press{" "}
                <kbd className="px-1 py-0.5 bg-terminal-header-light rounded">ESC</kbd> to return to terminal
              </div>
            </div>
          ),
          id: `nav-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Edit/nano/vim commands to open sections in editor
      if (cmd.startsWith("edit ") || cmd.startsWith("nano ") || cmd.startsWith("vim ")) {
        const fileName = cmd.split(" ")[1]

        if (fileName) {
          // Map file names to sections
          const fileToSection: Record<string, string> = {
            "home.sh": "home",
            "about.md": "about",
            "skills.json": "skills",
            "projects.js": "projects",
            "contact.html": "contact",
            "files.txt": "files",
          }

          // Use type assertion to bypass TypeScript error
          if (fileToSection[fileName as keyof typeof fileToSection]) {
            setActiveSection(fileToSection[fileName as keyof typeof fileToSection])
            addToOutputHistory({
              type: "success",
              content: (
                <div>
                  <span className="text-terminal-green">➜</span> Opening {fileName} in editor...
                </div>
              ),
              id: `edit-${Date.now()}`,
            })

            // Trigger an event to open the editor
            const event = new CustomEvent("openEditor", {
              detail: { section: fileToSection[fileName as keyof typeof fileToSection], fileName },
            })
            window.dispatchEvent(event)
          } else {
            addToOutputHistory({
              type: "error",
              content: (
                <div>
                  <span className="text-terminal-red">Error:</span> File not found: {fileName}
                </div>
              ),
              id: `edit-error-${Date.now()}`,
            })
          }
        } else {
          addToOutputHistory({
            type: "error",
            content: (
              <div>
                <span className="text-terminal-red">Error:</span> Please specify a file to edit
              </div>
            ),
            id: `edit-error-${Date.now()}`,
          })
        }

        setIsProcessing(false)
        return
      }

      // Help command
      if (cmd === "help") {
        addToOutputHistory({
          type: "info",
          content: (
            <div>
              <div className="text-terminal-yellow font-bold mb-2">Available commands:</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-terminal-text-dim">
                {COMMANDS.BASIC.map((c) => (
                  <div key={c} className="flex items-center">
                    <span className="text-terminal-green mr-2">→</span>
                    <span className="text-terminal-text">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 mb-2 text-terminal-yellow font-bold">System commands:</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-terminal-text-dim">
                {COMMANDS.SYSTEM.map((c) => (
                  <div key={c} className="flex items-center">
                    <span className="text-terminal-blue mr-2">→</span>
                    <span className="text-terminal-text">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-terminal-text-dim">
                <span className="text-terminal-yellow">TIP:</span> Use <span className="text-terminal-green">edit</span>
                , <span className="text-terminal-green">nano</span> or <span className="text-terminal-green">vim</span>{" "}
                followed by a filename to open it in the editor.
              </div>
            </div>
          ),
          id: `help-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Social command
      if (cmd === "social") {
        addToOutputHistory({
          type: "info",
          content: (
            <div>
              <div className="text-terminal-yellow font-bold mb-2">Social links:</div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="text-terminal-green mr-2">→</span>
                  <span className="text-terminal-text-dim mr-2">GitHub:</span>
                  <a
                    href="https://github.com/khalid-echchahid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-blue hover:underline"
                  >
                    github.com/khalid-echchahid
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-green mr-2">→</span>
                  <span className="text-terminal-text-dim mr-2">LinkedIn:</span>
                  <a
                    href="https://linkedin.com/in/khalid-echchahid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-blue hover:underline"
                  >
                    linkedin.com/in/khalid-echchahid
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-green mr-2">→</span>
                  <span className="text-terminal-text-dim mr-2">Email:</span>
                  <a href="mailto:echchahidkhalid7@gmail.com" className="text-terminal-blue hover:underline">
                    echchahidkhalid7@gmail.com
                  </a>
                </div>
              </div>
            </div>
          ),
          id: `social-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Exit command (just for fun)
      if (cmd === "exit") {
        addToOutputHistory({
          type: "error",
          content: (
            <div>
              <span className="text-terminal-red">Error:</span> Nice try! This terminal cannot be closed. Try{" "}
              <span className="text-terminal-yellow">clear</span> instead.
              <div className="mt-1 text-xs text-terminal-text-dim">
                <span className="text-terminal-yellow">TIP:</span> Try typing{" "}
                <span className="text-terminal-green">launch_portfolio</span> for a special experience
              </div>
            </div>
          ),
          id: `exit-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Launch portfolio command
      if (cmd === "launch_portfolio") {
        addToOutputHistory({
          type: "special",
          content: (
            <div>
              <div className="text-terminal-green font-bold mb-2">Launching portfolio experience...</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Initializing portfolio components</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Loading project data</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Preparing interactive experience</span>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-terminal-green text-lg font-bold">Welcome to my interactive portfolio!</span>
                </div>
                <div className="text-center text-terminal-text-dim">
                  Navigate through sections using commands or tabs above.
                </div>
              </div>
            </div>
          ),
          id: `launch-${Date.now()}`,
        })

        // Cycle through sections automatically
        const sections = ["home", "about", "skills", "projects", "contact"]
        let index = 0

        const cycleInterval = setInterval(() => {
          setActiveSection(sections[index])
          index = (index + 1) % sections.length

          // Stop after cycling through all sections
          if (index === 0) {
            clearInterval(cycleInterval)
          }
        }, 2000)

        setIsProcessing(false)
        return
      }

      // Coffee command
      if (cmd === "coffee") {
        addToOutputHistory({
          type: "special",
          content: (
            <div>
              <pre className="text-terminal-yellow">
                {`
    ( (
     ) )
  .______.
  |      |]
  \\      /
   '----'
`}
              </pre>
              <div className="mt-2 text-terminal-green">Coffee loaded successfully! Fuel for coding sessions.</div>
            </div>
          ),
          id: `coffee-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Joke command
      if (cmd === "joke") {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
          "Why do Java developers wear glasses? Because they don't C#!",
          "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
          "What's a programmer's favorite hangout place? The Foo Bar!",
        ]

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]

        addToOutputHistory({
          type: "special",
          content: (
            <div>
              <div className="text-terminal-yellow font-bold mb-2">Developer Joke:</div>
              <div className="text-terminal-green">{randomJoke}</div>
              <div className="mt-2 text-xs text-terminal-text-dim">
                Type <span className="text-terminal-yellow">joke</span> again for another joke
              </div>
            </div>
          ),
          id: `joke-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // 3D Portfolio command
      if (cmd === "3d_portfolio") {
        addToOutputHistory({
          type: "special",
          content: (
            <div>
              <div className="text-terminal-green font-bold mb-2">Launching 3D Portfolio Experience...</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Initializing 3D engine</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Loading 3D assets</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Preparing immersive experience</span>
                </div>
              </div>
            </div>
          ),
          id: `3d-portfolio-${Date.now()}`,
        })

        // Show the 3D portfolio view
        window.location.href = "/3d-portfolio"

        setIsProcessing(false)
        return
      }

      // File system commands
      // ls command
      if (cmd === "ls" || cmd.startsWith("ls ")) {
        const path = cmd.split(" ")[1] || currentDirectory

        // Simulate file listing
        const files = COMMANDS.FILE_SYSTEM.files.filter(
          (file) => file.startsWith(path === "/" ? "" : path) && !file.slice(path.length).includes("/"),
        )

        const directories = COMMANDS.FILE_SYSTEM.directories.filter(
          (dir) => dir.startsWith(path === "/" ? "" : path) && !dir.slice(path.length).includes("/"),
        )

        // Add portfolio section files
        const sectionFiles = ["home.sh", "about.md", "skills.json", "projects.js", "contact.html", "files.txt"]

        addToOutputHistory({
          type: "system",
          content: (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                {directories.map((dir) => (
                  <span key={dir} className="text-terminal-blue">
                    {dir}/
                  </span>
                ))}
                {path === "/" &&
                  sectionFiles.map((file) => {
                    if (file.endsWith(".md")) {
                      return (
                        <span key={file} className="text-terminal-green">
                          {file}
                        </span>
                      )
                    } else if (file.endsWith(".json")) {
                      return (
                        <span key={file} className="text-terminal-yellow">
                          {file}
                        </span>
                      )
                    } else if (file.endsWith(".js")) {
                      return (
                        <span key={file} className="text-terminal-purple">
                          {file}
                        </span>
                      )
                    } else if (file.endsWith(".html")) {
                      return (
                        <span key={file} className="text-terminal-red">
                          {file}
                        </span>
                      )
                    } else {
                      return (
                        <span key={file} className="text-terminal-text">
                          {file}
                        </span>
                      )
                    }
                  })}
                {files.map((file) => {
                  const fileName = file.split("/").pop() || file

                  if (fileName.endsWith(".md")) {
                    return (
                      <span key={file} className="text-terminal-green">
                        {fileName}
                      </span>
                    )
                  } else if (fileName.endsWith(".json")) {
                    return (
                      <span key={file} className="text-terminal-yellow">
                        {fileName}
                      </span>
                    )
                  } else {
                    return (
                      <span key={file} className="text-terminal-text">
                        {fileName}
                      </span>
                    )
                  }
                })}
              </div>
            </div>
          ),
          id: `ls-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // cat command
      if (cmd.startsWith("cat ")) {
        const fileName = cmd.substring(4).trim()

        // Check if it's a section file
        const sectionFiles = {
          "home.sh": "home",
          "about.md": "about",
          "skills.json": "skills",
          "projects.js": "projects",
          "contact.html": "contact",
          "files.txt": "files",
        }

        if (sectionFiles[fileName as keyof typeof sectionFiles]) {
          addToOutputHistory({
            type: "system",
            content: (
              <div>
                <div className="text-terminal-yellow mb-2">
                  File is too large to display in terminal. Use <span className="text-terminal-green">edit</span>,{" "}
                  <span className="text-terminal-green">nano</span> or <span className="text-terminal-green">vim</span>{" "}
                  to open it in the editor.
                </div>
              </div>
            ),
            id: `cat-${Date.now()}`,
          })
          setIsProcessing(false)
          return
        }

        const filePath = fileName.startsWith("/")
          ? fileName.substring(1)
          : currentDirectory === "/"
            ? fileName
            : `${currentDirectory.substring(1)}/${fileName}`

        // Check if file exists
        if (COMMANDS.FILE_SYSTEM.files.includes(filePath)) {
          // Simulate file content
          let content = ""

          if (filePath === "about.txt") {
            content = `Name: Khalid Echchahid
Role: Software Engineering Student & Full-Stack Developer
Location: Fez, Morocco
Email: echchahidkhalid7@gmail.com

I'm a passionate software engineer with a focus on building efficient and user-friendly web applications. Currently pursuing a degree in Software Engineering and Integration of Computer Systems at the Faculty of Sciences and Techniques, Mohammedia.`
          } else if (filePath === "contact.txt") {
            content = `Email: echchahidkhalid7@gmail.com
Professional Email: khalid.echchahid@usmba.ac.ma
Phone: +212-645557609
Location: Fez, Morocco
GitHub: github.com/khalid-echchahid
LinkedIn: linkedin.com/in/khalid-echchahid`
          } else if (filePath.includes("university-collaboration.md")) {
            content = `# University Collaboration Platform

A comprehensive platform that facilitates collaboration between students and professors.

## Features
- File sharing
- Online requests for recommendation letters
- Announcement boards
- Blogs

## Technologies
- React
- Spring Boot
- Spring Security
- Spring Cloud
- Microservices
- PostgreSQL
- RabbitMQ`
          } else if (filePath.includes("intra-enterprise.md")) {
            content = `# Intra-Enterprise Collaboration System

A web application for collaboration within companies, similar to Stack Overflow.

## Features
- Announcement system
- Event organization
- Internal blogs

## Technologies
- Next.js 14
- NextAuth
- MongoDB`
          } else if (filePath.includes("frontend.json")) {
            content = `{
 "category": "Frontend",
 "skills": [
   { "name": "React.js", "level": "Advanced" },
   { "name": "Next.js", "level": "Advanced" },
   { "name": "Tailwind CSS", "level": "Advanced" },
   { "name": "HTML/CSS", "level": "Advanced" },
   { "name": "JavaScript", "level": "Advanced" }
 ]
}`
          } else if (filePath.includes("backend.json")) {
            content = `{
 "category": "Backend",
 "skills": [
   { "name": "Spring Boot", "level": "Advanced" },
   { "name": "Node.js", "level": "Intermediate" },
   { "name": "Express.js", "level": "Intermediate" },
   { "name": "PHP", "level": "Intermediate" }
 ]
}`
          }

          addToOutputHistory({
            type: "system",
            content: (
              <div>
                <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96">{content}</pre>
              </div>
            ),
            id: `cat-${Date.now()}`,
          })
        } else {
          addToOutputHistory({
            type: "error",
            content: (
              <div>
                <span className="text-terminal-red">Error:</span> File not found: {fileName}
              </div>
            ),
            id: `cat-error-${Date.now()}`,
          })
        }
        setIsProcessing(false)
        return
      }

      // pwd command
      if (cmd === "pwd") {
        addToOutputHistory({
          type: "system",
          content: (
            <div>
              <span className="text-terminal-text">{currentDirectory}</span>
            </div>
          ),
          id: `pwd-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // cd command
      if (cmd.startsWith("cd ") || cmd === "cd") {
        const path = cmd.split(" ")[1] || "/"

        if (path === "/") {
          setCurrentDirectory("/")
          addToOutputHistory({
            type: "system",
            content: <div></div>,
            id: `cd-${Date.now()}`,
          })
        } else if (path === "..") {
          // Go up one directory
          const newPath =
            currentDirectory === "/" ? "/" : currentDirectory.substring(0, currentDirectory.lastIndexOf("/")) || "/"
          setCurrentDirectory(newPath)
          addToOutputHistory({
            type: "system",
            content: <div></div>,
            id: `cd-${Date.now()}`,
          })
        } else if (COMMANDS.FILE_SYSTEM.directories.includes(path)) {
          // Change to specified directory
          setCurrentDirectory(path.endsWith("/") ? path : `${path}/`)
          addToOutputHistory({
            type: "system",
            content: <div></div>,
            id: `cd-${Date.now()}`,
          })
        } else {
          addToOutputHistory({
            type: "error",
            content: (
              <div>
                <span className="text-terminal-red">Error:</span> Directory not found: {path}
              </div>
            ),
            id: `cd-error-${Date.now()}`,
          })
        }
        setIsProcessing(false)
        return
      }

      // whoami command
      if (cmd === "whoami") {
        addToOutputHistory({
          type: "system",
          content: (
            <div>
              <span className="text-terminal-green">visitor@khalid-portfolio</span>
              <div className="mt-1 text-xs text-terminal-text-dim">
                You are viewing the portfolio of Khalid Echchahid, Software Engineering Student & Full-Stack Developer
              </div>
            </div>
          ),
          id: `whoami-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // date command
      if (cmd === "date") {
        addToOutputHistory({
          type: "system",
          content: (
            <div>
              <span className="text-terminal-text">{new Date().toString()}</span>
            </div>
          ),
          id: `date-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // history command
      if (cmd === "history") {
        addToOutputHistory({
          type: "system",
          content: (
            <div className="space-y-1">
              {commandHistory.map((cmd, index) => (
                <div key={index} className="flex">
                  <span className="text-terminal-text-dim w-8 text-right mr-2">{index + 1}</span>
                  <span className="text-terminal-text">{cmd}</span>
                </div>
              ))}
            </div>
          ),
          id: `history-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Check if command starts with echo
      if (cmd.startsWith("echo ")) {
        const message = command.substring(5)
        addToOutputHistory({
          type: "system",
          content: <div className="text-terminal-text">{message}</div>,
          id: `echo-${Date.now()}`,
        })
        setIsProcessing(false)
        return
      }

      // Man command (manual)
      if (cmd.startsWith("man ")) {
        const commandName = cmd.substring(4).trim()

        if (ALL_COMMANDS.includes(commandName)) {
          const descriptions: Record<string, string> = {
            home: "Navigate to the home section of the portfolio",
            about: "Display information about Khalid Echchahid",
            skills: "Show technical skills and proficiency levels",
            projects: "List projects and their details",
            contact: "Display contact information",
            files: "Open the file explorer",
            help: "Show available commands",
            clear: "Clear the terminal screen",
            social: "Display social media links",
            exit: "Attempt to exit the terminal (spoiler: you can't)",
            launch_portfolio: "Start an interactive portfolio experience",
            coffee: "Get a virtual coffee to fuel your coding",
            joke: "Display a random programming joke",
            ls: "List files in the current directory",
            cat: "Display the contents of a file",
            pwd: "Print working directory",
            cd: "Change directory",
            echo: "Display a message on the screen",
            man: "Display the manual for a command",
            whoami: "Display current user information",
            date: "Show the current date and time",
            history: "Show command history",
            edit: "Open a file in the editor",
            nano: "Open a file in the editor (alias for edit)",
            vim: "Open a file in the editor (alias for edit)",
          }

          addToOutputHistory({
            type: "system",
            content: (
              <div>
                <div className="text-terminal-yellow font-bold mb-2">MANUAL: {commandName}</div>
                <div className="text-terminal-text-dim mb-1">NAME</div>
                <div className="text-terminal-text ml-4 mb-2">
                  {commandName} - {descriptions[commandName] || "No description available"}
                </div>
                <div className="text-terminal-text-dim mb-1">SYNOPSIS</div>
                <div className="text-terminal-text ml-4 mb-2">{commandName}</div>
                <div className="text-terminal-text-dim mb-1">DESCRIPTION</div>
                <div className="text-terminal-text ml-4">{descriptions[commandName] || "No description available"}</div>
              </div>
            ),
            id: `man-${Date.now()}`,
          })
        } else {
          addToOutputHistory({
            type: "error",
            content: <div>No manual entry for {commandName}</div>,
            id: `man-error-${Date.now()}`,
          })
        }

        setIsProcessing(false)
        return
      }

      // Unknown command
      addToOutputHistory({
        type: "error",
        content: (
          <div>
            <span className="text-terminal-red">Command not found: {command}</span>
            <div className="mt-1 text-xs text-terminal-text-dim">
              Type <span className="text-terminal-yellow">help</span> for available commands
            </div>
          </div>
        ),
        id: `error-${Date.now()}`,
      })
      setIsProcessing(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSection, setActiveSection, addToOutputHistory, commandHistory, currentDirectory, setCommandHistory],
  )

  return {
    processCommand,
    isProcessing,
  }
}

