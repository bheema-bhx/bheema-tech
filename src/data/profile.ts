import { Profile, SocialLink } from "@/types/portfolio";

export const profile: Profile = {
  name: "Bheema P",
  role: "Fractional Tech Lead & Web3 Engineer",
  bio: "Seasoned technology leader and former Head of Engineering with a strong track record in crafting technical roadmaps and leading high-performing teams. Successfully spearheaded major Web3 projects, integrating innovative solutions and aligning technology with business goals. Proven ability to drive Agile transformations and optimize operations through new technologies. Eager to leverage expertise in strategic planning and product development to lead engineering initiatives and achieve impactful results.",
  avatar: "/bheema_nft.webp", // We will provide an SVG fallback if this image doesn't exist
  email: "bheemas.dev@gmail.com",
  location: "Andhra Pradesh, India",
  resumeUrl: "/Bheema_P_Resume.pdf",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/bheema-bhx",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/bheema23/",
    icon: "linkedin",
  },
  {
    platform: "X",
    url: "https://x.com/Bheema_SP",
    icon: "x",
  },
  {
    platform: "Telegram",
    url: "https://t.me/@BheemaP",
    icon: "telegram",
  },
  {
    platform: "Whatsapp",
    url: "https://wa.me/919640642123",
    icon: "whatsapp",
  },
];
