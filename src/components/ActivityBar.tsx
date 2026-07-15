"use client";

import React from "react";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscSettingsGear,
  VscAccount,
  VscFeedback
} from "react-icons/vsc";

interface ActivityBarProps {
  active: "explorer" | "search" | "git" | "settings" | null;
  setActive: (sidebar: "explorer" | "search" | "git" | "settings" | null) => void;
  openPalette: () => void;
}

interface ActivityItem {
  id: "explorer" | "search" | "git";
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

export default function ActivityBar({ active, setActive, openPalette }: ActivityBarProps) {
  const topItems: ActivityItem[] = [
    { id: "explorer", icon: VscFiles as React.ComponentType, label: "Explorer (Ctrl+Shift+E)" },
    { id: "search", icon: VscSearch as React.ComponentType, label: "Search (Ctrl+Shift+F)" },
    { id: "git", icon: VscSourceControl as React.ComponentType, label: "Source Control (Ctrl+Shift+G)", badge: 1 },
  ];

  const handleToggle = (id: "explorer" | "search" | "git" | "settings") => {
    if (active === id) {
      setActive(null);
    } else {
      setActive(id);
    }
  };

  return (
    <div className="w-12 bg-[#252526] border-r border-[#3C3C3C] flex flex-col justify-between items-center py-2 select-none shrink-0 z-40">
      {/* Top Icons */}
      <div className="flex flex-col items-center w-full space-y-1">
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              title={item.label}
              className={`relative w-12 h-12 flex items-center justify-center cursor-pointer group transition`}
            >
              {/* Left active line indicator */}
              <div className={`absolute left-0 w-[2px] h-8 bg-[#3794FF] transition-all duration-150 ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"}`} />
              <Icon className={`w-6 h-6 transition-colors ${isActive ? "text-white" : "text-[#858585] group-hover:text-[#CCCCCC]"}`} />
              {item.badge && (
                <span className="absolute bottom-2 right-2 bg-[#007ACC] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#252526]">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center w-full space-y-1">
        <div
          onClick={openPalette}
          title="Command Palette"
          className="w-12 h-12 flex items-center justify-center cursor-pointer group transition"
        >
          <VscFeedback className="w-5 h-5 text-[#858585] group-hover:text-[#CCCCCC]" />
        </div>
        <div
          title="Profile"
          className="w-12 h-12 flex items-center justify-center cursor-pointer group transition"
        >
          <VscAccount className="w-5 h-5 text-[#858585] group-hover:text-[#CCCCCC]" />
        </div>
        <div
          onClick={() => handleToggle("settings")}
          title="Settings (Ctrl+,)"
          className={`relative w-12 h-12 flex items-center justify-center cursor-pointer group transition`}
        >
          <div className={`absolute left-0 w-[2px] h-8 bg-[#3794FF] transition-all duration-150 ${active === "settings" ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"}`} />
          <VscSettingsGear className={`w-5 h-5 transition-colors ${active === "settings" ? "text-white" : "text-[#858585] group-hover:text-[#CCCCCC]"}`} />
        </div>
      </div>
    </div>
  );
}
