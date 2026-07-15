"use client";

import React, { useState, useEffect, useRef } from "react";
import { VscTerminal, VscClose, VscTrash } from "react-icons/vsc";
import confetti from "canvas-confetti";

interface TerminalPanelProps {
  onOpenFile: (path: string) => void;
  onClose: () => void;
}

interface LogLine {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalPanel({ onOpenFile, onClose }: TerminalPanelProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setFocusedHistoryIndex] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([
    { type: "output", text: "==========================================================" },
    { type: "output", text: "   ____       _                      _    _       _       " },
    { type: "output", text: "  / ___| __ _| |__   ___  ___ _ __  | |  | |     | |      " },
    { type: "output", text: "  \\___ \\ / _` | '_ \\ / _ \\/ _ \\ '__| | |  | |     | |      " },
    { type: "output", text: "   ___) | (_| | |_) |  __/  __/ |    | |__| |___  | |___   " },
    { type: "output", text: "  |____/ \\__,_|_.__/ \\___|\\___|_|     \\____/_____| |_____| " },
    { type: "output", text: "==========================================================" },
    { type: "output", text: "Sabeer Interactive Shell — Type 'help' to list operations." },
    { type: "output", text: "Try running: npm run portfolio" },
    { type: "output", text: "" }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to end on log additions
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Focus terminal prompt on click anywhere inside panel
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Commands list for suggestions
  const COMMAND_LIST = [
    "help", "about", "projects", "skills", "contact", "resume", "clear", "whoami", "github", "linkedin", "npm run portfolio"
  ];

  // Shell execute logic
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Append raw input log
    const nextLogs = [...logs, { type: "input" as const, text: `sabeer@portfolio-workspace:~$ ${trimmed}` }];
    const nextHistory = [...history, trimmed];
    setHistory(nextHistory);
    setFocusedHistoryIndex(null);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();

    // Command parser
    switch (command) {
      case "clear":
        setLogs([]);
        return;

      case "help":
        nextLogs.push(
          { type: "output", text: "Available CLI Commands:" },
          { type: "output", text: "  help               - List all terminal operations" },
          { type: "output", text: "  about              - Detail my professional profile and location" },
          { type: "output", text: "  projects           - Log the complete case study listing" },
          { type: "output", text: "  skills             - Detail structured technology matrixes" },
          { type: "output", text: "  contact            - Print my active channels and phone" },
          { type: "output", text: "  resume             - Open / trigger my latest PDF resume download" },
          { type: "output", text: "  whoami             - Print current session details" },
          { type: "output", text: "  github | linkedin  - Open external web redirects" },
          { type: "output", text: "  npm run portfolio  - Execute cases dashboard initializer with confetti!" }
        );
        break;

      case "about":
        nextLogs.push(
          { type: "output", text: "Mustapha Abdulsalam (Sabeer) - Profile Summary" },
          { type: "output", text: "  Role:      Senior Staff Frontend Engineer & UI Designer" },
          { type: "output", text: "  Location:  Dutse, Jigawa State, Nigeria" },
          { type: "output", text: "  Specialty: High-fidelity web replicas, design systems, and fast single page engines." },
          { type: "output", text: "  Bio:       Dedicated to creating high-performance, accessible, and breathtaking interfaces." }
        );
        break;

      case "whoami":
        nextLogs.push(
          { type: "output", text: "Active Session User: Guest Officer" },
          { type: "output", text: "  OS Engine:  VS-Code Replica Workspace OS v2.0" },
          { type: "output", text: "  Encoding:   UTF-8" },
          { type: "output", text: "  Shell:      Interactive synthetic bash emulator" }
        );
        break;

      case "projects":
        nextLogs.push(
          { type: "output", text: "Available Case Studies (14 Projects):" },
          { type: "output", text: "  1.  Zero Bank                    8.  Virtual Topup" },
          { type: "output", text: "  2.  FUD Health Mgmt System       9.  iCall Pro" },
          { type: "output", text: "  3.  TimeLux                      10. Sabeer Xpress" },
          { type: "output", text: "  4.  Spark Chat                   11. Schlverse" },
          { type: "output", text: "  5.  Connect Call                 12. SubmitIV" },
          { type: "output", text: "  6.  WeatherView                  13. EventVerse" },
          { type: "output", text: "  7.  Aura Pay                     14. TIME-NG" },
          { type: "output", text: "Type: 'open projects/<project_id>.json' to view files in editor." }
        );
        break;

      case "skills":
        nextLogs.push(
          { type: "output", text: "Core Technical Capabilities:" },
          { type: "output", text: "  Languages:  TypeScript, JavaScript (ES6+), HTML5, CSS3, SQL, Python" },
          { type: "output", text: "  Frameworks: Next.js 15, React 19, Tailwind CSS v4, Framer Motion, Recharts" },
          { type: "output", text: "  Databases:  Supabase, PostgreSQL, Firebase, MongoDB, PostgreSQL" },
          { type: "output", text: "  Tooling:    Git & GitHub, Figma workspace designs, Monaco Engine" }
        );
        break;

      case "contact":
        nextLogs.push(
          { type: "output", text: "Contact Details:" },
          { type: "output", text: "  Email:     masabeer60@gmail.com" },
          { type: "output", text: "  Phone:     +234 814 624 0938" },
          { type: "output", text: "  GitHub:    https://github.com/sabeerhub" },
          { type: "output", text: "  LinkedIn:  https://linkedin.com/in/masabeer" }
        );
        break;

      case "resume":
        nextLogs.push({ type: "output", text: "Simulating resume transmission... Download triggered in browser." });
        if (typeof window !== "undefined") {
          window.open("https://linkedin.com/in/masabeer", "_blank");
        }
        break;

      case "github":
        nextLogs.push({ type: "output", text: "Redirecting to GitHub workspace profile..." });
        if (typeof window !== "undefined") {
          window.open("https://github.com/sabeerhub", "_blank");
        }
        break;

      case "linkedin":
        nextLogs.push({ type: "output", text: "Redirecting to LinkedIn professional dashboard..." });
        if (typeof window !== "undefined") {
          window.open("https://linkedin.com/in/masabeer", "_blank");
        }
        break;

      case "npm":
        if (parts[1] === "run" && parts[2] === "portfolio") {
          nextLogs.push(
            { type: "output", text: "🔥 INITIALIZING CASE STUDIES PANEL SEQUENCE..." },
            { type: "output", text: "✔ Launching READMECase documentation board." }
          );
          confetti({
            particleCount: 180,
            spread: 80,
            origin: { y: 0.6 }
          });
          onOpenFile("README.md");
        } else {
          nextLogs.push({ type: "error", text: "npm error: Unknown script argument. Try: 'npm run portfolio'" });
        }
        break;

      case "open":
        // Handle open files (e.g. open about.ts)
        if (parts[1]) {
          const targetPath = parts[1];
          nextLogs.push({ type: "output", text: `Opening file buffer at: ${targetPath}` });
          onOpenFile(targetPath);
        } else {
          nextLogs.push({ type: "error", text: "Usage: open <file_path>" });
        }
        break;

      default:
        nextLogs.push({ type: "error", text: `bash: command not found: ${command}. Type 'help' for suggestions.` });
        break;
    }

    setLogs(nextLogs);
  };

  // Up / Down arrow index parsing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setFocusedHistoryIndex(nextIdx);
      setCurrentInput(history[nextIdx]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0 || historyIndex === null) return;
      if (historyIndex === history.length - 1) {
        setFocusedHistoryIndex(null);
        setCurrentInput("");
      } else {
        const nextIdx = historyIndex + 1;
        setFocusedHistoryIndex(nextIdx);
        setCurrentInput(history[nextIdx]);
      }
    }

