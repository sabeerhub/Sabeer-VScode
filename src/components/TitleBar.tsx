"use client";

import React from "react";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose, VscEllipsis } from "react-icons/vsc";

export default function TitleBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <div className="h-9 bg-[#1E1E1E] border-b border-[#3C3C3C] flex items-center justify-between px-3 select-none text-xs text-[#858585] z-50 shrink-0">
      {/* File Menu Options */}
      <div className="flex items-center space-x-3 font-normal">
        <img src="/favicon.ico" alt="VS" className="w-4 h-4 object-contain opacity-80" onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }} />
        <div className="hidden md:flex items-center space-x-3">
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">File</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">Edit</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">Selection</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">View</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">Go</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">Run</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">Terminal</span>
          <span className="hover:bg-[#3C3C3C] hover:text-white px-2 py-0.5 rounded cursor-pointer transition">Help</span>
        </div>
        <div className="flex md:hidden">
          <VscEllipsis className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Global Search Button / Trigger */}
      <button
        onClick={onOpenPalette}
        className="flex items-center justify-between bg-[#2D2D30] hover:bg-[#3C3C3C] border border-[#3C3C3C] rounded px-4 py-1 w-64 md:w-80 lg:w-96 text-left text-[11px] text-[#858585] transition focus:outline-none"
      >
        <span>sabeer-workspace — Search (Ctrl + Shift + P)</span>
        <kbd className="bg-[#1E1E1E] text-[9px] px-1.5 py-0.5 rounded border border-[#3C3C3C] shadow">Ctrl+Shift+P</kbd>
      </button>

      {/* Windows Style Control Box */}
      <div className="flex items-center space-x-4">
        <VscChromeMinimize className="w-3.5 h-3.5 cursor-pointer hover:text-white transition" />
        <VscChromeMaximize className="w-3.5 h-3.5 cursor-pointer hover:text-white transition" />
        <VscChromeClose className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 transition" />
      </div>
    </div>
  );
}
