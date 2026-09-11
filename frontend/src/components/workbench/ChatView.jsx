import React, { useRef, useEffect, useState } from 'react';
import {
  Plus,
  ArrowUp,
  Loader2,
  Cpu,
  Shield,
  X,
  FileText,
  Mic,
  MicOff,
  Brain,
  AudioLines,
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getCyclicMessage } from '../../services/cyclicMessages';
import { VoiceRecorderVAD } from '../../services/voiceService';

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
  const [inputText, setInputText] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('prompt');
      return p ? decodeURIComponent(p) : '';
    } catch {
      return '';
    }
  });
  const [cyclicMsg, setCyclicMsg] = useState(() => getCyclicMessage());
  const [isRecording, setIsRecording] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micStatus, setMicStatus] = useState('');
  const [thinkMode, setThinkMode] = useState(false);
  const [voiceAutoSend, setVoiceAutoSend] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const vadRecorderRef = useRef(null);
  const voiceAutoSendRef = useRef(false);

  const latestTranscriptRef = useRef('');

  useEffect(() => {
    voiceAutoSendRef.current = voiceAutoSend;
  }, [voiceAutoSend]);

  useEffect(() => {
    vadRecorderRef.current = new VoiceRecorderVAD({
      onTranscription: (transcript, isFinal) => {
        latestTranscriptRef.current = transcript;
        setInputText(transcript);
        if (isFinal) {
          setMicStatus('Transcribed');
        } else {
          setMicStatus('Listening...');
        }
      },
      onVolumeChange: (vol) => setMicVolume(vol),
      onStatusChange: (status) => {
        if (status === 'listening') {
          setIsRecording(true);
          setMicStatus('Listening... Speak now');
        } else if (status === 'transcribing') {
          setMicStatus('Transcribing your speech...');
        } else if (status === 'completed' || status === 'cancelled') {
          setIsRecording(false);
          setMicStatus('');
          setMicVolume(0);
          // If in Voice Query Auto-send mode and words were spoken, auto-submit
          if (voiceAutoSendRef.current) {
            setVoiceAutoSend(false);
            const toSend = latestTranscriptRef.current || inputText;
            if (toSend && toSend.trim()) {
              handleSubmit(toSend.trim());
            }
          }
        }
      },
      onError: (err) => {
        console.warn('Voice error:', err);
        setIsRecording(false);
        setMicStatus(err || 'Microphone Error');
        setVoiceAutoSend(false);
        setTimeout(() => setMicStatus(''), 5000);
      },
    });

    return () => {
      vadRecorderRef.current?.stop(true);
    };
  }, []);

  function toggleRecording(autoSend = false) {
    if (isRecording) {
      setVoiceAutoSend(false);
      vadRecorderRef.current?.stop(false);
    } else {
      setVoiceAutoSend(autoSend);
      vadRecorderRef.current?.start(inputText);
    }
  }

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

  function handleSubmit(overrideText = null) {
    const textToSend = (overrideText !== null ? overrideText : inputText).trim();
    if (!textToSend || loading) return;

    let finalPrompt = textToSend;
    if (thinkMode) {
      finalPrompt = `[Deep Think Mode: Provide a rigorous, step-by-step engineering calculation and analytical derivation with all intermediate substitutions]\n\n${textToSend}`;
    }

    onSend(finalPrompt, selectedTool);
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

  function renderComposer(centered = false) {
    const hasText = !!inputText.trim();

    return (
      <div className={`wb-clean-composer-box open-mode ${centered ? 'centered' : ''}`}>
        {attachedFile && (
          <div className="wb-clean-attached-pill">
            <FileText size={12} />
            <span className="name">{attachedFile.name}</span>
            <button onClick={onRemoveFile} className="remove-btn" title="Remove attachment">
              <X size={11} />
            </button>
          </div>
        )}

        {/* Live speech feedback banner */}
        {(isRecording || (micStatus && micStatus !== 'Transcribed')) && (
          <div className={`wb-clean-recording-status-bar ${!isRecording ? 'completed' : ''}`}>
            <span className={`wb-recording-live-dot ${!isRecording ? 'static' : ''}`} />
            <span className="wb-recording-status-text">
              {micStatus || 'Listening... Speak your query'}
            </span>
            {isRecording ? (
              <>
                <div className="wb-recording-sound-waves" aria-hidden="true">
                  <span style={{ height: `${Math.max(4, Math.min(18, (micVolume || 10) * 0.4))}px` }} />
                  <span style={{ height: `${Math.max(6, Math.min(22, (micVolume || 15) * 0.6))}px` }} />
                  <span style={{ height: `${Math.max(8, Math.min(26, (micVolume || 20) * 0.8))}px` }} />
                  <span style={{ height: `${Math.max(6, Math.min(22, (micVolume || 15) * 0.6))}px` }} />
                  <span style={{ height: `${Math.max(4, Math.min(18, (micVolume || 10) * 0.4))}px` }} />
                </div>
                <button
                  type="button"
                  className="wb-recording-done-btn"
                  onClick={() => toggleRecording(false)}
                >
                  Done speaking
                </button>
              </>
            ) : null}
          </div>
        )}

        <div className="wb-clean-composer-row stretchable">
          {/* Plus icon on the left (matches screenshot) */}
          <button
            type="button"
            className="wb-clean-plus-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Attach file (PDF, DOCX, TXT, CSV, Python)"
          >
            <Plus size={18} />
          </button>

          {/* Center input textarea with "Ask anything" placeholder */}
          <textarea
            ref={textareaRef}
            className="wb-clean-textarea open-textarea"
            placeholder={centered ? (cyclicMsg.hint || "Ask anything...") : "Ask anything..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          {/* Right-side controls matching screenshot */}
          <div className="wb-clean-controls-right">
            {/* Think Pill Button */}
            <button
              type="button"
              className={`wb-clean-think-btn ${thinkMode ? 'active' : ''}`}
              onClick={() => setThinkMode(!thinkMode)}
              title={thinkMode ? "Deep Reasoning enabled: Step-by-step verified derivation" : "Think: Enable step-by-step reasoning"}
            >
              <Brain size={14} className={thinkMode ? "wb-brain-active" : "wb-brain-icon"} />
              <span>Think</span>
            </button>

            {/* Microphone Button (Speech to Text) */}
            <button
              type="button"
              className={`wb-clean-mic-btn ${isRecording ? 'recording' : ''}`}
              onClick={() => toggleRecording(false)}
              title={isRecording ? 'Listening... Click to stop dictation' : 'Speak to dictate query (Voice-to-Text)'}
            >
              {isRecording ? (
                <>
                  <span className="wb-mic-wave-pulse" style={{ transform: `scale(${1 + (micVolume || 15) * 0.02})` }} />
                  <MicOff size={16} className="wb-mic-recording-icon" />
                </>
              ) : (
                <Mic size={16} />
              )}
            </button>

            {/* Blue Circular Action Button (Waveform / Send) */}
            <button
              type="button"
              className={`wb-clean-action-circle ${hasText ? 'send-mode' : 'voice-mode'} ${loading ? 'loading' : ''}`}
              onClick={() => {
                if (loading) return;
                if (hasText) {
                  handleSubmit();
                } else {
                  // If empty, clicking blue button starts Voice Query Mode (speaks -> auto-sends to LLM)
                  toggleRecording(true);
                }
              }}
              disabled={loading}
              title={
                loading
                  ? 'Generating response...'
                  : hasText
                  ? 'Send query to LLM (Enter)'
                  : isRecording
                  ? 'Stop speaking and send'
                  : 'Start voice query (Speaks query and auto-sends to LLM)'
              }
            >
              {loading ? (
                <Loader2 size={16} className="wb-spin" />
              ) : hasText ? (
                <ArrowUp size={16} />
              ) : (
                <AudioLines size={16} className={isRecording ? 'wb-active-wave' : ''} />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Centered Pill Composer */}
          {renderComposer(true)}

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
            {renderComposer(false)}

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
