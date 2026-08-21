#!/usr/bin/env node
// Scaffolds a new Markdown post under content/posts/ from a title.
// Usage: node scripts/new-post.js "Post Title Here" [--verbose]

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const verbose = args.includes("--verbose");
const title = args.filter((a) => !a.startsWith("--")).join(" ").trim();

const LEVELS = { ERROR: 0, INFO: 1, DEBUG: 2 };
const activeLevel = verbose ? LEVELS.DEBUG : LEVELS.INFO;

function log(level, message) {
  if (LEVELS[level] > activeLevel) return;
  const timestamp = new Date().toISOString(); // UTC
  console.log(`[${timestamp}] [${level}] ${message}`);
}

if (!title) {
  log("ERROR", "No title provided. Usage: node scripts/new-post.js \"Post Title\" [--verbose]");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const postsDir = path.join(__dirname, "..", "content", "posts");
const filePath = path.join(postsDir, `${slug}.md`);

log("DEBUG", `Resolved slug: ${slug}`);
log("DEBUG", `Target path: ${filePath}`);

if (fs.existsSync(filePath)) {
  log("ERROR", `A post already exists at ${filePath} — aborting.`);
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const template = `---
layout: post.njk
title: "${title}"
description: "TODO: one-sentence description for meta tags and the home page listing."
date: ${today}
tags: [storage, renters]
permalink: /blog/${slug}/
---
TODO: write the guide. Reminders:
- Original research/analysis only — no fabricated first-person testimonials (Amazon Associates policy).
- Use {% affiliateLink "https://www.amazon.com/s?k=SEARCH+TERMS", "link text", site.amazonTag %} for product links.
- Cross-link to 1-2 related existing posts at the bottom.
- Run the P0 compliance review task in todo.txt before publishing.
`;

fs.writeFileSync(filePath, template);
log("INFO", `Created ${filePath}`);
