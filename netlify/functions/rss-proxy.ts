import type { Handler } from "@netlify/functions";

const SUBSTACK_RSS_URL = "https://alitheaiguy.substack.com/feed";

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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600",
      },
      body: xml,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};