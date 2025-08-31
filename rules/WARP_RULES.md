# Recovery Compass — Warp Agent Project Rules (Authoritative)

Prime Directives
- Single source of hero branding: background video provides logo/text; overlay contains CTA only.
- CTA placement: centered horizontally, ~15vh from bottom on desktop, ~18vh on mobile; respect iOS safe-area insets.
- Minimal app scope: keep only /, /begin, /adventure, /pathway-select, /environmental-quiz, /environmental-design, and */NotFound.
- Security-first solo-dev profile: least privilege; no plaintext secrets; non-interactive commands only.

Operational Guardrails
- Stack: Vite React SPA, Node ^18 | ^20; Amplify (prod) + Cloudflare DNS/CDN; no extra CI beyond Amplify.
- Dependencies: avoid adding; if essential, include one-line justification in PR.
- Git: archive uncertain removals to src/_archive/; work in feature branches; merge via PR.
- Assets: use /public/videos/compass-*.src.mp4 with cache-busting query when necessary.

Agent Behavior
- Use react-router-dom Link for SPA navigation; never window.location.
- Do not reintroduce overlay logos/titles on hero.
- Maintain .video-hero as flex column; align-items:center; justify-content:flex-end; bottom padding as specified.
- Use --no-pager for CLIs that page; avoid interactive steps.

Analytics
- Track page views for kept routes; track journey_choice on /begin (organization|individual).

Incident Response
- If duplicate branding appears: remove overlay branding and keep CTA only, or switch to verified raw video assets—never both.
- If caching suspected: hard-reload with DevTools disabled cache and bump ?v= on video sources.

