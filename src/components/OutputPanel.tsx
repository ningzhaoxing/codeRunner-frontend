"use client";

interface OutputPanelProps {
  output: string | null;
  error: string | null;
  isRunning: boolean;
}

export default function OutputPanel({ output, error, isRunning }: OutputPanelProps) {
  if (!isRunning && !output && !error) return null;

  return (
    <div className="bg-[#0d0d15] border-t border-border px-4 py-3 font-mono text-xs">
      {isRunning && (
        <span className="text-text-secondary animate-pulse">执行中...</span>
      )}
      {error && <pre className="text-error whitespace-pre-wrap">{error}</pre>}
      {output && !error && (
        <pre className="text-text-secondary whitespace-pre-wrap">{output}</pre>
      )}
    </div>
  );
}
