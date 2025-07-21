import { users, blogPosts, type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBlogPosts(limit?: number): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPostByGuid(guid: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private currentUserId: number;
  private currentBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(limit = 10): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
    return posts;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPostByGuid(guid: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.guid === guid);
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    const updatedPost = { ...existingPost, ...updateData };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
}

export const storage = new MemStorage();
