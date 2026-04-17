"use client";

import { templates, type SupportedLanguage } from "@/lib/templates";

interface StatusBarProps {
  language: SupportedLanguage;
  code: string;
  isSaved: boolean;
}

export default function StatusBar({ language, code, isSaved }: StatusBarProps) {
  const label = templates[language].label;
  const charCount = code.length;
  const lineCount = code.split("\n").length;

  return (
    <div className="flex items-center justify-between px-4 py-1 bg-surface-nav border-t border-border text-[11px] text-text-secondary">
      <div className="flex items-center gap-3">
        <span>{label}</span>
        <span>{charCount} 字符</span>
        <span>{lineCount} 行</span>
      </div>
      <div>
        <span>{isSaved ? "已保存" : "保存中..."}</span>
      </div>
    </div>
  );
}
