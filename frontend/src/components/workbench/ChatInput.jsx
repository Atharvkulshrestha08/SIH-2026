import React, { useState, useRef, useEffect } from 'react';
import {
  Paperclip,
  Wrench,
  Cpu,
  ArrowUp,
  Loader2,
  Shield,
  X,
  FileText,
  ChevronDown,
  Mic,
  MicOff,
} from 'lucide-react';
import { VoiceRecorderVAD } from '../../services/voiceService';

const TOOLS_LIST = [
  { id: 'auto', label: 'Auto (Intent Routing)' },
  { id: 'sop', label: 'SOP Knowledge Search' },
  { id: 'code', label: 'Python Sandbox Calc' },
  { id: 'system_action', label: 'Local System Action' },
  { id: 'memo', label: 'Approval Memo Generator' },
];

export default function ChatInput({
  onSend,
  onFileSelect,
  loading = false,
  attachedFile = null,
  onRemoveFile,
  onOpenModelModal,
  selectedTool = 'auto',
  onSelectTool,
}) {
  const [text, setText] = useState('');
  const [showToolDropdown, setShowToolDropdown] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micStatus, setMicStatus] = useState('');
  const [micVolume, setMicVolume] = useState(0);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const toolDropdownRef = useRef(null);
  const vadRecorderRef = useRef(null);

  // Initialize VAD Recorder
  useEffect(() => {
    vadRecorderRef.current = new VoiceRecorderVAD({
      onTranscription: (transcript, isFinal) => {
        setText(transcript);
        if (isFinal) {
          setMicStatus('Transcribed');
        }
      },
      onVolumeChange: (vol) => setMicVolume(vol),
      onStatusChange: (status) => {
        if (status === 'listening') {
          setIsRecording(true);
          setMicStatus('Listening...');
        } else if (status === 'completed') {
          setIsRecording(false);
          setMicStatus('');
          setMicVolume(0);
        } else if (status === 'cancelled') {
          setIsRecording(false);
          setMicStatus('');
          setMicVolume(0);
        }
      },
      onError: (err) => {
        console.warn('VAD Mic error:', err);
        setIsRecording(false);
        setMicStatus('Mic Error');
      },
    });

    return () => {
      if (vadRecorderRef.current) {
        vadRecorderRef.current.stop(true);
      }
    };
  }, []);

  function toggleRecording() {
    if (isRecording) {
      vadRecorderRef.current?.stop(false);
    } else {
      vadRecorderRef.current?.start();
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
    }
  }, [text]);

  // Click outside to close tool dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (toolDropdownRef.current && !toolDropdownRef.current.contains(e.target)) {
        setShowToolDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSubmit() {
    if (!text.trim() || loading) return;
    onSend(text.trim(), selectedTool);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const currentToolObj = TOOLS_LIST.find((t) => t.id === selectedTool) || TOOLS_LIST[0];

  return (
    <div className="wb-composer-wrapper">
      {/* File Attached Bar */}
      {attachedFile && (
        <div className="wb-composer-attachment-bar">
          <FileText size={13} className="wb-attachment-icon" />
          <span className="wb-attachment-name">{attachedFile.name}</span>
          <span className="wb-attachment-size">
            ({Math.round(attachedFile.size / 1024)} KB - Processed Locally)
          </span>
          <button
            className="wb-attachment-remove-btn"
            onClick={onRemoveFile}
            title="Remove attachment"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Main Composer Box */}
      <div className="wb-composer-box">
        <textarea
          ref={textareaRef}
          className="wb-composer-textarea"
          placeholder="Ask anything, or task an agent..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        {/* Action Controls Bar */}
        <div className="wb-composer-controls">
          <div className="wb-composer-controls-left">
            {/* Attachment Button */}
            <button
              type="button"
              className="wb-composer-tool-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach document for local processing (PDF, DOCX, TXT, XLSX)"
            >
              <Paperclip size={14} />
              <span>Attach</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="wb-file-input-hidden"
              accept=".pdf,.docx,.txt,.py,.csv,.xlsx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onFileSelect(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            {/* Tool / Intent Selector */}
            <div className="wb-tool-dropdown-container" ref={toolDropdownRef}>
              <button
                type="button"
                className="wb-composer-tool-btn"
                onClick={() => setShowToolDropdown(!showToolDropdown)}
                title="Select task router mode"
              >
                <Wrench size={13} />
                <span>{currentToolObj.label}</span>
                <ChevronDown size={12} />
              </button>

              {showToolDropdown && (
                <div className="wb-tool-dropdown-menu">
                  <div className="wb-tool-dropdown-header">TASK ROUTING</div>
                  {TOOLS_LIST.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      className={`wb-tool-dropdown-item ${selectedTool === tool.id ? 'active' : ''}`}
                      onClick={() => {
                        onSelectTool(tool.id);
                        setShowToolDropdown(false);
                      }}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Model Indicator Pill */}
            <button
              type="button"
              className="wb-composer-model-pill"
              onClick={onOpenModelModal}
              title="Local model: ai/qwen2.5:7B-Q4_K_M (4.36 GiB)"
            >
              <Cpu size={12} />
              <span className="wb-model-pill-name">ai/qwen2.5:7B-Q4_K_M</span>
              <span className="wb-model-pill-badge">4.36 GiB</span>
            </button>
          </div>

          {/* Send & Voice Controls */}
          <div className="wb-composer-controls-right">
            {/* Voice Input Button with VAD Energy Indicator */}
            <button
              type="button"
              className={`wb-composer-mic-btn ${isRecording ? 'recording' : ''}`}
              onClick={toggleRecording}
              title={isRecording ? 'Listening (Click to stop / auto-submits on 450ms silence)' : 'Voice Input (Hands-free voice RAG)'}
            >
              {isRecording ? (
                <>
                  <span className="wb-mic-pulse-ring" style={{ transform: `scale(${1 + (micVolume || 10) * 0.01})` }} />
                  <MicOff size={14} className="wb-mic-active-icon" />
                  <span className="wb-mic-status-text">{micStatus || 'Listening...'}</span>
                </>
              ) : (
                <Mic size={15} />
              )}
            </button>

            <button
              type="button"
              className={`wb-composer-send-btn ${loading ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={!text.trim() || loading}
              title="Send task to local model (Enter)"
            >
              {loading ? (
                <Loader2 size={15} className="wb-spin" />
              ) : (
                <ArrowUp size={15} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Security Air-gap Assurance Note */}
      <div className="wb-composer-security-footer">
        <Shield size={12} className="wb-security-icon" />
        <span>Files and prompts stay on the local machine. No cloud AI fallback.</span>
      </div>
    </div>
  );
}
