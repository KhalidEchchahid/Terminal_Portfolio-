"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import SkillCategory from "../ui/skill-category"
import ThreeDSkillsVisualization from "../ui/3d-skills-visualization"

interface Skill {
  name: string
  level: number
}

interface SkillCategoryType {
  name: string
  color: string
  skills: Skill[]
}

export default function SkillsSection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<number>(0)

  // Skills data
  const skillCategories: SkillCategoryType[] = [
    {
      name: "Frontend",
      color: "#89b4fa", // Blue
      skills: [
        { name: "React.js", level: 0.9 },
        { name: "Next.js", level: 0.85 },
        { name: "Tailwind CSS", level: 0.9 },
        { name: "HTML/CSS", level: 0.95 },
        { name: "JavaScript", level: 0.9 },
      ],
    },
    {
      name: "Backend",
      color: "#a6e3a1", // Green
      skills: [
        { name: "Spring Boot", level: 0.8 },
        { name: "Node.js", level: 0.75 },
        { name: "Express.js", level: 0.7 },
        { name: "PHP", level: 0.6 },
      ],
    },
    {
      name: "Databases",
      color: "#f9e2af", // Yellow
      skills: [
        { name: "MongoDB", level: 0.85 },
        { name: "PostgreSQL", level: 0.7 },
        { name: "MySQL", level: 0.75 },
        { name: "Oracle", level: 0.6 },
      ],
    },
    {
      name: "DevOps",
      color: "#f38ba8", // Red
      skills: [
        { name: "Docker", level: 0.7 },
        { name: "Git", level: 0.85 },
        { name: "Linux", level: 0.75 },
      ],
    },
  ]

  const additionalSkills: string[] = [
    "Problem Solving",
    "Teamwork",
    "Communication",
    "Resilience",
    "Strategic Thinking",
    "UI/UX Design",
    "Agile Methodology",
    "Project Management",
  ]

  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
        <h2 className="text-2xl font-bold text-terminal-green mb-6">Skills & Technologies</h2>

        {/* 3D Skills Visualization */}
        <div className="mb-8">
          <ThreeDSkillsVisualization category={skillCategories[activeCategory]} />

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skillCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(index)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeCategory === index
                    ? "bg-terminal-header text-terminal-text"
                    : "bg-terminal-bg text-terminal-text-dim hover:text-terminal-text"
                }`}
                style={{
                  borderColor: category.color,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.name} category={category} index={index} />
          ))}
        </div>

        <div className="mt-8 bg-terminal-header p-4 rounded-lg">
          <h3 className="text-lg font-bold text-terminal-yellow mb-4">Additional Skills</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalSkills.map((skill) => (
              <div
                key={skill}
                className="bg-terminal-bg px-3 py-2 rounded-md text-center text-sm hover:bg-terminal-header-light transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

