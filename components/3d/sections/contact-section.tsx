"use client"

import { motion } from "framer-motion"
import ContactInfo from "../ui/contact-info"
import SocialLinks from "../ui/social-links"
import ThreeDContactForm from "../ui/3d-contact-form"

export default function ContactSection(): JSX.Element {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
        <h2 className="text-2xl font-bold text-terminal-green mb-6">Contact Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ContactInfo />
            <SocialLinks />
          </div>

          <ThreeDContactForm />
        </div>
      </div>
    </motion.div>
  )
}

