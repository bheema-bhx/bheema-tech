"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";

interface WallpaperProps {
  className?: string;
}

export function Wallpaper({ className }: WallpaperProps) {
  const wallpaperSrc = portfolioData.theme?.wallpaperUrl || "/background/bg.png";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[-1] overflow-hidden bg-black",
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={wallpaperSrc}
          alt="Wallpaper"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
}
