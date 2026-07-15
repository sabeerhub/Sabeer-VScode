"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface EditorAreaProps {
  filePath: string;
  content: string;
  language: string;
}

export default function EditorArea({ filePath, content, language }: EditorAreaProps) {
  const [loading, setLoading] = useState(true);

  // Translate custom language extensions to monaco standard language names
  const getMonacoLanguage = (lang: string) => {
    if (lang === "typescript" || lang === "ts") return "typescript";
    if (lang === "json") return "json";
    if (lang === "markdown" || lang === "md") return "markdown";
    if (lang === "shell" || lang === "sh") return "shell";
    return "plaintext";
  };

  // Setup options for pixel-perfect VS Code simulation with active minimap!
  const editorOptions = {
    fontSize: 13,
    fontFamily: "var(--font-jetbrains-mono), Consolas, Menlo, Monaco, monospace",
    lineHeight: 20,
    minimap: {
      enabled: true,
      side: "right" as const,
      maxColumn: 80,
      renderCharacters: true,
      showSlider: "always" as const
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    cursorBlinking: "blink" as const,
    cursorSmoothCaretAnimation: "on" as const,
    padding: { top: 12, bottom: 12 },
    lineNumbersMinChars: 3,
    glyphMargin: false,
    folding: true,
    renderLineHighlight: "all" as const,
    scrollbar: {
      vertical: "visible" as const,
      horizontal: "visible" as const,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      useShadows: false,
    },
    readOnly: true,
    theme: "vs-dark",
  };

  // Fallback simple view rendering line by line with active highlight
  const lines = content ? content.split("\n") : [];

  return (
    <div key={filePath} className="flex-1 h-full bg-[#1E1E1E] flex flex-col relative overflow-hidden select-text">
      {/* Quick Loading Indicator or custom visual overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#1E1E1E] flex items-center justify-center text-xs text-[#858585] font-mono z-20">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-5 h-5 border-2 border-t-[#3794FF] border-[#3C3C3C] rounded-full animate-spin" />
            <span>Initializing Monaco Editor...</span>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex-1 w-full h-full">
        <MonacoEditor
          height="100%"
          language={getMonacoLanguage(language)}
          value={content}
          theme="vs-dark"
          options={editorOptions}
          loading={<div />}
          onMount={() => {
            setLoading(false);
          }}
        />
      </div>

      {/* Elegant Fallback code frame if Monaco is loading or client is slow */}
      {loading && (
        <div className="absolute inset-0 bg-[#1E1E1E] overflow-y-auto px-4 py-3 text-xs font-mono leading-6 flex select-text pointer-events-none">
          <div className="text-right text-[#858585] select-none pr-4 border-r border-[#3C3C3C] min-w-[2.5rem]">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="pl-4 text-[#D4D4D4] whitespace-pre flex-1 overflow-x-auto">
            {lines.map((line, i) => (
              <div key={i} className="hover:bg-[#2A2D2E] rounded px-1 min-h-[1.5rem] transition">
                {line || " "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
