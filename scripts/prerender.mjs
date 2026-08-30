// scripts/prerender.mjs
//
// Runs after `vite build`. The site is a client-rendered React SPA, which
// means crawlers that don't execute JavaScript (this includes some AI
// search tools, and possibly others) see an empty <div id="root"></div>
// for every single route.
//
// This script fixes that by:
//  1. Serving the freshly built dist/public folder locally
//  2. Using a headless browser to visit every real route
//  3. Waiting for React to render
//  4. Saving the fully-rendered HTML as a static index.html at that route's
//     path (e.g. dist/public/blog/my-post/index.html)
//
// Netlify serves an existing static file before falling back to the SPA
// redirect rule, so once these files exist, crawlers get real content
// immediately — no JS execution required. Real users are unaffected:
// the same bundled JS still loads and React re-renders the page fresh
// (main.tsx uses createRoot().render(), not hydrateRoot(), so there's no
// hydration mismatch risk — the static HTML is simply replaced).
//
// If this script fails for any reason, `vite build` has already succeeded
// and produced a working (un-prerendered) site — see the build command
// in netlify.toml for how the two are chained.

import { chromium } from "playwright";
import { createServer } from "http";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist", "public");
const PORT = 4173;

// ── 1. Work out every route to prerender ──────────────────────────────

function getBlogSlugs() {
  const postsSource = readFileSync(
    path.join(__dirname, "..", "client", "src", "data", "posts.ts"),
    "utf-8"
  );
  const matches = [...postsSource.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

const slugs = getBlogSlugs();

const routes = [
  "/",
  "/receptionist",
  "/calculator",
  "/blog",
  ...slugs.map((slug) => `/blog/${slug}`),
];

// ── 2. A tiny static server that mimics Netlify's own behaviour:  ─────
//      serve a real file if one exists, otherwise fall back to the
//      SPA shell at /index.html (same as the netlify.toml redirect).

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

async function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(DIST_DIR, urlPath);

  if (urlPath.endsWith("/")) filePath = path.join(filePath, "index.html");

  if (!existsSync(filePath)) {
    // Try appending /index.html (directory route with no trailing slash)
    const asDir = path.join(DIST_DIR, urlPath, "index.html");
    if (existsSync(asDir)) {
      filePath = asDir;
    } else {
      // SPA fallback — same as the netlify.toml redirect rule
      filePath = path.join(DIST_DIR, "index.html");
    }
  }

  try {
    const data = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

// ── 3. Where each route's captured HTML should be written ─────────────

function outputPathForRoute(route) {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, route.replace(/^\//, ""), "index.html");
}

// ── 4. Run it ───────────────────────────────────────────────────────

async function main() {
  console.log(`Prerendering ${routes.length} routes...`);

  const server = createServer(serveStatic);
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      // Make sure React has actually rendered something, not just loaded
      await page.waitForSelector("#root > *", { timeout: 15000 });

      const html = await page.content();
      const outPath = outputPathForRoute(route);

      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html);

      console.log(`  ✓ ${route} → ${path.relative(DIST_DIR, outPath)}`);
    } catch (err) {
      console.error(`  ✗ ${route} failed: ${err.message}`);
      // Don't fail the whole build over one route — the un-prerendered
      // SPA shell still works fine for that page, just without the
      // crawler benefit.
    }
  }

  await browser.close();
  server.close();
  console.log("Prerender complete.");
}

main().catch((err) => {
  console.error("Prerender script failed:", err);
  // Exit 0 on purpose: a prerender failure should not fail the whole
  // Netlify build. The site still works — it just falls back to
  // client-side-only rendering for crawlers, same as before this script
  // existed.
  process.exit(0);
});
