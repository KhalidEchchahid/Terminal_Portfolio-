"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import AboutSection from "./sections/about-section";
import ProjectsSection from "./sections/project-section";
import SkillsSection from "./sections/skills-section";
import ContactSection from "./sections/contact-section";
import HomeSection from "./sections/home-section";
import TerminalHeader from "./terminal-header";
import TerminalPrompt from "./terminal-prompt";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// Define all available commands
const COMMANDS = {
  BASIC: [
    "home",
    "about",
    "skills",
    "projects",
    "contact",
    "help",
    "clear",
    "social",
    "exit",
  ],
  EASTER_EGGS: [
    "launch_portfolio",
    "coffee",
    "joke",
    "github",
    "linkedin",
    "resume",
    "3d_portfolio",
  ],
  SYSTEM: ["ls", "whoami", "date", "echo", "man"],
};

// Combine all commands for help display
const ALL_COMMANDS = [
  ...COMMANDS.BASIC,
  ...COMMANDS.EASTER_EGGS,
  ...COMMANDS.SYSTEM,
];

export default function Terminal() {
  const [activeSection, setActiveSection] = useState("home");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [outputHistory, setOutputHistory] = useState<
    Array<{ type: string; content: React.ReactNode; id: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [compactMode, setCompactMode] = useState(false);

  // Scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Handle tab navigation
  const handleTabChange = (section: string) => {
    // Simulate typing the command
    const command = section === "home" ? "home" : section;
    handleCommand(command);
  };

  // Add a scroll helper function to ensure consistent scrolling behavior
  const scrollToBottom = () => {
    if (terminalRef.current) {
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 10);
    }
  };

  // Process command
  const handleCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase();

    // Add to history
    setCommandHistory((prev) => [...prev, command]);

    // Process command with loading animation
    setIsLoading(true);

    // Simulate processing delay for effect
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 200 + 50)
    );

    // Helper function to scroll to bottom
    const scrollToBottom = () => {
      if (terminalRef.current) {
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, 10);
      }
    };

    // Clear command
    if (cmd === "clear") {
      setOutputHistory([]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Navigation commands
    if (["home", "about", "skills", "projects", "contact"].includes(cmd)) {
      setActiveSection(cmd);
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "success",
          content: (
            <div>
              <span className="text-terminal-green">➜</span> Loading {cmd}{" "}
              section...
              <div className="mt-1 text-xs text-terminal-text-dim">
                <span className="text-terminal-yellow">TIP:</span> Try typing{" "}
                <span className="text-terminal-green">launch_portfolio</span>{" "}
                for a special experience
              </div>
            </div>
          ),
          id: `nav-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Help command
    if (cmd === "help") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "info",
          content: (
            <div>
              <div className="text-terminal-yellow font-bold mb-2">
                Available commands:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-terminal-text-dim">
                {COMMANDS.BASIC.map((c) => (
                  <div key={c} className="flex items-center">
                    <span className="text-terminal-green mr-2">→</span>
                    <span className="text-terminal-text">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-terminal-text-dim">
                <span className="text-terminal-yellow">TIP:</span> There are
                hidden commands to discover!
              </div>
            </div>
          ),
          id: `help-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Social command
    if (cmd === "social") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "info",
          content: (
            <div>
              <div className="text-terminal-yellow font-bold mb-2">
                Social links:
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="text-terminal-green mr-2">→</span>
                  <span className="text-terminal-text-dim mr-2">GitHub:</span>
                  <a
                    href="https://github.com/khalid-echchahid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-blue hover:underline"
                  >
                    github.com/khalid-echchahid
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-green mr-2">→</span>
                  <span className="text-terminal-text-dim mr-2">LinkedIn:</span>
                  <a
                    href="https://linkedin.com/in/khalid-echchahid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-blue hover:underline"
                  >
                    linkedin.com/in/khalid-echchahid
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-green mr-2">→</span>
                  <span className="text-terminal-text-dim mr-2">Email:</span>
                  <a
                    href="mailto:echchahidkhalid7@gmail.com"
                    className="text-terminal-blue hover:underline"
                  >
                    echchahidkhalid7@gmail.com
                  </a>
                </div>
              </div>
            </div>
          ),
          id: `social-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Exit command (just for fun)
    if (cmd === "exit") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: (
            <div>
              <span className="text-terminal-red">Error:</span> Nice try! This
              terminal cannot be closed. Try{" "}
              <span className="text-terminal-yellow">clear</span> instead.
              <div className="mt-1 text-xs text-terminal-text-dim">
                <span className="text-terminal-yellow">TIP:</span> Try typing{" "}
                <span className="text-terminal-green">launch_portfolio</span>{" "}
                for a special experience
              </div>
            </div>
          ),
          id: `exit-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Launch portfolio command
    if (cmd === "launch_portfolio") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "special",
          content: (
            <div>
              <div className="text-terminal-green font-bold mb-2">
                Launching portfolio experience...
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">
                    Initializing portfolio components
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">
                    Loading project data
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">
                    Preparing interactive experience
                  </span>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-terminal-green text-lg font-bold">
                    Welcome to my interactive portfolio!
                  </span>
                </div>
                <div className="text-center text-terminal-text-dim">
                  Navigate through sections using commands or tabs above.
                </div>
              </div>
            </div>
          ),
          id: `launch-${Date.now()}`,
        },
      ]);

      // Cycle through sections automatically
      const sections = ["home", "about", "skills", "projects", "contact"];
      let index = 0;

      const cycleInterval = setInterval(() => {
        setActiveSection(sections[index]);
        index = (index + 1) % sections.length;

        // Stop after cycling through all sections
        if (index === 0) {
          clearInterval(cycleInterval);
        }
      }, 2000);

      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Coffee command
    if (cmd === "coffee") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "special",
          content: (
            <div>
              <pre className="text-terminal-yellow">
                {`
      ( (
       ) )
    .______.
    |      |]
    \\      /
     '----'
`}
              </pre>
              <div className="mt-2 text-terminal-green">
                Coffee loaded successfully! Fuel for coding sessions.
              </div>
            </div>
          ),
          id: `coffee-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Joke command
    if (cmd === "joke") {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
        "Why do Java developers wear glasses? Because they don't C#!",
        "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
        "What's a programmer's favorite hangout place? The Foo Bar!",
      ];

      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

      setOutputHistory((prev) => [
        ...prev,
        {
          type: "special",
          content: (
            <div>
              <div className="text-terminal-yellow font-bold mb-2">
                Developer Joke:
              </div>
              <div className="text-terminal-green">{randomJoke}</div>
              <div className="mt-2 text-xs text-terminal-text-dim">
                Type <span className="text-terminal-yellow">joke</span> again
                for another joke
              </div>
            </div>
          ),
          id: `joke-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // 3D Portfolio command
    if (cmd === "3d_portfolio") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "special",
          content: (
            <div>
              <div className="text-terminal-green font-bold mb-2">
                Launching 3D Portfolio Experience...
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">
                    Initializing 3D engine
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">Loading 3D assets</span>
                </div>
                <div className="flex items-center">
                  <span className="text-terminal-yellow mr-2">→</span>
                  <span className="text-terminal-text">
                    Preparing immersive experience
                  </span>
                </div>
              </div>
            </div>
          ),
          id: `3d-portfolio-${Date.now()}`,
        },
      ]);

      // Show the 3D portfolio view
      window.location.href = "/3d-portfolio";

      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // System commands
    if (cmd === "ls") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "system",
          content: (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                <span className="text-terminal-blue">about.md</span>
                <span className="text-terminal-blue">skills.json</span>
                <span className="text-terminal-blue">projects.js</span>
                <span className="text-terminal-blue">contact.html</span>
                <span className="text-terminal-green">resume.pdf</span>
                <span className="text-terminal-yellow">portfolio.config</span>
                <span className="text-terminal-red">secrets.txt</span>
                <span className="text-terminal-purple">games/</span>
              </div>
            </div>
          ),
          id: `ls-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    if (cmd === "whoami") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "system",
          content: (
            <div>
              <span className="text-terminal-green">
                visitor@khalid-portfolio
              </span>
              <div className="mt-1 text-xs text-terminal-text-dim">
                You are viewing the portfolio of Khalid Echchahid, Software
                Engineering Student & Full-Stack Developer
              </div>
            </div>
          ),
          id: `whoami-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    if (cmd === "date") {
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "system",
          content: (
            <div>
              <span className="text-terminal-text">
                {new Date().toString()}
              </span>
            </div>
          ),
          id: `date-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Check if command starts with echo
    if (cmd.startsWith("echo ")) {
      const message = command.substring(5);
      setOutputHistory((prev) => [
        ...prev,
        {
          type: "system",
          content: <div className="text-terminal-text">{message}</div>,
          id: `echo-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Man command (manual)
    if (cmd.startsWith("man ")) {
      const commandName = cmd.substring(4).trim();

      if (ALL_COMMANDS.includes(commandName)) {
        const descriptions: Record<string, string> = {
          home: "Navigate to the home section of the portfolio",
          about: "Display information about Khalid Echchahid",
          skills: "Show technical skills and proficiency levels",
          projects: "List projects and their details",
          contact: "Display contact information",
          help: "Show available commands",
          clear: "Clear the terminal screen",
          social: "Display social media links",
          exit: "Attempt to exit the terminal (spoiler: you can't)",
          launch_portfolio: "Start an interactive portfolio experience",
          coffee: "Get a virtual coffee to fuel your coding",
          joke: "Display a random programming joke",
          ls: "List files in the current directory",
          whoami: "Display current user information",
          date: "Show the current date and time",
          echo: "Display a message on the screen",
          man: "Display the manual for a command",
        };

        setOutputHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: (
              <div>
                <div className="text-terminal-yellow font-bold mb-2">
                  MANUAL: {commandName}
                </div>
                <div className="text-terminal-text-dim mb-1">NAME</div>
                <div className="text-terminal-text ml-4 mb-2">
                  {commandName} -{" "}
                  {descriptions[commandName] || "No description available"}
                </div>
                <div className="text-terminal-text-dim mb-1">SYNOPSIS</div>
                <div className="text-terminal-text ml-4 mb-2">
                  {commandName}
                </div>
                <div className="text-terminal-text-dim mb-1">DESCRIPTION</div>
                <div className="text-terminal-text ml-4">
                  {descriptions[commandName] || "No description available"}
                </div>
              </div>
            ),
            id: `man-${Date.now()}`,
          },
        ]);
      } else {
        setOutputHistory((prev) => [
          ...prev,
          {
            type: "error",
            content: <div>No manual entry for {commandName}</div>,
            id: `man-error-${Date.now()}`,
          },
        ]);
      }

      setIsLoading(false);
      scrollToBottom();
      return;
    }

    // Unknown command
    setOutputHistory((prev) => [
      ...prev,
      {
        type: "error",
        content: (
          <div>
            <span className="text-terminal-red">
              Command not found: {command}
            </span>
            <div className="mt-1 text-xs text-terminal-text-dim">
              Type <span className="text-terminal-yellow">help</span> for
              available commands
            </div>
          </div>
        ),
        id: `error-${Date.now()}`,
      },
    ]);
    setIsLoading(false);
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [commandHistory, outputHistory]);

  return (
    <div className="container mx-auto px-4 py-8 h-screen max-h-screen flex flex-col">
      <TerminalHeader
        activeSection={activeSection}
        onTabChange={handleTabChange}
      />

      <div
        ref={terminalRef}
        className="flex-1 overflow-auto bg-terminal-bg rounded-b-lg font-mono text-sm md:text-base p-4 border border-terminal-border border-t-0 shadow-inner"
      >
        {/* Welcome message */}
        <div className="mb-4 text-terminal-text-dim">
          <pre className="text-terminal-green">
            {`
 _  __  _           _  _      _      ______          _         _           _     _      _ 
| |/ / | |         | |(_)    | |    |  ____|        | |       | |         | |   (_)    | |
| ' /  | |__   __ _| | _   __| |    | |__    ___ ___| |__   ___| |__   __ _| |__  _  __| |
|  <   | '_ \\ / _\` | || | / _\` |    |  __|  / __/ __| '_ \\ / __| '_ \\ / _\` | '_ \\| |/ _\` |
| . \\  | | | | (_| | || || (_| |    | |____| (_| (__| | | | (__| | | | (_| | | | | | (_| |
|_|\\_\\ |_| |_|\\__,_|_||_| \\__,_|    |______|\\___|___|_| |_|\\___|_| |_|\\__,_|_| |_|_|\\__,_|
                                                                                           
`}
          </pre>
          <p className="mb-2">
            Welcome to my interactive developer portfolio terminal.
          </p>
          <p>
            Type <span className="text-terminal-yellow">help</span> to see
            available commands or navigate using the tabs above. Try{" "}
            <span className="text-terminal-green">launch_portfolio</span> for a
            special experience!
          </p>
        </div>
        <div className="flex justify-end mb-4 space-x-2">
          <button
            onClick={() => setCompactMode(!compactMode)}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              compactMode
                ? "text-terminal-green border-terminal-green"
                : "text-terminal-text-dim border-terminal-border hover:text-terminal-green hover:border-terminal-green"
            }`}
          >
            {compactMode ? "Show All History" : "Compact Mode"}
          </button>
          <button
            onClick={() => {
              setCommandHistory([]);
              setOutputHistory([]);
            }}
            className="text-xs text-terminal-text-dim hover:text-terminal-green px-2 py-1 rounded border border-terminal-border hover:border-terminal-green transition-colors"
          >
            Clear History
          </button>
        </div>

        {compactMode && commandHistory.length > 3 && (
          <div className="text-xs text-terminal-text-dim mb-2 italic">
            {commandHistory.length - 3} earlier commands hidden. Click *Show All
            History* to view.
          </div>
        )}

        {/* Active section content */}
        <div className="mt-6 pt-4 border-t border-terminal-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === "home" && <HomeSection />}
              {activeSection === "about" && <AboutSection />}
              {activeSection === "skills" && <SkillsSection />}
              {activeSection === "projects" && <ProjectsSection />}
              {activeSection === "contact" && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Command history */}
        {(compactMode ? commandHistory.slice(-3) : commandHistory).map(
          (cmd, i) => {
            const index = compactMode ? commandHistory.length - 3 + i : i;
            return (
              <div
                key={`cmd-${index}`}
                className="mb-2 border-l-2 border-terminal-border pl-2 hover:border-terminal-green transition-colors"
              >
                <TerminalPrompt readOnly value={cmd} />
                {outputHistory[index] && (
                  <div
                    className={`pl-4 ${
                      outputHistory[index].type === "error"
                        ? "text-terminal-red"
                        : outputHistory[index].type === "success"
                        ? "text-terminal-green"
                        : outputHistory[index].type === "special"
                        ? "text-terminal-purple"
                        : "text-terminal-text"
                    }`}
                  >
                    {outputHistory[index].content}
                  </div>
                )}
              </div>
            );
          }
        )}

        {/* Current command input */}
        <div className="mt-4 flex items-center">
          {isLoading ? (
            <div className="flex items-center text-terminal-yellow">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Processing command...
            </div>
          ) : (
            <TerminalPrompt onSubmit={handleCommand} />
          )}
        </div>
      </div>
    </div>
  );
}
