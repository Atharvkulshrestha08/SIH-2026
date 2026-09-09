import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Cpu, Lock, Terminal, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="main-footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & PS Description */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-brand-icon">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="footer-brand-title">AeroSovereign</span>
            </div>
            <p className="footer-desc">
              Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work.
            </p>
            <div className="footer-badge-wrap">
              <span className="footer-org-badge">
                Developed for Mangalore Refinery and Petrochemicals Limited (MRPL)
              </span>
              <span className="footer-ps-badge">Problem Statement ID: 26117</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-col">
            <span className="footer-col-title">NAVIGATION</span>
            <ul className="footer-nav-list">
              <li><a href="#hero" onClick={scrollToTop}>Overview</a></li>
              <li><a href="#hardware-reveal">Hardware &amp; GPU Reveal</a></li>
              <li><a href="#features">Agent Capabilities</a></li>
              <li><a href="#sovereignty">Zero Network Egress Proof</a></li>
              <li><a href="#industrial">Refinery Use Cases</a></li>
              <li><a href="#live-demo">Interactive Simulation</a></li>
            </ul>
          </div>

          {/* Technical Specs & Compatibility */}
          <div className="footer-links-col">
            <span className="footer-col-title">HARDWARE COMPLIANCE</span>
            <ul className="footer-specs-list">
              <li>
                <strong>Target GPU:</strong> Single Workstation (RTX 4090 / 5090 / A5000)
              </li>
              <li>
                <strong>Open Weights:</strong> DeepSeek-R1, Qwen 2.5 Coder, Llama 3.2
              </li>
              <li>
                <strong>Inference Runtime:</strong> Local vLLM / Ollama Air-Gapped
              </li>
              <li>
                <strong>RAG Engine:</strong> Local ChromaDB / Vector SQLite
              </li>
              <li>
                <strong>Egress Policy:</strong> 0.0.0.0/0 Kernel Drop (0 Bytes External)
              </li>
            </ul>
          </div>

          {/* Launch Action */}
          <div className="footer-action-col">
            <span className="footer-col-title">CONFIDENTIAL ACCESS</span>
            <p className="footer-action-desc">
              Access the secure on-premise evaluation dashboard to run live Python sandbox simulations, P&amp;ID document uploads, and Word generation.
            </p>
            <Link to="/workbench" className="footer-cta-btn">
              <Terminal className="w-4 h-4" />
              <span>Enter Sovereign Workbench</span>
            </Link>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} AeroSovereign. Sovereign On-Premise Industrial AI Workbench.
          </div>
          <div className="footer-meta">
            <span className="status-live-dot"></span>
            <span>100% AIR-GAPPED &bull; ZERO EXTERNAL TELEMETRY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
