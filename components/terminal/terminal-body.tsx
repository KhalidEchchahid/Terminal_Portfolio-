"use client";

import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalContext } from "@/contexts/terminal-context";
import TerminalWelcome from "./terminal-welcome";
import TerminalHistory from "./terminal-history";
import TerminalSection from "./terminal-section";
import TerminalInput from "./terminal-input";

export default function TerminalBody() {
  const { activeSection, isProcessing } = useContext(TerminalContext);

  return (
    <div>
      {/* Welcome message */}
      <TerminalWelcome />

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
            <TerminalSection section={activeSection} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Command history */}
      <TerminalHistory />

      {/* Current command input */}
      <div className="mt-4 flex items-center">
        <TerminalInput isProcessing={isProcessing} />
      </div>
    </div>
  );
}
