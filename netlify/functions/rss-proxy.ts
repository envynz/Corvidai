import type { Handler } from "@netlify/functions";

const SUBSTACK_RSS_URL = "https://alitheaiguy.substack.com/feed";

async function extractFeaturedImage(postUrl: string): Promise<string | null> {
  try {
    const response = await fetch(postUrl);
    if (!response.ok) return null;
    const html = await response.text();

    const patterns = [
      /property=["']og:image["']\s+content=["']([^"']+)["']/i,
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      /<img[^>]+src=["']([^"']*substackcdn[^"']+)["'][^>]*>/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) return match[1];
    }

    return null;
  } catch {
    return null;
  }
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

interface RawItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
}

interface FeedItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
}

function parseRawItems(xml: string): RawItem[] {
  const items: RawItem[] = [];
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
    items.push({ title, link, guid, pubDate, description });
  }

  return items;
}

export const handler: Handler = async () => {
  try {
    const response = await fetch(SUBSTACK_RSS_URL);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch RSS feed" }),
      };
    }

    const xml = await response.text();
    const rawItems = parseRawItems(xml).slice(0, 10);

    // Fetch og:image from each post in parallel
    const imageResults = await Promise.all(
      rawItems.map((item) => extractFeaturedImage(item.link))
    );

    const items: FeedItem[] = rawItems.map((item, i) => ({
      title: item.title.trim(),
      link: item.link.trim(),
      guid: item.guid.trim(),
      pubDate: item.pubDate,
      excerpt:
        item.description
          .replace(/<[^>]*>/g, "")
          .replace(/&[^;]+;/g, "")
          .trim()
          .substring(0, 200) + "...",
      content: item.description,
      imageUrl: imageResults[i],
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600",
      },
      body: JSON.stringify(items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};