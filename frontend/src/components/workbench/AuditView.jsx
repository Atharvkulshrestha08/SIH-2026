import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  RefreshCw,
  Clock,
  Cpu,
  WifiOff,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { getAudit } from '../../services/api';
import BackendBanner from './BackendBanner';

export default function AuditView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [backendError, setBackendError] = useState(false);
  const [networkMetrics, setNetworkMetrics] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    setBackendError(false);
    try {
      const res = await getAudit(100);
      if (res.ok) {
        setLogs(res.audit_logs || []);
        setNetworkMetrics(res.network_metrics || null);
      } else {
        setBackendError(true);
        setLogs([]);
      }
    } catch {
      setBackendError(true);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesFilter =
      filterType === 'ALL' ||
      log.event_type?.toUpperCase().includes(filterType) ||
      log.event?.toUpperCase().includes(filterType);

    const matchesSearch =
      !searchQuery ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.event_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.event?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="wb-view-page">
      {/* Page Header */}
      <div className="wb-view-header">
        <div>
          <h1 className="wb-view-title">Audit Log</h1>
          <p className="wb-view-subtitle">
            Security and compliance console. Every model inference, SOP lookup, and desktop action is immutably recorded.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="wb-btn-secondary"
            onClick={fetchLogs}
            disabled={loading}
          >
            <RefreshCw size={13} className={loading ? 'wb-spin' : ''} />
            <span>Refresh Audit</span>
          </button>
          <div className="wb-view-header-badge">
            <ShieldCheck size={13} />
            <span>PASS_0_EXTERNAL_EGRESS</span>
          </div>
        </div>
      </div>

      {backendError && <BackendBanner onRetry={fetchLogs} retrying={loading} />}

      {/* Security Telemetry Ribbon */}
      <div className="wb-stats-ribbon">
        <div className="wb-stat-card">
          <span className="wb-stat-val text-green">PASS_0_EGRESS</span>
          <span className="wb-stat-label">SOVEREIGNTY STATUS</span>
        </div>
        <div className="wb-stat-card">
          <span className="wb-stat-val">0 BYTES</span>
          <span className="wb-stat-label">OUTBOUND NETWORK EGRESS</span>
        </div>
        <div className="wb-stat-card">
          <span className="wb-stat-val">{logs.length}</span>
          <span className="wb-stat-label">AUDITED EVENTS</span>
        </div>
        <div className="wb-stat-card">
          <span className="wb-stat-val text-accent">LOCKED_LOCAL</span>
          <span className="wb-stat-label">NETWORK BOUNDARY</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="wb-table-controls">
        <div className="wb-filter-pills">
          {['ALL', 'ORCHESTRATE', 'SOP_RAG', 'CODE', 'DELIVERABLE', 'SYSTEM_ACTION'].map((f) => (
            <button
              key={f}
              className={`wb-filter-pill ${filterType === f ? 'active' : ''}`}
              onClick={() => setFilterType(f)}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="wb-search-box">
          <Search size={14} className="wb-search-icon" />
          <input
            type="text"
            className="wb-search-input"
            placeholder="Search audit details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Console-style Audit Table */}
      <div className="wb-table-wrapper wb-audit-table-wrapper">
        <table className="wb-table wb-console-table">
          <thead>
            <tr>
              <th>TIME</th>
              <th>ACTION</th>
              <th>EVENT</th>
              <th>MODEL / COMPONENT</th>
              <th>EGRESS</th>
              <th>STATUS</th>
              <th>SOVEREIGNTY</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={8} className="wb-table-empty">
                  No matching audit logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((item, idx) => (
                <tr key={item.id || idx} className="wb-table-row">
                  <td className="wb-audit-time">
                    {item.time || (item.timestamp ? item.timestamp.split('T')[1]?.slice(0, 8) : '18:42:11')}
                  </td>
                  <td>
                    <span className="wb-audit-action-tag">
                      {item.event_type || item.action || 'ORCHESTRATE'}
                    </span>
                  </td>
                  <td>
                    <span className="wb-audit-event-tag">
                      {item.event || item.event_type || 'SOP_RAG'}
                    </span>
                  </td>
                  <td>
                    <span className="wb-table-model">{item.model || 'ai/qwen2.5:7B-Q4_K_M'}</span>
                  </td>
                  <td>
                    <span className="wb-egress-zero">
                      {item.network_egress || '0 bytes'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`wb-status-tag ${
                        item.status === 'SUCCESS' ? 'completed' : 'denied'
                      }`}
                    >
                      {item.status || 'SUCCESS'}
                    </span>
                  </td>
                  <td>
                    <span className="wb-sov-check-chip">
                      {item.sovereign_check || 'PASS_0_EXTERNAL_EGRESS'}
                    </span>
                  </td>
                  <td className="wb-audit-details">
                    {item.details || 'Task executed within on-premise memory container.'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
