# User Manual (Site Owner's Guide)

This is for you, the site owner — how to preview, edit, and extend the site day-to-day.

## Preview the site locally
```
./start.sh
```
Installs dependencies (first run only) and starts a local preview at `http://localhost:8080`. Refuses to start if port 8080 is already in use — stop whatever's using it first.

## Add a new blog post
```
node scripts/new-post.js "Your Post Title" --verbose
```
Creates a pre-filled Markdown file in `content/posts/` with the right frontmatter and a reminder checklist. Fill in the body, replace the placeholder `affiliateLink` search terms, and check it against the P0 compliance task in `todo.txt` before considering it published.

Alternatively, in a Claude Code session, just ask: "write the next post from the todo.txt backlog."

## Edit an existing post
Open the file in `content/posts/`, edit the Markdown, save. Refresh the local preview to see changes (Eleventy's `--serve` mode live-reloads).

## Change site-wide settings
Edit `_data/site.json`:
- `title`, `description` — used across every page's `<title>` and meta tags
- `url` — your real domain once you have one (currently a placeholder)
- `amazonTag` — your real Amazon Associates tracking ID once approved; this alone activates commission tracking on every existing affiliate link
- `adsenseClientId`, `adsenseSlotHome`, `adsenseSlotPost` — your real AdSense IDs once approved

## Build for deployment
```
npx eleventy
```
Outputs static HTML to `_site/` — this is the folder any static host (GitHub Pages, Netlify, Vercel) serves.

## Where things live
- `content/posts/` — blog articles
- `content/pages/` — About/Contact/Privacy/Disclosure/Terms
- `_includes/` — shared page layouts (base, post, page)
- `assets/css/style.css` — all site styling, one file
- `_data/site.json` — the one config file for site-wide settings and monetization IDs

## What only you can do
See `MANUAL_STEPS.md` at the project root — account creation, domain, and deployment steps that require your personal identity/accounts.
