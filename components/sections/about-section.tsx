"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CodeBlock } from "../syntax-highlight"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("personal")

  const tabContent = {
    personal: `
/**
 * Personal Background
 * ------------------
 * I'm a software engineering student with a passion for building
 * efficient and reliable web applications. I enjoy tackling complex
 * problems and finding elegant solutions.
 * 
 * Outside of coding, I'm interested in:
 * - Computer Science
 * - Sports
 * - Poetry
 * - Novels
 */
`,
    education: `
/**
 * Education
 * ---------
 * Current:
 * - Program: Software Engineering and Integration of Computer Systems
 * - Institution: Faculty of Sciences and Techniques, Mohammedia
 * - Expected Graduation: 2026
 * 
 * Previous:
 * - Degree: Bachelor in Mathematics and Computer Science
 * - Institution: Faculty of Sciences, Fez
 * - Period: September 2020 - June 2023
 * - Grade: A
 */
`,
    experience: `
/**
 * Professional Experience
 * ----------------------
 * Freelance Full-Stack Developer
 * Self-Employed, Remote
 * January 2024 - Present
 * 
 * Responsibilities:
 * - Working closely with clients to build custom e-commerce platforms and admin dashboards
 * - Using Next.js 14 and Tailwind CSS to create fast, responsive user experiences
 * - Implementing MongoDB for efficient data management
 * - Developing systems for tracking products, orders, and customers
 */
`,
  }

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-terminal-purple">About Me</h2>

      <div className="flex border-b border-terminal-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 mr-2 font-mono text-sm focus:outline-none ${
              activeTab === tab.id
                ? "text-terminal-yellow border-b-2 border-terminal-yellow"
                : "text-terminal-text-dim hover:text-terminal-text"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CodeBlock language="javascript" showLineNumbers={false}>
          {tabContent[activeTab as keyof typeof tabContent]}
        </CodeBlock>
      </motion.div>

      <div className="mt-4 border border-terminal-border rounded p-4 bg-terminal-code/30">
        <p className="text-terminal-text">
          I am currently pursuing a degree in Software Engineering and looking for opportunities to apply my skills in
          real-world projects. My background in both Mathematics and Computer Science gives me a strong foundation for
          solving complex problems.
        </p>
        <p className="mt-2 text-terminal-text-dim">
          Type <span className="text-terminal-yellow">skills</span> to learn about my technical abilities.
        </p>
      </div>
    </div>
  )
}

