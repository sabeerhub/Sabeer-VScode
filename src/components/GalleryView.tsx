"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  VscZoomIn,
  VscZoomOut,
  VscDiscard,
  VscScreenFull,
  VscScreenNormal,
  VscInfo
} from "react-icons/vsc";
import { galleryImages } from "@/data/workspace";

interface GalleryViewProps {
  filePath: string;
}

export default function GalleryView({ filePath }: GalleryViewProps) {
  // Extract photo ID from filepath (e.g. "gallery/img-1.png" -> "img-1")
  const imgId = filePath.split("/").pop()?.split(".")[0] || "img-1";
  const imageMeta = galleryImages.find(img => img.id === imgId) || galleryImages[0];

  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setScale(1);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error enabling fullscreen", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Synchronize internal layout fullscreen listener
  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 h-full bg-[#151515] flex flex-col justify-between select-none relative overflow-hidden"
    >
      {/* Visual top toolbar */}
      <div className="h-10 bg-[#1E1E1E] border-b border-[#3C3C3C] flex items-center justify-between px-4 z-20 text-xs text-[#858585] font-mono">
        <div className="flex items-center space-x-2">
          <VscInfo className="w-4 h-4 text-[#3794FF]" />
          <span className="text-white font-medium">{imageMeta.title}</span>
          <span className="text-[#858585]/60">({imageMeta.category})</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 text-white">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 rounded hover:bg-[#3C3C3C] transition"
          >
            <VscZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-[#858585] font-semibold w-8 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 rounded hover:bg-[#3C3C3C] transition"
          >
            <VscZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            title="Reset View"
            className="p-1.5 rounded hover:bg-[#3C3C3C] transition"
          >
            <VscDiscard className="w-4 h-4" />
          </button>
          <div className="h-4 w-[1px] bg-[#3C3C3C]" />
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-1.5 rounded hover:bg-[#3C3C3C] transition"
          >
            {isFullscreen ? <VscScreenNormal className="w-4 h-4" /> : <VscScreenFull className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main viewport area supporting drag-to-pan */}
      <div className="flex-1 flex items-center justify-center relative cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div
          drag
          dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
          style={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-[85%] max-h-[80%] rounded shadow-2xl overflow-hidden border border-[#3C3C3C]"
        >
          <img
            src={imageMeta.url}
            alt={imageMeta.title}
            className="max-h-[55vh] object-contain pointer-events-none select-none"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </motion.div>

        {/* Bottom drag tooltip helper */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1E1E1E]/80 border border-[#3C3C3C] text-[10px] text-[#858585] px-3 py-1 rounded-full backdrop-blur pointer-events-none shadow">
          Drag to Pan • Pinch or use toolbar to Zoom
        </div>
      </div>

      {/* Visual bottom details summary card */}
      <div className="bg-[#1E1E1E] border-t border-[#3C3C3C] p-4 text-xs font-mono text-[#858585] leading-relaxed z-15 select-text">
        <div className="max-w-4xl mx-auto flex items-start space-x-3">
          <VscInfo className="w-4 h-4 text-[#3794FF] mt-0.5 shrink-0" />
          <div>
            <span className="text-white font-bold block">{imageMeta.title}</span>
            <span className="text-[11px] block mt-1">{imageMeta.description}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
