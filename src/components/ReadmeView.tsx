"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { VscPlay, VscFileCode, VscAccount, VscMail, VscCode, VscLinkExternal } from "react-icons/vsc";
import confetti from "canvas-confetti";

interface ReadmeViewProps {
  onOpenFile: (path: string) => void;
}

export default function ReadmeView({ onOpenFile }: ReadmeViewProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const titles = useMemo(() => ["Frontend Developer", "AI Builder", "UI Engineer", "Motion Designer"], []);

  // Typing animation for cycling titles
  useEffect(() => {
    let isMounted = true;
    const title = titles[currentTitleIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isMounted) return;
      if (isDeleting) {
        setTypedText(title.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(title.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === title.length) {
        speed = 2000; // Hold at the end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        speed = 500;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [currentTitleIndex, titles]);

  // Trigger confetti on "npm run portfolio" click
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3794FF", "#007ACC", "#CCCCCC", "#2ECC71"]
    });
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#1E1E1E] text-[#CCCCCC] font-mono select-text px-6 py-10 md:px-12 md:py-16 relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#3C3C3C_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header Block */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-[#3794FF]/10 text-[#3794FF] border border-[#3794FF]/20 px-3 py-1 rounded-full text-xs font-semibold"
          >
            <VscCode className="w-3.5 h-3.5 animate-pulse" />
            <span>Senior Staff Engineer Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Mustapha Abdulsalam <br />
            <span className="text-[#3794FF]">Sabeer</span>
          </motion.h1>

          <div className="text-lg md:text-2xl text-[#858585] h-8 flex items-center">
            <span>I am a&nbsp;</span>
            <span className="text-white font-semibold border-r-2 border-[#3794FF] pr-1 cursor-blink">
              {typedText}
            </span>
          </div>
        </div>

        {/* Dynamic CLI Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-lg shadow-xl overflow-hidden"
        >
          {/* Mac OS Style window buttons */}
          <div className="bg-[#2D2D30] px-4 py-2 flex items-center justify-between border-b border-[#3C3C3C]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-[#858585]">terminal — bash</span>
            <div className="w-12" />
          </div>

          <div className="p-5 space-y-3 text-xs md:text-sm">
            <div className="flex items-center text-[#858585]">
              <span>sabeer@portfolio-workspace:~$</span>
              <span className="text-white ml-2 font-bold select-all">npm run portfolio</span>
              <button
                onClick={triggerConfetti}
                className="ml-3 bg-[#3794FF] hover:bg-[#1E7EBE] text-white font-semibold text-[10px] px-2.5 py-1 rounded transition flex items-center space-x-1 shadow"
              >
                <VscPlay className="w-3 h-3" />
                <span>Run Script</span>
              </button>
            </div>
            <div className="text-[#858585] leading-relaxed select-none">
              {"\n> initialization sequence completed successfully."}
              <br />
              {"> 14 advanced micro-service modules loaded in sandbox."}
              <br />
              {"\n"}
              <span className="text-green-400 font-semibold">✔ Production Ready.</span> Open files in the Explorer to inspect my digital architecture.
            </div>
          </div>
        </motion.div>

        {/* CTA Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -3, borderColor: "#3794FF" }}
            onClick={() => onOpenFile("about.ts")}
            className="bg-[#2D2D30] hover:bg-[#3C3C3C] border border-[#3C3C3C] p-4 rounded-lg cursor-pointer transition flex items-start space-x-3.5 group"
          >
            <VscAccount className="w-5 h-5 text-[#3794FF] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">01 // Profile</h3>
              <p className="text-[11px] text-[#858585] mt-1 leading-relaxed">Read about my developer story, location and philosophy in typescript code.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: "#3794FF" }}
            onClick={() => onOpenFile("experience.ts")}
            className="bg-[#2D2D30] hover:bg-[#3C3C3C] border border-[#3C3C3C] p-4 rounded-lg cursor-pointer transition flex items-start space-x-3.5 group"
          >
            <VscFileCode className="w-5 h-5 text-[#3794FF] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">02 // Experience</h3>
              <p className="text-[11px] text-[#858585] mt-1 leading-relaxed">Browse my career milestones, leadership roles, and client milestones.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, borderColor: "#3794FF" }}
            onClick={() => onOpenFile("contact.ts")}
            className="bg-[#2D2D30] hover:bg-[#3C3C3C] border border-[#3C3C3C] p-4 rounded-lg cursor-pointer transition flex items-start space-x-3.5 group"
          >
            <VscMail className="w-5 h-5 text-[#3794FF] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">03 // Connect</h3>
              <p className="text-[11px] text-[#858585] mt-1 leading-relaxed">Gain immediate access to my socials, email and project collaboration forms.</p>
            </div>
          </motion.div>
        </div>

        {/* Quick Features Highlight */}
        <div className="border-t border-[#3C3C3C] pt-8 space-y-4 text-xs md:text-sm">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#3794FF] rounded-full" />
            <span>Core Workspace Modules Built In</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[#858585] leading-relaxed">
            <div className="flex items-center space-x-2">
              <span className="text-[#3794FF] font-semibold">→</span>
              <span>Fully responsive VS Code layout layout Shell</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#3794FF] font-semibold">→</span>
              <span>Monaco Editor + syntax fallback engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#3794FF] font-semibold">→</span>
              <span>Search query string match highlight panel</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#3794FF] font-semibold">→</span>
              <span>Terminal Command prompt executing help, about, skills...</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#3794FF] font-semibold">→</span>
              <span>Interactive multi-tab and state manager</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#3794FF] font-semibold">→</span>
              <span>Command Palette search engine (Ctrl+Shift+P)</span>
            </div>
          </div>
        </div>

        {/* Quick External Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 select-none">
          <a
            href="https://github.com/sabeerhub"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2D2D30] hover:bg-[#3C3C3C] text-white border border-[#3C3C3C] hover:border-white text-xs px-4 py-2 rounded-md transition flex items-center space-x-2 shadow-sm cursor-pointer animate-none"
          >
            <span>GitHub Profile</span>
            <VscLinkExternal className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/in/masabeer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#007ACC] hover:bg-[#1E7EBE] text-white text-xs px-4 py-2 rounded-md transition flex items-center space-x-2 shadow-sm cursor-pointer"
          >
            <span>LinkedIn Profile</span>
            <VscLinkExternal className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
