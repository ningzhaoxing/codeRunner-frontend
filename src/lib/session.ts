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
