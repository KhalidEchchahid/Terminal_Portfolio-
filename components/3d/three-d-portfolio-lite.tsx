"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ThreeDPortfolioLite() {
  const [activeSection, setActiveSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(0);

  // Sections data
  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "University Collaboration Platform",
      description:
        "A comprehensive platform that facilitates collaboration between students and professors. Features include file sharing, online requests for recommendation letters, announcement boards, and blogs.",
      technologies: [
        "React",
        "Spring Boot",
        "Spring Security",
        "Spring Cloud",
        "Microservices",
        "PostgreSQL",
        "RabbitMQ",
      ],
      image: "/placeholder.svg?height=300&width=600",
      color: "#89b4fa", // Blue
    },
    {
      id: 2,
      title: "Intra-Enterprise Collaboration System",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs for internal communication.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#a6e3a1", // Green
    },
    {
      id: 3,
      title: "Gladiator: 2D Fighting Game",
      description:
        "A 2D fighting game developed from scratch using the C programming language and GTK for the graphical user interface. The game includes various mechanics, characters, and visual effects.",
      technologies: ["C", "GTK Library"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#f9e2af", // Yellow
    },
    {
      id: 4,
      title: "Maze Pathfinder",
      description:
        "A Next.js web application that visualizes Dijkstra's Algorithm and Breadth-First Search (BFS) for maze pathfinding, with backend processing handled by a C++ web server.",
      technologies: ["C++", "Next.js 15", "Tailwind CSS"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#f38ba8", // Red
    },
  ];

  // Skills data
  const skillCategories = [
    {
      name: "Frontend",
      color: "#89b4fa", // Blue
      skills: [
        { name: "React.js", level: 0.9 },
        { name: "Next.js", level: 0.85 },
        { name: "Tailwind CSS", level: 0.9 },
        { name: "HTML/CSS", level: 0.95 },
        { name: "JavaScript", level: 0.9 },
      ],
    },
    {
      name: "Backend",
      color: "#a6e3a1", // Green
      skills: [
        { name: "Spring Boot", level: 0.8 },
        { name: "Node.js", level: 0.75 },
        { name: "Express.js", level: 0.7 },
        { name: "PHP", level: 0.6 },
      ],
    },
    {
      name: "Databases",
      color: "#f9e2af", // Yellow
      skills: [
        { name: "MongoDB", level: 0.85 },
        { name: "PostgreSQL", level: 0.7 },
        { name: "MySQL", level: 0.75 },
        { name: "Oracle", level: 0.6 },
      ],
    },
    {
      name: "DevOps",
      color: "#f38ba8", // Red
      skills: [
        { name: "Docker", level: 0.7 },
        { name: "Git", level: 0.85 },
        { name: "Linux", level: 0.75 },
      ],
    },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle project navigation
  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-terminal-bg flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-terminal-green border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-terminal-green text-lg">
          Loading Portfolio Experience...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-header-dark/80 backdrop-blur-md border-b border-terminal-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Terminal
            </Button>
          </Link>

          <div className="flex space-x-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className={
                  activeSection === section.id
                    ? "bg-terminal-green text-black hover:bg-terminal-green/90"
                    : ""
                }
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 pb-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
                <h2 className="text-2xl font-bold text-terminal-green mb-6">
                  About Me
                </h2>

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
                      <h3 className="text-lg font-bold text-terminal-yellow mb-2">
                        Personal Info
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <span className="text-terminal-text-dim">Name:</span>{" "}
                          Khalid Echchahid
                        </li>
                        <li>
                          <span className="text-terminal-text-dim">Age:</span>{" "}
                          22 years old
                        </li>
                        <li>
                          <span className="text-terminal-text-dim">
                            Location:
                          </span>{" "}
                          Fez, Morocco
                        </li>
                        <li>
                          <span className="text-terminal-text-dim">Email:</span>{" "}
                          echchahidkhalid7@gmail.com
                        </li>
                        <li>
                          <span className="text-terminal-text-dim">
                            Languages:
                          </span>{" "}
                          English, Arabic, French
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-lg mb-4">
                        I am a software engineering student and full-stack
                        developer with a passion for building innovative web
                        applications.
                      </p>
                      <p className="text-terminal-text-dim mb-4">
                        Currently pursuing a degree in Software Engineering and
                        Integration of Computer Systems at the Faculty of
                        Sciences and Techniques, Mohammedia.
                      </p>
                    </div>

                    <div className="bg-terminal-header p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-terminal-yellow mb-2">
                        Education
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold">
                            Software Engineering and Integration of Computer
                            Systems
                          </p>
                          <p className="text-terminal-text-dim">
                            Faculty of Sciences and Techniques, Mohammedia
                          </p>
                          <p className="text-sm text-terminal-green">
                            Ongoing - Graduation Year: 2026
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">
                            Bachelor in Mathematics and Computer Science
                          </p>
                          <p className="text-terminal-text-dim">
                            Faculty of Sciences, Fez
                          </p>
                          <p className="text-sm text-terminal-green">
                            September 2020 - June 2023
                          </p>
                          <p className="text-sm text-terminal-green">
                            Grade: A
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-terminal-header p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-terminal-yellow mb-2">
                        Experience
                      </h3>
                      <div>
                        <p className="font-semibold">
                          Freelance Full-Stack Developer
                        </p>
                        <p className="text-terminal-text-dim">
                          Self-Employed, Remote
                        </p>
                        <p className="text-sm text-terminal-green mb-2">
                          Since January 2024
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>
                            Built custom e-commerce platforms and admin
                            dashboards
                          </li>
                          <li>
                            Handled end-to-end development from UI design to
                            MongoDB implementation
                          </li>
                          <li>
                            Developed systems for tracking products, orders, and
                            customers
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
                <h2 className="text-2xl font-bold text-terminal-green mb-6">
                  Skills & Technologies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-terminal-header p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        {category.name}
                      </h3>

                      <div className="space-y-4">
                        {category.skills.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span>{skill.name}</span>
                              <span
                                className="text-xs"
                                style={{ color: category.color }}
                              >
                                {Math.round(skill.level * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-terminal-bg rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level * 100}%` }}
                                transition={{
                                  duration: 1,
                                  delay: index * 0.1 + 0.2,
                                }}
                                className="h-2 rounded-full"
                                style={{ backgroundColor: category.color }}
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-terminal-header p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-terminal-yellow mb-4">
                    Additional Skills
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "Problem Solving",
                      "Teamwork",
                      "Communication",
                      "Resilience",
                      "Strategic Thinking",
                      "UI/UX Design",
                      "Agile Methodology",
                      "Project Management",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="bg-terminal-bg px-3 py-2 rounded-md text-center text-sm hover:bg-terminal-header-light transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
                <h2 className="text-2xl font-bold text-terminal-green mb-6">
                  Projects
                </h2>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={projects[activeProject].id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="bg-terminal-header p-6 rounded-lg"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                projects[activeProject].image ||
                                "/placeholder.svg"
                              }
                              alt={projects[activeProject].title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {projects[activeProject].technologies.map(
                              (tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 text-xs rounded-full"
                                  style={{
                                    backgroundColor: `${projects[activeProject].color}33`,
                                    color: projects[activeProject].color,
                                  }}
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>

                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Github className="h-4 w-4" /> GitHub
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-4 w-4" /> Demo
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3
                            className="text-xl font-bold mb-3"
                            style={{ color: projects[activeProject].color }}
                          >
                            {projects[activeProject].title}
                          </h3>
                          <p className="text-terminal-text-dim mb-4">
                            {projects[activeProject].description}
                          </p>

                          <div className="bg-terminal-bg p-3 rounded-md">
                            <div className="flex items-center mb-2">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{
                                  backgroundColor:
                                    projects[activeProject].color,
                                }}
                              ></div>
                              <span className="text-sm font-medium">
                                Key Features
                              </span>
                            </div>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-terminal-text-dim">
                              <li>Responsive design for all devices</li>
                              <li>Secure authentication and authorization</li>
                              <li>Real-time updates and notifications</li>
                              <li>Comprehensive documentation</li>
                              <li>Automated testing suite</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevProject}
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </Button>

                    <div className="flex space-x-1">
                      {projects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveProject(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === activeProject
                              ? "bg-terminal-green"
                              : "bg-terminal-text-dim"
                          }`}
                          aria-label={`Go to project ${index + 1}`}
                        ></button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextProject}
                      className="flex items-center gap-1"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border">
                <h2 className="text-2xl font-bold text-terminal-green mb-6">
                  Contact Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-terminal-header p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-terminal-yellow mb-4">
                        Contact Information
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-terminal-blue">
                            Email
                          </p>
                          <p>echchahidkhalid7@gmail.com</p>
                          <p>khalid.echchahid@usmba.ac.ma</p>
                        </div>

                        <div>
                          <p className="font-medium text-terminal-green">
                            Phone
                          </p>
                          <p>+212-645557609</p>
                        </div>

                        <div>
                          <p className="font-medium text-terminal-red">
                            Location
                          </p>
                          <p>Fez, Morocco</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-terminal-header p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-terminal-yellow mb-4">
                        Social Links
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-terminal-purple">
                            GitHub
                          </p>
                          <a
                            href="https://github.com/khalid-echchahid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terminal-text-dim hover:text-terminal-text transition-colors"
                          >
                            github.com/khalid-echchahid
                          </a>
                        </div>

                        <div>
                          <p className="font-medium text-terminal-blue">
                            LinkedIn
                          </p>
                          <a
                            href="https://linkedin.com/in/khalid-echchahid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terminal-text-dim hover:text-terminal-text transition-colors"
                          >
                            linkedin.com/in/khalid-echchahid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-terminal-header p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-terminal-yellow mb-4">
                      Send Me a Message
                    </h3>

                    <form className="space-y-4">
                      <div>
                        <label className="block text-terminal-text-dim mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-terminal-text-dim mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
                          placeholder="Your email"
                        />
                      </div>

                      <div>
                        <label className="block text-terminal-text-dim mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
                          placeholder="Subject"
                        />
                      </div>

                      <div>
                        <label className="block text-terminal-text-dim mb-1">
                          Message
                        </label>
                        <textarea
                          className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
                          placeholder="Your message"
                          rows={5}
                        ></textarea>
                      </div>

                      <Button className="w-full bg-terminal-green text-black hover:bg-terminal-green/90">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Helper component for Link to avoid Next.js import
function Link({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  if (href.startsWith("/")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
