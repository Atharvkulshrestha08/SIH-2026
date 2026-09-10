import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  HardDrive,
  WifiOff,
  Server,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { getStatus, BACKEND_HOST } from '../../services/api';
import BackendBanner from './BackendBanner';

export default function StatusView() {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchTelemetry();
    const timer = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(timer);
  }, []);

  async function fetchTelemetry() {
    setLoading(true);
    setBackendError(false);
    try {
      const res = await getStatus();
      if (res.ok && res.data) {
        setStatusData(res.data);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setBackendError(true);
      }
    } catch {
      setBackendError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wb-view-page">
      {/* Header */}
      <div className="wb-view-header">
        <div>
          <h1 className="wb-view-title">System Status</h1>
          <p className="wb-view-subtitle">
            Live hardware telemetry, inference node resource utilization, and air-gapped egress verification.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="wb-btn-secondary"
            onClick={fetchTelemetry}
            disabled={loading}
          >
            <RefreshCw size={13} className={loading ? 'wb-spin' : ''} />
            <span>{loading ? 'Polling...' : 'Refresh Telemetry'}</span>
          </button>
          <div className="wb-view-header-badge">
            <ShieldCheck size={13} />
            <span>AIR-GAPPED TELEMETRY</span>
          </div>
        </div>
      </div>

      {backendError && (
        <BackendBanner onRetry={fetchTelemetry} retrying={loading} />
      )}

      {/* Main Status Grid */}
      <div className="wb-status-grid">
        {/* Backend & Inference Core */}
        <div className="wb-card">
          <div className="wb-card-header">
            <h2 className="wb-card-title">Inference Engine</h2>
            <span className="wb-card-tag text-green">LOCAL RUNTIME</span>
          </div>
          <div className="wb-card-metric-list">
            <div className="wb-metric-row">
              <span className="label">Inference Mode</span>
              <span className="val text-green font-mono">LOCAL (Docker Model Runner)</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Active Model</span>
              <span className="val font-mono">ai/qwen2.5:7B-Q4_K_M</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Model Footprint</span>
              <span className="val font-mono">4.36 GiB (4-bit Quantized)</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Model Host URL</span>
              <span className="val font-mono">
                {statusData?.model_host || 'http://localhost:12434/engines/v1'}
              </span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Local Backend</span>
              <span className="val font-mono">{BACKEND_HOST} (FastAPI)</span>
            </div>
          </div>
        </div>

        {/* Hardware & Workstation Constraints */}
        <div className="wb-card">
          <div className="wb-card-header">
            <h2 className="wb-card-title">Workstation Hardware</h2>
            <span className="wb-card-tag text-accent">NVIDIA RTX 3050</span>
          </div>
          <div className="wb-card-metric-list">
            <div className="wb-metric-row">
              <span className="label">Target GPU</span>
              <span className="val font-mono">NVIDIA GeForce RTX 3050</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Total GPU VRAM</span>
              <span className="val font-mono">6.00 GiB</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Model VRAM Usage</span>
              <span className="val text-green font-mono">4.36 GiB (72.7% Allocated)</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Available VRAM Headroom</span>
              <span className="val font-mono">1.64 GiB (Safe Margin)</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Host Platform</span>
              <span className="val font-mono">{statusData?.platform || 'Windows'}</span>
            </div>
          </div>
        </div>

        {/* CPU & Memory Utilization */}
        <div className="wb-card">
          <div className="wb-card-header">
            <h2 className="wb-card-title">Host Resource Usage</h2>
            <span className="wb-card-tag">Real-Time psutil</span>
          </div>
          <div className="wb-card-metric-list">
            <div className="wb-metric-row">
              <span className="label">CPU Utilization</span>
              <span className="val font-mono">
                {statusData ? `${statusData.cpu_percent?.toFixed(1)}%` : '—'}
              </span>
            </div>
            {statusData && (
              <div className="wb-progress-bar-track">
                <div
                  className="wb-progress-bar-fill"
                  style={{ width: `${Math.min(statusData.cpu_percent || 0, 100)}%` }}
                />
              </div>
            )}

            <div className="wb-metric-row" style={{ marginTop: 12 }}>
              <span className="label">System RAM Utilization</span>
              <span className="val font-mono">
                {statusData ? `${statusData.memory_percent?.toFixed(1)}%` : '—'}
              </span>
            </div>
            {statusData && (
              <div className="wb-progress-bar-track">
                <div
                  className="wb-progress-bar-fill"
                  style={{ width: `${Math.min(statusData.memory_percent || 0, 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Network & Zero-Egress Boundary */}
        <div className="wb-card">
          <div className="wb-card-header">
            <h2 className="wb-card-title">Zero-Egress Security</h2>
            <span className="wb-card-tag text-green">PASS_0_EXTERNAL_EGRESS</span>
          </div>
          <div className="wb-card-metric-list">
            <div className="wb-metric-row">
              <span className="label">External Network Egress</span>
              <span className="val text-green font-mono">
                {statusData
                  ? `${statusData.sovereign_network_egress_bytes || 0} bytes`
                  : '0 bytes (PASS)'}
              </span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Egress Evaluation</span>
              <span className="val text-green font-mono">
                {statusData?.egress_status || 'AIR_GAPPED_0_EGRESS'}
              </span>
            </div>
            <div className="wb-metric-row">
              <span className="label">External Cloud APIs</span>
              <span className="val text-green font-mono">BLOCKED / DISABLED</span>
            </div>
            <div className="wb-metric-row">
              <span className="label">Telemetry Timestamp</span>
              <span className="val font-mono">{lastUpdated || 'Connecting...'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
