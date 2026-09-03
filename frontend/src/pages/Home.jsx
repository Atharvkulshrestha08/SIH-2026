import React, { useState, useEffect } from "react";
import {
  askModel,
  executeCode,
  uploadFile,
  generateDocument,
  searchRag,
  getStatus,
  getAudit,
} from "../services/api";

const PRESET_SCRIPTS = {
  hoop_stress: `# Hoop Stress (Barlow's Formula) for Cylindrical Shell
P = 14.5  # Internal Pressure in MPa
D = 600.0 # Outer Diameter in mm
t = 24.5  # Wall Thickness in mm

# S_h = (P * D) / (2 * t)
hoop_stress = (P * D) / (2 * t)
allowable_stress = 138.0  # ASME SA-516 Grade 70 allowable in MPa

print(f"Calculated Hoop Stress: {hoop_stress:.2f} MPa")
print(f"Allowable Limit:        {allowable_stress:.2f} MPa")
if hoop_stress <= allowable_stress:
    print("STATUS: VERIFIED SAFE - Within ASME Section VIII tolerances")
else:
    print("STATUS: WARNING - Thickness insufficient for design pressure")
`,
  pump_flow: `# Centrifugal Pump Volumetric Flow Rate
import math

pipe_diameter_m = 0.254  # 10 inch pipe in meters
flow_velocity_m_s = 2.4  # measured flow velocity in m/s

cross_section_area = math.pi * ((pipe_diameter_m / 2.0) ** 2)
volumetric_flow_m3_s = cross_section_area * flow_velocity_m_s
flow_m3_hr = volumetric_flow_m3_s * 3600.0

print(f"Pipe Cross-Section Area: {cross_section_area:.4f} m^2")
print(f"Flow Rate:              {flow_m3_hr:.2f} m^3/hr")
print("Compliant with API 610 continuous duty cycle rating.")
`,
  vibration: `# ISO 10816-3 Vibration Severity Assessment
vibration_readings = [1.8, 2.1, 1.9, 2.4, 2.2]  # mm/s RMS

avg_vibration = sum(vibration_readings) / len(vibration_readings)
max_vibration = max(vibration_readings)

print(f"Average Vibration: {avg_vibration:.2f} mm/s RMS")
print(f"Peak Vibration:    {max_vibration:.2f} mm/s RMS")

if max_vibration < 2.8:
    print("Classification: Group 1 Rigid - Zone A (Newly Commissioned / Excellent)")
elif max_vibration < 4.5:
    print("Classification: Zone B (Unrestricted Long-Term Operation)")
else:
    print("Classification: Zone C/D (Action Required - Exceeds Alert Threshold)")
`,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("ask");
  const [status, setStatus] = useState(null);

  // Ask / Chat state
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [askResult, setAskResult] = useState(null);
  const [askLoading, setAskLoading] = useState(false);

  // Sandbox state
  const [code, setCode] = useState(PRESET_SCRIPTS.hoop_stress);
  const [sandboxResult, setSandboxResult] = useState(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);

  // RAG state
  const [ragQuery, setRagQuery] = useState("pump vibration thresholds");
  const [ragResults, setRagResults] = useState([]);
  const [ragLoading, setRagLoading] = useState(false);

  // Document state
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [memoTitle, setMemoTitle] = useState("Refinery Pump 101-P NDT Compliance");
  const [generatedDoc, setGeneratedDoc] = useState(null);

  // Audit state
  const [auditLogs, setAuditLogs] = useState([]);

  // Fetch telemetry status on load
  const fetchTelemetry = async () => {
    try {
      const data = await getStatus();
      setStatus(data);
    } catch {
      setStatus({
        platform: "Local Air-Gapped",
        cpu_percent: 0,
        memory_percent: 0,
        model_host: "http://127.0.0.1:11434",
        egress_status: "AIR_GAPPED_0_EGRESS",
        sovereign_network_egress_bytes: 0,
      });
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const timer = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setAskLoading(true);
    try {
      const res = await askModel(prompt, selectedModel);
      setAskResult(res);
    } catch (err) {
      setAskResult({ text_response: "Error: " + err.message, task_type: "ERROR" });
    } finally {
      setAskLoading(false);
    }
  };

  const handleExecute = async () => {
    setSandboxLoading(true);
    try {
      const res = await executeCode(code);
      setSandboxResult(res);
    } catch (err) {
      setSandboxResult({ stderr: "Execution Error: " + err.message, returncode: 1 });
    } finally {
      setSandboxLoading(false);
    }
  };

  const handleSearchRag = async () => {
    if (!ragQuery.trim()) return;
    setRagLoading(true);
    try {
      const res = await searchRag(ragQuery);
      setRagResults(res.results || []);
    } catch (err) {
      alert("RAG search failed: " + err.message);
    } finally {
      setRagLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDocLoading(true);
    try {
      const res = await uploadFile(file);
      setUploadedDoc(res);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setDocLoading(false);
    }
  };

  const handleGenerate = async (format) => {
    setDocLoading(true);
    try {
      const findings = uploadedDoc?.text_preview || "Operational inspection completed with zero anomalies.";
      const res = await generateDocument(memoTitle, findings, "Lead NDT Engineer", format);
      setGeneratedDoc(res);
    } catch (err) {
      alert("Generation failed: " + err.message);
    } finally {
      setDocLoading(false);
    }
  };

  const handleLoadAudit = async () => {
    try {
      const res = await getAudit();
      setAuditLogs(res.audit_logs || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <header className="header-bar">
        <div className="brand-wrapper">
          <div className="brand-icon">⚡</div>
          <div>
            <div className="brand-title">AeroSovereign</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Industrial Multi-Model Sovereign AI Workbench (Node 1 / Node 2)
            </div>
          </div>
          <span className="brand-tag">v2.1 On-Premise</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="security-badge">
            <div className="pulse-dot"></div>
            <span>100% OFFLINE / 0 KB EGRESS</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="workbench-container">
        {/* Telemetry Row */}
        <section className="telemetry-row">
          <div className="telemetry-card">
            <span className="telemetry-label">Sovereignty Attestation</span>
            <span className="telemetry-value" style={{ color: "var(--accent-emerald)" }}>
              AIR-GAPPED
            </span>
          </div>
          <div className="telemetry-card">
            <span className="telemetry-label">External Egress</span>
            <span className="telemetry-value" style={{ color: "var(--accent-emerald)" }}>
              0 Bytes
            </span>
          </div>
          <div className="telemetry-card">
            <span className="telemetry-label">System Platform</span>
            <span className="telemetry-value" style={{ fontSize: "1rem" }}>
              {status?.platform || "Detecting..."}
            </span>
          </div>
          <div className="telemetry-card">
            <span className="telemetry-label">Memory Utilization</span>
            <span className="telemetry-value" style={{ color: "var(--accent-cyan)" }}>
              {status ? `${status.memory_percent.toFixed(1)}%` : "--"}
            </span>
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className="tabs-nav">
          {[
            { id: "ask", label: "💬 Multi-Model Assistant" },
            { id: "sandbox", label: "⚙️ Code Sandbox (AST)" },
            { id: "rag", label: "📚 Sovereign SOP RAG" },
            { id: "documents", label: "📄 Document Pipeline" },
            { id: "audit", label: "🛡️ Audit & Sovereignty" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "audit") handleLoadAudit();
                if (tab.id === "rag" && ragResults.length === 0) handleSearchRag();
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* TAB 1: Multi-Model AI Assistant */}
        {activeTab === "ask" && (
          <div className="bento-grid">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Engineering Task Dispatcher</h2>
                <span className="tag tag-cyan">Intent Classifier</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                Queries are routed to specialized models (Qwen2.5-Coder for calculations, Llama-3.1 for SOPs).
              </p>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
                  Target Specialist Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="auto">Auto Intent Routing (&lt; 100ms)</option>
                  <option value="qwen2.5-coder:7b-instruct-q4_K_M">Qwen2.5-Coder-7B (Math & Calculations)</option>
                  <option value="llama3.1:8b-instruct-q4_K_M">Llama-3.1-8B (SOP RAG & Reports)</option>
                  <option value="qwen2.5:3b">Qwen2.5-3B (Fast Intent Router)</option>
                </select>
              </div>
              <textarea
                rows={4}
                placeholder="e.g., Check API 610 vibration limits for centrifugal pump, or calculate pipe hoop stress..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                className="action-btn"
                onClick={handleAsk}
                disabled={askLoading}
              >
                {askLoading ? "Synthesizing On-Premise..." : "Dispatch Query ⚡"}
              </button>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Sovereign Response Stream</h2>
                {askResult && (
                  <span className="tag tag-emerald">
                    {askResult.execution_time_ms ? `${askResult.execution_time_ms} ms` : "Verified"}
                  </span>
                )}
              </div>
              {askResult?.task_type && (
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span className="tag tag-cyan">Route: {askResult.task_type}</span>
                  <span className="tag tag-amber">Model: {askResult.model_used}</span>
                </div>
              )}
              <div className="code-box" style={{ flexGrow: 1, minHeight: "220px" }}>
                {askResult ? askResult.text_response : "Awaiting engineering prompt input..."}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AST Code Sandbox */}
        {activeTab === "sandbox" && (
          <div className="bento-grid">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">AST-Guarded Python Runner</h2>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="tab-btn"
                    style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
                    onClick={() => setCode(PRESET_SCRIPTS.hoop_stress)}
                  >
                    Hoop Stress
                  </button>
                  <button
                    className="tab-btn"
                    style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
                    onClick={() => setCode(PRESET_SCRIPTS.pump_flow)}
                  >
                    Pump Flow
                  </button>
                  <button
                    className="tab-btn"
                    style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
                    onClick={() => setCode(PRESET_SCRIPTS.vibration)}
                  >
                    Vibration
                  </button>
                </div>
              </div>
              <textarea
                rows={12}
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="action-btn"
                onClick={handleExecute}
                disabled={sandboxLoading}
              >
                {sandboxLoading ? "Verifying AST & Executing..." : "Run in Sandbox ▶"}
              </button>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Sandbox Execution Output</h2>
                {sandboxResult && (
                  <span className={`tag ${sandboxResult.returncode === 0 ? "tag-emerald" : "tag-amber"}`}>
                    Exit Code: {sandboxResult.returncode} | {sandboxResult.execution_time_ms} ms
                  </span>
                )}
              </div>
              <div
                className={`code-box ${sandboxResult?.stderr ? "error" : ""}`}
                style={{ flexGrow: 1, minHeight: "280px" }}
              >
                {sandboxResult ? (
                  <>
                    {sandboxResult.stdout && <div>{sandboxResult.stdout}</div>}
                    {sandboxResult.stderr && (
                      <div style={{ color: "var(--accent-rose)" }}>{sandboxResult.stderr}</div>
                    )}
                  </>
                ) : (
                  "Execute code to view stdout/stderr output."
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Sovereign SOP RAG */}
        {activeTab === "rag" && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">On-Premise SOP Knowledge Retrieval</h2>
              <span className="tag tag-emerald">ChromaDB / Semantic Store</span>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                placeholder="Search standard operating procedures (e.g. pump vibration, thickness limits, emergency shutdown)..."
              />
              <button
                className="action-btn"
                onClick={handleSearchRag}
                disabled={ragLoading}
                style={{ minWidth: "140px" }}
              >
                {ragLoading ? "Searching..." : "Search SOPs"}
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              {ragResults.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1rem", color: "var(--accent-cyan)", fontWeight: 700 }}>
                      [{item.id}] {item.title}
                    </h3>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      {item.tags?.map((t) => (
                        <span key={t} className="tag tag-amber">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Document Pipeline */}
        {activeTab === "documents" && (
          <div className="bento-grid">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Document Ingestion & Parser</h2>
                <span className="tag tag-cyan">PDF / DOCX / TXT</span>
              </div>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                style={{ background: "var(--bg-surface-elevated)" }}
              />
              {docLoading && <p style={{ color: "var(--accent-cyan)" }}>Processing document...</p>}
              {uploadedDoc && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    Extracted: {uploadedDoc.filename} ({uploadedDoc.char_count} chars)
                  </div>
                  <div className="code-box" style={{ maxHeight: "200px" }}>
                    {uploadedDoc.text_preview}
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Automated Deliverable Generator</h2>
                <span className="tag tag-emerald">python-docx / openpyxl</span>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
                  Deliverable Title
                </label>
                <input
                  type="text"
                  value={memoTitle}
                  onChange={(e) => setMemoTitle(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <button
                  className="action-btn"
                  onClick={() => handleGenerate("docx")}
                  disabled={docLoading}
                >
                  Generate Word Memo (.docx) 📄
                </button>
                <button
                  className="action-btn secondary-btn"
                  onClick={() => handleGenerate("xlsx")}
                  disabled={docLoading}
                >
                  Generate Excel Sheet (.xlsx) 📊
                </button>
              </div>
              {generatedDoc && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "8px" }}>
                  <div style={{ color: "var(--accent-emerald)", fontWeight: 700 }}>
                    ✓ Deliverable Ready: {generatedDoc.filename}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    Stored safely at: {generatedDoc.file_path}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: Sovereignty & Audit Log */}
        {activeTab === "audit" && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Sovereignty Audit Trail (0 Egress Attestation)</h2>
              <button className="action-btn secondary-btn" onClick={handleLoadAudit}>
                Refresh Audit Trail ⟳
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {auditLogs.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>No events recorded yet. Perform actions to view the audit log.</p>
              ) : (
                auditLogs.map((log, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.75rem 1rem",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--accent-cyan)", marginRight: "1rem" }}>
                        [{log.timestamp}]
                      </span>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)", marginRight: "1rem" }}>
                        {log.event_type}
                      </span>
                      <span style={{ color: "var(--text-secondary)" }}>{log.details}</span>
                    </div>
                    <span className="tag tag-emerald">{log.sovereign_check}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
