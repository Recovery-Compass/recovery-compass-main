# WARP Project Rules — Recovery Compass (SPA)

Last updated: 2025-10-03
Scope: This file applies to the repository at this path and its subdirectories. When multiple WARP.md files exist, prefer subdirectory rules over root rules; otherwise, apply these in conjunction with your Global Rules.

---

## Protocol and Safety

- Signal First: Always respond with a brief action summary first, then a short explanation, then technical details clearly separated.
- Default to the safest path; ask before risky changes. If in doubt, prompt for confirmation.
- NEVER create background daemons, cron jobs, scheduled tasks, or short-interval polling. Prefer on-demand, one-shot scripts. Use event-driven OS hooks only when truly event-driven.
- OS safety: Never propose `rm -rf` unless the exact paths are itemized and confirmed. Never kill critical processes (`kernel_task`, `WindowServer`, `launchd`). Prefer graceful `SIGTERM` before `SIGKILL` when advising process remediation.
- Pager safety: When showing VCS output, use non-paginated commands (e.g., `git --no-pager diff`, `git --no-pager log`).

## Secrets and Credentials

- Never echo secrets in plaintext. Store and retrieve secrets via macOS Keychain only:
  - Store: `security add-generic-password -a "$USER" -s <SERVICE_NAME> -w <SECRET> -U`
  - Retrieve: `security find-generic-password -a "$USER" -s <SERVICE_NAME> -w`
- Do not hardcode secrets in code, config, or .env committed to git. Avoid environment files; prefer runtime injection via Keychain lookups or platform secrets (Amplify/App settings). 

## Project Stack and Build

- Frontend: Vite + React SPA.
- Node version: pin engines to ^18 or ^20.
- Build output: `dist/` (must be ignored by git and never indexed for AI context).
- Dependency governance: Avoid adding dependencies. If unavoidable, require a single-sentence justification and obtain explicit approval before adding.
- .gitignore MUST include: `node_modules`, `dist`, `.env`.
- Build steps (do not run without user consent):
  - `npm ci`
  - `npm run build`

## CI/CD and Infrastructure

- CI/CD: AWS Amplify only for this SPA. Do not add or suggest GitHub Actions unless explicitly approved.
- DNS/CDN: Cloudflare only. Do not introduce Cloudflare Workers unless explicitly requested.
- Release protocol: Do not auto-deploy. Surface a plan and await explicit confirmation before any deploy or cache invalidation steps.

## Source Control and Indexing

- Prefer `git --no-pager` for all display commands. Do not run commands that page or require interactivity.
- Respect repository boundaries. Avoid editing generated files. Never commit build artifacts.
- Codebase context: Ensure Warp’s Codebase Index excludes `dist/`, `node_modules/`, `.env` (maintain `.warpindexingignore`).

## Data Sync and File Providers (macOS)

- OneDrive is primary for Whittier First Day. Google Drive is on-demand only; quit it when not needed. If both are active, prefer OneDrive and suggest quitting Google Drive to reduce `fileproviderd` load.
- When asked to diagnose high CPU on macOS, never propose background monitors. Prefer manual, one-shot diagnostics and remediation.
- If advising File Provider troubleshooting, instruct to quit the parent sync apps first (OneDrive/Google Drive) before considering terminating `fileproviderd`. Only if necessary, terminate `fileproviderd` with `SIGTERM`, allowing macOS to restart it.

## Agent Autonomy and Execution Policy

- Executing commands: Always prompt for confirmation.
- Editing code (apply diffs): Always prompt for confirmation and show a minimal diff.
- Network operations (curl, API calls): Always prompt for confirmation; never include secrets inline—reference Keychain retrieval instead.
- Package changes (npm/pnpm/bun add): Require explicit approval and one-line justification.

## Frontend Conventions

- Keep React components small and composable; avoid introducing heavy state libraries without need and approval.
- Prefer TypeScript strictness already configured; do not relax tsconfig without approval.
- Lint/format: Follow repository tools; do not add new linters/formatters.

## Deployment Guardrails

- Amplify: Deploy only after successful local build and explicit user confirmation.
- Cloudflare: DNS/CDN changes require explicit approval; present a plan first (e.g., page rules, cache behavior). Do not mutate DNS as part of “fix” flows.

## Incident Response (SRE mindset)

- Follow “proactive offense” principle: propose preventive steps that do not add ongoing maintenance.
- For CPU or OS anomalies, propose one-shot diagnostics and remediation with clear rollback. No continuous agents.
- Logging and post-mortem: If asked to log incidents, recommend Google Sheets webhook via Apps Script with URL stored in Keychain (manual trigger only).

## What NOT to Propose by Default

- No background agents, no cron jobs, no short-interval polling.
- No additional CI/CD providers.
- No Cloudflare Workers unless explicitly requested.
- No secrets in code, env files, or prompts.

---

### Quick Reference (for the Agent)

- Use: `git --no-pager` always.
- Ask before: `kill`, `killall`, `launchctl`, `pluginkit`, `curl`, `npm install`, any code diff.
- Never: destructive `rm -rf` without explicit, itemized confirmation.
- Secrets: Use Keychain (never echo). 
- Node: ^18 or ^20; build to `dist/` only on request.
- CI/CD: Amplify only; plan before action; do not auto-deploy.
- DNS/CDN: Cloudflare only; no Workers unless asked.
- Sync: OneDrive primary; Google Drive on-demand; prefer quitting providers when not needed.
