import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";

const LATEST_COUNT = 3;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function BlogSection() {
  const latest = posts.slice(0, LATEST_COUNT);

  return (
    <section id="blog" className="py-20 bg-[hsl(215,25%,27%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Latest from the Blog</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Straight-up thoughts on AI, missed calls, and growing a trade business in Aotearoa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass-effect rounded-2xl p-6 h-full flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-[hsl(197,87%,43%)] text-sm font-medium">
                    {formatDate(post.date)}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 hover:text-[hsl(197,87%,43%)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <span className="text-[hsl(197,87%,43%)] font-medium text-sm">
                  Read more →
                </span>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="gradient-border inline-block">
            <Link href="/blog">
              <Button className="bg-[hsl(222,84%,15%)] text-white px-8 py-3 rounded-xl hover:bg-[hsl(215,25%,27%)] transition-all duration-300 font-medium">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
