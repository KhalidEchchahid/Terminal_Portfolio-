"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CodeBlock } from "../syntax-highlight"
import PageLayout from "./page-layout"

export default function AboutContent() {
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
    <PageLayout title="About Me">
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-terminal-border rounded p-4 bg-terminal-code/30">
          <h3 className="text-terminal-yellow mb-3 font-bold">Personal Info</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-terminal-text-dim">Name:</span> Khalid Echchahid
            </li>
            <li>
              <span className="text-terminal-text-dim">Age:</span> 22 years old
            </li>
            <li>
              <span className="text-terminal-text-dim">Location:</span> Fez, Morocco
            </li>
            <li>
              <span className="text-terminal-text-dim">Languages:</span> English, Arabic, French
            </li>
          </ul>
        </div>

        <div className="border border-terminal-border rounded p-4 bg-terminal-code/30">
          <h3 className="text-terminal-yellow mb-3 font-bold">Education</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Software Engineering and Integration of Computer Systems</p>
              <p className="text-terminal-text-dim">Faculty of Sciences and Techniques, Mohammedia</p>
              <p className="text-sm text-terminal-green">Ongoing - Graduation Year: 2026</p>
            </div>
            <div>
              <p className="font-semibold">Bachelor in Mathematics and Computer Science</p>
              <p className="text-terminal-text-dim">Faculty of Sciences, Fez</p>
              <p className="text-sm text-terminal-green">September 2020 - June 2023</p>
              <p className="text-sm text-terminal-green">Grade: A</p>
            </div>
          </div>
        </div>

        <div className="border border-terminal-border rounded p-4 bg-terminal-code/30">
          <h3 className="text-terminal-yellow mb-3 font-bold">Experience</h3>
          <div>
            <p className="font-semibold">Freelance Full-Stack Developer</p>
            <p className="text-terminal-text-dim">Self-Employed, Remote</p>
            <p className="text-sm text-terminal-green mb-2">Since January 2024</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Built custom e-commerce platforms and admin dashboards</li>
              <li>Handled end-to-end development from UI design to MongoDB implementation</li>
              <li>Developed systems for tracking products, orders, and customers</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

