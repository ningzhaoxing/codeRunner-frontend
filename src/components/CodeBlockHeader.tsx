"use client";

interface CodeBlockHeaderProps {
  filename: string;
  language: string;
  isRunning: boolean;
  isExpanded: boolean;
  onRun: () => void;
  onToggleAI: () => void;
  onToggleExpand: () => void;
}

export default function CodeBlockHeader({
  filename,
  language,
  isRunning,
  isExpanded,
  onRun,
  onToggleAI,
  onToggleExpand,
}: CodeBlockHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-surface-2 border-b border-border px-3 py-1.5">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-accent font-mono">{filename}</span>
        <span className="text-text-disabled">|</span>
        <span className="text-text-secondary">{language}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onRun}
          disabled={isRunning}
          className="text-accent bg-surface-3 hover:bg-surface-2 px-2 py-0.5 rounded text-xs font-mono transition-colors disabled:opacity-50"
        >
          {isRunning ? "⏳" : "▶ Run"}
        </button>
        <button
          onClick={onToggleAI}
          className="hover:bg-surface-3 px-1.5 py-0.5 rounded text-xs transition-colors"
          title="AI Assistant"
        >
          🤖
        </button>
        <button
          onClick={onToggleExpand}
          className="hover:bg-surface-3 px-1.5 py-0.5 rounded text-xs transition-colors"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? "⤡" : "⤢"}
        </button>
      </div>
    </div>
  );
}
