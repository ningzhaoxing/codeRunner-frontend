import { fetchSSE, type SSEEvent } from "./sse";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8081";

export async function executeCode(
  id: string,
  language: string,
  codeBlock: string,
  onEvent: (event: SSEEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  await fetchSSE(
    `${API_BASE}/api/execute`,
    { id, language, codeBlock },
    onEvent,
    signal
  );
}

export async function chatWithAgent(
  params: {
    session_id: string;
    user_message: string;
    active_block_id: string;
    current_code: string;
    article_ctx?: {
      article_id: string;
      article_content: string;
      code_blocks: { block_id: string; language: string; code: string }[];
    };
  },
  onEvent: (event: SSEEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  await fetchSSE(`${API_BASE}/api/chat`, params, onEvent, signal);
}

export async function confirmProposal(
  sessionId: string,
  proposalId: string
): Promise<{ request_id: string; status: string }> {
  const res = await fetch(`${API_BASE}/api/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, proposal_id: proposalId }),
  });
  return res.json();
}
