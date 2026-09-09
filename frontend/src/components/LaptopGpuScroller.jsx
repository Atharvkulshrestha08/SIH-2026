import React, { useRef, useState, useEffect } from "react";
import { Cpu, CheckCircle2, ShieldCheck, Sparkles, ArrowDown } from "lucide-react";

export default function LaptopGpuScroller() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [framesReady, setFramesReady] = useState(false);

  const totalFrames = 90;
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // 1. Preload all 90 WebP frames
  useEffect(() => {
    let mounted = true;
    const imgs = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedNum = String(i).padStart(3, "0");
      img.src = `/frames/laptop/frame_${paddedNum}.webp`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count >= 15) {
          // Ready to start rendering once initial buffer is loaded
          setFramesReady(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      mounted = false;
    };
  }, []);

  // 2. Smooth 60 FPS Canvas Render Loop with Lerping
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const renderLoop = () => {
      // Exponential smoothing (lerp) for buttery smooth motion without seek lag
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.18;

      const frameIdx = Math.max(
        0,
        Math.min(totalFrames - 1, Math.round(currentFrameRef.current))
      );

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aspect fit 16:9
        const cWidth = canvas.width;
        const cHeight = canvas.height;
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = cWidth / cHeight;

        let drawW, drawH, drawX, drawY;
        if (canvasAspect > imgAspect) {
          drawH = cHeight;
          drawW = cHeight * imgAspect;
          drawX = (cWidth - drawW) / 2;
          drawY = 0;
        } else {
          drawW = cWidth;
          drawH = cWidth / imgAspect;
          drawX = 0;
          drawY = (cHeight - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // 3. Scroll tracking & target frame calculation
  useEffect(() => {
    let scrollRafId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;

      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(rawProgress);

      // Target frame based on scroll progress
      targetFrameRef.current = rawProgress * (totalFrames - 1);

      // Determine active stage
      if (rawProgress < 0.28) {
        setActiveStage(0); // Drop & Open
      } else if (rawProgress < 0.58) {
        setActiveStage(1); // Disassembly
      } else if (rawProgress < 0.78) {
        setActiveStage(2); // GPU Reveal
      } else {
        setActiveStage(3); // AI Processing
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(scrollRafId);
    };
  }, []);

  // Jump to stage helper
  const jumpToStage = (stageIndex) => {
    if (!containerRef.current) return;
    const stageTargets = [0.08, 0.42, 0.68, 0.9];
    const target = stageTargets[stageIndex];
    const containerTop = containerRef.current.offsetTop;
    const totalDist = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + target * totalDist,
      behavior: "smooth",
    });
  };

  // Color transition sequence:
  // Phase 1: Blue gradient
  // Phase 2: Yellow and White
  // Phase 3: Brown and Beige
  const getGradientStyle = () => {
    const p = scrollProgress;

    if (p < 0.35) {
      // Stage 1: Blue gradient background
      const t = p / 0.35;
      return {
        background: `radial-gradient(ellipse 90% 70% at 50% 30%, rgba(14, 165, 233, ${0.25 - t * 0.1}), transparent 70%), linear-gradient(180deg, #020817 0%, #081a38 50%, #0d2854 100%)`,
        color: "#ffffff",
      };
    } else if (p < 0.70) {
      // Stage 2: Smooth transition from Blue into Yellow and White
      const t = (p - 0.35) / 0.35;
      // Soft amber, cream, and warm sunlit white
      return {
        background: `radial-gradient(circle at 50% 40%, rgba(254, 240, 138, ${0.45 * t}), transparent 65%), linear-gradient(180deg, #0d2854 0%, #3b629b ${Math.max(0, 20 - t * 20)}%, #ffffff ${40 + t * 20}%, #fefce8 80%, #fef08a 100%)`,
        color: t > 0.4 ? "#1e293b" : "#ffffff",
      };
    } else {
      // Stage 3: Smooth transition from Yellow and White into Brown and Beige
      const t = (p - 0.70) / 0.30;
      return {
        background: `radial-gradient(ellipse at 50% 60%, rgba(217, 119, 6, ${0.2 + t * 0.15}), transparent 60%), linear-gradient(180deg, #fef08a 0%, #fef3c7 ${Math.max(0, 25 - t * 15)}%, #ebd5bd ${45 + t * 10}%, #5c2c16 ${75 + t * 10}%, #231109 100%)`,
        color: t > 0.6 ? "#fdfbf7" : "#1e293b",
      };
    }
  };

  const bgStyle = getGradientStyle();
  const isLightText = scrollProgress < 0.48 || scrollProgress > 0.85;

  const isQuestionActive = scrollProgress >= 0.76;
  const isPulseActive = scrollProgress >= 0.82;
  const isAnswerActive = scrollProgress >= 0.88;

  return (
    <div
      ref={containerRef}
      id="hardware-reveal"
      className="scroller-pinned-track"
      style={{
        background: bgStyle.background,
        transition: "background 0.3s ease-out",
      }}
    >
      <div className="scroller-sticky-viewport">
        {/* Stage Timeline Pills */}
        <div className="scroller-timeline-bar" aria-label="Animation Chapters">
          <div className="timeline-capsule">
            <button
              onClick={() => jumpToStage(0)}
              className={`timeline-pill ${activeStage === 0 ? "active" : ""}`}
            >
              <span className="pill-num">01</span>
              <span className="pill-label">Drop &amp; Open</span>
            </button>
            <div className="timeline-connector"></div>

            <button
              onClick={() => jumpToStage(1)}
              className={`timeline-pill ${activeStage === 1 ? "active" : ""}`}
            >
              <span className="pill-num">02</span>
              <span className="pill-label">Disassembly</span>
            </button>
            <div className="timeline-connector"></div>

            <button
              onClick={() => jumpToStage(2)}
              className={`timeline-pill ${activeStage === 2 ? "active" : ""}`}
            >
              <span className="pill-num">03</span>
              <span className="pill-label">GPU Reveal</span>
            </button>
            <div className="timeline-connector"></div>

            <button
              onClick={() => jumpToStage(3)}
              className={`timeline-pill ${activeStage === 3 ? "active" : ""}`}
            >
              <span className="pill-num">04</span>
              <span className="pill-label">AI Processing</span>
            </button>
          </div>
        </div>

        {/* Section Header Caption with Dynamic Contrast */}
        <div className="scroller-caption-zone">
          <div className="caption-badge">
            <span className="caption-badge-dot"></span>
            {activeStage === 0 && "PHASE 1: INDUSTRIAL WORKSTATION DEPLOYMENT"}
            {activeStage === 1 && "PHASE 2: MODULAR COMPONENT DISASSEMBLY"}
            {activeStage === 2 && "PHASE 3: SOVEREIGN ON-PREMISE GPU CORE"}
            {activeStage === 3 && "PHASE 4: REAL-TIME AIR-GAPPED INFERENCE"}
          </div>

          <h2
            className="scroller-headline"
            style={{ color: isLightText ? "#ffffff" : "#0f172a" }}
          >
            {activeStage === 0 && "Hardware descends onto the secure floor."}
            {activeStage === 1 && "Internal architecture separates in 3D isometric space."}
            {activeStage === 2 && "The sovereign AI accelerator takes center stage."}
            {activeStage === 3 && "Processing confidential refinery intelligence."}
          </h2>
        </div>

        {/* The Central Cinematic Canvas */}
        <div className="scroller-stage-canvas">
          <div className="canvas-frame-container">
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="scrub-canvas"
              aria-label="Interactive 3D laptop disassembly and GPU reveal"
            />

            {/* Glowing Blue GPU Core Halo (activates during GPU reveal & processing) */}
            {scrollProgress >= 0.65 && (
              <div
                className={`gpu-canvas-halo ${isPulseActive ? "pulsing" : ""}`}
                aria-hidden="true"
              ></div>
            )}
          </div>

          {/* Real-time Question -> Processing -> Answer HUD Overlay */}
          {scrollProgress >= 0.72 && (
            <div className="gpu-hud-overlay">
              {/* Question Card */}
              <div
                className={`hud-card question-card ${isQuestionActive ? "active" : ""}`}
              >
                <div className="hud-card-header">
                  <div className="hud-badge text-cyan-600 bg-cyan-50">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CONFIDENTIAL OPERATOR QUERY</span>
                  </div>
                  <span className="hud-time">MRPL FCCU Unit</span>
                </div>
                <p className="hud-query-text">
                  &ldquo;Analyze FCCU Fractionator P&amp;ID: Verify relief valve PSV-104 compliance under API 520.&rdquo;
                </p>
              </div>

              {/* Central Processing Pulse Indicator */}
              <div
                className={`hud-compute-badge ${isPulseActive ? "active" : ""}`}
              >
                <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>ON-PREMISE VRAM INFERENCE // 0 NETWORK EGRESS</span>
                <span className="compute-stat">128 TFLOPS</span>
              </div>

              {/* Answer Card */}
              <div
                className={`hud-card answer-card ${isAnswerActive ? "active" : ""}`}
              >
                <div className="hud-card-header">
                  <div className="hud-badge text-emerald-700 bg-emerald-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SOVEREIGN AGENT DELIVERABLE</span>
                  </div>
                  <span className="hud-tag">ASME SEC VIII / API 520</span>
                </div>
                <p className="hud-answer-text">
                  <strong>API 520 Verified:</strong> PSV-104 requires <strong>4.2 bar setpoint</strong>. ASME Section VIII hoop stress calculations verified safe (177.5 MPa &le; 138 MPa allowable limit with SA-516 Grade 70). Formal Word approval memo generated locally.
                </p>
                <div className="hud-footer">
                  <span className="security-tag">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% On-Premises • 0 External Telemetry</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Timeline Scrubber Bar */}
        <div className="scroller-bottom-controls">
          <div className="scrub-slider-wrapper">
            <span className="scrub-label">Scrub Film</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.002"
              value={scrollProgress}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!containerRef.current) return;
                const containerTop = containerRef.current.offsetTop;
                const totalDist = containerRef.current.offsetHeight - window.innerHeight;
                window.scrollTo({
                  top: containerTop + val * totalDist,
                  behavior: "auto",
                });
              }}
              className="timeline-range-input"
              aria-label="Interactive scroll scrubber"
            />
            <span className="scrub-pct">{Math.round(scrollProgress * 100)}%</span>
          </div>

          <div
            className="scrub-hint"
            style={{ color: isLightText ? "rgba(255,255,255,0.7)" : "rgba(30,41,59,0.7)" }}
          >
            <span>Scroll or drag slider to explore hardware</span>
            <ArrowDown className="w-3.5 h-3.5 inline ml-1 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
