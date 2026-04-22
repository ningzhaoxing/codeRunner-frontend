export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-text-disabled text-xs">
          © 2026 Ning · 灵码云 · 一种可交互的新型博客
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ningzhaoxing/codeRunner-front"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-disabled text-xs hover:text-text-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href="/rss.xml"
            className="text-text-disabled text-xs hover:text-text-secondary transition-colors"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
