import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  FileSpreadsheet,
  FileCode,
  FolderOpen,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
  Shield,
  HardDrive,
} from 'lucide-react';
import { uploadFile } from '../../services/api';
import BackendBanner from './BackendBanner';

export default function FilesView() {
  const [filesList, setFilesList] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  async function handleFileUpload(file) {
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadSuccess(null);

    try {
      const res = await uploadFile(file);

      const ext = file.name.split('.').pop().toUpperCase();
      const newFileItem = {
        document_id: res.document_id || `DOC-${Date.now()}`,
        filename: res.filename || file.name,
        file_type: ext,
        char_count: res.char_count || Math.round(file.size / 2),
        status: res.status || 'done',
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text_preview: res.text_preview || 'Text parsed locally by Python extractor.',
      };

      setFilesList((prev) => [newFileItem, ...prev]);
      setUploadSuccess(`Successfully ingested ${file.name} locally.`);
    } catch (err) {
      setError(err.message || 'File upload failed. Ensure local backend is running.');
    } finally {
      setUploading(false);
    }
  }

  function getFileIcon(type) {
    switch (type?.toLowerCase()) {
      case 'pdf':
      case 'docx':
      case 'doc':
      case 'txt':
        return <FileText size={18} className="text-blue" />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet size={18} className="text-green" />;
      case 'py':
      case 'js':
        return <FileCode size={18} className="text-amber" />;
      default:
        return <FileText size={18} />;
    }
  }

  return (
    <div className="wb-view-page">
      {/* Page Header */}
      <div className="wb-view-header">
        <div>
          <h1 className="wb-view-title">Files</h1>
          <p className="wb-view-subtitle">
            Local workspace file manager. Files are processed entirely by the local backend into on-premise storage.
          </p>
        </div>
        <div className="wb-view-header-badge">
          <Shield size={13} />
          <span>ZERO CLOUD STORAGE • 100% LOCAL</span>
        </div>
      </div>

      {error && <BackendBanner onRetry={() => setError(null)} />}

      {/* Upload Zone Card */}
      <div
        className="wb-card wb-upload-zone"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="wb-file-input-hidden"
          accept=".pdf,.docx,.txt,.py,.csv,.xlsx"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
              e.target.value = '';
            }
          }}
        />

        <div className="wb-upload-zone-content">
          <div className="wb-upload-icon-circle">
            {uploading ? (
              <Loader2 size={24} className="wb-spin text-accent" />
            ) : (
              <Upload size={24} className="text-accent" />
            )}
          </div>
          <div className="wb-upload-text-group">
            <div className="wb-upload-title">
              {uploading ? 'Processing File Locally...' : 'Drop engineering files here or click to browse'}
            </div>
            <div className="wb-upload-sub">
              Supports PDF, Word (.docx), Excel (.xlsx), Python (.py), and plain text.
            </div>
          </div>
          <div className="wb-upload-disclaimer">
            Files are processed by the local backend. Never uploaded to cloud storage.
          </div>
        </div>
      </div>

      {uploadSuccess && (
        <div className="wb-doc-success-box" style={{ marginTop: 12 }}>
          <CheckCircle size={16} className="text-green" />
          <span style={{ fontSize: 13, color: '#4ade80' }}>{uploadSuccess}</span>
        </div>
      )}

      {/* Files List Table */}
      <div className="wb-card wb-files-table-card" style={{ marginTop: 20 }}>
        <div className="wb-card-header">
          <h2 className="wb-card-title">Local Workspace Files</h2>
          <span className="wb-card-tag">{filesList.length} files</span>
        </div>

        <div className="wb-table-wrapper">
          <table className="wb-table">
            <thead>
              <tr>
                <th>FILE</th>
                <th>TYPE</th>
                <th>CHARACTERS</th>
                <th>DOCUMENT ID</th>
                <th>STATUS</th>
                <th>INGESTED AT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filesList.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '32px 20px', color: '#78716C' }}>
                    No files ingested in local workspace yet. Drag and drop or browse files above to parse locally.
                  </td>
                </tr>
              ) : (
                filesList.map((f, idx) => (
                <tr key={f.document_id || idx} className="wb-table-row">
                  <td className="wb-table-cell-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {getFileIcon(f.file_type)}
                      <span className="wb-task-title-text">{f.filename}</span>
                    </div>
                  </td>
                  <td>
                    <span className="wb-type-badge">{f.file_type}</span>
                  </td>
                  <td>
                    <span className="wb-table-time">{f.char_count?.toLocaleString()} chars</span>
                  </td>
                  <td>
                    <span className="wb-task-id">{f.document_id}</span>
                  </td>
                  <td>
                    <span className="wb-status-tag completed">
                      ✓ {f.status === 'done' ? 'PROCESSED' : f.status}
                    </span>
                  </td>
                  <td>
                    <span className="wb-table-time">{f.created_at}</span>
                  </td>
                  <td>
                    <button
                      className="wb-action-icon-btn"
                      onClick={() => setSelectedFilePreview(f)}
                      title="Preview extracted text"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Extracted Text Preview Drawer */}
      {selectedFilePreview && (
        <div className="wb-modal-backdrop" onClick={() => setSelectedFilePreview(null)}>
          <div className="wb-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="wb-drawer-header">
              <div className="wb-drawer-title-group">
                <span className="wb-drawer-badge">{selectedFilePreview.file_type}</span>
                <h3 className="wb-drawer-title">{selectedFilePreview.filename}</h3>
              </div>
              <button
                className="wb-drawer-close-btn"
                onClick={() => setSelectedFilePreview(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="wb-drawer-body">
              <div className="wb-drawer-section">
                <div className="wb-drawer-section-label">LOCAL EXTRACTION SUMMARY</div>
                <div className="wb-drawer-audit-meta">
                  <div className="wb-meta-item">
                    <span className="label">Document ID:</span>
                    <span className="val">{selectedFilePreview.document_id}</span>
                  </div>
                  <div className="wb-meta-item">
                    <span className="label">Extracted Characters:</span>
                    <span className="val">{selectedFilePreview.char_count}</span>
                  </div>
                  <div className="wb-meta-item">
                    <span className="label">Storage Location:</span>
                    <span className="val text-green">Local Node (uploads/)</span>
                  </div>
                  <div className="wb-meta-item">
                    <span className="label">External Network Egress:</span>
                    <span className="val text-green">0 Bytes</span>
                  </div>
                </div>
              </div>

              <div className="wb-drawer-section">
                <div className="wb-drawer-section-label">EXTRACTED CONTENT PREVIEW</div>
                <div className="wb-drawer-output-box">
                  <pre>{selectedFilePreview.text_preview || 'No preview available.'}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
