import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

// Generate contextual thumbnail based on post content
function generateContextualThumbnail(title: string, description: string): string {
  const content = (title + ' ' + description).toLowerCase();
  
  // Define themed thumbnails for different AI/tech topics
  const thumbnails = {
    ai: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop&crop=center",
    rag: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center", 
    context: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    agent: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center",
    profitable: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=800&h=600&fit=crop&crop=center",
    research: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=600&fit=crop&crop=center",
    default: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center"
  };
  
  // Match content to appropriate thumbnail
  if (content.includes('rag') || content.includes('retrieval')) return thumbnails.rag;
  if (content.includes('context') || content.includes('rot')) return thumbnails.context;
  if (content.includes('agent') || content.includes('agentic')) return thumbnails.agent;
  if (content.includes('profitable') || content.includes('money')) return thumbnails.profitable;
  if (content.includes('research') || content.includes('overview')) return thumbnails.research;
  if (content.includes('ai') || content.includes('artificial')) return thumbnails.ai;
  
  return thumbnails.default;
}

// RSS parsing functionality
async function parseRSSFeed(url: string) {
  try {
    console.log('Fetching RSS feed from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`RSS feed request failed with status: ${response.status}`);
      return [];
    }
    
    const text = await response.text();
    console.log('RSS feed length:', text.length);
    
    // Simple RSS parser for Substack feeds
    const items: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;
    
    while ((match = itemRegex.exec(text)) !== null) {
      const itemContent = match[1];
      
      const title = extractTag(itemContent, 'title');
      const link = extractTag(itemContent, 'link');
      let guid = extractTag(itemContent, 'guid');
      const pubDate = extractTag(itemContent, 'pubDate');
      const description = extractTag(itemContent, 'description');
      
      // Use link as guid if guid is not available
      if (!guid && link) {
        guid = link;
      }
      
      console.log('Parsed item:', { title: title?.substring(0, 50), link, guid: guid?.substring(0, 50), pubDate });
      console.log('Description sample:', description?.substring(0, 200));
      
      if (title && link && guid && pubDate) {
        // Generate smart thumbnail based on title/content
        let imageUrl: string | null = null;
        
        // First try to extract image from description
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
        const imgMatch = description?.match(imgRegex);
        if (imgMatch) {
          imageUrl = imgMatch[1];
          console.log('Found image URL in description:', imageUrl);
        } else {
          // Generate contextual thumbnail based on content
          imageUrl = generateContextualThumbnail(title, description);
          console.log('Generated contextual image URL:', imageUrl);
        }
        
        // Extract excerpt from description (remove HTML tags and limit length)
        let excerpt = description
          .replace(/<[^>]*>/g, '')
          .replace(/&[^;]+;/g, '')
          .trim();
        
        if (excerpt.length > 200) {
          excerpt = excerpt.substring(0, 200) + '...';
        }
        
        try {
          const publishedDate = new Date(pubDate);
          if (isNaN(publishedDate.getTime())) {
            console.error('Invalid date:', pubDate);
            continue;
          }
          
          items.push({
            title: title.trim(),
            link: link.trim(),
            guid: guid.trim(),
            publishedAt: publishedDate,
            excerpt,
            content: description,
            imageUrl
          });
        } catch (dateError) {
          console.error('Error parsing date:', pubDate, dateError);
        }
      } else {
        console.log('Missing required fields:', { title: !!title, link: !!link, guid: !!guid, pubDate: !!pubDate });
      }
    }
    
    console.log('Total items parsed:', items.length);
    return items;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

function extractTag(content: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = content.match(regex);
  if (match) {
    let result = match[1];
    // Remove CDATA wrapping if present
    result = result.replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1');
    return result.trim();
  }
  return '';
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog posts endpoint
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(10);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Sync Substack feed endpoint
  app.post("/api/sync-substack", async (req, res) => {
    try {
      const substackUrl = process.env.SUBSTACK_RSS_URL || 'https://alitheaiguy.substack.com/feed';
      const feedItems = await parseRSSFeed(substackUrl);
      
      let syncedCount = 0;
      
      for (const item of feedItems) {
        try {
          // Check if post already exists
          const existingPost = await storage.getBlogPostByGuid(item.guid);
          
          if (!existingPost) {
            // Validate the data
            const validatedPost = insertBlogPostSchema.parse(item);
            await storage.createBlogPost(validatedPost);
            syncedCount++;
          }
        } catch (validationError) {
          console.error('Error processing blog post:', validationError);
        }
      }
      
      res.json({ 
        message: `Synced ${syncedCount} new blog posts`,
        totalProcessed: feedItems.length,
        newPosts: syncedCount
      });
    } catch (error) {
      console.error('Error syncing Substack feed:', error);
      res.status(500).json({ message: "Failed to sync Substack feed" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }
      
      // In a real implementation, you would send an email here
      console.log('Contact form submission:', { name, email, message });
      
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
