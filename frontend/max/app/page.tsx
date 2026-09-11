"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoCarousel from "./components/LogoCarousel";
import BentoGrid from "./components/BentoGrid";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("16K HD");
  const [activePrompt, setActivePrompt] = useState(
    "Futuristic cybernetic core in deep obsidian void, liquid metallic chrome ribbon waves, violet studio rim lighting, 8k octane render"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const samplePrompts = [
    "Cybernetic core in obsidian void, liquid chrome metallic ribbon waves, subtle violet rim lighting",
    "Liquid titanium biomechanical sculpture, minimal studio reflections, ultra-clean geometry",
    "Holographic glass HUD interface floating over deep space dunes, monochromatic cyan and violet",
  ];

  const handlePromptClick = (promptText: string) => {
    setActivePrompt(promptText);
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

  const goToWorkbench = (path = "/workbench") => {
    router.push(path);
  };

  return (
    <div className="relative w-full bg-[#000000] text-neutral-200 selection:bg-purple-900 selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* HERO SECTION: Clean Natural Viewport (No Dead Scroll Gap) */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden bg-[#000000]">
        
        {/* Large, smooth cinematic dark shadow behind left text (strongest 10-25%, fading out at 45-50%) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[60%] z-10"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 18% 50%, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.82) 22%, rgba(0, 0, 0, 0.45) 36%, rgba(0, 0, 0, 0.12) 48%, transparent 60%)",
          }}
        />

        {/* ========================================================================= */}
        {/* TOP NAVIGATION BAR (Clean, Minimal, Refined) */}
        {/* ========================================================================= */}
        <header className="relative z-20 w-full max-w-[1400px] mx-auto flex items-center justify-between py-3 sm:py-5 border-b border-white/[0.05]">
          
          {/* Brand Name & Identifier */}
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-purple-500" />
            <span className="text-sm tracking-[0.24em] font-normal uppercase text-neutral-100">
              DREAMFRAME
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-500 font-mono pl-1 border-l border-white/[0.08]">
              AI IMAGE
            </span>
          </div>

          {/* Center Navigation Links (Minimalist Text Links) */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider text-neutral-400 font-light">
            {["16K HD", "Neural Engine", "Presets", "Showcase"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-white font-normal" : "hover:text-neutral-200"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Right Status & Action */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="hidden sm:inline">ENGINE READY</span>
            </div>

            <Link
              href="/workbench"
              className="text-xs font-normal tracking-wider px-4 py-1.5 rounded-full border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white transition-all bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.2)] inline-flex items-center no-underline"
            >
              Launch Studio →
            </Link>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* HERO SECTION: Balanced Editorial Content + Starting Laptop Visual */}
        {/* ========================================================================= */}
        <main className="relative z-20 w-full max-w-[1400px] mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
          
          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Light Typography Hierarchy & Minimal CTA */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 z-20">
            
            {/* Availability-Style Minimal Badge */}
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[11px] tracking-[0.18em] font-normal uppercase text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>AI IMAGE GENERATOR</span>
                <span className="text-neutral-600">•</span>
                <span className="text-[10px] text-neutral-400 font-mono">v4.5</span>
              </div>
            </div>

            {/* Headline: Slightly Bolder with White -> Subtle Lavender Gradient & Soft Glow */}
            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-normal sm:font-medium tracking-[-0.03em] leading-[1.14] bg-gradient-to-r from-white via-[#f5f3ff] to-[#ddd6fe] text-transparent bg-clip-text drop-shadow-[0_2px_16px_rgba(221,214,254,0.22)] drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
              Create unreal visuals with AI, rendered at pure studio fidelity.
            </h1>

            {/* Concise Supporting Description */}
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Synthesize hyper-detailed 3D forms, cinematic lighting, and studio-grade assets directly from semantic prompts at native 16K clarity.
            </p>

            {/* CTA Buttons (Refined Orange-Purple Minimal Pill + Simple Secondary) */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Minimalist Orange-Purple Gradient CTA - Direct to Workbench */}
              <Link
                href="/workbench"
                className="btn-gradient-cta inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 text-xs tracking-wider uppercase font-medium text-white transition-all cursor-pointer shadow-lg no-underline"
              >
                <span>Start Creating</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Minimal Secondary Text Action */}
              <Link
                href="/workbench"
                className="text-xs tracking-wider uppercase text-neutral-400 hover:text-white px-4 py-3 font-normal transition-colors flex items-center gap-1.5 no-underline"
              >
                <span>View Gallery</span>
                <span className="text-neutral-500">→</span>
              </Link>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* MINIMAL TELEMETRY CARD (Hairline graph matching reference) */}
            {/* ----------------------------------------------------------------- */}
            <Link href="/workbench" className="pt-2 max-w-sm block no-underline text-inherit cursor-pointer">
              <div className="glass-panel-minimal rounded-xl p-4 border border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-3 border-b border-white/[0.05]">
                  <span className="tracking-wider">LATENT SYNTHESIS</span>
                  <span className="text-purple-300">BIO-POLYMER</span>
                </div>

                <div className="pt-3 flex items-end justify-between gap-6">
                  {/* Thin Minimalist Equalizer Bars */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-end gap-1 h-10">
                      {[30, 50, 45, 80, 95, 60, 40, 75, 85, 55].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 rounded-t-xs transition-all duration-300"
                          style={{
                            height: `${val}%`,
                            backgroundColor:
                              idx > 6
                                ? "rgba(168, 85, 247, 0.7)"
                                : idx > 3
                                ? "rgba(255, 255, 255, 0.35)"
                                : "rgba(255, 255, 255, 0.12)",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500">
                      <span>100Hz</span>
                      <span>1.2kHz</span>
                    </div>
                  </div>

                  {/* Minimal Dial Indicator (2.1s from reference) */}
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-xl font-light font-mono text-white">2.1</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">sec</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Starting Laptop Image Frame & Floating Holographic HUD */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            
            {/* Visual Frame Container with Starting Laptop */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
              <Image
                src="/frames/ezgif-frame-001.png"
                alt="DreamFrame Starting Laptop"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Edge gradients to blend seamlessly into pure black */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-transparent opacity-65 hidden lg:block" />

              {/* Minimal Holographic Glass HUD Card (Right Floating Card) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-[240px] sm:w-[280px] glass-panel-neon rounded-lg p-3.5 text-[11px] font-mono space-y-2.5 animate-float border border-white/[0.08] pointer-events-auto">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-neutral-300 font-normal tracking-wider">CORE STATUS</span>
                  <span className="text-[9px] text-purple-300 font-normal px-1.5 py-0.5 rounded bg-purple-950/40 border border-purple-500/20">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-1.5 text-neutral-400 text-[10px]">
                  <div className="flex justify-between">
                    <span>Neural Sync:</span>
                    <span className="text-neutral-200">99.8% Optimal</span>
                  </div>
                  <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-400 to-purple-500 h-full w-[94%]" />
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Sampler:</span>
                    <span className="text-neutral-300">DPM++ 2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="text-neutral-300">3840 × 2160 (16K)</span>
                  </div>
                </div>
              </div>

              {/* Minimal Sub-Badge (Bottom Left of 3D) */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 glass-panel-minimal rounded-md px-3 py-2 border border-white/[0.06] hidden sm:block pointer-events-auto">
                <span className="text-[10px] font-mono text-neutral-400">
                  Hardware: <span className="text-neutral-200">Studio Workstation</span>
                </span>
              </div>
            </div>

          </div>

        </main>

        {/* ========================================================================= */}
        {/* MAIN VISUAL: DREAMFRAME (Centered horizontally, ~90vw wide, bottom position) */}
        {/* ========================================================================= */}
        <div className="pointer-events-none relative w-full flex justify-center z-10 select-none overflow-hidden my-4 sm:my-6">
          <h2 className="w-[90vw] text-center font-light uppercase tracking-[0.14em] text-[clamp(2.5rem,8.6vw,8.5rem)] leading-none select-none bg-gradient-to-b from-white via-[#ede9fe] to-[#c084fc] text-transparent bg-clip-text drop-shadow-[0_0_45px_rgba(244,114,182,0.28)] drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]">
            DREAMFRAME
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* MINIMAL FOOTER / PROMPT STRIP */}
        {/* ========================================================================= */}
        <footer className="relative z-20 w-full max-w-[1400px] mx-auto pt-3 sm:pt-5 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Subtle Prompt Preview */}
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 overflow-hidden">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Prompt:</span>
              <span className="truncate text-neutral-300 font-light max-w-xl">
                &quot;{activePrompt}&quot;
              </span>
            </div>

            {/* Preset Buttons */}
            <div className="flex items-center gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(p)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

          </div>
        </footer>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: Infinite Dual Logo Marquee Carousel */}
      {/* ========================================================================= */}
      <LogoCarousel />

      {/* ========================================================================= */}
      {/* SECTION 2: Asymmetric Cosmic Bento Grid */}
      {/* ========================================================================= */}
      <BentoGrid />

    </div>
  );
}
