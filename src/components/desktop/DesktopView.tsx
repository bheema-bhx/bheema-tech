"use client";

import React, { useState, useRef } from "react";
import { PortfolioData } from "@/types/portfolio";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { MacWindow } from "./MacWindow";
import { appRegistry } from "@/data/appRegistry";
import { desktopComponentMap } from "../shared/appComponents";
import { resolveIcon } from "@/lib/iconResolver";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpotlightSearch } from "../shared/SpotlightSearch";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onOpen: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  externalUrl?: string;
  isFaIcon?: boolean;
  faClass?: string;
  appBg?: string;
}

function DesktopIcon({ id, label, icon, onOpen, selectedId, onSelect, constraintsRef, externalUrl, isFaIcon, faClass, appBg }: DesktopIconProps) {
  const isSelected = selectedId === id;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (externalUrl) {
          window.open(externalUrl, "_blank");
        } else {
          onOpen(id);
        }
      }}
      className="flex flex-col items-center gap-1 w-20 cursor-pointer z-10"
      initial={false}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className={cn(
          "w-[60px] h-[60px] flex items-center justify-center rounded-[14px] transition-all shadow-md",
          appBg || "bg-zinc-700",
          isSelected ? "brightness-75 ring-2 ring-white/50" : ""
        )}
        style={{
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        {isFaIcon ? (
          <i className={`${faClass} text-3xl text-white`} aria-hidden="true" />
        ) : (
          icon
        )}
      </div>
      <span 
        className={cn(
          "text-[13px] font-medium px-2 py-0.5 rounded text-center transition-colors leading-tight",
          isSelected ? "bg-[#0060df] text-white" : "text-white bg-transparent"
        )}
        style={{
          textShadow: isSelected ? "none" : "0 1px 3px rgba(0,0,0,0.8)"
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function DesktopView({ data, initialApp }: { data: PortfolioData; initialApp?: string | null }) {
  const [activeWindow, setActiveWindow] = useState<string | null>(initialApp || "about");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const desktopRef = useRef<HTMLDivElement>(null);

  // Toggle window open/close
  const toggleWindow = (id: string | null) => {
    if (!id) return;
    setActiveWindow((prev) => (prev === id ? null : id));
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  // Filter apps for desktop icons (showOnDesktop !== false)
  const desktopApps = appRegistry.filter((app) => app.showOnDesktop !== false);

  // Filter apps that have a desktop component
  const windowApps = appRegistry.filter((app) => desktopComponentMap[app.id]);

  return (
    <div className="w-full h-full relative overflow-hidden font-sans">
      <MenuBar data={data} onSearchClick={() => setIsSearchOpen(true)} />
      
      {/* Spotlight Search Overlay */}
      <SpotlightSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onOpenApp={(id) => {
          setActiveWindow(id);
          setIsSearchOpen(false);
        }}
      />
      
      {/* Desktop Area */}
      <div 
        ref={desktopRef}
        className="pt-8 h-[calc(100vh-80px)] relative w-full flex items-center justify-center"
        onPointerDown={handleDesktopClick}
      >
        
        {/* Desktop Icons Layer — flows top-to-bottom, then wraps right-to-left (macOS style) */}
        <div className="absolute top-12 right-6 bottom-24 flex flex-col flex-wrap-reverse content-start gap-4 pointer-events-auto">
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.label}
              icon={resolveIcon(app.iconName, {
                size: 30,
                className: "text-white",
              })}
              onOpen={toggleWindow}
              selectedId={selectedIcon}
              onSelect={setSelectedIcon}
              constraintsRef={desktopRef}
              externalUrl={app.externalUrl}
              isFaIcon={app.isFaIcon}
              faClass={app.faClass}
              appBg={app.mobileColor}
            />
          ))}
        </div>

        {/* Windows Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8 z-50">
          {windowApps.map((app) => (
            <MacWindow
              key={app.id}
              title={app.label}
              isOpen={activeWindow === app.id}
              onClose={() => setActiveWindow(null)}
              className={cn(
                "w-full",
                app.windowSize?.maxWidth || "max-w-3xl",
                app.windowSize?.height || "h-[500px]"
              )}
            >
              {desktopComponentMap[app.id](data)}
            </MacWindow>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-30">
         <div className="pointer-events-auto">
           <Dock onOpenWindow={toggleWindow} />
         </div>
      </div>
    </div>
  );
}
