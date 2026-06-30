-- Moodbe shop progression migration
-- Adds deployable shop economy/progression fields while keeping existing data.

alter table public.profiles
  add column if not exists level integer not null default 1 check (level >= 1),
  add column if not exists experience integer not null default 0 check (experience >= 0),
  add column if not exists total_diary_entries integer not null default 0 check (total_diary_entries >= 0);

alter table public.shop_items
  add column if not exists required_level integer not null default 1 check (required_level >= 1),
  add column if not exists asset_key text,
  add column if not exists is_active boolean not null default true;

create table if not exists public.experience_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  diary_entry_id uuid references public.diary_entries(id) on delete set null,
  event_type text not null,
  experience_delta integer not null check (experience_delta > 0),
  created_at timestamptz not null default now()
);

alter table public.experience_events enable row level security;

create policy "demo experience events read"
  on public.experience_events
  for select
  using (true);

create policy "demo experience events insert"
  on public.experience_events
  for insert
  with check (true);

create index if not exists experience_events_profile_id_created_at_idx
  on public.experience_events (profile_id, created_at desc);

update public.shop_items
set required_level = values.required_level,
    asset_key = values.asset_key,
    is_active = true
from (
  values
    ('cloud-cushion', 1, 'cloud-cushion'),
    ('heart-mug', 2, 'heart-mug'),
    ('warm-lamp', 2, 'warm-lamp'),
    ('sprout-beret', 3, 'sprout-beret'),
    ('picnic-blanket', 4, 'picnic-blanket'),
    ('diary-badge', 5, 'diary-badge')
) as values(id, required_level, asset_key)
where shop_items.id = values.id;
