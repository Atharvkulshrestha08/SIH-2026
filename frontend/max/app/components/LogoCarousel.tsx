"use client";

import React from "react";

interface LogoItem {
  name: string;
  tag: string;
  icon: React.ReactNode;
}

const row1Logos: LogoItem[] = [
  {
    name: "RUNWAY",
    tag: "Gen-3 Alpha",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "MIDJOURNEY",
    tag: "v6.1 Neural",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 000 18v-9h9" />
      </svg>
    ),
  },
  {
    name: "STABILITY AI",
    tag: "SDXL Core",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: "OPENAI",
    tag: "DALL·E 3",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    name: "HUGGING FACE",
    tag: "Diffusion Hub",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "SCALE AI",
    tag: "RLHF Engine",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4v12l-9 4-9-4V6z" />
      </svg>
    ),
  },
  {
    name: "ELEVENLABS",
    tag: "Voice Latent",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="6" y1="4" x2="6" y2="20" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" />
        <line x1="18" y1="2" x2="18" y2="22" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "ANTHROPIC",
    tag: "Claude Vision",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2" />
      </svg>
    ),
  },
];

const row2Logos: LogoItem[] = [
  {
    name: "UNREAL ENGINE",
    tag: "Lumen 5.4",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    name: "OCTANE RENDER",
    tag: "GPU Raytracing",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      </svg>
    ),
  },
  {
    name: "BLENDER 3D",
    tag: "Cycles Engine",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
      </svg>
    ),
  },
  {
    name: "NVIDIA OMNIVERSE",
    tag: "RTX Tensor Core",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    name: "CINEMA 4D",
    tag: "Redshift V3",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
        <path d="M4 12h16M12 4v16" />
      </svg>
    ),
  },
  {
    name: "ADOBE FIREFLY",
    tag: "Creative Cloud",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "FIGMA",
    tag: "Design Systems",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zM12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 11-7 0zM5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0zM5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" />
      </svg>
    ),
  },
  {
    name: "APPLE METAL",
    tag: "Unified Shaders",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function LogoCarousel() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#000000] border-t border-white/[0.04] overflow-hidden">
      
      {/* Header Label */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-10 text-center">
        <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-neutral-400">
          POWERED BY WORLD-CLASS NEURAL PIPELINES & 3D HARDWARE
        </span>
      </div>

      {/* Masked Marquee Container with smooth edge fades */}
      <div className="mask-marquee w-full space-y-5">
        
        {/* Row 1: Right to Left */}
        <div className="animate-marquee-left flex gap-6 sm:gap-8 items-center">
          {[...row1Logos, ...row1Logos].map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 text-neutral-400 hover:text-white cursor-pointer group whitespace-nowrap"
            >
              <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs tracking-[0.16em] font-medium uppercase text-neutral-200 group-hover:text-white">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono tracking-wider text-neutral-500 group-hover:text-purple-300/80">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Left to Right */}
        <div className="animate-marquee-right flex gap-6 sm:gap-8 items-center">
          {[...row2Logos, ...row2Logos].map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 text-neutral-400 hover:text-white cursor-pointer group whitespace-nowrap"
            >
              <div className="text-pink-400 group-hover:text-pink-300 transition-colors">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs tracking-[0.16em] font-medium uppercase text-neutral-200 group-hover:text-white">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono tracking-wider text-neutral-500 group-hover:text-pink-300/80">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
