import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bheema — Fractional Tech Lead & Web3 Engineer",
    template: "%s | Bheema",
  },
  description:
    "Seasoned technology leader and former Head of Engineering with a strong track record in crafting technical roadmaps and leading high-performing teams. Successfully spearheaded major Web3 projects, integrating innovative solutions and aligning technology with business goals. Proven ability to drive Agile transformations and optimize operations through new technologies. Eager to leverage expertise in strategic planning and product development to lead engineering initiatives and achieve impactful results.",
  keywords: [
    "Bheema",
    "portfolio",
    "developer",
    "full stack",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "macOS",
    "iOS",
    "UI/UX",
    "frontend",
    "web developer",
    "India",
  ],
  authors: [{ name: "Bheema", url: "https://bheema.me" }],
  creator: "Bheema",
  metadataBase: new URL("https://bheema.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bheema.me",
    siteName: "BheemaP",
    title: "Bheema — Fractional Tech Lead & Web3 Engineer",
    description:
      "Seasoned technology leader and former Head of Engineering with a strong track record in crafting technical roadmaps and leading high-performing teams. Successfully spearheaded major Web3 projects, integrating innovative solutions and aligning technology with business goals. Proven ability to drive Agile transformations and optimize operations through new technologies. Eager to leverage expertise in strategic planning and product development to lead engineering initiatives and achieve impactful results.",
    images: [
      {
        url: "/screenshot/desktop.png",
        width: 1920,
        height: 1080,
        alt: "Bheema — Fractional Tech Lead & Web3 Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bheema — Fractional Tech Lead & Web3 Engineer",
    description:
      "Seasoned technology leader and former Head of Engineering with a strong track record in crafting technical roadmaps and leading high-performing teams. Successfully spearheaded major Web3 projects, integrating innovative solutions and aligning technology with business goals. Proven ability to drive Agile transformations and optimize operations through new technologies. Eager to leverage expertise in strategic planning and product development to lead engineering initiatives and achieve impactful results.",
    images: ["/screenshot/desktop.png"],
    creator: "@bheema",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" translate="no">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full flex flex-col overflow-hidden bg-black text-white">
        {children}
      </body>
    </html>
  );
}
