"use client";

import React from "react";
import { motion, useDragControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function MacWindow({
  title,
  children,
  className,
  isOpen = true,
  onClose,
}: MacWindowProps) {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{ left: -500, right: 500, top: -100, bottom: 500 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={cn(
        "flex flex-col overflow-hidden shadow-2xl backdrop-blur-2xl border pointer-events-auto",
        !isDragging && "transition-all duration-300",
        "bg-black/60 border-white/20 text-white",
        !isMaximized && className,
        isMaximized && "fixed inset-0 m-0 rounded-none z-[100] w-screen h-screen max-w-none max-h-none !transform-none"
      )}
    >
      {/* Title Bar - Draggable Area */}
      <div
        className={cn(
          "h-10 px-4 flex items-center justify-between border-b bg-white/5 border-white/10",
          !isMaximized ? "cursor-grab active:cursor-grabbing" : ""
        )}
        onPointerDown={(e) => {
          if (!isMaximized) dragControls.start(e);
        }}
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        {/* Traffic Lights */}
        <div className="flex gap-2 relative z-10">
          <button
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-5 h-5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center border border-black/10 transition-colors"
            aria-label="Close window"
          >
            <X size={10} strokeWidth={4} className="text-black" />
          </button>
          <button 
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()} 
            className="w-5 h-5 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center border border-black/10 transition-colors" 
            aria-label="Minimize window"
          >
            <Minus size={10} strokeWidth={4} className="text-black" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            onPointerDown={(e) => e.stopPropagation()} 
            className="w-5 h-5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center border border-black/10 transition-colors" 
            aria-label="Maximize window"
          >
            {isMaximized 
              ? <Minimize2 size={10} strokeWidth={4} className="text-black" />
              : <Maximize2 size={10} strokeWidth={4} className="text-black" />
            }
          </button>
        </div>

        {/* Title */}
        <div className="text-xs font-semibold opacity-70 absolute left-1/2 -translate-x-1/2 select-none pointer-events-none">
          {title}
        </div>

        <div className="w-[52px]" /> {/* Spacer for symmetry */}
      </div>

      {/* Content Area */}
      <div 
        className="flex-1 overflow-y-auto p-6 custom-scrollbar"
        style={{ containerType: "inline-size" }}
        onPointerDown={(e) => e.stopPropagation()} // Ensure scrolling doesn't drag
      >
        {children}
      </div>
    </motion.div>
  );
}
