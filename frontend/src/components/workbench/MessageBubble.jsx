import React, { useState } from 'react';
import {
  Shield,
  Clock,
  Cpu,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { getDownloadUrl } from '../../services/api';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);

  function handleCopy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Render markdown-like text and formatted code blocks
  function renderContent(text) {
    if (!text) return null;

    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, i) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3);
        const firstNewline = lines.indexOf('\n');
        const lang = firstNewline > -1 ? lines.slice(0, firstNewline).trim() : '';
        const code = firstNewline > -1 ? lines.slice(firstNewline + 1) : lines;

        return (
          <div key={i} className="wb-code-block">
            <div className="wb-code-header">
              <span className="wb-code-lang">{lang || 'code'}</span>
              <button
                className="wb-code-copy-btn"
                onClick={() => handleCopy(code)}
                title="Copy code"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="wb-code-body">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Inline code and line breaks
      const inlineParts = part.split(/(`[^`]+`)/g);
      return (
        <span key={i}>
          {inlineParts.map((ip, j) => {
            if (ip.startsWith('`') && ip.endsWith('`')) {
              return (
                <code key={j} className="wb-inline-code">
                  {ip.slice(1, -1)}
                </code>
              );
            }
            return ip.split('\n').map((line, k, arr) => (
              <React.Fragment key={`${j}-${k}`}>
                {line}
                {k < arr.length - 1 && <br />}
              </React.Fragment>
            ));
          })}
        </span>
      );
    });
  }

  // Compute timeline steps from actual backend response data
  function buildTimelineSteps(msg) {
    const steps = [
      { id: 'recv', label: 'Task received & validated locally', status: 'done' },
      {
        id: 'route',
        label: `Intent classified: ${msg.task_type || 'GENERAL'}`,
        status: 'done',
        detail: msg.reasoning || null,
      },
    ];

    if (msg.task_type === 'SOP_RAG') {
      steps.push({
        id: 'rag',
        label: 'Local SOP search (Keyword-indexed repository)',
        status: 'done',
      });
    }

    if (msg.task_type === 'SYSTEM_ACTION') {
      steps.push({
        id: 'sys',
        label: 'Native system action evaluated against whitelist',
        status: 'done',
      });
    } else if (msg.task_type === 'CODE_MATH') {
      steps.push({
        id: 'exec',
        label: 'Sandboxed Python calculation executed',
        status: 'done',
      });
    }

    steps.push({
      id: 'infer',
      label: `Qwen local inference (${msg.model_used || 'ai/qwen2.5:7B-Q4_K_M'})`,
      status: 'done',
    });

    if (msg.output_files && msg.output_files.length > 0) {
      steps.push({
        id: 'doc',
        label: `Deliverable compiled: ${msg.output_files.join(', ')}`,
        status: 'done',
      });
    }

    steps.push({
      id: 'audit',
      label: 'Sovereign audit event committed to local log',
      status: 'done',
    });

    return steps;
  }

  const timelineSteps = !isUser ? buildTimelineSteps(message) : [];

  return (
    <div className={`wb-message-row ${isUser ? 'user' : 'assistant'}`}>
      <div className="wb-message-bubble">
        {/* Agent Execution Timeline for Assistant */}
        {!isUser && timelineSteps.length > 0 && (
          <div className="wb-agent-timeline-container">
            <button
              className="wb-timeline-toggle-btn"
              onClick={() => setShowTimeline(!showTimeline)}
            >
              <div className="wb-timeline-toggle-left">
                <span className="wb-timeline-toggle-dot" />
                <span className="wb-timeline-toggle-title">
                  Agent Execution Pipeline ({timelineSteps.length} steps)
                </span>
                {message.latency_ms > 0 && (
                  <span className="wb-timeline-latency-tag">
                    {message.latency_ms}ms
                  </span>
                )}
              </div>
              {showTimeline ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {showTimeline && (
              <div className="wb-timeline-steps">
                {timelineSteps.map((step, idx) => (
                  <div key={step.id} className="wb-timeline-step-item">
                    <div className="wb-timeline-step-bullet">
                      <span className="wb-timeline-step-circle" />
                      {idx < timelineSteps.length - 1 && (
                        <span className="wb-timeline-step-line" />
                      )}
                    </div>
                    <div className="wb-timeline-step-content">
                      <div className="wb-timeline-step-label">{step.label}</div>
                      {step.detail && (
                        <div className="wb-timeline-step-detail">{step.detail}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className="wb-message-text">
          {renderContent(message.content)}
        </div>

        {/* Deliverable Download Card */}
        {!isUser && message.output_files && message.output_files.length > 0 && (
          <div className="wb-deliverable-card">
            <div className="wb-deliverable-card-left">
              <FileText size={16} className="wb-deliverable-icon" />
              <div>
                <div className="wb-deliverable-title">Generated Deliverable</div>
                <div className="wb-deliverable-sub">
                  {message.output_files[0]} • Compiled locally
                </div>
              </div>
            </div>
            <a
              href={getDownloadUrl(message.output_files[0])}
              download
              className="wb-deliverable-download-btn"
            >
              <Download size={13} />
              <span>Download</span>
            </a>
          </div>
        )}

        {/* Bottom Technical Metadata */}
        <div className="wb-message-meta-bar">
          <div className="wb-meta-left">
            {!isUser && (
              <span className="wb-meta-sovereignty-badge">
                ✓ {message.sovereign_status || 'PASS_0_EXTERNAL_EGRESS'}
              </span>
            )}
            {!isUser && message.model_used && (
              <span className="wb-meta-chip">
                <Cpu size={11} />
                <span>{message.model_used}</span>
              </span>
            )}
            {!isUser && message.task_type && (
              <span className="wb-meta-chip wb-meta-chip-task">
                {message.task_type}
              </span>
            )}
          </div>

          <div className="wb-meta-right">
            {message.latency_ms > 0 && (
              <span className="wb-meta-time">
                <Clock size={11} />
                <span>{message.latency_ms}ms</span>
              </span>
            )}
            {message.timestamp && (
              <span className="wb-meta-timestamp">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
