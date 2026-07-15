"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscSearch, VscFile, VscGear, VscArrowRight } from "react-icons/vsc";
import { WORKSPACE_FILES } from "@/data/workspace";
import { getFlatFileList } from "./WorkspaceContext";

interface CommandPaletteProps {
  isOpen: boolean;
  isQuickOpen: boolean; // True if launched via Ctrl+P (quick open files)
  onClose: () => void;
  onOpenFile: (path: string) => void;
  onToggleTerminal: () => void;
  onToggleSidebar: () => void;
}

interface CommandItem {
  name: string;
  category?: string;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette({
  isOpen,
  isQuickOpen,
  onClose,
  onOpenFile,
  onToggleTerminal,
  onToggleSidebar
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Flat file lists for Quick Open search
  const flatFiles = getFlatFileList(WORKSPACE_FILES);

  // Command palette execution list
  const commands: CommandItem[] = [
    { name: "View: Toggle Integrated Terminal", category: "View", action: onToggleTerminal, shortcut: "Ctrl+`" },
    { name: "View: Toggle Primary Sidebar", category: "View", action: onToggleSidebar, shortcut: "Ctrl+B" },
    { name: "Go to: README.md File", category: "Navigation", action: () => onOpenFile("README.md") },
    { name: "Go to: About Profile Code", category: "Navigation", action: () => onOpenFile("about.ts") },
    { name: "Go to: Professional Experience", category: "Navigation", action: () => onOpenFile("experience.ts") },
    { name: "Go to: Technical Skills Portfolio", category: "Navigation", action: () => onOpenFile("skills.json") },
    { name: "Go to: Project Services", category: "Navigation", action: () => onOpenFile("services.ts") },
    { name: "Go to: Contact Profile Form", category: "Navigation", action: () => onOpenFile("contact.ts") },
    { name: "Action: Trigger Confetti Animation", category: "System", action: () => {
      // Dispatch custom custom browser event
      window.dispatchEvent(new CustomEvent("trigger-confetti"));
    }},
    { name: "Preferences: Toggle Theme (Dark / High Contrast)", category: "Preferences", action: () => {} }
  ];

  // Fuzzy match filters
  const filteredFiles = flatFiles.filter(file =>
    file.name.toLowerCase().includes(query.toLowerCase()) ||
    file.path.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.category && cmd.category.toLowerCase().includes(query.toLowerCase()))
  );

  const activeItemsCount = isQuickOpen ? filteredFiles.length : filteredCommands.length;

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, isQuickOpen]);

  // Handle keyboard arrow cycle & close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, activeItemsCount));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + activeItemsCount) % Math.max(1, activeItemsCount));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        triggerSelection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, query, activeItemsCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerSelection = () => {
    if (isQuickOpen) {
      const selectedFile = filteredFiles[selectedIndex];
      if (selectedFile) {
        onOpenFile(selectedFile.path);
        onClose();
      }
    } else {
      const selectedCmd = filteredCommands[selectedIndex];
      if (selectedCmd) {
        selectedCmd.action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-[50px] font-mono select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          onClick={e => e.stopPropagation()}
          className="w-[500px] max-w-[92vw] bg-[#252526] border border-[#3C3C3C] shadow-2xl rounded-lg overflow-hidden flex flex-col"
        >
          {/* Top Search Input Row */}
          <div className="flex items-center px-3 py-2 bg-[#252526] border-b border-[#3C3C3C] text-xs">
            {isQuickOpen ? (
              <VscSearch className="w-4 h-4 text-[#858585] mr-2" />
            ) : (
              <VscArrowRight className="w-4 h-4 text-[#3794FF] mr-2" />
            )}
            <input
              ref={inputRef}
              type="text"
              placeholder={isQuickOpen ? "Search files by name (e.g. skills.json)..." : "Type a command to execute (e.g. Toggle Terminal)..."}
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="bg-transparent border-none outline-none text-white w-full text-xs placeholder-[#858585] py-0.5"
            />
          </div>

          {/* List area */}
          <div className="max-h-[280px] overflow-y-auto py-1 text-xs">
            {isQuickOpen ? (
              // Quick Open File Search Rendering
              filteredFiles.length > 0 ? (
                filteredFiles.map((file, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={file.path}
                      onClick={() => {
                        onOpenFile(file.path);
                        onClose();
                      }}
                      className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                        isSelected ? "bg-[#264F78] text-white" : "text-[#CCCCCC] hover:bg-[#2A2D2E]/40"
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <VscFile className="w-3.5 h-3.5 text-[#858585] shrink-0" />
                        <span className="font-semibold text-[12px]">{file.name}</span>
                        <span className="text-[10px] text-[#858585] truncate opacity-80">{file.path}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-center text-[#858585]">No matching files found.</div>
              )
            ) : (
              // Command Palette execution items
              filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={cmd.name}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                        isSelected ? "bg-[#264F78] text-white" : "text-[#CCCCCC] hover:bg-[#2A2D2E]/40"
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <VscGear className="w-3.5 h-3.5 text-[#3794FF] shrink-0" />
                        {cmd.category && (
                          <span className="text-[10px] opacity-60 text-white font-bold tracking-wider mr-1 uppercase bg-[#3C3C3C]/80 px-1 py-0.5 rounded">
                            {cmd.category}
                          </span>
                        )}
                        <span className="text-[12px]">{cmd.name}</span>
                      </div>
                      {cmd.shortcut && (
                        <kbd className="bg-[#1E1E1E]/80 px-1.5 py-0.5 rounded border border-[#3C3C3C] text-[9px] text-[#858585] shrink-0">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-center text-[#858585]">No matching commands found.</div>
              )
            )}
          </div>

          {/* Mini-guide bottom row */}
          <div className="bg-[#1E1E1E] border-t border-[#3C3C3C] py-1 px-3 text-[10px] text-[#858585] flex items-center justify-between select-none">
            <span>Use <kbd>↑</kbd> <kbd>↓</kbd> keys to cycle • <kbd>Enter</kbd> to select</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
