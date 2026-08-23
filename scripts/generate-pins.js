#!/usr/bin/env node
// Generates Pinterest pin images (1000x1500, the recommended 2:3 ratio) for
// every post in content/posts/, plus a pin-copy.md reference with suggested
// titles/descriptions/boards. Uses Chrome's built-in headless screenshot
// mode (already installed) instead of adding a new dependency.
// Usage: node scripts/generate-pins.js [--verbose]

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const verbose = process.argv.includes("--verbose");
const LEVELS = { ERROR: 0, INFO: 1, DEBUG: 2 };
const activeLevel = verbose ? LEVELS.DEBUG : LEVELS.INFO;
function log(level, message) {
  if (LEVELS[level] > activeLevel) return;
  console.log(`[${new Date().toISOString()}] [${level}] ${message}`);
}

const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const HTML_DIR = path.join(ROOT, "pinterest", "html");
const IMAGES_DIR = path.join(ROOT, "pinterest", "images");
const SITE_BASE_URL = "https://aranlewis.github.io/rent-ready-spaces";
const CHROME_BIN = "google-chrome";

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return data;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFontSize(title) {
  if (title.length <= 40) return 76;
  if (title.length <= 65) return 62;
  return 52;
}

function buildPinHtml(title, description) {
  const fontSize = titleFontSize(title);
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1000px; height: 1500px; font-family: Georgia, 'Times New Roman', serif; }
  .pin { width: 1000px; height: 1500px; display: flex; flex-direction: column; }
  .top {
    flex: 0 0 62%;
    background: linear-gradient(160deg, #2f6b4f, #234f3b);
    display: flex; flex-direction: column; justify-content: center;
    padding: 70px 64px;
  }
  .eyebrow {
    color: #b7e3c9; font-family: -apple-system, Helvetica, Arial, sans-serif;
    font-size: 26px; font-weight: 700; letter-spacing: 3px;
    margin-bottom: 28px; text-transform: uppercase;
  }
  .title {
    color: #ffffff; font-size: ${fontSize}px; font-weight: 700;
    line-height: 1.18; font-family: Georgia, 'Times New Roman', serif;
  }
  .bottom {
    flex: 1; background: #ffffff; display: flex; flex-direction: column;
    justify-content: space-between; padding: 48px 64px 56px;
  }
  .description {
    color: #3a3a3a; font-size: 32px; line-height: 1.45;
    font-family: -apple-system, Helvetica, Arial, sans-serif;
  }
  .brand {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 3px solid #e4e2de; padding-top: 28px;
  }
  .brand-name {
    color: #2f6b4f; font-size: 30px; font-weight: 700;
    font-family: -apple-system, Helvetica, Arial, sans-serif;
  }
  .cta {
    color: #5b5b5f; font-size: 26px; font-family: -apple-system, Helvetica, Arial, sans-serif;
  }
</style></head>
<body>
  <div class="pin">
    <div class="top">
      <div class="eyebrow">Renter-Friendly Storage</div>
      <div class="title">${escapeHtml(title)}</div>
    </div>
    <div class="bottom">
      <div class="description">${escapeHtml(description)}</div>
      <div class="brand">
        <div class="brand-name">Rent-Ready Spaces</div>
        <div class="cta">Read the full guide &rarr;</div>
      </div>
    </div>
  </div>
</body></html>`;
}

function suggestPinTitle(title) {
  // Pinterest titles perform best under ~100 chars and benefit-led; the post
  // titles here are already written that way, so reuse as-is.
  return title.length <= 100 ? title : title.slice(0, 97) + "...";
}

function suggestPinDescription(title, description) {
  const base = `${description} Full guide with buying tips and comparisons on Rent-Ready Spaces.`;
  const tags = "#RenterFriendly #SmallSpaceLiving #ApartmentStorage #NoDrillDecor #OrganizationIdeas";
  return `${base} ${tags}`;
}

function main() {
  if (!fs.existsSync(HTML_DIR)) fs.mkdirSync(HTML_DIR, { recursive: true });
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  log("INFO", `Found ${files.length} posts.`);

  const pinRows = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title || !fm.description) {
      log("ERROR", `Skipping ${file}: missing title/description in frontmatter.`);
      continue;
    }

    const html = buildPinHtml(fm.title, fm.description);
    const htmlPath = path.join(HTML_DIR, `${slug}.html`);
    fs.writeFileSync(htmlPath, html);
    log("DEBUG", `Wrote ${htmlPath}`);

    const pngPath = path.join(IMAGES_DIR, `${slug}.png`);
    execFileSync(CHROME_BIN, [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      `--screenshot=${pngPath}`,
      "--window-size=1000,1500",
      `file://${htmlPath}`,
    ]);
    log("INFO", `Rendered ${slug}.png`);

    pinRows.push({
      slug,
      pinTitle: suggestPinTitle(fm.title),
      pinDescription: suggestPinDescription(fm.title, fm.description),
      url: `${SITE_BASE_URL}${fm.permalink}`,
      image: `pinterest/images/${slug}.png`,
    });
  }

  const boards = `## Suggested Pinterest boards to create first
- "Renter-Friendly Storage Ideas" (general — most pins fit here)
- "Small Apartment & Studio Organization"
- "No-Drill Wall Decor & Storage"
- "Dorm & Shared Space Organization"

`;

  const md = [
    "# Pinterest Pin Copy Reference",
    "",
    "Generated from content/posts/ — one entry per post, in the same order as the site.",
    "Each pin image is in pinterest/images/<slug>.png (1000x1500, ready to upload as-is).",
    "",
    boards,
    ...pinRows.map(
      (r) => `## ${r.slug}
- **Image:** \`${r.image}\`
- **Destination URL:** ${r.url}
- **Pin title:** ${r.pinTitle}
- **Pin description:** ${r.pinDescription}
`
    ),
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, "pinterest", "pin-copy.md"), md);
  log("INFO", `Wrote pinterest/pin-copy.md with ${pinRows.length} entries.`);
}

main();
