# Supabase Setup

Moodbe currently runs as a deterministic presentation MVP. Supabase is prepared as an optional backend so diary records, shop state, profile cards, and owned items can be moved out of local browser state later.

## What Is Included

- `@supabase/supabase-js`
- `.env.example`
- `src/lib/supabaseClient.ts`
- `src/lib/supabaseRepository.ts`
- `supabase/schema.sql`
- `supabase/migrations/20260625_shop_progression.sql`
- `supabase/migrations/20260625_auth0_profile_link.sql`
- `supabase/migrations/20260709_profile_onboarding.sql`

The app still defaults to local demo behavior unless `VITE_USE_SUPABASE=true` and valid Supabase credentials are provided.

## 1. Create A Supabase Project

1. Create a project in Supabase.
2. Open Project Settings > API.
3. Copy:
   - Project URL
   - anon public key

## 2. Configure Local Env

Create `.env.local` from `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_USE_SUPABASE=false
VITE_USE_SUPABASE_AUTH=false
VITE_AUTH_REDIRECT_URL=
```

Use `VITE_USE_SUPABASE=true` only when the schema is created and you are ready to test backend reads/writes.
Use `VITE_USE_SUPABASE_AUTH=true` only after the Google provider is configured in Supabase Auth.

## 3. Create Database Tables

In the Supabase SQL editor, run:

```sql
-- paste contents of supabase/schema.sql
```

The schema includes:

- `profiles`
- `diary_entries`
- `shop_items`
- `profile_shop_items`
- `public_profile_cards`
- `experience_events`

CLI setup is also initialized in `supabase/config.toml`. If applying migrations from the terminal, use:

```bash
npx supabase login --token <supabase-access-token>
npx supabase link --project-ref <project-ref>
npx supabase db push
```

Codex cannot complete `supabase login` without a `SUPABASE_ACCESS_TOKEN`, because the desktop terminal is non-interactive.

## 4. MVP Security Note

The included RLS policies are demo-friendly so the presentation webapp can be tested without auth. Before production, replace them with authenticated user policies.

Production direction:

- Add Supabase Auth.
- Tie every private row to `auth.uid()`.
- Restrict diary entries to the owner.
- Allow public profile reads only for approved cards.
- Keep raw diary content private.

## 5. Supabase Auth + Google Login

The app now includes a small Supabase Auth status bar that is hidden by default in demo mode.

Dashboard setup:

1. Open Supabase Dashboard > Authentication > Providers.
2. Enable Google.
3. Add the Google OAuth client ID and client secret from Google Cloud Console.
4. Add local and deployed redirect URLs in Supabase Authentication > URL Configuration:
   - `http://127.0.0.1:5173`
   - deployed Vercel URL later
5. In `.env.local`, set:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_USE_SUPABASE=true
VITE_USE_SUPABASE_AUTH=true
VITE_AUTH_REDIRECT_URL=https://your-vercel-domain.vercel.app
```

The Google auth flow now supports profile bootstrap:

- First login creates or reuses one `profiles` row by `auth_user_id`.
- Google name/email/avatar are copied into the profile row.
- The user must complete a nickname onboarding screen before entering the app.
- `account_code` is generated once by the client and treated as an immutable account identifier.
- After onboarding, diary entries, XP/level/coins, purchases, and equipped items use `profiles.id`.

If Google login redirects to a local URL after deployment, check Supabase Dashboard > Authentication > URL Configuration:

- Set `Site URL` to the production Vercel URL.
- Add the production Vercel URL to `Redirect URLs`.
- Add local development URLs only as additional URLs, not as the production site URL.
- In Vercel, set `VITE_AUTH_REDIRECT_URL` to the same production URL and redeploy.

## 6. Suggested Migration Order

1. Keep existing localStorage diary flow as fallback. Done.
2. Add Google profile bootstrap and nickname onboarding. Done.
3. Save diary entries to Supabase for logged-in profiles. Done.
4. Move shop owned/equipped state to Supabase for logged-in profiles. Done.
5. Move public profile cards and badges to Supabase.
6. Tighten RLS from demo policies to authenticated owner policies.

For an existing Supabase project that already ran an older `schema.sql`, run migrations in this order:

1. `supabase/migrations/20260625_shop_progression.sql`
2. `supabase/migrations/20260625_auth0_profile_link.sql` only after Auth0 token handoff works
3. `supabase/migrations/20260709_profile_onboarding.sql` when using Supabase Auth + Google

## 7. Auth0 Integration

Auth0 was prepared as an earlier alternative. The current recommended path for Moodbe is Supabase Auth + Google because it keeps auth and database row ownership in one platform. If signup/login is implemented with Auth0 instead, read:

- `docs/auth0-supabase-plan.md`
- `supabase/migrations/20260625_auth0_profile_link.sql`

The base schema is not enough for Auth0 ownership by itself. The Auth0 migration adds `profiles.auth0_user_id` and owner-based policies. Run it only after Supabase Third-party Auth and the Auth0 ID-token handoff are working.
