# Supabase Setup

Moodbe currently runs as a deterministic presentation MVP. Supabase is prepared as an optional backend so diary records, shop state, profile cards, and owned items can be moved out of local browser state later.

## What Is Included

- `@supabase/supabase-js`
- `.env.example`
- `src/lib/supabaseClient.ts`
- `src/lib/supabaseRepository.ts`
- `supabase/schema.sql`

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
```

Use `VITE_USE_SUPABASE=true` only when the schema is created and you are ready to test backend reads/writes.

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

## 4. MVP Security Note

The included RLS policies are demo-friendly so the presentation webapp can be tested without auth. Before production, replace them with authenticated user policies.

Production direction:

- Add Supabase Auth.
- Tie every private row to `auth.uid()`.
- Restrict diary entries to the owner.
- Allow public profile reads only for approved cards.
- Keep raw diary content private.

## 5. Suggested Migration Order

1. Keep existing localStorage diary flow as fallback.
2. Add profile bootstrap.
3. Save diary entries to Supabase when enabled.
4. Move shop owned/equipped state to Supabase.
5. Move public profile cards and badges to Supabase.
6. Add auth and tighten RLS.

