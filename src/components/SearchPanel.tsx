"use client";

import React, { useState } from "react";
import { VscSearch, VscFile, VscSearchStop } from "react-icons/vsc";
import { WORKSPACE_FILES, FileItem } from "@/data/workspace";
import { getFlatFileList } from "./WorkspaceContext";

interface SearchPanelProps {
  onOpenFile: (path: string) => void;
}

interface MatchResult {
  file: FileItem;
  line: number;
  text: string;
}

export default function SearchPanel({ onOpenFile }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const flatFiles = getFlatFileList(WORKSPACE_FILES);

  const getSearchResults = (): MatchResult[] => {
    if (!query || query.length < 2) return [];

    const results: MatchResult[] = [];
    for (const file of flatFiles) {
      if (file.content) {
        const lines = file.content.split("\n");
        lines.forEach((lineText, idx) => {
          if (lineText.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              file,
              line: idx + 1,
              text: lineText.trim(),
            });
          }
        });
      }
    }
    return results;
  };

  const matches = getSearchResults();

  return (
    <div className="flex flex-col h-full bg-[#2D2D30] text-[#CCCCCC] select-none font-mono">
      {/* Sidebar title */}
      <div className="px-4 py-2.5 text-[11px] font-bold text-[#858585] uppercase tracking-wider border-b border-[#3C3C3C] shrink-0">
        <span>Search</span>
      </div>

      {/* Query search input box */}
      <div className="p-3 space-y-2 border-b border-[#3C3C3C] shrink-0">
        <div className="bg-[#1E1E1E] border border-[#3C3C3C] focus-within:border-[#3794FF] rounded px-2.5 py-1.5 flex items-center transition">
          <VscSearch className="w-4 h-4 text-[#858585] mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search words in workspace (e.g. sabeer)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-xs w-full"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[#858585] hover:text-white transition">
              <VscSearchStop className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="text-[10px] text-[#858585]">
          {query.length >= 2 ? (
            <span>Found {matches.length} result{matches.length !== 1 ? "s" : ""} across files</span>
          ) : (
            <span>Enter 2 or more characters...</span>
          )}
        </div>
      </div>

      {/* Matching files list */}
      <div className="flex-1 overflow-y-auto py-1">
        {matches.length > 0 ? (
          matches.map((match, idx) => (
            <div
              key={idx}
              onClick={() => onOpenFile(match.file.path)}
              className="px-4 py-2 hover:bg-[#2A2D2E]/40 border-b border-[#3C3C3C]/40 cursor-pointer select-text transition"
            >
              <div className="flex items-center space-x-1.5 text-xs text-white">
                <VscFile className="w-3.5 h-3.5 text-[#3794FF] shrink-0" />
                <span className="font-semibold truncate">{match.file.name}</span>
                <span className="text-[10px] text-[#858585]">Line {match.line}</span>
              </div>
              <p className="text-[11px] text-[#858585] mt-1 italic pl-5 truncate bg-[#1E1E1E]/40 py-0.5 rounded px-1">
                {match.text}
              </p>
            </div>
          ))
        ) : query.length >= 2 ? (
          <div className="px-4 py-8 text-center text-xs text-[#858585]">
            No results match your query string.
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-xs text-[#858585]">
            Type a keyword above to scan workspace indexes.
          </div>
        )}
      </div>
    </div>
  );
}
