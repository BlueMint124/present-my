import type { DiaryEntry } from "../types";
import { findShopItem, type ShopItem } from "../data/shopItems";
import type { PlayerProgress } from "./playerProgress";
import { supabase } from "./supabaseClient";

type DiaryEntryRow = {
  content: string;
  created_at: string;
  id: string;
  mood: string;
  prompt: string;
  tags: string[];
};

type ShopItemRow = {
  asset_key: string | null;
  category: ShopItem["category"];
  description: string;
  equip_slot: ShopItem["equipSlot"];
  id: string;
  is_active: boolean;
  name: string;
  price: number;
  purchasable: boolean;
  required_level: number;
  sheet_position: string;
  tag: string;
};

type ProfileProgressRow = {
  avatar_item_id: string | null;
  coin_balance: number;
  experience: number;
  level: number;
  total_diary_entries: number;
};

type OwnedShopItemRow = {
  equip_slot: ShopItem["equipSlot"] | null;
  is_equipped: boolean;
  item_id: string;
};

export async function fetchDiaryEntries(profileId?: string): Promise<DiaryEntry[]> {
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("diary_entries")
    .select("id, created_at, mood, prompt, content, tags")
    .order("created_at", { ascending: true });

  if (profileId) {
    query = query.eq("profile_id", profileId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapDiaryEntryRow);
}

export async function insertDiaryEntry(entry: DiaryEntry, profileId?: string): Promise<DiaryEntry> {
  if (!supabase) {
    return entry;
  }

  const { data, error } = await supabase
    .from("diary_entries")
    .insert({
      content: entry.content,
      created_at: entry.createdAt,
      id: entry.id,
      is_private: true,
      mood: entry.mood,
      profile_id: profileId ?? null,
      prompt: entry.prompt,
      tags: entry.tags
    })
    .select("id, created_at, mood, prompt, content, tags")
    .single();

  if (error) {
    throw error;
  }

  return mapDiaryEntryRow(data);
}

export async function fetchShopItems(): Promise<ShopItem[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("shop_items")
    .select("id, name, category, description, equip_slot, price, tag, sheet_position, purchasable, required_level, asset_key, is_active")
    .eq("is_active", true)
    .order("price", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapShopItemRow);
}

export async function fetchPlayerProgress(profileId: string): Promise<PlayerProgress | null> {
  if (!supabase) {
    return null;
  }

  const [profileResult, ownedItemsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("coin_balance, avatar_item_id, experience, level, total_diary_entries")
      .eq("id", profileId)
      .maybeSingle(),
    supabase
      .from("profile_shop_items")
      .select("item_id, is_equipped, equip_slot")
      .eq("profile_id", profileId)
  ]);

  if (profileResult.error) {
    throw profileResult.error;
  }

  if (ownedItemsResult.error) {
    throw ownedItemsResult.error;
  }

  return profileResult.data
    ? mapProfileProgressRow(profileResult.data, ownedItemsResult.data ?? [])
    : null;
}

export async function updatePlayerProgress(profileId: string, progress: PlayerProgress) {
  if (!supabase) {
    return progress;
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      avatar_item_id: Object.values(progress.equippedShopItemIds)[0] ?? null,
      coin_balance: progress.coinBalance,
      experience: progress.experience,
      level: progress.level,
      total_diary_entries: progress.totalDiaryEntries
    })
    .eq("id", profileId)
    .select("coin_balance, avatar_item_id, experience, level, total_diary_entries")
    .single();

  if (error) {
    throw error;
  }

  return mapProfileProgressRow(data);
}

export async function upsertOwnedShopItem(profileId: string, itemId: string) {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from("profile_shop_items")
    .upsert({
      item_id: itemId,
      profile_id: profileId
    });

  if (error) {
    throw error;
  }
}

export async function equipOwnedShopItem(profileId: string, item: ShopItem) {
  if (!supabase) {
    return;
  }

  const { error: clearError } = await supabase
    .from("profile_shop_items")
    .update({ is_equipped: false })
    .eq("profile_id", profileId)
    .eq("equip_slot", item.equipSlot);

  if (clearError) {
    throw clearError;
  }

  const { error: equipError } = await supabase
    .from("profile_shop_items")
    .upsert({
      equip_slot: item.equipSlot,
      is_equipped: true,
      item_id: item.id,
      profile_id: profileId
    });

  if (equipError) {
    throw equipError;
  }

  await updateEquippedProfileItem(profileId, item.id);
}

async function updateEquippedProfileItem(profileId: string, itemId: string) {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ avatar_item_id: itemId })
    .eq("id", profileId);

  if (error) {
    throw error;
  }
}

export async function insertExperienceEvent(params: {
  diaryEntryId?: string;
  eventType: string;
  experienceDelta: number;
  profileId: string;
}) {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from("experience_events")
    .insert({
      diary_entry_id: params.diaryEntryId ?? null,
      event_type: params.eventType,
      experience_delta: params.experienceDelta,
      profile_id: params.profileId
    });

  if (error) {
    throw error;
  }
}

function mapDiaryEntryRow(row: DiaryEntryRow): DiaryEntry {
  return {
    content: row.content,
    createdAt: row.created_at,
    id: row.id,
    mood: row.mood,
    prompt: row.prompt,
    tags: row.tags
  };
}

function mapShopItemRow(row: ShopItemRow): ShopItem {
  return {
    category: row.category,
    description: row.description,
    equipSlot: row.equip_slot,
    id: row.id,
    name: row.name,
    price: row.price,
    purchasable: row.purchasable,
    requiredLevel: row.required_level,
    sheetPosition: row.sheet_position,
    tag: row.tag
  };
}

function mapProfileProgressRow(row: ProfileProgressRow, ownedItems: OwnedShopItemRow[] = []): PlayerProgress {
  const equippedShopItemIds = ownedItems.reduce<PlayerProgress["equippedShopItemIds"]>((slots, ownedItem) => {
    if (!ownedItem.is_equipped) {
      return slots;
    }

    const item = findShopItem(ownedItem.item_id);
    const slot = ownedItem.equip_slot ?? item?.equipSlot;

    if (slot) {
      slots[slot] = ownedItem.item_id;
    }

    return slots;
  }, {});
  const legacyItem = findShopItem(row.avatar_item_id);

  if (legacyItem && !equippedShopItemIds[legacyItem.equipSlot]) {
    equippedShopItemIds[legacyItem.equipSlot] = legacyItem.id;
  }

  return {
    coinBalance: row.coin_balance,
    equippedShopItemIds,
    experience: row.experience,
    level: row.level,
    ownedShopItemIds: ownedItems.map((item) => item.item_id),
    totalDiaryEntries: row.total_diary_entries
  };
}
