export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

export type Skill = {
  name: string;
  category: "Languages" | "Frameworks & Libraries" | "Backend & Database" | "Tools" | "Design" | string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  /** Whether the project is open source. Defaults to true if githubUrl is provided. */
  isOpenSource?: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Profile = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  resumeUrl?: string;
};

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: string; // e.g. "3:45"
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string; // e.g. "2024-08-05"
  pinned?: boolean;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  socialLinks: SocialLink[];
  playlist?: Song[];
  notes?: Note[];
  photos?: Photo[];
  theme?: {
    wallpaperUrl: string;
    bootLogo?: {
      type: "icon" | "image";
      value: string;
    };
  };
}
