# Manual Steps (Only You Can Do These)

Everything else in this project is built and committed. These specific steps need your real identity, accounts, or payment details, so I can't do them for you — and won't create accounts or agree to third-party terms on your behalf.

## 1. Get the site live (free, ~15-30 min) — ✅ done, live at https://aranlewis.github.io/rent-ready-spaces/
1. Create a free GitHub account if you don't have one, and a new repository (public).
2. Push this repo to it (ask me to do this in a session once you've created the repo — I'll need the remote URL; I won't create the GitHub repo itself since that requires your account).
3. Enable GitHub Pages (or connect the repo to Vercel/Netlify free tier — either works, both are $0) and point it at the Eleventy build output.
4. Once live, update `_data/site.json`'s `url` field and `robots.txt`'s `Sitemap:` line from the `example.com` placeholder to your real URL, then redeploy.

Optional: buy a real domain (~$10-15/year) instead of using the free subdomain GitHub Pages/Vercel gives you. This is the one step in this whole project that costs money, and it's optional — skip it if you want to stay at true $0.

## 2. Apply for Google AdSense (free, needs your identity + bank info)
- Go to https://adsense.google.com, sign up with a Google account.
- You'll need: the live site URL, your legal name/address, and eventually bank details for payout.
- Apply once the site has meaningful original content — 5 posts is thin; consider working through a chunk of the `todo.txt` backlog first to improve approval odds.
- Once approved, put your publisher ID and ad slot IDs into `_data/site.json` (`adsenseClientId`, `adsenseSlotHome`, `adsenseSlotPost`).

## 3. Apply for Amazon Associates (free, needs your identity + bank/tax info) — ✅ done, tag `rentreadyspac-20` live
- Go to https://affiliate-program.amazon.com, sign up with your Amazon account.
- Needs a live site with real content (have this ready before applying).
- Note: Amazon requires 3 qualifying sales within 180 days of approval, or the account closes — so it's worth timing this for when the site has some real traffic rather than applying on day one.
- Once approved, put your tracking tag into `_data/site.json`'s `amazonTag` field — every affiliate link on the site uses this one value automatically.

## 4. Connect Google Search Console (free)
- Go to https://search.google.com/search-console, verify your live site.
- Submit `/sitemap.xml` so Google indexes your posts faster.

## 5. Review the legal pages
`content/pages/privacy-policy.md` and `terms.md` are good-faith templates, not legal advice. Before real traffic/ads go live, a quick read against current AdSense policy and any GDPR/CCPA obligations relevant to your audience is worth doing.

## 6. Post to Pinterest (free, needs your identity — this is the one part I can't do)
Pin images and copy are already generated: `pinterest/images/*.png` (1000x1500, ready to upload) and `pinterest/pin-copy.md` (suggested title, description, and destination URL for each). I can't create the account or actually pin — Pinterest requires your login and doesn't offer a no-cost API path for posting on your behalf.
1. Create a free Pinterest Business account at https://www.pinterest.com/business/create/.
2. Create the 4 boards suggested at the top of `pinterest/pin-copy.md`.
3. For each post: upload its PNG from `pinterest/images/`, paste in the suggested title/description from `pinterest/pin-copy.md`, and set the destination link to the post's URL (also listed there).
4. Regenerate images/copy any time new posts are added: `node scripts/generate-pins.js --verbose`.

To claim the site on Pinterest (adds a verified badge and analytics — optional but worth doing once you're pinning regularly): Pinterest Settings → Claim → add the HTML verification tag or DNS record they give you. That would need a small code change on my end (one meta tag in `_includes/base.njk`) — just paste me the tag when you have it.

---

None of the above is required to preview or keep developing the site locally — only to make it public and turn on monetization.
