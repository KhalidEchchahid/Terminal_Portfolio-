import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Khalid Echchahid | Developer Portfolio",
  description: "The terminal-inspired portfolio of Khalid Echchahid, Software Engineer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} font-mono bg-terminal-bg text-terminal-text`}>{children}</body>
    </html>
  )
}

