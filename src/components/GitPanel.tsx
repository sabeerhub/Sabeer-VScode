"use client";

import React, { useState } from "react";
import {
  VscSourceControl,
  VscCheck,
  VscAdd,
  VscDiscard,
  VscHistory,
  VscGitBranch,
  VscGitCommit
} from "react-icons/vsc";
import { useWorkspace } from "./WorkspaceContext";

export default function GitPanel() {
  const { state, stageFile, unstageFile, commitChanges } = useWorkspace();
  const [commitMsg, setCommitMsg] = useState("");

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMsg.trim() || state.gitStagedFiles.length === 0) return;
    commitChanges(commitMsg);
    setCommitMsg("");
  };

  return (
    <div className="flex flex-col h-full bg-[#2D2D30] text-[#CCCCCC] select-none font-mono">
      {/* Sidebar Title */}
      <div className="px-4 py-2.5 text-[11px] font-bold text-[#858585] uppercase tracking-wider border-b border-[#3C3C3C] flex items-center justify-between shrink-0">
        <span>Source Control</span>
        <VscSourceControl className="w-4 h-4 text-[#858585]" />
      </div>

      {/* Branch & Actions banner */}
      <div className="px-4 py-2 bg-[#1E1E1E]/40 text-[10px] text-[#858585] border-b border-[#3C3C3C] flex items-center justify-between shrink-0">
        <span className="flex items-center space-x-1 font-semibold text-white/80">
          <VscGitBranch className="w-3.5 h-3.5 text-[#3794FF]" />
          <span>Active: main</span>
        </span>
        <span>Staged: {state.gitStagedFiles.length}</span>
      </div>

      {/* Git Commit Input Form */}
      <form onSubmit={handleCommit} className="p-3 border-b border-[#3C3C3C] space-y-2 shrink-0">
        <input
          type="text"
          placeholder="Message (Ctrl+Enter to commit to &apos;main&apos;)..."
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          className="w-full bg-[#1E1E1E] text-white border border-[#3C3C3C] focus:border-[#3794FF] rounded px-2.5 py-1.5 text-xs outline-none"
        />
        <button
          type="submit"
          disabled={state.gitStagedFiles.length === 0 || !commitMsg.trim()}
          className="w-full bg-[#007ACC] hover:bg-[#1E7EBE] disabled:bg-[#3C3C3C] disabled:text-[#858585] disabled:cursor-not-allowed text-white font-bold py-1.5 rounded text-xs transition-colors flex items-center justify-center space-x-1.5"
        >
          <VscCheck className="w-4 h-4" />
          <span>Commit ({state.gitStagedFiles.length})</span>
        </button>
      </form>

      {/* Files lists */}
      <div className="flex-1 overflow-y-auto space-y-4 py-2 text-xs">

        {/* Staged files */}
        <div className="space-y-1">
          <div className="px-4 text-[10px] font-bold text-[#858585] uppercase tracking-wider">
            Staged Changes ({state.gitStagedFiles.length})
          </div>
          {state.gitStagedFiles.length > 0 ? (
            state.gitStagedFiles.map((file) => (
              <div key={file} className="px-4 py-1.5 hover:bg-[#2A2D2E]/40 flex items-center justify-between group">
                <span className="text-[#2ECC71] truncate">{file}</span>
                <button
                  onClick={() => unstageFile(file)}
                  className="p-1 rounded hover:bg-[#3C3C3C] text-[#858585] hover:text-white transition"
                  title="Unstage changes"
                >
                  <VscDiscard className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-[11px] text-[#858585] italic">No staged files. Click &apos;+&apos; below to stage.</div>
          )}
        </div>

        {/* Modified Files */}
        <div className="space-y-1 border-t border-[#3C3C3C]/40 pt-3">
          <div className="px-4 text-[10px] font-bold text-[#858585] uppercase tracking-wider">
            Changes ({state.gitModifiedFiles.length})
          </div>
          {state.gitModifiedFiles.length > 0 ? (
            state.gitModifiedFiles.map((file) => (
              <div key={file} className="px-4 py-1.5 hover:bg-[#2A2D2E]/40 flex items-center justify-between group">
                <span className="text-yellow-500 truncate">{file}</span>
                <button
                  onClick={() => stageFile(file)}
                  className="p-1 rounded hover:bg-[#3C3C3C] text-[#858585] hover:text-white transition"
                  title="Stage changes"
                >
                  <VscAdd className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-[11px] text-[#858585] italic">No modified files. All changes committed.</div>
          )}
        </div>

        {/* Fake Git Commits Timeline */}
        <div className="border-t border-[#3C3C3C] pt-4 space-y-2">
          <div className="px-4 text-[10px] font-bold text-[#858585] uppercase tracking-wider flex items-center space-x-1">
            <VscHistory className="w-3.5 h-3.5 text-[#3794FF]" />
            <span>Commits Timeline</span>
          </div>
          <div className="space-y-3 px-4 max-h-[160px] overflow-y-auto">
            {state.gitCommits.map((cmt) => (
              <div key={cmt.hash} className="flex items-start space-x-2 text-[11px] border-l border-[#3C3C3C] pl-3 relative py-0.5">
                <VscGitCommit className="w-3.5 h-3.5 text-[#3794FF] absolute -left-[7px] bg-[#2D2D30] z-10" />
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center space-x-1.5 text-white/80">
                    <span className="font-semibold truncate">{cmt.message}</span>
                    <span className="text-[9px] text-[#3794FF] bg-[#3794FF]/10 px-1 py-0.5 rounded font-mono shrink-0">{cmt.hash}</span>
                  </div>
                  <span className="text-[10px] text-[#858585] block">{cmt.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
