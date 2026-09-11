import React, { useState, useEffect } from 'react';
import { PanelLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { speechSynthesizer } from '../../services/voiceService';

export default function TopBar({
  activeView = 'chat',
  onViewChange,
  sidebarCollapsed = false,
  onToggleSidebar,
  autoTTS = true,
  onToggleAutoTTS,
}) {
  const [activeVoiceName, setActiveVoiceName] = useState('Sweet Female');

  useEffect(() => {
    speechSynthesizer.getVoices().then(() => {
      const voice = speechSynthesizer.findSweetFemaleVoice();
      if (voice) {
        // Clean display name, e.g. "Microsoft Jenny Online (Natural)" -> "Jenny"
        const cleanName = voice.name
          .replace(/Microsoft\s*/i, '')
          .replace(/Google\s*/i, '')
          .replace(/Online\s*\(Natural\)/i, '')
          .replace(/Desktop/i, '')
          .replace(/-.*$/, '')
          .trim();
        setActiveVoiceName(cleanName || 'Sweet Female');
      }
    });
  }, []);

  const handlePreview = (e) => {
    e.stopPropagation();
    speechSynthesizer.preview(
      `Hello! I am MAX. Every answer will be spoken in this natural sweet female voice.`
    );
  };

  return (
    <header className="wb-clean-topbar">
      {/* Left: Sidebar toggle & Brand Title (shown when sidebar is collapsed) */}
      <div className="wb-clean-topbar-left">
        {sidebarCollapsed && (
          <>
            <button
              className="wb-clean-icon-btn"
              onClick={onToggleSidebar}
              title="Open sidebar"
            >
              <PanelLeft size={16} />
            </button>
            <span className="wb-clean-topbar-title">Max AI Workbench</span>
          </>
        )}
      </div>

      {/* Dead-Center: ChatGPT-style segmented toggle pill */}
      <div className="wb-clean-topbar-center">
        <div className="wb-clean-pill-toggle">
          <button
            className={`wb-pill-opt ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => onViewChange('chat')}
          >
            Chat
          </button>
          <button
            className={`wb-pill-opt ${activeView === 'tasks' ? 'active' : ''}`}
            onClick={() => onViewChange('tasks')}
          >
            + Work
          </button>
        </div>
      </div>

      {/* Right: Voice Auto-TTS & Light / Dark Mode Toggle */}
      <div className="wb-clean-topbar-right">
        {onToggleAutoTTS && (
          <div className="wb-topbar-voice-group">
            <button
              type="button"
              className={`wb-topbar-tts-btn ${autoTTS ? 'active' : ''}`}
              onClick={onToggleAutoTTS}
              title={
                autoTTS
                  ? `Auto-Voice Readout: ON (Sweet Female Voice: ${activeVoiceName}). Click to mute.`
                  : 'Auto-Voice Readout: MUTED (Click to enable audio reading)'
              }
            >
              {autoTTS ? <Volume2 size={14} className="wb-tts-active-icon" /> : <VolumeX size={14} />}
              <span className="wb-topbar-tts-label">
                {autoTTS ? `Voice: ${activeVoiceName}` : 'Muted'}
              </span>
            </button>
            {autoTTS && (
              <button
                type="button"
                className="wb-voice-preview-pill"
                onClick={handlePreview}
                title="Click to hear sample voice preview"
              >
                <Sparkles size={11} />
                <span>Sample</span>
              </button>
            )}
          </div>
        )}
        <ThemeToggle size={14} />
      </div>
    </header>
  );
}

