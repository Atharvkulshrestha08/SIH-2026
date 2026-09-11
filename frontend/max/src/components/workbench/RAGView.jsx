import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Tag,
  FileText,
  Copy,
  Check,
  Loader2,
  Shield,
  Layers,
  Info,
} from 'lucide-react';
import { searchRag } from '../../services/api';
import BackendBanner from './BackendBanner';

const PRESET_QUERIES = [
  { label: 'Pump Vibration (API 610)', query: 'pump vibration thresholds' },
  { label: 'Pressure Vessel Thickness (ASME)', query: 'pressure vessel wall thickness' },
  { label: 'CDU Emergency Isolation', query: 'crude distillation unit emergency isolation' },
  { label: 'Mechanical Seal Flush Plans', query: 'mechanical seal flush plan 53B' },
];

export default function RAGView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [backendError, setBackendError] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(searchQuery) {
    const q = searchQuery !== undefined ? searchQuery : query;
    if (!q.trim()) return;

    setLoading(true);
    setBackendError(false);
    setSearched(true);

    try {
      const res = await searchRag(q, 3);
      if (res.ok) {
        setResults(res.results || []);
      } else {
        setBackendError(true);
        setResults([]);
      }
    } catch {
      setBackendError(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleCopyCitation(text, id) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  return (
    <div className="wb-view-page">
      {/* Page Header */}
      <div className="wb-view-header">
        <div>
          <h1 className="wb-view-title">Local Knowledge</h1>
          <p className="wb-view-subtitle">
            Search on-premise SOPs, equipment specifications, and refinery standards with zero external egress.
          </p>
        </div>
        <div className="wb-view-header-badge">
          <Shield size={13} />
          <span>ON-PREMISE SOP RETRIEVER</span>
        </div>
      </div>

      {backendError && (
        <BackendBanner onRetry={() => handleSearch(query)} />
      )}

      {/* Honest Architecture Disclosure Notice */}
      <div className="wb-info-banner">
        <Info size={16} className="wb-info-banner-icon" />
        <div className="wb-info-banner-text">
          <strong>Retriever Architecture:</strong> Currently operating via an on-premise keyword-matching stopgap index over internal MRPL procedures. The interface and backend pipeline are architected for seamless vector retrieval via the local Qdrant instance (port 6333) with zero network egress.
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="wb-rag-search-bar-container">
        <div className="wb-rag-input-wrapper">
          <Search size={16} className="wb-rag-search-icon" />
          <input
            type="text"
            className="wb-rag-input"
            placeholder="Search refinery procedures, standards, pump thresholds, ASME codes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="wb-rag-search-btn"
            onClick={() => handleSearch()}
            disabled={loading}
          >
            {loading ? <Loader2 size={14} className="wb-spin" /> : 'Search SOPs'}
          </button>
        </div>

        {/* Preset Query Chips */}
        <div className="wb-rag-chips-row">
          <span className="wb-rag-chips-label">Preset Queries:</span>
          {PRESET_QUERIES.map((item, idx) => (
            <button
              key={idx}
              className="wb-rag-chip"
              onClick={() => {
                setQuery(item.query);
                handleSearch(item.query);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div className="wb-rag-results-container">
        <div className="wb-rag-results-header">
          <span className="wb-rag-count-text">
            {results.length} SOP Documents Matched
          </span>
          <span className="wb-rag-source-tag">Local Keyword Index</span>
        </div>

        <div className="wb-rag-results-list">
          {results.length === 0 ? (
            <div className="wb-rag-card" style={{ textAlign: 'center', padding: '32px 20px', color: '#78716C' }}>
              <BookOpen size={28} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
              <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: 4 }}>
                {searched ? 'No SOP documents found' : 'Ready to search on-premise knowledge'}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {searched
                  ? 'Try refining your query terms or check that the local vector store is populated.'
                  : 'Enter an engineering query above or choose a preset query to retrieve procedures with zero external network egress.'}
              </div>
            </div>
          ) : (
            results.map((item, idx) => (
            <div key={item.id || idx} className="wb-rag-card">
              <div className="wb-rag-card-header">
                <div className="wb-rag-card-title-group">
                  <span className="wb-rag-id-badge">{item.id || `SOP-00${idx + 1}`}</span>
                  <h3 className="wb-rag-card-title">{item.title}</h3>
                </div>
                <button
                  className="wb-rag-cite-btn"
                  onClick={() =>
                    handleCopyCitation(
                      `[${item.id}] ${item.title}\nSource: ${item.source || 'MRPL Operating Standards'}\n${item.content}`,
                      item.id
                    )
                  }
                  title="Copy citation"
                >
                  {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === item.id ? 'Copied' : 'Cite SOP'}</span>
                </button>
              </div>

              {/* Procedure Content / Passage */}
              <div className="wb-rag-card-body">
                <pre className="wb-rag-content-pre">{item.content}</pre>
              </div>

              {/* Card Footer: Tags & Source */}
              <div className="wb-rag-card-footer">
                <div className="wb-rag-tags">
                  {(item.tags || []).map((t, tidx) => (
                    <span key={tidx} className="wb-rag-tag">
                      <Tag size={10} />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>

                <div className="wb-rag-source-info">
                  <FileText size={12} />
                  <span>{item.source || 'MRPL SOP Manual'}</span>
                </div>
              </div>
            </div>
          )))
        }
        </div>
      </div>
    </div>
  );
}
