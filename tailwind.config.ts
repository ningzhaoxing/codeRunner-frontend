// NOTE: This project uses Tailwind v4 which uses CSS-based configuration via @theme in globals.css.
// This file is kept for reference. The actual theme values are defined in src/app/globals.css.
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          0: "#111122",
          nav: "#13132a",
          1: "#151515",
          2: "#1a1a1a",
          3: "#252525",
        },
        border: {
          DEFAULT: "#2a2a4a",
        },
        text: {
          title: "#e8e8f0",
          body: "#b0b0c8",
          secondary: "#8080a0",
          placeholder: "#5a5a7a",
          disabled: "#3a3a5a",
        },
        accent: "#90e86f",
        tag: "#77B7D7",
        error: "#ff6b6b",
        "msg-user": "#1e1e3a",
        "msg-ai": "#0d1a20",
        "diff-add": "#1a2e1a",
        "exec-ok": "#0d150d",
      },
      fontFamily: {
        mono: ['"Fira Mono"', '"DejaVu Sans Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
