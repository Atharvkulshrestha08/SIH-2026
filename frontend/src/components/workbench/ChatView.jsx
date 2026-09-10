import React, { useRef, useEffect, useState } from 'react';
import {
  Plus,
  ArrowUp,
  Loader2,
  Cpu,
  Shield,
  X,
  FileText,
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getCyclicMessage } from '../../services/cyclicMessages';

export default function ChatView({
  messages = [],
  onSend,
  onFileSelect,
  loading = false,
  attachedFile = null,
  onRemoveFile,
  onOpenModelModal,
  selectedTool,
  onSelectTool,
}) {
  const [inputText, setInputText] = useState('');
  const [cyclicMsg, setCyclicMsg] = useState(() => getCyclicMessage('Atharv'));
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea with smooth stretching
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      const newHeight = Math.max(54, Math.min(ta.scrollHeight, 260));
      ta.style.height = `${newHeight}px`;
    }
  }, [inputText]);

  function handleSubmit() {
    if (!inputText.trim() || loading) return;
    onSend(inputText.trim(), selectedTool);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '54px';
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="wb-chat-clean-container">
      {/* Hidden file input */}
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

      {isEmpty ? (
        /* ChatGPT-style Spacious Minimalist Center Layout */
        <div className="wb-chat-clean-empty-hero">
          {/* Centered Heading */}
          <h1 className="wb-chat-clean-title">{cyclicMsg.heading}</h1>
          <p className="wb-chat-clean-subtitle">{cyclicMsg.subheading}</p>

          {/* Spacious, Stretchable Open Pill Composer */}
          <div className="wb-clean-composer-box open-mode centered">
            {attachedFile && (
              <div className="wb-clean-attached-pill">
                <FileText size={12} />
                <span className="name">{attachedFile.name}</span>
                <button onClick={onRemoveFile} className="remove-btn" title="Remove">
                  <X size={11} />
                </button>
              </div>
            )}

            <div className="wb-clean-composer-row stretchable">
              <button
                className="wb-clean-plus-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Attach file (processed locally)"
              >
                <Plus size={18} />
              </button>

              <textarea
                ref={textareaRef}
                className="wb-clean-textarea open-textarea"
                placeholder={cyclicMsg.hint || "Ask an engineering question, paste code, or request an approval memo..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
              />

              <div className="wb-clean-controls-right">
                <button
                  type="button"
                  className="wb-clean-model-tag"
                  onClick={onOpenModelModal}
                  title="Local Model: ai/qwen2.5:7B-Q4_K_M (4.36 GiB)"
                >
                  <Cpu size={12} />
                  <span>ai/qwen2.5:7B</span>
                </button>

                <button
                  className={`wb-clean-send-btn ${loading ? 'loading' : ''}`}
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || loading}
                  title="Send message"
                >
                  {loading ? (
                    <Loader2 size={16} className="wb-spin" />
                  ) : (
                    <ArrowUp size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="wb-clean-disclaimer">
            <Shield size={11} />
            <span>Air-gapped on-premise workbench • 0 external egress</span>
          </div>
        </div>
      ) : (
        /* Conversation Mode */
        <div className="wb-chat-clean-convo">
          <div className="wb-messages-scroll-area">
            <div className="wb-messages-container">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {loading && (
                <div className="wb-message-row assistant">
                  <div className="wb-message-bubble wb-typing-bubble">
                    <div className="wb-typing-header">
                      <Cpu size={13} className="wb-spin" />
                      <span>Reasoning locally on NVIDIA RTX 3050...</span>
                    </div>
                    <div className="wb-typing-dots">
                      <span className="wb-dot" />
                      <span className="wb-dot" />
                      <span className="wb-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Bottom Fixed Open Composer */}
          <div className="wb-clean-bottom-composer-wrap">
            <div className="wb-clean-composer-box open-mode">
              {attachedFile && (
                <div className="wb-clean-attached-pill">
                  <FileText size={12} />
                  <span className="name">{attachedFile.name}</span>
                  <button onClick={onRemoveFile} className="remove-btn">
                    <X size={11} />
                  </button>
                </div>
              )}

              <div className="wb-clean-composer-row stretchable">
                <button
                  className="wb-clean-plus-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                >
                  <Plus size={18} />
                </button>

                <textarea
                  ref={textareaRef}
                  className="wb-clean-textarea open-textarea"
                  placeholder="Ask anything..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                />

                <div className="wb-clean-controls-right">
                  <button
                    type="button"
                    className="wb-clean-model-tag"
                    onClick={onOpenModelModal}
                    title="ai/qwen2.5:7B-Q4_K_M"
                  >
                    <Cpu size={12} />
                    <span>ai/qwen2.5:7B</span>
                  </button>

                  <button
                    className={`wb-clean-send-btn ${loading ? 'loading' : ''}`}
                    onClick={handleSubmit}
                    disabled={!inputText.trim() || loading}
                  >
                    {loading ? (
                      <Loader2 size={16} className="wb-spin" />
                    ) : (
                      <ArrowUp size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="wb-clean-disclaimer">
              <Shield size={11} />
              <span>Air-gapped on-premise workbench • 0 external egress</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
