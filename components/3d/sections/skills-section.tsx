"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  name: string
  color: string
  skills: Skill[]
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  // Skills data
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      color: "#cba6f7", // Terminal Purple
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
      color: "#89b4fa", // Terminal Blue
      skills: [
        { name: "Spring Boot", level: 0.8 },
        { name: "Node.js", level: 0.75 },
        { name: "Express.js", level: 0.7 },
        { name: "PHP", level: 0.6 },
      ],
    },
    {
      name: "Databases",
      color: "#a6e3a1", // Terminal Green
      skills: [
        { name: "MongoDB", level: 0.85 },
        { name: "PostgreSQL", level: 0.7 },
        { name: "MySQL", level: 0.75 },
        { name: "Oracle", level: 0.6 },
      ],
    },
    {
      name: "DevOps",
      color: "#f38ba8", // Terminal Red
      skills: [
        { name: "Docker", level: 0.7 },
        { name: "Git", level: 0.85 },
        { name: "Linux", level: 0.75 },
      ],
    },
  ]

  const additionalSkills = [
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
    <section className="min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          My <span className="text-gradient-1">Skills</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I have developed a diverse set of skills throughout my journey as a developer. Here is a visualization of my
          technical expertise and proficiency levels.
        </p>
      </motion.div>

      {/* Skills Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <div className="glass-card p-8 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skillCategories[activeCategory].skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-24 h-24 mb-4">
                  <div
                    className="absolute inset-0 rounded-full border-4"
                    style={{ borderColor: skillCategories[activeCategory].color }}
                  ></div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1e2e" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={skillCategories[activeCategory].color}
                      strokeWidth="8"
                      strokeDasharray={`${skill.level * 251.2} 251.2`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{ color: skillCategories[activeCategory].color }}>
                      {Math.round(skill.level * 100)}%
                    </span>
                  </div>
                </div>
                <span className="text-center font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {skillCategories.map((category, index) => (
            <Button
              key={category.name}
              variant={activeCategory === index ? "default" : "outline"}
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? "bg-primary" : "border-primary hover:bg-primary/10"}
              style={{
                borderColor: activeCategory !== index ? category.color : undefined,
                backgroundColor: activeCategory === index ? category.color : undefined,
              }}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: category.color }}>
              {category.name}
            </h3>

            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span style={{ color: category.color }}>{Math.round(skill.level * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-terminal-header-dark rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${skill.level * 100}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gradient-1">Additional Skills</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {additionalSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="glass p-3 rounded-lg text-center hover:bg-primary/10 transition-colors"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

