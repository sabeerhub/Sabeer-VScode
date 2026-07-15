"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { FileItem } from "@/data/workspace";

// Flat file list helper for quick reference & search
export function getFlatFileList(files: FileItem[]): FileItem[] {
  const list: FileItem[] = [];
  for (const item of files) {
    if (item.type === "file") {
      list.push(item);
    } else if (item.type === "directory" && item.children) {
      list.push(...getFlatFileList(item.children));
    }
  }
  return list;
}

export interface WorkspaceState {
  openTabs: string[];
  activeTabPath: string | null;
  expandedFolders: Record<string, boolean>;
  activeSidebar: "explorer" | "search" | "git" | "settings" | null;
  terminalOpen: boolean;
  terminalHistory: string[];
  commandPaletteOpen: boolean;
  quickOpenOpen: boolean;
  searchQuery: string;
  gitModifiedFiles: string[];
  gitStagedFiles: string[];
  gitCommits: Array<{ hash: string; message: string; date: string }>;
}

interface ContextProps {
  state: WorkspaceState;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  setActiveTabPath: (path: string | null) => void;
  toggleFolder: (path: string) => void;
  setActiveSidebar: (sidebar: "explorer" | "search" | "git" | "settings" | null) => void;
  setTerminalOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setQuickOpenOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  addTerminalHistory: (cmd: string) => void;
  stageFile: (path: string) => void;
  unstageFile: (path: string) => void;
  commitChanges: (message: string) => void;
  toggleSidebarCollapse: () => void;
}

export const WorkspaceContext = createContext<ContextProps | undefined>(undefined);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
}

