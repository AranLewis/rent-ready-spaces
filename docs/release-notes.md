# Release Notes

## 0.1.0 — 2026-08-20
Initial build.
- Eleventy static site scaffolded with a clean, fast, mobile-first layout (deliberately not the dark-glass app theme — a monetized content site prioritizes speed/trust/readability for SEO and AdSense approval).
- 5 seed blog posts published (locally): no-drill wall storage, over-door organizers, studio apartment organization, Command hook alternatives, closet organization.
- Policy pages added: About, Contact, Privacy Policy, Affiliate Disclosure, Terms.
- Monetization wiring: `_data/site.json` holds `amazonTag` / `adsenseClientId` as empty placeholders; the `affiliateLink` shortcode and AdSense includes read from this one file, so real IDs need to be set in exactly one place.
- `scripts/new-post.js` scaffolds new posts from a title, with leveled logging.
- `start.sh` installs dependencies and runs a local preview server.
- Content backlog of 15 future post topics queued in `todo.txt`.
- Not yet deployed publicly. Not yet monetized (placeholder IDs only).

See `docs/roadmap.md` for what's next and `MANUAL_STEPS.md` for the account-creation steps that need the site owner's personal action.
