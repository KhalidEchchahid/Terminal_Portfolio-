"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ThreeDContentProps {
  activeSection: string
  viewMode: "cube" | "projects" | "skills"
}

export default function ThreeDContent({ activeSection, viewMode }: ThreeDContentProps) {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  // Only show content overlay in cube mode
  if (viewMode !== "cube") {
    return null
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.5 }}
          className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border"
        >
          {activeSection === "about" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">About Me</h2>
              <p className="text-terminal-text mb-3">
                I am Khalid Echchahid, a software engineering student and full-stack developer with a passion for
                building innovative web applications.
              </p>
              <p className="text-terminal-text-dim">
                Currently pursuing a degree in Software Engineering and Integration of Computer Systems at the Faculty
                of Sciences and Techniques, Mohammedia.
              </p>
            </div>
          )}

          {activeSection === "skills" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-terminal-yellow mb-2">Frontend</h3>
                  <ul className="list-disc list-inside text-terminal-text-dim">
                    <li>React.js</li>
                    <li>Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>HTML/CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-terminal-yellow mb-2">Backend</h3>
                  <ul className="list-disc list-inside text-terminal-text-dim">
                    <li>Spring Boot</li>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "projects" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">Projects</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-terminal-yellow">University Collaboration Platform</h3>
                  <p className="text-terminal-text-dim text-sm">
                    A comprehensive platform facilitating collaboration between students and professors.
                  </p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">Intra-Enterprise Collaboration System</h3>
                  <p className="text-terminal-text-dim text-sm">
                    A web application for collaboration within companies, similar to Stack Overflow.
                  </p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">Gladiator: 2D Fighting Game</h3>
                  <p className="text-terminal-text-dim text-sm">
                    A 2D fighting game developed from scratch using C and GTK.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">Contact Me</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-terminal-yellow">Email</h3>
                  <p className="text-terminal-text-dim">echchahidkhalid7@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">GitHub</h3>
                  <p className="text-terminal-text-dim">github.com/khalid-echchahid</p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">LinkedIn</h3>
                  <p className="text-terminal-text-dim">linkedin.com/in/khalid-echchahid</p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">Location</h3>
                  <p className="text-terminal-text-dim">Fez, Morocco</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

