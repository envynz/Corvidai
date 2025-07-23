import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  // Fetch blog posts
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Sync Substack feed mutation
  const syncMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sync-substack"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
    },
  });

  // Auto-sync on component mount
  useEffect(() => {
    syncMutation.mutate();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

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
        ) : !blogPosts || blogPosts.length === 0 ? (
          <div className="text-center">
            <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-[hsl(197,87%,43%)] mb-4">Blog Coming Soon</h3>
              <p className="text-slate-300 mb-6">
                I'm currently setting up my Substack blog. Check back soon for insights on technology, innovation, and intelligent problem-solving.
              </p>
              <Button 
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isPending}
                className="bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:from-[hsl(197,87%,50%)] hover:to-[hsl(217,91%,67%)] text-white"
              >
                {syncMutation.isPending ? "Checking..." : "Check for Posts"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.slice(0, 10).map((post) => (
              <article key={post.id} className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                  alt="Technology workspace" 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-[hsl(197,87%,43%)] text-sm font-medium">
                      {formatDate(post.publishedAt.toString())}
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
                onClick={() => window.open(import.meta.env.VITE_SUBSTACK_URL || 'https://alitheaiguy.substack.com', '_blank')}
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
