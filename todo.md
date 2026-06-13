# Present My Development TODO

## Current Status

- [x] Product concept refined from original planning note
- [x] Design spec written
- [x] Implementation plan written
- [x] GitHub remote connected
- [x] Visual concept image generated and saved
- [x] Agent rules documented
- [ ] Presentation webapp implemented
- [ ] Final visual QA completed
- [ ] Pushed to GitHub

## Reference Files

- `assets/reference/present-my-ui-concept.png`
- `docs/design-reference.md`
- `agent.md`
- `docs/superpowers/specs/2026-06-13-self-introduction-app-design.md`
- `docs/superpowers/plans/2026-06-13-present-my-webapp-implementation.md`

## Phase 1: Project Setup

- [ ] Create React + Vite + TypeScript app structure
- [ ] Add npm scripts for dev, test, build, preview
- [ ] Add Vitest and React Testing Library setup
- [ ] Add base sample data and shared types
- [ ] Add privacy helper that filters approved public profile items
- [ ] Add tests for sample data and public profile privacy

## Phase 2: Visual System

- [ ] Build app shell and navigation
- [ ] Apply visual style from `assets/reference/present-my-ui-concept.png`
- [ ] Define color variables: ivory, sage green, coral, butter yellow, mint, sky blue, charcoal
- [ ] Create reusable card, pill, button, and section styles
- [ ] Create Moodby character component or asset
- [ ] Verify the UI no longer looks like a wireframe

## Phase 3: Core Screens

- [ ] Home dashboard
  - [ ] Today's diary status
  - [ ] Weekly character progress
  - [ ] Character preview
  - [ ] Private-first reassurance
  - [ ] Weekly keywords

- [ ] Diary screen
  - [ ] Mood selector
  - [ ] Prompt fields
  - [ ] Free diary field
  - [ ] Private save CTA
  - [ ] Sample filled state for presentation

- [ ] Insights screen
  - [ ] Private analysis label
  - [ ] Repeated emotion metric
  - [ ] Taste keywords
  - [ ] Personality pattern
  - [ ] Self-introduction draft preview

- [ ] Character screen
  - [ ] Large Moodby visual
  - [ ] Weekly update state
  - [ ] Unlocked items
  - [ ] Badges
  - [ ] Room/customization preview
  - [ ] Next update timing

- [ ] Public profile screen
  - [ ] Public character card
  - [ ] Approved profile item list
  - [ ] Approval toggles/checks
  - [ ] Locked diary original row
  - [ ] Share link CTA
  - [ ] Name card/image CTA

- [ ] Expansion UI screen
  - [ ] Item shop UI
  - [ ] Ad reward UI
  - [ ] Payment guide UI
  - [ ] Achievement/reward UI
  - [ ] Clear UI-only labels

## Phase 4: Testing

- [ ] Navigation test
- [ ] Home screen smoke test
- [ ] Diary prompt test
- [ ] Privacy filtering test
- [ ] Public profile excludes diary original
- [ ] Expansion UI marks monetization features as UI-only
- [ ] `npm test` passes
- [ ] `npm run build` passes

## Phase 5: Browser QA

- [ ] Start dev server
- [ ] Open app in browser
- [ ] Verify desktop layout
- [ ] Verify mobile layout around 390px width
- [ ] Confirm no overlapping text or cards
- [ ] Confirm each screen's function is visually obvious
- [ ] Confirm design follows the generated reference image
- [ ] Confirm public profile does not expose diary original

## Phase 6: Delivery

- [ ] Add README with demo flow and commands
- [ ] Commit implementation
- [ ] Push to `origin`
- [ ] Prepare presentation talking points

