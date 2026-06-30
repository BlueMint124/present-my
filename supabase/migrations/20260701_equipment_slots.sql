alter table public.shop_items
  add column if not exists equip_slot text not null default 'head';

alter table public.profile_shop_items
  add column if not exists equip_slot text;

create unique index if not exists profile_shop_items_equipped_slot_idx
  on public.profile_shop_items (profile_id, equip_slot)
  where is_equipped = true and equip_slot is not null;

update public.shop_items
set equip_slot = case id
  when 'sprout-beret' then 'head'
  when 'cloud-cushion' then 'background-floor-front'
  when 'warm-lamp' then 'background-light'
  when 'heart-mug' then 'hand'
  when 'picnic-blanket' then 'background-floor-back'
  when 'diary-badge' then 'head'
  else equip_slot
end;

update public.profile_shop_items owned
set equip_slot = items.equip_slot
from public.shop_items items
where owned.item_id = items.id
  and owned.equip_slot is null;
