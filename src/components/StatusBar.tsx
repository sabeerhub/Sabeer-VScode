"use client";

import React from "react";
import { VscGitBranch, VscSync, VscCheckAll, VscBell } from "react-icons/vsc";

interface StatusBarProps {
  activeTabPath: string | null;
  openPalette: () => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
}

export default function StatusBar({ activeTabPath, openPalette, terminalOpen, setTerminalOpen }: StatusBarProps) {
  // Extract simple stats for active file
  const fileExtension = activeTabPath ? activeTabPath.split(".").pop()?.toUpperCase() : "TXT";

  return (
    <div className="h-6 bg-[#007ACC] text-white flex items-center justify-between px-2 text-[11px] select-none shrink-0 z-50">
      {/* Left items */}
      <div className="flex items-center space-x-3">
        <a
          href="https://github.com/sabeerhub"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1F8AD2] hover:bg-[#1E7EBE] px-2 py-0.5 flex items-center space-x-1 font-bold rounded cursor-pointer transition"
        >
          <VscGitBranch className="w-3.5 h-3.5" />
          <span>main*</span>
        </a>
        <div className="flex items-center space-x-1 hover:bg-[#1F8AD2] px-1.5 py-0.5 rounded cursor-pointer transition">
          <VscSync className="w-3.5 h-3.5 animate-spin" />
        </div>
        <div
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="hidden sm:flex items-center space-x-1 hover:bg-[#1F8AD2] px-1.5 py-0.5 rounded cursor-pointer transition"
        >
          <span>Terminal: {terminalOpen ? "ON" : "OFF"}</span>
        </div>
        <div
          onClick={openPalette}
          className="hover:bg-[#1F8AD2] px-1.5 py-0.5 rounded cursor-pointer transition flex items-center space-x-1 font-semibold"
        >
          <span>Command Palette</span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center space-x-3.5">
        <div className="hidden md:flex items-center space-x-1 hover:bg-[#1F8AD2] px-1.5 py-0.5 rounded cursor-pointer transition">
          <VscCheckAll className="w-3.5 h-3.5" />
          <span>Prettier</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1">
          <span>Ln 1, Col 1</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1">
          <span>UTF-8</span>
        </div>
        <div className="bg-[#007ACC] hover:bg-[#1F8AD2] px-1.5 py-0.5 rounded cursor-pointer transition font-medium">
          <span>{fileExtension === "TS" ? "TypeScript JSX" : fileExtension}</span>
        </div>
        <div className="flex items-center space-x-1 hover:bg-[#1F8AD2] px-1 py-0.5 rounded cursor-pointer transition">
          <VscBell className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
