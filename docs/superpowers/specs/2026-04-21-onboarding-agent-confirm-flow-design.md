# Onboarding Agent Confirm Flow Design

> 状态：draft
> 日期：2026-04-21

## 目标

把当前博客内的 Agent 新手引导，从"只展示说明文案"改成"按真实交互链路一步步带用户完成"，重点突出 CodeRunner Agent 的核心体验：

1. 博客代码片段本身不完整，直接 Run 往往失败
2. 用户打开 AI 助手，请求补全可运行代码
3. Agent 先产出 proposal（提议执行）
4. 用户点击确认执行，代码才真正进入沙箱
5. 执行结果回流后继续学习

## 当前问题

现有引导虽然已经介绍了 Agent 的能力，但缺少对 HITL 流程中两个关键节点的显式引导：

- **等待 proposal 出现**
- **点击确认执行**

结果是用户知道"Agent 很强"，但不一定理解实际操作链路，也不一定能完整体验"补全 → 提议 → 确认 → 执行"这个最核心的闭环。

## 设计方案

### 引导步骤拆分

把原本围绕 Agent 的 3/4/5 步，改成 4 个真实交互步骤：

1. **打开 AI 助手**
   - 目标：🤖 按钮
   - 自动推进：AI 面板打开

2. **发送补全请求**
   - 目标：聊天输入框
   - 自动推进：用户发送消息
   - 引导文案中给出明确可复制的提示词

3. **等待 Agent 发出执行提议**
   - 目标：稳定存在的聊天区域（不是 proposal 卡片本身）
   - 自动推进：proposal 卡片真正渲染出来
   - 目标是让用户理解：Agent 不会直接运行，而是先提出建议

4. **点击确认执行**
   - 目标：proposal 卡片里的确认执行按钮
   - 自动推进：用户点击确认
   - 目标是让用户理解：执行是 HITL，需要用户确认

### 推进机制

继续沿用当前 onboarding 的事件驱动自动推进方案，不引入额外状态机框架。

新增两类事件：

- `onboarding:proposal-shown` —— 由 `CodeSuggestion` 在 proposal 卡片真实渲染后派发，而不是在 SSE interrupt 到达时派发
- `onboarding:proposal-confirmed` —— 由确认按钮点击时立即派发，不等待确认请求返回

现有事件继续使用：

- `onboarding:ai-opened`
- `onboarding:ai-message-sent`

### 目标锚点

为确保聚焦准确，需要在现有组件上增加三个 onboarding target：

- 聊天区域容器：`data-onboarding-target="ai-chat-area"`
- proposal 确认按钮：`data-onboarding-target="proposal-confirm-button"`
- 聊天输入框：`data-onboarding-target="ai-input"`

其中 `ai-chat-area` 用于承载“等待 proposal”这一步的稳定高亮对象；`proposal-confirm-button` 用于最后的 HITL 确认步骤；`ai-input` 用于明确指引用户输入补全请求。

### 文案原则

Agent 引导文案不再停留在功能描述，而是明确要求用户执行动作：

- "现在点击 🤖 按钮"
- "现在发送这句话"
- "现在等 Agent 先发出执行提议"
- "现在点击确认执行"

这样用户能真正走完完整链路，而不是只读说明卡片。

## 影响文件

- `src/components/onboarding/steps.ts`
- `src/components/onboarding/OnboardingProvider.tsx`
- `src/components/AIPanel.tsx`（增加稳定存在的聊天区域锚点 `ai-chat-area`）
- `src/components/ChatInput.tsx`（增加输入框锚点 `ai-input`）
- `src/components/CodeSuggestion.tsx`（增加确认按钮锚点并派发 proposal 相关事件）
- `src/components/ChatMessages.tsx`（作为聊天消息区域的实际承载组件，避免等待步骤高亮漂移到错误区域）

## 边界条件

1. **proposal 尚未出现**
   - onboarding 停留在“等待 proposal”步骤
   - 高亮稳定存在的聊天区域，不依赖 proposal 卡片存在

2. **Agent 返回普通文本但没有 proposal**
   - onboarding 保持在等待步骤，不自动跳转

3. **proposal 来源于历史恢复**
   - `onboarding:proposal-shown` 只能针对当前 onboarding 会话里“新出现”的 proposal 派发
   - 不能因为本地恢复出的旧 proposal 卡片 mount 就误推进步骤

4. **proposal 出现多个**
   - onboarding 只跟随首次新渲染出来、且当前可见的 proposal 卡片

5. **confirm 请求较慢**
   - `onboarding:proposal-confirmed` 在点击按钮时立即派发，避免用户感知卡住

## 验收标准

1. 用户完成 Run 失败后，点击 AI 按钮自动进入“发送补全请求”步骤
2. 用户发送消息后，自动进入“等待 proposal”步骤
3. 在等待步骤中，tooltip 必须锚定到可见的聊天区域，不允许残留在上一步按钮上
4. onboarding 不允许因为历史恢复出的旧 proposal 卡片而自动推进
5. 只有当新的 proposal 卡片真实渲染到 DOM 后，才自动进入“点击确认执行”步骤
6. “点击确认执行”步骤的高亮目标必须是 proposal 卡片中的确认按钮
7. 用户点击确认按钮后，自动进入后续步骤
8. 整个过程中每一步 `targetSelector` 都能解析到一个当前可见元素
