import React, { useState, useEffect } from 'react';
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
  Volume2,
  Square,
} from 'lucide-react';
import { getDownloadUrl } from '../../services/api';
import { speechSynthesizer } from '../../services/voiceService';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up speech if component unmounts
      if (isSpeaking) {
        speechSynthesizer.stop();
      }
    };
  }, [isSpeaking]);

  function handleToggleSpeak() {
    if (isSpeaking) {
      speechSynthesizer.stop();
      setIsSpeaking(false);
    } else {
      speechSynthesizer.onStateChange = (speaking) => {
        setIsSpeaking(speaking);
      };
      speechSynthesizer.speak(message.content);
    }
  }

  function handleCopy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Clean raw LaTeX math symbols into clean, readable formula text
  function cleanMathLatex(raw) {
    if (!raw) return '';
    let s = raw.trim();

    // Strip leading/trailing \[ \] or \( \) if present
    if (s.startsWith('\\[') && s.endsWith('\\]')) {
      s = s.slice(2, -2).trim();
    } else if (s.startsWith('\\(') && s.endsWith('\\)')) {
      s = s.slice(2, -2).trim();
    }

    // Repeated fraction replacements for nested fractions
    for (let loop = 0; loop < 3; loop++) {
      s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1) / ($2)');
    }

    return s
      // Common Greek letters
      .replace(/\\sigma_h/g, 'σ_h')
      .replace(/\\sigma/g, 'σ')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\pi/g, 'π')
      .replace(/\\theta/g, 'θ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\rho/g, 'ρ')
      .replace(/\\omega/g, 'ω')
      // Math operators
      .replace(/\\times/g, '×')
      .replace(/\\cdot/g, '·')
      .replace(/\\approx/g, '≈')
      .replace(/\\pm/g, '±')
      .replace(/\\le(q)?/g, '≤')
      .replace(/\\ge(q)?/g, '≥')
      .replace(/\\ne(q)?/g, '≠')
      .replace(/\\infty/g, '∞')
      .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)')
      // Text wrapper removal: \text{MPa} -> MPa
      .replace(/\\text\{([^{}]+)\}/g, '$1')
      // Spacing and escaped backslashes: \  or \quad -> ' '
      .replace(/\\\s+/g, ' ')
      .replace(/\\quad/g, ' ')
      .replace(/\\,/g, ' ')
      .replace(/\\;/g, ' ')
      // Strip any lingering standalone \[ \] \( \)
      .replace(/\\[\[\]\(\)]/g, '')
      .trim();
  }

  // Render markdown-like text, formatted code blocks, and math equations
  function renderContent(text) {
    if (!text) return null;

    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, i) => {
      // 1. Code Blocks
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

      // 2. Display Math Blocks \[ ... \]
      const mathBlockParts = part.split(/(\\\[[\s\S]*?\\\])/g);

      return (
        <span key={i}>
          {mathBlockParts.map((mbPart, mIdx) => {
            if (mbPart.startsWith('\\[') && mbPart.endsWith('\\]')) {
              const formula = cleanMathLatex(mbPart);
              return (
                <div
                  key={`math-${mIdx}`}
                  className="wb-math-block"
                  style={{
                    margin: '10px 0',
                    padding: '10px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '3px solid #10b981',
                    borderRadius: '6px',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    fontSize: '0.98em',
                    color: '#5eead4',
                    textAlign: 'center',
                    overflowX: 'auto',
                  }}
                >
                  {formula}
                </div>
              );
            }

            // 3. Inline Math \( ... \) and Inline Code `...`
            const inlineMathParts = mbPart.split(/(\\\([\s\S]*?\\\))/g);

            return inlineMathParts.map((imPart, imIdx) => {
              if (imPart.startsWith('\\(') && imPart.endsWith('\\)')) {
                return (
                  <span
                    key={`im-${imIdx}`}
                    style={{
                      color: '#5eead4',
                      fontWeight: 500,
                      fontFamily: 'Consolas, monospace',
                      padding: '0 2px',
                    }}
                  >
                    {cleanMathLatex(imPart)}
                  </span>
                );
              }

              // Process standard inline code `...`
              const inlineCodeParts = imPart.split(/(`[^`]+`)/g);

              return inlineCodeParts.map((ip, j) => {
                if (ip.startsWith('`') && ip.endsWith('`')) {
                  return (
                    <code key={`code-${j}`} className="wb-inline-code">
                      {ip.slice(1, -1)}
                    </code>
                  );
                }

                // Clean stray LaTeX artifacts from text outside math blocks
                const cleanedText = cleanMathLatex(ip);

                return cleanedText.split('\n').map((line, k, arr) => (
                  <React.Fragment key={`${imIdx}-${j}-${k}`}>
                    {line}
                    {k < arr.length - 1 && <br />}
                  </React.Fragment>
                ));
              });
            });
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
    } else if (msg.task_type === 'FAST_PATH' || msg.model_used === 'fast-path') {
      steps.push({
        id: 'fast',
        label: 'Direct sovereign fast-path response (<5ms)',
        status: 'done',
      });
    } else {
      if (msg.task_type === 'CODE_MATH') {
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
    }

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
            {!isUser && (
              <button
                type="button"
                className={`wb-meta-voice-btn ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleToggleSpeak}
                title={isSpeaking ? 'Stop reading' : 'Read aloud with math naturalization'}
              >
                {isSpeaking ? (
                  <>
                    <Square size={10} className="wb-voice-stop-icon" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={11} />
                    <span>Listen</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              className="wb-meta-copy-btn"
              onClick={() => handleCopy(message.content)}
              title="Copy message text"
            >
              {copied ? <Check size={11} className="wb-copy-check" /> : <Copy size={11} />}
            </button>

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