    // Auto-complete suggestion using Tab key
    if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMAND_LIST.find(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (match) {
        setCurrentInput(match);
      }
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="h-56 bg-[#1E1E1E] border-t border-[#3C3C3C] flex flex-col font-mono text-xs text-[#CCCCCC] select-text shrink-0 z-40 relative"
    >
      {/* Title bar */}
      <div className="h-9 bg-[#252526] border-b border-[#3C3C3C] flex items-center justify-between px-4 text-[#858585] select-none shrink-0">
        <div className="flex items-center space-x-2">
          <VscTerminal className="w-4 h-4 text-[#3794FF]" />
          <span className="text-white font-semibold">terminal</span>
          <span className="text-[10px] text-[#858585]/60">(bash emulator)</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-3 text-white">
          <button
            onClick={() => setLogs([])}
            title="Clear Console output"
            className="p-1 rounded hover:bg-[#3C3C3C] transition"
          >
            <VscTrash className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Collapse Panel"
            className="p-1 rounded hover:bg-[#3C3C3C] transition"
          >
            <VscClose className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal printing outputs logs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 cursor-text">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`leading-relaxed whitespace-pre-wrap ${
              log.type === "error"
                ? "text-red-400"
                : log.type === "input"
                  ? "text-white font-bold"
                  : "text-[#D4D4D4]"
            }`}
          >
            {log.text}
          </div>
        ))}

        {/* Prompt Input Row */}
        <div className="flex items-center text-white font-bold select-all leading-relaxed">
          <span className="text-[#3794FF] shrink-0 mr-1.5">sabeer@portfolio-workspace:~$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white text-xs w-full caret-transparent select-text"
              autoFocus
            />
            {/* Blinking prompt block cursor element */}
            <span
              className="absolute pointer-events-none h-4 w-2 bg-[#3794FF]/80 animate-pulse"
              style={{
                left: `${currentInput.length * 7.2}px`,
                display: "inline-block"
              }}
            />
          </div>
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
