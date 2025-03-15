"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

// Matrix effect component
export function MatrixEffect() {
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRunning(false)
    }, 10000) // Auto-stop after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isRunning) {
    return (
      <div className="py-2">
        <p className="text-terminal-green">Matrix simulation terminated.</p>
        <p className="text-terminal-text-dim text-sm mt-1">Type &apos;matrix&apos; again to restart the simulation.</p>
      </div>
    )
  }

  return (
    <div className="py-2 font-mono">
      <div className="h-40 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex">
              {Array.from({ length: 30 }).map((_, j) => (
                <span
                  key={j}
                  className="text-terminal-green animate-pulse"
                  style={{
                    animationDelay: `${((i * j) % 5) * 0.1}s`,
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                >
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 bg-terminal-header border-terminal-border"
        onClick={() => setIsRunning(false)}
      >
        Stop Matrix
      </Button>
    </div>
  )
}

// Programming jokes
const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why do Java developers wear glasses? Because they don't C#!",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
  "What's the object-oriented way to become wealthy? Inheritance.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why did the programmer quit his job? Because he didn't get arrays.",
  "What do you call a programmer from Finland? Nerdic.",
  "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
]

export function RandomJoke() {
  const joke = JOKES[Math.floor(Math.random() * JOKES.length)]

  return (
    <div className="py-2">
      <p className="text-terminal-yellow font-medium mb-2">Here&apos;s a programming joke for you:</p>
      <p className="text-terminal-text italic">&quot;{joke}&quot;</p>
      <p className="text-terminal-text-dim text-sm mt-2">Type &apos;joke&apos; again for another joke!</p>
    </div>
  )
}

// ASCII Art
const ASCII_ART = [
  `
  ,---.
  /    |
  |    |
  \\    |
   \`---'
  `,
  `
   _____
  / ____|
 | |     ___  _ __  ___  ___  | | ___
 | |    / _ \\| '_ \\/ __|/ _ \\ | |/ _ \\
 | |___| (_) | | | \\__ \\ (_) || |  __/
  \\_____\\___/|_| |_|___/\\___/ |_|\\___|
  `,
  `
   _    _      _ _       
  | |  | |    | | |      
  | |__| | ___| | | ___  
  |  __  |/ _ \\ | |/ _ \\ 
  | |  | |  __/ | | (_) |
  |_|  |_|\\___|_|_|\\___/ 
  `,
  `
  ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
  ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
     ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
     ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
     ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
  `,
]

export function AsciiArt() {
  const art = ASCII_ART[Math.floor(Math.random() * ASCII_ART.length)]

  return (
    <div className="py-2">
      <pre className="text-terminal-green font-mono text-xs sm:text-sm whitespace-pre overflow-x-auto">{art}</pre>
      <p className="text-terminal-text-dim text-sm mt-2">Type &apos;ascii-art&apos; again for different art!</p>
    </div>
  )
}

// Weather forecast
export function WeatherForecast() {
  const locations = ["New York", "San Francisco", "London", "Tokyo", "Sydney"]
  const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy", "Thunderstorms"]
  const temps = Array.from({ length: 5 }, () => Math.floor(Math.random() * 35) + 5)

  const randomLocation = locations[Math.floor(Math.random() * locations.length)]
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
  const randomTemp = Math.floor(Math.random() * 35) + 5

  return (
    <div className="py-2">
      <div className="mb-3">
        <p className="text-terminal-yellow font-medium">Current Weather:</p>
        <div className="mt-1 pl-2 border-l-2 border-terminal-border">
          <p className="text-terminal-text">
            Location: <span className="text-terminal-green">{randomLocation}</span>
          </p>
          <p className="text-terminal-text">
            Condition: <span className="text-terminal-green">{randomCondition}</span>
          </p>
          <p className="text-terminal-text">
            Temperature: <span className="text-terminal-green">{randomTemp}°C</span>
          </p>
        </div>
      </div>

      <div>
        <p className="text-terminal-yellow font-medium">5-Day Forecast:</p>
        <div className="mt-1 pl-2 border-l-2 border-terminal-border grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const day = new Date()
            day.setDate(day.getDate() + i + 1)
            const dayName = day.toLocaleDateString("en-US", { weekday: "short" })
            const condition = conditions[Math.floor(Math.random() * conditions.length)]

            return (
              <div key={i} className="text-center">
                <p className="text-terminal-blue">{dayName}</p>
                <p className="text-terminal-text">{temps[i]}°C</p>
                <p className="text-terminal-text-dim text-xs">{condition}</p>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-terminal-text-dim text-xs mt-3">
        Note: This is simulated weather data for demonstration purposes.
      </p>
    </div>
  )
}

