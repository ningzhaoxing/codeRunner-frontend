"use client";

import { templates, type SupportedLanguage } from "@/lib/templates";
import LanguageSelector from "./LanguageSelector";

interface PlaygroundToolbarProps {
  language: SupportedLanguage;
  isRunning: boolean;
  isAIOpen: boolean;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRun: () => void;
  onToggleAI: () => void;
  onShare: () => void;
}

export default function PlaygroundToolbar({
  language,
  isRunning,
  isAIOpen,
  onLanguageChange,
  onRun,
  onToggleAI,
  onShare,
}: PlaygroundToolbarProps) {
  const filename = templates[language].filename;

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border">
      <div className="flex items-center gap-3">
        <LanguageSelector value={language} onChange={onLanguageChange} />
        <span className="text-accent font-mono text-xs">{filename}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium bg-accent/20 text-accent hover:bg-accent/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunning ? "⏳" : "▶"} Run
        </button>
        <button
          onClick={onToggleAI}
          className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
            isAIOpen
              ? "bg-accent text-white"
              : "bg-surface-3 text-text-secondary hover:text-text-body hover:bg-surface-2"
          }`}
        >
          🤖 AI
        </button>
        <button
          onClick={onShare}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-surface-3 text-text-secondary hover:text-text-body hover:bg-surface-2 transition-colors"
        >
          🔗
        </button>
      </div>
    </div>
  );
}
