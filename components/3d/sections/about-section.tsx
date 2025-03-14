"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
        <h2 className="text-2xl font-bold text-terminal-green mb-6">About Me</h2>

       

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-lg bg-terminal-header overflow-hidden mb-4">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4E03AQFnSpoqTalvpg/profile-displayphoto-shrink_800_800/B4EZVNq_ZTH0Ag-/0/1740764870634?e=1746662400&v=beta&t=A9Esf5PhuJozuVbXoBVmXjh-TTne0MxIk02wUNLXzmo"
                width={400}
                height={400}
                alt="Khalid Echchahid"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-terminal-header p-4 rounded-lg">
              <h3 className="text-lg font-bold text-terminal-yellow mb-2">Personal Info</h3>
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
                  <span className="text-terminal-text-dim">Email:</span> echchahidkhalid7@gmail.com
                </li>
                <li>
                  <span className="text-terminal-text-dim">Languages:</span> English, Arabic, French
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-lg mb-4">
                I am a software engineering student and full-stack developer with a passion for building innovative web
                applications.
              </p>
              <p className="text-terminal-text-dim mb-4">
                Currently pursuing a degree in Software Engineering and Integration of Computer Systems at the Faculty
                of Sciences and Techniques, Mohammedia.
              </p>
            </div>

            <div className="bg-terminal-header p-4 rounded-lg">
              <h3 className="text-lg font-bold text-terminal-yellow mb-2">Education</h3>
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

            <div className="bg-terminal-header p-4 rounded-lg">
              <h3 className="text-lg font-bold text-terminal-yellow mb-2">Experience</h3>
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
        </div>
      </div>
    </motion.div>
  )
}

