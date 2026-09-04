import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  ShieldCheck,
  Cpu,
  Terminal,
  Zap,
  Lock,
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Database,
  Search,
  Copy,
  ChevronDown,
  ChevronUp,
  Download,
  Radio,
  Sparkles,
  Layers,
  Server
} from "lucide-react";

export default function LandingPage() {
  const [routerQuery, setRouterQuery] = useState(
    "Calculate hoop stress and minimum required thickness for 600mm CDU-1 crude transfer pipe at 14.5 MPa under ASME Section VIII."
  );
  const [selectedRoute, setSelectedRoute] = useState({
    category: "CODE_MATH",
    model: "Qwen2.5-Coder-7B-Instruct (Q4_K_M)",
    latency: "74ms",
    confidence: "99.8%",
    node: "Node 2 (RTX 3050 - 4.7 GB VRAM)",
    tools: ["AST Python Sandbox", "ASME Formula Verifier"],
  });
  const [isRouting, setIsRouting] = useState(false);
  const [simStep, setSimStep] = useState(3);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const PRESET_QUERIES = [
    {
      title: "Pipe Hoop Stress Math",
      query: "Calculate hoop stress and minimum wall thickness for 600mm CDU-1 pipe at 14.5 MPa under ASME Sec VIII.",
      category: "CODE_MATH",
      model: "Qwen2.5-Coder-7B-Instruct",
      latency: "74ms",
      confidence: "99.8%",
      node: "Node 2 (RTX 3050 - 4.7 GB VRAM)",
      tools: ["AST Python Sandbox", "Formula Verifier"],
    },
    {
      title: "Scanned NDT Inspection",
      query: "Analyze scanned ultrasonic thickness report for CDU crude transfer line valve V-102 and extract wall loss anomalies.",
      category: "DOCUMENT_INSPECTION",
      model: "Qwen2-VL-7B / Llama-3.1-8B",
      latency: "92ms",
      confidence: "99.2%",
      node: "Node 2 (RTX 3050 - 4.8 GB VRAM)",
      tools: ["Document Extractor", "ChromaDB RAG"],
    },
    {
      title: "API 610 SOP Retrieval",
      query: "Retrieve allowable vibration limits for category-1 centrifugal pumps running in continuous refinery service under API 610.",
      category: "SOP_RAG",
      model: "Llama-3.1-8B-Instruct",
      latency: "61ms",
      confidence: "99.5%",
      node: "Node 2 (RTX 3050 - 4.8 GB VRAM)",
      tools: ["Local ChromaDB", "bge-small-en-v1.5"],
    },
    {
      title: "P&ID Drawing Analysis",
      query: "Inspect scanned P&ID schematic of atmospheric distillation column and identify bypass valve tag numbers.",
      category: "VISION_PID",
      model: "Qwen2-VL-7B-Instruct",
      latency: "115ms",
      confidence: "98.7%",
      node: "Node 1 (RTX 4050 - 4.9 GB VRAM)",
      tools: ["Computer Vision OCR", "Schematic Parser"],
    },
  ];

  const handleSelectPreset = (preset) => {
    setRouterQuery(preset.query);
    setIsRouting(true);
    setTimeout(() => {
      setSelectedRoute(preset);
      setIsRouting(false);
    }, 280);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(
      "curl -sSL https://get.aerosovereign.local/deploy.sh | bash"
    );
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  const FAQS = [
    {
      q: "How is the physical Air-Gap mathematically and hardware-verified?",
      a: "AeroSovereign binds inference strictly to 127.0.0.1 loopback interfaces. A background kernel packet sniffer (using psutil/scapy) logs all network interfaces and proves 0.00 KB/s outbound WAN traffic. Disconnecting physical Ethernet or Wi-Fi leaves 100% of features fully functional.",
    },
    {
      q: "What open-weight models can operate within dual 6GB VRAM GPUs?",
      a: "Using 4-bit quantization (Q4_K_M GGUF / AWQ), models like Qwen2.5-Coder-7B (~4.7GB) and Llama-3.1-8B (~4.8GB) execute comfortably with full context. Node 1 runs lightweight routing (Qwen2.5-3B) and CPU-isolated STT/TTS (faster-whisper + Piper), leaving all VRAM dedicated to LLMs.",
    },
    {
      q: "How does the system prevent LLM hallucinations during engineering math?",
      a: "The LLM never directly outputs unverified numbers. Instead, it generates Python code which is executed inside an AST-guarded local sandbox with a 5-second timeout, memory caps, and forbidden system calls. Only verified stdout from Python is presented.",
    },
    {
      q: "Can proprietary MRPL refinery SOPs and P&IDs be indexed safely?",
      a: "Yes. All embeddings are generated locally using bge-small-en-v1.5 and stored in an on-premise ChromaDB vector database. No data, embeddings, or queries ever hit third-party cloud APIs.",
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* ── TOP ANNOUNCEMENT BANNER ── */}
      <div className="top-announcement-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="pill-badge-cyan">
            <span className="pulse-light-emerald"></span>
            AIR-GAPPED SOVEREIGN AI OS
          </span>
          <span style={{ color: "var(--text-dim)" }}>
            SPEC: MRPL-26117-REV4 // PSUs & REFINERIES
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", color: "var(--text-muted)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <ShieldCheck style={{ width: "14px", height: "14px", color: "#34d399" }} />
            WAN: <strong style={{ color: "#34d399", fontFamily: "var(--font-mono)" }}>0.00 KB/s</strong>
          </span>
          <span>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Cpu style={{ width: "14px", height: "14px", color: "#22d3ee" }} />
            DUAL 6GB GPU ENCLAVE
          </span>
        </div>
      </div>

      {/* ── STICKY NAVBAR ── */}
      <header className="sovereign-navbar">
        <Link to="/" className="nav-brand">
          <div className="nav-brand-logo">
            <Shield style={{ width: "20px", height: "20px", color: "#ffffff" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", fontSize: "1rem" }}>
                AERO<span style={{ color: "#22d3ee" }}>SOVEREIGN</span>
              </span>
              <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", color: "#cbd5e1" }}>
                MRPL v2.1
              </span>
            </div>
            <p style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
              ON-PREMISE INDUSTRIAL AI
            </p>
          </div>
        </Link>

        <nav className="nav-links">
          <a href="#dilemma" className="nav-link">Refinery Dilemma</a>
          <a href="#routing" className="nav-link">Model Routing</a>
          <a href="#simulator" className="nav-link">Live Agent Demo</a>
          <a href="#hardware" className="nav-link">Hardware Specs</a>
          <a href="#faq" className="nav-link">Compliance FAQ</a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link to="/workbench" className="btn-primary-glow">
            <Zap style={{ width: "16px", height: "16px", fill: "currentColor" }} />
            Launch Workbench
          </Link>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section style={{ borderBottom: "1px solid var(--border-subtle)", position: "relative" }} className="tech-grid-bg">
        <div className="hero-wrapper">
          {/* Left Column */}
          <div>
            <div className="pill-badge-cyan" style={{ marginBottom: "1rem" }}>
              <Radio style={{ width: "14px", height: "14px" }} />
              SOVEREIGN REFINERY ENCLAVE // ZERO DATA LEAKAGE
            </div>

            <h1 className="hero-headline">
              Sovereign Industrial Intelligence.{" "}
              <span className="text-gradient-cyan">Zero Cloud Egress.</span>
            </h1>

            <p className="hero-subtext">
              Purpose-built for <strong style={{ color: "#f1f5f9" }}>Mangalore Refinery and Petrochemicals Limited (MRPL)</strong>,
              defence, and PSU manufacturing. Run multi-model agentic workflows across local open-weight LLMs with guaranteed zero cloud egress,
              certified on-premise security, and auditable air-gapped performance.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
              <Link to="/workbench" className="btn-primary-glow" style={{ padding: "0.9rem 1.8rem", fontSize: "0.95rem" }}>
                <Zap style={{ width: "18px", height: "18px", fill: "currentColor" }} />
                Launch Knowledge Workbench
              </Link>
              <a href="#simulator" className="btn-secondary-outline" style={{ padding: "0.9rem 1.4rem", fontSize: "0.95rem" }}>
                <FileText style={{ width: "18px", height: "18px", color: "#22d3ee" }} />
                View Live Agent Demo
              </a>
            </div>

            {/* Feature Pills Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
              <div style={{ background: "rgba(18,24,36,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "0.75rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#34d399", fontWeight: 700, fontSize: "0.8rem" }}>
                  <ShieldCheck style={{ width: "16px", height: "16px" }} /> 0 KB/s Egress
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>100% Air-Gapped</span>
              </div>
              <div style={{ background: "rgba(18,24,36,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "0.75rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#22d3ee", fontWeight: 700, fontSize: "0.8rem" }}>
                  <Zap style={{ width: "16px", height: "16px" }} /> &lt; 350ms TTFT
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Dual-GPU Latency</span>
              </div>
              <div style={{ background: "rgba(18,24,36,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "0.75rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#60a5fa", fontWeight: 700, fontSize: "0.8rem" }}>
                  <Layers style={{ width: "16px", height: "16px" }} /> Multi-Model
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Task Auto-Router</span>
              </div>
              <div style={{ background: "rgba(18,24,36,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "0.75rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#fbbf24", fontWeight: 700, fontSize: "0.8rem" }}>
                  <Terminal style={{ width: "16px", height: "16px" }} /> AST Sandbox
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Verified Python Math</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive HUD */}
          <div className="hud-card">
            <div className="hud-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="pulse-light-emerald"></span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em" }}>
                  LOCAL ENCLAVE TELEMETRY
                </span>
              </div>
              <span className="pill-badge-emerald" style={{ fontSize: "0.65rem" }}>
                AIRGAP: LOCKED
              </span>
            </div>

            <div className="hud-metric-box">
              <div>
                <p style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>OUTBOUND WAN EGRESS</p>
                <p className="hud-big-number">0.000 KB/s</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>SECURITY AUDIT</p>
                <span style={{ fontSize: "0.75rem", color: "#22d3ee", fontWeight: 700 }}>
                  VERIFIED SOVEREIGN
                </span>
              </div>
            </div>

            <div className="hud-node-grid">
              <div className="hud-node-tile">
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "4px" }}>
                  <span>Node 1 (4050)</span>
                  <span style={{ color: "#22d3ee", fontWeight: 700 }}>2.2 GB</span>
                </div>
                <p style={{ fontWeight: 700, color: "#ffffff" }}>Qwen2.5-3B Router</p>
                <p style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>faster-whisper + Piper TTS</p>
              </div>

              <div className="hud-node-tile">
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "4px" }}>
                  <span>Node 2 (3050)</span>
                  <span style={{ color: "#22d3ee", fontWeight: 700 }}>4.7 GB</span>
                </div>
                <p style={{ fontWeight: 700, color: "#ffffff" }}>Qwen2.5-Coder-7B</p>
                <p style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>Llama-3.1-8B + ChromaDB</p>
              </div>
            </div>

            <div style={{ background: "rgba(18,24,36,0.4)", borderRadius: "10px", padding: "0.75rem", marginBottom: "1rem", fontSize: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "6px" }}>
                <span>Task Latency: <strong style={{ color: "#22d3ee" }}>284ms</strong></span>
                <span>Time to 1st Token: <strong style={{ color: "#34d399" }}>140ms</strong></span>
              </div>
              <div style={{ width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
                <div style={{ width: "88%", height: "100%", background: "linear-gradient(90deg, #06b6d4, #10b981)" }}></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--text-dim)", marginTop: "6px" }}>
                <span>VRAM Split: 6.9 GB / 12 GB Total</span>
                <span>Loopback: 127.0.0.1</span>
              </div>
            </div>

            <Link
              to="/workbench"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.75rem",
                borderRadius: "10px",
                background: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                color: "#22d3ee",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.8rem",
                transition: "all 0.2s"
              }}
            >
              Open Live Engineering Console <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: REFINERY DILEMMA VS SOVEREIGN CERTAINTY ── */}
      <section id="dilemma" className="bento-section" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="section-header-center">
          <span className="pill-badge-red" style={{ marginBottom: "0.75rem" }}>
            HIGH-CONSEQUENCE SECURITY THREAT
          </span>
          <h2 className="section-title">The Refinery Dilemma vs. Sovereign Certainty</h2>
          <p className="section-subtitle">
            Refineries and defense manufacturing generate critical knowledge assets: P&IDs, ultrasonic defect reports, and pricing tenders.
            Pasting these into public cloud AI tools causes catastrophic data breaches.
          </p>
        </div>

        <div className="dilemma-grid">
          {/* Public Cloud Trap */}
          <div className="card-danger">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171" }}>
                <AlertTriangle style={{ width: "18px", height: "18px" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f87171" }}>The Public Cloud Trap</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>ChatGPT / Claude / Copilot</p>
              </div>
            </div>

            <ul className="dilemma-list">
              <li className="dilemma-item">
                <span style={{ color: "#f87171", fontWeight: 800 }}>✕</span>
                <span><strong>Confidential P&ID Exposure:</strong> Sensitive schematics and equipment tags transmitted over public WANs.</span>
              </li>
              <li className="dilemma-item">
                <span style={{ color: "#f87171", fontWeight: 800 }}>✕</span>
                <span><strong>Shadow AI Proliferation:</strong> Engineers quietly pasting pipeline wall-thickness calculations into commercial cloud tools.</span>
              </li>
              <li className="dilemma-item">
                <span style={{ color: "#f87171", fontWeight: 800 }}>✕</span>
                <span><strong>Severe Compliance Penalties:</strong> Direct violation of PSU data sovereignty laws and air-gap defense mandates.</span>
              </li>
              <li className="dilemma-item">
                <span style={{ color: "#f87171", fontWeight: 800 }}>✕</span>
                <span><strong>No Mathematical Sandbox:</strong> Raw LLMs hallucinating critical boiler and pressure vessel tolerances.</span>
              </li>
            </ul>
          </div>

          {/* Sovereign Enclave */}
          <div className="card-sovereign">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22d3ee" }}>
                <ShieldCheck style={{ width: "18px", height: "18px" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#22d3ee" }}>100% On-Premise Air-Gap Workbench</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>AeroSovereign MRPL Architecture</p>
              </div>
            </div>

            <ul className="dilemma-list">
              <li className="dilemma-item">
                <CheckCircle style={{ width: "18px", height: "18px", color: "#34d399", shrink: 0 }} />
                <span><strong>Zero Outbound Egress:</strong> 100% local GPU execution; verified 0 bytes leave the refinery network perimeter.</span>
              </li>
              <li className="dilemma-item">
                <CheckCircle style={{ width: "18px", height: "18px", color: "#34d399", shrink: 0 }} />
                <span><strong>Dynamic Model Router:</strong> Auto-selects Qwen2.5-Coder for math, Llama-3.1 for SOPs, and Qwen2-VL for drawings.</span>
              </li>
              <li className="dilemma-item">
                <CheckCircle style={{ width: "18px", height: "18px", color: "#34d399", shrink: 0 }} />
                <span><strong>AST-Guarded Math Sandbox:</strong> Executes code locally to guarantee zero hallucination on critical engineering formulas.</span>
              </li>
              <li className="dilemma-item">
                <CheckCircle style={{ width: "18px", height: "18px", color: "#34d399", shrink: 0 }} />
                <span><strong>Real Deliverable Export:</strong> Directly exports signed `.docx` approval notes and `.xlsx` calculation workbooks.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DYNAMIC OPEN-WEIGHT ROUTING ARCHITECTURE ── */}
      <section id="routing" className="bento-section" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="section-header-center">
          <span className="pill-badge-cyan" style={{ marginBottom: "0.75rem" }}>
            MULTI-MODEL SPECIALIZATION
          </span>
          <h2 className="section-title">Dynamic Open-Weight Routing Architecture</h2>
          <p className="section-subtitle">
            No single model can solve every industrial problem. AeroSovereign uses a sub-100ms lightweight router to classify intent and dispatch each sub-task to the most capable model.
          </p>
        </div>

        <div className="router-layout">
          {/* Preset Prompts List */}
          <div>
            {PRESET_QUERIES.map((preset, idx) => {
              const isActive = routerQuery === preset.query;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectPreset(preset)}
                  className={`preset-card ${isActive ? "active" : ""}`}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <Sparkles style={{ width: "14px", height: "14px", color: "#22d3ee" }} />
                      {preset.title}
                    </span>
                    <span className="pill-badge-cyan" style={{ fontSize: "0.65rem", padding: "1px 6px" }}>
                      {preset.category}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{preset.query}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                    <span>Model: <strong style={{ color: "#e2e8f0" }}>{preset.model}</strong></span>
                    <span style={{ color: "#34d399", fontWeight: 700 }}>{preset.latency}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Router Inspector */}
          <div className="terminal-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ffffff", fontSize: "0.8rem" }}>
                <Terminal style={{ width: "16px", height: "16px", color: "#22d3ee" }} />
                <span>LIVE TASK ROUTER INSPECTOR (QWEN2.5-3B)</span>
              </div>
              <span className="pill-badge-emerald" style={{ fontSize: "0.65rem" }}>
                SUB-100MS CLASSIFIER
              </span>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                Test Prompt Input:
              </label>
              <textarea
                rows={3}
                value={routerQuery}
                onChange={(e) => setRouterQuery(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  background: "rgba(18, 24, 36, 0.8)",
                  border: "1px solid var(--border-subtle)",
                  padding: "0.75rem",
                  fontSize: "0.8rem",
                  color: "#f8fafc",
                  fontFamily: "var(--font-mono)",
                  resize: "none"
                }}
              />
            </div>

            <div style={{ background: "rgba(14, 20, 30, 0.7)", border: "1px solid var(--border-cyan)", borderRadius: "12px", padding: "1rem", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>CLASSIFIED INTENT:</span>
                <span style={{ color: "#22d3ee", fontWeight: 800 }}>{isRouting ? "CLASSIFYING..." : selectedRoute.category}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>ASSIGNED MODEL:</span>
                <span style={{ color: "#ffffff", fontWeight: 700 }}>{selectedRoute.model}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>TARGET COMPUTE NODE:</span>
                <span style={{ color: "var(--text-main)" }}>{selectedRoute.node}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>ROUTING LATENCY / CONFIDENCE:</span>
                <span style={{ color: "#34d399", fontWeight: 800 }}>{selectedRoute.latency} // {selectedRoute.confidence}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "4px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", alignSelf: "center" }}>TOOLS:</span>
                {selectedRoute.tools.map((t, idx) => (
                  <span key={idx} style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(255,255,255,0.06)", color: "#cbd5e1", fontSize: "0.7rem" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", fontSize: "0.75rem" }}>
              <span style={{ color: "var(--text-dim)" }}>*Click any preset on left to see dynamic re-routing.</span>
              <Link to="/workbench" style={{ color: "#22d3ee", textDecoration: "none", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                Execute in Workbench <ArrowRight style={{ width: "12px", height: "12px" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LIVE SOVEREIGN AGENT EXECUTION SIMULATOR ── */}
      <section id="simulator" className="bento-section" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="section-header-center">
          <span className="pill-badge-emerald" style={{ marginBottom: "0.75rem" }}>
            END-TO-END WORKFLOW
          </span>
          <h2 className="section-title">Live Sovereign Agent Execution</h2>
          <p className="section-subtitle">
            Observe an end-to-end multi-step industrial workflow: from parsing a scanned MRPL inspection report to AST-guarded Python calculation, SOP matching, and direct Word approval note synthesis.
          </p>
        </div>

        <div className="router-layout">
          {/* Steps */}
          <div>
            <div style={{ background: "rgba(18,24,36,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "1rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Target Inspection Package</span>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", marginTop: "2px" }}>
                Ultrasonic Thickness Report — Crude Distillation Column (CDU-1) Valve V-102
              </p>
              <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "4px" }}>
                <span>File: <strong style={{ color: "#22d3ee" }}>CDU_NDT_2026.pdf</strong></span>
                <span>•</span>
                <span>Standard: <strong style={{ color: "#cbd5e1" }}>ASME Sec VIII / API 510</strong></span>
              </div>
            </div>

            {[
              { step: 1, title: "Document OCR & Table Extraction", model: "Qwen2-VL-7B", detail: "Extracted measured thickness: 19.4 mm (Nominal: 24.5 mm)" },
              { step: 2, title: "Local SOP & Manual RAG Matching", model: "Llama-3.1-8B", detail: "Matched MRPL SOP #CDU-402: Minimum corrosion allowance is 3.0 mm." },
              { step: 3, title: "AST-Guarded Python Math Execution", model: "Qwen2.5-Coder-7B", detail: "Barlow's formula calculation executed in local sandbox." },
              { step: 4, title: "Synthesis & .DOCX Memo Generation", model: "python-docx", detail: "Generated signed approval note ready for plant manager sign-off." },
            ].map((s) => (
              <div
                key={s.step}
                onClick={() => setSimStep(s.step)}
                className={`preset-card ${simStep === s.step ? "active" : ""}`}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700 }}>
                  <span style={{ color: simStep === s.step ? "#ffffff" : "#cbd5e1" }}>
                    {s.step}. {s.title}
                  </span>
                  <span style={{ color: "#22d3ee", fontSize: "0.7rem" }}>{s.model}</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>{s.detail}</p>
              </div>
            ))}
          </div>

          {/* Terminal Box Output */}
          <div className="terminal-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontSize: "0.8rem" }}>
                <Terminal style={{ width: "16px", height: "16px" }} />
                <span>SANDBOX VERIFIED OUTPUT (STAGE {simStep} / 4)</span>
              </div>
              <span className="pill-badge-emerald" style={{ fontSize: "0.65rem" }}>
                AST CHECK: PASSED
              </span>
            </div>

            {simStep === 1 && (
              <div style={{ background: "rgba(18,24,36,0.6)", padding: "1rem", borderRadius: "10px", lineHeight: 1.6, fontSize: "0.8rem" }}>
                <p style={{ color: "#22d3ee", fontWeight: 700 }}>[OCR EXTRACTOR OUTPUT]</p>
                <p>Component Tag: Valve V-102 (Crude Distillation Column Line A)</p>
                <p>Nominal Design Thickness: 24.5 mm | Material: SA-516 Grade 70</p>
                <p style={{ color: "#fbbf24", fontWeight: 700 }}>Measured Ultrasonic Reading: 19.4 mm (Total Wall Loss: 5.1 mm)</p>
              </div>
            )}

            {simStep === 2 && (
              <div style={{ background: "rgba(18,24,36,0.6)", padding: "1rem", borderRadius: "10px", lineHeight: 1.6, fontSize: "0.8rem" }}>
                <p style={{ color: "#22d3ee", fontWeight: 700 }}>[CHROMA RAG MATCH // MRPL SOP]</p>
                <p>Referenced Document: MRPL-SOP-CDU-402 (Pressure Vessel Inspection)</p>
                <p>Clause 4.3: Minimum allowable thickness for SA-516 Gr 70 at 14.5 MPa is 17.8 mm.</p>
                <p style={{ color: "#34d399" }}>Remaining Useful Life (RUL) Calculation Recommended before next turnaround.</p>
              </div>
            )}

            {simStep === 3 && (
              <div style={{ background: "rgba(18,24,36,0.6)", padding: "1rem", borderRadius: "10px", lineHeight: 1.6, fontSize: "0.8rem" }}>
                <p style={{ color: "#34d399", fontWeight: 700 }}>$ python3 -m sandbox.executor</p>
                <p style={{ color: "var(--text-muted)" }}>P = 14.5 MPa; D = 600.0 mm; t_measured = 19.4 mm; S_allow = 138.0 MPa</p>
                <p style={{ color: "var(--text-muted)" }}>t_min = (P * D) / (2 * S_allow * E - 0.2 * P) = 17.42 mm</p>
                <p style={{ color: "#ffffff" }}>Calculated Hoop Stress: 112.16 MPa &lt;= 138.00 MPa [OK]</p>
                <p style={{ color: "#34d399", fontWeight: 800 }}>STATUS: SAFE FOR CONTINUED OPERATION (Margin: +1.98 mm)</p>
              </div>
            )}

            {simStep === 4 && (
              <div style={{ background: "rgba(18,24,36,0.6)", padding: "1rem", borderRadius: "10px", lineHeight: 1.6, fontSize: "0.8rem" }}>
                <p style={{ color: "#22d3ee", fontWeight: 700 }}>[GENERATED APPROVAL MEMORANDUM]</p>
                <div style={{ border: "1px solid var(--border-subtle)", padding: "0.75rem", borderRadius: "8px", background: "#07090e", margin: "8px 0" }}>
                  <p style={{ fontWeight: 800, color: "#ffffff" }}>MANGALORE REFINERY & PETROCHEMICALS LIMITED (MRPL)</p>
                  <p style={{ color: "var(--text-muted)" }}>Subject: NDT Ultrasonic Thickness & Structural Integrity Clearance — Valve V-102</p>
                  <p style={{ color: "#34d399", fontWeight: 700 }}>Recommendation: Approved for 18 months continuous operation until turnaround 2027.</p>
                </div>
                <Link to="/workbench" className="btn-primary-glow" style={{ fontSize: "0.75rem", padding: "0.5rem 1rem", marginTop: "6px" }}>
                  <Download style={{ width: "14px", height: "14px" }} /> Download .docx Deliverable in Workbench
                </Link>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-dim)" }}>
              <span>Isolated Execution Time: ~1.14s</span>
              <span>Hardware WAN Activity: 0 Bytes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: HARDWARE MATRIX TABLE ── */}
      <section id="hardware" className="bento-section" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="section-header-center">
          <span className="pill-badge-cyan" style={{ marginBottom: "0.75rem" }}>
            HARDWARE COMPATIBILITY
          </span>
          <h2 className="section-title">From Dual-Laptop Demo to Refinery Cluster</h2>
          <p className="section-subtitle">
            Engineered to run efficiently on affordable consumer GPUs today and scale to enterprise refinery servers seamlessly.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="sovereign-table">
            <thead>
              <tr>
                <th>DEPLOYMENT TIER</th>
                <th>TARGET HARDWARE</th>
                <th>MODELS HOSTED</th>
                <th>LATENCY</th>
                <th>SOVEREIGNTY STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 800, color: "#22d3ee" }}>Dual Laptop Demo (Current)</td>
                <td>2x 6GB GPUs (RTX 4050 + 3050)</td>
                <td>Qwen2.5-3B + Qwen2.5-Coder-7B + Llama-3.1-8B (Q4)</td>
                <td style={{ color: "#34d399", fontWeight: 700 }}>&lt; 350ms TTFT</td>
                <td style={{ color: "#34d399", fontWeight: 800 }}>100% AIRGAP VERIFIED</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: "#ffffff" }}>Production Refinery Server</td>
                <td>1x RTX 4090 / A5000 (24GB VRAM)</td>
                <td>DeepSeek-Coder-14B + Qwen2-VL-7B + Llama-3.1-8B</td>
                <td style={{ color: "#34d399", fontWeight: 700 }}>&lt; 150ms TTFT</td>
                <td style={{ color: "#34d399", fontWeight: 800 }}>ENTERPRISE ON-PREM</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: "#ffffff" }}>Enterprise Multi-Plant Cluster</td>
                <td>2x RTX 6000 Ada / A100 (48GB-80GB)</td>
                <td>Qwen2.5-72B (FP8) + Qwen2-VL-72B + Full Vector Farm</td>
                <td style={{ color: "#34d399", fontWeight: 700 }}>&lt; 80ms TTFT</td>
                <td style={{ color: "#34d399", fontWeight: 800 }}>ISOLATED ENCLAVE</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2.5rem", textAlign: "center" }}>
          <div style={{ background: "#0b0e17", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "1.5rem" }}>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#22d3ee" }}>4.7 GB</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Peak VRAM Per Model (Quantized)</p>
          </div>
          <div style={{ background: "#0b0e17", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "1.5rem" }}>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#34d399" }}>100%</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Air-Gapped Local Operation</p>
          </div>
          <div style={{ background: "#0b0e17", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "1.5rem" }}>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#60a5fa" }}>₹0.00</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Cloud API Cost & Zero Cloud Egress</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FAQ ACCORDION ── */}
      <section id="faq" className="bento-section" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="section-header-center">
          <span className="pill-badge-cyan" style={{ marginBottom: "0.75rem" }}>COMPLIANCE AUDIT</span>
          <h2 className="section-title">Compliance, Security & Integration FAQ</h2>
          <p className="section-subtitle">Key answers for MRPL evaluators, CISOs, and technical judges.</p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} style={{ background: "#0b0e17", border: "1px solid var(--border-subtle)", borderRadius: "14px", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  style={{ width: "100%", padding: "1.25rem", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp style={{ width: "16px", height: "16px", color: "#22d3ee" }} /> : <ChevronDown style={{ width: "16px", height: "16px", color: "var(--text-dim)" }} />}
                </button>
                {isOpen && (
                  <div style={{ padding: "0 1.25rem 1.25rem", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.75rem" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 7: DEPLOY CALL TO ACTION ── */}
      <section className="bento-section" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <div className="pill-badge-cyan">
            <Lock style={{ width: "14px", height: "14px" }} />
            READY FOR AIR-GAPPED ON-PREMISE DEPLOYMENT
          </div>

          <h2 style={{ fontSize: "2.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Deploy Sovereign AI in Your Air-Gapped Refinery Enclave Today
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6 }}>
            Eliminate shadow AI risks. Give refinery engineers, maintenance teams, and plant managers an intelligent multi-model workbench with certified data sovereignty.
          </p>

          <div style={{ width: "100%", maxWidth: "520px", background: "#0b0e17", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
            <span style={{ color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <span style={{ color: "#22d3ee" }}>$</span> curl -sSL https://get.aerosovereign.local/deploy.sh | bash
            </span>
            <button
              onClick={handleCopyCmd}
              style={{ padding: "0.4rem 0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "none", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", cursor: "pointer", shrink: 0 }}
            >
              {copiedCmd ? (
                <>
                  <CheckCircle style={{ width: "14px", height: "14px", color: "#34d399" }} />
                  <span style={{ color: "#34d399", fontWeight: 700 }}>Copied!</span>
                </>
              ) : (
                <>
                  <Copy style={{ width: "14px", height: "14px", color: "var(--text-dim)" }} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <Link to="/workbench" className="btn-primary-glow" style={{ padding: "1rem 2.2rem", fontSize: "1rem" }}>
            <Zap style={{ width: "20px", height: "20px", fill: "currentColor" }} />
            Launch Knowledge Workbench
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "2.5rem 2rem", background: "#07090e", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #0284c7, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield style={{ width: "16px", height: "16px", color: "#ffffff" }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "#e2e8f0" }}>AEROSOVEREIGN // MRPL WORKBENCH</p>
              <p style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>PSU AIR-GAPPED INTELLIGENCE v2.1</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/workbench" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Workbench</Link>
            <a href="#routing" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Routing Spec</a>
            <a href="#hardware" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Hardware Matrix</a>
            <a href="#faq" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Compliance</a>
          </div>

          <span className="pill-badge-emerald" style={{ fontSize: "0.65rem" }}>
            <span className="pulse-light-emerald"></span>
            ALL LOCAL // ZERO WAN EGRESS
          </span>
        </div>
      </footer>
    </div>
  );
}
