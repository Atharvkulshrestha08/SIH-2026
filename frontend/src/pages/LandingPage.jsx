import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dreamframe.css";

export default function LandingPage() {
  const navigate = useNavigate();
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

  const handlePromptClick = (promptText) => {
    setActivePrompt(promptText);
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

  const goToWorkbench = (path = "/workbench") => {
    navigate(path);
  };

  return (
    <div className="relative w-full bg-[#000000] text-neutral-200 selection:bg-purple-900 selection:text-white overflow-x-hidden min-h-screen">
      
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden bg-[#000000]">
        
        {/* Large smooth cinematic dark shadow behind left text */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[60%] z-10"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 18% 50%, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.82) 22%, rgba(0, 0, 0, 0.45) 36%, rgba(0, 0, 0, 0.12) 48%, transparent 60%)",
          }}
        />

        {/* TOP NAVIGATION BAR */}
        <header className="relative z-20 w-full max-w-[1400px] mx-auto flex items-center justify-between py-3 sm:py-5 border-b border-white/[0.05]">
          
          {/* Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToWorkbench("/workbench")}>
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-purple-500" />
            <span className="text-sm tracking-[0.24em] font-normal uppercase text-neutral-100">
              DREAMFRAME
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-neutral-500 font-mono pl-1 border-l border-white/[0.08]">
              AI WORKBENCH
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider text-neutral-400 font-light">
            <button
              onClick={() => { setActiveTab("16K HD"); goToWorkbench("/models"); }}
              className={`transition-colors duration-200 ${activeTab === "16K HD" ? "text-white font-normal" : "hover:text-neutral-200"}`}
            >
              16K HD
            </button>
            <button
              onClick={() => { setActiveTab("Neural Engine"); goToWorkbench("/status"); }}
              className={`transition-colors duration-200 ${activeTab === "Neural Engine" ? "text-white font-normal" : "hover:text-neutral-200"}`}
            >
              Neural Engine
            </button>
            <button
              onClick={() => { setActiveTab("Presets"); goToWorkbench("/workbench"); }}
              className={`transition-colors duration-200 ${activeTab === "Presets" ? "text-white font-normal" : "hover:text-neutral-200"}`}
            >
              Workbench
            </button>
            <button
              onClick={() => { setActiveTab("Documentation"); goToWorkbench("/knowledge"); }}
              className={`transition-colors duration-200 ${activeTab === "Documentation" ? "text-white font-normal" : "hover:text-neutral-200"}`}
            >
              Knowledge Base
            </button>
          </nav>

          {/* Right Status & Workbench Action Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="hidden sm:inline">ENGINE READY</span>
            </div>

            <button
              onClick={() => goToWorkbench("/workbench")}
              className="text-xs font-normal tracking-wider px-4 py-1.5 rounded-full border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white transition-all bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              Launch Studio →
            </button>
          </div>
        </header>

        {/* HERO CONTENT */}
        <main className="relative z-20 w-full max-w-[1400px] mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
          
          {/* LEFT COLUMN: Editorial Typography & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 z-20">
            
            {/* Availability Badge */}
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[11px] tracking-[0.18em] font-normal uppercase text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>AI IMAGE GENERATOR</span>
                <span className="text-neutral-600">•</span>
                <span className="text-[10px] text-neutral-400 font-mono">v4.5</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-normal sm:font-medium tracking-[-0.03em] leading-[1.14] bg-gradient-to-r from-white via-[#f5f3ff] to-[#ddd6fe] text-transparent bg-clip-text drop-shadow-[0_2px_16px_rgba(221,214,254,0.22)] drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
              Create unreal visuals with AI, rendered at pure studio fidelity.
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Synthesize hyper-detailed 3D forms, cinematic lighting, and studio-grade assets directly from semantic prompts at native 16K clarity.
            </p>

            {/* CTA Buttons: DIRECTLY CONNECTED TO WORKBENCH */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => goToWorkbench("/workbench")}
                className="df-btn-gradient-cta inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 text-xs tracking-wider uppercase font-medium text-white transition-all cursor-pointer"
              >
                <span>Start Creating</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() => goToWorkbench("/documents")}
                className="text-xs tracking-wider uppercase text-neutral-400 hover:text-white px-4 py-3 font-normal transition-colors flex items-center gap-1.5"
              >
                <span>View Gallery</span>
                <span className="text-neutral-500">→</span>
              </button>
            </div>

            {/* TELEMETRY CARD */}
            <div className="pt-2 max-w-sm cursor-pointer" onClick={() => goToWorkbench("/status")}>
              <div className="df-glass-panel-minimal rounded-xl p-4 border border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-3 border-b border-white/[0.05]">
                  <span className="tracking-wider">LATENT SYNTHESIS</span>
                  <span className="text-purple-300">BIO-POLYMER</span>
                </div>

                <div className="pt-3 flex items-end justify-between gap-6">
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

                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-xl font-light font-mono text-white">2.1</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">sec</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Laptop Visual & Floating HUD */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
              <img
                src="/frames/ezgif-frame-001.png"
                alt="DreamFrame Starting Laptop"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-transparent opacity-65 hidden lg:block" />

              {/* Floating Holographic Card */}
              <div
                onClick={() => goToWorkbench("/status")}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-[240px] sm:w-[280px] df-glass-panel-neon rounded-lg p-3.5 text-[11px] font-mono space-y-2.5 df-animate-float border border-white/[0.08] cursor-pointer"
              >
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

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 df-glass-panel-minimal rounded-md px-3 py-2 border border-white/[0.06] hidden sm:block">
                <span className="text-[10px] font-mono text-neutral-400">
                  Hardware: <span className="text-neutral-200">Studio Workstation</span>
                </span>
              </div>
            </div>
          </div>

        </main>

        {/* DREAMFRAME Main Visual */}
        <div className="pointer-events-none relative w-full flex justify-center z-10 select-none overflow-hidden my-4 sm:my-6">
          <h2 className="w-[90vw] text-center font-light uppercase tracking-[0.14em] text-[clamp(2.5rem,8.6vw,8.5rem)] leading-none select-none bg-gradient-to-b from-white via-[#ede9fe] to-[#c084fc] text-transparent bg-clip-text drop-shadow-[0_0_45px_rgba(244,114,182,0.28)] drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]">
            DREAMFRAME
          </h2>
        </div>

        {/* Footer Prompt Strip */}
        <footer className="relative z-20 w-full max-w-[1400px] mx-auto pt-3 sm:pt-5 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 overflow-hidden">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Prompt:</span>
              <span className="truncate text-neutral-300 font-light max-w-xl">
                &quot;{activePrompt}&quot;
              </span>
            </div>

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
      {/* SECTION 1: Infinite Dual Logo Marquee */}
      {/* ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 bg-[#000000] border-t border-white/[0.04] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-10 text-center">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-neutral-400">
            POWERED BY WORLD-CLASS NEURAL PIPELINES & 3D HARDWARE
          </span>
        </div>

        <div className="df-mask-marquee w-full space-y-5">
          {/* Row 1: Right to Left */}
          <div className="df-marquee-left flex gap-6 sm:gap-8 items-center">
            {["RUNWAY", "MIDJOURNEY", "STABILITY AI", "OPENAI", "HUGGING FACE", "SCALE AI", "ELEVENLABS", "ANTHROPIC", "RUNWAY", "MIDJOURNEY", "STABILITY AI", "OPENAI"].map((name, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => goToWorkbench("/models")}
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 text-neutral-400 hover:text-white cursor-pointer group whitespace-nowrap"
              >
                <div className="h-2 w-2 rounded-full bg-purple-400 group-hover:scale-125 transition-transform" />
                <span className="text-xs tracking-[0.16em] font-medium uppercase text-neutral-200 group-hover:text-white">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Left to Right */}
          <div className="df-marquee-right flex gap-6 sm:gap-8 items-center">
            {["UNREAL ENGINE", "OCTANE RENDER", "BLENDER 3D", "NVIDIA OMNIVERSE", "CINEMA 4D", "ADOBE FIREFLY", "FIGMA", "APPLE METAL", "UNREAL ENGINE", "OCTANE RENDER"].map((name, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => goToWorkbench("/models")}
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-pink-500/30 transition-all duration-300 text-neutral-400 hover:text-white cursor-pointer group whitespace-nowrap"
              >
                <div className="h-2 w-2 rounded-full bg-pink-400 group-hover:scale-125 transition-transform" />
                <span className="text-xs tracking-[0.16em] font-medium uppercase text-neutral-200 group-hover:text-white">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Asymmetric Cosmic Bento Grid */}
      {/* ========================================================================= */}
      <section className="relative w-full py-20 sm:py-32 bg-[#000000] text-neutral-100 overflow-hidden">
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

          {/* Asymmetric 2x2 Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* CARD 1: Prompt Orchestration */}
            <div
              onClick={() => goToWorkbench("/chat")}
              className="df-cosmic-card rounded-[28px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[360px] sm:min-h-[400px] lg:col-span-4 group cursor-pointer"
            >
              <div className="relative z-10 pt-4 flex flex-col items-center justify-center min-h-[140px]">
                <div className="relative">
                  <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-medium tracking-wide shadow-[0_0_30px_rgba(244,63,94,0.45)] border border-pink-300/40 flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-sm leading-none font-light">+</span>
                    <span>New Prompt</span>
                  </div>
                  <div className="absolute -bottom-4 -right-5">
                    <svg className="w-5 h-5 text-pink-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] transform -rotate-12 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 2l16 8-8 3-3 8-5-19z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative z-10 space-y-2.5 pt-6">
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                  Prompt Orchestration
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  With DreamFrame, you can easily organize latent prompts, assign style weights, and track generation seeds in real-time.
                </p>
              </div>
            </div>

            {/* CARD 2: Autonomous Synthesis */}
            <div
              onClick={() => goToWorkbench("/tasks")}
              className="df-cosmic-card rounded-[28px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden min-h-[360px] sm:min-h-[400px] lg:col-span-8 group cursor-pointer"
            >
              <div className="pointer-events-none absolute -right-16 -bottom-16 sm:-right-8 sm:-bottom-12 w-[280px] sm:w-[380px] lg:w-[420px] aspect-square">
                <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#581c87] via-[#be185d] to-[#fb7185] shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8),0_0_80px_rgba(244,63,94,0.35)] opacity-95 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 -m-8 rounded-full border border-pink-400/25 transform rotate-[28deg] scale-x-125 pointer-events-none" />
              </div>

              <div className="relative z-10 max-w-md space-y-4">
                <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
                  Autonomous Synthesis
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
                  Automate repetitive rendering tasks and streamline your creative workflows with our powerful diffusion automation features.
                </p>
              </div>

              <div className="relative z-10 pt-8">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-purple-300/80">
                  <span>LAUNCH AUTONOMOUS WORKBENCH</span>
                  <span>→</span>
                </span>
              </div>
            </div>

            {/* CARD 3: Analytics & Telemetry */}
            <div
              onClick={() => goToWorkbench("/status")}
              className="df-cosmic-card rounded-[28px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[340px] sm:min-h-[380px] lg:col-span-5 group cursor-pointer"
            >
              <div className="relative z-10 pt-2 flex items-center justify-center min-h-[140px]">
                <div className="relative w-48 h-28 flex items-center justify-center">
                  <div className="absolute w-44 h-44 rounded-full border border-pink-500/10" />
                  <div className="absolute w-32 h-32 rounded-full border border-purple-500/15" />
                  <div className="relative z-10 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#140f1d]/85 border border-white/[0.08] backdrop-blur-md">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-mono">
                      ✓
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-1.5 w-24 rounded-full bg-white/25" />
                      <div className="h-1.5 w-16 rounded-full bg-white/15" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 space-y-2.5 pt-4">
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                  Analytics & Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Gain valuable insights into model performance, GPU tensor usage, and rendering step progress with our built-in analytics.
                </p>
              </div>
            </div>

            {/* CARD 4: Collaboration Tools */}
            <div
              onClick={() => goToWorkbench("/files")}
              className="df-cosmic-card rounded-[28px] p-7 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[340px] sm:min-h-[380px] lg:col-span-7 group cursor-pointer"
            >
              <div className="relative z-10 max-w-lg space-y-4">
                <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
                  Collaboration Tools
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
                  Foster collaboration and teamwork with our suite of shared latent canvas boards, live asset versioning, and team workspaces.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-neutral-300 hover:border-purple-500/40 transition-colors">
                    <span>Open Workspaces in Workbench</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
