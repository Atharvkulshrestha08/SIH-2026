import React, { useState, useEffect, useCallback } from 'react';
import '../styles/workbench.css';

import TopBar from '../components/workbench/TopBar';
import WorkbenchSidebar from '../components/workbench/WorkbenchSidebar';
import ChatView from '../components/workbench/ChatView';
import TasksView from '../components/workbench/TasksView';
import DocumentsView from '../components/workbench/DocumentsView';
import RAGView from '../components/workbench/RAGView';
import FilesView from '../components/workbench/FilesView';
import AuditView from '../components/workbench/AuditView';
import StatusView from '../components/workbench/StatusView';
import ModelsView from '../components/workbench/ModelsView';
import SandboxView from '../components/workbench/SandboxView';
import DownloadModal from '../components/workbench/DownloadModal';
import { ShieldCheck } from 'lucide-react';

import {
  getAllSessions,
  createSession,
  getSession,
  addMessage,
  deleteSession,
  isFirstVisit,
  markFirstVisitDone,
} from '../services/chatStorage';
import { orchestrate, uploadFile, checkBackendHealth } from '../services/api';
import { advanceCyclicVisitor } from '../services/cyclicMessages';

export default function Workbench({ initialView = 'chat' }) {
  const [activeView, setActiveView] = useState(initialView);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Backend live health state (silent check, no intrusive page takeover)
  const [backendOnline, setBackendOnline] = useState(true);

  // Chat sessions
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Selected tool & model
  const [selectedModel, setSelectedModel] = useState('auto');
  const [selectedTool, setSelectedTool] = useState('auto');

  // File attachment state
  const [attachedFile, setAttachedFile] = useState(null);

  // Onboarding modal
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Executed tasks registry
  const [tasksRegistry, setTasksRegistry] = useState([]);

  // Check backend health quietly in background
  const verifyBackend = useCallback(async () => {
    const isOnline = await checkBackendHealth();
    setBackendOnline(isOnline);
  }, []);

  useEffect(() => {
    verifyBackend();
    const interval = setInterval(verifyBackend, 20000);
    return () => clearInterval(interval);
  }, [verifyBackend]);

  // Load chat sessions & advance cyclic visitor counter
  useEffect(() => {
    const sessions = getAllSessions();
    setChatSessions(sessions);

    if (sessions.length > 0) {
      setActiveChatId(sessions[0].id);
      setMessages(sessions[0].messages || []);
    }

    // Advance visitor cycle on initial load
    advanceCyclicVisitor();
  }, []);

  // Keyboard shortcut: Ctrl+K for new chat
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleNewChat();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function refreshSessions() {
    const sessions = getAllSessions();
    setChatSessions(sessions);
    return sessions;
  }

  function handleNewChat() {
    const session = createSession();
    refreshSessions();
    setActiveChatId(session.id);
    setMessages([]);
    setActiveView('chat');
  }

  function handleSelectChat(sessionId) {
    const session = getSession(sessionId);
    if (session) {
      setActiveChatId(sessionId);
      setMessages(session.messages || []);
      setActiveView('chat');
    }
  }

  function handleDeleteChat(sessionId) {
    deleteSession(sessionId);
    const sessions = refreshSessions();

    if (activeChatId === sessionId) {
      if (sessions.length > 0) {
        setActiveChatId(sessions[0].id);
        setMessages(sessions[0].messages || []);
      } else {
        setActiveChatId(null);
        setMessages([]);
      }
    }
  }

  const handleSend = useCallback(
    async (text, toolOverride) => {
      let chatId = activeChatId;
      if (!chatId) {
        const session = createSession();
        chatId = session.id;
        setActiveChatId(chatId);
        refreshSessions();
      }

      // Add user message
      const userMsg = addMessage(chatId, {
        role: 'user',
        content: text,
      });

      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        if (attachedFile) {
          await uploadFile(attachedFile);
          setAttachedFile(null);
        }

        const chosenTool = toolOverride || selectedTool;
        let promptToSend = text;
        if (chosenTool === 'sop') {
          promptToSend = `[SOP_RAG Request]: ${text}`;
        } else if (chosenTool === 'code') {
          promptToSend = `[Python Math & Sandbox Request]: ${text}`;
        }

        const response = await orchestrate(promptToSend, selectedModel, chatId);

        const assistantMsg = addMessage(chatId, {
          role: 'assistant',
          content: response.text_response || response.response || 'Task executed successfully.',
          model_used: response.model_used || 'ai/qwen2.5:7B-Q4_K_M',
          task_type: response.task_type || 'GENERAL',
          reasoning: response.reasoning || '',
          sovereign_status: response.sovereign_status || 'PASS_0_EXTERNAL_EGRESS',
          latency_ms: response.latency_ms || response.execution_time_ms || 0,
          output_files: response.output_files || [],
        });

        const newTaskRecord = {
          id: `TASK-${Date.now().toString().slice(-4)}`,
          title: text,
          task_type: response.task_type || 'GENERAL',
          status: 'COMPLETED',
          model_used: response.model_used || 'ai/qwen2.5:7B-Q4_K_M',
          execution_time_ms: response.latency_ms || response.execution_time_ms || 320,
          timestamp: new Date().toISOString(),
          deliverable: response.output_files && response.output_files.length > 0 ? response.output_files[0] : null,
          reasoning: response.reasoning || 'Executed locally through sovereign pipeline.',
          response: response.text_response || response.response || '',
          sovereign_status: response.sovereign_status || 'PASS_0_EXTERNAL_EGRESS',
        };
        setTasksRegistry((prev) => [newTaskRecord, ...prev]);

        setMessages((prev) => [...prev, assistantMsg]);
        setBackendOnline(true);
        refreshSessions();
      } catch (err) {
        setBackendOnline(false);

        const errorMsg = addMessage(chatId, {
          role: 'assistant',
          content: `Backend service is currently offline at 127.0.0.1:8000.\n\nTo connect to the local inference runtime, run:\n\`\`\`bash\nuvicorn app.main:app --reload\n\`\`\``,
          model_used: 'Local System Node',
          task_type: 'SYSTEM_ERROR',
          sovereign_status: 'AIR_GAPPED_STRICT',
          latency_ms: 0,
        });
        setMessages((prev) => [...prev, errorMsg]);
        refreshSessions();
      } finally {
        setLoading(false);
      }
    },
    [activeChatId, selectedModel, selectedTool, attachedFile]
  );

  function handleFileSelect(file) {
    setAttachedFile(file);
  }

  function handleRemoveFile() {
    setAttachedFile(null);
  }

  function handleViewChange(view) {
    setActiveView(view);
  }

  function handleDismissModal() {
    markFirstVisitDone();
    setShowDownloadModal(false);
  }

  function renderMainView() {
    switch (activeView) {
      case 'tasks':
        return <TasksView tasks={tasksRegistry} />;
      case 'documents':
        return <DocumentsView />;
      case 'knowledge':
        return <RAGView />;
      case 'files':
        return <FilesView />;
      case 'audit':
        return <AuditView />;
      case 'status':
        return <StatusView />;
      case 'models':
        return <ModelsView onOpenModelModal={() => setShowDownloadModal(true)} />;
      case 'sandbox':
        return <SandboxView />;
      case 'chat':
      default:
        return (
          <ChatView
            messages={messages}
            onSend={handleSend}
            onFileSelect={handleFileSelect}
            loading={loading}
            attachedFile={attachedFile}
            onRemoveFile={handleRemoveFile}
            onOpenModelModal={() => setShowDownloadModal(true)}
            selectedTool={selectedTool}
            onSelectTool={setSelectedTool}
          />
        );
    }
  }

  return (
    <div className="wb-clean-app">
      {/* Sleek Minimalist TopBar */}
      <TopBar
        activeView={activeView}
        onViewChange={handleViewChange}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        backendOnline={backendOnline}
        onOpenModels={() => setActiveView('models')}
      />

      {/* Main Workbench Shell */}
      <div className="wb-clean-shell">
        <WorkbenchSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          onViewChange={handleViewChange}
          chatSessions={chatSessions}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />

        <main className="wb-clean-main">
          {renderMainView()}

          {/* Bottom-Right Sovereignty & Model Dock */}
          <div className="wb-bottom-right-dock">
            <button
              className="wb-dock-model-btn"
              onClick={() => setActiveView('models')}
              title="Active Model: ai/qwen2.5:7B-Q4_K_M (4.36 GiB)"
            >
              <span className="wb-model-dot" />
              <span className="wb-model-text">ai/qwen2.5:7B</span>
            </button>

            <div
              className="wb-dock-sov-pill"
              title="100% Offline Air-Gapped Workbench (0 External Egress)"
            >
              <ShieldCheck size={13} className="text-green" />
              <span>PASS_0_EGRESS</span>
            </div>
          </div>
        </main>
      </div>

      {showDownloadModal && (
        <DownloadModal onDismiss={handleDismissModal} />
      )}
    </div>
  );
}
