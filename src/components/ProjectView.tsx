"use client";

import React from "react";
import { motion } from "framer-motion";
import { VscCode, VscGithub, VscRocket, VscCompass, VscBriefcase, VscLightbulb, VscCheck } from "react-icons/vsc";
import { Project } from "@/data/workspace";

interface ProjectViewProps {
  project: Project;
}

export default function ProjectView({ project }: ProjectViewProps) {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#1E1E1E] text-[#CCCCCC] font-mono select-text px-6 py-10 md:px-12 md:py-16 relative">
      {/* Visual background gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3794FF]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">

        {/* Project Header Banner / Image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-48 md:h-64 rounded-xl overflow-hidden border border-[#3C3C3C] relative group"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                // If unsplash fails or takes too long, render a custom tech blueprint graphic fallback
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#3794FF] font-bold uppercase tracking-wider bg-[#3794FF]/10 border border-[#3794FF]/20 px-2 py-0.5 rounded">Featured Case Study</span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-1">{project.name}</h1>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm md:text-base text-white border-l-2 border-[#3794FF] pl-4 italic"
        >
          &ldquo;{project.tagline}&rdquo;
        </motion.p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 select-none">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#007ACC] hover:bg-[#1E7EBE] text-white text-xs font-bold px-4 py-2.5 rounded-md transition flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <VscRocket className="w-4 h-4" />
              <span>Launch Live App</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2D2D30] hover:bg-[#3C3C3C] text-white border border-[#3C3C3C] hover:border-[#CCCCCC] text-xs font-bold px-4 py-2.5 rounded-md transition flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <VscGithub className="w-4 h-4" />
              <span>Explore Codebase</span>
            </a>
          )}
        </div>

        {/* Overview section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <VscCompass className="w-4 h-4 text-[#3794FF]" />
                <span>Project Overview</span>
              </h2>
              <p className="text-xs md:text-sm text-[#858585] leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <VscBriefcase className="w-4 h-4 text-[#3794FF]" />
                <span>The Problem Statement</span>
              </h2>
              <p className="text-xs md:text-sm text-[#858585] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <VscLightbulb className="w-4 h-4 text-[#3794FF]" />
                <span>The Crafted Solution</span>
              </h2>
              <p className="text-xs md:text-sm text-[#858585] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Sidebar Metrics inside Project detail */}
          <div className="bg-[#2D2D30] border border-[#3C3C3C] rounded-lg p-5 space-y-6 h-fit text-xs">
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">System Stack</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#1E1E1E] text-[#CCCCCC] border border-[#3C3C3C] hover:border-[#3794FF] px-2 py-0.5 rounded text-[10px] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-[#3C3C3C] pt-4">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Architecture Paradigm</h4>
              <p className="text-[#858585] leading-relaxed text-[11px] pt-1">
                {project.architecture}
              </p>
            </div>
          </div>
        </div>

        {/* Features block */}
        <div className="border-t border-[#3C3C3C] pt-8 space-y-4">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <VscCode className="w-4 h-4 text-[#3794FF]" />
            <span>Core Features Built</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
            {project.features.map((feat) => (
              <div key={feat} className="flex items-start space-x-2 text-[#858585]">
                <VscCheck className="w-4 h-4 text-[#2ECC71] mt-0.5 shrink-0" />
                <span className="leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons Learned and future directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#3C3C3C]">
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-[#3794FF] rounded-full" />
              <span>Lessons Learned</span>
            </h4>
            <p className="text-xs text-[#858585] leading-relaxed">
              {project.lessonsLearned}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-[#3794FF] rounded-full" />
              <span>Future Improvements</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#858585]">
              {project.futureImprovements.map((imp) => (
                <li key={imp} className="flex items-center space-x-2">
                  <span className="text-[#3794FF] font-semibold">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
