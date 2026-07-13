import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { posts, getPostBySlug, type BlogBlock } from "@/data/posts";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Renders a block array to plain text/HTML for the noscript fallback.
// Kept simple and semantic so Googlebot gets real content even without JS.
const renderBlocksAsHtml = (body: BlogBlock[]): string =>
  body
    .map((block) => {
      switch (block.type) {
        case "h2":
          return `<h2>${block.text}</h2>`;
        case "h3":
          return `<h3>${block.text}</h3>`;
        case "quote":
          return `<blockquote>${block.text}</blockquote>`;
        case "ul":
          return `<ul>${block.items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        case "link":
          return `<p><a href="${block.href}">${block.text}</a></p>`;
        case "table":
          return `<table><thead><tr>${block.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${block.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
        default:
          return `<p>${block.text}</p>`;
      }
    })
    .join("\n");

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getPostBySlug(params.slug) : undefined;

  // Up to 2 other posts, newest first, excluding the current one.
  const relatedPosts = post ? posts.filter((p) => p.slug !== post.slug).slice(0, 2) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = post.metaTitle;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", post.metaDescription);

      // Set canonical to this specific post's URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://corvidai.io/blog/${post.slug}`);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = `https://corvidai.io/blog/${post.slug}`;
        document.head.appendChild(link);
      }

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
      // Set canonical to this specific post's URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://corvidai.io/blog/${post.slug}`);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = `https://corvidai.io/blog/${post.slug}`;
        document.head.appendChild(link);
      }

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
                case "link":
                  return (
                    <Link key={i} href={block.href} className="block bg-[hsl(197,87%,43%)]/10 border border-[hsl(197,87%,43%)]/30 rounded-xl px-5 py-4 my-6 text-[hsl(197,87%,60%)] hover:bg-[hsl(197,87%,43%)]/15 transition-colors font-medium">
                      {block.text}
                    </Link>
                  );
                case "table":
                  return (
                    <div key={i} className="overflow-x-auto my-8 rounded-xl border border-[hsl(215,27.9%,16.9%)]">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[hsl(215,25%,27%)]/50">
                            {block.headers.map((h, hi) => (
                              <th key={hi} className="text-left px-4 py-3 font-semibold text-white whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, ri) => (
                            <tr key={ri} className="border-t border-[hsl(215,27.9%,16.9%)]">
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 text-slate-300 whitespace-nowrap">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

          {/* Related reading — internal linking for SEO + reader value */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[hsl(215,27.9%,16.9%)]">
              <h3 className="text-xl font-bold text-white mb-6">Related reading</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                    <div className="glass-effect rounded-xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer border border-[hsl(215,27.9%,16.9%)] h-full">
                      <span className="text-[hsl(197,87%,43%)] text-xs font-medium">{formatDate(rp.date)}</span>
                      <h4 className="text-white font-semibold mt-1 mb-2 leading-snug">{rp.title}</h4>
                      <span className="text-slate-400 text-sm">{rp.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Noscript fallback — ensures Googlebot and non-JS clients see full
          article content immediately without depending on JS execution.
          Mirrors the homepage noscript pattern used for the same reason. */}
      <noscript>
        <main style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto", padding: "2rem", color: "#1a1a1a" }}>
          <h1>{post.title}</h1>
          <p>
            <em>
              {formatDate(post.date)} · {post.readTime} · {post.author}
            </em>
          </p>
          <div dangerouslySetInnerHTML={{ __html: renderBlocksAsHtml(post.body) }} />
          <p>
            <a href="/receptionist#demo">Try a Live Demo of Corvid AI's Digital Receptionist</a>
          </p>
          {relatedPosts.length > 0 && (
            <>
              <h2>Related reading</h2>
              <ul>
                {relatedPosts.map((rp) => (
                  <li key={rp.slug}>
                    <a href={`/blog/${rp.slug}`}>{rp.title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p>
            <a href="/blog">← Back to the blog</a>
          </p>
        </main>
      </noscript>

      <Footer />
    </div>
  );
}
