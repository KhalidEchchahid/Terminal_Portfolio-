"use client"

import { useState, useContext } from "react"
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react"
import { TerminalContext } from "@/contexts/terminal-context"

// Define file system structure
interface FileSystemItem {
  name: string
  type: "file" | "directory"
  content?: string
  children?: FileSystemItem[]
}

export default function FileExplorer() {
  const { theme } = useContext(TerminalContext)
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["/"]))

  // Sample file system
  const fileSystem: FileSystemItem[] = [
    {
      name: "projects",
      type: "directory",
      children: [
        {
          name: "university-collaboration.md",
          type: "file",
          content: `# University Collaboration Platform

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
- RabbitMQ`,
        },
        {
          name: "intra-enterprise.md",
          type: "file",
          content: `# Intra-Enterprise Collaboration System

A web application for collaboration within companies, similar to Stack Overflow.

## Features
- Announcement system
- Event organization
- Internal blogs

## Technologies
- Next.js 14
- NextAuth
- MongoDB`,
        },
      ],
    },
    {
      name: "skills",
      type: "directory",
      children: [
        {
          name: "frontend.json",
          type: "file",
          content: `{
  "category": "Frontend",
  "skills": [
    { "name": "React.js", "level": "Advanced" },
    { "name": "Next.js", "level": "Advanced" },
    { "name": "Tailwind CSS", "level": "Advanced" },
    { "name": "HTML/CSS", "level": "Advanced" },
    { "name": "JavaScript", "level": "Advanced" }
  ]
}`,
        },
        {
          name: "backend.json",
          type: "file",
          content: `{
  "category": "Backend",
  "skills": [
    { "name": "Spring Boot", "level": "Advanced" },
    { "name": "Node.js", "level": "Intermediate" },
    { "name": "Express.js", "level": "Intermediate" },
    { "name": "PHP", "level": "Intermediate" }
  ]
}`,
        },
      ],
    },
    {
      name: "about.txt",
      type: "file",
      content: `Name: Khalid Echchahid
Role: Software Engineering Student & Full-Stack Developer
Location: Fez, Morocco
Email: echchahidkhalid7@gmail.com

I'm a passionate software engineer with a focus on building efficient and user-friendly web applications. Currently pursuing a degree in Software Engineering and Integration of Computer Systems at the Faculty of Sciences and Techniques, Mohammedia.`,
    },
    {
      name: "contact.txt",
      type: "file",
      content: `Email: echchahidkhalid7@gmail.com
Professional Email: khalid.echchahid@usmba.ac.ma
Phone: +212-645557609
Location: Fez, Morocco
GitHub: github.com/khalid-echchahid
LinkedIn: linkedin.com/in/khalid-echchahid`,
    },
  ]

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  // Add click handler to open files in editor
  const handleFileClick = (file: FileSystemItem) => {
    setSelectedFile(file)

    // If it's a section file, also open it in the editor
    const sectionFiles = {
      "home.sh": "home",
      "about.md": "about",
      "skills.json": "skills",
      "projects.js": "projects",
      "contact.html": "contact",
      "files.txt": "files",
    }

    // Check if the file name matches any section file
    if (sectionFiles[file.name as keyof typeof sectionFiles]) {
      // Trigger an event to open the editor
      const event = new CustomEvent("openEditor", {
        detail: { section: sectionFiles[file.name as keyof typeof sectionFiles], fileName: file.name },
      })
      window.dispatchEvent(event)
    }
  }

  // Update the renderFileSystem function to use the handleFileClick
  const renderFileSystem = (items: FileSystemItem[], path = "/") => {
    return (
      <ul className="pl-4">
        {items.map((item) => {
          const itemPath = `${path}${item.name}`

          if (item.type === "directory") {
            const isExpanded = expandedFolders.has(itemPath)

            return (
              <li key={itemPath} className="my-1">
                <div
                  className={`flex items-center cursor-pointer hover:${theme.textGreenClass}`}
                  onClick={() => toggleFolder(itemPath)}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                  <Folder className={`h-4 w-4 mr-2 ${theme.textYellowClass}`} />
                  <span>{item.name}</span>
                </div>

                {isExpanded && item.children && renderFileSystem(item.children, `${itemPath}/`)}
              </li>
            )
          } else {
            return (
              <li key={itemPath} className="my-1">
                <div
                  className={`flex items-center cursor-pointer pl-5 hover:${theme.textGreenClass} ${
                    selectedFile && selectedFile.name === item.name ? theme.textGreenClass : ""
                  }`}
                  onClick={() => handleFileClick(item)}
                >
                  <File className={`h-4 w-4 mr-2 ${theme.textBlueClass}`} />
                  <span>{item.name}</span>
                </div>
              </li>
            )
          }
        })}
      </ul>
    )
  }

  return (
    <div>
      <h2 className={`text-lg font-bold mb-4 ${theme.textPurpleClass}`}>File Explorer</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className={`w-full md:w-1/3 p-4 border ${theme.borderClass} rounded-md ${theme.bgHeaderDarkClass}`}>
          {renderFileSystem(fileSystem)}
        </div>

        <div className={`w-full md:w-2/3 p-4 border ${theme.borderClass} rounded-md ${theme.bgHeaderDarkClass}`}>
          {selectedFile ? (
            <>
              <h3 className={`text-lg font-semibold mb-3 ${theme.textYellowClass}`}>{selectedFile.name}</h3>
              <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96">{selectedFile.content}</pre>
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-terminal-text-dim">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-terminal-text-dim">
        <p>
          Type <span className={theme.textYellowClass}>ls</span> to list files or{" "}
          <span className={theme.textYellowClass}>cat [filename]</span> to view file contents in the terminal.
        </p>
      </div>
    </div>
  )
}

