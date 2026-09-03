import { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Autheo",
    description: "The Collective & Living OS — the foundation for the connected, intelligent web.",
    thumbnail: "/autheo.png",
    techStack: ["Layer-0", "Layer-1", "Blockchain", "AI", "Web3", "NFT", "DAO", "DeFi"],
    githubUrl: "https://github.com/autheo-blockchain",
    liveUrl: "https://www.autheo.com/",
    featured: true,
    isOpenSource: true,
  },
  {
    id: "project-2",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with integrated payments and dashboard.",
    thumbnail: "/project-2.svg",
    techStack: ["React", "Node.js", "Stripe", "PostgreSQL"],
    liveUrl: "https://shop.bheema.dev",
    featured: true,
    isOpenSource: false,
  },
  {
    id: "project-3",
    title: "Theo AI",
    description: "Theo AI is a powerful AI agent that can help you with your tasks and projects.",
    thumbnail: "/project-3.svg",
    techStack: ["AI", "Web3", "NFT", "DAO", "DeFi"],
    githubUrl: "https://github.com/autheo-blockchain",
    isOpenSource: true,
  },
];
