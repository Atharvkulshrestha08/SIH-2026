import React, { useState, useEffect } from "react";
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
  Server,
  Activity,
  Layers,
  Database,
  Search,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Radio,
  Sparkles,
  Sliders,
  HardDrive
} from "lucide-react";

export default function LandingPage() {
  // Live Router Interactive State
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

  // Workflow Simulator State
  const [simStep, setSimStep] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);

  // Copy state
  const [copiedCmd, setCopiedCmd] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Quick Preset Router Prompts
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
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* ── TOP ANNOUNCEMENT BANNER ── */}
      <div className="border-b border-white/10 bg-[#0d0e12] px-4 py-2 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              AIR-GAPPED SOVEREIGN AI OS
            </span>
            <span className="text-zinc-400 hidden sm:inline">
              SPEC: MRPL-26117-REV4 // PSUs & REFINERIES
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              WAN: <strong className="text-emerald-400 font-mono">0.00 KB/s</strong>
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              DUAL 6GB GPU ENCLAVE
            </span>
          </div>
        </div>
      </div>

      {/* ── STICKY NAVBAR ── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">
                  AERO<span className="text-cyan-400">SOVEREIGN</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-white/10">
                  MRPL v2.1
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono tracking-wider">
                ON-PREMISE INDUSTRIAL AI
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#dilemma" className="hover:text-cyan-400 transition-colors">
              Refinery Dilemma
            </a>
            <a href="#routing" className="hover:text-cyan-400 transition-colors">
              Model Routing
            </a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">
              Live Agent Execution
            </a>
            <a href="#hardware" className="hover:text-cyan-400 transition-colors">
              Hardware Specs
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              Compliance FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/workbench"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all border border-cyan-400/30"
            >
              <Zap className="w-4 h-4 fill-white" />
              Launch Workbench
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-white/10">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                SOVEREIGN REFINERY ENCLAVE // ZERO DATA LEAKAGE
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Sovereign Industrial Intelligence.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                  Zero Cloud Egress.
                </span>
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                Purpose-built for{" "}
                <strong className="text-zinc-200">
                  Mangalore Refinery and Petrochemicals Limited (MRPL)
                </strong>
                , defence, and PSU manufacturing. Run multi-model agentic workflows across local
                open-weight LLMs with guaranteed zero cloud egress, certified on-premise security,
                and auditable air-gapped performance.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/workbench"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all border border-cyan-400/40"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Launch Knowledge Workbench
                </Link>
                <a
                  href="#simulator"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  View Live Agent Demo
                </a>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> 0 KB/s Egress
                  </span>
                  <span className="text-[11px] text-zinc-500">100% Air-Gapped</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Zap className="w-4 h-4" /> &lt; 350ms TTFT
                  </span>
                  <span className="text-[11px] text-zinc-500">Dual-GPU Latency</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                    <Layers className="w-4 h-4" /> Multi-Model
                  </span>
                  <span className="text-[11px] text-zinc-500">Dynamic Task Router</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Terminal className="w-4 h-4" /> AST Sandbox
                  </span>
                  <span className="text-[11px] text-zinc-500">Verified Python Math</span>
                </div>
              </div>
            </div>

            {/* Right Col: Live Sovereign Enclave HUD Widget */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-zinc-950/90 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 p-5 space-y-4 font-mono relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold text-white tracking-wider">
                      LOCAL ENCLAVE TELEMETRY
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    AIRGAP: LOCKED
                  </span>
                </div>

                {/* WAN Monitor Metric */}
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-zinc-500">OUTBOUND WAN EGRESS</p>
                    <p className="text-xl font-bold text-emerald-400 tracking-tight">
                      0.000 KB/s
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-500">SECURITY AUDIT</p>
                    <span className="text-xs text-cyan-300 font-semibold">
                      VERIFIED SOVEREIGN
                    </span>
                  </div>
                </div>

                {/* Live Node Topology Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Node 1 (4050)</span>
                      <span className="text-cyan-400">2.2 GB</span>
                    </div>
                    <p className="text-[11px] text-zinc-200 font-semibold">
                      Qwen2.5-3B Router
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      faster-whisper + Piper TTS
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Node 2 (3050)</span>
                      <span className="text-cyan-400">4.7 GB</span>
                    </div>
                    <p className="text-[11px] text-zinc-200 font-semibold">
                      Qwen2.5-Coder-7B
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      Llama-3.1-8B + ChromaDB
                    </p>
                  </div>
                </div>

                {/* Real-Time Telemetry Bar */}
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 space-y-2 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Task Latency: <strong className="text-cyan-300">284ms</strong></span>
                    <span>Time to 1st Token: <strong className="text-emerald-400">140ms</strong></span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[88%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>VRAM Split: 6.9 GB / 12 GB Total</span>
                    <span>Active Loops: 127.0.0.1</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/workbench"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-semibold border border-cyan-500/20 transition-all"
                  >
                    Open Live Engineering Console <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE REFINERY DILEMMA VS SOVEREIGN CERTAINTY ── */}
      <section id="dilemma" className="py-20 border-b border-white/10 bg-[#0d0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono font-semibold">
              HIGH-CONSEQUENCE SECURITY THREAT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Refinery Dilemma vs. Sovereign Certainty
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Industrial plants generate massive confidential knowledge work: P&IDs, ultrasonic
              defect reports, and vendor tenders. Sending this to public cloud AI creates
              unacceptable compliance and espionage risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Public Cloud Trap (Red Danger Card) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-zinc-950/80 border border-red-500/30 relative overflow-hidden shadow-xl shadow-red-950/20">
              <div className="flex items-center gap-3 pb-4 border-b border-red-500/20 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-400">The Public Cloud Trap</h3>
                  <p className="text-xs text-zinc-500 font-mono">ChatGPT / Claude / Copilot</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>
                    <strong>Confidential P&ID Exposure:</strong> Schematics and valve tag numbers
                    streamed across external WAN servers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>
                    <strong>Shadow AI Proliferation:</strong> Engineers quietly copy-pasting
                    refinery thickness calculations into public AI bots.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>
                    <strong>Compliance & Legal Penalties:</strong> Direct violation of PSU data
                    sovereignty, ISO 27001, and defense air-gap directives.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>
                    <strong>Zero Model Agility:</strong> Locked to single proprietary vendors with
                    unpredictable API pricing and outages.
                  </span>
                </li>
              </ul>
            </div>

            {/* 100% On-Premise Air-Gap Enclave (Cyan Sovereign Card) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-zinc-950/80 border border-cyan-500/40 relative overflow-hidden shadow-xl shadow-cyan-950/30">
              <div className="flex items-center gap-3 pb-4 border-b border-cyan-500/20 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-300">
                    100% On-Premise Air-Gap Workbench
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">AeroSovereign MRPL Architecture</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Outbound Egress:</strong> 100% local GPU execution; verified 0
                    bytes leave the local refinery network perimeter.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dynamic Model Router:</strong> Auto-selects Qwen2.5-Coder for math,
                    Llama-3.1 for SOPs, and Qwen2-VL for drawings.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>AST-Guarded Math Sandbox:</strong> Executes code locally to guarantee
                    zero hallucination on critical refinery formulas.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Real Deliverable Export:</strong> Directly exports signed `.docx`
                    approval notes and `.xlsx` calculation workbooks.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DYNAMIC OPEN-WEIGHT ROUTING ARCHITECTURE ── */}
      <section id="routing" className="py-20 border-b border-white/10 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold">
              MULTI-MODEL SPECIALIZATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dynamic Open-Weight Routing Architecture
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              No single model excels at everything. AeroSovereign uses a sub-100ms lightweight
              router to analyze user intent and dispatch each sub-task to the best specialized
              model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 4 Specialized Model Cards */}
            <div className="lg:col-span-5 space-y-3">
              {PRESET_QUERIES.map((preset, idx) => {
                const isActive = routerQuery === preset.query;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-zinc-900 border-cyan-500/60 shadow-lg shadow-cyan-950/30"
                        : "bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5">
                      <span className="font-semibold text-sm text-white flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        {preset.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2">{preset.query}</p>
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Model: <strong className="text-zinc-300">{preset.model}</strong></span>
                      <span className="text-emerald-400">{preset.latency}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Interactive Live Task Router Terminal */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-zinc-950 border border-white/10 p-6 font-mono space-y-5 shadow-2xl shadow-black/80">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>LIVE TASK ROUTER INSPECTOR (QWEN2.5-3B)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ONLINE: SUB-100MS
                  </span>
                </div>

                {/* Input Prompt Box */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 uppercase tracking-wider">
                    Test Prompt Input:
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={routerQuery}
                      onChange={(e) => setRouterQuery(e.target.value)}
                      className="w-full rounded-xl bg-zinc-900/90 border border-white/10 p-3 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Enter any industrial query..."
                    />
                  </div>
                </div>

                {/* Routing Decision Output */}
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">CLASSIFIED INTENT:</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                      {isRouting ? "ANALYZING..." : selectedRoute.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">ASSIGNED SPECIALIST:</span>
                    <span className="text-white font-semibold">{selectedRoute.model}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">TARGET COMPUTE NODE:</span>
                    <span className="text-zinc-300">{selectedRoute.node}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">ROUTING LATENCY / CONFIDENCE:</span>
                    <span className="text-emerald-400 font-bold">
                      {selectedRoute.latency} // {selectedRoute.confidence}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    <span className="text-zinc-500 text-[10px]">REQUIRED TOOLS:</span>
                    {selectedRoute.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-zinc-500">
                    *Click any preset on the left or type your own query.
                  </span>
                  <Link
                    to="/workbench"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Execute in Workbench <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: LIVE SOVEREIGN AGENT EXECUTION SIMULATOR ── */}
      <section id="simulator" className="py-20 border-b border-white/10 bg-[#0d0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
              END-TO-END WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Sovereign Agent Execution
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Observe an end-to-end agentic workflow: from parsing a scanned MRPL inspection report
              to AST-guarded Python calculation, SOP matching, and direct Word approval note
              synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Workflow Steps Timeline */}
            <div className="lg:col-span-5 space-y-4 font-mono">
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase">Target Inspection Package</span>
                <p className="text-xs font-bold text-white">
                  Ultrasonic Thickness Report — Crude Distillation Column (CDU-1) Valve V-102
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                  <span>File: <strong className="text-cyan-300">CDU_NDT_2026.pdf</strong></span>
                  <span>•</span>
                  <span>Standard: <strong className="text-zinc-300">ASME Sec VIII / API 510</strong></span>
                </div>
              </div>

              {/* Step 1 */}
              <div
                onClick={() => setSimStep(1)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  simStep === 1
                    ? "bg-zinc-900 border-cyan-500 text-white"
                    : "bg-zinc-950/60 border-white/10 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                      1
                    </span>
                    Document OCR & Table Extraction
                  </span>
                  <span className="text-[10px] text-cyan-400">Qwen2-VL-7B</span>
                </div>
                <p className="text-[11px] mt-1 text-zinc-500 pl-7">
                  Extracted measured thickness: 19.4 mm (Nominal: 24.5 mm)
                </p>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setSimStep(2)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  simStep === 2
                    ? "bg-zinc-900 border-cyan-500 text-white"
                    : "bg-zinc-950/60 border-white/10 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Local SOP & Manual RAG Matching
                  </span>
                  <span className="text-[10px] text-cyan-400">Llama-3.1-8B</span>
                </div>
                <p className="text-[11px] mt-1 text-zinc-500 pl-7">
                  Matched MRPL SOP #CDU-402: Minimum corrosion allowance is 3.0 mm.
                </p>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setSimStep(3)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  simStep === 3
                    ? "bg-zinc-900 border-cyan-500 text-white"
                    : "bg-zinc-950/60 border-white/10 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                      3
                    </span>
                    AST-Guarded Python Math Execution
                  </span>
                  <span className="text-[10px] text-emerald-400">Qwen2.5-Coder-7B</span>
                </div>
                <p className="text-[11px] mt-1 text-zinc-500 pl-7">
                  Barlow's formula calculation executed in local sandbox.
                </p>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => setSimStep(4)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  simStep === 4
                    ? "bg-zinc-900 border-cyan-500 text-white"
                    : "bg-zinc-950/60 border-white/10 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Synthesis & .DOCX Memo Generation
                  </span>
                  <span className="text-[10px] text-blue-400">python-docx</span>
                </div>
                <p className="text-[11px] mt-1 text-zinc-500 pl-7">
                  Generated signed approval note ready for plant manager sign-off.
                </p>
              </div>
            </div>

            {/* Right: Live Terminal & Deliverable Preview */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-zinc-950 border border-white/10 p-5 font-mono text-xs space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>SANDBOX VERIFIED OUTPUT (STAGE {simStep} / 4)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    AST CHECK: PASSED
                  </span>
                </div>

                {/* Step 1 Content */}
                {simStep === 1 && (
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/5 space-y-2 text-zinc-300">
                    <p className="text-cyan-300 font-semibold">[OCR EXTRACTOR OUTPUT]</p>
                    <p>Component Tag: Valve V-102 (Crude Distillation Column Line A)</p>
                    <p>Nominal Design Thickness: 24.5 mm | Material: SA-516 Grade 70</p>
                    <p className="text-amber-400 font-bold">
                      Measured Ultrasonic Reading: 19.4 mm (Total Wall Loss: 5.1 mm)
                    </p>
                  </div>
                )}

                {/* Step 2 Content */}
                {simStep === 2 && (
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/5 space-y-2 text-zinc-300">
                    <p className="text-cyan-300 font-semibold">[CHROMA RAG MATCH // MRPL SOP]</p>
                    <p>Referenced Document: MRPL-SOP-CDU-402 (Pressure Vessel Inspection)</p>
                    <p>Clause 4.3: Minimum allowable thickness for SA-516 Gr 70 at 14.5 MPa is 17.8 mm.</p>
                    <p className="text-emerald-400">
                      Remaining Useful Life (RUL) Calculation Recommended before next turnaround.
                    </p>
                  </div>
                )}

                {/* Step 3 Content */}
                {simStep === 3 && (
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/5 space-y-2 text-zinc-300">
                    <p className="text-emerald-400 font-semibold">$ python3 -m sandbox.executor</p>
                    <div className="text-zinc-400 space-y-1">
                      <p>P = 14.5 MPa; D = 600.0 mm; t_measured = 19.4 mm; S_allow = 138.0 MPa</p>
                      <p>t_min = (P * D) / (2 * S_allow * E - 0.2 * P) = 17.42 mm</p>
                      <p className="text-white">Calculated Hoop Stress: 112.16 MPa &lt;= 138.00 MPa [OK]</p>
                      <p className="text-emerald-400 font-bold">
                        STATUS: SAFE FOR CONTINUED OPERATION (Margin: +1.98 mm)
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4 Content */}
                {simStep === 4 && (
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/5 space-y-3 text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-semibold">[GENERATED APPROVAL MEMORANDUM]</span>
                      <span className="text-[10px] text-emerald-400">DOCX FORMAT READY</span>
                    </div>
                    <div className="border border-white/10 p-3 rounded-lg bg-zinc-950 space-y-1.5 text-[11px]">
                      <p className="font-bold text-white">
                        MANGALORE REFINERY & PETROCHEMICALS LIMITED (MRPL)
                      </p>
                      <p className="text-zinc-400">
                        Subject: NDT Ultrasonic Thickness & Structural Integrity Clearance — Valve V-102
                      </p>
                      <p className="text-zinc-400">
                        Recommendation: Approved for 18 months continuous operation until turnaround 2027.
                      </p>
                    </div>
                    <Link
                      to="/workbench"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> Download .docx Deliverable in Workbench
                    </Link>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Isolated Execution Time: ~1.14s</span>
                  <span>Hardware WAN Activity: 0 Bytes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ENGINEERED FOR HIGH-CONSEQUENCE REFINING ── */}
      <section className="py-20 border-b border-white/10 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold">
              ENTERPRISE-GRADE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for High-Consequence Refining
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Four fundamental architectural pillars ensuring maximum security, zero hallucinations,
              and verifiable sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Air-Gapped Vector DB</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Local ChromaDB storing all MRPL SOPs, API standards, and past memos with 100% offline
                semantic embeddings.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AST-Guarded Python</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Formulas run inside an isolated local sandbox with execution limits and system-call
                tamper blocking.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multimodal Drawing OCR</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Qwen2-VL vision models extract text, tables, and valve tag numbers from scanned PDFs
                and P&ID drawings.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Immutable Audit Logs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every model decision, tool call, execution timestamp, and user action is written to a
                tamper-proof local log.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: HARDWARE TIER SPECIFICATIONS ── */}
      <section id="hardware" className="py-20 border-b border-white/10 bg-[#0d0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold">
              HARDWARE COMPATIBILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Dual-Laptop Demo to Refinery Cluster
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Engineered to run efficiently on affordable consumer GPUs today and scale to enterprise
              refinery servers seamlessly.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-white/10 rounded-2xl overflow-hidden bg-zinc-950">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-white/10">
                <tr>
                  <th className="p-4">DEPLOYMENT TIER</th>
                  <th className="p-4">TARGET HARDWARE</th>
                  <th className="p-4">MODELS HOSTED</th>
                  <th className="p-4">LATENCY</th>
                  <th className="p-4">SOVEREIGNTY STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-4 font-bold text-cyan-300">Hackathon / Edge Node (Current)</td>
                  <td className="p-4">2x 6GB GPUs (RTX 4050 + 3050)</td>
                  <td className="p-4">Qwen2.5-3B + Qwen2.5-Coder-7B + Llama-3.1-8B (Q4)</td>
                  <td className="p-4 text-emerald-400">&lt; 350ms TTFT</td>
                  <td className="p-4 text-emerald-400 font-bold">100% AIRGAP VERIFIED</td>
                </tr>
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-4 font-bold text-white">Production Refinery Server</td>
                  <td className="p-4">1x RTX 4090 / A5000 (24GB VRAM)</td>
                  <td className="p-4">DeepSeek-Coder-14B + Qwen2-VL-7B + Llama-3.1-8B</td>
                  <td className="p-4 text-emerald-400">&lt; 150ms TTFT</td>
                  <td className="p-4 text-emerald-400 font-bold">ENTERPRISE ON-PREM</td>
                </tr>
                <tr className="hover:bg-zinc-900/40">
                  <td className="p-4 font-bold text-white">Enterprise Multi-Plant Cluster</td>
                  <td className="p-4">2x RTX 6000 Ada / A100 (48GB-80GB)</td>
                  <td className="p-4">Qwen2.5-72B (FP8) + Qwen2-VL-72B + Full Embedding Farm</td>
                  <td className="p-4 text-emerald-400">&lt; 80ms TTFT</td>
                  <td className="p-4 text-emerald-400 font-bold">ISOLATED ENCLAVE</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-center font-mono">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
              <p className="text-3xl font-extrabold text-cyan-400">4.7 GB</p>
              <p className="text-xs text-zinc-400 mt-1">Peak VRAM Per Model (Quantized)</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
              <p className="text-3xl font-extrabold text-emerald-400">100%</p>
              <p className="text-xs text-zinc-400 mt-1">Air-Gapped Local Operation</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10">
              <p className="text-3xl font-extrabold text-blue-400">₹0.00</p>
              <p className="text-xs text-zinc-400 mt-1">Cloud API Cost & Zero Cloud Egress</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: COMPLIANCE & INTEGRATION FAQ ── */}
      <section id="faq" className="py-20 border-b border-white/10 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold">
              COMPLIANCE AUDIT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Compliance, Security & Integration FAQ
            </h2>
            <p className="text-zinc-400 text-sm">
              Answers to critical architecture questions from PSU audit teams and technical evaluators.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition-colors"
                  >
                    <span className="font-semibold text-sm text-white">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CALL TO ACTION ENCLAVE ── */}
      <section className="py-20 border-b border-white/10 bg-gradient-to-b from-[#0d0e12] to-[#09090b] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            READY FOR AIR-GAPPED ON-PREMISE DEPLOYMENT
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Deploy Sovereign AI in Your Air-Gapped Refinery Enclave Today
          </h2>

          <p className="text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            Eliminate shadow AI risks. Give refinery engineers, maintenance teams, and plant managers
            an intelligent multi-model workbench with certified data sovereignty.
          </p>

          {/* Copyable CLI Snippet */}
          <div className="max-w-xl mx-auto p-3 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-300 truncate mr-2">
              <span className="text-cyan-400">$</span> curl -sSL https://get.aerosovereign.local/deploy.sh | bash
            </span>
            <button
              onClick={handleCopyCmd}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors shrink-0"
            >
              {copiedCmd ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/workbench"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all border border-cyan-400/40"
            >
              <Zap className="w-4 h-4 fill-white" />
              Launch Knowledge Workbench
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 bg-[#09090b] border-t border-white/10 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-zinc-200">AEROSOVEREIGN // MRPL WORKBENCH</p>
              <p className="text-[10px] text-zinc-500">PSU AIR-GAPPED INTELLIGENCE v2.1</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            <Link to="/workbench" className="hover:text-cyan-400 transition-colors">
              Workbench
            </Link>
            <a href="#routing" className="hover:text-cyan-400 transition-colors">
              Routing Spec
            </a>
            <a href="#hardware" className="hover:text-cyan-400 transition-colors">
              Hardware Matrix
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              Compliance
            </a>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL LOCAL // ZERO WAN EGRESS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
