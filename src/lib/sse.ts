export interface SSEEvent {
  type: string;
  [key: string]: unknown;
}

/**
 * Normalize raw SSE data into a flat event.
 * The backend may send Eino AgentEvent objects with nested structure:
 *   { Output: { MessageOutput: { Message: { role, content } } } }
 * This function flattens them into { type: "content", content: "...", role: "..." }
 * so consumers don't need to know about the Eino internals.
 */
function normalizeEvent(raw: Record<string, unknown>): SSEEvent {
  // Already has a recognized type — return as-is
  if (typeof raw.type === "string") {
    return raw as SSEEvent;
  }

  // Nested Eino message output
  const output = raw.Output as Record<string, unknown> | undefined;
  const msgOutput = output?.MessageOutput as Record<string, unknown> | undefined;
  const msg = msgOutput?.Message as Record<string, unknown> | undefined;
  if (msg && typeof msg.content === "string") {
    return { type: "content", content: msg.content, role: msg.role as string };
  }

  // Unknown structure — pass through with fallback type
  return { type: "unknown", ...raw } as SSEEvent;
}

export async function fetchSSE(
  url: string,
  body: Record<string, unknown>,
  onEvent: (event: SSEEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";
  let currentEvent = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();

      // Handle "event: xxx" lines
      if (trimmed.startsWith("event: ")) {
        currentEvent = trimmed.slice(7);
        continue;
      }

      // Handle "data: xxx" lines
      if (trimmed.startsWith("data: ")) {
        try {
          const data = JSON.parse(trimmed.slice(6));

          // If there was an "event:" line, use it as type
          if (currentEvent) {
            onEvent(normalizeEvent({ type: currentEvent, ...data }));
            currentEvent = "";
          } else {
            // Otherwise normalize the raw data
            onEvent(normalizeEvent(data));
          }
        } catch {
          // skip malformed JSON
        }
      }
    }
  }
}
