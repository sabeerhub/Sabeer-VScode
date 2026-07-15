"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import WorkspaceProvider, { useWorkspace } from "@/components/WorkspaceContext";
import TitleBar from "@/components/TitleBar";
import ActivityBar from "@/components/ActivityBar";
import Explorer from "@/components/Explorer";
import SearchPanel from "@/components/SearchPanel";
import GitPanel from "@/components/GitPanel";
import TabsArea, { findFileByPath } from "@/components/TabsArea";
import ReadmeView from "@/components/ReadmeView";
import ProjectView from "@/components/ProjectView";
import GalleryView from "@/components/GalleryView";
import TerminalPanel from "@/components/TerminalPanel";
import StatusBar from "@/components/StatusBar";
import CommandPalette from "@/components/CommandPalette";
import { WORKSPACE_FILES, Project } from "@/data/workspace";
import { motion, AnimatePresence } from "framer-motion";
import { VscCode, VscSettings, VscVscode } from "react-icons/vsc";
import confetti from "canvas-confetti";

// Load EditorArea dynamically with SSR disabled to prevent server-side Monaco crashes
const EditorArea = dynamic(() => import("@/components/EditorArea"), { ssr: false });

function VSCodeWorkspace() {
  const { state, openFile, closeFile, setActiveTabPath, setActiveSidebar, setTerminalOpen, setCommandPaletteOpen, setQuickOpenOpen, toggleFolder } = useWorkspace();
  const [isStartupLoading, setIsStartupLoading] = useState(true);

  // Startup animation delay simulating workspace indexing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStartupLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Listen to custom confetti events dispatched from anywhere in app
  useEffect(() => {
    const triggerConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    };
    window.addEventListener("trigger-confetti", triggerConfetti);
    return () => window.removeEventListener("trigger-confetti", triggerConfetti);
  }, []);

  // Find active file node
  const activeFile = state.activeTabPath ? findFileByPath(WORKSPACE_FILES, state.activeTabPath) : null;

  // Render sidebar contents based on active tab state
  const renderSidebarContent = () => {
    switch (state.activeSidebar) {
      case "explorer":
        return (
          <Explorer
            files={WORKSPACE_FILES}
            openTabs={state.openTabs}
            activeTabPath={state.activeTabPath}
            expandedFolders={state.expandedFolders}
            onOpenFile={openFile}
            onToggleFolder={toggleFolder}
          />
        );
      case "search":
        return <SearchPanel onOpenFile={openFile} />;
      case "git":
        return <GitPanel />;
      case "settings":
        return (
          <div className="flex flex-col h-full bg-[#2D2D30] text-[#CCCCCC] p-4 select-none font-mono">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1">
              <VscSettings className="w-4 h-4 text-[#3794FF]" />
              <span>User Settings</span>
            </h2>
            <div className="space-y-4 text-xs text-[#858585] leading-relaxed">
              <p>Preferences and layout variables configured:</p>
              <div className="space-y-1 pl-3 border-l border-[#3C3C3C]">
                <div>• Theme: VS Code Dark+</div>
                <div>• Font: JetBrains Mono</div>
                <div>• Size: 13px</div>
                <div>• Tab Size: 2 spaces</div>
                <div>• Prettier: True</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render focal editor pane based on language characteristics
  const renderEditorPane = () => {
    if (!state.activeTabPath || !activeFile) {
      return (
        <div className="flex-1 bg-[#1E1E1E] flex flex-col items-center justify-center text-[#858585] font-mono text-center px-4 select-none relative">
          <div className="absolute inset-0 bg-[radial-gradient(#3C3C3C_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 max-w-sm"
          >
            <VscVscode className="w-16 h-16 text-[#858585]/40 mx-auto" />
            <div>
              <p className="text-white font-semibold text-sm">No File Buffer Opened</p>
              <p className="text-xs mt-1 leading-relaxed">Open folders or search items in the workspace using file trees or quick command palette.</p>
            </div>
            <div className="bg-[#2D2D30] border border-[#3C3C3C] p-3 rounded text-[11px] space-y-2 text-left shadow-md">
              <div className="flex justify-between"><span>Show Command Palette</span><kbd className="bg-[#1E1E1E] px-1 py-0.5 rounded border border-[#3C3C3C]">Ctrl+Shift+P</kbd></div>
              <div className="flex justify-between"><span>Quick Open Search</span><kbd className="bg-[#1E1E1E] px-1 py-0.5 rounded border border-[#3C3C3C]">Ctrl+P</kbd></div>
              <div className="flex justify-between"><span>Toggle Terminal</span><kbd className="bg-[#1E1E1E] px-1 py-0.5 rounded border border-[#3C3C3C]">Ctrl+`</kbd></div>
              <div className="flex justify-between"><span>Toggle Sidebar</span><kbd className="bg-[#1E1E1E] px-1 py-0.5 rounded border border-[#3C3C3C]">Ctrl+B</kbd></div>
            </div>
          </motion.div>
        </div>
      );
    }

    // Special view matches
    if (activeFile.language === "markdown" && activeFile.name === "README.md") {
      return <ReadmeView onOpenFile={openFile} />;
    }

    if (activeFile.language === "json" && activeFile.path.startsWith("projects/")) {
      let parsedProject: Project;
      try {
        parsedProject = JSON.parse(activeFile.content || "{}") as Project;
      } catch {
        return <EditorArea filePath={activeFile.path} content={activeFile.content || ""} language="json" />;
      }
      return <ProjectView project={parsedProject} />;
    }

    if (activeFile.language === "image") {
      return <GalleryView filePath={activeFile.path} />;
    }

    return (
      <EditorArea
        filePath={activeFile.path}
        content={activeFile.content || ""}
        language={activeFile.language || "typescript"}
      />
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isStartupLoading ? (
        // Iconic VS Code launching splash transition
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center text-[#CCCCCC] select-none z-50 font-mono"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="flex flex-col items-center space-y-4"
          >
            <VscCode className="w-20 h-20 text-[#3794FF] animate-pulse" />
            <div className="space-y-2 text-center">
              <h3 className="text-white text-lg font-bold">Visual Studio Code</h3>
              <p className="text-xs text-[#858585] tracking-wider uppercase font-semibold">Opening Sabeer Workspace...</p>
            </div>
          </motion.div>
          {/* Subtle loading horizontal bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#2D2D30] rounded-full overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-24 bg-[#3794FF] rounded-full"
            />
          </div>
        </motion.div>
      ) : (
        // True Workspace layout
        <motion.div
          key="workspace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-screen w-screen flex flex-col overflow-hidden bg-[#1E1E1E]"
        >
          {/* Title Bar */}
          <TitleBar onOpenPalette={() => setCommandPaletteOpen(true)} />

          {/* Focal Workspace Layout */}
          <div className="flex-1 flex w-full min-h-0 relative">
            {/* Activity Bar */}
            <ActivityBar
              active={state.activeSidebar}
              setActive={setActiveSidebar}
              openPalette={() => setCommandPaletteOpen(true)}
            />

            {/* Expandable/Collapsible Sidebar Pane */}
            <AnimatePresence initial={false}>
              {state.activeSidebar && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="h-full border-r border-[#3C3C3C] overflow-hidden shrink-0 flex flex-col z-30"
                >
                  <div className="w-[260px] h-full flex flex-col">
                    {renderSidebarContent()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Editors and Terminal viewports */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
              {/* Horizontal Tabs Area */}
              <TabsArea
                openTabs={state.openTabs}
                activeTabPath={state.activeTabPath}
                onSelectTab={setActiveTabPath}
                onCloseTab={closeFile}
              />

              {/* Editor Workspace Panel */}
              <div className="flex-1 min-h-0 w-full flex relative">
                {renderEditorPane()}
              </div>

              {/* Collapsible Interactive Terminal panel */}
              {state.terminalOpen && (
                <TerminalPanel
                  onOpenFile={openFile}
                  onClose={() => setTerminalOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Status Bar */}
          <StatusBar
            activeTabPath={state.activeTabPath}
            openPalette={() => setCommandPaletteOpen(true)}
            terminalOpen={state.terminalOpen}
            setTerminalOpen={setTerminalOpen}
          />

          {/* Global Search and quick navigators */}
          <CommandPalette
            isOpen={state.commandPaletteOpen || state.quickOpenOpen}
            isQuickOpen={state.quickOpenOpen}
            onClose={() => {
              setCommandPaletteOpen(false);
              setQuickOpenOpen(false);
            }}
            onOpenFile={openFile}
            onToggleTerminal={() => setTerminalOpen(!state.terminalOpen)}
            onToggleSidebar={() => {
              if (state.activeSidebar) {
                setActiveSidebar(null);
              } else {
                setActiveSidebar("explorer");
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <WorkspaceProvider>
      <VSCodeWorkspace />
    </WorkspaceProvider>
  );
}
