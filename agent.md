# Agent Rules for Moodbe

## Mission

Build a presentation-ready webapp MVP for `Moodbe`, a private diary-based self-understanding app that creates an approved public character profile.

The app is originally intended to become a mobile application later, but the current deliverable is a polished webapp for presentation.

## Primary References

Always check these before implementation:

- `docs/superpowers/specs/2026-06-13-self-introduction-app-design.md`
- `docs/superpowers/plans/2026-06-13-present-my-webapp-implementation.md`
- `docs/design-reference.md`
- `assets/reference/present-my-ui-concept.png`

The visual reference image is the UI quality target. Do not treat the earlier `ui-design-board.html` as the final aesthetic target; it is a structural draft only.

## Product Principles

1. Diary originals are private.
2. AI may suggest public profile content, but users approve what gets shared.
3. The character is the visible expression of diary-derived patterns.
4. The weekly character update is the main retention loop.
5. Shop, ads, payments, and achievements are UI-only for presentation.
6. The webapp must be stable and deterministic during presentation.

## Visual Rules

- Follow the `Moodbe` visual reference image.
- Use a warm ivory base, sage green primary, and coral/yellow/mint/sky accents.
- Make Moodbe feel soft, cozy, memorable, and suitable as a mascot.
- Avoid generic dashboard styling.
- Avoid gray wireframes, placeholder boxes, and overly flat layouts.
- Avoid childish game UI; the design should be cute but polished.
- Use cards, soft shadows, tactile surfaces, and clear visual hierarchy.
- Each screen must show its purpose immediately.

## Architecture Rules

- Use React + Vite + TypeScript as planned.
- Prefer deterministic sample data over backend calls.
- Keep analysis and profile filtering logic pure and testable.
- Do not add a backend unless the user explicitly changes scope.
- Do not implement real auth, payment, ad, or purchase flows for the presentation MVP.
- UI-only expansion screens must be clearly marked as planned/demo features.

## Privacy Rules

- Never show diary original text in the public profile.
- Public profile data must pass through an approval/filtering step.
- Tests should verify that the private diary item is not included in approved public profile output.
- Any copy around sharing should reassure the user that only approved content is shared.

## Engineering Workflow

- Keep changes scoped and commit in small logical units.
- Run tests after meaningful changes.
- Run `npm run build` before claiming the webapp is ready.
- Use browser QA for final visual verification.
- Check desktop and mobile layouts.
- Preserve existing planning and design docs.
- Do not delete generated reference assets.

## Presentation Priorities

The demo should tell this story:

1. The user writes a private diary.
2. The app extracts self-understanding patterns.
3. The character changes based on weekly patterns.
4. The user approves what becomes public.
5. The public character profile can be shared.
6. Future monetization exists through cosmetic items, ads, payments, and achievements.

If a tradeoff appears, prioritize presentation clarity and visual polish over production completeness.

