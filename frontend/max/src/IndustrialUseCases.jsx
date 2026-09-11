import React, { useState } from "react";
import { FileText, Cpu, Activity, ShieldCheck } from "lucide-react";

export default function IndustrialUseCases() {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: "pid-ocr",
      tabTitle: "P&ID Drawing Analysis",
      badge: "MULTIMODAL VISION",
      title: "Scanned Blueprint OCR & Safety Valve Verification",
      model: "Llama-3.2-Vision-11B",
      desc: "Automatically ingests high-resolution scanned engineering drawings, extracts tag numbers, valve positions, pipe specifications, and cross-references them against plant operating manuals.",
      inputPreview: "FCCU-Area-04-Drawing-101-P-Rev3.pdf (Scanned 300 DPI)",
      executionSteps: [
        "Identified 18 instrument tags on high-pressure steam tie-in line.",
        "Recognized thermal relief valve PSV-104 with 14.5 bar design pressure.",
        "Cross-checked local refinery manual Chapter 4: Minimum setpoint requires 16.0 bar margin.",
        "Flagged compliance status: PASS - Documented in inspection log.",
      ],
      outputType: "Automated Inspection Record & Annotated Vector Overlay",
    },
    {
      id: "asme-stress",
      tabTitle: "ASME Stress Calculations",
      badge: "SANDBOX PYTHON",
      title: "Cylindrical Shell Hoop Stress (Barlow's Formula)",
      model: "Qwen2.5-Coder-7B",
      desc: "Parses engineer input, writes Python code in an isolated local container, executes calculation with zero network access, and outputs step-by-step mathematical proofs.",
      inputPreview: "P = 14.5 MPa, D = 600mm, t = 24.5mm, Material: SA-516 Gr 70",
      executionSteps: [
        "Hoop Stress Formula: S_h = (P * D) / (2 * t)",
        "Computed value: S_h = (14.5 * 600) / (2 * 24.5) = 177.55 MPa",
        "SA-516 Gr 70 allowable stress at 350°C: 138.00 MPa",
        "Result: Stress exceeds base allowable; reinforced nozzle pad required under UG-37.",
      ],
      outputType: "Audited Python Script Execution Log + Safe Margin Factor",
    },
    {
      id: "iso-vibration",
      tabTitle: "Pump Vibration Severity",
      badge: "DATA INTERPRETATION",
      title: "ISO 10816-3 Refinery Centrifugal Pump Diagnostics",
      model: "DeepSeek-R1-14B",
      desc: "Takes real-time NDT vibration measurements from field sensors, computes statistical RMS averages, and classifies equipment health into operational zones.",
      inputPreview: "Readings: [1.8, 2.1, 1.9, 2.4, 2.2] mm/s RMS (Bearing Housing 101-P)",
      executionSteps: [
        "Calculated average velocity: 2.08 mm/s RMS (Peak: 2.40 mm/s)",
        "Equipment classification: Group 1 Rigid foundation centrifugal pump (>15kW)",
        "ISO Standard evaluation: 2.08 mm/s falls inside Zone A (< 2.8 mm/s)",
        "Recommendation: Unrestricted long-term operation permissible.",
      ],
      outputType: "Engineering Vibration Diagnostic Certificate",
    },
    {
      id: "approval-memo",
      tabTitle: "Executive Approval Memo",
      badge: "DOCUMENT ENGINE",
      title: "Confidential Board & Plant Manager Word Deliverable",
      model: "DeepSeek-R1 + Document Engine",
      desc: "Synthesizes multi-step analysis into a formal corporate Word (.docx) document formatted with executive summaries, equations, risk ratings, and signature blocks.",
      inputPreview: "Request: Draft Capex authorization memo for Crude Distillation Column 101 overhaul",
      executionSteps: [
        "Formulated executive summary with risk analysis and cost projection.",
        "Embedded verified ASME calculation tables and safety audit references.",
        "Generated compliant .docx document containing corporate letterhead and sign-off table.",
        "Calculated SHA-256 hash for air-gap audit logging.",
      ],
      outputType: "Ready-to-Sign Formal .docx Approval Document",
    },
  ];

  const current = cases[selectedCase];

  return (
    <section className="industrial-section" id="industrial" aria-label="Industrial Use Cases">
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <Activity className="w-4 h-4" />
            <span>REAL-WORLD DEPLOYMENT SCENARIOS</span>
          </div>
          <h2 className="section-title">
            Tailored for Refinery &amp; Heavy Industry Demands
          </h2>
          <p className="section-subtitle">
            From P&amp;ID inspection to ASME structural calculations and formal sign-offs—executed entirely on-premise.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="cases-tab-bar" role="tablist">
          {cases.map((item, idx) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={selectedCase === idx}
              onClick={() => setSelectedCase(idx)}
              className={`case-tab-btn ${selectedCase === idx ? "active" : ""}`}
            >
              <span className="case-tab-dot"></span>
              <span>{item.tabTitle}</span>
            </button>
          ))}
        </div>

        {/* Active Case Display Card */}
        <div className="case-display-card">
          <div className="case-card-grid">
            {/* Left: Info & Model */}
            <div className="case-info-col">
              <div className="case-badge-row">
                <span className="case-badge">{current.badge}</span>
                <span className="case-model-chip">
                  <Cpu className="w-3.5 h-3.5 text-teal-600" />
                  <span>{current.model}</span>
                </span>
              </div>

              <h3 className="case-title">{current.title}</h3>
              <p className="case-desc">{current.desc}</p>

              <div className="case-input-box">
                <span className="input-label">SAMPLE INPUT DATA:</span>
                <code className="input-data">{current.inputPreview}</code>
              </div>

              <div className="case-output-meta">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Deliverable: {current.outputType}</span>
              </div>
            </div>

            {/* Right: Step-by-step local agent execution */}
            <div className="case-execution-col">
              <div className="execution-header">
                <span className="exec-title">AGENTIC MULTI-STEP REASONING PIPELINE</span>
                <span className="exec-badge">AIR-GAPPED GPU</span>
              </div>

              <div className="exec-steps-list">
                {current.executionSteps.map((step, i) => (
                  <div key={i} className="exec-step-item">
                    <div className="step-num-circle">{i + 1}</div>
                    <div className="step-text-content">
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="exec-footer-bar">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>All calculations and tokens verified on local NVIDIA VRAM.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
