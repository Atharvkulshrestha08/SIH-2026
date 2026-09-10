import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Terminal } from "lucide-react";

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
                <ShieldCheck className="w-5 h-5 text-teal-600" />
              </div>
              <span className="footer-brand-title">AeroSovereign</span>
            </div>
            <p className="footer-desc">
              Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Operations.
            </p>
            <div className="footer-badge-wrap">
              <span className="footer-org-badge">
                Developed for Mangalore Refinery and Petrochemicals Limited (MRPL)
              </span>
              <span className="footer-ps-badge">Smart India Hackathon • PS-26117</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-col">
            <span className="footer-col-title">NAVIGATION</span>
            <ul className="footer-nav-list">
              <li><a href="#hero" onClick={scrollToTop}>Platform Overview</a></li>
              <li><a href="#hardware-reveal">Workstation Hardware Reveal</a></li>
              <li><a href="#features">Autonomous Agent Pillars</a></li>
              <li><a href="#sovereignty">Zero Network Egress Proof</a></li>
              <li><a href="#industrial">Refinery Engineering Cases</a></li>
              <li><a href="#live-demo">Interactive Simulation</a></li>
            </ul>
          </div>

          {/* Technical Specs & Compliance */}
          <div className="footer-links-col">
            <span className="footer-col-title">HARDWARE COMPLIANCE</span>
            <ul className="footer-specs-list">
              <li>
                <strong>Target Machine:</strong> Single Workstation (RTX 3050 / 4090 / A5000)
              </li>
              <li>
                <strong>Open Weights:</strong> Qwen 2.5 Coder, DeepSeek-R1, Llama 3.2 Vision
              </li>
              <li>
                <strong>Inference Runtime:</strong> Local Model Runner (100% Air-Gapped)
              </li>
              <li>
                <strong>Vector Knowledge:</strong> Local ChromaDB / SQLite SOP Embeddings
              </li>
              <li>
                <strong>Egress Policy:</strong> 0.0.0.0/0 Drop (0 Bytes Exfiltrated)
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
            &copy; {new Date().getFullYear()} AeroSovereign • MRPL Sovereign AI Platform.
          </div>
          <div className="footer-meta">
            <span className="status-live-dot"></span>
            <span>100% AIR-GAPPED • MATHEMATICAL ZERO EGRESS GUARANTEE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
