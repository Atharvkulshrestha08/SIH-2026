import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Lock, Terminal, Cpu, ArrowRight, Sparkles, Search, Mic, MicOff } from "lucide-react";
import { VoiceRecorderVAD } from "../services/voiceService";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const vadRecorderRef = useRef(null);

  useEffect(() => {
    vadRecorderRef.current = new VoiceRecorderVAD({
      onTranscription: (transcript) => {
        setQuery(transcript);
      },
      onStatusChange: (status) => {
        setIsRecording(status === 'listening');
      },
      onError: () => setIsRecording(false),
    });

    return () => {
      vadRecorderRef.current?.stop(true);
    };
  }, []);

  function toggleVoice() {
    if (isRecording) {
      vadRecorderRef.current?.stop(false);
    } else {
      vadRecorderRef.current?.start(query);
    }
  }

  const presetQueries = [
    { label: "⚡ FCCU Mass Balance", text: "Calculate FCCU catalyst circulation rate and carbon burning rate from regenerator delta T" },
    { label: "📐 ASME Sec VIII Hoop Stress", text: "Calculate internal hoop stress for a 600mm cylindrical shell at 14.5 MPa with 24.5mm wall thickness" },
    { label: "🔍 P&ID Safety Valve Check", text: "Verify thermal relief valve PSV-104 sizing according to API 520 on P&ID 04-P-12" },
    { label: "📄 CAPEX Approval Memo", text: "Draft an executive board approval note for crude distillation column turnaround" },
  ];

  const handleLaunch = (e) => {
    if (e) e.preventDefault();
    if (isRecording) {
      vadRecorderRef.current?.stop(false);
    }
    const targetPrompt = query.trim() || presetQueries[0].text;
    navigate(`/workbench?prompt=${encodeURIComponent(targetPrompt)}`);
  };

  const handleChipClick = (chipText) => {
    setQuery(chipText);
  };

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      <div className="hero-container">
        <div className="hero-content">
          {/* Kore.ai Style Eyebrow */}
          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            <span>ENTERPRISE AGENTIC AI PLATFORM FOR INDUSTRIAL CONFIDENTIALITY</span>
          </div>

          <h1 className="hero-title">
            Deploy Autonomous AI Agents with <span className="title-highlight">100% Confidentiality</span> &amp; Zero Egress
          </h1>

          <p className="hero-tagline">
            The sovereign on-premise AI platform engineered for Mangalore Refinery &amp; Petrochemicals Limited (MRPL) and critical industrial infrastructure.
          </p>

          <p className="hero-subtext">
            Analyze confidential P&amp;ID schematics, compute ASME &amp; API engineering equations in a sandboxed Python runtime, and compile ready-to-sign executive memos—executed entirely on private local GPU hardware.
          </p>

          {/* Interactive Enterprise Query Bar (Kore.ai Style) */}
          <form className="hero-query-composer" onSubmit={handleLaunch}>
            <div className="hero-composer-input-row">
              <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
              <input
                type="text"
                className="hero-composer-input"
                placeholder={isRecording ? "Listening... Speak your engineering query..." : "Ask anything across refinery SOPs, P&ID standards, or ASME calculations..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                className={`hero-composer-mic-btn ${isRecording ? 'recording' : ''}`}
                onClick={toggleVoice}
                title={isRecording ? "Listening... Click to stop" : "Speak to ask query"}
              >
                {isRecording ? <MicOff className="w-4 h-4 text-red-500 animate-pulse" /> : <Mic className="w-4 h-4 text-stone-500 hover:text-stone-700" />}
              </button>
              <button type="submit" className="hero-composer-btn">
                <span>Launch in Workbench</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="hero-prompt-chips">
              <span className="prompt-chips-label">Try Prompts:</span>
              {presetQueries.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  className="hero-prompt-chip"
                  onClick={() => handleChipClick(item.text)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="hero-trust-indicators">
            <div className="trust-item">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>0.00 KB Network Egress (Air-Gapped)</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>NVIDIA RTX Local Tensor Execution</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>MRPL PS-26117 PSU Specification</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Multi-Model Dynamic Routing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
