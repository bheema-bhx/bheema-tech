"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { appRegistry } from "@/data/appRegistry";
import { resolveIcon } from "@/lib/iconResolver";

export function Dock({ onOpenWindow }: { onOpenWindow: (id: string) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Only show apps where showOnDock !== false
  const dockApps = appRegistry.filter((app) => app.showOnDock !== false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/15 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        {dockApps.map((app, index) => {
          const isHovered = hoveredIndex === index;
          const isNeighbor =
            hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

          let scale = 1;
          if (isHovered) scale = 1.4;
          else if (isNeighbor) scale = 1.15;

          return (
            <motion.div
              key={app.id}
              className="relative flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (app.externalUrl) {
                  window.open(app.externalUrl, "_blank");
                } else {
                  onOpenWindow(app.id);
                }
              }}
              animate={{ scale, marginBottom: isHovered ? 10 : isNeighbor ? 5 : 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-0 pointer-events-none px-3 py-1 text-sm bg-black/60 backdrop-blur-md text-white border border-white/20 rounded-lg whitespace-nowrap shadow-lg"
                  >
                    {app.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-inner",
                  "bg-gradient-to-br from-white/20 to-white/5 border border-white/30 text-white"
                )}
              >
                {app.isFaIcon ? (
                  <i className={`${app.faClass} text-2xl`} aria-hidden="true" />
                ) : (
                  resolveIcon(app.iconName, { size: 24 })
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
