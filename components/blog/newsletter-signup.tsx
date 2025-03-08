"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus("error")
      setErrorMessage("Please enter your email address")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would call your newsletter API here
      setStatus("success")
      setEmail("")
    }, 1500)
  }

  return (
    <div className="rounded-lg border border-terminal-border bg-terminal-header-dark p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:flex-1">
          <h3 className="text-xl font-bold text-terminal-green mb-2">Subscribe to the Terminal Newsletter</h3>
          <p className="text-terminal-text-dim">
            Get the latest posts and updates delivered straight to your inbox. No spam, ever.
          </p>
        </div>

        <div className="md:flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
              <Input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-terminal-header border-terminal-border focus:border-terminal-green pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <Button
              type="submit"
              className="bg-terminal-green text-black hover:bg-terminal-green/90"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>

          {status === "success" && (
            <Alert className="mt-3 bg-terminal-green/20 border-terminal-green text-terminal-green">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Thanks for subscribing! Check your email to confirm.</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert className="mt-3 bg-terminal-red/20 border-terminal-red text-terminal-red">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

