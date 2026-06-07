import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getPostBySlug } from "@/data/posts";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getPostBySlug(params.slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = post.metaTitle;
      // Update meta description
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", post.metaDescription);

      // Inject Article JSON-LD
      const existing = document.getElementById("article-jsonld");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "article-jsonld";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Person", name: post.author },
        publisher: {
          "@type": "Organization",
          name: "Corvid AI",
          logo: {
            "@type": "ImageObject",
            url: "https://corvidai.io/og-image.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://corvidai.io/blog/${post.slug}`,
        },
      });
      document.head.appendChild(script);
    }
    return () => {
      const existing = document.getElementById("article-jsonld");
      if (existing) existing.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[hsl(222,84%,15%)] text-slate-100">
        <Navigation />
        <section className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-[hsl(197,87%,43%)] hover:underline">
            ← Back to the blog
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(222,84%,15%)] text-slate-100">
      <Navigation />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-[hsl(197,87%,43%)] hover:underline text-sm mb-8 inline-block">
            ← Back to the blog
          </Link>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-[hsl(197,87%,43%)] text-sm font-medium">{formatDate(post.date)}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-sm">{post.readTime}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-sm">{post.author}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            {post.body.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{block.text}</h2>;
                case "h3":
                  return <h3 key={i} className="text-xl font-semibold text-[hsl(197,87%,43%)] mt-8 mb-3">{block.text}</h3>;
                case "quote":
                  return (
                    <blockquote key={i} className="border-l-4 border-[hsl(197,87%,43%)] pl-6 my-8 italic text-xl text-slate-200">
                      {block.text}
                    </blockquote>
                  );
                case "ul":
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 my-4 text-slate-300">
                      {block.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  );
                default:
                  return <p key={i} className="text-slate-300 leading-relaxed mb-5 text-lg">{block.text}</p>;
              }
            })}
          </div>

          {/* CTA */}
          <div className="glass-effect rounded-2xl p-8 mt-16 text-center border border-[hsl(215,27.9%,16.9%)]">
            <h3 className="text-2xl font-bold text-white mb-3">Never miss another job</h3>
            <p className="text-slate-300 mb-6">
              See how Corvid AI's Digital Receptionist turns your missed calls into qualified leads — automatically, by text.
            </p>
            <Link
              href="/receptionist#demo"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Try a Live Demo
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
