/**
 * Chat Storage Service — localStorage-backed chat session persistence
 * Max 50 sessions, auto-prunes oldest when limit is reached.
 */

const STORAGE_KEY = 'max_chats';
const LEGACY_STORAGE_KEY = 'aerosovereign_chats';
const MAX_SESSIONS = 50;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

export function getAllSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return [];
    const sessions = JSON.parse(raw);
    return Array.isArray(sessions) ? sessions : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // localStorage full — prune and retry
    const pruned = sessions.slice(-Math.floor(MAX_SESSIONS / 2));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
  }
}

export function createSession(title = 'New Chat') {
  const sessions = getAllSessions();
  const newSession = {
    id: generateId(),
    title,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    model: 'auto',
  };

  sessions.unshift(newSession);

  // Auto-prune if over limit
  if (sessions.length > MAX_SESSIONS) {
    sessions.length = MAX_SESSIONS;
  }

  saveSessions(sessions);
  return newSession;
}

export function getSession(sessionId) {
  const sessions = getAllSessions();
  return sessions.find(s => s.id === sessionId) || null;
}

export function updateSession(sessionId, updates) {
  const sessions = getAllSessions();
  const idx = sessions.findIndex(s => s.id === sessionId);
  if (idx === -1) return null;

  sessions[idx] = {
    ...sessions[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveSessions(sessions);
  return sessions[idx];
}

export function addMessage(sessionId, message) {
  const sessions = getAllSessions();
  const idx = sessions.findIndex(s => s.id === sessionId);
  if (idx === -1) return null;

  const msg = {
    id: generateId(),
    ...message,
    timestamp: new Date().toISOString(),
  };

  sessions[idx].messages.push(msg);
  sessions[idx].updatedAt = new Date().toISOString();

  // Auto-generate title from first user message
  if (sessions[idx].messages.filter(m => m.role === 'user').length === 1 && message.role === 'user') {
    sessions[idx].title = message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '');
  }

  saveSessions(sessions);
  return msg;
}

export function deleteSession(sessionId) {
  const sessions = getAllSessions().filter(s => s.id !== sessionId);
  saveSessions(sessions);
  return sessions;
}

export function clearAllSessions() {
  saveSessions([]);
}

// Check if first visit (for download modal)
const FIRST_VISIT_KEY = 'max_first_visit_done';
const LEGACY_FIRST_VISIT_KEY = 'aerosovereign_first_visit_done';

export function isFirstVisit() {
  return !localStorage.getItem(FIRST_VISIT_KEY) && !localStorage.getItem(LEGACY_FIRST_VISIT_KEY);
}

export function markFirstVisitDone() {
  localStorage.setItem(FIRST_VISIT_KEY, 'true');
}
