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

type FilterType = "all" | "featured" | "open-source" | "private";

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "open-source", label: "Open Source" },
  { key: "private", label: "Private" },
];

function ProjectCard({ project }: { project: Project }) {
  const isOpenSource = project.isOpenSource ?? !!project.githubUrl;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative w-full h-60 bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center border-b border-white/10 overflow-hidden">
        {project.thumbnail && !imgError ? (
          <Image src={project.thumbnail} alt={project.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" onError={() => setImgError(true)} />
        ) : (
          <span className="text-white/20 text-xs font-medium relative z-10">Preview</span>
        )}
        {project.featured && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
            <Star size={10} fill="currentColor" /> Featured
          </div>
        )}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
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
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold text-white/90 leading-tight mb-1.5">
          {project.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-white/10 mt-auto">
          {isOpenSource && project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-xs font-medium text-white/70 hover:text-white/90 transition-all"
            >
              <FolderGit2 size={13} /> Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600/80 hover:bg-blue-500 border border-blue-500/30 rounded-lg text-xs font-medium text-white transition-all"
            >
              <Globe size={13} /> Live Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsWindow({ data }: { data: PortfolioData }) {
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
    <div className="projects-wrapper">
      <div className="projects-container flex flex-col gap-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 shrink-0 mb-2">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 h-10">
            <Search size={16} className="text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                  activeFilter === f.key
                    ? "bg-white/15 border-white/25 text-white"
                    : "bg-white/[0.03] border-white/10 text-white/50 hover:bg-white/[0.08] hover:text-white/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="hidden md:block text-xs font-medium text-white/30 shrink-0 ml-2">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Project Grid */}
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start pb-4">
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-20 text-white/40 text-base">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Container query styles */}
      <style>{`
        .projects-wrapper {
          width: 100%;
          min-height: 100%;
        }
        .projects-container {
          width: 100%;
        }

        /* Maximized/Wide layout */
        @container (min-width: 800px) {
          .projects-wrapper {
            display: flex;
            justify-content: center;
            padding: 2rem;
          }
          .projects-container {
            max-width: 72rem; /* 6xl */
          }
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }
        @container (min-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
