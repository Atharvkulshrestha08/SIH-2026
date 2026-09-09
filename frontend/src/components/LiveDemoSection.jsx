import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Cpu, Play, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { askModel } from "../services/api";

const PRESET_QUERIES = [
  {
    label: "ASME Section VIII Hoop Stress",
    query: "Calculate internal hoop stress for a 600mm cylindrical shell at 14.5 MPa with 24.5mm wall thickness.",
    expectedModel: "Qwen2.5-Coder-7B",
  },
  {
    label: "MRPL P&ID Safety Valve Compliance",
    query: "Review scanned P&ID line 04-P-12: Verify thermal relief valve PSV-104 sizing according to API 520.",
    expectedModel: "Llama-3.2-Vision-11B",
  },
  {
    label: "Confidential Turnaround Memo",
    query: "Draft an executive board approval note for the upcoming FCCU catalyst changeover with risk assessment.",
    expectedModel: "DeepSeek-R1-14B",
  },
];

export default function LiveDemoSection() {
  const [inputQuery, setInputQuery] = useState(PRESET_QUERIES[0].query);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRun = async (queryText = inputQuery) => {
    if (!queryText.trim()) return;
    setLoading(true);
    try {
      const res = await askModel(queryText, "auto");
      setResult(res);
    } catch {
      // Handled in api fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="live-demo-section" id="live-demo" aria-label="Interactive Demo">
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE PREVIEW</span>
          </div>
          <h2 className="section-title">
            Experience On-Premise Model Auto-Routing
          </h2>
          <p className="section-subtitle">
            Test how the workbench intelligently directs queries to specialized local models while ensuring zero external packets.
          </p>
        </div>

        <div className="demo-card">
          {/* Preset Buttons */}
          <div className="preset-bar">
            <span className="preset-label">Test Refinery Presets:</span>
            <div className="preset-btn-group">
              {PRESET_QUERIES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputQuery(item.query);
                    handleRun(item.query);
                  }}
                  className="preset-pill-btn"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Input Form */}
          <div className="demo-input-container">
            <div className="input-field-wrapper">
              <textarea
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter an industrial query, calculation, or P&D request..."
                rows={3}
                className="demo-textarea"
                aria-label="Prompt Input"
              />
            </div>

            <div className="demo-input-actions">
              <div className="demo-model-indicator">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Router Mode: <strong>Dynamic Autonomous Dispatch</strong></span>
              </div>

              <button
                onClick={() => handleRun()}
                disabled={loading}
                className="demo-run-btn"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Locally...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Air-Gapped Inference</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Output Window */}
          {result && (
            <div className="demo-output-container">
              <div className="demo-output-header">
                <div className="output-status-group">
                  <span className="live-dot"></span>
                  <span className="output-title">LOCAL GPU EXECUTION COMPLETED</span>
                </div>
                <div className="output-stats-row">
                  <span className="stat-chip">
                    <strong>Model:</strong> {result.model_used}
                  </span>
                  <span className="stat-chip">
                    <strong>Latency:</strong> {result.latency_ms} ms
                  </span>
                  <span className="stat-chip security-chip">
                    <strong>Egress:</strong> 0 bytes
                  </span>
                </div>
              </div>

              <div className="demo-reasoning-box">
                <span className="box-tag">ROUTER REASONING:</span>
                <p>{result.reasoning}</p>
              </div>

              <div className="demo-answer-box">
                <span className="box-tag">LOCAL DELIVERABLE OUTPUT:</span>
                <pre className="output-pre">{result.response}</pre>
              </div>
            </div>
          )}

          {/* Call to Launch Full Workbench */}
          <div className="demo-bottom-cta">
            <div className="bottom-cta-text">
              <h4>Ready to test full Python sandboxing, OCR upload, and Word generation?</h4>
              <p>Access the complete sovereign suite with full file I/O and live system telemetry.</p>
            </div>
            <Link to="/workbench" className="btn-launch-full">
              <Terminal className="w-4 h-4" />
              <span>Launch Interactive Workbench</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
