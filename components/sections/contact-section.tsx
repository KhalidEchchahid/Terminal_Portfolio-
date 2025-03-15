"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { CodeBlock } from "../syntax-highlight"
import { Loader2 } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", formData)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactJson = `{
  "name": "Khalid Echchahid",
  "contact": {
    "email": "echchahidkhalid7@gmail.com",
    "professional_email": "khalid.echchahid@usmba.ac.ma",
    "phone": "+212-645557609",
    "location": "Fez, Morocco"
  },
  "social": {
    "github": "https://github.com/khalidEchchahid",
    "linkedin": "https://linkedin.com/in/khalid-echchahid"
  },
  "preferred_contact_method": "email"
}`

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-terminal-purple">Contact Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-terminal-code/20 p-4 rounded-md border border-terminal-border mb-6">
            <h3 className="text-terminal-green mb-3">Contact Information</h3>
            <CodeBlock language="json" showLineNumbers={false}>
              {contactJson}
            </CodeBlock>
          </div>

          <div className="text-terminal-text p-4 rounded-md border border-terminal-border bg-terminal-header-dark">
            <h3 className="text-terminal-yellow mb-3">Direct Contact</h3>
            <ul className="space-y-2">
              <li className="flex">
                <span className="text-terminal-text-dim mr-2">$ email:</span>
                <a href="mailto:echchahidkhalid7@gmail.com" className="text-terminal-blue hover:underline">
                  echchahidkhalid7@gmail.com
                </a>
              </li>
              <li className="flex">
                <span className="text-terminal-text-dim mr-2">$ phone:</span>
                <a href="tel:+212645557609" className="text-terminal-green hover:underline">
                  +212-645557609
                </a>
              </li>
              <li className="flex">
                <span className="text-terminal-text-dim mr-2">$ github:</span>
                <a
                  href="https://github.com/khalid-echchahid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-purple hover:underline"
                >
                  github.com/khalid-echchahid
                </a>
              </li>
              <li className="flex">
                <span className="text-terminal-text-dim mr-2">$ linkedin:</span>
                <a
                  href="https://linkedin.com/in/khalid-echchahid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-blue hover:underline"
                >
                  linkedin.com/in/khalid-echchahid
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <form onSubmit={handleSubmit} className="p-4 border border-terminal-border rounded-md bg-terminal-code/10">
            <h3 className="text-terminal-yellow mb-4">Send Me a Message</h3>

            <div className="mb-4">
              <label className="block text-terminal-text-dim mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-terminal-header-dark border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green"
              />
            </div>

            <div className="mb-4">
              <label className="block text-terminal-text-dim mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-terminal-header-dark border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green"
              />
            </div>

            <div className="mb-4">
              <label className="block text-terminal-text-dim mb-1">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-terminal-header-dark border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green"
              />
            </div>

            <div className="mb-4">
              <label className="block text-terminal-text-dim mb-1">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-terminal-header-dark border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                isSubmitting
                  ? "bg-terminal-header-light text-terminal-text-dim"
                  : "bg-terminal-green text-black hover:bg-terminal-green/90"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {submitStatus === "success" && (
              <div className="mt-3 text-terminal-green text-sm bg-terminal-green/10 p-2 rounded">
                Message sent successfully! I will get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-3 text-terminal-red text-sm bg-terminal-red/10 p-2 rounded">
                Error sending message. Please try again later.
              </div>
            )}
          </form>
        </motion.div>
      </div>

      <div className="mt-6 border-t border-terminal-border pt-4">
        <p className="text-terminal-text-dim">
          Type <span className="text-terminal-yellow">home</span> to return to the main page.
        </p>
      </div>
    </div>
  )
}

