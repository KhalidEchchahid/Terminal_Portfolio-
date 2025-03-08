"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "lucide-react"

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Use a ref to track if we've already extracted headings
  const [hasExtractedHeadings, setHasExtractedHeadings] = useState(false)

  useEffect(() => {
    // Function to extract headings
    const extractHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll("article h1, article h2, article h3"))

      if (headingElements.length === 0) {
        // If no headings found, try again after a short delay
        setTimeout(extractHeadings, 100)
        return
      }

      const extractedHeadings: Heading[] = headingElements.map((element) => {
        if (!element.id) {
          const text = element.textContent || ""
          const id = text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
          element.id = id
        }

        return {
          id: element.id,
          text: element.textContent || "",
          level: Number(element.tagName.substring(1)),
        }
      })

      if (extractedHeadings.length > 0) {
        setHeadings(extractedHeadings)
        setHasExtractedHeadings(true)
      }
    }

    // Initial extraction
    if (!hasExtractedHeadings) {
      // Wait for content to be fully rendered
      setTimeout(extractHeadings, 500)
    }

    // Set up scroll handler only after headings are extracted
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll("article h1, article h2, article h3"))
      const visibleHeadings = headingElements.filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.4
      })

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].id)
      }
    }

    if (hasExtractedHeadings) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll()
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasExtractedHeadings])

  if (headings.length === 0) {
    return (
      <div className="border border-terminal-border rounded-lg p-4 bg-terminal-header-dark">
        <div className="text-terminal-green font-bold mb-4 flex items-center">
          <Link className="h-4 w-4 mr-2" />
          Table of Contents
        </div>
        <div className="text-terminal-text-dim text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="border border-terminal-border rounded-lg p-4 bg-terminal-header-dark">
      <div className="text-terminal-green font-bold mb-4 flex items-center">
        <Link className="h-4 w-4 mr-2" />
        Table of Contents
      </div>
      <nav className="text-sm">
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "transition-colors duration-200",
                heading.level === 2 ? "ml-2" : "",
                heading.level === 3 ? "ml-4" : "",
              )}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 hover:text-terminal-green transition-colors line-clamp-2",
                  activeId === heading.id ? "text-terminal-green font-medium" : "text-terminal-text-dim",
                  heading.level === 1 ? "font-semibold" : "",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