export default function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  // Try loading from localStorage
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTabPath, setActiveTabPath] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "projects": true,
    "gallery": false,
    "blogs": false
  });
  const [activeSidebar, setActiveSidebarState] = useState<"explorer" | "search" | "git" | "settings" | null>("explorer");
  const [terminalOpen, setTerminalOpen] = useState<boolean>(true);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [quickOpenOpen, setQuickOpenOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fake git state
  const [gitModifiedFiles, setGitModifiedFiles] = useState<string[]>(["about.ts", "skills.json"]);
  const [gitStagedFiles, setGitStagedFiles] = useState<string[]>([]);
  const [gitCommits, setGitCommits] = useState([
    { hash: "f392a81", message: "feat: initialize SABEER-WORKSPACE project structure", date: "June 25, 2026" },
    { hash: "cd0192e", message: "feat: setup terminal shell parser & Monaco core", date: "July 01, 2026" },
    { hash: "7c1e28d", message: "style: optimize scrollbars, workspace dark theme layout", date: "July 10, 2026" }
  ]);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTabs = localStorage.getItem("vs_portfolio_tabs");
      const storedActive = localStorage.getItem("vs_portfolio_active_tab");
      const storedFolders = localStorage.getItem("vs_portfolio_expanded_folders");

      if (storedTabs) {
        setOpenTabs(JSON.parse(storedTabs));
      } else {
        // default opened tab
        setOpenTabs(["README.md"]);
      }

      if (storedActive) {
        setActiveTabPath(storedActive);
      } else {
        setActiveTabPath("README.md");
      }

      if (storedFolders) {
        setExpandedFolders(JSON.parse(storedFolders));
      }
    }
  }, []);

  // Save changes to local storage
  const saveTabs = (tabs: string[]) => {
    localStorage.setItem("vs_portfolio_tabs", JSON.stringify(tabs));
  };

  const saveActiveTab = (path: string | null) => {
    if (path) {
      localStorage.setItem("vs_portfolio_active_tab", path);
    } else {
      localStorage.removeItem("vs_portfolio_active_tab");
    }
  };

  const saveFolders = (folders: Record<string, boolean>) => {
    localStorage.setItem("vs_portfolio_expanded_folders", JSON.stringify(folders));
  };

  const openFile = useCallback((path: string) => {
    setOpenTabs((prev) => {
      if (!prev.includes(path)) {
        const nextTabs = [...prev, path];
        saveTabs(nextTabs);
        return nextTabs;
      }
      return prev;
    });
    setActiveTabPath(path);
    saveActiveTab(path);
  }, []);

  const closeFile = useCallback((path: string) => {
    setOpenTabs((prev) => {
      const nextTabs = prev.filter((t) => t !== path);
      saveTabs(nextTabs);

      setActiveTabPath((currentActive) => {
        if (currentActive === path) {
          const nextActive = nextTabs.length > 0 ? nextTabs[nextTabs.length - 1] : null;
          saveActiveTab(nextActive);
          return nextActive;
        }
        return currentActive;
      });

      return nextTabs;
    });
  }, []);

  const selectTab = useCallback((path: string | null) => {
    setActiveTabPath(path);
    saveActiveTab(path);
  }, []);

  const toggleFolder = useCallback((path: string) => {
    setExpandedFolders((prev) => {
      const nextFolders = {
        ...prev,
        [path]: !prev[path],
      };
      saveFolders(nextFolders);
      return nextFolders;
    });
  }, []);

  const setActiveSidebar = useCallback((sidebar: "explorer" | "search" | "git" | "settings" | null) => {
    setActiveSidebarState(sidebar);
  }, []);

  const addTerminalHistory = useCallback((cmd: string) => {
    setTerminalHistory((prev) => [...prev, cmd]);
  }, []);

  // Git handlers
  const stageFile = useCallback((path: string) => {
    setGitModifiedFiles((prev) => prev.filter((f) => f !== path));
    setGitStagedFiles((prev) => [...prev, path]);
  }, []);

  const unstageFile = useCallback((path: string) => {
    setGitStagedFiles((prev) => prev.filter((f) => f !== path));
    setGitModifiedFiles((prev) => [...prev, path]);
  }, []);

  const commitChanges = useCallback((message: string) => {
    setGitStagedFiles((staged) => {
      if (staged.length === 0) return staged;
      const newCommit = {
        hash: Math.random().toString(16).substring(2, 9),
        message,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      };
      setGitCommits((prev) => [newCommit, ...prev]);
      return [];
    });
  }, []);

  const toggleSidebarCollapse = useCallback(() => {
    setActiveSidebarState((prev) => (prev ? null : "explorer"));
  }, []);

  // Global Keyboard Shortcuts Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check Ctrl / Cmd keys
      const isCtrlCmd = e.ctrlKey || e.metaKey;

      if (isCtrlCmd) {
        // Ctrl + P: Quick Open
        if (e.key === "p" && !e.shiftKey) {
          e.preventDefault();
          setQuickOpenOpen((prev) => !prev);
          setCommandPaletteOpen(false);
        }
        // Ctrl + Shift + P: Command Palette
        if (e.key === "P" && e.shiftKey) {
          e.preventDefault();
          setCommandPaletteOpen((prev) => !prev);
          setQuickOpenOpen(false);
        }
        // Ctrl + ` : Toggle Terminal
        if (e.key === "`" || e.key === "±") {
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
        }
        // Ctrl + W: Close Active File Tab
        if (e.key === "w" && !e.shiftKey) {
          e.preventDefault();
          if (activeTabPath) {
            closeFile(activeTabPath);
          }
        }
        // Ctrl + B: Toggle Sidebar Visibility
        if (e.key === "b" && !e.shiftKey) {
          e.preventDefault();
          toggleSidebarCollapse();
        }
        // Ctrl + Shift + E: Explorer
        if (e.key === "E" && e.shiftKey) {
          e.preventDefault();
          setActiveSidebarState("explorer");
        }
        // Ctrl + Tab: cycle tabs
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          if (openTabs.length > 1) {
            const currentIdx = openTabs.indexOf(activeTabPath || "");
            const nextIdx = (currentIdx + 1) % openTabs.length;
            selectTab(openTabs[nextIdx]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openTabs, activeTabPath, closeFile, selectTab, toggleSidebarCollapse]);

  return (
    <WorkspaceContext.Provider
      value={{
        state: {
          openTabs,
          activeTabPath,
          expandedFolders,
          activeSidebar,
          terminalOpen,
          terminalHistory,
          commandPaletteOpen,
          quickOpenOpen,
          searchQuery,
          gitModifiedFiles,
          gitStagedFiles,
          gitCommits,
        },
        openFile,
        closeFile,
        setActiveTabPath: selectTab,
        toggleFolder,
        setActiveSidebar,
        setTerminalOpen,
        setCommandPaletteOpen,
        setQuickOpenOpen,
        setSearchQuery,
        addTerminalHistory,
        stageFile,
        unstageFile,
        commitChanges,
        toggleSidebarCollapse,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
