import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Create email transporter
function createEmailTransporter() {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // Use STARTTLS instead of SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  };
  
  console.log('Creating transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user ? 'configured' : 'missing',
    pass: config.auth.pass ? 'configured' : 'missing'
  });
  
  return nodemailer.createTransport(config);
}

// Send contact form email
async function sendContactEmail(name: string, email: string, message: string) {
  console.log('Setting up email transporter...');
  console.log('SMTP Config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? 'configured' : 'missing',
    pass: process.env.SMTP_PASS ? 'configured' : 'missing'
  });
  
  // Verify all required environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Missing required SMTP environment variables');
  }
  
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'hello@corvid.ai',
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This message was sent from the Corvid.ai website contact form.</em></p>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

This message was sent from the Corvid.ai website contact form.
    `
  };

  console.log('Sending email to hello@corvid.ai...');
  const result = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', result.messageId);
  return result;
}

// Extract featured image from individual Substack post
async function extractFeaturedImageFromPost(postUrl: string): Promise<string | null> {
  try {
    console.log('Fetching post page:', postUrl);
    const response = await fetch(postUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch post page: ${response.status}`);
      return null;
    }
    
    const html = await response.text();
    
    // Look for various image patterns in Substack posts
    const imagePatterns = [
      // Open Graph image - handle the way Substack formats it
      /property=["']og:image["']\s+content=["']([^"']+)["']/i,
      // Twitter card image  
      /name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      // Alternative og:image format
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      // First large image in the post content
      /<img[^>]+src=["']([^"']*substackcdn[^"']+)["'][^>]*>/i,
      // Any Substack CDN image
      /<img[^>]+src=["']([^"']*substack[^"']+\.(jpg|jpeg|png|webp)[^"']*)["'][^>]*>/i
    ];
    
    for (const pattern of imagePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        let imageUrl = match[1];
        
        // Clean up Substack CDN URLs but keep essential parameters
        if (imageUrl.includes('substackcdn.com')) {
          // Keep Substack CDN URLs as-is since they need their parameters
          console.log('Found featured image:', imageUrl);
          return imageUrl;
        } else {
          // For other URLs, remove query parameters
          imageUrl = imageUrl.split('?')[0];
          if (imageUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
            console.log('Found featured image:', imageUrl);
            return imageUrl;
          }
        }
      }
    }
    
    console.log('No featured image found in post');
    return null;
  } catch (error) {
    console.error('Error extracting featured image:', error);
    return null;
  }
}

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
        // Extract actual featured image from the blog post
        let imageUrl: string | null = null;
        
        // First try to extract image from description
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
        const imgMatch = description?.match(imgRegex);
        if (imgMatch) {
          imageUrl = imgMatch[1];
          console.log('Found image URL in description:', imageUrl);
        } else {
          // Try to fetch the actual featured image from the blog post page
          try {
            imageUrl = await extractFeaturedImageFromPost(link);
            console.log('Extracted featured image from post:', imageUrl);
          } catch (error) {
            console.log('Failed to extract featured image, using contextual thumbnail');
            imageUrl = generateContextualThumbnail(title, description);
          }
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
      
      // Send email notification
      console.log('Contact form submission:', { name, email, message });
      
      try {
        await sendContactEmail(name, email, message);
        console.log('Email sent successfully to hello@corvid.ai');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        return res.status(500).json({ message: "Failed to send email notification" });
      }
      
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
