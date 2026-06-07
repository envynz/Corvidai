import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { posts } from "@/data/posts";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogIndexPage() {
  useEffect(() => {
    document.title = "Blog — Corvid AI | AI Insights for NZ Tradies & Small Business";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(222,84%,15%)] text-slate-100">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-3">
              The Corvid AI Blog
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Insights for the people who build New Zealand
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Straight-up thoughts on AI, missed calls, and growing a trade business in Aotearoa — no jargon, no fluff.
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass-effect rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-[hsl(215,27.9%,16.9%)]">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-[hsl(197,87%,43%)] text-sm font-medium">
                      {formatDate(post.date)}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 hover:text-[hsl(197,87%,43%)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-[hsl(197,87%,43%)] hover:text-[hsl(217,91%,60%)] transition-colors font-medium text-sm">
                    Read more →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
