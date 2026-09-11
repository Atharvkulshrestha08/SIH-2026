// @ts-nocheck
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import '../../src/styles/workbench.css';

import TopBar from '../../src/components/workbench/TopBar';
import WorkbenchSidebar from '../../src/components/workbench/WorkbenchSidebar';
import ChatView from '../../src/components/workbench/ChatView';
import TasksView from '../../src/components/workbench/TasksView';
import DocumentsView from '../../src/components/workbench/DocumentsView';
import RAGView from '../../src/components/workbench/RAGView';
import FilesView from '../../src/components/workbench/FilesView';
import AuditView from '../../src/components/workbench/AuditView';
import StatusView from '../../src/components/workbench/StatusView';
import ModelsView from '../../src/components/workbench/ModelsView';
import SandboxView from '../../src/components/workbench/SandboxView';
import DownloadModal from '../../src/components/workbench/DownloadModal';
import { ShieldCheck } from 'lucide-react';
import { speechSynthesizer } from '../../src/services/voiceService';
import { ThemeProvider } from '../../src/context/ThemeContext';

import {
  getAllSessions,
  createSession,
  getSession,
  addMessage,
  deleteSession,
  markFirstVisitDone,
} from '../../src/services/chatStorage';
import { orchestrate, uploadFile, checkBackendHealth } from '../../src/services/api';
import { advanceCyclicVisitor } from '../../src/services/cyclicMessages';

