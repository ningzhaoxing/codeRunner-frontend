import { getAllPosts } from "@/lib/markdown";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[720px] mx-auto px-6 pt-14">
      {/* Hero */}
      <section className="py-12">
        <h1 className="text-text-title text-2xl font-semibold mb-3">Hi, I&apos;m Ning 👋</h1>
        <p className="text-text-secondary text-[15px] leading-relaxed mb-4">
          这里记录我的技术思考与探索。博客中的代码块支持{" "}
          <span className="text-accent font-medium">代码可直接运行</span>，配合 AI 助手一起学习。
        </p>
        <p className="text-text-secondary text-[15px] leading-relaxed">
          内置 <span className="text-accent font-medium">AI Agent</span>{" "}
          帮你把片段补全为可运行程序、解释报错、按需改写示例——
          <span className="text-text-title">读、跑、改、问</span>在同一个页面完成。
        </p>
      </section>

      {/* Post list */}
      <section className="pb-16">
        <h2 className="text-text-disabled text-xs font-medium uppercase tracking-wider mb-2">
          Recent Posts {posts.length > 0 && `(${posts.length})`}
        </h2>
        {posts.length === 0 ? (
          <p className="text-text-disabled text-sm py-8">暂无文章</p>
        ) : (
          posts.map((post, i) => <PostCard key={post.slug} post={post} isFirst={i === 0} />)
        )}
      </section>
    </div>
  );
}
