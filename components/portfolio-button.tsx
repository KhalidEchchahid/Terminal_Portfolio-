"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import Link from "next/link"

interface PortfolioButtonProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  label?: string
  showAfterScroll?: boolean
}

export function PortfolioButton({
  position = "bottom-right",
  label = "View Portfolio",
  showAfterScroll = true,
}: PortfolioButtonProps) {
  const [isVisible, setIsVisible] = useState(!showAfterScroll)

  useEffect(() => {
    if (!showAfterScroll) return

    const handleScroll = () => {
      // Show button after scrolling down 300px
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfterScroll])

  // Define position classes based on the position prop
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-50`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/">
        <Button className="bg-terminal-green text-black hover:bg-terminal-green/90 shadow-lg group" size="lg">
          <Briefcase className="mr-2 h-4 w-4 group-hover:animate-pulse" />
          {label}
        </Button>
      </Link>
    </motion.div>
  )
}

