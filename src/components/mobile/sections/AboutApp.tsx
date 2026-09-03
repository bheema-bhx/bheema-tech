"use client";

import React from "react";
import { PortfolioData } from "@/types/portfolio";
import { MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutApp({ data }: { data: PortfolioData }) {
  return (
    <div className="flex flex-col items-center text-center pt-6 pb-12">
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-[3px] mb-6 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
      >
        <div className="relative w-full h-full rounded-full bg-black/60 overflow-hidden flex items-center justify-center">
          {data.profile.avatar && data.profile.avatar !== "/avatar.svg" ? (
            <Image
              src={data.profile.avatar}
              alt={data.profile.name}
              fill
              sizes="110px"
              className="object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-white/80">
              {data.profile.name[0]}
            </span>
          )}
        </div>
      </motion.div>

      {/* Name & Role */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-[28px] font-bold text-white tracking-tight mb-1">
          {data.profile.name}
        </h1>
        <p className="text-white/60 font-medium text-sm mb-2">
          {data.profile.role}
        </p>
        {data.profile.location && (
          <p className="text-white/40 text-xs flex items-center justify-center gap-1.5 mb-1">
            <MapPin size={12} /> {data.profile.location}
          </p>
        )}
        <p className="text-white/40 text-xs flex items-center justify-center gap-1.5 mb-5">
          <Mail size={12} /> {data.profile.email}
        </p>
      </motion.div>

      {/* Divider */}
      <div className="w-12 h-px bg-white/15 mb-5" />

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/75 text-sm leading-relaxed mb-8 max-w-[300px]"
      >
        {data.profile.bio}
      </motion.p>

    </div>
  );
}
