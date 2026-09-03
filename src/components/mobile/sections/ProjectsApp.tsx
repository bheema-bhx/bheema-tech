"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { PortfolioData, Project } from "@/types/portfolio";
import { TechBadge } from "../../shared/TechBadge";
import {
  FolderGit2,
  Globe,
  Lock,
  Unlock,
  Star,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FilterType = "all" | "featured" | "open-source" | "private";

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "open-source", label: "Open Source" },
  { key: "private", label: "Private" },
];

function MobileProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isOpenSource = project.isOpenSource ?? !!project.githubUrl;
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="w-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden shrink-0"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[200px] bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center border-b border-white/10 overflow-hidden">
        {project.thumbnail && !imgError ? (
          <Image src={project.thumbnail} alt={project.title} fill className="object-cover" onError={() => setImgError(true)} />
        ) : (
          <span className="text-white/20 text-xs font-medium relative z-10">Preview</span>
        )}
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-semibold px-2.5 py-1 rounded-full z-10">
            <Star size={10} fill="currentColor" /> Featured
          </div>
        )}
        {/* Open Source / Private Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
              isOpenSource
                ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                : "bg-zinc-500/15 border-zinc-500/25 text-zinc-400"
            }`}
          >
            {isOpenSource ? <Unlock size={10} /> : <Lock size={10} />}
            {isOpenSource ? "Open Source" : "Private"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-[17px] text-white/90 mb-1.5 leading-tight">
          {project.title}
        </h3>
        <p className="text-white/55 text-sm mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex gap-1.5 flex-wrap mb-5">
          {project.techStack.map((t) => (
            <TechBadge
              key={t}
              name={t}
              className="text-[11px] px-2.5 py-1 bg-white/10 border-white/10"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-4 border-t border-white/10">
          {isOpenSource && project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/10 hover:bg-white/15 active:scale-[0.97] py-2.5 rounded-xl text-center text-white/80 text-sm font-semibold flex justify-center items-center gap-2 transition-all"
            >
              <FolderGit2 size={15} /> Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-500 active:scale-[0.97] py-2.5 rounded-xl text-center text-white text-sm font-semibold flex justify-center items-center gap-2 transition-all"
            >
              <Globe size={15} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsApp({ data }: { data: PortfolioData }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    let list = data.projects;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter
    if (activeFilter === "featured") {
      list = list.filter((p) => p.featured);
    } else if (activeFilter === "open-source") {
      list = list.filter((p) => p.isOpenSource ?? !!p.githubUrl);
    } else if (activeFilter === "private") {
      list = list.filter((p) => !(p.isOpenSource ?? !!p.githubUrl));
    }

    return list;
  }, [data.projects, search, activeFilter]);

  return (
    <div className="pb-24 pt-4 flex flex-col gap-6 px-1">
      {/* Header: Search & Filter */}
      <div className="flex flex-col gap-4 pb-2 pt-2 -mx-1 px-1">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 shadow-sm">
          <Search size={18} className="text-white/50 shrink-0" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-base text-white placeholder:text-white/40 outline-none"
          />
        </div>

        {/* Filter Pills (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeFilter === f.key
                  ? "bg-white text-black border-white"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        {/* Results Count */}
        <div className="text-xs text-white/40 font-medium px-1">
           Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Project List */}
      <div className="flex flex-col gap-6 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <MobileProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <Search size={24} className="text-white/30" />
              </div>
              <h3 className="text-white/90 font-bold mb-2">No projects found</h3>
              <p className="text-white/50 text-sm">
                Try adjusting your search or filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
