"use client";

import React from "react";

export default function Minimap({ content }: { content: string }) {
  // We'll render a beautiful high-fidelity micro-scroller resembling a minimap sidebar
  const lines = content ? content.split("\n") : [];

  return (
    <div className="w-16 bg-[#1E1E1E] border-l border-[#3C3C3C] hidden lg:flex flex-col select-none py-1 overflow-hidden opacity-45 hover:opacity-80 transition-opacity duration-150 relative h-full">
      <div className="absolute top-0 left-0 w-full h-8 bg-[#264F78]/20 border-y border-[#264F78]/40 pointer-events-none" />
      <div className="flex flex-col space-y-[1px] px-[2px] leading-none text-[3px] font-mono scale-90 origin-top">
        {lines.map((line, idx) => {
          if (idx > 150) return null; // cap minimap height
          // Create simulated syntax text rows
          const trimmed = line.trim();
          let colorClass = "bg-[#858585]";
          if (trimmed.startsWith("import") || trimmed.startsWith("export")) {
            colorClass = "bg-[#C586C0]";
          } else if (trimmed.startsWith("const") || trimmed.startsWith("function") || trimmed.startsWith("let")) {
            colorClass = "bg-[#569CD6]";
          } else if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
            colorClass = "bg-[#6A9955]";
          } else if (trimmed.includes(":") || trimmed.includes("=")) {
            colorClass = "bg-[#9CDCFE]";
          } else if (trimmed.length > 0) {
            colorClass = "bg-[#D4D4D4]";
          }

          // Render simulated width
          const widthPct = Math.min(100, Math.max(10, trimmed.length * 1.5));

          return (
            <div key={idx} className="flex h-[2px] w-full">
              {trimmed.length > 0 ? (
                <div
                  className={`h-full rounded-[1px] ${colorClass}`}
                  style={{ width: `${widthPct}%`, marginLeft: `${(line.length - trimmed.length) * 0.8}px` }}
                />
              ) : (
                <div className="h-[2px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
