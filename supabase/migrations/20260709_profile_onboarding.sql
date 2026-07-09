alter table public.profiles
  add column if not exists auth_user_id uuid,
  add column if not exists auth_provider text not null default 'google',
  add column if not exists email text,
  add column if not exists avatar_url text,
  add column if not exists nickname text,
  add column if not exists account_code text,
  add column if not exists onboarding_completed boolean not null default false;

create unique index if not exists profiles_auth_user_id_idx
  on public.profiles(auth_user_id)
  where auth_user_id is not null;

create unique index if not exists profiles_account_code_idx
  on public.profiles(account_code)
  where account_code is not null;
