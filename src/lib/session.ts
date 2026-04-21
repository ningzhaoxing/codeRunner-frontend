/**
 * Generate a session ID that works in both secure (HTTPS) and non-secure (HTTP) contexts.
 * Falls back to timestamp + random string if crypto.randomUUID() is unavailable.
 */
export function generateSessionId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // Fallback for non-secure contexts (HTTP)
    return `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

const SESSION_KEY_PREFIX = "cr_session_";

export function loadSessionId(articleId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY_PREFIX + articleId);
}

export function saveSessionId(articleId: string, sessionId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY_PREFIX + articleId, sessionId);
}

export function clearSessionId(articleId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY_PREFIX + articleId);
}

/**
 * Returns a stable visitor ID for the current browser.
 * Generated once and persisted in localStorage.
 */
const VISITOR_ID_KEY = "cr_visitor_id";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = generateSessionId();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}
