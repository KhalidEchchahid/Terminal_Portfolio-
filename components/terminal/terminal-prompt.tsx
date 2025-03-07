"use client";

import type React from "react";

import { useState, useEffect, useRef, useContext } from "react";
import { Cursor } from "react-simple-typewriter";
import { TerminalContext } from "@/contexts/terminal-context";
import { useCommandSuggestions } from "@/hooks/use-command-suggestion";

interface TerminalPromptProps {
  onSubmit?: (command: string) => void;
  readOnly?: boolean;
  value?: string;
}

export default function TerminalPrompt({
  onSubmit,
  readOnly = false,
  value = "",
}: TerminalPromptProps) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { commandHistory, theme } = useContext(TerminalContext);

  const {
    suggestions,
    activeSuggestion,
    showSuggestions,
    setShowSuggestions,
    handleSuggestionClick,
    navigateSuggestions,
    getSuggestions,
  } = useCommandSuggestions(input);

  useEffect(() => {
    if (!readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [readOnly]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onSubmit && input.trim()) {
        onSubmit(input);
        setInput("");
        setHistoryIndex(-1);
        setShowSuggestions(false);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Navigate command history
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // Navigate command history
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();

      if (showSuggestions && suggestions.length > 0) {
        // Use the active suggestion
        setInput(suggestions[activeSuggestion]);
        setShowSuggestions(false);
      } else {
        // Show suggestions
        getSuggestions(input);
        setShowSuggestions(true);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (showSuggestions) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        navigateSuggestions(e.key === "ArrowRight" ? 1 : -1);
      }
    }
  };

  return (
    <div className="relative">
      <div className={`flex items-center ${theme.textClass}`}>
        <span className={theme.textGreenClass + " mr-2"}>➜</span>
        <span className={theme.textYellowClass + " mr-2"}>~/portfolio</span>
        <span className={theme.textBlueClass + " mr-2"}>$</span>

        {readOnly ? (
          <div className="flex-1">{value}</div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value.trim() !== "") {
                getSuggestions(e.target.value);
              } else {
                setShowSuggestions(false);
              }
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none p-0"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        )}

        {!readOnly && input === "" && (
          <Cursor cursorStyle="_" cursorColor="#9ca3af" />
        )}
      </div>

      {/* Command suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`absolute bottom-10 left-0  z-50 mt-1 w-64 max-h-48 overflow-y-auto ${theme.bgHeaderClass} border ${theme.borderClass} rounded-md shadow-lg `}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-3 py-1  cursor-pointer ${
                index === activeSuggestion
                  ? `${theme.bgHeaderLightClass} ${theme.textYellowClass}`
                  : `hover:${theme.bgHeaderLightClass}`
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
