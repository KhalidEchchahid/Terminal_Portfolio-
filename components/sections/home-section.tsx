"use client"

import { useEffect, useState } from "react"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import { motion } from "framer-motion"
import { CodeBlock } from "../syntax-highlight"

export default function HomeSection() {
  const [isClient, setIsClient] = useState(false)
  const [fullProfileLoaded, setFullProfileLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Simulate loading profile data
    const timer = setTimeout(() => {
      setFullProfileLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const [text] = useTypewriter({
    words: [
      "I build web applications",
      "I develop full-stack solutions",
      "I design software architectures",
      "I solve real-world problems",
    ],
    loop: true,
    delaySpeed: 2000,
  })

  const profileCode = `const profile = {
  name: "Khalid Echchahid",
  title: "Software Engineering Student",
  specialization: "Full-Stack Developer",
  education: {
    current: {
      program: "Software Engineering and Integration of Computer Systems",
      institution: "Faculty of Sciences and Techniques, Mohammedia",
      graduationYear: 2026
    },
    previous: {
      program: "Bachelor in Mathematics and Computer Science",
      institution: "Faculty of Sciences, Fez",
      period: "September 2020 - June 2023",
      grade: "A"
    }
  },
  skills: [
    "React", "Next.js", "Spring Boot", "MongoDB", "PostgreSQL",
    "C/C++", "Java", "JavaScript", "Tailwind CSS", "Docker" , "Git" , "Express.js" , "and much more..."
  ],
  contact: {
    email: "echchahidkhalid7@gmail.com",
    github: "https://github.com/khalidEchchahid",
    linkedin: "https://linkedin.com/in/khalid-echchahid"
  }
};`

  return (
    <div>
      <div className="mb-6 text-terminal-text">
        <motion.h1
          className="text-2xl font-bold mb-2 text-terminal-green"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hello, I am Khalid Echchahid
        </motion.h1>

        {isClient && (
          <div className="h-8 flex items-center">
            <span className="text-terminal-text-dim mr-2">{">"}</span>
            <span>{text}</span>
            <Cursor cursorColor="#9ca3af" />
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center text-sm text-terminal-text-dim mb-2">
            <span className="mr-2">⟩</span>
            <span>{fullProfileLoaded ? "Profile data loaded" : "Loading profile data..."}</span>
          </div>

          {!fullProfileLoaded ? (
            <div className="w-full bg-terminal-header mt-1 rounded-full h-2 mb-6">
              <motion.div
                className="bg-terminal-green h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
              />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <CodeBlock language="javascript" showLineNumbers={true}>
                {profileCode}
              </CodeBlock>
            </motion.div>
          )}
        </div>

        <motion.div
          className="mt-6 text-terminal-text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: fullProfileLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-terminal-text">
            Type <span className="text-terminal-yellow">about</span> to learn more about me, or{" "}
            <span className="text-terminal-yellow">help</span> to see all available commands.
          </p>
          <p className="mt-2 text-terminal-text-dim text-sm">
            <span className="text-terminal-purple">TIP:</span> Try typing{" "}
            <span className="text-terminal-green">launch_portfolio</span> and scroll up (until I fix this) for an interactive experience!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

