/**
 * App Registry — Single source of truth for all apps.
 *
 * To add a new app:
 * 1. Create the React component (desktop + mobile).
 * 2. Register the component in `components/shared/appComponents.tsx`.
 * 3. Add an entry here.
 *
 * All Desktop Icons, Dock items, MacWindows, and Mobile Home Grid/Screens
 * will automatically pick up the new app.
 */

// Supported Lucide icon names — extend this when you add new icons.
export type AppIconName =
  | "User"
  | "Code2"
  | "Cpu"
  | "Briefcase"
  | "Settings"
  | "Folder"
  | "FolderGit2"
  | "HeartHandshake"
  | "Music"
  | "Terminal"
  | "StickyNote"
  | "Image";

export interface AppDefinition {
  /** Unique identifier used as key everywhere. */
  id: string;
  /** Display name shown in tooltips, title bars, labels. */
  label: string;
  /** Lucide icon name (string, resolved at runtime). */
  iconName: AppIconName;
  /** Show as a draggable desktop icon? @default true */
  showOnDesktop?: boolean;
  /** Show in the Dock? @default true */
  showOnDock?: boolean;
  /** Show on the mobile home screen? @default true */
  showOnMobile?: boolean;
  /** The Tailwind class for the icon color on desktop (e.g., "text-blue-500"). */
  iconColor?: string;
  /** The Tailwind background color class for the mobile icon container. */
  mobileColor?: string;
  /** Custom window size for the desktop version. */
  windowSize?: {
    maxWidth?: string;
    height?: string;
  };
  
  // -- Dynamic External Apps --
  /** If true, clicking this app opens the externalUrl instead of a window. */
  externalUrl?: string;
  /** If true, renders a FontAwesome icon instead of a Lucide icon. */
  isFaIcon?: boolean;
  /** The FontAwesome class (e.g., "fa-brands fa-github") if isFaIcon is true. */
  faClass?: string;
}

const staticApps: AppDefinition[] = [
  {
    id: "about",
    label: "About Me",
    iconName: "User",
    iconColor: "text-blue-400",
    mobileColor: "bg-blue-500",
    windowSize: { maxWidth: "max-w-3xl", height: "h-[500px]" },
  },
  {
    id: "projects",
    label: "Projects",
    iconName: "Folder",
    iconColor: "text-sky-300",
    mobileColor: "bg-purple-500",
    windowSize: { maxWidth: "max-w-3xl", height: "h-[600px]" },
  },
  {
    id: "skills",
    label: "Skills",
    iconName: "Cpu",
    iconColor: "text-emerald-400",
    mobileColor: "bg-emerald-500",
    windowSize: { maxWidth: "max-w-2xl", height: "h-[500px]" },
  },
  {
    id: "experience",
    label: "Experience",
    iconName: "Briefcase",
    iconColor: "text-orange-400",
    mobileColor: "bg-orange-500",
    windowSize: { maxWidth: "max-w-2xl", height: "h-[600px]" },
  },
  {
    id: "music",
    label: "Music",
    iconName: "Music",
    iconColor: "text-green-400",
    mobileColor: "bg-green-500",
    windowSize: { maxWidth: "max-w-3xl", height: "h-[600px]" },
  },
  {
    id: "terminal",
    label: "Terminal",
    iconName: "Terminal",
    iconColor: "text-slate-200",
    mobileColor: "bg-slate-800",
    windowSize: { maxWidth: "max-w-3xl", height: "h-[500px]" },
  },
  {
    id: "notes",
    label: "Notes",
    iconName: "StickyNote",
    iconColor: "text-yellow-400",
    mobileColor: "bg-yellow-500",
    windowSize: { maxWidth: "max-w-4xl", height: "h-[550px]" },
  },
  {
    id: "photos",
    label: "Photos",
    iconName: "Image",
    iconColor: "text-blue-500",
    mobileColor: "bg-blue-600",
    windowSize: { maxWidth: "max-w-4xl", height: "h-[600px]" },
  },
];

import { socialApps } from "./socialApps";

export const appRegistry: AppDefinition[] = [...staticApps, ...socialApps];
