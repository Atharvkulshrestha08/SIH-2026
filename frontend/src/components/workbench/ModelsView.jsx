import React, { useState } from 'react';
import {
  Cpu,
  HardDrive,
  CheckCircle,
  AlertTriangle,
  Plus,
  Shield,
  Download,
  Terminal,
  Info,
  Layers,
  X,
} from 'lucide-react';

export default function ModelsView({ onOpenModelModal }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedModelForModal, setSelectedModelForModal] = useState(null);

  const modelsCatalog = [
    {
      id: 'ai/qwen2.5:7B-Q4_K_M',
      name: 'ai/qwen2.5:7B-Q4_K_M',
      size: '4.36 GiB',
      params: '7.6 Billion',
      quant: 'Q4_K_M (4-bit)',
      capabilities: 'Engineering Reasoning, SOP RAG, Code & Math, Technical Writing',
      status: 'Installed',
      active: true,
      compatibility: 'Compatible with demo hardware (NVIDIA RTX 3050, 6 GB VRAM)',
      vram_usage: '4.36 GiB / 6.00 GiB (Fits comfortably with 1.64 GiB headroom)',
      offline_status: 'Offline / In-VRAM',
    },
    {
      id: 'qwen2.5-coder:7b-instruct-q4_K_M',
      name: 'qwen2.5-coder:7b-instruct-q4_K_M',
      size: '4.42 GiB',
      params: '7.6 Billion',
      quant: 'Q4_K_M (4-bit)',
      capabilities: 'Industrial Python Scripting, AST Validation, AST Code Repair',
      status: 'Runtime Supported',
      active: false,
      compatibility: 'Compatible with demo hardware (NVIDIA RTX 3050, 6 GB VRAM)',
      vram_usage: '4.42 GiB / 6.00 GiB (Fits 6GB VRAM)',
      offline_status: 'Offline / DMR Local Pull',
    },
    {
      id: 'ai/qwen3.5:latest',
      name: 'ai/qwen3.5:latest',
      size: '22.4 GiB',
      params: '35 Billion',
      quant: 'FP16 / Q8',
      capabilities: 'Complex Multi-step Industrial Logic',
      status: 'Incompatible (Exceeds VRAM)',
      active: false,
      compatibility: 'Requires >= 24GB VRAM (NVIDIA RTX 4090 / A5000)',
      vram_usage: '22.4 GiB (Causes CUDA OOM on 6GB RTX 3050 - Handover §3)',
      offline_status: 'Hardware Incompatible',
    },
    {
      id: 'ai/qwen3-coder:latest',
      name: 'ai/qwen3-coder:latest',
      size: '19.1 GiB',
      params: '30 Billion',
      quant: 'FP16 / Q8',
      capabilities: 'Full Codebase Agentic Refactoring',
      status: 'Incompatible (Exceeds VRAM)',
      active: false,
      compatibility: 'Requires >= 24GB VRAM',
      vram_usage: '19.1 GiB (Causes CUDA OOM on 6GB RTX 3050 - Handover §3)',
      offline_status: 'Hardware Incompatible',
    },
    {
      id: 'qwen3-vl:7b',
      name: 'qwen3-vl:7b (Multimodal Vision)',
      size: '4.80 GiB',
      params: '7 Billion Multimodal',
      quant: 'Q4_K_M',
      capabilities: 'P&ID Schematic OCR, Scanned Drawing & Piping Diagram Analysis',
      status: 'Researched (Planned On-Demand Swap)',
      active: false,
      compatibility: 'Requires on-demand load/unload swap architecture (Handover §8)',
      vram_usage: 'Cannot reside simultaneously with reasoning model on 6GB GPU',
      offline_status: 'Roadmap Extension Point',
    },
  ];

  return (
    <div className="wb-view-page">
      {/* Page Header */}
      <div className="wb-view-header">
        <div>
          <h1 className="wb-view-title">Local Models</h1>
          <p className="wb-view-subtitle">
            Open-weight models running on on-premise workstation GPU. Zero external AI API egress.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="wb-btn-primary"
            onClick={() => {
              setSelectedModelForModal(modelsCatalog[0]);
              setShowModal(true);
            }}
          >
            <Plus size={14} />
            <span>Add / Manage Local Model</span>
          </button>
          <div className="wb-view-header-badge">
            <Shield size={13} />
            <span>AIR-GAPPED INFERENCE</span>
          </div>
        </div>
      </div>

      {/* Hardware Constraint Callout */}
      <div className="wb-info-banner" style={{ marginBottom: 20 }}>
        <Info size={16} className="wb-info-banner-icon text-accent" />
        <div className="wb-info-banner-text">
          <strong>Hardware Baseline (Handover §3):</strong> Workstation is equipped with an{' '}
          <code>NVIDIA GeForce RTX 3050 (6GB VRAM)</code>. Models exceeding 6GB (such as 30B/35B models)
          silently fail with CUDA Out-Of-Memory. Only 7B class models at 4-bit quantization (
          <code>ai/qwen2.5:7B-Q4_K_M</code> at 4.36 GiB) run verified end-to-end.
        </div>
      </div>

      {/* Active Model Hero Card */}
      <div className="wb-card wb-active-model-hero">
        <div className="wb-active-model-header">
          <div className="wb-active-model-title-group">
            <div className="wb-active-model-chip">CURRENT ACTIVE MODEL</div>
            <h2 className="wb-active-model-name">ai/qwen2.5:7B-Q4_K_M</h2>
            <div className="wb-active-model-sub">
              Quantized 4-bit (Q4_K_M) • 7.6 Billion Parameters • Reasoning & General Synthesis
            </div>
          </div>
          <div className="wb-active-model-badge">
            <CheckCircle size={15} className="text-green" />
            <span>Installed & Resident in Local Runtime</span>
          </div>
        </div>

        <div className="wb-active-model-metrics">
          <div className="wb-active-metric">
            <span className="label">MODEL FOOTPRINT</span>
            <span className="val font-mono">4.36 GiB</span>
          </div>
          <div className="wb-active-metric">
            <span className="label">HARDWARE COMPATIBILITY</span>
            <span className="val text-green font-mono">NVIDIA RTX 3050 (6GB VRAM)</span>
          </div>
          <div className="wb-active-metric">
            <span className="label">OFFLINE / AIR-GAP STATUS</span>
            <span className="val text-green font-mono">100% Offline / Zero Egress</span>
          </div>
          <div className="wb-active-metric">
            <span className="label">SERVING RUNTIME</span>
            <span className="val font-mono">Docker Model Runner (DMR)</span>
          </div>
        </div>

        <div className="wb-active-model-footer">
          <div className="wb-active-model-cmd">
            <Terminal size={13} />
            <span>docker model run ai/qwen2.5:7B-Q4_K_M</span>
          </div>
          <button className="wb-btn-secondary" style={{ pointerEvents: 'none', opacity: 0.8 }}>
            ✓ Using Installed Model
          </button>
        </div>
      </div>

      {/* Model Catalog Table */}
      <div className="wb-card" style={{ marginTop: 24 }}>
        <div className="wb-card-header">
          <h2 className="wb-card-title">Available Local Models & Hardware Matrix</h2>
          <span className="wb-card-tag">{modelsCatalog.length} models tracked</span>
        </div>

        <div className="wb-table-wrapper">
          <table className="wb-table">
            <thead>
              <tr>
                <th>MODEL IDENTIFIER</th>
                <th>SIZE</th>
                <th>CAPABILITIES</th>
                <th>INSTALL STATUS</th>
                <th>VRAM & HARDWARE FIT</th>
                <th>OFFLINE STATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {modelsCatalog.map((m) => (
                <tr key={m.id} className="wb-table-row">
                  <td className="wb-table-cell-title">
                    <div className="wb-task-title-text font-mono">{m.name}</div>
                    <div className="wb-task-id">{m.quant}</div>
                  </td>
                  <td>
                    <span className="wb-table-time font-mono">{m.size}</span>
                  </td>
                  <td style={{ maxWidth: 220 }}>
                    <span style={{ fontSize: 12, color: '#aaa' }}>{m.capabilities}</span>
                  </td>
                  <td>
                    <span
                      className={`wb-status-tag ${
                        m.active
                          ? 'completed'
                          : m.status.includes('Incompatible')
                          ? 'denied'
                          : 'pending'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td style={{ maxWidth: 220 }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: m.status.includes('Incompatible') ? '#f87171' : '#4ade80',
                      }}
                    >
                      {m.vram_usage}
                    </span>
                  </td>
                  <td>
                    <span className="wb-sov-check-chip">{m.offline_status}</span>
                  </td>
                  <td>
                    <button
                      className="wb-action-icon-btn"
                      onClick={() => {
                        setSelectedModelForModal(m);
                        setShowModal(true);
                      }}
                      title="Inspect model runtime parameters"
                    >
                      <Info size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Local Model Management Modal */}
      {showModal && (
        <div className="wb-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="wb-model-onboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wb-modal-header">
              <div className="wb-modal-title-group">
                <Cpu size={18} className="text-accent" />
                <h3 className="wb-modal-title">
                  {selectedModelForModal ? selectedModelForModal.name : 'Local Model Runtime'}
                </h3>
              </div>
              <button
                className="wb-drawer-close-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="wb-modal-body">
              <div className="wb-modal-promise-list">
                <div className="wb-promise-item">
                  <CheckCircle size={15} className="text-green" />
                  <span>Runs locally on workstation GPU</span>
                </div>
                <div className="wb-promise-item">
                  <CheckCircle size={15} className="text-green" />
                  <span>Zero external cloud inference or API calls</span>
                </div>
                <div className="wb-promise-item">
                  <CheckCircle size={15} className="text-green" />
                  <span>No external AI API keys required</span>
                </div>
                <div className="wb-promise-item">
                  <CheckCircle size={15} className="text-green" />
                  <span>Model weights remain securely on workstation disk</span>
                </div>
                <div className="wb-promise-item">
                  <CheckCircle size={15} className="text-green" />
                  <span>Hardware compatibility guardrail (6GB VRAM ceiling)</span>
                </div>
              </div>

              <div className="wb-modal-notice-box">
                <div className="wb-notice-title">Local Runtime Architecture</div>
                <p className="wb-notice-text">
                  The AeroSovereign backend intentionally does NOT expose an unauthenticated remote model-download endpoint to prevent unauthorized weight execution and network egress violations.
                </p>
                <p className="wb-notice-text">
                  To load or warm up this model on your workstation, run the local Docker Model Runner command:
                </p>
                <div className="wb-modal-cmd-box">
                  <code>docker model run ai/qwen2.5:7B-Q4_K_M</code>
                </div>
              </div>
            </div>

            <div className="wb-modal-footer">
              <button
                className="wb-btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="wb-btn-primary"
                onClick={() => setShowModal(false)}
              >
                Use Installed Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
