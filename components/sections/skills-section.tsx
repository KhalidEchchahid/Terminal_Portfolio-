"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CodeBlock } from "../syntax-highlight"

export default function SkillsSection() {
  const [viewMode, setViewMode] = useState<"json" | "visual">("json")

  const skillsJson = `{
  "languages": [
    { "name": "JavaScript", "proficiency": "Advanced" },
    { "name": "Java", "proficiency": "Advanced" },
    { "name": "C", "proficiency": "Intermediate" },
    { "name": "C++", "proficiency": "Intermediate" },
    { "name": "PHP", "proficiency": "Intermediate" }
  ],
  "frontend": [
    { "name": "HTML", "proficiency": "Advanced" },
    { "name": "CSS", "proficiency": "Advanced" },
    { "name": "React.js", "proficiency": "Advanced" },
    { "name": "Next.js", "proficiency": "Advanced" },
    { "name": "Tailwind CSS", "proficiency": "Advanced" }
  ],
  "backend": [
    { "name": "Spring Boot", "proficiency": "Advanced" },
    { "name": "Express.js", "proficiency": "Intermediate" },
    { "name": "Node.js", "proficiency": "Intermediate" }
  ],
  "databases": [
    { "name": "MongoDB", "proficiency": "Advanced" },
    { "name": "PostgreSQL", "proficiency": "Intermediate" },
    { "name": "MySQL", "proficiency": "Intermediate" },
    { "name": "Oracle", "proficiency": "Intermediate" }
  ],
  "devOps": [
    { "name": "Docker", "proficiency": "Intermediate" },
    { "name": "Linux", "proficiency": "Intermediate" },
    { "name": "Git", "proficiency": "Advanced" }
  ],
  "other": [
    { "name": "UML", "proficiency": "Intermediate" },
    { "name": "Business Intelligence", "proficiency": "Intermediate" },
    { "name": "Microservices", "proficiency": "Intermediate" }
  ],
  "soft_skills": [
    "Resilience under pressure",
    "Teamwork and collaboration",
    "Interpersonal communication",
    "Strategic problem-solving",
    "Creative thinking"
  ],
  "languages_spoken": [
    { "language": "English", "level": "Proficient" },
    { "language": "Arabic", "level": "Proficient" },
    { "language": "French", "level": "Working proficiency" }
  ]
}`

  interface Skill {
    name: string
    proficiency: string
  }

  interface SkillCategory {
    title: string
    skills: Skill[]
    color: string
  }

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", proficiency: "Advanced" },
        { name: "Java", proficiency: "Advanced" },
        { name: "C", proficiency: "Intermediate" },
        { name: "C++", proficiency: "Intermediate" },
        { name: "PHP", proficiency: "Intermediate" },
      ],
      color: "bg-blue-500",
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML", proficiency: "Advanced" },
        { name: "CSS", proficiency: "Advanced" },
        { name: "React.js", proficiency: "Advanced" },
        { name: "Next.js", proficiency: "Advanced" },
        { name: "Tailwind CSS", proficiency: "Advanced" },
      ],
      color: "bg-green-500",
    },
    {
      title: "Backend",
      skills: [
        { name: "Spring Boot", proficiency: "Advanced" },
        { name: "Express.js", proficiency: "Intermediate" },
        { name: "Node.js", proficiency: "Intermediate" },
      ],
      color: "bg-purple-500",
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", proficiency: "Advanced" },
        { name: "PostgreSQL", proficiency: "Intermediate" },
        { name: "MySQL", proficiency: "Intermediate" },
        { name: "Oracle", proficiency: "Intermediate" },
      ],
      color: "bg-yellow-500",
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-terminal-purple">Skills & Technologies</h2>

      <div className="mb-6 flex items-center">
        <button
          className={`px-4 py-1 mr-2 rounded font-mono text-sm ${
            viewMode === "json"
              ? "bg-terminal-header-light text-terminal-yellow"
              : "text-terminal-text-dim hover:text-terminal-text"
          }`}
          onClick={() => setViewMode("json")}
        >
          JSON View
        </button>
        <button
          className={`px-4 py-1 rounded font-mono text-sm ${
            viewMode === "visual"
              ? "bg-terminal-header-light text-terminal-yellow"
              : "text-terminal-text-dim hover:text-terminal-text"
          }`}
          onClick={() => setViewMode("visual")}
        >
          Visual View
        </button>
      </div>

      <motion.div key={viewMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {viewMode === "json" ? (
          <CodeBlock language="json">{skillsJson}</CodeBlock>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-terminal-border rounded-md bg-terminal-code/20 p-4"
              >
                <h3 className="text-terminal-text mb-3 font-bold flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full ${category.color} mr-2`}></span>
                  {category.title}
                </h3>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="text-terminal-text-dim text-sm">{skill.name}</span>
                        <span
                          className={`text-xs ${
                            skill.proficiency === "Advanced" ? "text-terminal-green" : "text-terminal-yellow"
                          }`}
                        >
                          {skill.proficiency}
                        </span>
                      </div>
                      <div className="w-full bg-terminal-border rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${category.color}`}
                          style={{
                            width: skill.proficiency === "Advanced" ? "85%" : "60%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="mt-6 border-t border-terminal-border pt-4 text-terminal-text-dim">
        <p>
          Type <span className="text-terminal-yellow">projects</span> to see my work.
        </p>
      </div>
    </div>
  )
}

