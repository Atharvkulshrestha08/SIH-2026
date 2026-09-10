import React from 'react';
import { PanelLeft } from 'lucide-react';

export default function TopBar({
  activeView = 'chat',
  onViewChange,
  sidebarCollapsed = false,
  onToggleSidebar,
}) {
  return (
    <header className="wb-clean-topbar">
      {/* Left: Sidebar toggle & Brand Title */}
      <div className="wb-clean-topbar-left">
        {sidebarCollapsed && (
          <button
            className="wb-clean-icon-btn"
            onClick={onToggleSidebar}
            title="Open sidebar"
          >
            <PanelLeft size={16} />
          </button>
        )}
        <span className="wb-clean-topbar-title">AeroSovereign</span>
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
    </header>
  );
}
