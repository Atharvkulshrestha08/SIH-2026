import React from "react";
import { Link } from "react-router-dom";
import { Shield, ChevronDown, Lock, Terminal, Cpu } from "lucide-react";

export default function HeroSection() {
  const scrollToDrop = (e) => {
    e.preventDefault();
    const section = document.getElementById("hardware-reveal");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      <div className="hero-container">
        {/* Left Column: Clear, Non-Overwhelming Introduction */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            <span>MRPL • PROBLEM STATEMENT 26117</span>
          </div>

          <h1 className="hero-title">
            Aero<span className="title-highlight">Sovereign</span>
          </h1>

          <p className="hero-tagline">
            Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work.
          </p>

          <p className="hero-subtext">
            Engineered for refineries, defence units, and PSUs. Analyze confidential P&amp;IDs, execute ASME engineering calculations, and generate approval memos entirely within your private GPU server.
          </p>

          <div className="hero-buttons">
            <a
              href="#hardware-reveal"
              onClick={scrollToDrop}
              className="btn-primary"
            >
              <span>Explore Architecture</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>

            <Link to="/workbench" className="btn-secondary">
              <Terminal className="w-4 h-4" />
              <span>Launch Workbench</span>
            </Link>
          </div>

          <div className="hero-trust-indicators">
            <div className="trust-item">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Strict Air-Gap (0 Egress)</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Open-Weight LLMs</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Mangalore Refinery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Emblem / Logo / Side Image Showcase */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-logo-frame">
            {/* Ambient Background Glow */}
            <div className="hero-glow-ring"></div>

            {/* Emblem / Product Card */}
            <div className="hero-emblem-card">
              <div className="emblem-inner">
                <div className="emblem-icon-wrapper">
                  <Shield className="w-16 h-16 text-cyan-400 emblem-shield" />
                  <Cpu className="w-8 h-8 text-blue-300 emblem-chip" />
                </div>
                <div className="emblem-caption">
                  <div className="emblem-brand">AEROSOVEREIGN</div>
                  <div className="emblem-code">SECURE INDUSTRIAL CORE • V1.0</div>
                </div>
                <div className="emblem-specs-grid">
                  <div className="spec-tile">
                    <span className="spec-lbl">ISOLATION</span>
                    <span className="spec-val text-emerald-400">AIR-GAPPED</span>
                  </div>
                  <div className="spec-tile">
                    <span className="spec-lbl">INFERENCE</span>
                    <span className="spec-val text-cyan-400">LOCAL GPU</span>
                  </div>
                  <div className="spec-tile">
                    <span className="spec-lbl">ORG</span>
                    <span className="spec-val">MRPL PSU</span>
                  </div>
                  <div className="spec-tile">
                    <span className="spec-lbl">NETWORK</span>
                    <span className="spec-val text-emerald-400">0 KB LEAK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="scroll-indicator" onClick={scrollToDrop}>
        <span className="scroll-text">Scroll to reveal workstation hardware</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
}
