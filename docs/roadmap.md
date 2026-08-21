# Roadmap

Realistic dates assume the user follows through on the manual steps in `MANUAL_STEPS.md` promptly; content-only steps can happen in future Claude Code sessions on request ("write the next 3 posts").

## Phase 1 — Go live (target: within ~1-2 weeks of this build, pace depends on the user)
- Complete the manual account/deploy steps in `MANUAL_STEPS.md`: domain decision, GitHub repo + Pages/Vercel deploy, replace placeholder domain in `_data/site.json` and `robots.txt`.
- Site is publicly reachable with the 5 seed posts + policy pages.

## Phase 2 — Content buildout (target: ~2-3 months)
- Work through the 15-topic backlog in `todo.txt`, roughly 2-4 new posts/month, each reviewed against the P0 compliance checklist before publishing.
- Submit sitemap to Google Search Console once the user has connected their account.

## Phase 3 — Monetization activation (target: as soon as each program approves — realistically 4-8+ weeks after go-live, once there's enough original content)
- Apply for Google AdSense; once approved, set `adsenseClientId`/ad slot IDs in `_data/site.json`.
- Apply for Amazon Associates; once approved, set the real `amazonTag` in `_data/site.json` — this alone activates commission tracking on every existing affiliate link site-wide.
- Amazon Associates requires 3 qualifying sales within 180 days of approval or the account closes — worth timing the application for when there's enough traffic to plausibly hit that.

## Phase 4 — Iterate on what's working (ongoing)
- After 3-6 months of data: check Search Console for which posts/keywords are actually getting impressions, and weight new content toward what's already gaining traction rather than the original backlog order.
- Reassess whether a real domain (vs. a free subdomain) or minor design/CWV (Core Web Vitals) improvements are worth the effort at that point.

## Explicitly out of scope unless requested
- Paid traffic/ads (contradicts the $0 budget starting constraint)
- A second niche/site (validate this one first)
- Any automation that calls a paid LLM API on a schedule (would break the $0 budget — content generation stays a per-session, human-reviewed activity)
