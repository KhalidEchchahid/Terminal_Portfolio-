import Terminal from "@/components/terminal/terminal"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Khalid Echchahid | Software Engineer",
  description: "Portfolio of Khalid Echchahid, Software Engineering Student and Full-Stack Developer",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-text">
      <Terminal />
    </main>
  )
}

