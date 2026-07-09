-- Moodbe Supabase schema
-- Run this in the Supabase SQL editor when you are ready to connect the MVP to a real project.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  auth_provider text not null default 'google',
  email text,
  avatar_url text,
  nickname text,
  account_code text unique,
  display_name text not null default 'Moodbe User',
  public_handle text unique,
  onboarding_completed boolean not null default false,
  avatar_item_id text,
  coin_balance integer not null default 320 check (coin_balance >= 0),
  level integer not null default 1 check (level >= 1),
  experience integer not null default 0 check (experience >= 0),
  total_diary_entries integer not null default 0 check (total_diary_entries >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_auth_user_id_idx
  on public.profiles(auth_user_id)
  where auth_user_id is not null;

create unique index if not exists profiles_account_code_idx
  on public.profiles(account_code)
  where account_code is not null;

create table if not exists public.diary_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  mood text not null,
  prompt text not null,
  content text not null,
  tags text[] not null default '{}',
  is_private boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.shop_items (
  id text primary key,
  name text not null,
  category text not null,
  description text not null,
  equip_slot text not null default 'head',
  price integer not null check (price >= 0),
  tag text not null,
  sheet_position text not null,
  purchasable boolean not null default false,
  required_level integer not null default 1 check (required_level >= 1),
  asset_key text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_shop_items (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  item_id text not null references public.shop_items(id) on delete cascade,
  equip_slot text,
  is_equipped boolean not null default false,
  purchased_at timestamptz not null default now(),
  primary key (profile_id, item_id)
);

create unique index if not exists profile_shop_items_equipped_slot_idx
  on public.profile_shop_items (profile_id, equip_slot)
  where is_equipped = true and equip_slot is not null;

create table if not exists public.public_profile_cards (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  diary_entry_id uuid references public.diary_entries(id) on delete set null,
  event_type text not null,
  experience_delta integer not null check (experience_delta > 0),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.diary_entries enable row level security;
alter table public.shop_items enable row level security;
alter table public.profile_shop_items enable row level security;
alter table public.public_profile_cards enable row level security;
alter table public.experience_events enable row level security;

-- Presentation MVP policies.
-- These are intentionally permissive for anon demo reads/writes.
-- Tighten them when auth is introduced.
create policy "demo profiles read" on public.profiles for select using (true);
create policy "demo profiles insert" on public.profiles for insert with check (true);
create policy "demo profiles update" on public.profiles for update using (true) with check (true);

create policy "demo diary read" on public.diary_entries for select using (true);
create policy "demo diary insert" on public.diary_entries for insert with check (true);

create policy "demo shop items read" on public.shop_items for select using (true);
create policy "demo owned items read" on public.profile_shop_items for select using (true);
create policy "demo owned items insert" on public.profile_shop_items for insert with check (true);
create policy "demo owned items update" on public.profile_shop_items for update using (true) with check (true);

create policy "demo public profile read" on public.public_profile_cards for select using (approved = true);
create policy "demo public profile write" on public.public_profile_cards for insert with check (true);
create policy "demo public profile update" on public.public_profile_cards for update using (true) with check (true);

create policy "demo experience events read" on public.experience_events for select using (true);
create policy "demo experience events insert" on public.experience_events for insert with check (true);

insert into public.shop_items (
  id,
  name,
  category,
  description,
  equip_slot,
  price,
  tag,
  sheet_position,
  purchasable,
  required_level,
  asset_key,
  is_active
)
values
  ('sprout-beret', '새싹 베레모', 'items', '무드비에게 포근한 새싹 포인트를 더해요.', 'head', 80, '착용', '0% 0%', false, 3, 'sprout-beret', true),
  ('cloud-cushion', '구름 쿠션', 'decorate', '일기 쓰는 공간에 말랑한 휴식감을 더해요.', 'background-floor-front', 80, '배경', '50% 0%', true, 1, 'cloud-cushion', true),
  ('warm-lamp', '따뜻한 스탠드', 'theme', '밤 일기 화면을 따뜻하게 밝혀주는 조명.', 'background-light', 120, '테마', '100% 0%', true, 2, 'warm-lamp', true),
  ('heart-mug', '하트 머그', 'items', '무드비의 차분한 루틴을 보여주는 머그컵.', 'hand', 90, '소품', '0% 100%', true, 2, 'heart-mug', true),
  ('picnic-blanket', '피크닉 담요', 'decorate', '주간 업데이트 화면을 피크닉처럼 꾸며요.', 'background-floor-back', 110, '배경', '50% 100%', false, 4, 'picnic-blanket', true),
  ('diary-badge', '기록 배지', 'package', '기록 보상과 공개 프로필에 어울리는 배지.', 'head', 150, '상징', '100% 100%', false, 5, 'diary-badge', true)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  equip_slot = excluded.equip_slot,
  price = excluded.price,
  tag = excluded.tag,
  sheet_position = excluded.sheet_position,
  purchasable = excluded.purchasable,
  required_level = excluded.required_level,
  asset_key = excluded.asset_key,
  is_active = excluded.is_active;
