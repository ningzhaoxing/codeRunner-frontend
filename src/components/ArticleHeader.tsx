import Link from "next/link";
import type { Article } from "@/types";

export default function ArticleHeader({ article, readingTime }: { article: Article; readingTime?: string }) {
  return (
    <header className="mb-8">
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="bg-[#1e1e3a] text-tag text-[11px] px-2 py-0.5 rounded-full hover:text-accent transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <h1 className="text-text-title text-[28px] font-bold leading-tight mb-3">
        {article.title}
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-text-disabled text-xs">{article.date}</span>
        {readingTime && (
          <span className="text-text-disabled text-xs">{readingTime}</span>
        )}
      </div>
    </header>
  );
}
