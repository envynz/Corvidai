import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const SUBSTACK_RSS_URL = "https://alitheaiguy.substack.com/feed";
const SUBSTACK_URL = "https://alitheaiguy.substack.com";
const CORS_PROXY = "https://api.allorigins.win/get?url=";
const FALLBACK_IMAGE = "https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9633e180-6f67-4404-a4d6-03cabd6777ab_1024x1024.png";

interface BlogPost {
  id: string;
  title: string;
  link: string;
  publishedAt: Date;
  excerpt: string;
  content: string;
  imageUrl: string | null;
}

function extractTag(content: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = content.match(regex);
  if (match) {
    let result = match[1];
    result = result.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1");
    return result.trim();
  }
  return "";
}

function extractImage(description: string): string | null {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = description.match(imgRegex);
  return match ? match[1] : null;
}

function parseRSS(xml: string): BlogPost[] {
  const items: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    const title = extractTag(itemContent, "title");
    const link = extractTag(itemContent, "link");
    const guid = extractTag(itemContent, "guid") || link;
    const pubDate = extractTag(itemContent, "pubDate");
    const description = extractTag(itemContent, "description");

    if (!title || !link || !pubDate) continue;

    const publishedAt = new Date(pubDate);
    if (isNaN(publishedAt.getTime())) continue;

    const imageUrl = extractImage(description);

    const excerpt = description
      .replace(/<[^>]*>/g, "")
      .replace(/&[^;]+;/g, "")
      .trim()
      .substring(0, 200) + "...";

    items.push({
      id: guid,
      title: title.trim(),
      link: link.trim(),
      publishedAt,
      excerpt,
      content: description,
      imageUrl,
    });
  }

  return items;
}

async function fetchSubstackPosts(): Promise<BlogPost[]> {
  const response = await fetch(
    `${CORS_PROXY}${encodeURIComponent(SUBSTACK_RSS_URL)}`
  );
  if (!response.ok) throw new Error("Failed to fetch RSS feed");
  const data = await response.json();
  return parseRSS(data.contents);
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getReadTime = (content: string) => {
  const words = content.replace(/<[^>]*>/g, "").split(" ").length;
  return `${Math.ceil(words / 200)} min read`;
};

export default function BlogSection() {
  const { data: blogPosts, isLoading, isError, refetch } = useQuery<BlogPost[]>({
    queryKey: ["substack-rss"],
    queryFn: fetchSubstackPosts,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  return (
    <section id="blog" className="py-20 bg-[hsl(215,25%,27%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Latest Insights</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Thoughts on technology, innovation, and the intelligence that drives progress.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="glass-effect border-none">
                <Skeleton className="h-48 w-full rounded-t-xl" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError || !blogPosts || blogPosts.length === 0 ? (
          <div className="text-center">
            <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-[hsl(197,87%,43%)] mb-4">
                {isError ? "Couldn't load posts" : "Blog Coming Soon"}
              </h3>
              <p className="text-slate-300 mb-6">
                {isError
                  ? "There was an issue loading the latest posts. Please try again."
                  : "I'm currently setting up my Substack blog. Check back soon for insights on technology, innovation, and intelligent problem-solving."}
              </p>
              <Button
                onClick={() => refetch()}
                className="bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:from-[hsl(197,87%,50%)] hover:to-[hsl(217,91%,67%)] text-white"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.slice(0, 10).map((post) => (
              <article
                key={post.id}
                className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={post.imageUrl || FALLBACK_IMAGE}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-[hsl(197,87%,43%)] text-sm font-medium">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-sm">
                      {getReadTime(post.content)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 hover:text-[hsl(197,87%,43%)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(197,87%,43%)] hover:text-[hsl(217,91%,60%)] transition-colors font-medium text-sm"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {blogPosts && blogPosts.length > 0 && (
          <div className="text-center mt-12">
            <div className="gradient-border inline-block">
              <Button
                onClick={() => window.open(SUBSTACK_URL, "_blank")}
                className="bg-[hsl(222,84%,15%)] text-white px-8 py-3 rounded-xl hover:bg-[hsl(215,25%,27%)] transition-all duration-300 font-medium"
              >
                View All Posts
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}