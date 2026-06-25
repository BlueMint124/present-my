# Codex Collaboration Guide

This repository is developed by the owner and collaborators using Codex. The goal of this document is to keep every Codex session aligned on product context, current decisions, and safe engineering workflow.

## Read This First

Every Codex working on this project should read these files before making changes:

1. `agent.md`
2. `docs/codex-collaboration.md`
3. `docs/design-reference.md`
4. `todo.md`
5. `docs/supabase-setup.md`
6. `docs/auth0-supabase-plan.md` if touching signup, login, user identity, or ownership
7. Recent commits: `git log --oneline -8`

For UI work, also inspect the existing screen/component files and the reference image at `assets/reference/present-my-ui-concept.png`.

## Shared Product Context

- App name: `Moodbe`
- Current deliverable: presentation-ready mobile-style webapp MVP
- Future direction: expand into a real mobile application later
- Core loop: private diary -> self-understanding analysis -> Moodbe character growth -> approved public profile -> optional sharing
- Privacy rule: diary originals stay private; public profile only shows approved/shareable content
- Monetization screens such as shop, ads, payment, achievements are presentation/demo UI unless the owner changes scope

## Current Tech Stack

- React
- TypeScript
- Vite
- Plain CSS in `src/styles.css`
- Vitest + React Testing Library
- Browser `localStorage` for demo diary persistence
- Optional Supabase backend setup for future diary/shop/profile persistence
- Static image assets imported from `src/assets`
- GitHub remote with Vercel-style automatic deployment after push

## Collaboration Rules

1. Work in small, logical changes.
2. Before editing, check `git status --short` and avoid overwriting unrelated user or collaborator changes.
3. Prefer existing patterns over new abstractions.
4. Keep UI consistent with the current Moodbe visual language: warm ivory, sage, coral/yellow/mint/sky accents, soft tactile cards, polished mascot feel.
5. Do not add backend/auth/payment/ad integrations unless explicitly requested.
6. Preserve generated visual assets and reference docs.
7. If you change product decisions, naming, visual direction, setup, or collaboration workflow, update the relevant docs in the same commit.
8. If you touch user-facing behavior, add or update tests when practical.
9. Before saying work is complete, run:
   - `npm test`
   - `npm run build`
10. After committing, push the branch only if the owner asked for remote/Vercel reflection or the current workflow clearly expects it.

## Git Rules

- Default branch/worktree branch used by Codex: `codex/present-my-webapp`
- Keep commits atomic and named clearly, for example:
  - `fix: stabilize diary bookshelf layout`
  - `feat: polish moodbe profile sharing`
  - `docs: add codex collaboration guide`
- Do not use destructive commands such as `git reset --hard`, force-push, or checkout-overwrite unless the owner explicitly approves.
- If another collaborator has pushed new commits, pull/rebase carefully and resolve conflicts by preserving both intents whenever possible.

## Context Handoff Format

When ending a session or handing off to another Codex, summarize:

- Branch and latest commit hash
- What changed
- What tests/build commands passed
- Any known visual issues or limitations
- What should be worked on next
- Files that matter for the next task

Suggested handoff template:

```md
Branch: codex/present-my-webapp
Latest commit: <hash> <message>

Completed:
- ...

Verified:
- npm test
- npm run build

Known issues:
- ...

Next suggested work:
- ...

Important files:
- ...
```

## Prompt For A Collaborator Codex

Use this prompt when starting another Codex session with a collaborator:

```text
You are collaborating on the Moodbe project with another Codex/user team.

Repository context:
- App: Moodbe
- Goal: presentation-ready mobile-style webapp MVP for a private diary/self-understanding app.
- Flow: private diary -> analysis -> character growth -> approved public profile -> sharing.
- Tech stack: React, TypeScript, Vite, plain CSS, Vitest + React Testing Library, localStorage demo persistence.
- Remote: https://github.com/BlueMint124/present-my.git
- Main Codex work branch: codex/present-my-webapp

Before making changes:
1. Read `agent.md`.
2. Read `docs/codex-collaboration.md`.
3. Read `docs/design-reference.md`.
4. Read `docs/supabase-setup.md` if touching persistence, diary storage, shop state, or profile data.
5. Read `docs/auth0-supabase-plan.md` if touching signup, login, user identity, or ownership.
6. Check `todo.md`.
7. Run `git status --short`.
8. Review recent commits with `git log --oneline -8`.

Working rules:
- Preserve diary privacy: original diary content must not appear in public profile.
- Keep monetization/payment/ad/shop features UI-only unless explicitly asked.
- Follow the current Moodbe visual style: warm ivory, sage green, soft cards, polished cute mascot, not generic dashboard UI.
- Do not overwrite unrelated changes from the owner or another collaborator.
- Keep commits small and logical.
- Add/update tests for behavior changes when practical.
- Before finalizing, run `npm test` and `npm run build`.
- If product direction, naming, design rules, setup, or collaboration workflow changes, update docs in the same commit.

When done, report:
- Changed files and summary
- Test/build results
- Commit hash
- Any follow-up work or known risks
```
