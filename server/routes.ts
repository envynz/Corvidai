import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

// RSS parsing functionality
async function parseRSSFeed(url: string) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // Simple RSS parser for Substack feeds
    const items: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(text)) !== null) {
      const itemContent = match[1];
      
      const title = extractTag(itemContent, 'title');
      const link = extractTag(itemContent, 'link');
      const guid = extractTag(itemContent, 'guid');
      const pubDate = extractTag(itemContent, 'pubDate');
      const description = extractTag(itemContent, 'description');
      
      if (title && link && guid && pubDate) {
        // Extract excerpt from description (remove HTML tags and limit length)
        const excerpt = description
          .replace(/<[^>]*>/g, '')
          .substring(0, 200)
          .trim() + '...';
        
        items.push({
          title: title.trim(),
          link: link.trim(),
          guid: guid.trim(),
          publishedAt: new Date(pubDate),
          excerpt,
          content: description
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

function extractTag(content: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = content.match(regex);
  return match ? match[1] : '';
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog posts endpoint
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(6);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Sync Substack feed endpoint
  app.post("/api/sync-substack", async (req, res) => {
    try {
      const substackUrl = process.env.SUBSTACK_RSS_URL || 'https://corvidae.substack.com/feed';
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
