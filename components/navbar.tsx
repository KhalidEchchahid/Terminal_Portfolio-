"use client";

import { useState, useEffect } from "react";
import {
  Terminal,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
  X,
  CuboidIcon as Cube,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TerminalTheme } from "@/contexts/terminal-context";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  showTerminal: boolean;
  toggleTerminalMode: () => void;
  theme: TerminalTheme;
}

export default function NavBar({
  activeSection,
  setActiveSection,
  showTerminal,
  toggleTerminalMode,
  theme,
}: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <User className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Code className="h-4 w-4" /> },
    {
      id: "projects",
      label: "Projects",
      icon: <Briefcase className="h-4 w-4" />,
    },
    { id: "contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle section change
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);

    // Get file name based on section
    const fileNames: Record<string, string> = {
      home: "home.sh",
      about: "about.md",
      skills: "skills.json",
      projects: "projects.js",
      contact: "contact.html",
      blog: "blog.md",
      files: "files.txt",
    };

    // Trigger an event to open the editor
    const event = new CustomEvent("openEditor", {
      detail: { section, fileName: fileNames[section] || `${section}.txt` },
    });
    window.dispatchEvent(event);
  };

  // Handle 3D Portfolio navigation
  const handle3DPortfolio = () => {
    window.location.href = "/3d-portfolio";
  };

  const handleBlog = () => {
    window.location.href = "/blog";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${theme.bgHeaderDarkClass}/90 backdrop-blur-md shadow-md`
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className={`font-bold text-lg ${theme.textGreenClass}`}>
              Khalid.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`px-3 py-1.5 rounded flex items-center space-x-1 transition-colors ${
                  activeSection === item.id
                    ? `${theme.bgHeaderLightClass} ${theme.textGreenClass}`
                    : `hover:${theme.bgHeaderLightClass} ${theme.textClass}`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={handleBlog}
              className={`${theme.textBlueClass} hover:${theme.textGreenClass} rounded`}
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </Button>
            {/* 3D Portfolio Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handle3DPortfolio}
              className={`${theme.textBlueClass} hover:${theme.textGreenClass} rounded`}
            >
              <Cube className="h-4 w-4 mr-1" />
              3D Portfolio
            </Button>

            {/* Terminal Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTerminalMode}
              className={`ml-2 ${
                showTerminal ? theme.textGreenClass : theme.textClass
              } rounded`}
            >
              <Terminal className="h-4 w-4 mr-1" />
              {showTerminal ? "Hide Terminal" : "Show Terminal"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handle3DPortfolio}
              className={theme.textBlueClass}
            >
              <Cube className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTerminalMode}
              className={`${
                showTerminal ? theme.textGreenClass : theme.textClass
              }`}
            >
              <Terminal className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${theme.bgHeaderDarkClass}/95 backdrop-blur-md border-t ${theme.borderClass} shadow-lg`}
        >
          <div className="container mx-auto px-4 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 my-1 ${
                  activeSection === item.id
                    ? `${theme.bgHeaderLightClass} ${theme.textGreenClass}`
                    : `hover:${theme.bgHeaderLightClass} ${theme.textClass}`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="flex flex-wrap items-center gap-4 pl-4">
              {/* 3D Portfolio Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handle3DPortfolio}
                className={`${theme.textBlueClass} hover:${theme.textGreenClass} rounded`}
              >
                <Cube className="h-4 w-4 mr-1" />
                3D Portfolio
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleBlog}
                className={`${theme.textBlueClass} hover:${theme.textGreenClass} rounded`}
              >
                <BookOpen className="h-4 w-4" />
                Blog
              </Button>

              {/* Terminal Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTerminalMode}
                className={`ml-2 ${
                  showTerminal ? theme.textGreenClass : theme.textClass
                } rounded`}
              >
                <Terminal className="h-4 w-4 mr-1" />
                {showTerminal ? "Hide Terminal" : "Show Terminal"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
