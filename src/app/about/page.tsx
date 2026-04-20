import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const GITHUB_URL = "https://github.com/ningzhaoxing";
const AVATAR_URL = "https://github.com/ningzhaoxing.png";

export default function AboutPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content/about.md"), "utf-8");
  const { content } = matter(raw);

  return (
    <div className="max-w-[720px] mx-auto px-6 pt-20 pb-16">
      <div className="flex items-center gap-5 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR_URL}
          alt="ningzhaoxing avatar"
          className="w-20 h-20 rounded-full border-2 border-accent/40 object-cover"
        />
        <div>
          <h1 className="text-text-title text-2xl font-semibold">ningzhaoxing</h1>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-sm hover:underline inline-flex items-center gap-1.5 mt-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.73 18.27.5 12 .5Z" />
            </svg>
            github.com/ningzhaoxing
          </a>
        </div>
      </div>
      <MarkdownRenderer content={content} articleId="" articleContent="" />
    </div>
  );
}
