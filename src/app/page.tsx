export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-text-title text-2xl font-semibold mb-2">CodeRunner Blog</h1>
      <p className="text-text-secondary">暗色主题测试 - 如果你看到深蓝灰背景和这行灰色文字，说明配置成功。</p>
      <div className="mt-8 p-4 bg-surface-1 border border-border rounded-lg font-mono text-[13px] text-accent">
        fmt.Println("Hello, CodeRunner!")
      </div>
    </main>
  );
}
