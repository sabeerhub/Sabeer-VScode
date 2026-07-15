"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
  VscMarkdown,
  VscSettings,
  VscJson,
  VscSymbolParameter,
  VscFileCode
} from "react-icons/vsc";
import { FileItem, WORKSPACE_NAME } from "@/data/workspace";

// Icon chooser based on filename & expansion
export function getFileIcon(item: FileItem, isExpanded?: boolean) {
  if (item.type === "directory") {
    return isExpanded ? (
      <VscFolderOpened className="w-4 h-4 text-[#F1C40F] shrink-0" />
    ) : (
      <VscFolder className="w-4 h-4 text-[#F1C40F] shrink-0" />
    );
  }

  const ext = item.name.split(".").pop();
  switch (ext) {
    case "md":
      return <VscMarkdown className="w-4 h-4 text-[#3794FF] shrink-0" />;
    case "json":
      return <VscJson className="w-4 h-4 text-[#F5B041] shrink-0" />;
    case "ts":
      return <VscSymbolParameter className="w-4 h-4 text-[#3794FF] shrink-0" />;
    case "sh":
      return <VscFileCode className="w-4 h-4 text-[#2ECC71] shrink-0" />;
    default:
      return <VscSettings className="w-4 h-4 text-[#858585] shrink-0" />;
  }
}

interface ExplorerProps {
  files: FileItem[];
  openTabs: string[];
  activeTabPath: string | null;
  expandedFolders: Record<string, boolean>;
  onOpenFile: (path: string) => void;
  onToggleFolder: (path: string) => void;
}

interface FlatVisibleItem {
  item: FileItem;
  depth: number;
}

export default function Explorer({
  files,
  activeTabPath,
  expandedFolders,
  onOpenFile,
  onToggleFolder
}: ExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Flatten only the visible items based on expansion state
  const getFlatVisibleItems = (items: FileItem[], depth = 0): FlatVisibleItem[] => {
    const list: FlatVisibleItem[] = [];
    for (const item of items) {
      list.push({ item, depth });
      if (item.type === "directory" && expandedFolders[item.path] && item.children) {
        list.push(...getFlatVisibleItems(item.children, depth + 1));
      }
    }
    return list;
  };

  const visibleItems = getFlatVisibleItems(files);

  // Sync active path with focused index if there is one
  useEffect(() => {
    if (activeTabPath) {
      const idx = visibleItems.findIndex(v => v.item.path === activeTabPath);
      if (idx !== -1) {
        setFocusedIndex(idx);
      }
    }
  }, [activeTabPath, expandedFolders]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard Navigation Handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (focusedIndex === null) {
      if (visibleItems.length > 0) {
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => {
          if (prev === null) return 0;
          return Math.min(prev + 1, visibleItems.length - 1);
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => {
          if (prev === null) return 0;
          return Math.max(prev - 1, 0);
        });
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        const active = visibleItems[focusedIndex];
        if (active) {
          if (active.item.type === "directory") {
            onToggleFolder(active.item.path);
          } else {
            onOpenFile(active.item.path);
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="flex flex-col h-full bg-[#2D2D30] text-[#CCCCCC] select-none border-r border-[#3C3C3C] w-full overflow-y-auto outline-none focus:ring-1 focus:ring-[#3794FF]/50"
    >
      {/* Workspace Header */}
      <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-bold text-[#858585] uppercase tracking-wider border-b border-[#3C3C3C] shrink-0">
        <span className="flex items-center space-x-1">
          <span>{WORKSPACE_NAME}</span>
        </span>
        <VscChevronDown className="w-3.5 h-3.5 cursor-pointer" />
      </div>

      {/* Explorer Tree List */}
      <div className="flex-1 py-1 overflow-y-auto">
        {visibleItems.map(({ item, depth }, idx) => {
          const isExpanded = !!expandedFolders[item.path];
          const isActive = activeTabPath === item.path;
          const isFocused = focusedIndex === idx;

          return (
            <div
              key={item.path}
              onClick={() => {
                setFocusedIndex(idx);
                if (item.type === "directory") {
                  onToggleFolder(item.path);
                } else {
                  onOpenFile(item.path);
                }
              }}
              className={`flex items-center py-[4px] cursor-pointer transition-all text-xs font-mono group relative ${
                isActive
                  ? "bg-[#3794FF]/10 text-white font-semibold"
                  : "text-[#CCCCCC] hover:bg-[#2A2D2E]/50"
              } ${isFocused ? "outline outline-1 outline-[#3794FF]/40 bg-[#3794FF]/5" : ""}`}
              style={{ paddingLeft: `${(depth + 1) * 12}px` }}
            >
              {/* Active sidebar highlight indicator line */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3794FF]" />
              )}

              {/* Folder Arrow */}
              <span className="w-4 h-4 flex items-center justify-center mr-0.5 shrink-0">
                {item.type === "directory" ? (
                  isExpanded ? <VscChevronDown className="w-3.5 h-3.5 text-[#858585]" /> : <VscChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                ) : (
                  <span className="w-3.5 h-3.5" />
                )}
              </span>

              {/* Type Icon */}
              <span className="mr-2 flex items-center shrink-0">
                {getFileIcon(item, isExpanded)}
              </span>

              {/* Name */}
              <span className="truncate text-[12px]">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
