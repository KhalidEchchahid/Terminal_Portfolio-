"use client"

import { motion } from "framer-motion"

interface SkillBarProps {
  skill: {
    name: string
    level: number
  }
  color: string
  index: number
}

export default function SkillBar({ skill, color, index }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{skill.name}</span>
        <span className="text-xs" style={{ color }}>
          {Math.round(skill.level * 100)}%
        </span>
      </div>
      <div className="w-full bg-terminal-bg rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level * 100}%` }}
          transition={{
            duration: 1,
            delay: index * 0.1 + 0.2,
          }}
          className="h-2 rounded-full"
          style={{ backgroundColor: color }}
        ></motion.div>
      </div>
    </div>
  )
}