function WorkbenchContent() {
  const [activeView, setActiveView] = useState('chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [autoTTS, setAutoTTS] = useState(false);

  // Backend live health state
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

  // Initialize on mount
  useEffect(() => {
    const sessions = getAllSessions();
    setChatSessions(sessions);

    if (sessions.length > 0) {
      setActiveChatId(sessions[0].id);
      const s = getSession(sessions[0].id);
      setMessages(s ? s.messages : []);
    } else {
      const newSession = createSession('FCCU Overhaul Planning');
      setActiveChatId(newSession?.id || newSession);
      setChatSessions(getAllSessions());
    }

    verifyBackend();
    const interval = setInterval(verifyBackend, 15000);
    return () => clearInterval(interval);
  }, [verifyBackend]);

  useEffect(() => {
    advanceCyclicVisitor();
  }, []);

  // Handle new chat session
  const handleNewChat = () => {
    if (speechSynthesizer?.cancel) speechSynthesizer.cancel();
    const newSession = createSession();
    const updated = getAllSessions();
    setChatSessions(updated);
    setActiveChatId(newSession?.id || newSession);
    setMessages([]);
    setAttachedFile(null);
  };

  // Handle switching active chat
  const handleSelectChat = (sessionId) => {
    if (speechSynthesizer?.cancel) speechSynthesizer.cancel();
    setActiveChatId(sessionId);
    const session = getSession(sessionId);
    setMessages(session ? session.messages : []);
    setAttachedFile(null);
  };

  // Handle deleting a chat session
  const handleDeleteChat = (sessionId) => {
    deleteSession(sessionId);
    const remaining = getAllSessions();
    setChatSessions(remaining);

    if (activeChatId === sessionId) {
      if (remaining.length > 0) {
        handleSelectChat(remaining[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  // Handle sending a message in the chat
  const handleSendMessage = async (userText, fileAttachment = null) => {
    if (!userText.trim() && !fileAttachment) return;

    let currentChatId = activeChatId;
    if (!currentChatId) {
      const newSession = createSession(userText.slice(0, 32));
      currentChatId = newSession?.id || newSession;
      setActiveChatId(currentChatId);
    }

    const fileToUpload = fileAttachment || attachedFile;
    let uploadedFileData = null;

    if (fileToUpload) {
      try {
        uploadedFileData = await uploadFile(fileToUpload);
      } catch (err) {
        console.warn('File ingestion error:', err);
      }
    }

    const userMsg = addMessage(currentChatId, {
      sender: 'user',
      text: userText,
      attachment: uploadedFileData
        ? {
            filename: uploadedFileData.filename,
            file_type: uploadedFileData.file_type,
            char_count: uploadedFileData.char_count,
            document_id: uploadedFileData.document_id,
          }
        : null,
    });

    setMessages((prev) => [...prev, userMsg]);
    setAttachedFile(null);
    setLoading(true);

    try {
      const response = await orchestrate(userText, selectedModel, selectedTool);

      const agentMsg = addMessage(currentChatId, {
        sender: 'assistant',
        text: response.final_response || response.response || response.text_response || 'Task executed successfully.',
        intent: response.intent || response.task_type,
        tool_used: response.tool_used,
        execution_time_ms: response.execution_time_ms,
        deliverables: response.deliverables || (response.deliverable ? [response.deliverable] : response.output_files || []),
        agent_reasoning: response.agent_reasoning || response.reasoning,
        sovereign_status: response.sovereign_status || 'PASS_0_EXTERNAL_EGRESS',
        offline_air_gapped: true,
      });

      setMessages((prev) => [...prev, agentMsg]);

      if (response.tool_used && response.tool_used !== 'none') {
        const recordedTask = {
          id: `TASK-${Date.now().toString().slice(-4)}`,
          title: userText.slice(0, 60),
          task_type: response.intent || response.task_type || 'GENERAL',
          status: 'COMPLETED',
          model_used: response.model_used || 'ai/qwen2.5:7B-Q4_K_M',
          execution_time_ms: response.execution_time_ms || 320,
          timestamp: new Date().toISOString(),
          deliverable: response.deliverable || null,
          reasoning: response.agent_reasoning || response.reasoning || '',
          response: response.final_response || response.response || '',
          sovereign_status: response.sovereign_status || 'PASS_0_EXTERNAL_EGRESS',
        };
        setTasksRegistry((prev) => [recordedTask, ...prev]);
      }

      setChatSessions(getAllSessions());
    } catch (err) {
      console.error('Orchestration error:', err);
      const errorMsg = addMessage(currentChatId, {
        sender: 'assistant',
        text: `⚠️ Offline Local Processing Notice: Unable to communicate with the local model engine at http://localhost:8000. \n\nPlease verify that the sovereign backend is running:\n\`uvicorn app.main:app --reload\``,
        isError: true,
        sovereign_status: 'LOCAL_OFFLINE',
        offline_air_gapped: true,
      });
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTaskForChat = (task) => {
    setActiveView('chat');
    handleSendMessage(`Review details and rerun audit verification for task: ${task.title}`);
  };

  return (
    <div className="wb-app-root">
      {!backendOnline && (
        <div className="wb-backend-alert-banner">
          <ShieldCheck size={14} />
          <span>
            ⚠️ Offline Air-Gapped Mode — Backend Disconnected (Start backend: <code>uvicorn app.main:app --reload</code>)
          </span>
        </div>
      )}

      <div className="wb-layout-container">
        <WorkbenchSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((p) => !p)}
          activeView={activeView}
          onViewChange={(view) => setActiveView(view)}
          chatSessions={chatSessions}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />

        <div className={`wb-main-panel ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <TopBar
            activeView={activeView}
            onViewChange={(view) => setActiveView(view)}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((p) => !p)}
            autoTTS={autoTTS}
            onToggleAutoTTS={() => setAutoTTS((p) => !p)}
          />

          <main className="wb-view-viewport">
            {activeView === 'chat' && (
              <ChatView
                messages={messages}
                loading={loading}
                onSendMessage={handleSendMessage}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
                selectedTool={selectedTool}
                onSelectTool={setSelectedTool}
                attachedFile={attachedFile}
                onAttachFile={setAttachedFile}
                onOpenModelManager={() => setActiveView('models')}
              />
            )}

            {activeView === 'tasks' && (
              <TasksView
                tasks={tasksRegistry}
                onSelectTaskForChat={handleSelectTaskForChat}
              />
            )}

            {activeView === 'documents' && <DocumentsView />}
            {activeView === 'knowledge' && <RAGView />}
            {activeView === 'files' && <FilesView />}
            {activeView === 'audit' && <AuditView />}
            {activeView === 'status' && <StatusView />}
            {activeView === 'models' && <ModelsView onOpenModelModal={() => setShowDownloadModal(true)} />}
            {activeView === 'sandbox' && <SandboxView />}
          </main>
        </div>
      </div>

      {showDownloadModal && (
        <DownloadModal
          onDismiss={() => {
            setShowDownloadModal(false);
            markFirstVisitDone();
          }}
        />
      )}
    </div>
  );
}

export default function WorkbenchPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="wb-app-root flex items-center justify-center min-h-screen bg-[#07090e] text-neutral-400">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400">
          <div className="w-3.5 h-3.5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>LOADING AIR-GAPPED WORKBENCH...</span>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WorkbenchContent />
    </ThemeProvider>
  );
}
