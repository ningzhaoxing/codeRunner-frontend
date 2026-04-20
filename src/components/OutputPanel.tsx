"use client";

interface OutputPanelProps {
  output: string | null;
  error: string | null;
  isRunning: boolean;
}

export default function OutputPanel({ output, error, isRunning }: OutputPanelProps) {
  if (!isRunning && !output && !error) return null;

  const accent = error ? "border-error/60 shadow-[0_0_0_1px_rgba(239,68,68,0.25)]" : "border-primary/50 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]";

  return (
    <div className={`bg-[#0a0a12] border-2 ${accent} rounded-md mx-3 mb-3 px-4 py-3 font-mono text-xs max-h-[220px] overflow-y-auto`}>
      {isRunning && (
        <span className="text-primary animate-pulse">执行中...</span>
      )}
      {!isRunning && (output || error) && (
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${error ? "bg-error" : "bg-primary"} animate-pulse`} />
          <span className={`${error ? "text-error" : "text-primary"} text-[10px] font-semibold uppercase tracking-wider`}>Output</span>
        </div>
      )}
      {error && <pre className="text-error whitespace-pre-wrap leading-relaxed">{error}</pre>}
      {output && !error && (
        <pre className="text-text-primary whitespace-pre-wrap leading-relaxed">{output}</pre>
      )}
    </div>
  );
}
