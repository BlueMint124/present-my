-- Moodbe Auth0 profile ownership migration
--
-- Use this after:
-- 1. Supabase Third-party Auth is connected to the Auth0 tenant.
-- 2. Auth0 ID tokens include the custom claim: role = authenticated.
-- 3. The frontend sends the Auth0 ID token to Supabase.
--
-- This migration replaces the permissive demo policies from supabase/schema.sql
-- with authenticated owner policies. Do not run it until the Auth0 flow is ready.

alter table public.profiles
  add column if not exists auth0_user_id text unique,
  add column if not exists email text,
  add column if not exists picture_url text,
  add column if not exists last_login_at timestamptz;

create index if not exists profiles_auth0_user_id_idx
  on public.profiles (auth0_user_id);

create index if not exists diary_entries_profile_id_created_at_idx
  on public.diary_entries (profile_id, created_at desc);

create index if not exists public_profile_cards_profile_id_idx
  on public.public_profile_cards (profile_id);

create index if not exists experience_events_profile_id_created_at_idx
  on public.experience_events (profile_id, created_at desc);

drop policy if exists "demo profiles read" on public.profiles;
drop policy if exists "demo profiles insert" on public.profiles;
drop policy if exists "demo profiles update" on public.profiles;
drop policy if exists "demo diary read" on public.diary_entries;
drop policy if exists "demo diary insert" on public.diary_entries;
drop policy if exists "demo shop items read" on public.shop_items;
drop policy if exists "demo owned items read" on public.profile_shop_items;
drop policy if exists "demo owned items insert" on public.profile_shop_items;
drop policy if exists "demo owned items update" on public.profile_shop_items;
drop policy if exists "demo public profile read" on public.public_profile_cards;
drop policy if exists "demo public profile write" on public.public_profile_cards;
drop policy if exists "demo public profile update" on public.public_profile_cards;
drop policy if exists "demo experience events read" on public.experience_events;
drop policy if exists "demo experience events insert" on public.experience_events;

create policy "auth0 profiles owner read"
  on public.profiles
  for select
  to authenticated
  using (auth0_user_id = auth.jwt() ->> 'sub');

create policy "auth0 profiles owner insert"
  on public.profiles
  for insert
  to authenticated
  with check (auth0_user_id = auth.jwt() ->> 'sub');

create policy "auth0 profiles owner update"
  on public.profiles
  for update
  to authenticated
  using (auth0_user_id = auth.jwt() ->> 'sub')
  with check (auth0_user_id = auth.jwt() ->> 'sub');

create policy "auth0 diary owner read"
  on public.diary_entries
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = diary_entries.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 diary owner insert"
  on public.diary_entries
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = diary_entries.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 shop items read"
  on public.shop_items
  for select
  to authenticated
  using (true);

create policy "auth0 owned shop items owner read"
  on public.profile_shop_items
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = profile_shop_items.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 owned shop items owner insert"
  on public.profile_shop_items
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = profile_shop_items.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 owned shop items owner update"
  on public.profile_shop_items
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = profile_shop_items.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = profile_shop_items.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 public approved cards read"
  on public.public_profile_cards
  for select
  using (approved = true);

create policy "auth0 public profile cards owner insert"
  on public.public_profile_cards
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = public_profile_cards.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 public profile cards owner update"
  on public.public_profile_cards
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = public_profile_cards.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = public_profile_cards.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 experience events owner read"
  on public.experience_events
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = experience_events.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy "auth0 experience events owner insert"
  on public.experience_events
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = experience_events.profile_id
        and profiles.auth0_user_id = auth.jwt() ->> 'sub'
    )
  );
