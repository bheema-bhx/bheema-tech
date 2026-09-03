"use client";

import React from "react";
import {
  User,
  Code2,
  Cpu,
  Briefcase,
  Settings,
  Folder,
  FolderGit2,
  Command,
  HeartHandshake,
  Mail,
  Music,
  Terminal,
  StickyNote,
  Image as ImageIcon,
} from "lucide-react";

/**
 * Maps icon name strings to Lucide React components.
 * Extend this map when you add a new AppIconName.
 */
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  User,
  Code2,
  Cpu,
  Briefcase,
  Settings,
  Folder,
  FolderGit2,
  Command,
  HeartHandshake,
  Mail,
  Music,
  Terminal,
  StickyNote,
  Image: ImageIcon,
};

/**
 * Resolve a string icon name to a rendered React element.
 *
 * @param name  - One of the AppIconName values
 * @param props - Props forwarded to the Lucide icon (size, className, etc.)
 */
export function resolveIcon(
  name: string,
  props?: { size?: number; className?: string }
): React.ReactNode {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
