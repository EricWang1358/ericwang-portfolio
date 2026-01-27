---
name: project-maintenance
version: 1.0.0
description: |
  Project maintenance skill: after each feature/change is implemented, automatically update docs (updates/todo), run cross-checks (routes/build/links), and propose a safe commit/push.
triggers:
  - "完成这个功能后请收尾"
  - "收尾一下"
  - "更新已办待办"
  - "update docs"
  - "release notes"
  - "changelog"
---

# Project Maintenance (DoD)

## Scope

Applies whenever a user-facing feature, content update, new page, dependency change, or deploy-related change is made.

## DoD Checklist (must run in this order)

### 1) Change summary (internal)

- Identify the user-visible outcome.
- Identify files changed and any likely impacted routes.

### 2) Docs update (repo tracked)

- Update `docs/已办更新.md`
  - Append a new dated entry.
  - Record: Added / Improved / Fixed.
  - Avoid sensitive personal info.
- Update `docs/待办清单.md`
  - Mark completed items.
  - Add new follow-ups discovered during implementation.
  - Keep P1/P2/P3 ordering.

### 3) Cross-checks

- Routing: confirm new pages are reachable via intended entry points.
- UI: confirm desktop + mobile layout sanity (nav, spacing).
- Theme: check light/dark readability for new UI.
- Links: external links use `rel="noopener noreferrer"`.
- Build: run `npm run build`.

### 4) Privacy guardrails

- Never publish: IDs, address, student number, transcripts, QR codes.
- Never commit: `.env*`, tokens, API keys.
- If contact info is public, keep it limited to networking links.

### 5) Release + deploy

- Stage changes (`git add .`).
- Create a commit message following:
  - `feat:` new capability
  - `fix:` bug fix
  - `docs:` documentation-only
  - `chore:` tooling/build
- Push to `main`.
- Verify Netlify deploy succeeded (Deploys page) and the production URL renders the new content.

## Output format

When this skill runs, output:

- What changed (1-3 bullets)
- Docs updated (which sections)
- Checks performed (routes/build/links)
- Next todo items (if any)
