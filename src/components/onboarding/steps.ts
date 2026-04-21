export interface OnboardingStep {
  id: string;
  targetSelector: string;
  content: string;
  position: "top" | "bottom" | "left" | "right";
  route?: string;
  advanceOnRoute?: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    targetSelector: '[data-onboarding-target="first-post"]',
    content:
      "👋 欢迎来到 CodeRunner！先打开这篇 Go 并发博客，我带你体验这里最核心的能力 —— 博客里的代码片段可以直接补全并运行。点击文章标题进入 →",
    position: "bottom",
    route: "/",
    advanceOnRoute: "/posts/",
  },
  {
    id: "run-code",
    targetSelector: '[data-onboarding-target="run-button"]',
    content:
      "▶️ 先试 Run 按钮。这段 `fetchAll` 其实只是个函数，没有 main、没有 import —— 直接 Run 会失败，这正是博客代码片段的典型痛点。先点一下看看报错。",
    position: "bottom",
  },
  {
    id: "ai-assistant",
    targetSelector: '[data-onboarding-target="ai-button"]',
    content:
      "🤖 现在点开 AI 助手 —— 它会读懂整篇文章上下文，知道你现在看的是 Block 1 `fetchAll`，帮你把缺失的 package / import / main 全部补齐，生成可运行程序。",
    position: "bottom",
  },
  {
    id: "ai-ask",
    targetSelector: '[data-onboarding-target="ai-button"]',
    content:
      "💬 在对话框里输入：「帮我把这段代码补全成可运行程序，传入 [\"api.a.com\", \"api.b.com\", \"api.c.com\"]」。Agent 会先流式解释它补了什么，然后提议执行，等你确认。",
    position: "bottom",
  },
  {
    id: "ai-confirm",
    targetSelector: '[data-onboarding-target="ai-button"]',
    content:
      "✅ Agent 生成完整代码后，回复一句「好的」或「运行」—— 不需要额外按钮，它识别意图后就在沙箱里执行，stdout 实时流回对话。基于真实输出继续追问：「为什么顺序不确定？」",
    position: "bottom",
  },
  {
    id: "playground",
    targetSelector: '[data-onboarding-target="playground-link"]',
    content:
      "🎨 看完博客想自己动手？Playground 支持 Go / Python / JavaScript / Java / C 五种语言，代码自动保存到本地。点这里进入 →",
    position: "bottom",
    advanceOnRoute: "/playground",
  },
  {
    id: "feedback",
    targetSelector: '[data-onboarding-target="feedback-link"]',
    content: "💬 遇到问题或有建议？点击「反馈」告诉我，我会认真查看每一条",
    position: "bottom",
    route: "/playground",
  },
  {
    id: "complete",
    targetSelector: ".monaco-editor",
    content:
      "✅ 引导完成！提示：Ctrl+Enter 快速运行代码，Shift+? 随时重新查看引导。开始探索吧 🚀",
    position: "top",
    route: "/playground",
  },
];
