"use client";

import { SUPPORTED_LANGUAGES, templates, type SupportedLanguage } from "@/lib/templates";

interface LanguageSelectorProps {
  value: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
}

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SupportedLanguage)}
      className="bg-surface-3 text-text-body text-xs border border-border rounded px-2 py-1 outline-none focus:border-accent/50 transition-colors cursor-pointer"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {templates[lang].label}
        </option>
      ))}
    </select>
  );
}
