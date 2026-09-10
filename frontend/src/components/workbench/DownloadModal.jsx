import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Cpu,
  HardDrive,
  CheckCircle,
  Terminal,
  Server,
} from 'lucide-react';

export default function DownloadModal({ onDismiss }) {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="wb-modal-overlay">
      <div className="wb-modal">
        <div className="wb-modal-icon">🛡️</div>
        <h2 className="wb-modal-title">AeroSovereign Local Runtime</h2>
        <p className="wb-modal-desc">
          Air-gapped on-premise AI environment configured for Mangalore Refinery and Petrochemicals Limited (MRPL).
        </p>

        {/* Technical Checklist */}
        <div className="wb-modal-features">
          <div className="wb-modal-feature">
            <CheckCircle size={16} className="text-green" />
            <span>Runs locally on workstation GPU</span>
          </div>
          <div className="wb-modal-feature">
            <CheckCircle size={16} className="text-green" />
            <span>No cloud inference — 0 KB external AI egress</span>
          </div>
          <div className="wb-modal-feature">
            <CheckCircle size={16} className="text-green" />
            <span>No external AI API keys or hosted fallbacks</span>
          </div>
          <div className="wb-modal-feature">
            <CheckCircle size={16} className="text-green" />
            <span>Model weights remain on local workstation disk</span>
          </div>
          <div className="wb-modal-feature">
            <CheckCircle size={16} className="text-green" />
            <span>Hardware compatibility check: NVIDIA RTX 3050 (6GB VRAM)</span>
          </div>
        </div>

        {/* Runtime Model Details */}
        <div className="wb-modal-specs-box">
          <div className="wb-spec-row">
            <span className="label">Confirmed Active Model:</span>
            <span className="val font-mono">ai/qwen2.5:7B-Q4_K_M</span>
          </div>
          <div className="wb-spec-row">
            <span className="label">Model Footprint:</span>
            <span className="val font-mono">4.36 GiB (In-VRAM)</span>
          </div>
          <div className="wb-spec-row">
            <span className="label">Runtime Container:</span>
            <span className="val font-mono">Docker Model Runner</span>
          </div>
        </div>

        <div className="wb-modal-notice-text">
          Model installation and lifecycle are handled by the local runtime. Remote model downloads are intentionally omitted to maintain strict air-gap compliance.
        </div>

        <button
          className="wb-modal-btn"
          onClick={onDismiss}
          disabled={!verified}
        >
          <CheckCircle size={15} />
          <span>Use Installed Model & Enter Workbench</span>
        </button>
      </div>
    </div>
  );
}
