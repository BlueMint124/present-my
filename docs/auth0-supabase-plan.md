# Auth0 + Supabase Plan

This document is for the collaborator implementing signup/login with Auth0.

## Current Status

The current database is ready for demo data, but not yet connected to Auth0 users by default.

Already present:

- `profiles`
- `diary_entries`
- `shop_items`
- `profile_shop_items`
- `public_profile_cards`
- Optional Supabase client scaffold

Added for Auth0 preparation:

- `.env.example` Auth0 variables
- `supabase/migrations/20260625_auth0_profile_link.sql`

## Recommended Architecture

Use Auth0 for signup/login and Supabase for app data.

Identity mapping:

- Auth0 user identity: `user.sub`
- Moodbe user profile row: `profiles`
- Mapping column: `profiles.auth0_user_id`
- App data ownership: reference `profiles.id`

Do not store raw diary ownership directly with Auth0 IDs in every table. Keep Auth0 identity in `profiles`, then connect diary/shop/profile data through `profile_id`.

## Required Auth0 Setup

1. Create an Auth0 Single Page Application.
2. Set Allowed Callback URLs:
   - `http://127.0.0.1:5173`
   - deployed Vercel URL later
3. Set Allowed Logout URLs:
   - `http://127.0.0.1:5173`
   - deployed Vercel URL later
4. Set Allowed Web Origins:
   - `http://127.0.0.1:5173`
   - deployed Vercel URL later
5. Add an Auth0 Action that adds the `role` claim to the ID token:

```js
exports.onExecutePostLogin = async (event, api) => {
  api.idToken.setCustomClaim("role", "authenticated");
};
```

Supabase expects the literal `role` claim. Supabase's Auth0 guide recommends using the ID token because Auth0 strips non-namespaced custom claims from access tokens.

## Required Supabase Setup

1. Run `supabase/schema.sql` first for the base schema.
2. In Supabase Dashboard, add Third-party Auth integration for Auth0.
3. After the Auth0 login flow is working, run:

```sql
-- paste contents of supabase/migrations/20260625_auth0_profile_link.sql
```

Do not run the Auth0 migration before the frontend can provide an Auth0 ID token to Supabase, because it replaces permissive demo RLS policies with authenticated owner policies.

## Frontend Implementation Plan

1. Install Auth0 React SDK:

```bash
npm install @auth0/auth0-react
```

2. Add `.env.local` values:

```bash
VITE_AUTH0_DOMAIN=your-tenant.region.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-spa-client-id
VITE_AUTH0_AUDIENCE=
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_USE_SUPABASE=true
```

3. Wrap React root with `Auth0Provider`.
4. Add login/logout UI in a small, presentation-friendly place.
5. Build a profile bootstrap helper:
   - read Auth0 `user.sub`
   - find `profiles.auth0_user_id`
   - create a profile if missing
   - store/use returned `profiles.id`
6. Update Supabase client creation so it can pass the Auth0 ID token as the Supabase access token.
7. Connect diary save, shop ownership/equip state, and public profile cards using `profile_id`.

## Acceptance Criteria

- User can sign up/log in with Auth0.
- Logged-in user gets exactly one `profiles` row by `auth0_user_id`.
- Diary entries are saved with the logged-in user's `profile_id`.
- Shop purchases/equipped items are tied to `profile_id`.
- Public profile cards remain separate from private diary content.
- Existing presentation demo still works when Auth0 env vars are absent or disabled.
- `npm test` passes.
- `npm run build` passes.

## Collaborator Prompt

Use this prompt for the Auth0 collaborator Codex:

```text
You are implementing Auth0 signup/login for the Moodbe React/Vite app.

Before coding, read:
- agent.md
- docs/codex-collaboration.md
- docs/supabase-setup.md
- docs/auth0-supabase-plan.md
- supabase/schema.sql
- supabase/migrations/20260625_auth0_profile_link.sql

Goal:
Add Auth0 signup/login without breaking the current presentation MVP. Auth0 should identify users, and Supabase app data should be tied to `profiles.id`.

Important architecture:
- Auth0 user id is `user.sub`.
- Store it once in `profiles.auth0_user_id`.
- Diary/shop/profile data should reference `profiles.id`, not Auth0 IDs directly.
- Keep diary originals private.
- Do not expose private diary content in public profile.
- The app must still run in demo mode when Auth0/Supabase env vars are missing or disabled.

Supabase/Auth0 notes:
- Supabase Third-party Auth must be configured for Auth0.
- Auth0 ID token must include custom claim `role: authenticated`.
- Supabase client should receive the Auth0 ID token as its access token when backend mode is enabled.
- Do not run the Auth0 RLS migration until the token handoff is working.

Implementation steps:
1. Install `@auth0/auth0-react`.
2. Add Auth0 env handling.
3. Wrap the app with `Auth0Provider`.
4. Add login/logout UI.
5. Add profile bootstrap by `profiles.auth0_user_id`.
6. Connect profile id to future diary/shop/profile repository calls.
7. Add tests or safe smoke coverage where practical.
8. Run `npm test` and `npm run build`.

Report back with changed files, verification results, and any Auth0/Supabase dashboard settings the owner must configure manually.
```

## Sources

- Supabase Auth0 third-party auth guide: https://supabase.com/docs/guides/auth/third-party/auth0
- Auth0 React SDK docs: https://auth0.com/docs/libraries/auth0-react

