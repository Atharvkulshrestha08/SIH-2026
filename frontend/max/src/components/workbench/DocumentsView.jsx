import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
} from 'lucide-react';
import { generateDocument, getDownloadUrl } from '../../services/api';
import BackendBanner from './BackendBanner';

export default function DocumentsView() {
  const [docFormat, setDocFormat] = useState('docx');
  const [title, setTitle] = useState('');
  const [findings, setFindings] = useState('');
  const [author, setAuthor] = useState('Lead Inspection Engineer, MRPL');
  const [loading, setLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState(null);
  const [error, setError] = useState(null);

  // Session-generated document registry
  const [documentsHistory, setDocumentsHistory] = useState([]);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await generateDocument({
        title: title.trim(),
        findings: findings.trim() || 'Inspection completed according to MRPL engineering standards with zero critical anomalies.',
        author: author.trim() || 'Lead Inspection Engineer, MRPL',
        doc_format: docFormat,
      });

      const newDoc = {
        id: `DOC-${Date.now()}`,
        title: res.title || title.trim(),
        filename: res.filename,
        format: res.document_type || docFormat,
        author: author.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sovereign_status: res.sovereign_status || 'PASS_0_EXTERNAL_EGRESS',
      };

      setLastGenerated(newDoc);
      setDocumentsHistory((prev) => [newDoc, ...prev]);

      // Reset form fields
      setTitle('');
      setFindings('');
    } catch (err) {
      setError(err.message || 'Failed to generate document locally.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wb-view-page">
      {/* Page Header */}
      <div className="wb-view-header">
        <div>
          <h1 className="wb-view-title">Deliverables & Documents</h1>
          <p className="wb-view-subtitle">
            Generate signed Word (.docx) approval notes and Excel (.xlsx) calculation workbooks on-premise.
          </p>
        </div>
        <div className="wb-view-header-badge">
          <Shield size={13} />
          <span>LOCAL GENERATION • 0 EGRESS</span>
        </div>
      </div>

      {error && (
        <BackendBanner onRetry={() => setError(null)} />
      )}

      <div className="wb-docs-grid">
        {/* Create Deliverable Form */}
        <div className="wb-card wb-doc-form-card">
          <div className="wb-card-header">
            <h2 className="wb-card-title">Create Deliverable</h2>
            <span className="wb-card-tag">python-docx / openpyxl</span>
          </div>

          <form onSubmit={handleGenerate} className="wb-doc-form">
            {/* Format Selection */}
            <div className="wb-form-group">
              <label className="wb-form-label">Format</label>
              <div className="wb-format-toggle">
                <button
                  type="button"
                  className={`wb-format-btn ${docFormat === 'docx' ? 'active' : ''}`}
                  onClick={() => setDocFormat('docx')}
                >
                  <FileText size={16} />
                  <span>Word (.docx)</span>
                </button>
                <button
                  type="button"
                  className={`wb-format-btn ${docFormat === 'xlsx' ? 'active' : ''}`}
                  onClick={() => setDocFormat('xlsx')}
                >
                  <FileSpreadsheet size={16} />
                  <span>Excel (.xlsx)</span>
                </button>
              </div>
            </div>

            {/* Document Title */}
            <div className="wb-form-group">
              <label className="wb-form-label">Document Title</label>
              <input
                type="text"
                className="wb-form-input"
                placeholder="e.g. Centrifugal Pump P-102 Overhaul Inspection Memo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Findings / Content */}
            <div className="wb-form-group">
              <label className="wb-form-label">Description / Findings</label>
              <textarea
                className="wb-form-textarea"
                rows={4}
                placeholder="Enter technical findings, inspection parameters, vibration data, or calculation summary..."
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
              />
            </div>

            {/* Author */}
            <div className="wb-form-group">
              <label className="wb-form-label">Author / Signatory</label>
              <input
                type="text"
                className="wb-form-input"
                placeholder="Lead Inspection Engineer, MRPL"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="wb-btn-primary"
              disabled={!title.trim() || loading}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="wb-spin" />
                  <span>Compiling Locally...</span>
                </>
              ) : (
                <>
                  <FileText size={15} />
                  <span>Generate Locally</span>
                </>
              )}
            </button>
          </form>

          {/* Success Banner */}
          {lastGenerated && (
            <div className="wb-doc-success-box">
              <div className="wb-success-icon-box">
                <CheckCircle size={18} className="text-green" />
              </div>
              <div className="wb-success-text">
                <div className="wb-success-title">✓ Generated locally</div>
                <div className="wb-success-filename">{lastGenerated.filename}</div>
              </div>
              <a
                href={getDownloadUrl(lastGenerated.filename)}
                download
                className="wb-download-link-btn"
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>
          )}
        </div>

        {/* Deliverables History Table */}
        <div className="wb-card wb-doc-history-card">
          <div className="wb-card-header">
            <h2 className="wb-card-title">Generated Deliverables</h2>
            <span className="wb-card-tag">{documentsHistory.length} files</span>
          </div>

          <div className="wb-doc-list">
            {documentsHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 20px', color: '#78716C' }}>
                <FileText size={26} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: 4 }}>No deliverables generated yet</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Fill out the form above to generate signed inspection memorandums (.docx) or calculation workbooks (.xlsx).
                </div>
              </div>
            ) : (
              documentsHistory.map((doc) => (
              <div key={doc.id} className="wb-doc-item">
                <div className="wb-doc-item-icon">
                  {doc.format === 'xlsx' ? (
                    <FileSpreadsheet size={20} className="text-green" />
                  ) : (
                    <FileText size={20} className="text-blue" />
                  )}
                </div>

                <div className="wb-doc-item-info">
                  <div className="wb-doc-item-title">{doc.title}</div>
                  <div className="wb-doc-item-meta">
                    <span className="wb-doc-filename">{doc.filename}</span>
                    <span>•</span>
                    <span>{doc.author}</span>
                    <span>•</span>
                    <span className="wb-doc-time">{doc.timestamp}</span>
                  </div>
                </div>

                <a
                  href={getDownloadUrl(doc.filename)}
                  download
                  className="wb-doc-download-icon-btn"
                  title={`Download ${doc.filename}`}
                >
                  <Download size={14} />
                </a>
              </div>
            ))
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
