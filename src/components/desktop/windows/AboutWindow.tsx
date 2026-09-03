import React from "react";
import { PortfolioData } from "@/types/portfolio";
import { MapPin, Mail } from "lucide-react";
import Image from "next/image";

export function AboutWindow({ data }: { data: PortfolioData }) {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        {/* Header Section */}
        <div className="about-header">
          {/* Avatar */}
          <div className="about-avatar rounded-[28px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 p-[2.5px] shrink-0 shadow-xl shadow-purple-500/20">
            <div className="relative w-full h-full rounded-[26px] bg-black/60 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              {data.profile.avatar && data.profile.avatar !== "/avatar.svg" ? (
                <Image
                  src={data.profile.avatar}
                  alt={data.profile.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white/80">
                  {data.profile.name[0]}
                </span>
              )}
            </div>
          </div>

          {/* Name & Role */}
          <div className="flex flex-col justify-center">
            <h2 className="about-name font-bold text-white tracking-tight">
              {data.profile.name}
            </h2>
            <p className="about-role font-medium mt-0.5">
              {data.profile.role}
            </p>
            <div className="about-info">
              {data.profile.location && (
                <span className="flex items-center gap-1.5 text-white/40 text-xs">
                  <MapPin size={12} />
                  {data.profile.location}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-white/40 text-xs">
                <Mail size={12} />
                {data.profile.email}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full" />

        {/* Bio */}
        <p className="about-bio leading-relaxed">
          {data.profile.bio}
        </p>

      </div>

      <style>{`
        .about-wrapper {
          width: 100%;
          min-height: 100%;
        }
        .about-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }
        .about-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .about-avatar {
          width: 7rem;
          height: 7rem;
        }
        .about-name {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        .about-role {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }
        .about-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.625rem;
        }
        .about-bio {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.75);
        }

        /* Maximized layout */
        @container (min-width: 800px) {
          .about-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .about-card {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 2.5rem;
            border-radius: 2rem;
            backdrop-filter: blur(24px);
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            max-width: 48rem;
            margin: auto;
            gap: 2rem;
          }
          .about-header {
            gap: 2rem;
          }
          .about-avatar {
            width: 10rem;
            height: 10rem;
          }
          .about-name {
            font-size: 2.25rem;
            line-height: 2.5rem;
            margin-bottom: 0.5rem;
          }
          .about-role {
            font-size: 1.125rem;
            color: #60a5fa; /* blue-400 */
            margin-bottom: 1rem;
          }
          .about-bio {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.8);
          }
        }
      `}</style>
    </div>
  );
}
