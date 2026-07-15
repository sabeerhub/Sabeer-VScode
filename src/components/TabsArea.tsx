"use client";

import React, { useRef, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { WORKSPACE_FILES, FileItem } from "@/data/workspace";
import { getFileIcon } from "./Explorer";
import { useWorkspace } from "./WorkspaceContext";

interface TabsAreaProps {
  openTabs: string[];
  activeTabPath: string | null;
  onSelectTab: (path: string) => void;
  onCloseTab: (path: string) => void;
}

// Find a file description helper from flat search
export function findFileByPath(items: FileItem[], path: string): FileItem | null {
  for (const item of items) {
    if (item.path === path) return item;
    if (item.type === "directory" && item.children) {
      const found = findFileByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
}

export default function TabsArea({ openTabs, activeTabPath, onSelectTab, onCloseTab }: TabsAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = useWorkspace();

  // Scroll active tab into view if needed
  useEffect(() => {
    if (activeTabPath && containerRef.current) {
      const activeEl = containerRef.current.querySelector(`[data-path="${activeTabPath}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }
  }, [activeTabPath]);

  if (openTabs.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="h-9 bg-[#2D2D30] border-b border-[#3C3C3C] flex items-center overflow-x-auto select-none overflow-y-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {openTabs.map((path) => {
        const file = findFileByPath(WORKSPACE_FILES, path);
        if (!file) return null;

        const isActive = activeTabPath === path;
        // Check if the file is one of our mock modified files
        const isModified = state.gitModifiedFiles.includes(file.name);

        return (
          <div
            key={path}
            data-path={path}
            onClick={() => onSelectTab(path)}
            className={`h-full flex items-center px-4 border-r border-[#3C3C3C] cursor-pointer transition-colors relative shrink-0 text-xs font-mono group ${
              isActive
                ? "bg-[#1E1E1E] text-white border-t-[2px] border-t-[#3794FF]"
                : "text-[#858585] hover:bg-[#2B2D2E]/40 hover:text-[#CCCCCC]"
            }`}
          >
            {/* File Icon */}
            <span className="mr-2 flex items-center">
              {getFileIcon(file)}
            </span>

            {/* File Name */}
            <span className={`mr-2.5 text-[11px] font-normal ${isModified ? "italic text-white/80" : ""}`}>
              {file.name}
            </span>

            {/* Close or Unsaved indicator */}
            <div className="w-4 h-4 flex items-center justify-center relative">
              {/* If modified, show solid dot; show 'X' close button on hover */}
              {isModified ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#CCCCCC] transition group-hover:scale-0 group-hover:opacity-0" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(path);
                    }}
                    className="absolute inset-0 p-0.5 rounded hover:bg-[#3C3C3C] text-[#858585] hover:text-white transition duration-150 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <VscClose className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(path);
                  }}
                  className="p-0.5 rounded hover:bg-[#3C3C3C] text-[#858585] hover:text-white transition duration-150 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <VscClose className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Underline for mobile status */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3794FF] sm:hidden" />
            )}
          </div>
        );
      })}
    </div>
  );
}
