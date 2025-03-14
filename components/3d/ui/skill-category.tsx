"use client"

import { motion } from "framer-motion"
import SkillBar from "./skill-bar"

interface Skill {
  name: string
  level: number
}

interface SkillCategoryProps {
  category: {
    name: string
    color: string
    skills: Skill[]
  }
  index: number
}

export default function SkillCategory({ category, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-terminal-header p-4 rounded-lg"
    >
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
        {category.name}
      </h3>

      <div className="space-y-4">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} color={category.color} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

