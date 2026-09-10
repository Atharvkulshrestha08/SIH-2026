import React from 'react';
import {
  SquarePen,
  FileText,
  BookOpen,
  FolderOpen,
  Shield,
  Activity,
  Cpu,
  Terminal,
  Trash2,
  PanelLeftClose,
  Search,
  CheckSquare,
  Lock,
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'tasks', label: 'Tasks & Projects', icon: CheckSquare },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'files', label: 'Workspace Files', icon: FolderOpen },
  { id: 'sandbox', label: 'Code Sandbox', icon: Terminal },
  { id: 'audit', label: 'Audit Log', icon: Shield },
  { id: 'status', label: 'System Status', icon: Activity },
  { id: 'models', label: 'Local Models', icon: Cpu },
];

export default function WorkbenchSidebar({
  collapsed,
  onToggle,
  activeView,
  onViewChange,
  chatSessions = [],
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) {
  return (
    <aside className={`wb-clean-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Top Brand & Collapse Icon */}
      <div className="wb-clean-sidebar-header">
        <div className="wb-clean-brand">
          <span className="wb-clean-brand-name">Max AI Workbench</span>
        </div>
        <div className="wb-clean-header-actions">
          <button
            className="wb-clean-icon-btn"
            onClick={onToggle}
            title="Collapse sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="wb-clean-new-chat-wrap">
        <button className="wb-clean-new-chat-btn" onClick={onNewChat}>
          <SquarePen size={15} />
          <span>New chat</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="wb-clean-nav-list">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`wb-clean-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={16} className="wb-clean-nav-icon" />
              <span className="wb-clean-nav-label">{item.label}</span>
            </button>
          );
        })}

        {/* Recents Section */}
        <div className="wb-clean-recents-section">
          <div className="wb-clean-recents-header">Recents</div>
          <div className="wb-clean-recents-list">
            {chatSessions.length === 0 ? (
              <div className="wb-clean-no-recents">No recent chats</div>
            ) : (
              chatSessions.map((s) => (
                <div
                  key={s.id}
                  className={`wb-clean-recent-item ${
                    activeView === 'chat' && activeChatId === s.id ? 'active' : ''
                  }`}
                  onClick={() => onSelectChat(s.id)}
                >
                  <span className="wb-recent-title">{s.title || 'Untitled conversation'}</span>
                  <button
                    className="wb-recent-del-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(s.id);
                    }}
                    title="Delete chat"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Offline Terminal Indicator (Air-Gapped / No Online Auth) */}
      <div className="wb-clean-sidebar-footer">
        <div className="wb-clean-station-badge" title="100% Offline • Air-Gapped Station • Zero Egress">
          <div className="wb-clean-station-icon-wrap">
            <Shield size={14} className="wb-clean-station-shield" />
          </div>
          <div className="wb-clean-station-info">
            <span className="wb-clean-station-title">Air-Gapped Terminal</span>
            <span className="wb-clean-station-sub">100% Offline • Zero Egress</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
