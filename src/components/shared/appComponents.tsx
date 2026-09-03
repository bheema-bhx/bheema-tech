"use client";

import React from "react";
import { PortfolioData } from "@/types/portfolio";
import {
  AboutWindow,
  ProjectsWindow,
  SkillsWindow,
  ExperienceWindow,
  MusicWindow,
  TerminalWindow,
  NotesWindow,
  PhotosWindow,
} from "../desktop/windows";
import {
  AboutApp,
  ProjectsApp,
  SkillsApp,
  ExperienceApp,
  MusicApp,
  TerminalApp,
  NotesApp,
  PhotosApp,
} from "../mobile/sections";

/**
 * Component Maps — connect app IDs to their React components.
 *
 * To register a new app:
 * 1. Import your component.
 * 2. Add a key matching the `id` from appRegistry.ts.
 * 3. Provide a factory function that receives PortfolioData.
 */

export const desktopComponentMap: Record<
  string,
  (data: PortfolioData) => React.ReactNode
> = {
  about: (data) => <AboutWindow data={data} />,
  projects: (data) => <ProjectsWindow data={data} />,
  skills: (data) => <SkillsWindow data={data} />,
  experience: (data) => <ExperienceWindow data={data} />,
  music: (data) => <MusicWindow data={data} />,
  terminal: (data) => <TerminalWindow data={data} />,
  notes: (data) => <NotesWindow data={data} />,
  photos: (data) => <PhotosWindow data={data} />,
};

export const mobileComponentMap: Record<
  string,
  (data: PortfolioData) => React.ReactNode
> = {
  about: (data) => <AboutApp data={data} />,
  projects: (data) => <ProjectsApp data={data} />,
  skills: (data) => <SkillsApp data={data} />,
  experience: (data) => <ExperienceApp data={data} />,
  music: (data) => <MusicApp data={data} />,
  terminal: (data) => <TerminalApp data={data} />,
  notes: (data) => <NotesApp data={data} />,
  photos: (data) => <PhotosApp data={data} />,
};
