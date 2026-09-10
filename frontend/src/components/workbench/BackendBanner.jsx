import React from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';
import { BACKEND_HOST } from '../../services/api';

export default function BackendBanner({ onRetry, retrying = false }) {
  return (
    <div className="wb-backend-alert">
      <div className="wb-backend-alert-left">
        <div className="wb-backend-alert-icon">
          <AlertTriangle size={18} />
        </div>
        <div className="wb-backend-alert-content">
          <div className="wb-backend-alert-title">
            Backend Service Unavailable
          </div>
          <div className="wb-backend-alert-desc">
            Unable to reach the local AeroSovereign service at <code>{BACKEND_HOST}</code>.
            Make sure FastAPI is running on your workstation.
          </div>
          <div className="wb-backend-alert-cmd">
            <Terminal size={12} />
            <span>uvicorn app.main:app --reload</span>
          </div>
        </div>
      </div>
      {onRetry && (
        <button
          className="wb-backend-retry-btn"
          onClick={onRetry}
          disabled={retrying}
        >
          <RefreshCw size={13} className={retrying ? 'wb-spin' : ''} />
          <span>{retrying ? 'Connecting...' : 'Retry Connection'}</span>
        </button>
      )}
    </div>
  );
}
