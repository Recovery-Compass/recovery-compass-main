Title: RC/ERD – Auto-Context Sync (Real-Time, One-Shot)
Scope: Recovery-Compass/recovery-compass-main (Cloudflare Pages prod at erdmethod.org)

Prime: Use fresh, one‑shot context every run; no background daemons/polling.
Sources of truth (pull in this order each invocation):
1) Git state: current branch, HEAD, staged diffs, src/App.tsx routes, public assets.
2) Project rules: WARP.md (repo), this Rule, CBM v5.0 (Warp Drive/Docs).
3) Cloudflare Pages config: build_command, env (BUN_VERSION=1.2.19), recent deploy status/logs.
4) Secrets: macOS Keychain only (never echo); e.g., CLOUDFLARE_API_TOKEN.
5) OneDrive is canonical for WFD artifacts; avoid Google Drive by default.

Runtime & build:
- Package manager: Bun 1.2.19; lockfile: bun.lockb; installs must use --frozen-lockfile.
- Cloudflare Pages: Framework: None; Build: "bun install --frozen-lockfile && bun run build"; Output: dist; Root: /.
- Netlify (if used): ensure mise + .tool-versions/.mise.toml; build runs "mise install && bun …".

Safety & execution:
- Secrets: retrieve at runtime via Keychain; never print or commit.
- Changes: minimal diffs only; no formatting churn; ask before DNS/Workers/CI edits.
- No background jobs; on-demand commands only. Destructive actions require itemized confirmation.

Routing & UX:
- Maintain React Router v6 routes in src/App.tsx with 404 catch-all.
- Critical path includes /assessment-transition; verify end-to-end before merge.
- Follow docs/style.md for design tokens; ensure WCAG 2.1 AA.

Decision gates (before merge to main):
- Preview build green; logs show bun@1.2.19 + frozen-lockfile install
- No 404s on new routes; logo/brand assets render; no console errors
- Bundle changes acknowledged; consider lazy/code-splitting separately

