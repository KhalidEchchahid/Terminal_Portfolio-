"use client"

import HomeSection from "../sections/home-section"
import AboutSection from "../sections/about-section"
import SkillsSection from "../sections/skills-section"
import ProjectsSection from "../sections/project-section"
import ContactSection from "../sections/contact-section"
import FileExplorer from "./file-explorer"
import ResumeDownloader from "./resume-downloader"
interface TerminalSectionProps {
  section: string
}

export default function TerminalSection({ section }: TerminalSectionProps) {
  // Render the appropriate section based on the active section
  switch (section) {
    case "home":
      return <HomeSection />
    case "about":
      return <AboutSection />
    case "skills":
      return <SkillsSection />
    case "projects":
      return <ProjectsSection />
    case "contact":
      return <ContactSection />
    case "files":
      return <FileExplorer />
    case "resume":
      return <ResumeDownloader />
    default:
      return <HomeSection />
  }
}

