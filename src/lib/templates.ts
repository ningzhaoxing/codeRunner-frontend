export interface LangTemplate {
  filename: string;
  monacoLang: string;
  label: string;
  defaultCode: string;
}

export const SUPPORTED_LANGUAGES = ["go", "python", "javascript", "java", "c"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const templates: Record<SupportedLanguage, LangTemplate> = {
  go: {
    filename: "main.go",
    monacoLang: "go",
    label: "Go",
    defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  },
  python: {
    filename: "main.py",
    monacoLang: "python",
    label: "Python",
    defaultCode: `print("Hello, World!")`,
  },
  javascript: {
    filename: "index.js",
    monacoLang: "javascript",
    label: "JavaScript",
    defaultCode: `console.log("Hello, World!");`,
  },
  java: {
    filename: "Main.java",
    monacoLang: "java",
    label: "Java",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  c: {
    filename: "main.c",
    monacoLang: "c",
    label: "C",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
};
