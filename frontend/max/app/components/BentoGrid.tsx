"use client";

import React from "react";

export default function BentoGrid() {
  return (
    <section className="relative w-full py-20 sm:py-32 bg-[#000000] text-neutral-100 overflow-hidden">
      
      {/* Background Cosmic Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-purple-900/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-pink-900/10 blur-[150px]" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/20 bg-purple-950/30 text-[11px] font-mono tracking-widest text-purple-300 uppercase">
            <span>ARCHITECTURE & CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-tight text-white">
            Engineered for{" "}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300">
              Autonomous Creativity.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            A cohesive suite of neural diffusion tools, telemetry monitors, and real-time generation engines designed for studio excellence.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ASYMMETRIC 2x2 BENTO GRID (Exact structural match to reference image) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ----------------------------------------------------------------------- */}
          {/* CARD 1 (Top Left, compact ~1/3 width, lg:col-span-4) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="cosmic-card rounded-[28px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[360px] sm:min-h-[400px] lg:col-span-4 group">
            
            {/* Ambient Cosmic Stars & Particles */}
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl group-hover:bg-pink-500/20 transition-all duration-700" />

            {/* Top Visual: Glowing Frosted + New Task / Prompt Pill with Neon Cursors */}
            <div className="relative z-10 pt-4 flex flex-col items-center justify-center min-h-[140px]">
              <div className="relative">
                
                {/* Glowing Button Pill */}
                <div className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-medium tracking-wide shadow-[0_0_30px_rgba(244,63,94,0.45)] border border-pink-300/40 flex items-center gap-1.5 cursor-pointer transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-sm leading-none font-light">+</span>
                  <span>New Prompt</span>
                </div>

                {/* Floating Neon Pink Arrow Cursors with Trailing Glow */}
                <div className="absolute -bottom-4 -right-5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] transform -rotate-12 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 2l16 8-8 3-3 8-5-19z" />
                  </svg>
                </div>

                <div className="absolute -bottom-8 -right-12">
                  <svg className="w-4 h-4 text-pink-300/80 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] transform -rotate-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 2l16 8-8 3-3 8-5-19z" />
                  </svg>
                </div>

                <div className="absolute -bottom-5 -right-18">
                  <svg className="w-4 h-4 text-rose-400/90 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] transform -rotate-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 2l16 8-8 3-3 8-5-19z" />
                  </svg>
                </div>

              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2.5 pt-6">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                Prompt Orchestration
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                With DreamFrame, you can easily organize latent prompts, assign style weights, and track generation seeds in real-time.
              </p>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 2 (Top Right, wide ~2/3 width, lg:col-span-8) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="cosmic-card rounded-[28px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden min-h-[360px] sm:min-h-[400px] lg:col-span-8 group">
            
            {/* Ambient Cosmic Stars */}
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />

            {/* Glowing Celestial Planet with Orbital Rings (Right Side of Card) */}
            <div className="pointer-events-none absolute -right-16 -bottom-16 sm:-right-8 sm:-bottom-12 w-[280px] sm:w-[380px] lg:w-[420px] aspect-square">
              
              {/* Planetary Sphere Body with Vibrant Pink/Magenta Gradient & Noise */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#581c87] via-[#be185d] to-[#fb7185] shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8),0_0_80px_rgba(244,63,94,0.35)] opacity-95 group-hover:scale-105 transition-transform duration-700">
                {/* Surface Atmosphere Rim Light */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/30" />
              </div>

              {/* Orbital Rings around Planet */}
              <div className="absolute inset-0 -m-8 rounded-full border border-pink-400/25 transform rotate-[28deg] scale-x-125 pointer-events-none" />
              <div className="absolute inset-0 -m-16 rounded-full border border-purple-400/15 transform -rotate-[18deg] scale-y-110 pointer-events-none" />

              {/* Sparkling Four-Point Stars */}
              <div className="absolute top-12 left-10 text-pink-200 animate-pulse">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </div>

              <div className="absolute bottom-28 left-4 text-purple-200 animate-pulse" style={{ animationDelay: "1s" }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </div>

            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-md space-y-4">
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
                Autonomous Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
                Automate repetitive rendering tasks and streamline your creative workflows with our powerful diffusion automation features.
              </p>
            </div>

            {/* Subtle interactive tag */}
            <div className="relative z-10 pt-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-purple-300/80">
                <span>ZERO-TOUCH PIPELINES</span>
                <span className="text-neutral-600">→</span>
              </span>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 3 (Bottom Left, medium ~45% width, lg:col-span-5) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="cosmic-card rounded-[28px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[340px] sm:min-h-[380px] lg:col-span-5 group">
            
            {/* Background Stars */}
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Top Visual: Radar Rings with Floating Frosted Chat Pill & Avatar */}
            <div className="relative z-10 pt-2 flex items-center justify-center min-h-[140px]">
              
              {/* Radar Concentric Rings */}
              <div className="relative w-48 h-28 flex items-center justify-center">
                <div className="absolute w-44 h-44 rounded-full border border-pink-500/10" />
                <div className="absolute w-32 h-32 rounded-full border border-purple-500/15" />
                <div className="absolute w-20 h-20 rounded-full border border-pink-500/20" />

                {/* Floating Frosted Pill Notification Card */}
                <div className="relative z-10 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#140f1d]/85 border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md max-w-[240px] group-hover:scale-105 transition-transform duration-300">
                  {/* User Avatar Circle */}
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-mono font-medium shadow-sm">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  {/* Message Placeholder Bars */}
                  <div className="space-y-1.5 flex-1">
                    <div className="h-1.5 w-24 rounded-full bg-white/25" />
                    <div className="h-1.5 w-16 rounded-full bg-white/15" />
                  </div>
                </div>

                {/* Sparkling Star Glints */}
                <div className="absolute -top-1 -right-2 text-pink-300/80 animate-pulse">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                  </svg>
                </div>
                <div className="absolute bottom-1 -left-2 text-purple-300/80 animate-pulse" style={{ animationDelay: "1.2s" }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2.5 pt-4">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                Analytics & Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Gain valuable insights into model performance, GPU tensor usage, and rendering step progress with our built-in analytics.
              </p>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 4 (Bottom Right, wide ~55% width, lg:col-span-7) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="cosmic-card rounded-[28px] p-7 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[340px] sm:min-h-[380px] lg:col-span-7 group">
            
            {/* Background Perspective Grid Lines Fading into Cosmic Void */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                transform: "perspective(300px) rotateX(25deg) translateY(-20px)",
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
              }}
            />

            {/* Ambient Purple Center Glow */}
            <div className="pointer-events-none absolute h-40 w-64 rounded-full bg-purple-600/10 blur-3xl group-hover:bg-purple-600/20 transition-all duration-700" />

            {/* Floating Celestial Sparkle */}
            <div className="absolute top-8 right-12 text-pink-400/50 animate-pulse">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </div>

            {/* Centered Content */}
            <div className="relative z-10 max-w-lg space-y-4">
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
                Collaboration Tools
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
                Foster collaboration and teamwork with our suite of shared latent canvas boards, live asset versioning, and team workspaces.
              </p>
              
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-neutral-300 hover:border-purple-500/40 transition-colors cursor-pointer">
                  <span>Explore Team Workspaces</span>
                  <span>→</span>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
