import React from "react";
import { Bot, Cpu, FileSpreadsheet, Lock, CheckCircle, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  const pillars = [
    {
      icon: <Bot className="w-8 h-8 text-teal-600" />,
      tag: "AGENTIC WORKFLOWS",
      title: "Multi-Agent Orchestrator",
      desc: "Plans complex industrial tasks, invokes local tools (OCR, file IO, sandbox code execution), and iterates autonomously until engineering deliverables are complete.",
      highlights: [
        "Iterative goal decomposition & planning",
        "Local Python code execution sandbox",
        "P&ID schematic symbol recognition",
        "Iterates until equations balance",
      ],
    },
    {
      icon: <Cpu className="w-8 h-8 text-emerald-600" />,
      tag: "DYNAMIC DISPATCH",
      title: "Open-Weight Model Router",
      desc: "Dynamically routes each request to the optimal model based on task requirements without vendor lock-in. Evaluated on NVIDIA RTX local hardware.",
      highlights: [
        "DeepSeek-R1 for complex engineering logic",
        "Qwen 2.5 Coder for sandboxed Python calculations",
        "Llama 3.2 Vision for scanned blueprints & OCR",
        "Pluggable backend (Ollama, vLLM, SGLang)",
      ],
    },
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-teal-600" />,
      tag: "PRODUCTION DELIVERABLES",
      title: "Certified Engineering Artifacts",
      desc: "Generates production-grade Word approval notes, Excel stress spreadsheets, and PowerPoint board briefings with ASME/API reference steps shown.",
      highlights: [
        "Formal .docx approval memos ready for signing",
        "Formatted .xlsx calculation workbooks",
        "Step-by-step engineering proofs",
        "Grounding in refinery SOPs & manuals",
      ],
    },
    {
      icon: <Lock className="w-8 h-8 text-amber-600" />,
      tag: "CONFIDENTIALITY GUARANTEE",
      title: "Air-Gapped Sovereign Security",
      desc: "Deployed 100% on the organization's private GPU server. Never phones home. Continuous network monitor proves 0 outbound packets at all times.",
      highlights: [
        "Strict air-gap compliance (No internet needed)",
        "Zero data transmission to cloud APIs",
        "Immutable local audit logging",
        "Protected from industrial espionage",
      ],
    },
  ];

  return (
    <section className="features-section" id="features" aria-label="Core Capabilities">
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <ShieldCheck className="w-4 h-4" />
            <span>MRPL PROBLEM STATEMENT 26117 SOLUTION</span>
          </div>
          <h2 className="section-title">
            Enterprise Modules for Sovereign Industrial Intelligence
          </h2>
          <p className="section-subtitle">
            Replace vulnerable external cloud AI APIs with a hardened, multi-agent on-premise execution stack.
          </p>
        </div>

        <div className="features-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-card-content">
                <div className="feature-icon-wrapper">
                  {pillar.icon}
                  <span className="feature-tag">{pillar.tag}</span>
                </div>
                <h3 className="feature-title">{pillar.title}</h3>
                <p className="feature-desc">{pillar.desc}</p>
                <ul className="feature-list">
                  {pillar.highlights.map((h, i) => (
                    <li key={i} className="feature-list-item">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" style={{ marginTop: "3px" }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
