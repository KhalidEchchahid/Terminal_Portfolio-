"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Circle, X, Minus, Maximize2, Home, ArrowLeft } from "lucide-react"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  const pathname = usePathname()
  const currentPage = pathname.split("/")[1]

  const tabs = [
    { id: "home", label: "home.sh", path: "/" },
    { id: "about", label: "about.md", path: "/about" },
    { id: "skills", label: "skills.json", path: "/skills" },
    { id: "projects", label: "projects.js", path: "/projects" },
    { id: "contact", label: "contact.html", path: "/contact" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Terminal header */}
      <div className="rounded-t-lg overflow-hidden bg-terminal-header border border-terminal-border border-b-0">
        {/* Window controls */}
        <div className="flex items-center px-4 py-2 bg-terminal-header-dark">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red flex items-center justify-center group">
              <X className="w-2 h-2 text-terminal-bg opacity-0 group-hover:opacity-100" />
            </div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow flex items-center justify-center group">
              <Minus className="w-2 h-2 text-terminal-bg opacity-0 group-hover:opacity-100" />
            </div>
            <div className="w-3 h-3 rounded-full bg-terminal-green flex items-center justify-center group">
              <Maximize2 className="w-2 h-2 text-terminal-bg opacity-0 group-hover:opacity-100" />
            </div>
          </div>
          <div className="flex-grow text-center text-terminal-text-dim text-xs">
            khalid@portfolio ~ {currentPage || "bash"}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-terminal-header text-terminal-text-dim scrollbar-hide">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.path}
              className={`group flex items-center px-4 py-2 text-xs cursor-pointer whitespace-nowrap border-r border-terminal-border ${
                (tab.id === "home" && pathname === "/") || (pathname.includes(tab.id) && tab.id !== "home")
                  ? "bg-terminal-bg text-terminal-text"
                  : "hover:bg-terminal-header-light"
              }`}
            >
              <Circle
                className={`w-2 h-2 mr-2 ${
                  (tab.id === "home" && pathname === "/") || (pathname.includes(tab.id) && tab.id !== "home")
                    ? "text-terminal-green"
                    : "text-terminal-text-dim"
                }`}
                fill={
                  (tab.id === "home" && pathname === "/") || (pathname.includes(tab.id) && tab.id !== "home")
                    ? "currentColor"
                    : "none"
                }
              />
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-terminal-bg rounded-b-lg font-mono text-sm md:text-base p-4 border border-terminal-border border-t-0 shadow-inner">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-terminal-text-dim hover:text-terminal-text mr-4">
            <Home className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-terminal-green">{title}</h1>
        </div>

        {children}

        <div className="mt-8 pt-4 border-t border-terminal-border">
          <Link href="/" className="flex items-center text-terminal-text-dim hover:text-terminal-text">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to terminal
          </Link>
        </div>
      </div>
    </div>
  )
}

